from code.utils.get_broadcast_address import get_broadcast_address
from pywizlight import wizlight, discovery, PilotBuilder
from code.models.dtos.new_light import NewLight
import code.repositories.room_repository as room_repository
import code.repositories.light_repository as light_repository
from flask import current_app
from code.utils.validation_exception import ValidationException
from code.models.dtos.modify_light import ModifyLight


async def discover():
    with current_app.app_context():
        all_lights = light_repository.get_all()
    lights_initialized = []
    broadcast_address = get_broadcast_address()
    lights = await discovery.discover_lights(broadcast_space=broadcast_address)
    for light in lights:
        if any(light.mac in vars(existing_light).values() for existing_light in all_lights):
            continue
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
    try:
        del wizlight.__del__
    except AttributeError:
        return lights_initialized
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


def modify(modifications: ModifyLight):
    light = light_repository.get_by_mac(modifications.mac)
    if light is None:
        raise ValidationException("Light with the specified MAC address does not exist!", 404)
    else:
        if light.room_id != modifications.roomId:
            new_room = room_repository.get_by_id(modifications.roomId)
            if new_room is None:
                raise ValidationException("Room with the specified ID does not exist!", 404)
            else:
                room_repository.move_light(new_room, light)
        light_repository.modify(light, modifications.name)
        return "Light successfully modified!"


def delete(mac: str):
    light = light_repository.get_by_mac(mac)
    if light is None:
        raise ValidationException("Light with the specified ID does not exist!", 404)
    else:
        light_repository.delete(light)
        return "Light successfully removed!"


async def ping(ip: str):
    light = wizlight(ip)
    await light.turn_on(PilotBuilder())
