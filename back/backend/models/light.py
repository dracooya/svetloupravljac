from backend.utils.db_config import db
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey


class Light(db.Model):
    mac: Mapped[str] = mapped_column(primary_key=True)
    ip: Mapped[str] = mapped_column(nullable=False)
    name: Mapped[str] = mapped_column(nullable=False)
    type: Mapped[str] = mapped_column(nullable=False)
    brightnessChange: Mapped[bool] = mapped_column(nullable=False)
    colorChange: Mapped[bool] = mapped_column(nullable=False)
    temperatureChange: Mapped[bool] = mapped_column(nullable=False)
    minKelvin: Mapped[int] = mapped_column(nullable=False)
    maxKelvin: Mapped[int] = mapped_column(nullable=False)
    room_id: Mapped[int] = mapped_column(ForeignKey("room.id"))

    def __eq__(self, other):
        return self.mac == other.mac

    def serialize(self):
        return {
            'mac': self.mac,
            'ip': self.ip,
            'name': self.name,
            'type': self.type,
            'brightnessChange': self.brightnessChange,
            'colorChange': self.colorChange,
            'temperatureChange': self.temperatureChange,
            'minKelvin': self.minKelvin,
            'maxKelvin': self.maxKelvin,
        }
