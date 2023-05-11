from unittest.mock import Mock

from pyramid.testing import DummyRequest
from backend.src.controllers.rest.project_controller import ProjectController


def test_index_controller():
    projects_service = Mock()
    projects_service.get_all_projects.return_value = [
        {"id": 1, "name": "Project 1"},
        {"id": 2, "name": "Project 2"},
    ]
    request = DummyRequest()
    controller = ProjectController(request, projects_service)
    response = controller.index()
    assert response.json == [
        {"id": 1, "name": "Project 1"},
        {"id": 2, "name": "Project 2"},
    ]