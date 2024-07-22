from backend.models.color_or_mode_config import ColorOrModeConfig
from backend.models.dtos.color_or_mode_config_basic import ColorOrModeConfigBasic
from backend.models.dtos.lights_color_config_basic import LightColorConfigBasic
from backend.models.dtos.new_scene import NewScene
from backend.models.light_color_config import LightColorConfig
from backend.models.scene import Scene
from backend.repositories import light_repository, scene_repository
from backend.utils.validation_exception import ValidationException


def get_all():
    return scene_repository.get_all()


def add(scene: NewScene):
    lights_config = []
    for light_config in scene.config:
        light_config = LightColorConfigBasic(**light_config)
        light = light_repository.get_by_mac(light_config.lightMac)
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