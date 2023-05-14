from pyramid.response import Response
from pyramid.view import view_config

from backend.src.business.services.contracts.comment_interface import Comments


class ProjectController:
    def __init__(self, comment_service: Comments):
        self.comments_service = comment_service

    @view_config(request_method="GET", renderer="json")
    def get_all_comments(self, request) -> Response:
        comments = [comment.get_json() for comment in self.comments_service.get_all_comments()]
        response = Response(json=comments)
        return response

    @view_config(request_method="GET", renderer="json")
    def get_comments_by_user_id(self, request) -> Response:
        user_id = request.POST['USER_ID']
        comments = [comment.get_json() for comment in self.comments_service.get_comments_by_user_id(user_id)]
        response = Response(json=comments)
        return response



    # def includeme(self, config):
    #     config.add_view(self.get_all_projects)
