from app.main import create_app
import uuid
import razorpay
import json
from flask import request
import hashlib
import hmac
from flask import Flask, render_template, request
from app.main.util.auth_token import check_auth_token
from app.main.models import db, BookingModel
from datetime import datetime
from dateutil.parser import parse

# app = Flask(__name__,static_folder = "static", static_url_path='')
razorpay_client = razorpay.Client(auth=("rzp_test_i2Oudlj4OnfNoz", "nBact8UYTRwj2qjJVj3QRQVB"))


config_name = "development"

app = create_app(config_name)

@app.route("/")
def Home():
    return "Home"

@app.route('/charge', methods=['POST'])
def app_charge():

    details = request.json
    token = request.headers.get("Auth")

    try:
        property_id = details["property_id"]
        from_date = details["from_date"]
        to_date = details["to_date"]
        price = details["price"]
    except KeyError:
        return json.dumps({"error": True, "message": "One or more fields are missing!"})

    if property_id == "" or from_date == "" or to_date == "" or token == "":
        return json.dumps({"error": True, "message": "Empty Fields"})

    if type(property_id) is not int or type(from_date) is not str or type(to_date) is not str or type(token) is not str:
        return json.dumps({"error": True, "message": "Wrong data format!"})

    status, data = check_auth_token(token)

    if status is False:
        return json.dumps({"error": True, "message": "Token has expired!"})

    order_amount = str(price)
    order_payment_capture = 1
    order_currency = "INR"
    order_payment_id = uuid.uuid1()

    user_id = db.session.execute('''SELECT id FROM user where email = "%s"'''%(data["email"]))
    user_id = [dict(row) for row in user_id]
    user_id = user_id[0]["id"]

    checkin = parse(from_date).date()
    checkout = parse(to_date).date()

    booking = BookingModel(property_id = property_id, user_id = user_id, from_date = checkin, to_date = checkout, price = price)

    db.session.add(booking)
    db.session.commit()

    return json.dumps(razorpay_client.order.create(amount=order_amount, currency=order_currency, receipt=order_payment_id, payment_capture=order_payment_capture))


@app.route("/verification", methods=["POST"])
def payment_verification():
    secret = "secret"

    data = request.data

    signature = request.headers.get("x-razorpay-signature")

    key = bytes(secret, 'utf-8')
    msg = bytes(data)
    dig = hmac.new(key=key,msg=msg,digestmod=hashlib.sha256)
    generated_signature = dig.hexdigest()

    my_id = 0

    sel_id = db.session.execute('''SELECT * FROM booking WHERE status = "processing";''')

    for i in sel_id:
        my_id  = i["id"]

    if generated_signature == signature:

        changes = BookingModel.query.filter_by(id=my_id).first()
        changes.status = "complete"
        db.session.commit()

        return json.dumps({"error": False, "message":"Payment received!"})
    else:

        obj = BookingModel.query.filter_by(id=my_id).delete()
        db.session.commit()

        return json.dumps({"error": True, "message":"Payment cancelled!"})


if __name__=="main":
    app.run()
