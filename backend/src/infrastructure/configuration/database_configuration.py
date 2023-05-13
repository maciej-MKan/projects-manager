import os
import sys
from dotenv import load_dotenv

print(load_dotenv('.envs/dev/db.env'))

print(os.getcwd())

DATABASE_URI: str = f"postgresql://{os.environ['DB_USER']}:" \
               f"{os.environ['DB_PASSWORD']}@{os.environ['DB_HOST']}:" \
               f"{os.environ['DB_PORT']}/{os.environ['DB_NAME']}"


def get_uri():
    return DATABASE_URI
