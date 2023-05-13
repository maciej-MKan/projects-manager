import os
import sys
from dotenv import load_dotenv
from sqlalchemy import create_engine

print(load_dotenv('.envs/dev/db.env'))

print(os.getcwd())

DATABASE_URI: str = f"postgresql://{os.environ['DB_USER']}:" \
                    f"{os.environ['DB_PASSWORD']}@{os.environ['DB_HOST']}:" \
                    f"{os.environ['DB_PORT']}/{os.environ['DB_NAME']}"


class DataBaseEngine:
    _base_engine = None

    def __new__(cls):
        if cls._base_engine is None:
            cls._base_engine = create_engine(DATABASE_URI, pool_size=10, max_overflow=20)

        return cls._base_engine
