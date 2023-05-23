# Wybierz obraz bazowy
FROM postgres:latest

# Instalacja narzędzia dotenv
RUN apt-get update && apt-get install -y npm
RUN npm install -g dotenv-cli

ENV POSTGRES_USER=$DB_USER
ENV POSTGRES_PASSWORD=$DB_PASSWORD
ENV POSTGRES_DB=$DB_NAME

# Wczytaj zmienne środowiskowe z pliku .env
RUN dotenv -e ../../envs/dev/db.env env > /etc/environment

# Otwórz port, na którym działa baza danych
EXPOSE 5432

# Uruchom polecenie startowe kontenera
CMD ["postgres"]