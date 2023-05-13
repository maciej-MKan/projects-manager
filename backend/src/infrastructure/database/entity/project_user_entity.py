from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class ProjectUserEntity(Base):
    __tablename__ = 'project_users'

    project_id = Column(Integer, ForeignKey('projects.id'), primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)

    project = relationship("ProjectEntity", back_populates="project_users")
    user = relationship("UserEntity", back_populates="user_projects")
