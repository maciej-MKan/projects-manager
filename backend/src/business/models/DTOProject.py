from datetime import datetime
from pydantic import BaseModel

from backend.src.business.models.DTOUser import User


class Project(BaseModel):
    id: int = None
    name: str
    description: str
    start_date: datetime
    end_date: datetime
    status: str
    author: int

    class Config:
        orm_mode = True

    def __repr__(self):
        return f"Project['id': {self.id}, 'name': {self.name}, 'description': {self.description}," \
               f" 'start_date': {self.start_date}, 'end_date': {self.end_date}, 'status': {self.status}," \
               f" 'author': {self.author}, 'users': {self.users}"

    def get_json(self):
        return self.json()
