from marshmallow import Schema, fields


class Password:
    __slots__ = 'password'

    def __init__(self, password):
        self.password = password


class PasswordSchema(Schema):
    password = fields.String(required=True,
                             validate=lambda x: len(x) > 0,
                             error_messages={'required': 'Password is a required field!',
                                             "null": "Password is a required field!",
                                             'validator_failed': 'Password is a required field!'})


passwordSchema = PasswordSchema()
