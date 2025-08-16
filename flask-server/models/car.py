from .user import db

class Car(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(255), nullable=False)
    transmission = db.Column(db.String(50), nullable=False)
    fuel_type = db.Column(db.String(50), nullable=False)
    seats = db.Column(db.Integer, nullable=False)
    price_per_day = db.Column(db.Float, nullable=False)

    def to_dict(self):
        """Converts the Car object to a dictionary."""
        return {
            'id': self.id,
            'name': self.name,
            'image': self.image,
            'transmission': self.transmission,
            'fuel_type': self.fuel_type,
            'seats': self.seats,
            'price_per_day': self.price_per_day

        }