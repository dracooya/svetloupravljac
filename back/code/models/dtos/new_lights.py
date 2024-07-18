from marshmallow import Schema, fields
from marshmallow.validate import Range
from code.models.dtos.new_light import NewLightSchema


class NewLights:
    __slots__ = 'lights'

    def __init__(self, lights):
        self.lights = lights


class NewLightsSchema(Schema):
    lights = fields.List(fields.Nested(NewLightSchema),
                         required=True,
                         error_messages={'required': 'Lights list is a required field!',
                                         "null": "Lights list is a required field!"})


newLightsSchema = NewLightsSchema()
