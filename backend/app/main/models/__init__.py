from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .UserModel import UserModel
from .GoogleModel import GoogleModel
from .ProductModel import ProductModel
# from .KeyFieldModel import KeyFieldModel
from .AmenitiesModel import AmenitiesModel
from .SuitabilityModel import SuitabilityModel