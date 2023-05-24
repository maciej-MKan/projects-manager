# Project Management Platform

The goal of this project is to create a simple Single Page web application that assists in project management. It consists of an API built with Pyramid or any other Python web framework, and a presentation layer built with React.

## Technologies Used
- Backend: Pyramid, SQLAlchemy, pytest
- Frontend: React, Bootstrap

## API Endpoints

### Projects
- `GET /projects`: Get all projects
- `GET /project/{id}`: Get project by ID
- `POST /project/new`: Create a new project
- `PUT /project/update`: Update an existing project
- `DELETE /project/delete`: Delete a project

### Users
- `GET /users`: Get all users
- `GET /user/{id}`: Get user by ID
- `POST /user/new`: Create a new user
- `PUT /user/update`: Update an existing user
- `DELETE /user/delete`: Delete a user

### Comments
- `GET /comments`: Get all comments
- `GET /comment/{id}`: Get comment by ID
- `POST /comment/new`: Create a new comment
- `PUT /comment/update`: Update an existing comment
- `DELETE /comment/delete`: Delete a comment
- `GET /comment/by_user`: Get comments by user
- `GET /comment/by_project`: Get comments by project

### Authentication
- `POST /login`: User login
- `POST /logout`: User logout

## Getting Started
To get started with this project, follow these steps:

1. Clone the repository:
```
https://github.com/maciej-MKan/projects-manager.git
```
2. Set up the backend:
- Install the required Python packages:
  ```
  pip install -r backend/requirements.txt
  ```
- Configure the database connection in `.envs/dev/db.env` or at os enviroment.
- Run database migrations:
  ```
  backend/resources/init.sql
  ```
- Start the backend server:
  ```
  gunicorn backend.src.main:app
  ```

3. Set up the frontend:
- Install Node.js if not already installed.
- Navigate to the `frontend` directory:
  ```
  cd frontend
  ```
- Install the required dependencies:
  ```
  npm install
  ```
- Start the development server:
  ```
  npm start
  ```

4. Access the application:
Open your browser and visit `http://localhost:3000` to access the project management platform.

## Running Tests
To run the tests for the backend, navigate to the `backend` directory and run the following command:
```
pytest
```
