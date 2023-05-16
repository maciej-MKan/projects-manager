from typing import List, Optional

from sqlalchemy import Column, Integer, Table, String, ForeignKey, Text
from sqlalchemy.orm import DeclarativeBase, mapped_column, Mapped
from sqlalchemy.orm import relationship


class Base(DeclarativeBase):
    pass


class ProjectEntity(Base):
    __tablename__ = 'projects'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column()
    start_date: Mapped[int] = mapped_column(nullable=False)
    end_date: Mapped[int] = mapped_column(nullable=False)
    status: Mapped[str] = mapped_column(nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))


class UserEntity(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(nullable=False)
    last_name: Mapped[str] = mapped_column(nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    age: Mapped[int] = mapped_column()
    gender: Mapped[str] = mapped_column()
    email: Mapped[str] = mapped_column(nullable=False, unique=True)
    phone_number: Mapped[str] = mapped_column()
    projects: Mapped[List["ProjectEntity"]] = relationship(secondary="project_users", lazy="joined")


class ProjectUser(Base):
    __tablename__ = 'project_users'

    project_id: Mapped[int] = mapped_column(ForeignKey('projects.id'), primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), primary_key=True)
