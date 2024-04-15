#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Run

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        Run.query.delete()
        print("Starting seed...")

        run1 = Run(location="North Table Mountain Park", image='c:\\Users\\kharb\\Pictures\\Screenshots\\NTM.png', link='https://www.alltrails.com/trail/us/colorado/north-table-mountain-west-loop')
        run2 = Run(location= "Big Dry Creek", image= 'c:\\Users\kharb\Pictures\\Screenshots\\BDC.png', link = 'https://www.alltrails.com/trail/us/colorado/big-dry-creek-2-mi-north' )

        db.session.add(run1)
        db.session.add(run2)
        db.session.commit()



        
        print("Completed seeding!")
