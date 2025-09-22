import os
import hmac
import hashlib
import json
import base64
import time
import secrets


def _b64u_encode(b: bytes) -> str:
    return base64.urlsafe_b64encode(b).rstrip(b"=").decode('ascii')


def _b64u_decode(s: str) -> bytes:
    padding = '=' * ((4 - len(s) % 4) % 4)
    return base64.urlsafe_b64decode((s + padding).encode('ascii'))


def create_signed_state(secret: str, expires_in: int = 180, context: dict | None = None) -> str:
    
    nonce = secrets.token_urlsafe(16)
    payload = {'nonce': nonce, 'exp': int(time.time()) + int(expires_in)}
    if context:
        payload['ctx'] = context
    payload_json = json.dumps(payload, separators=(',', ':')).encode('utf-8')
    payload_b64 = _b64u_encode(payload_json)
    sig = hmac.new(secret.encode('utf-8'), payload_b64.encode('ascii'), hashlib.sha256).digest()
    sig_b64 = _b64u_encode(sig)
    return f"{payload_b64}.{sig_b64}"


def verify_signed_state(token: str, secret: str) -> dict | None:
    try:
        parts = token.split('.')
        if len(parts) != 2:
            return None
        payload_b64, sig_b64 = parts
        expected_sig = hmac.new(secret.encode('utf-8'), payload_b64.encode('ascii'), hashlib.sha256).digest()
        sig = _b64u_decode(sig_b64)
        if not hmac.compare_digest(expected_sig, sig):
            return None
        payload_json = _b64u_decode(payload_b64)
        payload = json.loads(payload_json.decode('utf-8'))
        if int(time.time()) > int(payload.get('exp', 0)):
            return None
        return payload
    except Exception:
        return None
