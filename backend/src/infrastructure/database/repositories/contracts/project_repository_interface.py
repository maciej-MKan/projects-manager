from abc import ABC, abstractmethod

from backend.src.infrastructure.database.entity.project_entity import ProjectEntity


class ProjectsRepository(ABC):

    @abstractmethod
    def get_all_projects(self):
        pass

    @abstractmethod
    def get_project_by_id(self, project_id: int):
        pass

    @abstractmethod
    def add_project(self, project_data: ProjectEntity):
        pass

    @abstractmethod
    def update_project(self, project_data: ProjectEntity):
        pass

    @abstractmethod
    def delete_project(self, project_id: int):
        pass
