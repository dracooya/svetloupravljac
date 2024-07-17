import code.repositories.house_repository as house_repository
import code.repositories.room_repository as room_repository
from code.models.dtos.new_house import NewHouse


def get_all():
    return house_repository.get_all()


def add(new_house: NewHouse):
    house_added = house_repository.add(new_house.houseName)
    _ = room_repository.add(new_house.roomName, house_added)
    return "House successfully added!"
