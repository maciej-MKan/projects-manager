from typing import List, Type

from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session
from sqlalchemy.event import listen
from sqlalchemy.pool import Pool

from backend.src.infrastructure.database.entity.entity import UserEntity
from backend.src.infrastructure.database.repositories.contracts.user_repository_interface import UsersRepository


class UsersRepositoryImpl(UsersRepository):
    def __init__(self, engine: Engine):
        self.engine = engine

    def get_all_users(self) -> List[Type[UserEntity]]:
        with Session(self.engine) as session:
            return session.query(UserEntity).all()

    def get_user_by_id(self, user_id: int) -> Type[UserEntity]:
        with Session(self.engine) as session:
            return session.query(UserEntity).filter(UserEntity.id == user_id).first()

    def add_user(self, user: UserEntity) -> UserEntity:
        with Session(self.engine) as session:
            session.add(user)
            session.commit()
            session.refresh(user)
            print("user ", user)
            return user

    def update_user(self, user_data: UserEntity, session: Session = None) -> Type[UserEntity] | UserEntity:

        if not session:
            session = Session(self.engine)
            try:
                self.update_user(user_data, session)
                session.commit()
                updated: Type[UserEntity] = self.get_user_by_id(user_data.id)
                return updated
            except Exception as e:
                session.rollback()
                raise e
            finally:
                session.close()

        session.query(UserEntity).filter(UserEntity.id == user_data.id).update(
            {
                UserEntity.first_name: user_data.first_name,
                UserEntity.last_name: user_data.last_name,
                UserEntity.password: user_data.password,
                UserEntity.age: user_data.age,
                UserEntity.gender: user_data.gender,
                UserEntity.email: user_data.email,
                UserEntity.phone_number: user_data.phone_number,
            }
        )

        return user_data

    def delete_user(self, user_id: int) -> Type[UserEntity] | None:
        with Session(self.engine) as session:
            user = session.query(UserEntity).filter(UserEntity.id == user_id).first()
            session.delete(user)
            session.commit()
        return user
