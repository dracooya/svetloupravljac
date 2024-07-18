from marshmallow import Schema, fields
from marshmallow.validate import Range


class ModifyHouseOrRoom:
    __slots__ = ['id', 'name']

    def __init__(self, id, name):
        self.id = id
        self.name = name


class ModifyHouseOrRoomSchema(Schema):
    id = fields.Integer(required=True,
                        validate=Range(min=1),
                        error_messages={'required': 'ID is a required field!',
                                        'null': "ID is a required field!",
                                        'validator_failed': 'ID must be greater than 0!'})

    name = fields.String(required=True,
                         validate=lambda x: len(x) > 0,
                         error_messages={'required': 'House name is a required field!',
                                         'null': "House name is a required field!",
                                         'validator_failed': 'House name is a required field!'})


modifyHouseOrRoomSchema = ModifyHouseOrRoomSchema()
