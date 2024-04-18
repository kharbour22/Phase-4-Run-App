from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from datetime import datetime

from config import db



# Models go here!
class Run(db.Model, SerializerMixin):
    __tablename__ = 'runs'

    id = db.Column(db.Integer, primary_key = True)
    location = db.Column(db.String, nullable = False)
    image = db.Column(db.String, nullable = False)
    link = db.Column(db.String, nullable = False)

    signups = db.relationship('Signup', back_populates = 'run')
    users = association_proxy('signups', 'user', creator = lambda u: Signup(user = u))

    @validates('location', 'image', 'link')
    def validate_run(self, attr, value):
        if (not isinstance(value, str)) or (len(value) == 0):
            raise ValueError(f'Run must have a {attr}  ')
        else:
            return value
        
class Signup(db.Model, SerializerMixin):
    __tablename__ = 'signups'

    id = db.Column(db.Integer, primary_key = True)
    date = db.Column(db.Integer, nullable = False)

    run_id = db.Column(db.Integer, db.ForeignKey('runs.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    run = db.relationship('Run', back_populates = 'signups')
    user = db.relationship('User', back_populates='signups')

    @validates('run_id', 'user_id')
    def validate_run_id_and_user_id(self, attr, value):
        if not (isinstance(value, int)):
            raise ValueError(f"Review must have a {attr} and {attr} must be an integer!")
        else:
            return value


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    username = db.Column(db.String, nullable=False)
    password_hash = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)

    # 1 user has many reviews: 1-to-many relationship between users and signups tables
    signups = db.relationship('Signup', back_populates='user', cascade='all')

    # runs and users Many-to-Many relationship: The user's runs
    runs = association_proxy('signups', 'run', creator = lambda r: Signup(run = r))

    __table_args__ = (db.CheckConstraint('first_name != last_name'),)

    @validates('first_name', 'last_name')
    def validate_columns(self, attr, value):
        if (not isinstance(value, str)) or len(value) < 3:
            raise ValueError(f"{attr} must be a string that is at least 3 characters long!")
        return value
