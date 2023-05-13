from typing import List

from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session

from backend.src.infrastructure.database.entity.project_entity import ProjectEntity
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
            })
            session.commit()
            session.refresh(project_data)
            return project_data

    def delete_project(self, project_id: int) -> None:
        with Session(self.engine) as session:
            session.query(ProjectEntity).filter(ProjectEntity.id == project_id).delete()
            session.commit()