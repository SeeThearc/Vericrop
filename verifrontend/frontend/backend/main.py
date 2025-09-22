import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.websockets import WebSocket
import uvicorn

try:
    from dotenv import load_dotenv
except Exception:
    load_dotenv = None

# Import route functions
from routes.main import home
from routes.user import get_user, verify
from routes.google import signin_with_google, callback, signout
from routes.ws import websocket_endpoint

if load_dotenv:
    load_dotenv()

# Fail fast if required secrets are missing
if not os.environ.get('STATE_SECRET') and not os.environ.get('SECRET_KEY'):
    raise RuntimeError("STATE_SECRET or SECRET_KEY must be set for security")

app = FastAPI(title="FastAPI Backend", version="1.0.0")

frontend_url = os.environ.get('FRONTEND_URL', 'http://localhost:3001')
allowed_origins = [frontend_url, 'http://localhost:3000', 'http://localhost:3001']

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=['GET', 'POST', 'OPTIONS', 'HEAD'],
    allow_headers=['Content-Type', 'Authorization', 'X-Requested-With']
)

# Register all routes
app.get("/")(home)
app.get("/user")(get_user)
app.get("/signin/google")(signin_with_google)
app.get("/callback")(callback)
app.add_api_route("/signout", signout, methods=['GET', 'POST', 'OPTIONS', 'HEAD'])
app.add_api_route("/verify", verify, methods=['GET', 'POST', 'OPTIONS', 'HEAD'])

# WebSocket endpoint
app.websocket("/ws")(websocket_endpoint)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=3000, reload=True)
