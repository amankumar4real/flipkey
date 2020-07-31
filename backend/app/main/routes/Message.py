from . import message
from flask import request
from ..services.message import SendMessage

@message.route("/")
def messageHome():

    return "hi there man!"

@message.route("/", methods=["POST"])
def sendMess():

    response = SendMessage(request.json)

    return response