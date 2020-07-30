from . import db


class BookingModel(db.Model):
    __tablename__="booking"
    id = db.Column(db.Integer,primary_key = True)
    property_id = db.Column(db.Integer, db.ForeignKey("product.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    from_date = db.Column(db.Date)
    to_date = db.Column(db.Date)
    price = db.Column(db.Integer)
    status = db.Column(db.String(10), default="processing")