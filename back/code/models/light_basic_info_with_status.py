class LightBasicInfoWithStatus(LightBasicInfo):
    __slots__ = ['isOn']

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.isOn = kwargs['isOn']
