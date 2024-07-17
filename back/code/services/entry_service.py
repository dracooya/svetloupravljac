from code.models.dtos.password import Password
import bcrypt
from code.utils.validation_exception import ValidationException
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta


class EntryService:
    entry_password = b"$2a$12$gMsubuEng/BWoDZuIh6EdejWPYOaE2OtGQ8LVcSdw9D1.uttDy/Oa"
    authorized = False
    scheduler = BackgroundScheduler()
    scheduler.start()

    def __cancel_authorization(self):
        self.authorized = False

    def enter_app(self, password: Password):
        if bcrypt.checkpw(str.encode(password.password), self.entry_password):
            self.authorized = True
            self.scheduler.add_job(self.__cancel_authorization, 'date', run_date=datetime.now() + timedelta(days=1))
            return "Successful authorization!"
        else:
            raise ValidationException("Incorrect password!", 401)
