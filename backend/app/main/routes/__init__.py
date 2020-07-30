from flask import Blueprint


user = Blueprint('user',__name__)
product = Blueprint("product",__name__)
booking = Blueprint("booking",__name__)
message = Blueprint("message",__name__)


from . import User, Product, Booking, Message