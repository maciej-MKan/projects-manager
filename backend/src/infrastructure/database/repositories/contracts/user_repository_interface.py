from abc import ABC, abstractmethod

from backend.src.infrastructure.database.entity.user_entity import UserEntity


class UsersRepository(ABC):

    @abstractmethod
    def get_all_users(self):
        pass

    @abstractmethod
    def get_user_by_id(self, user_id: int):
        pass

    @abstractmethod
    def add_user(self, user_data: UserEntity):
        pass

    @abstractmethod
    def update_user(self, user_data: UserEntity):
        pass

    @abstractmethod
    def delete_user(self, user_id: int):
        pass