# SQLLite model
from api import db
from datetime import datetime, timedelta
from sqlalchemy import and_, or_, false, true, func, case
from sqlalchemy.inspection import inspect
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)
from flask import jsonify 
from datetime import date 
import re

class Serializer(object):
    def serialize(self):
        return {c: getattr(self, c) for c in inspect(self).attrs.keys()}
    @staticmethod
    def serialize_list(l):
        return [m.serialize() for m in l]

class Link(db.Model, Serializer):
    # The links table comprises of the machine learning prediction results 
    # along with the details who’ve submitted the URL and their corresponding feedback. 
    id = db.Column(db.Integer, primary_key = True)
    url = db.Column(db.String(128)) 
    platform = db.Column(db.String(20))
    text = db.Column(db.String(200))
    sentiment = db.Column(db.String(50))
    date_added = db.Column(db.DateTime, default = datetime.now)
    fraud = db.Column(db.String(20))
    fraud_probability = db.Column(db.Float(precision = '2,1'))
    f_deleted = db.Column(db.Boolean, default = False)
    username_submitted = db.Column(db.String(64), default = 'Guest')
    feedback = db.Column(db.String(64))



    @classmethod
    def get_past_records(cls, start = 1, records = 5): 
        # This module essentially fetches and returns a serialized and paginated list of past historical records that has been analysed. 
        # The default parameters for the start page, and number of records are specified which can be overridden. 
        # The module returns only records without the f_deleted variable and sorts them by descending order.
        records = cls.query.filter(cls.f_deleted != True).order_by(cls.date_added.desc()).paginate(start, records, False).items
        return Link.serialize_list(records)

    def add_link(url, platform, text, sentiment, fraud, fraud_probability, username):
        # This module commits the resulting parameters values into the table. 
        # The parameter values are fed from the two ML models as well as the user inputted values.
        _link = Link(url = url, text = text, platform = platform, sentiment = sentiment,\
                     fraud = fraud, fraud_probability = fraud_probability, username_submitted = username)
        db.session.add(_link)
        db.session.commit()
        return _link


    @classmethod
    def add_feedback(cls, id, feedback_string, username = 'Guest'):
        # This module commits the feedback to the database based on the id variable. 
        # Default parameters are specified for the username to factor for users that are not logged-in. 
        
        # Note that the module only commits if the username and the id corresponds to the user who added the link, 
        # otherwise it will not be committed since the ability to provide feedback are only limited to the user
        # who’ve added the link.
        _feedback = cls.query.filter(and_(cls.id == id, cls.username_submitted == username)).first()
        if _feedback is not None:
            _feedback.feedback = feedback_string
            db.session.commit()
            return _feedback

    @classmethod
    def get_summarised_records(cls):
        # This function returns the summarised count of the fake and real news from the fraud variable. 
        # Note that only records without f_deleted = True  will be tabulated. 
        # The results which will be returned are: the platform variable, and the tabulated fake and real count.
        real_news = func.sum(case([(cls.fraud == 'Real', 1)], else_= 0)).label('real_news')
        fake_news = func.sum(case([(cls.fraud == 'Fake', 1)], else_= 0)).label('fake_news')
        summary = cls.query.with_entities(cls.platform, real_news, fake_news).group_by(cls.platform).filter(cls.f_deleted != True).all()
        return summary

    @classmethod
    def get_user_past_records(cls, username, start = 1, records = 5): 
        # This module fetches and returns a serialized and paginated list of past historical records that has been analysed. 
        # The default parameters for the start page, and number of records are specified which can be overridden. 
        # A username has to be specified as well to filter records that are pertinent to the user.
        # The module returns only records without f_deleted = True  which is the indicator if the record should 
        # be shown or not, and resulting results are sorted and returned by descending order.
        records = cls.query.filter(and_(cls.f_deleted != True, cls.username_submitted == username))\
                           .order_by(cls.date_added.desc()).paginate(start, records, False).items
        return Link.serialize_list(records)

    @classmethod
    def get_past_content(cls, platform, search_string):
        # This module serves as a search function for the links that were submitted. 
        # The possibilities of the search include the platform, user, text, and its various permutations.
        # Again, only records without f_deleted = True will be returned. 
        if platform == 'All':
            records = cls.query.filter(and_(cls.f_deleted != True, cls.text.like(f'%{search_string}%'))).all()
        elif platform == 'User':
            records = cls.query.filter(and_(cls.f_deleted != True, cls.username_submitted == search_string)).all()
        else:
            records = cls.query.filter(and_(cls.f_deleted != True, cls.text.like(f'%{search_string}%'), cls.platform == platform)).all()
        return Link.serialize_list(records)

    @classmethod
    def get_trending(cls, records = 5):
        # This module returns the top 5 records which has the highest number of count 
        # based on the number of times the link has been submitted. 
        # The default parameters are specified for the number of records as it serves to limit 
        # how many records are shown since the results are sorted by descending order.
        trending = cls.query\
                    .with_entities(cls.id, cls.platform, cls.url, func.count(cls.url).label('count'), cls.date_added, cls.sentiment, cls.fraud, cls.fraud_probability)\
                    .group_by(cls.url)\
                    .order_by(func.count().desc())\
                    .limit(records)\
                    .all()
        return trending

