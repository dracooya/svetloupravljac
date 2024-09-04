from typing import List

from backend.models.color_or_mode_config import ColorOrModeConfig
from backend.models.light_color_config import LightColorConfig
from backend.models.scene import Scene
from backend.utils.db_config import db


def get_all():
    return Scene.query.all()


def get_by_id(scene_id: int):
    return Scene.query.filter_by(id=scene_id).first()


def modify(scene: Scene, new_name: str, lights_config: List[dict]):
    scene.name = new_name
    scene.lightsConfig.clear()
    db.session.flush()
    for config in lights_config:
        config_transformed = LightColorConfig(**config)
        mode_transformed = ColorOrModeConfig(**config_transformed.config)
        config_transformed.config = mode_transformed
        scene.lightsConfig.append(config_transformed)
    db.session.commit()


def add(scene: Scene):
    db.session.add(scene)
    db.session.commit()


def delete(scene: Scene):
    db.session.delete(scene)
    db.session.commit()
