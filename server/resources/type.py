import sqlite3
from flask import Flask, request
from flask_restful import Resource, reqparse
from models.type import TypeModel
from db import db

class Type(Resource):
    #Specify all the arguments  
    parser = reqparse.RequestParser()
    #parser.add_argument('name', type = string, required=True, help="This field cannot be left blank!")

    def get(self, name):
        type = TypeModel.find_by_name(name)
        if type:
            return type.json()
        return {'message':'type not found'},404
    
    
    def post(self, name):

        if TypeModel.find_by_name(name):
            return {"message":f"type: {name} already exist"}

        type = TypeModel(name)

        try:
            type.save_to_db()
        except:
            return {"message":"An error ocurred"},500

        return type.json(), 201 

    
    def delete(self,name):
        type = TypeModel.find_by_name(name)
        if type:
            type.delete_from_db()
        return ({"Message":"type deleted!"})


    
class TypeList(Resource):
    def get(self):
        return {'Types': [type.json() for type in TypeModel.query.all()]}

class UpdateType(Resource):
    def put(self, id):

        value = TypeModel.query.filter(TypeModel.id == id).first()

        if value:
            data = request.get_json() 
            value.name = data['name'] 
            db.session.flush()
            db.session.commit()
            return ({"Message":"type updated!"})
        else:
            return 'error'
        
