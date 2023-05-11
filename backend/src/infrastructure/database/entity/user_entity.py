from pydantic import BaseModel


class UserEntity(BaseModel):

    id: int
    name: str
    surname: str
    age: int = None
    gander: str = None
    email: str
    phone_number: int = None
    projects: list = None
