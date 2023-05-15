from datetime import datetime

from pydantic import BaseModel

from backend.src.business.models.DTOProject import Project
from backend.src.business.models.DTOUser import User


class Comment(BaseModel):
    id: int
    project: Project
    author: User
    description: str
    date: datetime

    class Config:
        orm_mode = True

    def get_json(self):
        return self.json()