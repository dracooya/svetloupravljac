from flask import current_app
from pywizlight import wizlight, PilotBuilder

from backend.models.color_or_mode_config import ColorOrModeConfig
from backend.models.dtos.color_or_mode_config_basic import ColorOrModeConfigBasic
from backend.models.dtos.lights_color_config_basic import LightColorConfigBasic
from backend.models.dtos.modify_scene import ModifyScene
from backend.models.dtos.new_scene import NewScene
from backend.models.light_color_config import LightColorConfig
from backend.models.scene import Scene
from backend.repositories import light_repository, scene_repository
from backend.services.light_service import __wrapper
from backend.utils.validation_exception import ValidationException


def get_all():
    return scene_repository.get_all()


def add(scene: NewScene):
    lights_config = []
    for light_config in scene.config:
        light_config = LightColorConfigBasic(**light_config)
        light = light_repository.get_by_mac(light_config.light_mac)
        if light is None:
            raise ValidationException("Light with the specified MAC address does not exist!", 404)
        else:
            light_config.config = ColorOrModeConfigBasic(**light_config.config)
            config = LightColorConfig(light=light, config=ColorOrModeConfig(r=light_config.config.r,
                                                                            g=light_config.config.g,
                                                                            b=light_config.config.b,
                                                                            brightness=light_config.config.brightness,
                                                                            speed=light_config.config.speed,
                                                                            temperature=light_config.config.temperature,
                                                                            mode=light_config.config.mode))

            lights_config.append(config)

    scene_repository.add(Scene(name=scene.name, lightsConfig=lights_config))
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
                if config.config.r != -1 and config.config.g != -1 and config.config.b != -1:
                    await light.turn_on(PilotBuilder(rgb=(0, 128, 255), brightness=config.config.brightness))
                if config.config.temperature != -1:
                    await light.turn_on(PilotBuilder(colortemp=config.config.temperature, brightness=config.config.brightness))
                if config.config.mode != -1:
                    if config.config.speed != -1:
                        await light.turn_on(PilotBuilder(scene=config.config.mode, brightness=config.config.brightness, speed=config.config.speed))
                    else:
                        await light.turn_on(PilotBuilder(scene=config.config.mode, brightness=config.config.brightness))

    await __wrapper(execute, id=id)
