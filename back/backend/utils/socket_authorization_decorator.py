from functools import wraps

from flask import request, jsonify
from flask_socketio import disconnect

from backend.services import entry_service


def authorize(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not entry_service.authorized:
            disconnect()
            return False
        return f(*args, **kwargs)
    return decorated_function
