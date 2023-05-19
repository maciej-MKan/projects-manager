from typing import List

from sqlalchemy import ForeignKey
from sqlalchemy.orm import DeclarativeBase, mapped_column, Mapped, registry
from sqlalchemy.orm import relationship


class Base(DeclarativeBase):
    pass


mapper_registry = registry()


@mapper_registry.mapped
class ProjectUser:
    __tablename__ = 'project_users'

    project_id: Mapped[int] = mapped_column(ForeignKey('projects.id', ondelete="CASCADE"), primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete="CASCADE"), primary_key=True)

    user_list: Mapped["UserEntity"] = relationship(
        back_populates="project_asoc",
        passive_deletes="all",
        post_update=True
    )
    project_list: Mapped["ProjectEntity"] = relationship(
        back_populates="user_asoc",
        passive_deletes="all",
        post_update=True
    )


@mapper_registry.mapped
class ProjectEntity:
    __tablename__ = 'projects'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column()
    start_date: Mapped[int] = mapped_column(nullable=False)
    end_date: Mapped[int] = mapped_column(nullable=False)
    status: Mapped[str] = mapped_column(nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    users: Mapped[List["UserEntity"]] = relationship(secondary="project_users",
                                                     back_populates="projects",
                                                     passive_deletes=True,
                                                     post_update=True,
                                                     lazy="subquery",
                                                     overlaps="user_list,project_list"
                                                     )

    user_asoc: Mapped[List["ProjectUser"]] = relationship(back_populates="project_list",
                                                          passive_deletes=True,
                                                          post_update=True,
                                                          overlaps="users"
                                                          )
    comments: Mapped[List["CommentEntity"]] = relationship()


@mapper_registry.mapped
class UserEntity:
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(nullable=False)
    last_name: Mapped[str] = mapped_column(nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    age: Mapped[int] = mapped_column()
    gender: Mapped[str] = mapped_column()
    email: Mapped[str] = mapped_column(nullable=False, unique=True)
    phone_number: Mapped[str] = mapped_column()
    projects: Mapped[List["ProjectEntity"]] = relationship(secondary="project_users",
                                                           back_populates="users",
                                                           passive_deletes=True,
                                                           post_update=True,
                                                           lazy="subquery",
                                                           overlaps="project_list,user_asoc,user_list"
                                                           )

    project_asoc: Mapped[List["ProjectUser"]] = relationship(back_populates="user_list",
                                                             passive_deletes=True,
                                                             post_update=True,
                                                             overlaps="projects,users"
                                                             )
    comments: Mapped[List["CommentEntity"]] = relationship()


@mapper_registry.mapped
class CommentEntity:
    __tablename__ = 'project_comments'

    id: Mapped[int] = mapped_column(primary_key=True)
    project_id: Mapped[int] = mapped_column(ForeignKey('projects.id', ondelete="CASCADE"), nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    comment: Mapped[str] = mapped_column(nullable=False)
    timestamp: Mapped[int] = mapped_column(nullable=False)
