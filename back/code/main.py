from flask import Flask, request
from code.utils.db_config import db
from code.models.dtos.password import passwordSchema, Password
from code.utils.request_parser import request_parser
from code.services.entry_service import EntryService
from code.utils.validation_exception import ValidationException
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/svetloupravljac'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

entry_service = EntryService()

with app.app_context():
    db.create_all()
    print("Tables created")


@app.before_request
def before_request_func():
    if request.endpoint == 'enter':
        return

    if not entry_service.authorized:
        return "Session expired! Please enter password again.", 401


@app.route('/enter', methods=['POST'])
def enter():
    try:
        data = request_parser(passwordSchema)
        message = entry_service.enter_app(Password(**data))
        return message, 200

    except ValidationException as ex:
        return ex.message, ex.status_code
