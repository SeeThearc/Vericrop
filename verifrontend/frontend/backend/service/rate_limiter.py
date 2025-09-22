import os
import time
from collections import defaultdict
from functools import wraps
from fastapi import HTTPException, Request


class RateLimiter:
    def __init__(self):
        self.requests = defaultdict(list)
        
    def is_allowed(self, key: str, max_requests: int = 10, window_seconds: int = 300) -> bool:
        """Check if request is allowed within rate limit."""
        # If rate limiting is disabled, always allow
        if max_requests <= 0:
            return True
            
        now = time.time()
        window_start = now - window_seconds
        
        # Clean old requests
        self.requests[key] = [req_time for req_time in self.requests[key] if req_time > window_start]
        
        # Check if under limit
        if len(self.requests[key]) >= max_requests:
            return False
            
        # Record this request
        self.requests[key].append(now)
        return True


rate_limiter = RateLimiter()


def _get_env_rate_limit_config(endpoint_name: str = None):
    """Get rate limit configuration from environment variables."""
    # Global rate limit settings
    global_max = int(os.environ.get('RATE_LIMIT_MAX_REQUESTS', 10))
    global_window = int(os.environ.get('RATE_LIMIT_WINDOW_SECONDS', 300))
    
    # Endpoint-specific settings (if provided)
    if endpoint_name:
        env_prefix = f'RATE_LIMIT_{endpoint_name.upper()}_'
        endpoint_max = os.environ.get(f'{env_prefix}MAX_REQUESTS')
        endpoint_window = os.environ.get(f'{env_prefix}WINDOW_SECONDS')
        
        if endpoint_max is not None:
            global_max = int(endpoint_max)
        if endpoint_window is not None:
            global_window = int(endpoint_window)
    
    return global_max, global_window


def rate_limit(max_requests: int = None, window_seconds: int = None, endpoint_name: str = None):
    """
    Rate limiting decorator for FastAPI.
    
    Args:
        max_requests: Maximum requests allowed (overrides env if specified)
        window_seconds: Time window in seconds (overrides env if specified)
        endpoint_name: Name for endpoint-specific env config (e.g., 'SIGNIN', 'CALLBACK')
    
    Environment variables:
        RATE_LIMIT_MAX_REQUESTS: Global default max requests (default: 10)
        RATE_LIMIT_WINDOW_SECONDS: Global default window in seconds (default: 300)
        RATE_LIMIT_{ENDPOINT}_MAX_REQUESTS: Endpoint-specific max requests
        RATE_LIMIT_{ENDPOINT}_WINDOW_SECONDS: Endpoint-specific window seconds
        
    Set max_requests to 0 or -1 to disable rate limiting.
    """
    def decorator(f):
        @wraps(f)
        async def wrapper(*args, **kwargs):
            # Get configuration from environment or use provided values
            env_max, env_window = _get_env_rate_limit_config(endpoint_name)
            
            final_max = max_requests if max_requests is not None else env_max
            final_window = window_seconds if window_seconds is not None else env_window
            
            # If rate limiting is disabled (max_requests <= 0), skip rate limiting
            if final_max <= 0:
                return await f(*args, **kwargs)
            
            # Try to get request object from args
            request = None
            for arg in args:
                if isinstance(arg, Request):
                    request = arg
                    break
            
            # Use IP address as key (could also use user agent, etc.)
            key = 'unknown'
            if request:
                key = request.client.host if request.client else 'unknown'
            
            if not rate_limiter.is_allowed(key, final_max, final_window):
                raise HTTPException(
                    status_code=429,
                    detail={
                        "error": "Rate limit exceeded",
                        "max_requests": final_max,
                        "window_seconds": final_window
                    }
                )
                
            return await f(*args, **kwargs)
        return wrapper
    return decorator
