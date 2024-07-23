from backend.utils.db_config import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey
from backend.models.color_or_mode_config import ColorOrModeConfig


class LightColorConfig(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    light: Mapped["Light"] = relationship("Light", back_populates="configs")
    light_mac: Mapped[str] = mapped_column(ForeignKey("light.mac"))
    config: Mapped["ColorOrModeConfig"] = relationship(cascade='all')
    config_id: Mapped[int] = mapped_column(ForeignKey("color_or_mode_config.id"))
    scene_id: Mapped[int] = mapped_column(ForeignKey("scene.id"))

    def serialize(self):
        return {
            "id": self.id,
            "light": self.light.serialize(),
            "config": self.config.serialize(),
        }
