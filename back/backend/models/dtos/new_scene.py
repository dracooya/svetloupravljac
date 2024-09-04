from marshmallow import fields, Schema, validate

from backend.models.dtos.lights_color_config_basic import LightColorConfigBasicSchema


class NewScene:
    __slots__ = ['name', 'config']

    def __init__(self, name, config):
        self.name = name
        self.config = config


class NewSceneSchema(Schema):
    name = fields.String(required=True,
                         validate=lambda x: len(x) > 0,
                         error_messages={'required': 'Scene name is a required field!',
                                         "null": "Scene name is a required field!",
                                         'validator_failed': 'Scene name is a required field!'})


    config = fields.List(fields.Nested(LightColorConfigBasicSchema,
                                       required=True,
                                       validate=validate.Length(min=1),
                                       error_messages={'required': 'Lights config is a required field!',
                                                       'null': "Lights config is a required field!",
                                                       'validator_failed': 'Lights config length must be greater than 0!'}))


newSceneSchema = NewSceneSchema()
