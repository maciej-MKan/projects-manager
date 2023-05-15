from pydantic import parse_obj_as
from pyramid.response import Response
from pyramid.view import view_config

from backend.src.business.models.DTOProject import Project
from backend.src.business.models.DTOUser import User
from backend.src.business.services.contracts.user_interface import Users
from backend.src.controllers.exceptions.exceptions_view import ArgumentFailure


class UserController:
    def __init__(self, user_service: Users):
        self.users_service = user_service

    @view_config(request_method="GET", renderer="json")
    def get_all_users(self, request) -> Response:
        users = [user.get_json() for user in self.users_service.get_all_users()]
        response = Response(json=users)
        return response

    @view_config(request_method="GET", renderer="json")
    def get_user(self, request) -> Response:
        user_id = None
        try:
            user_id = request.GET['user_id']
            user = self.users_service.get_user_details(user_id)
            response = Response(json=user)
            return response
        except Exception:
            raise ArgumentFailure(f"No user {user_id} found")

    @view_config(reqest_method="POST", renderer="json")
    def add_user(self, request):
        if request.json_body.get('projects'):
            raise Exception("Can't add user with projects")
        user_data: dict = request.json_body
        # user_create = UserCreate(**user_data)
        self.users_service.create_new_user(parse_obj_as(User, user_data))
        response = Response("ok")
        return response

    @view_config(reqest_method="PUT", renderer="json")
    def update_user(self, request):
        user_data: dict = request.json_body
        user: User = parse_obj_as(User, user_data)
        projects = [parse_obj_as(Project, project) for project in user.projects]
        user.projects = projects
        update_user_result = self.users_service.update_user(user)
        response = Response(json=update_user_result)
        return response

    # def includeme(self, config):
    #     config.add_view(self.get_all_users)
