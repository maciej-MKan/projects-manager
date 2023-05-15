from datetime import datetime
from unittest import mock

from backend.src.business.models.DTOProject import Project
from backend.src.business.services.projects_service import ProjectsService
from backend.src.infrastructure.database.entity.user_entity import ProjectEntity
from backend.src.infrastructure.database.repositories.contracts.project_repository_interface import ProjectsRepository

MOCK_PROJECT_1 = ProjectEntity(
    id=1,
    name="Project 1",
    description="Project 1 description",
    start_date=12370123,
    end_date=12371123,
    status="In progress",
    user_id=1
)

MOCK_PROJECT_2 = ProjectEntity(
    id=2,
    name="Project 2",
    description="Project 2 description",
    start_date=12371123,
    end_date=12372123,
    status="Planned",
    user_id=2
)


class TestProjectsService:

    @mock.patch.object(ProjectsRepository, 'get_all_projects')
    def test_get_all_projects(self, mock_get_all_projects):
        # given
        project_1 = MOCK_PROJECT_1
        project_2 = MOCK_PROJECT_2
        mock_get_all_projects.return_value = [project_1, project_2]

        # when
        project_service = ProjectsService()
        project_service.project_repository = ProjectsRepository
        projects: list[Project] = project_service.get_all_projects()

        # then
        assert len(projects) == 2
        assert projects[0].name == 'Project 1'
        assert projects[0].start_date == datetime.fromtimestamp(MOCK_PROJECT_1.start_date)
        assert projects[1].name == 'Project 2'

    @mock.patch.object(ProjectsRepository, 'get_project_by_id')
    def test_get_project_details(self, mock_get_project_by_id):
        # given
        project = MOCK_PROJECT_1
        mock_get_project_by_id.return_value = project

        # when
        project_service = ProjectsService()
        project_service.project_repository = ProjectsRepository
        project_details = project_service.get_project_details(1)

        # then
        assert project_details.id == 1
        assert project_details.name == 'Project 1'
        assert project_details.description == 'Project 1 description'

    @mock.patch.object(ProjectsRepository, 'add_project')
    def test_create_new_project(self, mock_create_new_project):
        # given
        new_project = MOCK_PROJECT_2

        # when
        project_service = ProjectsService()
        project_service.project_repository = ProjectsRepository
        project_service.create_new_project(new_project)

        # then
        mock_create_new_project.assert_called_once_with(new_project)

    @mock.patch.object(ProjectsRepository, 'delete_project')
    def test_delete_project(self, mock_delete_project):
        # given
        project_id = 1

        # when
        project_service = ProjectsService()
        project_service.project_repository = ProjectsRepository
        project_service.delete_project(project_id)

        # then
        mock_delete_project.assert_called_once_with(project_id)