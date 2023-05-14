from datetime import datetime

from backend.src.business.models.DTOComment import Comment
from backend.src.business.models.DTOProject import Project
from backend.src.business.models.DTOUser import User
from backend.src.infrastructure.database.entity.comment_entity import CommentEntity
from backend.src.infrastructure.database.entity.project_entity import ProjectEntity
from backend.src.infrastructure.database.entity.user_entity import UserEntity


def user_entity_dto_mapper(entity: UserEntity):
    return User(
        id=entity.id,
        name=entity.first_name,
        surname=entity.last_name,
        age=entity.age,
        gender=entity.gender,
        email=entity.email,
        phone_number=entity.phone_number,
        projects=entity.projects,
    )


def user_dto_entity_mapper(user_data: User):
    return ProjectEntity(
        id=user_data.id,
        name=user_data.name,
        surname=user_data.surname,
        age=user_data.age,
        gender=user_data.gender,
        email=user_data.email,
        phone_number=user_data.phone_number,
        projects=user_data.projects,
    )


def project_entity_dto_mapper(entity: ProjectEntity):
    return Project(
        id=entity.id,
        name=entity.name,
        description=entity.description,
        start_date=datetime.fromtimestamp(entity.start_date),
        end_date=datetime.fromtimestamp(entity.end_date),
        status=entity.status,
        author=entity.user_id
    )


def project_dto_entity_mapper(project_data: Project):
    return ProjectEntity(
        id=project_data.id,
        name=project_data.name,
        description=project_data.description,
        start_date=int(project_data.start_date.timestamp()),
        end_date=int(project_data.end_date.timestamp()),
        status=project_data.status,
        user_id=project_data.author,
        # users=project_data.users,
    )


def comment_entity_dto_mapper(entity: CommentEntity):
    return User(
        id=entity.id,
        project=entity.project_id,
        author=entity.user_id,
        description=entity.comment,
        date=datetime.fromtimestamp(entity.timestamp),
    )


def comment_dto_entity_mapper(comment_data: Comment):
    return ProjectEntity(
        id=comment_data.id,
        project_id=comment_data.project.id,
        user_id=comment_data.author.id,
        comment=comment_data.description,
        timestamp=int(comment_data.date.timestamp()),
    )
