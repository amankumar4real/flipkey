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


def propertyAllDetails(details):
    try:
        product_id = details["id"]
        product_id = int(product_id)
    except KeyError:
        return json.dumps({"error": True,
                           "message": "One or more fields are missing!"})

    if product_id == "":
        return json.dumps({"error": True, "message": "Empty Fields"})

    if type(product_id) is not int:
        return json.dumps({"error": True, "message": "Wrong data format!"})


    property_data = db.session.execute('''SELECT * FROM product as p JOIN location as l ON
                                       p.id = l.property_id JOIN city as c on l.city_id = c.id
                                       WHERE p.id = %s'''%(product_id))

    property_amenities = db.session.execute('''SELECT * FROM amenities WHERE property_id = %s'''%(product_id))

    property_suitability = db.session.execute('''SELECT * FROM suitability WHERE property_id = %s'''%(product_id))

    property_owner = db.session.execute('''SELECT o.name, op.english, o.phone, op.response_rate, op.year_listed FROM
                                        owner as o JOIN ownerProperty as op ON o.id = op.owner_id
                                        WHERE op.property_id = "%s" '''%(product_id))


    return jsonify({"property_data": [dict(row) for row in property_data],
                    "property_amenities": [dict(row) for row in property_amenities],
                    "property_suitability": [dict(row) for row in property_suitability],
                    "property_owner": [dict(row) for row in property_owner]})
    # return "hi"