from backend.models.light import Light
from backend.utils.db_config import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey
from typing import List


class Room(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)
    lights: Mapped[List["Light"]] = relationship(cascade='all, delete-orphan')
    scenes: Mapped[List["Scene"]] = relationship(cascade='all, delete-orphan')
    house_id: Mapped[int] = mapped_column(ForeignKey("house.id"))

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'lights': [light.serialize() for light in self.lights],
            'scenes': [scene.serialize() for scene in self.scenes]
        }
