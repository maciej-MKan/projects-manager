from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class ProjectEntity(Base):
    __tablename__ = 'projects'

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    start_date = Column(Integer, nullable=False)
    end_date = Column(Integer, nullable=False)
    status = Column(String(50), nullable=False)
    user_id = Column(Integer)
