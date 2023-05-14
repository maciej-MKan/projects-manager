from pyramid.response import Response
from pyramid.view import view_config

from backend.src.business.services.contracts.user_interface import Users


class ProjectController:
    def __init__(self, user_service: Users):
        self.users_service = user_service

    @view_config(request_method="GET", renderer="json")
    def get_all_users(self, request) -> Response:
        users = [user.get_json() for user in self.users_service.get_all_users()]
        response = Response(json=users)
        return response

    @view_config(request_method="GET", renderer="json")
    def get_users_by_user_id(self, request) -> Response:
        user_id = request.POST['USER_ID']
        users = [user.get_json() for user in self.users_service.get_users_by_user_id(user_id)]
        response = Response(json=users)
        return response



    # def includeme(self, config):
    #     config.add_view(self.get_all_users)
