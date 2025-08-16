from .user import db
from datetime import datetime

class Booking(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    car_id = db.Column(db.Integer, db.ForeignKey('car.id'), nullable=False)
    rental_days = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    booking_date = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships to easily access user and car objects from a booking
    user = db.relationship('User', backref=db.backref('bookings', lazy=True))
    car = db.relationship('Car', backref=db.backref('bookings', lazy=True))