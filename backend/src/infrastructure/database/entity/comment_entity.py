from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class CommentEntity(Base):
    __tablename__ = 'project_comments'

    id = Column(Integer, primary_key=True)
    project_id = Column(Integer, nullable=False)
    user_id = Column(Integer, nullable=False)
    comment = Column(Text, nullable=False)
    timestamp = Column(Integer, nullable=False)
