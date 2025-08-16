import React from "react";
import { Link } from "react-router-dom";
import { FaCar, FaHeadset, FaShieldAlt } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="bg-blue-600 text-white pt-24 pb-16">
      <div className="container mx-auto px-4 text-center">
        {/* Headline */}
        <h1 className="text-5xl font-bold mb-4">Drive Your Dreams</h1>
        <p className="text-lg text-blue-100 mb-8">
          Affordable. Reliable. Ready when you are.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center space-x-4 mb-12">
          <Link
            to="/register"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Register Now
          </Link>
          <Link
            to="/login"
            className="bg-transparent border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
          >
            Login
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {/* Card 1 */}
          <div className="bg-white text-blue-600 p-6 rounded-lg shadow-lg flex flex-col items-center hover:scale-105 transition">
            <FaCar className="text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Reliable Cars</h3>
            <p className="text-center text-gray-600">
              Well-maintained, top-quality vehicles for every journey.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white text-blue-600 p-6 rounded-lg shadow-lg flex flex-col items-center hover:scale-105 transition">
            <FaHeadset className="text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
            <p className="text-center text-gray-600">
              Always here to assist you, anytime and anywhere.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white text-blue-600 p-6 rounded-lg shadow-lg flex flex-col items-center hover:scale-105 transition">
            <FaShieldAlt className="text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">100% Trusted</h3>
            <p className="text-center text-gray-600">
              Thousands of happy customers trust us every day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
