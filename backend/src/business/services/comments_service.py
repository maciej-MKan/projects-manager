from backend.src.business.models import DTOComment
from backend.src.business.services.contracts.comment_interface import Comments
from backend.src.infrastructure.database.repositories.contracts.comment_repository_interface import CommentsRepository
from backend.src.utils.mappers import *


class CommentsService(Comments):
    def get_comments_by_user_id(self, user_id):
        pass

    def __init__(self, comment_repository: CommentsRepository):
        self.comment_repository = comment_repository

    def get_all_comments(self):
        comment_entity = self.comment_repository.get_all_comments()
        comment_list: list[DTOComment] = []

        for entity in comment_entity:
            comment_list.append(comment_entity_dto_mapper(entity))
        print(comment_list)
        return comment_list

    def get_comment_details(self, comment_id: int):
        return comment_entity_dto_mapper(self.comment_repository.get_comment_by_id(comment_id))

    def create_new_comment(self, comment: DTOComment):
        self.comment_repository.add_comment(comment)

    def update_comment(self, new_comment_data: DTOComment):
        self.comment_repository.update_comment(comment_dto_entity_mapper(new_comment_data))

    def delete_comment(self, comment_id):
        self.comment_repository.delete_comment(comment_id)
