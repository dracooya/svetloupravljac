from sqlalchemy.orm import sessionmaker

from backend.models.dtos.new_light import NewLight
from backend.models.room import Room
from backend.models.light import Light
from backend.utils.db_config import db
from sqlalchemy.exc import IntegrityError


def get_all():
    return Light.query.all()


def get_by_mac(mac: str):
    return Light.query.filter_by(mac=mac).first()


def update_ip(light: Light, ip: str, app):
    light.ip = ip
    with app.app_context():
        session = sessionmaker(bind=db.engine)()
        session.add(light)
        session.commit()


def add(info: NewLight, room: Room):
    try:
        light = Light(mac=info.mac,
                      ip=info.ip,
                      name=info.name,
                      type=info.type,
                      brightnessChange=info.brightnessChange,
                      colorChange=info.colorChange,
                      temperatureChange=info.temperatureChange,
                      minKelvin=info.minKelvin,
                      maxKelvin=info.maxKelvin)
        room.lights.append(light)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        raise Exception()


def modify(light: Light, newName: str):
    light.name = newName
    db.session.commit()


def delete(light: Light):
    db.session.delete(light)
    db.session.commit()
