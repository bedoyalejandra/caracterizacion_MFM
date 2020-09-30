import sqlite3
from db import db

class FeatureModel(db.Model):

    __tablename__ = 'features'

    id = db.Column(db.Integer, primary_key = True)
    id_category = db.Column(db.Integer)
    name = db.Column(db.String(200), unique = True)

    def __init__(self, id_category, name):
        self.name = name
        self.id_category = id_category

    def json(self):
        return {"id": self.id, "id_category" : self.id_category, "name" : self.name}

    @classmethod
    def find_by_name(cls,name):
        return cls.query.filter_by(name = name).first()

    @classmethod
    def find_by_category(cls, id_category):
        return cls.query.filter_by(id_category = id_category)
        
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()