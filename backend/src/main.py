from wsgiref.simple_server import make_server

from pyramid.config import Configurator

from backend.src.infrastructure.configuration.routing_configuration import get_routing


def get_app():

    with Configurator() as config:
        config.include(get_routing)
        app = config.make_wsgi_app()

    return app


def run_server(host: str):
    server = make_server(host, 8000, get_app())
    print('Starting server at http://localhost:8000')
    server.serve_forever()


if __name__ == '__main__':
    run_server('localhost')
