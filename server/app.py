#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session, request, Flask
from flask_restful import Resource
from datetime import datetime
from flask_bcrypt import Bcrypt

# Local imports
from config import app, db, api
# Add your model imports
from models import Run, Signup, User
bcrypt = Bcrypt(app)


# Views go here!
class AllRuns(Resource):

    def get(self):
        response_body = [run.to_dict(only = ('id', 'location', 'image', 'link')) for run in Run.query.all()]
        return make_response(response_body, 200)
    def post (self):
        try:
            new_run = Run(location = request.json.get('location'), image = request.json.get('image'), link = request.json.get('link'))
            db.session.add(new_run)
            db.session.commit()
            response_body = new_run.to_dict(only=('id', 'location', 'image', 'link'))
            return make_response(response_body, 201)
        except:
            response_body = {
                "error": "A run must have a location, image, and link"

            }
            return make_response(response_body, 400)

api.add_resource(AllRuns, '/runs')

class RunByID(Resource):

    def get(self, id):
        run = db.session.get(Run, id)

        if run:
            response_body = run.to_dict(rules=('-signups.run',))

            
            # response_body['users'] = [user.to_dict(only=('id', 'first_name', 'last_name')) for user in run.users]
            
            return make_response(response_body, 200)
        
        else:
            response_body = {
                'error': "Run Not Found"
            }
            return make_response(response_body, 404)
        
    def patch(self, id):
            run = db.session.get(Run, id)

            if run:
                try:
                    for attr in request.json:
                        setattr(run, attr, request.json[attr])
                    
                    db.session.commit()    
                    response_body = run.to_dict(only=('id', 'location', 'image', 'link'))
                    return make_response(response_body, 200)
                
                except:
                    response_body = {
                        "error": "Run must have a name and image, and the run name cannot be the same name as any other run!"
                    }
                    return make_response(response_body, 400)

            else:
                response_body = {
                    'error': "Run Not Found"
                }
                return make_response(response_body, 404)
        
    def delete(self, id):
        run = db.session.get(Run, id)

        if run:
            db.session.delete(run)
            db.session.commit()
            response_body = {}
            return make_response(response_body, 204)
        
        else:
            response_body = {
                'error': "Run Not Found"
            }
            return make_response(response_body, 404)
    
api.add_resource(RunByID, '/runs/<int:id>')



class AllSignups(Resource):

    def get(self):
        response_body = [signup.to_dict(rules = ('-run.signups',)) for signup in Signup.query.all()]
        return make_response(response_body, 200)

    def post(self):
        try:
            new_signup = Signup(date = request.json.get('date'), run_id=request.json.get('run_id'))
            db.session.add(new_signup)
            db.session.commit()
            response_body = new_signup.to_dict(rules = ('-run.signups',))
            return make_response(response_body, 201)
        except:
            response_body = {
                "error": "Signup must have a date and time and run id."
            }
            return make_response(response_body, 400)

api.add_resource(AllSignups, '/signups')

class SignupByID(Resource):
    def get(self, id):
        signup = db.session.query(Signup, id)

        if signup:
            response_body = signup.to_dict()  # Convert the signup object to a dictionary
            return make_response(response_body, 200)
        else:
            response_body = {'error': "Signup Not Found"}
            return make_response(response_body, 404)

    def delete(self, id):
        signup = db.session.query(Signup).get(id)

        if signup:
            db.session.delete(signup)
            db.session.commit()
            response_body = {}
            return make_response(response_body, 204)
        else:
            response_body = {'error': "Signup Not Found"}
            return make_response(response_body, 404)

api.add_resource(SignupByID, '/signups/<int:id>')

class AllUsers(Resource):

    def get(self):
        users = User.query.all()
        user_list_with_dictionaries = [user.to_dict(only=('id', 'first_name', 'last_name', 'username', 'type')) for user in users]
        return make_response(user_list_with_dictionaries, 200)
    
    def post(self):
        try:
            new_user = User(first_name=request.json.get('first_name'), last_name=request.json.get('last_name'), username=request.json.get('username'), password_hash=request.json.get('password'), type='customer')
            db.session.add(new_user)
            db.session.commit()
            response_body = new_user.to_dict(only=('id', 'first_name', 'last_name', 'username', 'type'))
            return make_response(response_body, 201)
        except:
            response_body = {
                "error": "User's first name and last name cannot be the same, and first name and last name must be at least 3 characters long! User must have a username and password!"
            }
            return make_response(response_body, 400)
    
