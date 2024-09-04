from typing import List

from backend.models.room import Room
from backend.models.state_config import StateConfig
from backend.models.scene_light_config import SceneLightConfig
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
        config_transformed = SceneLightConfig(**config)
        mode_transformed = StateConfig(**config_transformed.config)
        config_transformed.config = mode_transformed
        scene.lightsConfig.append(config_transformed)
    db.session.commit()


def add(room: Room, scene: Scene):
    room.scenes.append(scene)
    db.session.commit()


def delete(scene: Scene):
    db.session.delete(scene)
    db.session.commit()
