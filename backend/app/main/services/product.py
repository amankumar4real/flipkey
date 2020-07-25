from ..models import db, ProductModel
import json
from flask import jsonify


def sendProduct():
    
    prod = db.session.execute('''SELECT * FROM product as p JOIN key_field as k on p.id = k.property_id''')
    
    return jsonify({'result': [dict(row) for row in prod]})


def filteredData(details):

    data = db.session.execute('''SELECT * FROM product WHERE no_people >= %s AND
                              price >= %s AND bed >= %s'''%(details["people"],
                              details["price"], details["beds"]))

    return jsonify({'result': [dict(row) for row in data]})


def finalFilteredData(details):

    data = db.session.execute('''SELECT * FROM product WHERE no_people >= %s AND
                              price >= %s AND bed >= %s'''%(details["people"],
                              details["price"], details["beds"]))
    
    init_data = [dict(row) for row in data]

    typ = details["type"]
    amenities = details["amenities"]
    suitability = details["suitability"]

    # for item in init_data:

    return "Still working"

