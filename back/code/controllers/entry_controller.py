import json

from flask import Blueprint
from code.models.dtos.password import passwordSchema, Password
from code.utils.request_parser import request_parser
from code.utils.validation_exception import ValidationException
import code.services.entry_service as entry_service

entry_blueprint = Blueprint('entry_blueprint', __name__)


@entry_blueprint.route('/check', methods=['GET'])
def check_if_authorized():
    is_authorized = entry_service.is_authorized()
    return json.dumps(is_authorized), 200


@entry_blueprint.route('', methods=['POST'])
def enter():
    try:
        data = request_parser(passwordSchema, Password)
        message = entry_service.enter_app(data)
        return message, 200

    except ValidationException as ex:
        return ex.message, ex.status_code
