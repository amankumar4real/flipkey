from . import db


class LocationModel(db.Model):
    __tablename__="location"
    id = db.Column(db.Integer,primary_key = True)
    city_id = db.Column(db.Integer, db.ForeignKey("city.id"))
    property_id = db.Column(db.Integer, db.ForeignKey("product.id"),unique = True)