# from . import db

# child_friendly, car, ac, pets, near_beach
class KeyFieldModel(db.Model):
    __tablename__="key_field"
    id = db.Column(db.Integer,primary_key = True)
    property_id = db.Column(db.Integer, db.ForeignKey("product.id"),unique = True)
    child = db.Column(db.String(10))
    car = db.Column(db.String(10))
    ac = db.Column(db.String(10))
    pet = db.Column(db.String(10))
    beach = db.Column(db.String(10))