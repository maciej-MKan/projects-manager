from datetime import datetime

from pydantic import BaseModel

from backend.src.business.models.DTOProject import Project
from backend.src.business.models.DTOUser import User


class Comment(BaseModel):
    id: int = None
    project: int = None
    author: int = None
    description: str
    date: datetime

    class Config:
        orm_mode = True

    def get_json(self):
        return self.json()
