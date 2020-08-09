from flask import Flask, jsonify
from api.config import Config 
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import logging

app = Flask(__name__) 
app.config.from_object(Config) # Config file
db = SQLAlchemy(app) # DB through the SQL ORM
migrate = Migrate(app, db) # Data migration as needed
jwt = JWTManager(app) # For JWT tokens

# Logfile to keep track of the various exceptions raised
logging.basicConfig(filename='error.log',level=logging.INFO)

# Basically a rate limiter
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

# Custom message for JWT
@jwt.expired_token_loader
def my_expired_token_callback(expired_token):
    token_type = expired_token['type']
    return jsonify({
        'status': 401,
        'sub_status': 42,
        'message': 'The {} token has expired'.format(token_type)
    }), 401


from api import api, models 
