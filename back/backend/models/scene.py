from backend.models.light_color_config import LightColorConfig
from backend.utils.db_config import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List


class Scene(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)
    lightsConfig: Mapped[List["LightColorConfig"]] = relationship(cascade='all, delete-orphan')
