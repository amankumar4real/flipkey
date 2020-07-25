from . import db


class AmenitiesModel(db.Model):
    __tablename__="amenities"
    id = db.Column(db.Integer,primary_key = True)
    property_id = db.Column(db.Integer, db.ForeignKey("product.id"),unique = True)
    balcony = db.Column(db.String(10))
    staffed = db.Column(db.String(10))
    tv = db.Column(db.String(10))
    fans = db.Column(db.String(10))
    linen = db.Column(db.String(10))
    towels = db.Column(db.String(10))
    housekeeper = db.Column(db.String(10))
    wifi = db.Column(db.String(10))
    swimming_pool = db.Column(db.String(10))
    heated_pool = db.Column(db.String(10))
    washing_machine = db.Column(db.String(10))
    garden = db.Column(db.String(10))
    dvd = db.Column(db.String(10))
    grill = db.Column(db.String(10))
    fireplace = db.Column(db.String(10))
    cot = db.Column(db.String(10))
    dishwash = db.Column(db.String(10))
    microwave = db.Column(db.String(10))
    freezer = db.Column(db.String(10))
    game = db.Column(db.String(10))
    sea_view  = db.Column(db.String(10))
