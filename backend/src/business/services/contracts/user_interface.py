from abc import ABC, abstractmethod


class Users(ABC):

    @abstractmethod
    def get_all_users(self):
        pass

    @abstractmethod
    def get_user_details(self, user_id):
        pass

    @abstractmethod
    def create_new_user(self, user_data):
        pass

    @abstractmethod
    def update_user(self, new_user_data):
        pass

    @abstractmethod
    def delete_user(self, user_id):
        pass