api.add_resource(AllUsers, '/users')

class UserByID(Resource):

    def get(self, id):
        user = db.session.get(User, id)

        if user:
            response_body = user.to_dict(rules=('-signups.run', '-signups.user', '-password_hash'))

            # Add in the association proxy data (The user's hotels) while removing duplicate hotel data for the user's hotels
            response_body['runs'] = [run.to_dict(only=('id', 'location', 'image', 'link')) for run in list(set(user.runs))]

            return make_response(response_body, 200)
        
        else:
            response_body = {
                'error': "User Not Found"
            }
            return make_response(response_body, 404)
        
    def patch(self, id):
        user = db.session.get(User, id)

        if user:
            try:
                for attr in request.json:
                    setattr(user, attr, request.json[attr])
                
                db.session.commit()
                response_body = user.to_dict(only=('id', 'first_name', 'last_name', 'username', 'type'))
                return make_response(response_body, 200)
            except:
                response_body = {
                    "error": "User's first name and last name cannot be the same, and first name and last name must be at least 3 characters long! User must have a username and password!"
                }
                return make_response(response_body, 400)
        
        else:
            response_body = {
                'error': "User Not Found"
            }
            return make_response(response_body, 404)
         
    def delete(self, id):
        user = db.session.get(User, id)

        if user:
            db.session.delete(user)
            db.session.commit()
            response_body = {}
            return make_response(response_body, 204)
        
        else:
            response_body = {
                'error': "User Not Found"
            }
            return make_response(response_body, 404)

api.add_resource(UserByID, '/users/<int:id>')

class Login(Resource):

    def post(self):
        username = request.json.get('username')
        password = request.json.get('password')
        user = User.query.filter(User.username == username).first()

        if(user and bcrypt.check_password_hash(user.password_hash, password)):
            session['user_id'] = user.id
            response_body = user.to_dict(rules=('-signups.run', '-signups.user', '-password_hash'))

            # Add in the association proxy data (The user's hotels) while removing duplicate hotel data for the user's hotels
            response_body['runs'] = [run.to_dict(only=('id', 'location', 'image', 'link')) for run in list(set(user.runs))]

            return make_response(response_body, 201)
        else:
            response_body = {
                "error": "Invalid username or password!"
            }
            return make_response(response_body, 401)
    
api.add_resource(Login, '/login')

class CheckSession(Resource):

    def get(self):
        user = db.session.get(User, session.get('user_id'))

        if(user):
            response_body = user.to_dict(rules=('-signups.run', '-signups.user', '-password_hash'))

            # Add in the association proxy data (The user's hotels) while removing duplicate hotel data for the user's hotels
            response_body['runs'] = [run.to_dict(only=('id', 'location', 'image', 'link')) for run in list(set(user.runs))]

            return make_response(response_body, 200)
        else:
            response_body = {
                "error": "Please Log In!"
            }
            return make_response(response_body, 401)

api.add_resource(CheckSession, '/check_session')

class Logout(Resource):
    
    def delete(self):
        if(session.get('user_id')):
            del(session['user_id'])

        response_body = {}
        return make_response(response_body, 204)
    
api.add_resource(Logout, '/logout')

class Register(Resource):

    def post(self):
        try:
            password = request.json.get('password')
            pw_hash = bcrypt.generate_password_hash(password).decode('utf-8')
            new_user = User(first_name=request.json.get('first_name'), last_name=request.json.get('last_name'), username=request.json.get('username'), password_hash=pw_hash, type='user')
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id

            # Updated the response_body here to be consistent with the serialized data in the responses from '/login' and '/check_session'.
            response_body = new_user.to_dict(rules=('-signups.run', '-signups.user', '-password_hash'))

            # Add in the association proxy data (The user's hotels) while removing duplicate hotel data for the user's hotels
            response_body['runs'] = [run.to_dict(only=('id', 'location', 'image', 'link')) for run in list(set(new_user.runs))]

            return make_response(response_body, 201)
        except:
            response_body = {
                "error": "User's first name and last name cannot be the same, and first name and last name must be at least 3 characters long! User must have a username and password!"
            }
            return make_response(response_body, 400)
        
api.add_resource(Register, '/register')



@app.route('/')
def index():
    return '<h1>Project Server</h1>'



if __name__ == '__main__':
    app.run(port=5555, debug=True)

