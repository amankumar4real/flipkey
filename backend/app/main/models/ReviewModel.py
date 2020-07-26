from . import db
import datetime

class ReviewModel(db.Model):
    __tablename__="review"
    id = db.Column(db.Integer,primary_key = True)
    property_id = db.Column(db.Integer, db.ForeignKey("product.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    title = db.Column(db.String(70))
    rating = db.Column(db.Integer)
    rev_date = db.Column(db.DateTime(timezone=True),default=datetime.date.today())
    review = db.Column(db.String(500))