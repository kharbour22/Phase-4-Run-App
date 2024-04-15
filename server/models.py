from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class Run(db.Model, SerializerMixin):
    __tablename__ = 'runs'

    id = db.Column(db.Integer, primary_key = True)
    location = db.Column(db.String, nullable = False)
    image = db.Column(db.String, nullable = False)
    link = db.Column(db.String, nullable = False)


