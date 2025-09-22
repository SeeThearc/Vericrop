import json
import hashlib
import uuid
from datetime import datetime, timezone, timedelta
from typing import Optional, Dict, Any
import asyncio
from .prisma_client import get_prisma_client


def _make_session_token() -> str:
    """Generate a secure session token."""
    raw = f"{uuid.uuid4().hex}-{datetime.now(timezone.utc).isoformat()}"
    return hashlib.sha256(raw.encode('utf-8')).hexdigest()


async def create_session(user_id: str, expires_days: int = 30) -> str:
    """Create a new session for a user."""
    client = get_prisma_client()
    if not client.is_connected():
        await client.connect()
    
    session_token = _make_session_token()
    expires_at = datetime.now(timezone.utc) + timedelta(days=expires_days)
    
    session = await client.session.create(
        data={
            'sessionToken': session_token,
            'userId': user_id,
            'expires': expires_at
        }
    )
    
    return session_token


async def invalidate_session(session_token: str) -> bool:
    """Remove a session."""
    client = get_prisma_client()
    if not client.is_connected():
        await client.connect()
    
    try:
        await client.session.delete(
            where={'sessionToken': session_token}
        )
        return True
    except Exception:
        return False


async def get_session(session_token: str) -> Optional[Dict[str, Any]]:
    """Get session data by token, including user information."""
    client = get_prisma_client()
    if not client.is_connected():
        await client.connect()
    
    # Clean up expired sessions first
    await _cleanup_expired_sessions()
    
    try:
        session = await client.session.find_unique(
            where={'sessionToken': session_token},
            include={'user': True}
        )
        
        if session and session.expires > datetime.now(timezone.utc):
            return {
                'id': session.id,
                'sessionToken': session.sessionToken,
                'userId': session.userId,
                'expires': session.expires.isoformat(),
                'user': {
                    'id': session.user.id,
                    'name': session.user.name,
                    'email': session.user.email,
                    'image': session.user.image,
                    'avatar': session.user.avatar,
                    'emailVerified': session.user.emailVerified.isoformat() if session.user.emailVerified else None
                }
            }
        return None
    except Exception:
        return None


async def _cleanup_expired_sessions():
    """Remove expired sessions from the database."""
    client = get_prisma_client()
    if not client.is_connected():
        await client.connect()
    
    try:
        await client.session.delete_many(
            where={'expires': {'lt': datetime.now(timezone.utc)}}
        )
    except Exception:
        pass


async def get_user_sessions(user_id: str) -> list[Dict[str, Any]]:
    """Get all active sessions for a user."""
    client = get_prisma_client()
    if not client.is_connected():
        await client.connect()
    
    # Clean up expired sessions first
    await _cleanup_expired_sessions()
    
    try:
        sessions = await client.session.find_many(
            where={
                'userId': user_id,
                'expires': {'gt': datetime.now(timezone.utc)}
            }
        )
        
        return [
            {
                'id': session.id,
                'sessionToken': session.sessionToken,
                'userId': session.userId,
                'expires': session.expires.isoformat()
            }
            for session in sessions
        ]
    except Exception:
        return []


async def invalidate_all_user_sessions(user_id: str) -> bool:
    """Remove all sessions for a user."""
    client = get_prisma_client()
    if not client.is_connected():
        await client.connect()
    
    try:
        await client.session.delete_many(
            where={'userId': user_id}
        )
        return True
    except Exception:
        return False


# Synchronous wrappers for backward compatibility
def create_session_sync(user_id: str, expires_days: int = 30) -> str:
    """Synchronous wrapper for create_session."""
    return asyncio.run(create_session(user_id, expires_days))


def invalidate_session_sync(session_token: str) -> bool:
    """Synchronous wrapper for invalidate_session."""
    return asyncio.run(invalidate_session(session_token))


def get_session_sync(session_token: str) -> Optional[Dict[str, Any]]:
    """Synchronous wrapper for get_session."""
    return asyncio.run(get_session(session_token))
