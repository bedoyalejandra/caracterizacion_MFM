import sqlite3
from flask import Flask, request
from flask_restful import Resource, reqparse
from models.categories import CategoriesModel
from db import db

class Category(Resource):
    #Specify all the arguments  
    parser = reqparse.RequestParser()
    #parser.add_argument('name', type = string, required=True, help="This field cannot be left blank!")

    def get(self, name):
        category = CategoriesModel.find_by_name(name)
        if category:
            return category.json()
        return {'message':'category not found'},404
    
    
    def post(self, name):
        
        if CategoriesModel.find_by_name(name):
            return {"message":f"category: {name} already exist"}

        category = CategoriesModel(name)

        try:
            category.save_to_db()
        except:
            return {"message":"An error ocurred"},500

        return category.json(), 201 
    
    def delete(self,name):
        category = CategoriesModel.find_by_name(name)
        if category:
            category.delete_from_db()
        return ({"Message":"category deleted!"})


    
class CategoryList(Resource):
    def get(self):
        return {'Categories': [category.json() for category in CategoriesModel.query.all()]}

class UpdateCategory(Resource):
    def put(self, id):

        value = CategoriesModel.query.filter(CategoriesModel.id == id).first()

        if value:
            data = request.get_json() 
            value.name = data['name'] 
            db.session.flush()
            db.session.commit()
            return ({"Message":"category updated!"})
        else:
            return 'error'
        
        
