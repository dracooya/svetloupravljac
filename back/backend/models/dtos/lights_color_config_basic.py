from marshmallow import Schema, fields
from marshmallow.validate import Range

from backend.models.dtos.color_or_mode_config_basic import ColorOrModeConfigBasicSchema


class LightColorConfigBasic:
    __slots__ = ['lightMac', 'config']

    def __init__(self, lightMac, config):
        self.lightMac = lightMac
        self.config = config


class LightColorConfigBasicSchema(Schema):
    lightMac = fields.String(required=True,
                             validate=lambda x: len(x) > 0,
                             error_messages={'required': 'Light MAC address is a required field!',
                                             "null": "Light MAC address is a required field!",
                                             'validator_failed': 'Light MAC address is a required field!'})

    config = fields.Nested(ColorOrModeConfigBasicSchema,
                           required=True,
                           error_messages={'required': 'Light config is a required field!',
                                           'null': "Light config is a required field!"})


lightColorConfigBasicSchema = LightColorConfigBasicSchema()