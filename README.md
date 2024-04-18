##The Fun Run

This project is a Flask-based web application for managing running events, signups, and user authentication.

##Features
Runs Management: CRUD operations for managing running events including location, image, and link.
Signups Management: CRUD operations for managing user signups for running events.
User Authentication: User login, registration, and session management.
RESTful API: Provides endpoints for interacting with the application's data.

##Installation

Clone the repository:
git clone https://github.com/kharbour22/Phase-4-Run-App

##Install dependencies:

Install the Backend:

pipenv install

pipenv shell

cd server

pip install Flask-Bcrypt

flask db init

flask db upgrade

(while still in server)

python seed.py

python app.py


Install the Frontend (In a new terminal):

pipenv shell

cd client

npm install

npm start



##Usage

GET /runs: Retrieve all running events.

POST /runs: Create a new running event.

GET /runs/{id}: Retrieve details of a specific running event.

PATCH /runs/{id}: Update details of a specific running event.

DELETE /runs/{id}: Delete a specific running event.

GET /signups: Retrieve all user signups.

POST /signups: Create a new user signup.

GET /signups/{id}: Retrieve details of a specific user signup.

DELETE /signups/{id}: Delete a specific user signup.

GET /users: Retrieve all users.

POST /users: Create a new user.

GET /users/{id}: Retrieve details of a specific user.

POST /login: Log in a user.

GET /check_session: Check user session.

DELETE /logout: Log out a user.

POST /register: Register a new user.


##Frontend

The frontend is built with React. It allows users to interact with the application, view running events, sign up for events, and manage their profile.

