from backend.models.house import House
from backend.utils.db_config import db


def get_all():
    return House.query.all()


def add(house_name: str):
    house = House(name=house_name)
    db.session.add(house)
    db.session.commit()
    return house


def get_by_id(house_id: int):
    return House.query.filter_by(id=house_id).first()


def modify(house: House, newName: str):
    house.name = newName
    db.session.commit()


def delete(house: House):
    db.session.delete(house)
    db.session.commit()
