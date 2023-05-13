from sqlalchemy import Column, Integer, Table, String, Text, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship, Mapped
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


association_table = Table(
    "project_users",
    Base.metadata,
    Column("project_id", ForeignKey("projects.id"), primary_key=True),
    Column("user_id", ForeignKey("users.id"), primary_key=True)
    #     Column("left_id", ForeignKey("left_table.id"), primary_key=True),
)


class UserEntity(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    password = Column(String(255), nullable=False)
    age = Column(Integer)
    gender = Column(String(10))
    email = Column(String(255), nullable=False, unique=True)
    phone_number = Column(String(20))

    projects: Mapped[list] = relationship(
        "ProjectEntity",
        lazy="joined",
        secondary=association_table
    )
