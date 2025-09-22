import os
import requests
from urllib.parse import urlencode
from fastapi import HTTPException, Request, Response, Cookie, Header
from fastapi.responses import RedirectResponse
from typing import Optional
from service.session_store import create_session, invalidate_session, get_session
from service.user_service import find_or_create_user, update_user_tokens
from service.state_token import create_signed_state, verify_signed_state
from service.rate_limiter import rate_limit

GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USERINFO = "https://openidconnect.googleapis.com/v1/userinfo"


def _get_oauth_config():
    client_id = os.environ.get('GOOGLE_CLIENT_ID')
    client_secret = os.environ.get('GOOGLE_CLIENT_SECRET')
    return client_id, client_secret


def _get_redirect_uri():
    base_url = os.environ.get('BASE_URL', 'http://localhost:3000')
    return f"{base_url.rstrip('/')}/callback"


def _revoke_google_token(token: str) -> bool:
    try:
        resp = requests.post('https://oauth2.googleapis.com/revoke',
                           params={'token': token}, timeout=5)
        return resp.status_code == 200
    except Exception:
        return False


@rate_limit(endpoint_name='signin')  # Uses RATE_LIMIT_SIGNIN_* env vars or defaults
async def signin_with_google():
    """Redirect user to Google's OAuth 2.0 consent page."""
    client_id, _ = _get_oauth_config()
    if not client_id:
        raise HTTPException(status_code=500, detail="GOOGLE_CLIENT_ID not configured")

    redirect_uri = _get_redirect_uri()
    # Generate a stateless signed state token to defend against CSRF
    secret = os.environ.get('STATE_SECRET') or os.environ.get('SECRET_KEY')
    if not secret:
        raise HTTPException(status_code=500, detail="Server configuration error")
    state = create_signed_state(secret, expires_in=300)  # 5 minutes max
    params = {
        'client_id': client_id,
        'response_type': 'code',
        'scope': 'openid email profile',
        'redirect_uri': redirect_uri,
        'state': state,
        'access_type': 'offline',
        'prompt': 'consent'
    }
    url = GOOGLE_AUTH_URL + '?' + urlencode(params)
    return RedirectResponse(url=url)


@rate_limit(endpoint_name='callback')  # Uses RATE_LIMIT_CALLBACK_* env vars or defaults
async def callback(request: Request):
    try:
        # Extract query parameters
        query_params = request.query_params
        code = query_params.get('code')
        state = query_params.get('state')
        
        # Validate signed state to mitigate CSRF attacks
        secret = os.environ.get('STATE_SECRET') or os.environ.get('SECRET_KEY')
        if not secret:
            raise HTTPException(status_code=500, detail="Server configuration error")
        if not state:
            raise HTTPException(status_code=400, detail="Missing state")
        payload = verify_signed_state(state, secret)
        if not payload:
            raise HTTPException(status_code=400, detail="Invalid or expired state")
        if not code:
            raise HTTPException(status_code=400, detail="No authorization code received")

        client_id, client_secret = _get_oauth_config()
        if not client_id or not client_secret:
            raise HTTPException(status_code=500, detail="Google OAuth not configured")

        redirect_uri = _get_redirect_uri()
        data = {
            'code': code,
            'client_id': client_id,
            'client_secret': client_secret,
            'redirect_uri': redirect_uri,
            'grant_type': 'authorization_code'
        }
        token_resp = requests.post(GOOGLE_TOKEN_URL, data=data, timeout=10)
        if token_resp.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to exchange authorization code")
        token_json = token_resp.json()
        access_token = token_json.get('access_token')
        refresh_token = token_json.get('refresh_token')

        # Fetch userinfo
        headers = {'Authorization': f'Bearer {access_token}'}
        user_resp = requests.get(GOOGLE_USERINFO, headers=headers, timeout=10)
        if user_resp.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to fetch userinfo")
        info = user_resp.json()

        # Validate email is verified
        if not info.get('email_verified', False):
            raise HTTPException(status_code=400, detail="Email not verified")

        user_payload = {
            'id': info.get('sub'),
            'email': info.get('email'),
            'name': info.get('name') or info.get('email'),
            'avatar': info.get('picture'),
            'provider': 'google',
            'tokens': {'access_token': access_token, 'refresh_token': refresh_token}
        }

        # Create or find user and create session
        user_id = await find_or_create_user(user_payload)
        await update_user_tokens(user_id, 'google', {'access_token': access_token, 'refresh_token': refresh_token})
        session_token = await create_session(user_id)
        
        # Remove sensitive data from response
        response_user = {
            'id': user_id,
            'email': user_payload['email'],
            'name': user_payload['name'],
            'avatar': user_payload['avatar'],
            'provider': 'google'
        }

        # After successful sign-in create a response that redirects the browser
        # back to the frontend app so the user lands back in the UI.
        frontend_url = os.environ.get('FRONTEND_URL', 'http://localhost:3001')
        # Cookie options: httpOnly, secure in production, sameSite strict in prod,
        # relaxed (Lax) for local development. If your frontend runs on a different
        # origin you may need to set samesite='None' and secure=True (set via env in prod).
        is_production = os.environ.get('NODE_ENV') == 'production' or os.environ.get('FLASK_ENV') == 'production'
        redirect_resp = RedirectResponse(url=frontend_url)
        redirect_resp.set_cookie(
            key='session_id', 
            value=session_token,
            httponly=True,
            secure=is_production,
            samesite='strict' if is_production else 'lax',
            max_age=3600 * 24,  # 24 hours
            path='/'
        )
        return redirect_resp
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Callback failed: {str(e)}")


@rate_limit(endpoint_name='signout')  # Uses RATE_LIMIT_SIGNOUT_* env vars or defaults
async def signout(request: Request, session_id: Optional[str] = Cookie(None), authorization: Optional[str] = Header(None)):
    try:
        # Prefer reading the session token from an HttpOnly cookie for security.
        # Fall back to Authorization: Bearer <token> header for API clients.
        session_token = session_id

        # If no cookie, check Authorization header
        if not session_token and authorization:
            if not authorization.lower().startswith('bearer '):
                raise HTTPException(status_code=401, detail="Missing session token (cookie or Authorization header)")
            session_token = authorization.split(' ', 1)[1].strip()
            
        if not session_token:
            raise HTTPException(status_code=401, detail="Invalid Authorization Bearer token")

        # Verify session exists and get user info for token revocation
        sess = await get_session(session_token)
        if not sess:
            raise HTTPException(status_code=404, detail="Session not found")

        # Get user's Google account info for token revocation
        user_id = sess.get('userId')
        if user_id:
            # You could fetch and revoke Google tokens here if needed
            # For now, we'll just invalidate the session
            pass

        # Invalidate session (deletes from store)
        success = await invalidate_session(session_token)
        if success:
            # Create response and clear the session cookie
            response = Response(content='{"message": "Signed out"}', media_type="application/json")
            response.set_cookie(key='session_id', value='', expires=0, path='/')
            return response
        else:
            raise HTTPException(status_code=500, detail="Unable to invalidate session")
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Signout failed: {str(e)}")
