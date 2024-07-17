from code.utils.errors_messages_flattener import format_errors
from flask import request
from marshmallow import ValidationError
from code.utils.validation_exception import ValidationException


def request_parser(schema, object_class):
    json_data = request.get_json()
    try:
        data = schema.load(json_data)
    except ValidationError as err:
        raise ValidationException(format_errors(err.messages), 400)

    return object_class(**data)

