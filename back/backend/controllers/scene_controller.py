from flask import Blueprint, jsonify

from backend.models.dtos.modify_scene import ModifyScene, modifySceneSchema
from backend.models.dtos.new_scene import newSceneSchema, NewScene
from backend.services import scene_service
from backend.utils.request_parser import request_parser
from backend.utils.validation_exception import ValidationException

scene_blueprint = Blueprint('scene_blueprint', __name__)


@scene_blueprint.route('/all', methods=['GET'])
def get_all():
    scenes = scene_service.get_all()
    return jsonify([scene.serialize() for scene in scenes]), 200


@scene_blueprint.route('/add', methods=['POST'])
def add():
    try:
        data = request_parser(newSceneSchema, NewScene)
        message = scene_service.add(data)
        return message, 201

    except ValidationException as ex:
        return ex.message, ex.status_code


@scene_blueprint.route('/modify', methods=['PUT'])
def modify():
    try:
        data = request_parser(modifySceneSchema, ModifyScene)
        message = scene_service.modify(data)
        return message, 200

    except ValidationException as ex:
        return ex.message, ex.status_code


@scene_blueprint.route('/delete/<scene_id>', methods=['DELETE'])
def delete(scene_id):
    try:
        message = scene_service.delete(scene_id)
        return message, 200

    except ValidationException as ex:
        return ex.message, ex.status_code
