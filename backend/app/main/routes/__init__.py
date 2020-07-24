from flask import Blueprint


user = Blueprint('user',__name__)
product = Blueprint("product",__name__)


from . import User, Product