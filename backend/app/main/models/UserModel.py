from . import db


class UserModel(db.Model):
    __tablename__="user"
    id = db.Column(db.Integer,primary_key = True)
    name = db.Column(db.String(60))
    email = db.Column(db.String(60),unique = True)
    phone = db.Column(db.Integer)
    password = db.Column(db.String(60))
    image = db.Column(db.String(500), default="https://bit.ly/3f924As")