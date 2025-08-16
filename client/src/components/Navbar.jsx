import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from '../context/AuthContext'; 

export default function Navbar() {
  // Simulated login state
  const { isLoggedIn, userName, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          CarRental
        </Link>

        {/* Links */}
        <div className="space-x-6 hidden md:flex">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="text-blue-600 font-medium hover:text-blue-800">
                Login
              </Link>
              <Link to="/register" className="text-blue-600 font-medium hover:text-blue-800">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-blue-600 font-medium hover:text-blue-800">
                Dashboard
              </Link>
              <Link to="/bookings" className="text-blue-600 font-medium hover:text-blue-800">
                Bookings
              </Link>
              <button
                onClick={logout}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile menu (optional) */}
        {/* Add hamburger menu here if you want mobile menu */}
      </div>
    </nav>
  );
}
