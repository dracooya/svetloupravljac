from flask import Blueprint, jsonify
import code.services.light_service as light_service
import asyncio
from concurrent.futures import TimeoutError
from concurrent.futures import ThreadPoolExecutor
from code.models.dtos.new_lights import NewLights, newLightsSchema
from code.utils.request_parser import request_parser
from code.utils.validation_exception import ValidationException
from code.models.dtos.new_light import NewLight

light_blueprint = Blueprint('light_blueprint', __name__)
executor = ThreadPoolExecutor()


def __run_discover(task, timeout):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    try:
        return loop.run_until_complete(asyncio.wait_for(task, timeout))
    except asyncio.TimeoutError:
        return None


@light_blueprint.route('/discover', methods=['GET'])
def discover():
    future = executor.submit(__run_discover, light_service.discover(), 20)
    try:
        lights = future.result()
        if lights is None:
            return jsonify([]), 200
        return jsonify([light.serialize() for light in lights]), 200
    except TimeoutError:
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
