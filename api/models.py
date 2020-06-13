# SQLLite model
from api import db
from datetime import datetime
from sqlalchemy import and_, or_, false, true, func
from sqlalchemy.inspection import inspect
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)

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
    f_deleted = db.Column(db.Boolean, default = False)

    @classmethod
    def get_past_records(cls, records = 30): 
        records = cls.query.filter(cls.f_deleted != True).order_by(cls.date_added.desc()).limit(records)
        return Link.serialize_list(records)

    def add_link(url, platform, text, sentiment, fraud):
        _link = Link(url = url, text = text, platform = platform, sentiment = sentiment, fraud = fraud)
        db.session.add(_link)
        db.session.commit()

class User(db.Model, UserMixin, Serializer):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    is_banned = db.Column(db.Boolean, default = False)
    is_admin = db.Column(db.Boolean, default = False)

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
        user.check_password(password)
        print(user.username)
        if user is not None:
            return user, create_access_token(identity = username)
        else:
            return None, None
