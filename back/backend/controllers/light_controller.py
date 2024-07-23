import socketio
from flask import Blueprint, jsonify, json
import backend.services.light_service as light_service
from backend.models.dtos.new_lights import NewLights, newLightsSchema
from backend.models.dtos.modify_light import modifyLightSchema, ModifyLight
from backend.utils.request_parser import request_parser
from backend.utils.validation_exception import ValidationException
from backend.models.dtos.new_light import NewLight
import asyncio
from backend.utils.socket_instance import socket
from flask_socketio import emit
from backend.models.dtos.command import Command

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
    await light_service.turn_on(light_ip)
    return '', 201


@socket.on('command')
def trigger_command(command):
    asyncio.run(light_service.trigger_command(Command(**json.loads(command))))


@socket.on('get_states')
def get_lights_states(lights_ips):
    states = asyncio.run(light_service.get_lights_states(json.loads(lights_ips)))
    transformed_states = [state.serialize() for state in states]
    emit('states', {"states":transformed_states})


@socket.on('turn_off')
def turn_off(light_ip):
    asyncio.run(light_service.turn_off(light_ip))


@socket.on('turn_off_all')
def turn_off_all(lights_ips):
    asyncio.run(light_service.turn_off_all(lights_ips))


@socket.on('turn_on')
def turn_on(light_ip):
    asyncio.run(light_service.turn_on(light_ip))


@socket.on('turn_on_all')
def turn_on_all(lights_ips):
    asyncio.run(light_service.turn_on_all(lights_ips))
