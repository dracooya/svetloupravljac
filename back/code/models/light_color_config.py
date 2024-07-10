from code.models.light import Light
from code.utils.db_config import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey


class LightColorConfig(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    light: Mapped["Light"] = relationship()
    light_id: Mapped[int] = mapped_column(ForeignKey("light.id"))
    config: Mapped["LightColorConfig"] = relationship()
    config_id: Mapped[int] = mapped_column(ForeignKey("color_or_mode_config.id"))
