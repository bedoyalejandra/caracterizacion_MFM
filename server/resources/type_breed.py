import sqlite3
from flask import Flask, request
from flask_restful import Resource, reqparse
from models.type_breed import TypeBreedModel
from models.type import TypeModel
from db import db

class TypeBreed(Resource):
    #Specify all the arguments  
    parser = reqparse.RequestParser()
    #parser.add_argument('name', type = string, required=True, help="This field cannot be left blank!")

    def get(self, name):
        type_breed = TypeBreedModel.find_by_name(name)
        if type_breed:
            return type_breed.json()
        return {'message':'type_breed not found'},404
    
    
    def post(self, name):

        if TypeBreedModel.find_by_name(name):
            return {"message":f"type_breed: {name} already exist"}

        # catch the arguments 
        data = request.get_json()
        type_breed = TypeBreedModel(data['id_type'], name)

        try:
            type_breed.save_to_db()
        except:
            return {"message":"An error ocurred"},500

        return type_breed.json(), 201 
    
    def delete(self,name):
        type_breed = TypeBreedModel.find_by_name(name)
        if type_breed:
            type_breed.delete_from_db()
        return ({"Message":"type_breed deleted!"})

 
#class TypeBreedList(Resource):
#    def get(self):
#        return {'TypesBreeds': [type_breed.json() for type_breed in TypeBreedModel.query.join(TypeModel.name, TypeBreedModel.id_type == TypeModel.id).all()]}


class TypeBreedList(Resource):
    def get(self):
        return {'TypesBreeds': [type_breed.json() for type_breed in TypeBreedModel.query.all()]}

class TypeBreedListForType(Resource):
    def get(self, id_type):
        return {'TypesBreeds': [type_breed.json() for type_breed in TypeBreedModel.find_by_type(id_type)]}

class UpdateTypeBreed(Resource):
    def put(self, id):

        value = TypeBreedModel.query.filter(TypeBreedModel.id == id).first()

        if value:
            data = request.get_json() 
            value.name = data['name'] 
            value.id_type = data['id_type'] 
            db.session.flush()
            db.session.commit()
            return ({"Message":"type_breed updated!"})
        else:
            return 'error'
        
