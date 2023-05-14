from abc import ABC, abstractmethod

from backend.src.infrastructure.database.entity.comment_entity import CommentEntity


class CommentsRepository(ABC):

    @abstractmethod
    def get_all_comments(self):
        pass

    @abstractmethod
    def get_comment_by_id(self, comment_id: int):
        pass

    @abstractmethod
    def add_comment(self, comment_data: CommentEntity):
        pass

    @abstractmethod
    def update_comment(self, comment_data: CommentEntity):
        pass

    @abstractmethod
    def delete_comment(self, comment_id: int):
        pass
