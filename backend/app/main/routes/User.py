from . import user
from flask import request
from ..services.user import register, login, google_auth


@user.route("/register", methods=["POST"])
def registerUser():

    response = register(request.json)

    return response


@user.route("/login", methods=["POST"])
def loginUser():

    response = login(request.json)

    return response

@user.route("/google_auth", methods=["POST"])
def googleAuthUser():

    response = google_auth(request.json)

    return response