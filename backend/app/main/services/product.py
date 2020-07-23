from ..models import db, ProductModel
import json


def sendProduct():
    
    # prod = db.session.execute('''SELECT * FROM product''')

    prod = ProductModel.query.all()

    data = []

    # for item in prod:
    #     data.append(item)

    # my = {
    #     "mess": data
    # }
    
    return jsonify({'result':  prod})