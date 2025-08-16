from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.user import User, db

auth_bp = Blueprint("auth", __name__)

# REGISTER
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"message": "All fields are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "User already exists"}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password,name=name)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


# LOGIN
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        # FIX: identity must be a string
        token = create_access_token(identity=str(user.id))
        return jsonify({"token": token, "name": user.name}), 200

    return jsonify({"message": "Invalid credentials"}), 401


# CHECK AUTH (Protected Route)
@auth_bp.route("/check-auth", methods=["GET"])
@jwt_required()
def check_auth():
    # Convert identity back to int for DB lookup
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    if user:
        return jsonify({"message": "Authenticated", "name": user.name}), 200
    return jsonify({"message": "User not found"}), 404
