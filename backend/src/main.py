import os
from wsgiref.simple_server import make_server

from dotenv import load_dotenv
from pyramid.config import Configurator
from pyramid.events import NewRequest
from pyramid.session import SignedCookieSessionFactory

from backend.src.infrastructure.configuration.routing_configuration import get_routing
from backend.src.infrastructure.securite.security import SecurityPolicy

load_dotenv('.envs/dev/db.env')


def add_cors_headers_response_callback(event):
    def cors_headers(request, response):
        response.headers.update(
            {
                'Access-Control-Allow-Origin': 'http://mkan-project-manager.herokuapp.com/',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Credentials': 'true',
                # 'Access-Control-Request-Headers:':
                #     'Access-Control-Allow-Origin, Access-Control-Allow-Methods, Cookie, Set-Cookie',
                'Access-Control-Max-Age': '1728000',
                'Origin': 'http://localhost:3000'
            })
        print(request)

    event.request.add_response_callback(cors_headers)


def get_app():
    with Configurator() as config:
        config.add_subscriber(add_cors_headers_response_callback, NewRequest)
        config.add_tween('backend.src.controllers.securite.option_tween_factory.simple_tween_factory')
        config.include(get_routing)
        config.set_security_policy(SecurityPolicy(os.environ['SECRET']))
        config.set_session_factory(SignedCookieSessionFactory(os.environ['SECRET']))
        config.add_settings({'debug_all': True})
        app = config.make_wsgi_app()

    return app


def run_server(host: str, port: int):
    server = make_server(host, port, get_app())
    print(f'Starting server at http://{host}:{port}')
    server.serve_forever()


def main(global_config, **settings):
    app = get_app()
    return app


app = get_app()

# if __name__ == '__main__':
#
#     run_server(host, port)
