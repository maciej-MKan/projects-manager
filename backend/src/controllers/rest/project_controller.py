from pyramid.response import Response
from pyramid.view import view_config

from backend.src.business.services.contracts.project_interface import Projects


class ProjectController:
    def __init__(self, request, projects_service: Projects):
        self.request = request
        self.projects_service = projects_service

    @view_config(route_name="index", request_method="GET", renderer="json")
    def index(self) -> Response:
        projects = self.projects_service.get_all_projects()
        response = Response(json=projects)
        return response
