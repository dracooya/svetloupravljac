from code.models.house import House
from code.utils.db_config import db


def get_all():
    return House.query.all()


def add(house_name: str):
    house = House(name=house_name)
    db.session.add(house)
    db.session.commit()
    return house
