import code.repositories.room_repository as room_repository
import code.repositories.house_repository as house_repository
from code.models.dtos.modify_house_or_room import ModifyHouseOrRoom
from code.models.dtos.new_room import NewRoom
from code.utils.validation_exception import ValidationException


def add(new_room: NewRoom):
    house = house_repository.get_by_id(new_room.houseId)
    if house is None:
        raise ValidationException("House with the specified ID does not exist!", 404)
    _ = room_repository.add(new_room.name, house)
    return "Room successfully added!"


def modify(modifications: ModifyHouseOrRoom):
    room = room_repository.get_by_id(modifications.id)
    if room is None:
        raise ValidationException("Room with the specified ID does not exist!", 404)
    else:
        room_repository.modify(room, modifications.name)
        return "Room successfully modified!"


def delete(room_id: int):
    room = room_repository.get_by_id(room_id)
    if room is None:
        raise ValidationException("Room with the specified ID does not exist!", 404)
    else:
        house = house_repository.get_by_id(room.house_id)
        if len(house.rooms) == 1:
            house_repository.delete(house)
        else:
            room_repository.delete(room)
        return "Room successfully deleted!"
