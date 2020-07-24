from ..models import db, ProductModel
import json
from flask import jsonify


def sendProduct():
    
    prod = db.session.execute('''SELECT * FROM product''')
    
    return jsonify({'result': [dict(row) for row in prod]})