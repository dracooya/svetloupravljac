import json

from flask import Blueprint
from backend.models.dtos.password import passwordSchema, Password
from backend.utils.request_parser import request_parser
from backend.utils.validation_exception import ValidationException
import backend.services.entry_service as entry_service

entry_blueprint = Blueprint('entry_blueprint', __name__)


@entry_blueprint.route('/check', methods=['GET'])
def check_if_authorized():
    return json.dumps(entry_service.authorized), 200


@entry_blueprint.route('', methods=['POST'])
def enter():
    try:
        data = request_parser(passwordSchema, Password)
        message = entry_service.enter_app(data)
        return message, 200

    except ValidationException as ex:
        return ex.message, ex.status_code
