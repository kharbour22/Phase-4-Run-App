#!/usr/bin/env python3
from datetime import datetime

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker



# Local imports
from app import app, bcrypt
from models import db, Run, Signup, User

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        Run.query.delete()
        User.query.delete()
        Signup.query.delete()
        print("Starting seed...")

        run1 = Run(location="North Table Mountain Park", image='data:image/jpeg;base64,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', link='https://www.alltrails.com/trail/us/colorado/north-table-mountain-west-loop')
        run2 = Run(location= "Big Dry Creek", image= 'data:image/jpeg;base64,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', link = 'https://www.alltrails.com/trail/us/colorado/big-dry-creek-2-mi-north' )

        

        db.session.add(run1)
        db.session.add(run2)
       
        db.session.commit()

        signup1 = Signup(date=15, run = run1 )

        db.session.add(signup1)
        db.session.commit()

        password_1 = "kharbour"
        pw_hash_1 = bcrypt.generate_password_hash(password_1).decode('utf-8')

        password_2 = "flatironschool"
        pw_hash_2 = bcrypt.generate_password_hash(password_2).decode('utf-8')

        password_3 = "python"
        pw_hash_3 = bcrypt.generate_password_hash(password_3).decode('utf-8')

        user1 = User(first_name="Kevin", last_name="Harbour", username="kharbour", password_hash=pw_hash_1, type="admin")
        user2 = User(first_name="Bob", last_name="Carris", username="bobcarris456", password_hash=pw_hash_2, type="user")
        user3 = User(first_name="Cynthia", last_name="Dawson", username="cynthiadawson789", password_hash=pw_hash_3, type="user")

        db.session.add_all([user1, user2, user3])

        db.session.commit()


        
        print("Completed seeding!")
