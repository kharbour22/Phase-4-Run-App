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

    @validates('location', 'image', 'link')
    def validate_run(self, attr, value):
        if (not isinstance(value, str)) or (len(value) == 0):
            raise ValueError(f'Run must have a {attr}  ')
        else:
            return value
        
class Signup(db.Model, SerializerMixin):
    __tablename__ = 'signups'

    id = db.Column(db.Integer, primary_key = True)
    date = db.Column(db.DateTime, nullable = False)

    run_id = db.Column(db.Integer, db.ForeignKey('runs.id'))

    run = db.relationship('Run', back_populates = 'signups')

    @validates('run_id')
    def validate_run_id(self, attr, value):
        if not value:
            raise ValueError(f"Signup must have a {attr}!")
        else:
            return value


