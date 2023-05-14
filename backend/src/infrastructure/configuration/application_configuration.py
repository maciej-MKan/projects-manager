from ...business.services.projects_service import ProjectsService
from ...controllers.rest.project_controller import ProjectController
from ...infrastructure.configuration.database_configuration import DataBaseEngine
from ...infrastructure.database.repositories.project_repository import ProjectsRepositoryImpl

class ApplicationConfiguration:

    def __init__(self):
        self._project_repository = ProjectsRepositoryImpl(DataBaseEngine())

        self._project_service = ProjectsService(self._project_repository)

        self._project_controller = ProjectController(self._project_service)

        self._user_repository = UsersRepositoryImpl(DataBaseEngine())

        self._user_service = UsersService(self._user_repository)

        self._user_controller = UserController(self._user_service)

        self._comment_repository = CommentsRepositoryImpl(DataBaseEngine())

        self._comment_service = CommentsService(self._comment_repository)

        self._comment_controller = CommentController(self._comment_service)

    def get_project_controller(self):

        return self._project_controller

    def get_project_service(self):
        return self._project_service

    def get_project_repository(self):
        return self._project_repository

    def get_user_controller(self):
        return self._user_controller

    def get_user_service(self):
        return self._user_service

    def get_user_repository(self):
        return self._user_repository

    def get_comment_controller(self):
        return self._comment_controller

    def get_comment_service(self):
        return self._comment_service

    def get_comment_repository(self):
        return self._project_repository
