from pydantic import parse_obj_as
from pyramid.response import Response
from pyramid.view import view_config

from backend.src.business.models.DTOProject import Project
from backend.src.business.services.contracts.project_interface import Projects


class ProjectController:
    def __init__(self, project_service: Projects):
        self.projects_service = project_service

    @view_config(request_method="GET")
    def get_all_projects(self, request) -> Response:
        projects = [project.get_json() for project in self.projects_service.get_all_projects()]
        response = Response(json=projects)
        return response

    @view_config(request_method="GET")
    def get_projects_by_user_id(self, request) -> Response:
        user_id = request.GET['user_id']
        projects = [project.get_json() for project in self.projects_service.get_projects_by_user_id(user_id)]
        response = Response(json=projects)
        return response

    @view_config(reqest_method="PUT")
    def update_project(self, request):
        project_data: dict = request.json_body
        project: Project = parse_obj_as(Project, project_data)
        project_update_result = self.projects_service.update_project(project)
        response = Response(json=project_update_result)
        return response

    @view_config(reqest_method="POST")
    def add_project(self, request):
        project_data: dict = request.json_body
        # user_create = UserCreate(**user_data)
        result = self.projects_service.create_new_project(parse_obj_as(Project, project_data))
        response = Response(json=result)
        return response

    @view_config(request_method="DELETE")
    def delete_project_by_id(self, request):
        project_id = request.GET['project_id']
        result: Project = self.projects_service.delete_project(project_id)
        response = Response(json=result.get_json())
        return response

    # def includeme(self, config):
    #     config.add_view(self.get_all_projects)
