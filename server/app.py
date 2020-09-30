from flask import Flask, request, jsonify
from flask_restful import Api
from resources.feature import Feature, FeatureList, FeatureListForCategory, UpdateFeature
from resources.type import Type, TypeList, UpdateType
from resources.categories import Category, CategoryList, UpdateCategory
from resources.type_breed import TypeBreed, TypeBreedList, TypeBreedListForType, UpdateTypeBreed
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# init app
app = Flask(__name__)
CORS(app)
# database
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:7034@localhost:5432/MFM"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

api = Api(app) #Allow add Resources from flask Rest-full

@app.before_first_request #To Create all the tables before run 
def create_tables():
    db.create_all()

db = SQLAlchemy(app)
db.init_app(app) 

api.add_resource(Feature, '/feature/<string:name>')
api.add_resource(FeatureList, '/features')
api.add_resource(UpdateFeature, '/update_feature/<string:name>')
api.add_resource(FeatureListForCategory, '/feature_for_category/<string:id_category>')

api.add_resource(Type, '/type/<string:name>')
api.add_resource(TypeList, '/types')
api.add_resource(UpdateType, '/update_type/<string:id>')

api.add_resource(Category, '/category/<string:name>')
api.add_resource(CategoryList, '/categories')
api.add_resource(UpdateCategory, '/update_category/<string:id>')

api.add_resource(TypeBreed, '/type_breed/<string:name>')
api.add_resource(TypeBreedList, '/types_breeds')
api.add_resource(UpdateTypeBreed, '/update_type_breed/<string:name>')
api.add_resource(TypeBreedListForType, '/breeds_for_type/<string:id_type>')

# init server
if __name__ == '__main__':
    app.run(port = 3000, debug = True)
