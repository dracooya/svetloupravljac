from backend.models.dtos.command import Command


class LightBasicInfoWithStatus(Command):
    __slots__ = ['isOn']

    def __init__(self, **kwargs):
        self.isOn = kwargs.pop('isOn', None)
        super().__init__(**kwargs)

    def serialize(self):
        return {
            'isOn': self.isOn,
            'ip': self.ip,
            'r': self.r,
            'g': self.g,
            'b': self.b,
            'brightness': self.brightness,
            'temperature': self.temperature,
            'speed': self.speed,
            'mode': self.mode
        }
