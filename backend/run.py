from app.main import create_app
 
import razorpay
import json

from flask import Flask, render_template, request

app = Flask(__name__,static_folder = "static", static_url_path='')
razorpay_client = razorpay.Client(auth=("rzp_test_i2Oudlj4OnfNoz", "nBact8UYTRwj2qjJVj3QRQVB"))


config_name = "development"

app = create_app(config_name)

@app.route("/")
def Home():
    return "Home"

@app.route('/charge', methods=['POST'])
def app_charge():
    amount = 5100
    payment_id = request.form['razorpay_payment_id']
    razorpay_client.payment.capture(payment_id, amount)
    return json.dumps(razorpay_client.payment.fetch(payment_id))


if __name__=="main":
    app.run()
