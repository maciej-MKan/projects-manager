from typing import List

from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session

from backend.src.infrastructure.database.entity.comment_entity import CommentEntity
from backend.src.infrastructure.database.repositories.contracts.comment_repository_interface import CommentsRepository


class CommentssRepositoryImpl(CommentsRepository):
    def __init__(self, engine: Engine):
        self.engine = engine

    def get_all_projects(self) -> List[CommentEntity]:
        with Session(self.engine) as session:
            return session.query(CommentEntity).all()

    def get_project_by_id(self, project_id: int) -> CommentEntity:
        with Session(self.engine) as session:
            return session.query(CommentEntity).filter(CommentEntity.id == project_id).first()

    def add_project(self, project_data: CommentEntity) -> CommentEntity:
        with Session(self.engine) as session:
            session.add(project_data)
            session.commit()
            session.refresh(project_data)
            return project_data

    def update_project(self, project_data: CommentEntity) -> CommentEntity:
        with Session(self.engine) as session:
            session.query(CommentEntity).filter(CommentEntity.id == project_data.id).update({
                CommentEntity.name: project_data.name,
                CommentEntity.description: project_data.description,
                CommentEntity.start_date: project_data.start_date,
                CommentEntity.end_date: project_data.end_date,
                CommentEntity.status: project_data.status,
            })
            session.commit()
            session.refresh(project_data)
            return project_data

    def delete_project(self, project_id: int) -> None:
        with Session(self.engine) as session:
            session.query(CommentEntity).filter(CommentEntity.id == project_id).delete()
            session.commit()