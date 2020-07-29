from app.main import create_app
import uuid
import razorpay
import json
from flask import request
import hashlib
import hmac
from flask import Flask, render_template, request

# app = Flask(__name__,static_folder = "static", static_url_path='')
razorpay_client = razorpay.Client(auth=("rzp_test_i2Oudlj4OnfNoz", "nBact8UYTRwj2qjJVj3QRQVB"))


config_name = "development"

app = create_app(config_name)

@app.route("/")
def Home():
    return "Home"

@app.route('/charge', methods=['POST'])
def app_charge():
    order_amount = "50000"
    order_payment_capture = 1
    order_currency = "INR"
    order_payment_id = uuid.uuid1()

    return json.dumps(razorpay_client.order.create(amount=order_amount, currency=order_currency, receipt=order_payment_id, payment_capture=order_payment_capture))


@app.route("/verification", methods=["POST"])
def payment_verification():
    secret = "secret"

    data = request.data

    signature = request.headers.get("x-razorpay-signature")

    print(data)

    key = bytes(secret, 'utf-8')
    msg = bytes(data)
    dig = hmac.new(key=key,msg=msg,digestmod=hashlib.sha256)
    generated_signature = dig.hexdigest()

    print(generated_signature, signature)

    if generated_signature == signature:
        print("Payment done!")
        return json.dumps({"error": False, "message":"Payment received!"})
    else:
        return json.dumps({"error": True, "message":"Payment cancelled!"})


if __name__=="main":
    app.run()
