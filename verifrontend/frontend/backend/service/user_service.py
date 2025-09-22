from datetime import datetime, timezone
from typing import Optional, Dict, Any
from .prisma_client import get_prisma_client


async def find_or_create_user(user_data: Dict[str, Any]) -> str:
    """Find an existing user or create a new one. Returns user ID."""
    client = get_prisma_client()
    if not client.is_connected():
        await client.connect()
    
    email = user_data.get('email')
    google_id = user_data.get('id')  # Google sub
    
    if not email:
        raise ValueError("Email is required")
    
    # Try to find existing user by email
    existing_user = await client.user.find_unique(
        where={'email': email}
    )
    
    if existing_user:
        # Update user info if needed
        updated_user = await client.user.update(
            where={'id': existing_user.id},
            data={
                'name': user_data.get('name'),
                'image': user_data.get('avatar'),
                'avatar': user_data.get('avatar'),
                'emailVerified': datetime.now(timezone.utc) if not existing_user.emailVerified else existing_user.emailVerified
            }
        )
        
        # Find or create account record
        await _find_or_create_account(updated_user.id, google_id, user_data)
        
        return updated_user.id
    else:
        # Create new user
        new_user = await client.user.create(
            data={
                'email': email,
                'name': user_data.get('name'),
                'image': user_data.get('avatar'),
                'avatar': user_data.get('avatar'),
                'emailVerified': datetime.now(timezone.utc)
            }
        )
        
        # Create account record
        await _find_or_create_account(new_user.id, google_id, user_data)
        
        return new_user.id


async def _find_or_create_account(user_id: str, provider_account_id: str, user_data: Dict[str, Any]):
    """Create or update account record for OAuth provider."""
    client = get_prisma_client()
    
    # Check if account already exists
    existing_account = await client.account.find_unique(
        where={
            'provider_providerAccountId': {
                'provider': 'google',
                'providerAccountId': provider_account_id
            }
        }
    )
    
    if not existing_account:
        # Create new account
        await client.account.create(
            data={
                'userId': user_id,
                'type': 'oauth',
                'provider': 'google',
                'providerAccountId': provider_account_id,
                'access_token': user_data.get('tokens', {}).get('access_token'),
                'refresh_token': user_data.get('tokens', {}).get('refresh_token'),
            }
        )


async def get_user_by_id(user_id: str) -> Optional[Dict[str, Any]]:
    """Get user by ID."""
    client = get_prisma_client()
    if not client.is_connected():
        await client.connect()
    
    try:
        user = await client.user.find_unique(
            where={'id': user_id},
            include={'accounts': True}
        )
        
        if user:
            return {
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'image': user.image,
                'avatar': user.avatar,
                'emailVerified': user.emailVerified.isoformat() if user.emailVerified else None,
                'accounts': [
                    {
                        'provider': account.provider,
                        'providerAccountId': account.providerAccountId,
                        'type': account.type
                    }
                    for account in user.accounts
                ]
            }
        return None
    except Exception:
        return None


async def update_user_tokens(user_id: str, provider: str, tokens: Dict[str, str]):
    """Update OAuth tokens for a user's account."""
    client = get_prisma_client()
    if not client.is_connected():
        await client.connect()
    
    try:
        await client.account.update_many(
            where={
                'userId': user_id,
                'provider': provider
            },
            data={
                'access_token': tokens.get('access_token'),
                'refresh_token': tokens.get('refresh_token'),
            }
        )
    except Exception:
        pass
