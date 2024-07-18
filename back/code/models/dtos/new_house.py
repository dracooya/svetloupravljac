from marshmallow import Schema, fields


class NewHouse:
    __slots__ = ['houseName', 'roomName']

    def __init__(self, houseName, roomName):
        self.houseName = houseName
        self.roomName = roomName


class NewHouseSchema(Schema):
    houseName = fields.String(required=True,
                              validate=lambda x: len(x) > 0,
                              error_messages={'required': 'House name is a required field!',
                                              "null": "House name is a required field!",
                                              'validator_failed': 'House name is a required field!'})

    roomName = fields.String(required=True,
                             validate=lambda x: len(x) > 0,
                             error_messages={'required': 'Room name is a required field!',
                                             "null": "Room name is a required field!",
                                             'validator_failed': 'Room name is a required field!'})


newHouseSchema = NewHouseSchema()
