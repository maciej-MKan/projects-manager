import os
from wsgiref.simple_server import make_server

from dotenv import load_dotenv
from pyramid.config import Configurator
from pyramid.session import SignedCookieSessionFactory

from backend.src.infrastructure.configuration.routing_configuration import get_routing
from backend.src.infrastructure.securite.security import SecurityPolicy

load_dotenv('.envs/dev/db.env')


def get_app():

    with Configurator() as config:
        config.include(get_routing)
        config.set_security_policy(SecurityPolicy(os.environ['SECRET']))
        config.set_session_factory(SignedCookieSessionFactory(os.environ['SECRET']))
        config.add_settings({'debug_all': True})
        app = config.make_wsgi_app()

    return app


def run_server(host: str):
    server = make_server(host, 8000, get_app())
    print('Starting server at http://localhost:8000')
    server.serve_forever()


if __name__ == '__main__':
    run_server('localhost')
