from backend.src.business.models import DTOProject
from backend.src.business.services.contracts.project_interface import Projects
from backend.src.infrastructure.database.repositories.contracts.project_repository_interface import ProjectsRepository
from backend.src.utils.mappers import *


class ProjectsService(Projects):
    def __int__(self):
        self.project_repository: ProjectsRepository = None

    def get_all_projects(self):
        project_entity = self.project_repository.get_all_projects()
        project_list: list[DTOProject] = []

        for entity in project_entity:
            project_list.append(project_entity_dto_mapper(entity).get_json())
        print(project_list)
        return project_list

    def get_project_details(self, project_id: int):
        return project_entity_dto_mapper(self.project_repository.get_project_by_id(project_id))

    def create_new_project(self, project: DTOProject):
        self.project_repository.add_project(project)

    def update_project(self, new_project_data: DTOProject):
        self.project_repository.update_project(project_dto_entity_mapper(new_project_data))

    def delete_project(self, project_id):
        self.project_repository.delete_project(project_id)
