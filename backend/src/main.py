import os
from wsgiref.simple_server import make_server
from pyramid.config import Configurator

from backend.src.infrastructure.configuration.application_configuration import get_config
from backend.src.controllers.rest.project_controller import ProjectController


def get_app():
    with Configurator() as config:
        config.add_route('projects', '/projects')
        config.add_view(get_config().all_projects, route_name='projects')
        app = config.make_wsgi_app()

    return app


def run_server(host: str):
    server = make_server(host, 8000, get_app())
    print('Starting server at http://localhost:8000')
    server.serve_forever()


if __name__ == '__main__':
    run_server('localhost')
