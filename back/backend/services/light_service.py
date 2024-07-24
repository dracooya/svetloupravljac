import traceback
from typing import List


from backend.models.dtos.light_basic_info_with_status import LightBasicInfoWithStatus
from backend.models.light import Light
from backend.utils.get_broadcast_address import get_broadcast_address
from pywizlight import wizlight, discovery, PilotBuilder
from pywizlight.exceptions import WizLightConnectionError

from backend.models.dtos.new_light import NewLight
import backend.repositories.room_repository as room_repository
import backend.repositories.light_repository as light_repository
from flask import current_app

from backend.utils.socket_authorization_decorator import authorize
from backend.utils.socket_instance import socket
from backend.utils.validation_exception import ValidationException
from backend.models.dtos.modify_light import ModifyLight
from backend.models.dtos.command import Command

import threading
import asyncio

all_lights: List[Light] = []


def init_all_lights(app):
    global all_lights
    with app.app_context():
        all_lights = light_repository.get_all()


async def update_ips(app):
    global all_lights
    while True:
        print("Updating IP addresses")
        broadcast_address = get_broadcast_address()
        discovered_lights = await discovery.discover_lights(broadcast_space=broadcast_address, wait_time=1.0)
        for light in discovered_lights:
            match = next((light_init for light_init in all_lights if light.mac == light_init.mac), None)
            if match.ip != light.ip:
                print(match.ip)
                with app.app_context():
                    light_repository.update_ip(match, light.ip, app)
        await asyncio.sleep(300)


async def get_states(app):
    global all_lights
    while True:
        try:
            print("Getting light states")
            states = await get_lights_states([light.ip for light in all_lights])
            transformed_states = [state.serialize() for state in states]
            with app.app_context():
                socket.emit('states', {"states": transformed_states})
        except Exception:
            traceback.print_exc()
        await asyncio.sleep(10)


def __start_background_task(loop):
    asyncio.set_event_loop(loop)
    loop.run_forever()


def run_background_task(app, task):
    loop = asyncio.new_event_loop()
    t = threading.Thread(target=__start_background_task, args=(loop,))
    t.daemon = True
    t.start()

    asyncio.run_coroutine_threadsafe(task(app), loop)


async def __wrapper(function, **kwargs):
    try:
        ret_val = await function(**kwargs)
        try:
            del wizlight.__del__
        except AttributeError:
            pass
        return ret_val
    except WizLightConnectionError:
        pass


async def discover():
    with current_app.app_context():
        all_lights = light_repository.get_all()
    lights_initialized = []
    broadcast_address = get_broadcast_address()
    lights = await discovery.discover_lights(broadcast_space=broadcast_address)
    for light in lights:
        print(light.ip)
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
    global all_lights
    room = room_repository.get_by_id(light.roomId)
    if room is None:
        raise ValidationException("Room with the specified ID does not exist!", 404)
    else:
        try:
            new_light = light_repository.add(light, room)
            all_lights.append(new_light)
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
    global all_lights
    light = light_repository.get_by_mac(mac)
    if light is None:
        raise ValidationException("Light with the specified ID does not exist!", 404)
    else:
        light_repository.delete(light)
        all_lights.remove(light)
        return "Light successfully removed!"


async def trigger_command(command: Command):
    async def execute(command: Command):
        light = wizlight(command.ip)
        if command.r > -1 and command.g > -1 and command.b > 1:
            await light.turn_on(PilotBuilder(rgb=(command.r, command.g, command.b)))
        elif command.mode > -1:
            await light.turn_on(PilotBuilder(scene=command.mode))
        elif command.temperature > -1:
            await light.turn_on(PilotBuilder(colortemp=command.temperature))
        elif command.brightness > -1:
            await light.turn_on(PilotBuilder(brightness=command.brightness))
        elif command.speed > -1:
            await light.send({"method": "setPilot", "params": {"speed": command.speed}})
        else:
            pass

    await __wrapper(execute, command=command)


async def get_lights_states(lights_ips: List[str]):
    async def execute(light_ip: str):
        light = wizlight(light_ip)
        current_state = await light.updateState()
        return LightBasicInfoWithStatus(isOn=current_state.get_state(),
                                        ip=light_ip,
                                        r=current_state.get_rgb()[0] if current_state.get_rgb()[
                                                                            0] is not None else -1,
                                        g=current_state.get_rgb()[1] if current_state.get_rgb()[
                                                                            1] is not None else -1,
                                        b=current_state.get_rgb()[2] if current_state.get_rgb()[
                                                                            2] is not None else -1,
                                        brightness=current_state.get_brightness(),
                                        mode=current_state.get_scene_id() if current_state.get_scene() is not None else -1,
                                        temperature=current_state.get_colortemp(),
                                        speed=50 if current_state.get_speed() is None else current_state.get_speed())

    states = []
    for ip in lights_ips:
        state = await __wrapper(execute, light_ip=ip)
        if state is not None:
            states.append(state)
    return states


async def turn_off(light_ip: str):
    async def execute(light_ip: str):
        light = wizlight(light_ip)
        await light.turn_off()

    await __wrapper(execute, light_ip=light_ip)


async def turn_off_all(lights_ips: List[str]):
    async def execute(lights_ips: List[str]):
        for ip in lights_ips:
            await turn_off(ip)

    await __wrapper(execute, lights_ips=lights_ips)


async def turn_on(ip: str):
    async def execute(ip: str):
        light = wizlight(ip)
        await light.turn_on(PilotBuilder())

    await __wrapper(execute, ip=ip)


async def turn_on_all(lights_ips: List[str]):
    async def execute(lights_ips: List[str]):
        for ip in lights_ips:
            await turn_on(ip)

    await __wrapper(execute, lights_ips=lights_ips)
