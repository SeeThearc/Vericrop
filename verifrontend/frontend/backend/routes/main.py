async def home():
    return {
        "message": "Welcome to the API",
        "status": "No session storage - use token-based auth",
        "endpoints": {
            "/signin/google": "Start Google OAuth",
            "/callback": "OAuth callback (returns user data + tokens)",
            "/user": "Get user info (requires Authorization header)",
            "/signout": "Sign out"
        }
    }
