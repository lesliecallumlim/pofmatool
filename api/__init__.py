from flask import Flask
from api.config import Config 
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address


app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

limiter = Limiter(
    app,
    key_func=get_remote_address,
    # default_limits=["200 per day", "50 per hour"]
)
from api import api, models 
