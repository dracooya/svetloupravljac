from flask import Blueprint
from backend.utils.validation_exception import ValidationException
from backend.utils.request_parser import request_parser
import backend.services.room_service as room_service
from backend.models.dtos.new_room import NewRoom, newRoomSchema
from backend.models.dtos.modify_house_or_room import modifyHouseOrRoomSchema, ModifyHouseOrRoom

room_blueprint = Blueprint('room_blueprint', __name__)


@room_blueprint.route('/add', methods=['POST'])
def add():
    try:
        data = request_parser(newRoomSchema, NewRoom)
        message = room_service.add(data)
        return message, 201

    except ValidationException as ex:
        return ex.message, ex.status_code


@room_blueprint.route('/modify', methods=['PUT'])
def modify():
    try:
        data = request_parser(modifyHouseOrRoomSchema, ModifyHouseOrRoom)
        message = room_service.modify(data)
        return message, 200

    except ValidationException as ex:
        return ex.message, ex.status_code


@room_blueprint.route('/delete/<room_id>', methods=['DELETE'])
def delete(room_id):
    try:
        message = room_service.delete(room_id)
        return message, 200

    except ValidationException as ex:
        return ex.message, ex.status_code
