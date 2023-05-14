from backend.src.business.models import DTOUser
from backend.src.business.services.contracts.user_interface import Users
from backend.src.infrastructure.database.repositories.contracts.user_repository_interface import UsersRepository
from backend.src.utils.mappers import *


class UsersService(Users):
    def get_users_by_user_id(self, user_id):
        pass

    def __init__(self, user_repository: UsersRepository):
        self.user_repository = user_repository

    def get_all_users(self):
        user_entity = self.user_repository.get_all_users()
        user_list: list[DTOUser] = []

        for entity in user_entity:
            user_list.append(user_entity_dto_mapper(entity))
        print(user_list)
        return user_list

    def get_user_details(self, user_id: int):
        return user_entity_dto_mapper(self.user_repository.get_user_by_id(user_id))

    def create_new_user(self, user: DTOUser):
        self.user_repository.add_user(user)

    def update_user(self, new_user_data: DTOUser):
        self.user_repository.update_user(user_dto_entity_mapper(new_user_data))

    def delete_user(self, user_id):
        self.user_repository.delete_user(user_id)