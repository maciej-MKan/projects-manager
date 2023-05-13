from pydantic import BaseModel


class User(BaseModel):
    id: int
    name: str
    surname: str
    age: int = None
    gender: str = None
    email: str
    phone_number: int = None
    projects: list = None

    class Config:
        orm_mode = True
