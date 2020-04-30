# SQLLite model
from api import db
from datetime import datetime
from sqlalchemy import and_, or_, false, true, func
from sqlalchemy.inspection import inspect

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
    date_added = db.Column(db.DateTime, default = datetime.now)
    fraud_probability = db.Column(db.Float)
    f_deleted = db.Column(db.Boolean, default = False)

    @classmethod
    def get_past_records(cls, records = 30): 
        records = cls.query.filter(cls.f_deleted != True).order_by(cls.date_added.desc()).limit(records)
        return Link.serialize_list(records)
    def add_link(url, platform, text, fraud_probability = 0):
        _link = Link(url = url, text = text, platform = platform, fraud_probability = fraud_probability)
        db.session.add(_link)
        db.session.commit()
