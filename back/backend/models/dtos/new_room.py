from marshmallow import Schema, fields
from marshmallow.validate import Range

class NewRoom:
    __slots__ = ['name', 'houseId']

    def __init__(self, name, houseId):
        self.name = name
        self.houseId = houseId


class NewRoomSchema(Schema):
    name = fields.String(required=True,
                         validate=lambda x: len(x) > 0,
                         error_messages={'required': 'Room name is a required field!',
                                         "null": "Room name is a required field!",
                                         'validator_failed': 'Room name is a required field!'})

    houseId = fields.Integer(required=True,
                             validate=Range(min=1),
                             error_messages={'required': 'House ID is a required field!',
                                             'null': "House ID is a required field!",
                                             'validator_failed': 'House ID must be greater than 0!'})


newRoomSchema = NewRoomSchema()
