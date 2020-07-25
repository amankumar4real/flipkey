from . import db


class ProductModel(db.Model):
    __tablename__="product"
    id = db.Column(db.Integer,primary_key = True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(600))
    bed = db.Column(db.Integer)
    bath = db.Column(db.Integer)
    no_people = db.Column(db.Integer)
    type = db.Column(db.String(50))
    price = db.Column(db.Integer)
    minimum_stay = db.Column(db.Integer)
    image_a = db.Column(db.String(200))
    image_b = db.Column(db.String(200))
    image_c = db.Column(db.String(200))
    image_d = db.Column(db.String(200))



