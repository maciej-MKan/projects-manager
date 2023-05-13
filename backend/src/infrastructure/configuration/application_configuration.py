from sqlalchemy import create_engine

from ...business.services.projects_service import ProjectsService
from ...controllers.rest.project_controller import ProjectController
from ...infrastructure.configuration.database_configuration import get_uri
from ...infrastructure.database.repositories.project_repository import ProjectsRepositoryImpl


def get_config():
    project_repository = ProjectsRepositoryImpl(create_engine(get_uri(), pool_size=10, max_overflow=20))

    project_service = ProjectsService()
    project_service.project_repository = project_repository

    project_controller = ProjectController()
    project_controller.projects_service = project_service

    return project_controller

