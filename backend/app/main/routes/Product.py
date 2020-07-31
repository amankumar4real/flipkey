from . import product
from flask import request
from ..services.product import sendProduct, filteredData, finalFilteredData, propertyAllDetails, recommendationProperty, addReview


@product.route("/")
def productHome():

    return "Welcome Product Home"


@product.route("/fetchProducts", methods=["GET"])
def getData():
    
    response = sendProduct()

    return response

@product.route("/filteredProduct")
def postData():

    data = {
        "people": request.args.get("people", type=int),
        "price": request.args.get("price", default=10, type=int),
        "bath": request.args.get("bath", default=1, type=int),
        "beds": request.args.get("beds", default=1, type=int)
    }
    
    response = filteredData(data)

    return response


@product.route("/filterMyProduct")
def postFinalData():

    data = {
        "people": request.args.get("people",default=1, type=int),
        "price": request.args.get("price", default=10, type=int),
        "type": request.args.getlist("type"),
        "bath": request.args.get("bath", default=1, type=int),
        "beds": request.args.get("beds", default=1, type=int),
        "amenities": request.args.getlist("amenities"),
        "suitability": request.args.getlist("suitability"),
        "sortby": request.args.get("sortby", default="relevence", type=str),
        "place": request.args.get("place", default="delhi", type=str)
    }
    
    response = finalFilteredData(data)

    return response


@product.route("/myData", methods=["POST"])
def propertycomplete():

    response = propertyAllDetails(request.json)

    return response


@product.route("/recommendation", methods=["POST"])
def recomm():

    response = recommendationProperty(request.json)

    return response


@product.route("/addReview", methods=["POST"])
def addrev():

    token =request.headers.get("Auth")

    print(token, request.json)

    response = addReview(request.json, token)

    return response