from code.utils.get_broadcast_address import get_broadcast_address
from pywizlight import wizlight, discovery
from code.models.dtos.new_light import NewLight
import code.repositories.room_repository as room_repository
import code.repositories.light_repository as light_repository


async def discover():
    lights_initialized = []
    broadcast_address = get_broadcast_address()
    lights = await discovery.discover_lights(broadcast_space=broadcast_address)
    for light in lights:
        print(light.ip)
        light_type = await light.get_bulbtype()
        light_initialized = NewLight(mac=light.mac,
                                     ip=light.ip,
                                     name='',
                                     type='',
                                     brightnessChange=light_type.features.brightness,
                                     colorChange=light_type.features.color,
                                     temperatureChange=light_type.features.color_tmp,
                                     minKelvin=light_type.kelvin_range.min,
                                     maxKelvin=light_type.kelvin_range.max,
                                     roomId=0)
        lights_initialized.append(light_initialized)
    return lights_initialized


def add(light: NewLight):
    room = room_repository.get_by_id(light.roomId)
    if room is None:
        raise ValidationException("Room with the specified ID does not exist!", 404)
    else:
        try:
            light_repository.add(light, room)
            return "Light successfully added!"
        except Exception:
            raise ValidationException("Light with the specified MAC address already exists!", 404)
