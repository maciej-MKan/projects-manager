# Obraz bazowy
FROM python:3.10-slim-buster

# Ustawienie katalogu roboczego
WORKDIR /app

# Kopiowanie plików zależności
COPY poetry.lock /app/
COPY pyproject.toml /app/

# Instalacja pakietów zależności
RUN pip install poetry && \
    poetry config virtualenvs.create false && \
    poetry install --no-interaction --no-ansi

# Kopiowanie plików aplikacji
COPY . /app/

# Zmienne środowiskowe
ENV PYTHONUNBUFFERED 1
ENV PORT=8080
ENV DATABASE_URL=postgres://user:password@postgres:5432/project_manager

# Uruchamianie aplikacji
CMD ["gunicorn", "src.project-manager:main", "--bind", "0.0.0.0:$PORT"]