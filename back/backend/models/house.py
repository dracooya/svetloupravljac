from backend.models.room import Room
from backend.utils.db_config import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List


class House(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)
    rooms: Mapped[List["Room"]] = relationship(cascade='all, delete-orphan')

    def serialize(self):
        return {"id": self.id,
                "name": self.name,
                "rooms": [room.serialize() for room in self.rooms]}
