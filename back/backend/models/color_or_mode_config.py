from backend.utils.db_config import db
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey


class ColorOrModeConfig(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    r: Mapped[int] = mapped_column()
    g: Mapped[int] = mapped_column()
    b: Mapped[int] = mapped_column()
    brightness: Mapped[int] = mapped_column()
    temperature: Mapped[int] = mapped_column()
    speed: Mapped[int] = mapped_column()
    mode: Mapped[int] = mapped_column()

    def serialize(self):
        return {
            "r": self.r,
            "g": self.g,
            "b": self.b,
            "brightness": self.brightness,
            "temperature": self.temperature,
            "speed": self.speed,
            "mode": self.mode,
        }
