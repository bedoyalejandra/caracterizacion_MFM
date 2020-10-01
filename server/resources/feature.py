import sqlite3
from flask import Flask, request
from flask_restful import Resource, reqparse
from models.feature import FeatureModel
from models.categories import CategoriesModel
from db import db

class Feature(Resource):
    #Specify all the arguments  
    parser = reqparse.RequestParser()
    #parser.add_argument('name', type = string, required=True, help="This field cannot be left blank!")

    def get(self, name):
        feature = FeatureModel.find_by_name(name)
        if feature:
            return feature.json()
        return {'message':'feature not found'},404
    
    
    def post(self, name):

        data = request.get_json()
        print('data')
        print(data['id_category'])

        if FeatureModel.find_by_name(name):
            return {"message":f"feature: {name} already exist"}

        feature = FeatureModel(data['id_category'], name)

        try:
            feature.save_to_db()
        except:
            return {"message":"An error ocurred"},500

        return feature.json(), 201 
    
    def delete(self,name):
        feature = FeatureModel.find_by_name(name)
        if feature:
            feature.delete_from_db()
        return ({"Message":"feature deleted!"})


class FeatureList(Resource):
    def get(self):
        value = FeatureModel.query.join(CategoriesModel, FeatureModel.id_category == CategoriesModel.id).with_entities(FeatureModel.id, CategoriesModel.id, CategoriesModel.name, FeatureModel.name).all()
        result = []
        if value:
            for val in value:
                result.append({
                    "id": val[0],
                    "id_category": val[1],
                    "name_category": val[2],
                    "name": val[3]
                })            
            return result
"""

class FeatureList(Resource):
    def get(self):
        return {'Features': [feature.json() for feature in FeatureModel.query.all()]}
"""

class FeatureListForCategory(Resource):
    def get(self, id_category):
        return {'Features': [feature.json() for feature in FeatureModel.find_by_category(id_category)]}

class UpdateFeature(Resource):
    def put(self, id):

        value = FeatureModel.query.filter(FeatureModel.id == id).first()

        if value:
            data = request.get_json() 
            value.name = data['name'] 
            value.id_category = data['id_category'] 
            db.session.flush()
            db.session.commit()
            return ({"Message":"feature updated!"})
        else:
            return 'error'
        
