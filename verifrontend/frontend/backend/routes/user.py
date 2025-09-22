from fastapi import HTTPException, Request, Cookie, Header
from typing import Optional
from service.session_store import get_session
from service.user_service import get_user_by_id


async def get_user(request: Request, session_id: Optional[str] = Cookie(None), authorization: Optional[str] = Header(None)):
    try:
        # Prefer reading the session token from an HttpOnly cookie for security.
        # Fall back to Authorization: Bearer <token> header for API clients.
        session_token = session_id
        
        # If no cookie, check Authorization header
        if not session_token and authorization:
            if not authorization.startswith('Bearer '):
                raise HTTPException(status_code=401, detail="Missing session token (cookie or Authorization header)")
            session_token = authorization.split(' ')[1]
        
        if not session_token:
            raise HTTPException(status_code=401, detail="Missing session token (cookie or Authorization header)")
        
        # Get session from token
        session = await get_session(session_token)
        if not session:
            raise HTTPException(status_code=401, detail="Invalid session token")
        
        # Get user details
        user_id = session.get('userId')
        user = await get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
            
        return {
            "user": user,
            "session": {
                "id": session_token[:20] + "..." if len(session_token) > 20 else session_token,
                "expires": session.get('expires') if session else None
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get user: {str(e)}")


async def verify(request: Request, session_id: Optional[str] = Cookie(None), authorization: Optional[str] = Header(None)):
    try:
        # Prefer reading the session token from an HttpOnly cookie for security.
        # Fall back to Authorization: Bearer <token> header for API clients.
        session_token = session_id

        # If no cookie, check Authorization header
        if not session_token and authorization:
            if not authorization.startswith('Bearer '):
                raise HTTPException(status_code=401, detail="Missing session token (cookie or Authorization header)")
            session_token = authorization.split(' ', 1)[1].strip()

        if not session_token:
            raise HTTPException(status_code=401, detail="Missing session token")

        session = await get_session(session_token)
        if not session:
            raise HTTPException(status_code=401, detail="Invalid or expired session token")

        # session contains 'userId' when valid
        session_user_id = session.get('userId')
        if not session_user_id:
            raise HTTPException(status_code=500, detail="Session missing user association")

        # Optionally return user info
        user = await get_user_by_id(session_user_id)

        return {"ok": True, "userId": user['id'] if user else None, "user": user}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Verification failed: {str(e)}")