from typing import List

from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session

from backend.src.infrastructure.database.entity.user_entity import UserEntity, ProjectEntity
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

    def add_user(self, user: UserEntity) -> UserEntity:
        with Session(self.engine) as session:
            session.add(user)
            session.commit()
            session.refresh(user)
            return user

    def update_user(self, user_data: UserEntity) -> UserEntity:
        with Session(self.engine) as session:
            user = session.query(UserEntity).filter(UserEntity.id == user_data.id).one()
            user.first_name = user_data.first_name
            user.last_name = user_data.last_name
            user.password = user_data.password
            user.age = user_data.age
            user.gender = user_data.gender
            user.email = user_data.email
            user.phone_number = user_data.phone_number
            user.projects = user_data.projects
            session.merge(user)
            session.commit()
            session.refresh(user)
            print(user)
            return user_data
        # with Session(self.engine) as session:
        #     session.query(UserEntity).filter(UserEntity.id == user_data.id). \
        #         update({UserEntity.first_name: user_data.first_name,
        #                 UserEntity.last_name: user_data.last_name,
        #                 UserEntity.password: user_data.password,
        #                 UserEntity.age: user_data.age,
        #                 UserEntity.gender: user_data.gender,
        #                 UserEntity.email: user_data.email,
        #                 UserEntity.phone_number: user_data.phone_number,
        #                 UserEntity.projects: user_data.projects,
        #                 }, synchronize_session='evaluate')
        #     session.commit()
        #     session.refresh(user_data)
        #     return user_data

    def delete_user(self, user_id: int) -> None:
        with Session(self.engine) as session:
            session.query(UserEntity).filter(UserEntity.id == user_id).delete()
            session.commit()
