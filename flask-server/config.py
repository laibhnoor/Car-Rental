import os

class Config:
    SECRET_KEY = "mysecretkey"
    JWT_SECRET_KEY = "jwtsecret"
    SQLALCHEMY_DATABASE_URI = "sqlite:///users.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
