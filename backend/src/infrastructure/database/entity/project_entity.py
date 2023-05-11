from datetime import datetime

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class ProjectEntity(Base):
    __tablename__ = 'projects'
    id: int = Column(Integer, primary_key=True, index=True)
    name: str = Column(String(255), index=True)
    description: str = Column(String(1000))
    start_date: int = Column(Integer, default=datetime.utcnow().timestamp)
    end_date: int = Column(Integer, nullable=True)
    status: str = Column(String(50), default="New")

    author_id: int = Column(Integer, ForeignKey("users.id"))

    author = relationship("User", back_populates="projects")

    users = relationship("User", secondary="user_projects", back_populates="projects")

