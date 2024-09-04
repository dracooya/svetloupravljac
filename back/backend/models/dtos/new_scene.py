from marshmallow import fields, Schema, validate
from marshmallow.validate import Range

from backend.models.dtos.lights_color_config_basic import LightColorConfigBasicSchema


class NewScene:
    __slots__ = ['name', 'roomId', 'config']

    def __init__(self, name, roomId, config):
        self.name = name
        self.roomId = roomId
        self.config = config


class NewSceneSchema(Schema):
    name = fields.String(required=True,
                         validate=lambda x: len(x) > 0,
                         error_messages={'required': 'Scene name is a required field!',
                                         "null": "Scene name is a required field!",
                                         'validator_failed': 'Scene name is a required field!'})
    roomId = fields.Integer(required=True,
                             validate=Range(min=1),
                             error_messages={'required': 'Room ID is a required field!',
                                             'null': "Room ID is a required field!",
                                             'validator_failed': 'Room ID must be greater than 0!'})


    config = fields.List(fields.Nested(LightColorConfigBasicSchema,
                                       required=True,
                                       validate=validate.Length(min=1),
                                       error_messages={'required': 'Lights config is a required field!',
                                                       'null': "Lights config is a required field!",
                                                       'validator_failed': 'Lights config length must be greater than 0!'}))


newSceneSchema = NewSceneSchema()
