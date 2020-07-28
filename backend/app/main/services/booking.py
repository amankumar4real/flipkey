from ..models import db, BookingModel
import json
from flask import jsonify
from ..util.auth_token import check_auth_token
from datetime import date, timedelta


def AddBookingService(details, token):

    # token, property_id, from_date, to_date, price
    try:
        property_id = details["property_id"]
        from_date = details["from_date"]
        to_date = details["to_date"]
        price = details["price"]
    except KeyError:
        return json.dumps({"error": True, "message": "One or more fields are missing!"})

    if property_id == "" or from_date == "" or to_date == "":
        return json.dumps({"error": True, "message": "Empty Fields"})

    if type(property_id) is not int or type(from_date) is not str or type(to_date) is not str:
        return json.dumps({"error": True, "message": "Wrong data format!"})

    status, data = check_auth_token(token)

    if status is False:
        return json.dumps({"error": True, "message": "Token has expired!"})

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


def availableService(details):
    try:
        property_id = details["property_id"]
    except KeyError:
        return json.dumps({"error": True,
                           "message": "One or more fields are missing!"})

    if property_id == "":
        return json.dumps({"error": True, "message": "Empty Fields"})

    if type(property_id) is not int:
        return json.dumps({"error": True, "message": "Wrong data format!"})

    check_dates = db.session.execute('''SELECT b.from_date, b.to_date FROM product as p JOIN booking as b ON p.id = b.property_id
                                     where p.id = "%s"'''%(property_id))

    date_sets = []

    # for date in check_dates:
    #     # check = []

    #     from_date_split = str(date["from_date"]).split("-")
    #     to_date_split = str(date["to_date"]).split("-")

    #     # print(int(from_date_split[0]))

    #     def daterange(date1, date2):
    #         for n in range(int ((date2 - date1).days)+1):
    #             yield date1 + timedelta(n)

    #     start_dt = date(from_date_split[0], from_date_split[1], from_date_split[2])
    #     end_dt = date(to_date_split[0],to_date_split[1], to_date_split[2])

    #     for dt in daterange(start_dt, end_dt):
    #         date_sets.append(str(dt.strftime("%Y-%m-%d")))
    
    # print(date_sets)
    return ({"data": "Still in works!"})