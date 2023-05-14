from typing import List

from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session

from backend.src.infrastructure.database.entity.user_entity import UserEntity
from backend.src.infrastructure.database.repositories.contracts.user_repository_interface import UsersRepository


class UsersRepositoryImpl(UsersRepository):
    def __init__(self, engine: Engine):
        self.engine = engine

    def get_all_users(self) -> List[UserEntity]:
        with Session(self.engine) as session:
            return session.query(UserEntity).all()

    def get_user_by_id(self, user_id: int) -> UserEntity:
        with Session(self.engine) as session:
            return session.query(UserEntity).filter(UserEntity.id == user_id).first()

    def add_user(self, user_data: UserEntity) -> UserEntity:
        with Session(self.engine) as session:
            session.add(user_data)
            session.commit()
            session.refresh(user_data)
            return user_data

    def update_user(self, user_data: UserEntity) -> UserEntity:
        with Session(self.engine) as session:
            session.query(UserEntity).filter(UserEntity.id == user_data.id).update({
                UserEntity.name: user_data.name,
                UserEntity.description: user_data.description,
                UserEntity.start_date: user_data.start_date,
                UserEntity.end_date: user_data.end_date,
                UserEntity.status: user_data.status,
            })
            session.commit()
            session.refresh(user_data)
            return user_data

    def delete_user(self, user_id: int) -> None:
        with Session(self.engine) as session:
            session.query(UserEntity).filter(UserEntity.id == user_id).delete()
            session.commit()