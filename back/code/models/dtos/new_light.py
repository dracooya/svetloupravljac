from marshmallow import Schema, fields
from marshmallow.validate import Range


class NewLight:
    __slots__ = ['mac', 'ip', 'name', 'type', 'brightnessChange', 'colorChange', 'temperatureChange', 'minKelvin',
                 'maxKelvin', 'roomId']

    def __init__(self, mac, ip, name, type, brightnessChange,
                 colorChange, temperatureChange, minKelvin, maxKelvin, roomId):
        self.mac = mac
        self.ip = ip
        self.name = name
        self.type = type
        self.brightnessChange = brightnessChange
        self.colorChange = colorChange
        self.temperatureChange = temperatureChange
        self.minKelvin = minKelvin
        self.maxKelvin = maxKelvin
        self.roomId = roomId

    def serialize(self):
        return {"mac": self.mac,
                "ip": self.ip,
                "name": self.name,
                "type": self.type,
                "brightnessChange": self.brightnessChange,
                "colorChange": self.colorChange,
                "temperatureChange": self.temperatureChange,
                "minKelvin": self.minKelvin,
                "maxKelvin": self.maxKelvin,
                "roomId": self.roomId
                }


class NewLightSchema(Schema):
    mac = fields.String(required=True,
                        validate=lambda x: len(x) > 0,
                        error_messages={'required': 'MAC address is a required field!',
                                        "null": "MAC address is a required field!",
                                        'validator_failed': 'MAC address is a required field!'})

    ip = fields.String(required=True,
                       validate=lambda x: len(x) > 0,
                       error_messages={'required': 'IP address is a required field!',
                                       "null": "IP address is a required field!",
                                       'validator_failed': 'IP address is a required field!'})

    name = fields.String(required=True,
                         validate=lambda x: len(x) > 0,
                         error_messages={'required': 'Name is a required field!',
                                         "null": "Name is a required field!",
                                         'validator_failed': 'Name is a required field!'})

    type = fields.String(required=True,
                         validate=lambda x: len(x) > 0,
                         error_messages={'required': 'Light type is a required field!',
                                         "null": "Light type is a required field!",
                                         'validator_failed': 'Light type is a required field!'})

    brightnessChange = fields.Boolean(required=True,
                                      error_messages={'required': 'Brightness change ability is a required field!',
                                                      "null": "Brightness change ability is a required field!"})

    colorChange = fields.Boolean(required=True,
                                 error_messages={'required': 'Color change ability is a required field!',
                                                 "null": "Color change ability is a required field!"})

    temperatureChange = fields.Boolean(required=True,
                                       error_messages={
                                           'required': 'Light temperature change ability is a required field!',
                                           "null": "Light temperature change ability is a required field!"})

    minKelvin = fields.Integer(required=True,
                               validate=Range(min=1),
                               error_messages={'required': 'Minimum Kelvin is a required field!',
                                               'null': "Minimum Kelvin is a required field!",
                                               'validator_failed': 'Minimum Kelvin must be greater than 0!'})

    maxKelvin = fields.Integer(required=True,
                               validate=Range(min=1),
                               error_messages={'required': 'Maximum Kelvin is a required field!',
                                               'null': "Maximum Kelvin is a required field!",
                                               'validator_failed': 'Maximum Kelvin must be greater than 0!'})

    roomId = fields.Integer(required=True,
                            validate=Range(min=1),
                            error_messages={'required': 'Room ID is a required field!',
                                            'null': "Room ID is a required field!",
                                            'validator_failed': 'Room ID must be greater than 0!'})


newLightSchema = NewLightSchema()
