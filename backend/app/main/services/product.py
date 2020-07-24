from ..models import db, ProductModel
import json
from flask import jsonify


def sendProduct():
    
    prod = db.session.execute('''SELECT * FROM product as p JOIN key_field as k on p.id = k.property_id''')
    
    return jsonify({'result': [dict(row) for row in prod]})