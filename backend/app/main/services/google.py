from ..models import db, GoogleModel
import json
from instance.config import SECRET_KEY
import datetime
import jwt
from ..util.auth_token import check_auth_token


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

    available_or_not = GoogleModel.query.filter(GoogleModel.email == email, GoogleModel.type == typ).first()

    if available_or_not is None:
        user_type = typ

        user = GoogleModel(name=name, email=email, google_id=google_id, type=user_type)

        db.session.add(user)
        db.session.commit()
    
    obj = {
            "email": email,
            "type": typ,
            "created_at": str(datetime.datetime.utcnow()),
            "expire_at": str(datetime.datetime.utcnow()
                                + datetime.timedelta(days=1))
        }
    
    print(obj)

    encode_jwt = jwt.encode(obj, SECRET_KEY)

    return json.dumps({"error": False, "token": encode_jwt.decode(),
                        "message": "Logged in successfully!"})
