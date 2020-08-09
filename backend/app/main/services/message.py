import json
from flask import jsonify
from twilio.rest import Client


def SendMessage(details):
    print(details)
    try:
        send_to = details["to"]
        text = details["message"]
    except KeyError:
        return json.dumps({"error": True,
                            "message": "One or more fields are missing!"})

    if send_to == "" or text == "":
        return json.dumps({"error": True, "message": "Empty Fields"})

    if type(send_to) is not str or type(text) is not str:
        return json.dumps({"error": True, "message": "Wrong data format!"})

    account_sid = 'abc'
    auth_token = 'xyz'

    client = Client(account_sid, auth_token)

    message = client.messages \
                    .create(
                        body=text,
                        from_='+14075126353',
                        to= "+91" + send_to
                    )

    return jsonify({"error": False, "message": "sms sent to the user!"})
