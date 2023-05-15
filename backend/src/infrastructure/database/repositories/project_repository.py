from typing import List

from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session

from backend.src.infrastructure.database.entity.user_entity import ProjectEntity
from backend.src.infrastructure.database.repositories.contracts.project_repository_interface import ProjectsRepository


class ProjectsRepositoryImpl(ProjectsRepository):
    def __init__(self, engine: Engine):
        self.engine = engine

    def get_all_projects(self) -> List[ProjectEntity]:
        with Session(self.engine) as session:
            return session.query(ProjectEntity).all()

    def get_project_by_id(self, project_id: int) -> ProjectEntity:
        with Session(self.engine) as session:
            return session.query(ProjectEntity).filter(ProjectEntity.id == project_id).first()

    def get_project_by_user_id(self, user_id: int) -> list[ProjectEntity]:
        with Session(self.engine) as session:
            return session.query(ProjectEntity).filter(ProjectEntity.user_id == user_id).all()

    def add_project(self, project_data: ProjectEntity) -> ProjectEntity:
        with Session(self.engine) as session:
            session.add(project_data)
            session.commit()
            session.refresh(project_data)
            return project_data

    def update_project(self, project_data: ProjectEntity) -> ProjectEntity:
        with Session(self.engine) as session:
            session.query(ProjectEntity).filter(ProjectEntity.id == project_data.id).update({
                ProjectEntity.name: project_data.name,
                ProjectEntity.description: project_data.description,
                ProjectEntity.start_date: project_data.start_date,
                ProjectEntity.end_date: project_data.end_date,
                ProjectEntity.status: project_data.status,
                ProjectEntity.user_id: project_data.user_id,
            })
            session.commit()
            print(project_data.id)
            updated = self.get_project_by_id(project_data.id)
            return updated

    def delete_project(self, project_id: int) -> int:
        with Session(self.engine) as session:
            result = session.query(ProjectEntity).filter(ProjectEntity.id == project_id).delete()
            session.commit()
            return result
