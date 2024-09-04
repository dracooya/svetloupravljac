from backend.utils.db_config import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey
from backend.models.state_config import StateConfig


class SceneLightConfig(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    light: Mapped["Light"] = relationship("Light", back_populates="configs")
    light_mac: Mapped[str] = mapped_column(ForeignKey("light.mac"))
    state: Mapped["StateConfig"] = relationship(cascade='all')
    state_id: Mapped[int] = mapped_column(ForeignKey("state_config.id"))
    scene_id: Mapped[int] = mapped_column(ForeignKey("scene.id"))

    def serialize(self):
        return {
            "id": self.id,
            "light": self.light.serialize(),
            "state": self.state.serialize(),
        }
