from flask import Blueprint, jsonify
import code.services.light_service as light_service
from code.models.dtos.new_lights import NewLights, newLightsSchema
from code.models.dtos.modify_light import modifyLightSchema, ModifyLight
from code.utils.request_parser import request_parser
from code.utils.validation_exception import ValidationException
from code.models.dtos.new_light import NewLight
import asyncio

light_blueprint = Blueprint('light_blueprint', __name__)


@light_blueprint.route('/discover', methods=['GET'])
async def discover():
    try:
        lights = await asyncio.wait_for(light_service.discover(), timeout=20)
        return jsonify([light.serialize() for light in lights]), 200
    except asyncio.TimeoutError:
        return jsonify([]), 200


@light_blueprint.route('/add', methods=['POST'])
def add():
    try:
        lights = request_parser(newLightsSchema, NewLights)
        message = ''
        for light in lights.lights:
            message = light_service.add(NewLight(**light))
        return message, 201

    except ValidationException as ex:
        return ex.message, ex.status_code


@light_blueprint.route('/modify', methods=['PUT'])
def modify():
    try:
        data = request_parser(modifyLightSchema, ModifyLight)
        message = light_service.modify(data)
        return message, 200

    except ValidationException as ex:
        return ex.message, ex.status_code


@light_blueprint.route('/delete/<light_mac>', methods=['DELETE'])
def delete(light_mac):
    try:
        message = light_service.delete(light_mac)
        return message, 200

    except ValidationException as ex:
        return ex.message, ex.status_code


@light_blueprint.route('/ping/<light_ip>', methods=['GET'])
async def ping(light_ip):
    await light_service.ping(light_ip)
    return '', 201


