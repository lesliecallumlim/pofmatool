# SQLLite model
from api import db
from datetime import datetime, timedelta
from sqlalchemy import and_, or_, false, true, func, case
from sqlalchemy.inspection import inspect
from werkzeug.security import generate_password_hash, check_password_hash
# from flask_login import UserMixin
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)
from flask import jsonify 
from datetime import date 

class Serializer(object):
    def serialize(self):
        return {c: getattr(self, c) for c in inspect(self).attrs.keys()}
    @staticmethod
    def serialize_list(l):
        return [m.serialize() for m in l]

class Link(db.Model, Serializer):
    id = db.Column(db.Integer, primary_key = True)
    url = db.Column(db.String(128)) #TODO: Add unique links, prevent duplicates, unique = True) # Links gotta be unique man
    platform = db.Column(db.String(20))
    text = db.Column(db.String(200))
    sentiment = db.Column(db.String(50))
    date_added = db.Column(db.DateTime, default = datetime.now)
    fraud = db.Column(db.String(20))
    fraud_probability = db.Column(db.Float(precision = '2,1'))
    f_deleted = db.Column(db.Boolean, default = False)
    username_submitted = db.Column(db.String(64), default = 'Guest')

    @classmethod
    def get_past_records(cls, start = 1, records = 5): 
        # records = cls.query.filter(cls.f_deleted != True).order_by(cls.date_added.desc()).limit(records)
        records = cls.query.filter(cls.f_deleted != True).order_by(cls.date_added.desc()).paginate(start, records, False).items
        return Link.serialize_list(records)

    def add_link(url, platform, text, sentiment, fraud, fraud_probability, username):
        _link = Link(url = url, text = text, platform = platform, sentiment = sentiment,\
                     fraud = fraud, fraud_probability = fraud_probability, username_submitted = username)
        db.session.add(_link)
        db.session.commit()

    @classmethod
    def get_summarised_records(cls):
        # count = func.count(cls.id)
        real_news = func.sum(case([(cls.fraud == 'Real', 1)], else_= 0)).label('real_news')
        fake_news = func.sum(case([(cls.fraud == 'Fake', 1)], else_= 0)).label('fake_news')
        summary = cls.query.with_entities(cls.platform, real_news, fake_news).group_by(cls.platform).filter(cls.f_deleted != True).all()
        print(summary)
        return summary

    @classmethod
    def get_user_past_records(cls, username, start = 1, records = 5): 
        records = cls.query.filter(and_(cls.f_deleted != True, cls.username_submitted == username))\
                           .order_by(cls.date_added.desc()).paginate(start, records, False).items
        return Link.serialize_list(records)

    @classmethod
    def get_past_content(cls, platform, search_string):
        if platform == 'All':
            records = cls.query.filter(and_(cls.f_deleted != True, cls.text.like(f'%{search_string}%'))).all()
        elif platform == 'User':
            records = cls.query.filter(and_(cls.f_deleted != True, cls.username_submitted == search_string)).all()
        else:
            records = cls.query.filter(and_(cls.f_deleted != True, cls.text.like(f'%{search_string}%'), cls.platform == platform)).all()
        return Link.serialize_list(records)

    @classmethod
    def get_trending(cls, records = 5):
        trending = cls.query\
                    .with_entities(cls.id, cls.platform, cls.url, func.count(cls.url).label('count'), cls.date_added, cls.sentiment, cls.fraud, cls.fraud_probability)\
                    .group_by(cls.url)\
                    .order_by(func.count().desc())\
                    .limit(records)\
                    .all()
                                        # .filter(cls.date_added < datetime.today() - timedelta(days))\
        return trending

class User(db.Model, Serializer):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    is_banned = db.Column(db.Boolean, default = False)
    is_admin = db.Column(db.Boolean, default = False)
    date_registered = db.Column(db.Date, default = date.today())

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    @classmethod
    def get_users(cls, records = 30):
        records = cls.query.filter(cls.is_banned != True).order_by(cls.id.desc()).limit(records)
        return User.serialize_list(records)
#
    # @classmethod
    def add_user(username, email, password):
        _user = User(username = username, email = email, password_hash = generate_password_hash(password))
        db.session.add(_user)
        db.session.commit()
    
    @classmethod
    def verify_identity(cls, username, password):
        user = cls.query.filter(and_(cls.username == username)).first()
        if user is not None and user.check_password(password):
            return user, create_access_token(identity = username)
        else:
            return None, None
