from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from api.prep import Prep

app = Flask(__name__)
CORS(app)
api = Api(app)

api.add_resource(Prep, '/', '/<string:sentence>')

if __name__ == '__main__':
    app.run(debug=True)