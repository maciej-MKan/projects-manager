from pydantic import parse_obj_as
from pyramid.response import Response
from pyramid.view import view_config

from backend.src.business.models.DTOComment import Comment
from backend.src.business.services.contracts.comment_interface import Comments


class CommentController:
    def __init__(self, comment_service: Comments):
        self.comments_service = comment_service

    @view_config(request_method="GET")
    def get_all_comments(self, request) -> Response:
        comments = [comment.get_json() for comment in self.comments_service.get_all_comments()]
        response = Response(json=comments)
        return response

    @view_config(request_method="GET")
    def get_comment(self, request) -> Response:
        comment_id = request.GET['comment_id']
        comment = self.comments_service.get_comment_details(comment_id)
        response = Response(json=comment.get_json())
        return response

    @view_config(request_method="GET")
    def get_comments_by_user_id(self, request) -> Response:
        user_id = request.GET['user_id']
        comments = [comment.get_json() for comment in self.comments_service.get_comments_by_user_id(user_id)]
        response = Response(json=comments)
        return response

    @view_config(reqest_method="PUT")
    def update_comment(self, request):
        comment_data: dict = request.json_body
        comment: Comment = parse_obj_as(Comment, comment_data)
        comment_update_result = self.comments_service.update_comment(comment)
        response = Response(json=comment_update_result)
        return response

    @view_config(reqest_method="POST")
    def add_comment(self, request):
        comment_data: dict = request.json_body
        result = self.comments_service.create_new_comment(parse_obj_as(Comment, comment_data))
        response = Response(json=result.get_json())
        return response

    @view_config(request_method="DELETE")
    def delete_comment_by_id(self, request):
        comment_id = request.GET['comment_id']
        result: Comment = self.comments_service.delete_comment(comment_id)
        response = Response(json=result.get_json())
        return response
