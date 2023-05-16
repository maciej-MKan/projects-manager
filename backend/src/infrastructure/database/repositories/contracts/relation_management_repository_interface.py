from abc import ABC, abstractmethod

from backend.src.infrastructure.database.entity.entity import UserEntity


class ManagementRepository(ABC):

    @abstractmethod
    def update_user_with_projects(self, user_data: UserEntity):
        pass

