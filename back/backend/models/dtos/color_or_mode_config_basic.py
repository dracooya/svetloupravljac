from marshmallow import Schema, fields
from marshmallow.validate import Range


class ColorOrModeConfigBasic:
    __slots__ = ('r', 'g', 'b', 'brightness', 'temperature', 'speed', 'mode')

    def __init__(self, r, g, b, brightness, temperature, speed, mode):
        self.r = r
        self.g = g
        self.b = b
        self.brightness = brightness
        self.temperature = temperature
        self.speed = speed
        self.mode = mode


class ColorOrModeConfigBasicSchema(Schema):
    r = fields.Integer(required=True,
                       validate=Range(min=-1, max=255),
                       error_messages={'required': 'Red (R) is a required field!',
                                       'null': 'Red (R) is a required field!',
                                       'validator_failed': 'Red (R) must be a value between -1 and 255!'})
    g = fields.Integer(required=True,
                       validate=Range(min=-1, max=255),
                       error_messages={'required': 'Green (G) is a required field!',
                                       'null': 'Green (G) is a required field!',
                                       'validator_failed': 'Green (G) must be a value between -1 and 255!'})
    b = fields.Integer(required=True,
                       validate=Range(min=-1, max=255),
                       error_messages={'required': 'Blue (B) is a required field!',
                                       'null': 'Blue (B) is a required field!',
                                       'validator_failed': 'Blue (B) must be a value between -1 and 255!'})
    brightness = fields.Integer(required=True,
                                validate=Range(min=-1, max=255),
                                error_messages={'required': 'Brightness is a required field!',
                                                'null': 'Brightness is a required field!',
                                                'validator_failed': 'Brightness must be a value between -1 and 255!'})
    temperature = fields.Integer(required=True,
                                 validate=Range(min=-1),
                                 error_messages={'required': 'Temperature is a required field!',
                                                 'null': 'Temperature is a required field!',
                                                 'validator_failed': 'Temperature must be a value greater or equal to -1!'})

    speed = fields.Integer(required=True,
                           validate=Range(min=-1, max=200),
                           error_messages={'required': 'Speed is a required field!',
                                           'null': 'Speed is a required field!',
                                           'validator_failed': 'Speed must be a value between -1 and 200!'})

    mode = fields.Integer(required=True,
                          validate=Range(min=-1, max=35),
                          error_messages={'required': 'Mode is a required field!',
                                          'null': 'Mode is a required field!',
                                          'validator_failed': 'Mode must be a value between -1 and 35!'})


colorOrModeConfigBasicSchema = ColorOrModeConfigBasicSchema()
