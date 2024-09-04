from flask import current_app
from pywizlight import wizlight, PilotBuilder

from backend.models.state_config import StateConfig
from backend.models.dtos.color_or_mode_config_basic import ColorOrModeConfigBasic
from backend.models.dtos.lights_color_config_basic import LightColorConfigBasic
from backend.models.dtos.modify_scene import ModifyScene
from backend.models.dtos.new_scene import NewScene
from backend.models.scene_light_config import SceneLightConfig
from backend.models.scene import Scene
from backend.repositories import light_repository, scene_repository, room_repository
from backend.services.light_service import __wrapper
from backend.utils.validation_exception import ValidationException


def get_all():
    return scene_repository.get_all()


def add(scene: NewScene):
    lights_config = []
    room = room_repository.get_by_id(scene.roomId)
    if room is None:
        raise ValidationException("Room with the specified ID does not exist!", 404)
    else:
        for light_config in scene.config:
            light_config = LightColorConfigBasic(**light_config)
            light = light_repository.get_by_mac(light_config.light_mac)
            if light is None:
                raise ValidationException("Light with the specified MAC address does not exist!", 404)
            else:
                light_config.config = ColorOrModeConfigBasic(**light_config.config)
                config = SceneLightConfig(light=light, state=StateConfig(r=light_config.config.r,
                                                                          g=light_config.config.g,
                                                                          b=light_config.config.b,
                                                                          brightness=light_config.config.brightness,
                                                                          speed=light_config.config.speed,
                                                                          temperature=light_config.config.temperature,
                                                                          mode=light_config.config.mode))
                lights_config.append(config)
        scene_repository.add(room, Scene(name=scene.name, lightsConfig=lights_config))
        return "Scene successfully added!"


def modify(modifications: ModifyScene):
    scene = scene_repository.get_by_id(modifications.id)
    if scene is None:
        raise ValidationException("Scene with the specified ID does not exist!", 404)
    else:
        params = NewScene(**modifications.modifications)
        scene_repository.modify(scene, params.name, params.config)
        return "Scene successfully modified!"


def delete(scene_id: int):
    scene = scene_repository.get_by_id(scene_id)
    if scene is None:
        raise ValidationException("Scene with the specified ID does not exist!", 404)
    else:
        scene_repository.delete(scene)
        return "Scene successfully removed!"


async def turn_on(id: int):
    async def execute(id: int):
        with current_app.app_context():
            scene = scene_repository.get_by_id(id)
            if scene is None:
                return
            for config in scene.lightsConfig:
                light = wizlight(config.light.ip)
                if config.state.r != -1 and config.state.g != -1 and config.state.b != -1:
                    await light.turn_on(PilotBuilder(rgb=(config.state.r, config.state.g, config.state.b), brightness=config.state.brightness))
                if config.state.temperature != -1:
                    await light.turn_on(PilotBuilder(colortemp=config.state.temperature, brightness=config.state.brightness))
                if config.state.mode != -1:
                    if config.state.speed != -1:
                        await light.turn_on(PilotBuilder(scene=config.state.mode, brightness=config.state.brightness, speed=config.state.speed))
                    else:
                        await light.turn_on(PilotBuilder(scene=config.state.mode, brightness=config.state.brightness))
    await __wrapper(execute, id=id)
