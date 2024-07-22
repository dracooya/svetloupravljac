from backend.models.scene import Scene
from backend.utils.db_config import db


def get_all():
    return Scene.query.all()


def add(scene: Scene):
    db.session.add(scene)
    db.session.commit()
