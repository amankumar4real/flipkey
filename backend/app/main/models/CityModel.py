from . import db

class CityModel(db.Model):
    __tablename__="city"
    id = db.Column(db.Integer,primary_key = True)
    city = db.Column(db.String(50))
    lat = db.Column(db.String(50))
    lng = db.Column(db.String(50))