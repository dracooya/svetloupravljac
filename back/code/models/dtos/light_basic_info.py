from code.utils.db_config import db
from sqlalchemy.orm import Mapped, mapped_column


class LightBasicInfo:
    __slots__ = ('id', 'ip', 'name', 'type')

    def __init__(self, id, ip, name, type):
        self.id = id
        self.ip = ip
        self.name = name
        self.type = type
