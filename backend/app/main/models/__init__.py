from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .UserModel import UserModel
from .GoogleModel import GoogleModel
from .ProductModel import ProductModel
from .AmenitiesModel import AmenitiesModel
from .SuitabilityModel import SuitabilityModel
from .CityModel import CityModel
from .LocationModel import LocationModel
from .OwnerModel import OwnerModel
from .OwnerPropertyModel import OwnerPropertyModel