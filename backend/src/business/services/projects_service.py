from datetime import datetime

from backend.src.business.models import DTOProject
from backend.src.business.models.DTOProject import Project
from backend.src.business.services.contracts.project_interface import Projects
from backend.src.infrastructure.database.entity.project_entity import ProjectEntity
from backend.src.infrastructure.database.repositories.contracts.project_repository_interface import ProjectsRepository


def to_projectDTO_mapper(entity: ProjectEntity):
    return Project(
        id=entity.id,
        name=entity.name,
        description=entity.description,
        start_date=datetime.fromtimestamp(entity.start_date),
        end_date=datetime.fromtimestamp(entity.end_date),
        status=entity.status,
        author=entity.author,
        users=entity.users,
    )


def to_entity_mapper(project_data: Project):
    return ProjectEntity(
        id=project_data.id,
        name=project_data.name,
        description=project_data.description,
        start_date=int(project_data.start_date.timestamp()),
        end_date=int(project_data.end_date.timestamp()),
        status=project_data.status,
        author=project_data.author,
        users=project_data.users,
    )


class ProjectsService(Projects):
    def __int__(self, project_repository: ProjectsRepository):
        self.project_repository = project_repository

    def get_all_projects(self):
        project_entity = self.project_repository.get_all_projects()
        project_list = []

        for entity in project_entity:
            project_list.append(to_projectDTO_mapper(entity))

        return project_list

    def get_project_details(self, project_id: int):
        return to_projectDTO_mapper(self.project_repository.get_project_by_id(project_id))

    def create_new_project(self, project: DTOProject):
        self.project_repository.add_project(project)

    def update_project(self, new_project_data: DTOProject):
        self.project_repository.update_project(to_entity_mapper(new_project_data))

    def delete_project(self, project_id):
        self.project_repository.delete_project(project_id)
