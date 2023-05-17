from pyramid.config import Configurator

from backend.src.infrastructure.configuration.application_configuration import ApplicationConfiguration


def get_routing(config: Configurator):
    app_config = ApplicationConfiguration()

    config.add_view(app_config.get_project_controller().get_all_projects, route_name='projects')
    config.add_route('projects', '/projects')
    config.add_view(app_config.get_project_controller().add_project, route_name='create_project')
    config.add_route('create_project', '/project/new')
    config.add_view(app_config.get_project_controller().update_project, route_name='update_project')
    config.add_route('update_project', '/project/update')
    config.add_view(app_config.get_project_controller().delete_project_by_id, route_name='delete_project')
    config.add_route('delete_project', '/project/delete')
    config.add_view(app_config.get_user_controller().get_all_users, route_name='users')
    config.add_route('users', '/users')
    config.add_view(app_config.get_user_controller().get_user, route_name='user_by_id')
    config.add_route('user_by_id', '/user')
    config.add_view(app_config.get_user_controller().add_user, route_name='create_user')
    config.add_route('create_user', '/user/new')
    config.add_view(app_config.get_user_controller().update_user, route_name='update_user')
    config.add_route('update_user', '/user/update')
    config.add_view(app_config.get_user_controller().delete_user_by_id, route_name='delete_user')
    config.add_route('delete_user', '/user/delete')
    config.add_view(app_config.get_project_controller().get_projects_by_user_id, route_name='projects_from_user')
    config.add_route('projects_from_user', '/user/self_projects')
    # config.add_exception_view(failed_validation)
    # config.add_exception_view(failed_argument)
