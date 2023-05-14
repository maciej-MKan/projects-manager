from typing import List

from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session

from backend.src.infrastructure.database.entity.comment_entity import CommentEntity
from backend.src.infrastructure.database.repositories.contracts.comment_repository_interface import CommentsRepository


class CommentsRepositoryImpl(CommentsRepository):
    def __init__(self, engine: Engine):
        self.engine = engine

    def get_all_comments(self) -> List[CommentEntity]:
        with Session(self.engine) as session:
            return session.query(CommentEntity).all()

    def get_comment_by_id(self, comment_id: int) -> CommentEntity:
        with Session(self.engine) as session:
            return session.query(CommentEntity).filter(CommentEntity.id == comment_id).first()

    def add_comment(self, comment_data: CommentEntity) -> CommentEntity:
        with Session(self.engine) as session:
            session.add(comment_data)
            session.commit()
            session.refresh(comment_data)
            return comment_data

    def update_comment(self, comment_data: CommentEntity) -> CommentEntity:
        with Session(self.engine) as session:
            session.query(CommentEntity).filter(CommentEntity.id == comment_data.id).update({
                CommentEntity.name: comment_data.name,
                CommentEntity.description: comment_data.description,
                CommentEntity.start_date: comment_data.start_date,
                CommentEntity.end_date: comment_data.end_date,
                CommentEntity.status: comment_data.status,
            })
            session.commit()
            session.refresh(comment_data)
            return comment_data

    def delete_comment(self, comment_id: int) -> None:
        with Session(self.engine) as session:
            session.query(CommentEntity).filter(CommentEntity.id == comment_id).delete()
            session.commit()