from ..models import db, ProductModel, ReviewModel
import json
from flask import jsonify
import random
from ..util.auth_token import check_auth_token
from datetime import date, timedelta, datetime

def sendProduct():
    
    prod = db.session.execute('''SELECT * FROM product as p JOIN key_field as k on p.id = k.property_id''')
    
    return jsonify({'result': [dict(row) for row in prod]})


def filteredData(details):

    data = db.session.execute('''SELECT * FROM product WHERE no_people >= %s AND
                              price >= %s AND bed >= %s'''%(details["people"],
                              details["price"], details["beds"]))

    return jsonify({'result': [dict(row) for row in data]})


def finalFilteredData(details):

    sortby = details["sortby"]
    data = ""

    if sortby == "relevence":
        data = db.session.execute('''SELECT p.*, a.*, s.*, lo.lat as lat_pro, lo.lng as lng_pro, ci.city, ci.lat as lat_ci,
                                  ci.lng as lng_ci FROM product as p JOIN amenities as a ON p.id = a.property_id
                                  JOIN suitability as s on p.id = s.property_id JOIN location as lo ON lo.property_id = p.id
                                  JOIN city as ci on ci.id = lo.city_id WHERE p.no_people >= %s AND
                                  p.price >= %s AND p.bed >= %s AND p.bath > %s AND ci.lat = "%s" AND ci.lng = "%s"'''%(details["people"],
                                  details["price"], details["beds"], details["bath"], details["lat"], details["lng"]))
    else:
        so = ""

        if sortby == "low":
            so = "ASC"
        else:
            so = "DESC"

        data = db.session.execute('''SELECT p.*, a.*, s.*, lo.lat as lat_pro, lo.lng as lng_pro, ci.city, ci.lat as lat_ci,
                                  ci.lng as lng_ci FROM product as p JOIN amenities as a ON p.id = a.property_id
                                  JOIN suitability as s on p.id = s.property_id JOIN location as lo ON lo.property_id = p.id
                                  JOIN city as ci on ci.id = lo.city_id WHERE p.no_people >= %s AND
                                  p.price >= %s AND p.bed >= %s AND p.bath > %s AND ci.lat = "%s" AND ci.lng = "%s" 
                                  ORDER BY p.price %s'''%(details["people"],
                                  details["price"], details["beds"], details["bath"], details["lat"], details["lng"], so))

    
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


    property_data = db.session.execute('''SELECT p.*, l.lat as pro_lat, l.lng as pro_lng, c.lat as city_lat, 
                                       c.lng as city_lng FROM product as p JOIN location as l ON
                                       p.id = l.property_id JOIN city as c on l.city_id = c.id
                                       WHERE p.id = %s'''%(product_id))

    property_amenities = db.session.execute('''SELECT * FROM amenities WHERE property_id = %s'''%(product_id))

    property_suitability = db.session.execute('''SELECT * FROM suitability WHERE property_id = %s'''%(product_id))

    property_owner = db.session.execute('''SELECT o.name, op.english, o.phone, op.response_rate, op.year_listed FROM
                                        owner as o JOIN ownerProperty as op ON o.id = op.owner_id
                                        WHERE op.property_id = "%s" '''%(product_id))

    property_review = db.session.execute('''SELECT r.*, u.image FROM review as r JOIN user as u ON r.user_id = u.id WHERE property_id = %s'''%(product_id))


    return jsonify({"property_data": [dict(row) for row in property_data],
                    "property_amenities": [dict(row) for row in property_amenities],
                    "property_suitability": [dict(row) for row in property_suitability],
                    "property_owner": [dict(row) for row in property_owner],
                    "property_review": [dict(row) for row in property_review]})
    # return "hi"


def recommendationProperty(details):

    prop_id = details["id"]

    data = db.session.execute('''SELECT * FROM amenities WHERE property_id = %s'''%(prop_id))

    meta_data = [dict(row) for row in data]

    amenities = []

    for i in meta_data:
        for j in i:
            if i[j] == "true":
                amenities.append(j)

    # randomlist = random.sample(range(0, len(amenities)), (0 + len(amenities)//2))

    # print(randomlist)

    meta_data_v2 = db.session.execute('''SELECT a.*, p.name, p.image_a, p.price, ci.city, p.description, p.bed, p.no_people FROM product as p JOIN amenities as a ON p.id = a.property_id
                                      JOIN location as lo ON p.id = lo.property_id JOIN city as ci on lo.city_id = ci.id WHERE p.id != %s
                                      AND lo.city_id IN(SELECT c.id FROM city as c JOIN location as l ON l.city_id = c.id
                                      WHERE l.property_id = %s)'''%(prop_id, prop_id))
    
    meta_data_v2 = [dict(row) for row in meta_data_v2]

    final_data = []

    for k in meta_data_v2:
        coun = 0
        for l in amenities:
            if k[l] == "true":             
                coun+=1
        if coun >= (len(amenities)//2):
            final_data.append(k)
    print(len(final_data), len(amenities))

    return jsonify({"data": final_data})


def addReview(details, token):

    try:
        property_id = details["property_id"]
        title = details["title"]
        rating = details["rating"]
        review = details["review"]
    except KeyError:
        return json.dumps({"error": True, "message": "One or more fields are missing!"})

    if property_id == "" or title == "" or rating == "" or review == "" or token == "":
        return json.dumps({"error": True, "message": "Empty Fields"})

    if type(property_id) is not int or type(title) is not str or type(rating) is not int or type(review) is not str or type(token) is not str:
        return json.dumps({"error": True, "message": "Wrong data format!"})

    status, data = check_auth_token(token)

    if status is False:
        return json.dumps({"error": True, "message": "Token has expired!"})
    

    user_id = db.session.execute('''SELECT id FROM user where email = "%s"'''%(data["email"]))

    user_id = [dict(row) for row in user_id]

    user_id = user_id[0]["id"]

    review = ReviewModel(property_id = property_id, user_id = user_id, title = title, rating = rating, rev_date = datetime.today().strftime('%Y-%m-%d'), review = review)

    db.session.add(review)
    db.session.commit()

    return json.dumps({
        "error": False, "message": "Data added to the review table!"
    })