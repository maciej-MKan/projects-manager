from pyramid.response import Response
from pyramid.view import view_config

from backend.src.business.services.contracts.project_interface import Projects


class ProjectController:
    def __init__(self, project_service: Projects):
        self.projects_service = project_service

    @view_config(request_method="GET", renderer="json")
    def get_all_projects(self, request) -> Response:
        projects = [project.get_json() for project in self.projects_service.get_all_projects()]
        response = Response(json=projects)
        return response

    @view_config(request_method="GET", renderer="json")
    def get_projects_by_user_id(self, request) -> Response:
        user_id = request.POST['USER_ID']
        projects = [project.get_json() for project in self.projects_service.get_projects_by_user_id(user_id)]
        response = Response(json=projects)
        return response



    # def includeme(self, config):
    #     config.add_view(self.get_all_projects)
