from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models.user import db
from routes.auth import auth_bp

from models.car import Car
from routes.cars import cars_bp

from models.booking import Booking
from routes.bookings import bookings_bp

app = Flask(__name__)

# Config
app.config["SECRET_KEY"] = "mysecretkey"
app.config["JWT_SECRET_KEY"] = "jwtsecret"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///rental_database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
CORS(app, origins=["http://localhost:5173"])  # Vite default port

# Init extensions
JWTManager(app)
db.init_app(app)

def add_initial_cars():
    if Car.query.count() == 0:
        cars_to_add = [
            # Use public folder paths - these will be served by Vite
            Car(name="Toyota Camry", image="/images/toyota.jpg", transmission="Automatic", fuel_type="Gasoline", seats=5, price_per_day=55.0),
            Car(name="Honda Civic", image="/images/honda.jpg", transmission="Automatic", fuel_type="Gasoline", seats=5, price_per_day=50.0),
            Car(name="Ford Mustang", image="/images/fordmustang.jpg", transmission="Manual", fuel_type="Gasoline", seats=4, price_per_day=75.0),
            Car(name="Tesla Model 3", image="/images/teslamodel3.jpg", transmission="Automatic", fuel_type="Electric", seats=5, price_per_day=90.0),
            Car(name="Jeep Wrangler", image="/images/jeepwrangler3.jpg", transmission="Automatic", fuel_type="Gasoline", seats=4, price_per_day=80.0),
            Car(name="BMW 3 Series", image="/images/bmw3seris.jpg", transmission="Automatic", fuel_type="Gasoline", seats=5, price_per_day=85.0)
        ]
        db.session.bulk_save_objects(cars_to_add)
        db.session.commit()
        print("Added initial cars to the database.")

@app.route("/")
def home():
    return {"message": "Flask backend is running!"}

# Create DB tables
with app.app_context():
    db.create_all()
    add_initial_cars()

# Register routes
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(cars_bp, url_prefix="/api/cars")
app.register_blueprint(bookings_bp, url_prefix="/api/bookings")

if __name__ == "__main__":
    app.run(debug=True)
