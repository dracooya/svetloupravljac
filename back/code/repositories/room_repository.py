from code.models.room import Room
from code.models.house import House
from code.utils.db_config import db


def add(room_name: str, house: House):
    room = Room(name=room_name)
    house.rooms.append(room)
    db.session.commit()
    return room
