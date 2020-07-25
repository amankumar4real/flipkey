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

    data = db.session.execute('''SELECT * FROM product as p JOIN amenities as a ON p.id = a.property_id
                              JOIN suitability as s on p.id = s.property_id WHERE p.no_people >= %s AND
                              p.price >= %s AND p.bed >= %s AND p.bath > %s'''%(details["people"],
                              details["price"], details["beds"], details["bath"]))
    
    init_data = [dict(row) for row in data]

    typ = details["type"]
    amenities = details["amenities"]
    suitability = details["suitability"]

    check_typ = []
    check_amen = []
    final = []

    if len(typ) > 0:
        for item in init_data:
            for i in typ:
                # print(item["type"].lower(), i.lower())
                if item["type"].lower() == i.lower():
                    check_typ.append(item)
                    break
    else:
        check_typ = init_data


    if len(amenities) > 0:
        for item in check_typ:
            check = True
            for j in amenities:
                if item[j] == "false":
                    check = False
                    break
            if check == True:
                check_amen.append(item)
            else:
                check = True
    else:
        check_amen = check_typ


    if len(suitability) > 0:
        for item in check_amen:
            check = True
            for j in suitability:
                if item[j] == "false":
                    check = False
                    break
            if check == True:
                final.append(item)
            else:
                check = True
    else:
        final = check_typ            

    return jsonify({"result": [dict(row) for row in final]})