# The users table comprises of the user details, 
# and the username field is also used as a merging key to identify the users who’ve submitted the links. 
class User(db.Model, Serializer):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    is_banned = db.Column(db.Boolean, default = False)
    is_admin = db.Column(db.Boolean, default = False)
    date_registered = db.Column(db.Date, default = date.today())

    def check_password(self, password):
        # This basically is an auxiliary function which checks if the password matches the hashed value. 
        # The input value requires the password, returns Bool.
        return check_password_hash(self.password_hash, password)

    def check_is_admin(self, is_admin):
        # This is also another auxiliary function which returns the role of the user. 
        # If the user is tagged as is_admin = True, it will return the role (admin / user)
        # which corresponds to the user group by default.
        if self.is_admin:
            return 'admin'
        else:
            return 'user'
            
    @staticmethod
    def check_email(email):
        # This is also another auxiliary function which checks 
        # if the input email is valid through regex,
        # returns an object if it matches.
        regex = r'^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
        return re.search(regex, email)

    @classmethod
    def get_users(cls, records = 30):
        # This module returns the number of records. The default number of users would be 30. 
        # Those that with is_banned = True will be filitered out. 
        # The records returned are of a descending order based on the id variable, 
        # which means the newest users will be displayed first.
        records = cls.query.filter(cls.is_banned != True).order_by(cls.id.desc()).limit(records)
        return User.serialize_list(records)

    def add_user(username, email, password):
        # This module commits the user to the database. 
        # The ensuing password is hashed as well. The fields that are required are: username, email, and the password.
        _user = User(username = username, email = email, password_hash = generate_password_hash(password))
        db.session.add(_user)
        db.session.commit()

    @classmethod
    def get_user(cls, id):
        # This module returns a single record which matches a specific user. 
        # Returns None if there are no records found. Again, records with is_banned = True will not be shown. 
        # The id variable is required to identify the specific user id. 
        records = cls.query.filter(and_(cls.is_banned != True, cls.id == id)).first()
        return User.serialize_list(records)
    
    @classmethod
    def verify_identity(cls, username, password):
        # This module verifies the identity of the user, and creates returns the JWT access token. 
        # The JWT token will then comprise of the role of the user, and its username. 
        # Note that users with the is_banned = True will be filtered out, 
        # and only is_admin = True will be classified as as admins, and vice versa. 
        user = cls.query.filter(and_(cls.username == username)).first()
        admin_rights = cls.query.filter(and_(cls.is_banned != True, cls.username == username, cls.is_admin == True)).first()
        if admin_rights is not None:
            is_admin = 'admin'
        else:
            is_admin = 'user'
        if user is not None and user.check_password(password):
            return user, create_access_token(identity = { 'username' : user.username, 'is_admin' : is_admin })
        else:
            return None, None

    @classmethod
    def modify_user(cls, username, target_user, modify_type):
        # This is a user modification module which permits admins to set the is_banned variable to True or vice versa. 
        # Note that only users with elevated privileges will be able to do so. If the user is not found, 
        # there will not be any further CRUD operations performed. The parameters required are: username, target_user, and modify_type.
        if cls.query.filter(and_(cls.is_admin == True, cls.username == username)) is not None:
            _user = cls.query.filter(cls.id == target_user).first()
            if modify_type == 'ban':
                _user.is_banned = True
            else:
                _user.is_banned = False
            db.session.commit()
            return _user

    @classmethod
    def update_user_records(cls, id, email, is_admin):
        # This module updates the user records by the admins. If the target user is not found, no further CRUD operations are done.
        # The possibilities of modification of the users’ credentials are:  email and is_admin. 
        if cls.query.filter(cls.id == id) is not None:
            _user = cls.query.filter(cls.id == id).first()
            _user.email = email
            if (is_admin == 'true'):
                _user.is_admin = True
            else:
                _user.is_admin = False
            db.session.commit()
            return _user


    @classmethod
    def delete_user_records(cls, id):
        # This is a simple deletion function. 
        # If the id is found in the database, it will purge the records, 
        # otherwise there will not further operations done.
        _user = cls.query.filter(cls.id == id).first()  
        db.session.delete(_user)
        db.session.commit()
            

            


