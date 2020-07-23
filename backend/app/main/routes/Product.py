from . import product
from flask import request
from ..services.product import sendProduct


@product.route("/")
def productHome():

    return "Welcome Product Home"


@product.route("/fetchProducts", methods=["GET"])
def getData():
    
    response = sendProduct()

    return response