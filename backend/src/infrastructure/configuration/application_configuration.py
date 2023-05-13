from ...business.services.projects_service import ProjectsService
from ...controllers.rest.project_controller import ProjectController
from ...infrastructure.configuration.database_configuration import DataBaseEngine
from ...infrastructure.database.repositories.project_repository import ProjectsRepositoryImpl


def get_config():
    project_repository = ProjectsRepositoryImpl(DataBaseEngine())

    project_service = ProjectsService(project_repository)

    project_controller = ProjectController(project_service)

    return project_controller

