from marshmallow import Schema, fields
from marshmallow.validate import Range


class ModifyLight:
    __slots__ = ['mac', 'name', 'roomId']

    def __init__(self, mac, name, roomId):
        self.mac = mac
        self.name = name
        self.roomId = roomId


class ModifyLightSchema(Schema):
    mac = fields.String(required=True,
                        validate=lambda x: len(x) > 0,
                        error_messages={'required': 'MAC address is a required field!',
                                        'null': "MAC address is a required field!",
                                        'validator_failed': 'MAC address is a required field!'})

    name = fields.String(required=True,
                         validate=lambda x: len(x) > 0,
                         error_messages={'required': 'Light name is a required field!',
                                         'null': "Light name is a required field!",
                                         'validator_failed': 'Light name is a required field!'})

    roomId = fields.Integer(required=True,
                            validate=Range(min=1),
                            error_messages={'required': 'Room ID is a required field!',
                                            'null': "Room ID is a required field!",
                                            'validator_failed': 'Room ID must be greater than 0!'})


modifyLightSchema = ModifyLightSchema()
