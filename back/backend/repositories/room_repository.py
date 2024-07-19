from backend.models.room import Room
from backend.models.house import House
from backend.utils.db_config import db
from backend.models.light import Light


def add(room_name: str, house: House):
    room = Room(name=room_name)
    house.rooms.append(room)
    db.session.commit()
    return room


def get_by_id(room_id: int):
    return Room.query.filter_by(id=room_id).first()


def modify(room: Room, newName: str):
    room.name = newName
    db.session.commit()


def move_light(new_room: Room, light: Light):
    new_room.lights.append(light)
    db.session.commit()


def delete(room: Room):
    db.session.delete(room)
    db.session.commit()
