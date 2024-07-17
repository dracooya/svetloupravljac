from marshmallow import Schema, fields
from marshmallow.validate import Range


class ModifyHouse:
    __slots__ = ['id', 'name']

    def __init__(self, id, name):
        self.id = id
        self.name = name


class ModifyHouseSchema(Schema):
    id = fields.Integer(required=True,
                        validate=Range(min=1),
                        error_messages={'required': 'House ID is a required field!',
                                        'null': "House ID is a required field!",
                                        'validator_failed': 'House ID must be greater than 0!'})

    name = fields.String(required=True,
                         validate=lambda x: len(x) > 0,
                         error_messages={'required': 'House name is a required field!',
                                         'null': "House name is a required field!",
                                         'validator_failed': 'House name is a required field!'})


modifyHouseSchema = ModifyHouseSchema()
