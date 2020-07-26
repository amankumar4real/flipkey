from . import db


class OwnerModel(db.Model):
    __tablename__="owner"
    id = db.Column(db.Integer,primary_key = True)
    name = db.Column(db.String(60))
    email = db.Column(db.String(60),unique = True)
    phone = db.Column(db.Integer)
    password = db.Column(db.String(60))