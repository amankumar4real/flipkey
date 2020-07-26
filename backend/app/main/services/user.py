from ..models import db, UserModel, GoogleModel, OwnerModel
import json
from instance.config import SECRET_KEY
import datetime
import jwt
from ..util.auth_token import check_auth_token
from flask import jsonify


def register(details):
    try:
        name = details["name"]
        email = details["email"]
        phone = details["phone"]
        password = details["password"]
        typ = details["type"]
    except KeyError:
        return json.dumps({"error": True,
                           "message": "One or more fields are missing!"})

    if email == "" or password == "" or phone == "" or name == "":
        return json.dumps({"error": True, "message": "Empty Fields"})
    
    if type(email) is not str or type(password) is not str or type(name) is not str or type(phone) is not int:
        return json.dumps({"error": True, "message": "Wrong data format!"})

    #for normal user
    if typ == "user":

        available_or_not = UserModel.query.filter(UserModel.email == email).first()

        if available_or_not is None:

            user = UserModel(name=name, email=email, phone=phone, password=password)

            db.session.add(user)
            db.session.commit()

            return json.dumps({
                "error": False, "message": "Data added to the user table!"
            })

    else:

        available_or_not = OwnerModel.query.filter(OwnerModel.email == email).first()

        if available_or_not is None:

            owner = OwnerModel(name=name, email=email, phone=phone, password=password)

            db.session.add(owner)
            db.session.commit()

            return json.dumps({
                "error": False, "message": "Data added to the owner table!"
            })


    return json.dumps({
            "error": True, "message": "Data not added to the table!"
        })
        

def login(details):
    try:
        email = details["email"]
        password = details["password"]
        typ = details["type"]
    except KeyError:
        return json.dumps({"error": True,
                           "message": "One or more fields are missing!"})

    if email == "" or password == "":
        return json.dumps({"error": True, "message": "Empty Fields"})

    if type(email) is not str or type(password) is not str:
        return json.dumps({"error": True, "message": "Wrong data format!"})

    def jwt_obj():
        return {
                    "email": data.email,
                    "created_at": str(datetime.datetime.utcnow()),
                    "expire_at": str(datetime.datetime.utcnow()
                                    + datetime.timedelta(days=1))
                }

    if typ == "user":

        data = UserModel.query.filter(UserModel.email == email).first()

        if data is not None:
            if data.password == password:
                obj = jwt_obj()

                encode_jwt = jwt.encode(obj, SECRET_KEY)

                person_name = db.session.execute('''SELECT name from user WHERE email = "%s" AND password = "%s"'''%(email, password))
                person = [dict(row) for row in person_name]

                return jsonify({"error": False, "name": person[0]["name"], "token": encode_jwt.decode(),
                                "message": "Logged in successfully!"})

            else:
                return json.dumps({"error": True,
                                "message":
                                "You have entered the wrong password!"})

        return json.dumps({"error": True, "message": "Unknown error!"})
    else:

        data = OwnerModel.query.filter(OwnerModel.email == email).first()

        if data is not None:
            if data.password == password:
                obj = jwt_obj()

                encode_jwt = jwt.encode(obj, SECRET_KEY)

                person_name = db.session.execute('''SELECT name from owner WHERE email = "%s" AND password = "%s"'''%(email, password))
                person = [dict(row) for row in person_name]

                return jsonify({"error": False, "name": person[0]["name"], "token": encode_jwt.decode(),
                                "message": "Logged in successfully!"})

            else:
                return json.dumps({"error": True,
                                "message":
                                "You have entered the wrong password!"})

        return json.dumps({"error": True, "message": "Unknown error!"})



def google_auth(details):
    try:
        name = details["name"]
        email = details["email"]
        google_id = details["googleId"]
        typ = details["type"]
    except KeyError:
        return json.dumps({"error": True,
                           "message": "One or more fields are missing!"})

    if email == "" or google_id == "" or name == "" or typ == "":
        return json.dumps({"error": True, "message": "Empty Fields"})
    
    if type(email) is not str or type(name) is not str or type(google_id) is not str:
        return json.dumps({"error": True, "message": "Wrong data format!"})

    available_or_not = GoogleModel.query.filter(GoogleModel.email == email).first()

    if available_or_not is None:
        user_type = typ

        user = GoogleModel(name=name, email=email, google_id=google_id, type=user_type)

        db.session.add(user)
        db.session.commit()

        if typ == "owner":
            owner = OwnerModel(name=name, email=email, phone=123, password="google")

            db.session.add(owner)
            db.session.commit()
        else:
            user = UserModel(name=name, email=email, phone=123, password="google")

            db.session.add(user)
            db.session.commit()
    
    obj = {
            "email": email,
            "type": typ,
            "created_at": str(datetime.datetime.utcnow()),
            "expire_at": str(datetime.datetime.utcnow()
                                + datetime.timedelta(days=1))
        }
    

    encode_jwt = jwt.encode(obj, SECRET_KEY)

    return json.dumps({"error": False, "name": name, "token": encode_jwt.decode(),
                        "message": "Logged in successfully!"})