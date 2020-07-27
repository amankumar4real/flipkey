from . import booking
from flask import request
from ..services.booking import AddBookingService, availableService


@booking.route("/")
def bookingHome():

    return "Welcome to booking route"


@booking.route("/addbooking", methods = ["POST"])
def AddBookingRoute():

    token =request.headers.get("Auth")

    response = AddBookingService(request.json, token)

    return response


@booking.route("/available", methods=["POST"])
def avilableRoute():

    response = availableService(request.json)

    return response