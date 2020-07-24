from . import db

class SuitabilityModel(db.Model):
    __tablename__="suitability"
    id = db.Column(db.Integer,primary_key = True)
    property_id = db.Column(db.Integer, db.ForeignKey("product.id"),unique = True)
    pets = db.Column(db.String(10))
    parking = db.Column(db.String(10))
    children = db.Column(db.String(10))
    smoke = db.Column(db.String(10))
    elevator = db.Column(db.String(10))
    wheelchair = db.Column(db.String(10))
    car_req = db.Column(db.String(10))