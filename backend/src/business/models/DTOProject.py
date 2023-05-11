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
    author: User
    users: list

    class Config:
        orm_mode = True
