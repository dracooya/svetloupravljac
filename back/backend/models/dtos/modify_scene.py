from marshmallow import Schema, fields
from marshmallow.validate import Range

from backend.models.dtos.new_scene import NewSceneSchema


class ModifyScene:
    __slots__ = ['id', 'modifications']

    def __init__(self, id, modifications):
        self.id = id
        self.modifications = modifications


class ModifySceneSchema(Schema):
    id = fields.Integer(required=True,
                        validate=Range(min=1),
                        error_messages={'required': 'Scene ID is a required field!',
                                        'null': "Scene ID is a required field!",
                                        'validator_failed': 'Scene ID must be greater than 0!'})

    modifications = fields.Nested(NewSceneSchema,
                                  required=True,
                                  error_messages={'required': 'Scene modifications is a required field!',
                                                  'null': "Scene modifications is a required field!"})


modifySceneSchema = ModifySceneSchema()
