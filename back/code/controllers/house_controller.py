from flask import Blueprint, jsonify
from code.utils.validation_exception import ValidationException
from code.utils.request_parser import request_parser
import code.services.house_service as house_service
from code.models.dtos.new_house import newHouseSchema, NewHouse
from code.models.dtos.modify_house_or_room import modifyHouseOrRoomSchema, ModifyHouseOrRoom


house_blueprint = Blueprint('house_blueprint', __name__)


@house_blueprint.route('/all', methods=['GET'])
def get_all():
    houses = house_service.get_all()
    return jsonify([house.serialize() for house in houses]), 200


@house_blueprint.route('/add', methods=['POST'])
def add():
    try:
        data = request_parser(newHouseSchema, NewHouse)
        message = house_service.add(data)
        return message, 201

    except ValidationException as ex:
        return ex.message, ex.status_code


@house_blueprint.route('/modify', methods=['PUT'])
def modify():
    try:
        data = request_parser(modifyHouseOrRoomSchema, ModifyHouseOrRoom)
        message = house_service.modify(data)
        return message, 200

    except ValidationException as ex:
        return ex.message, ex.status_code


@house_blueprint.route('/delete/<house_id>', methods=['DELETE'])
def delete(house_id):
    try:
        message = house_service.delete(house_id)
        return message, 200

    except ValidationException as ex:
        return ex.message, ex.status_code
