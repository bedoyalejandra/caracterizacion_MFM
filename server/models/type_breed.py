import sqlite3
from db import db

class TypeBreedModel(db.Model):

    __tablename__ = 'type_breed'

    id = db.Column(db.Integer, primary_key = True)
    id_type = db.Column(db.Integer)
    name = db.Column(db.String(200), unique = True)

    def __init__(self, id_type, name):
        self.name = name
        self.id_type = id_type

    def json(self):
        return {"id_type" : self.id_type, "name" : self.name}

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name = name).first()
    
    @classmethod
    def find_by_type(cls, id_type):
        return cls.query.filter_by(id_type = id_type)
        
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()