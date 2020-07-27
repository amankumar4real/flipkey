from ..models import db, BookingModel
import json
from flask import jsonify
from ..util.auth_token import check_auth_token


def AddBookingService(details, token):

    # token, property_id, from_date, to_date, price
    try:
        property_id = details["property_id"]
        from_date = details["from_date"]
        to_date = details["to_date"]
        price = details["price"]
    except KeyError:
        return json.dumps({"error": True,
                           "message": "One or more fields are missing!"})

    if property_id == "" or from_date == "" or to_date == "":
        return json.dumps({"error": True, "message": "Empty Fields"})

    if type(property_id) is not int or type(from_date) is not str or type(to_date) is not str:
        return json.dumps({"error": True, "message": "Wrong data format!"})

    status, data = check_auth_token(token)

    if status is False:
        return json.dumps({"error": True,
                           "message": "Token has expired!"})

    user_id = db.session.execute('''SELECT id FROM user where email = "%s"'''%(data["email"]))

    user_id = [dict(row) for row in user_id]

    user_id = user_id[0]["id"]

    booking = BookingModel(property_id = property_id, user_id = user_id, from_date = from_date, to_date = to_date, price = price)

    db.session.add(booking)
    db.session.commit()

    return json.dumps({
        "error": False, "message": "Data added to the booking table!"
    })

    # return jsonify({"token": user_id})


def AddBookingService(details):
    try:
        property_id = details["property_id"]
    except KeyError:
        return json.dumps({"error": True,
                           "message": "One or more fields are missing!"})

    if property_id == "":
        return json.dumps({"error": True, "message": "Empty Fields"})

    if type(property_id) is not int:
        return json.dumps({"error": True, "message": "Wrong data format!"})

    check_dates = db.session.execute('''SELECT * FROM product as p JOIN booking as b ON p.id = b.property_id
                                     where p.id = "%s"'''%(property_id))

    

    return "still working on this service!"