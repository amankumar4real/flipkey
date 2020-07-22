from ..models import db, UserModel
import json
from instance.config import SECRET_KEY


def register(details):
    name = details["name"]
    email = details["email"]
    phone = details["phone"]
    password = details["password"]

    available_or_not = UserModel.query.filter(UserModel.email == email).first()

    if available_or_not is None:
        user_type = "user"

        user = UserModel(name=name, email=email, phone=phone, password=password, type=user_type)

        db.session.add(user)
        db.session.commit()

        return json.dumps({
            "error": False, "message": "Data added to the user table!"
        })


    return json.dumps({
            "error": True, "message": "Data not added to the user table!"
        })