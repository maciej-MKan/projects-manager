from typing import Type

from sqlalchemy import Engine
from sqlalchemy.orm import Session

from backend.src.infrastructure.database.entity.entity import UserEntity, ProjectUser
from backend.src.infrastructure.database.repositories.contracts.comment_repository_interface import CommentsRepository
from backend.src.infrastructure.database.repositories.contracts.project_repository_interface import ProjectsRepository
from backend.src.infrastructure.database.repositories.contracts.relation_management_repository_interface import \
    ManagementRepository
from backend.src.infrastructure.database.repositories.contracts.user_repository_interface import UsersRepository


class ManagementRepositoryImpl(ManagementRepository):

    def __init__(
            self,
            engine: Engine,
            user_repo: UsersRepository,
            project_repo: ProjectsRepository,
            comment_repo: CommentsRepository
    ):
        self.engine = engine
        self.user_repo = user_repo
        self.project_repo = project_repo
        self.comment_repo = comment_repo

    def update_user_with_projects(self, user_data: UserEntity) -> Type[UserEntity]:
        with Session(self.engine) as session:
            self.user_repo.update_user(user_data, session)
            status = 0
            for project in user_data.projects:
                updated_project = self.project_repo.update_project(project, session)
                if updated_project == project:
                    status += 1
            if not status == len(user_data.projects):
                raise Exception(f"update error, correct {status} updated")

            session.query(ProjectUser).filter(ProjectUser.user_id == user_data.id).delete()
            for project in user_data.projects:
                project_user = ProjectUser(user_id=user_data.id, project_id=project.id)
                session.merge(project_user)

            session.commit()

        updated: Type[UserEntity] = self.user_repo.get_user_by_id(user_data.id)

        return updated
