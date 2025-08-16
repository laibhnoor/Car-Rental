from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import db
from models.car import Car
from models.booking import Booking

bookings_bp = Blueprint('bookings', __name__)

# --- NEW: GET A USER'S BOOKINGS ---
@bookings_bp.route('', methods=['GET'])
@jwt_required()
def get_user_bookings():
    user_id = get_jwt_identity()
    
    # Query bookings and order by the most recent
    bookings = Booking.query.filter_by(user_id=user_id).order_by(Booking.booking_date.desc()).all()
    
    # Create a list of booking details, including nested car info
    result = []
    for booking in bookings:
        result.append({
            "id": booking.id,
            "rental_days": booking.rental_days,
            "total_price": booking.total_price,
            "booking_date": booking.booking_date.strftime("%Y-%m-%d %H:%M:%S"), # Format the date
            "car": {
                "name": booking.car.name,
                "image": booking.car.image 
            }
        })
        
    return jsonify(result), 200


# --- NEW: DELETE A BOOKING ---
@bookings_bp.route('/<int:booking_id>', methods=['DELETE'])
@jwt_required()
def delete_booking(booking_id):
    user_id = get_jwt_identity()
    
    booking = Booking.query.get(booking_id)

    # Check if the booking exists
    if not booking:
        return jsonify({"message": "Booking not found"}), 404

    # SECURITY: Check if the booking belongs to the user trying to delete it
    if str(booking.user_id) != user_id:
        return jsonify({"message": "Forbidden: You cannot delete this booking"}), 403

    db.session.delete(booking)
    db.session.commit()
    
    return jsonify({"message": "Booking deleted successfully"}), 200


# --- This route is still needed for the dashboard ---
@bookings_bp.route('/create', methods=['POST'])
@jwt_required()
def create_booking():
    # ... (no changes needed to your existing create_booking function)
    data = request.get_json()
    car_id = data.get('car_id')
    rental_days = data.get('rental_days')
    user_id = get_jwt_identity()

    if not car_id or not rental_days:
        return jsonify({"message": "Car ID and rental days are required"}), 400

    try:
        rental_days = int(rental_days)
        if rental_days <= 0:
            raise ValueError
    except (ValueError, TypeError):
        return jsonify({"message": "Rental days must be a positive number"}), 400

    car = Car.query.get(car_id)
    if not car:
        return jsonify({"message": "Car not found"}), 404

    total_price = car.price_per_day * rental_days

    new_booking = Booking(
        user_id=user_id,
        car_id=car_id,
        rental_days=rental_days,
        total_price=total_price
    )

    db.session.add(new_booking)
    db.session.commit()

    return jsonify({"message": "Booking created successfully!", "booking_id": new_booking.id}), 201