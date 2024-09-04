from sqlalchemy import ForeignKey

from backend.models.scene_light_config import SceneLightConfig
from backend.utils.db_config import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List


class Scene(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)
    lightsConfig: Mapped[List["SceneLightConfig"]] = relationship(cascade='all, delete-orphan')
    room_id: Mapped[int] = mapped_column(ForeignKey("room.id"))

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lightsConfig": [config.serialize() for config in self.lightsConfig]
        }
