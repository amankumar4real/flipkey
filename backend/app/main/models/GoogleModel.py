from . import db


class GoogleModel(db.Model):
    __tablename__="google_auth"
    id = db.Column(db.Integer,primary_key = True)
    name = db.Column(db.String(60))
    email = db.Column(db.String(60),unique = True)
    google_id = db.Column(db.String(100))
    type = db.Column(db.String(60))