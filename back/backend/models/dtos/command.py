class Command:
    __slots__ = ("ip", "r", "g", "b", "brightness", "temperature", "speed", "mode")

    def __init__(self, ip, r, g, b, brightness, temperature, speed, mode):
        self.ip = ip
        self.r = r
        self.g = g
        self.b = b
        self.brightness = brightness
        self.temperature = temperature
        self.speed = speed
        self.mode = mode
