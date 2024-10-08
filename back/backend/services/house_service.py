import backend.repositories.house_repository as house_repository
import backend.repositories.room_repository as room_repository
from backend.models.dtos.new_house import NewHouse
from backend.models.dtos.modify_house_or_room import ModifyHouseOrRoom
from backend.utils.validation_exception import ValidationException


def get_all():
    return house_repository.get_all()


def add(new_house: NewHouse):
    house_added = house_repository.add(new_house.houseName)
    _ = room_repository.add(new_house.roomName, house_added)
    return "House successfully added!"


def modify(modifications: ModifyHouseOrRoom):
    house = house_repository.get_by_id(modifications.id)
    if house is None:
        raise ValidationException("House with the specified ID does not exist!", 404)
    else:
        house_repository.modify(house, modifications.name)
        return "House successfully modified!"


def delete(house_id: int):
    house = house_repository.get_by_id(house_id)
    if house is None:
        raise ValidationException("House with the specified ID does not exist!", 404)
    else:
        house_repository.delete(house)
        return "House successfully removed!"
