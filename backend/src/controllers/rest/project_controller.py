from pyramid.response import Response
from pyramid.view import view_config

from backend.src.business.services.contracts.project_interface import Projects


class ProjectController:
    def __init__(self, project_service: Projects):
        self.projects_service = project_service

    @view_config(route_name="index", request_method="GET", renderer="json")
    def all_projects(self, request) -> Response:
        projects = self.projects_service.get_all_projects()
        response = Response(json=projects)
        return response

    def includeme(self, config):
        config.add_view(self.all_projects)
