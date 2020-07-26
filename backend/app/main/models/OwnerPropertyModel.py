from . import db

class OwnerPropertyModel(db.Model):
    __tablename__="ownerProperty"
    id = db.Column(db.Integer,primary_key = True)
    property_id = db.Column(db.Integer, db.ForeignKey("product.id"),unique = True)
    owner_id = db.Column(db.Integer, db.ForeignKey("owner.id"))
    english = db.Column(db.String(10))
    response_rate = db.Column(db.Integer)
    year_listed = db.Column(db.Integer)