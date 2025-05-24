from backend.models.dtos.password import Password
import bcrypt
from backend.utils.validation_exception import ValidationException
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
import sys

entry_password = b"$2a$12$djDeWiQ.s1PnfHJRDTw7lOObKrUHRvdagZhORo.FhtMwWZ2X/PUpi"
authorized = False
scheduler = BackgroundScheduler()
scheduler.start()


def __cancel_authorization():
    global authorized
    authorized = False


def enter_app(password: Password):
    global authorized
    if bcrypt.checkpw(str.encode(password.password), entry_password):
        authorized = True
        scheduler.add_job(__cancel_authorization, 'date', run_date=datetime.now() + timedelta(days=1))
        return "Successful authorization!"
    else:
        raise ValidationException("Incorrect password!", 401)
