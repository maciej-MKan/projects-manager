# Wybieramy obraz bazowy Pythona 3.10
FROM python:3.10.7
ENV PYTHONUNBUFFERED 1

# Ustawiamy katalog roboczy w kontenerze
WORKDIR /app

# Kopiujemy plik requirements.txt do kontenera
COPY pyproject.toml pyproject.toml
COPY .envs/ /app/
COPY main.py main.py

# Instalujemy zależności za pomocą narzędzia poetry
RUN pip install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-dev

# Kopiujemy resztę plików projektu do kontenera
COPY backend/ /app/backend/

# Ustawiamy odpowiednie zmienne środowiskowe

# Uruchamiamy aplikację
CMD [ "python", "main.py" ]