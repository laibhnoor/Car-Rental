import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Section */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-4">CarRental</h1>
          <p className="text-gray-400">
            Rent your dream car at the best prices. Easy bookings, secure payments,
            and real-time availability. Your journey starts here.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/cars" className="hover:text-white transition">Cars</a></li>
            <li><a href="/bookings" className="hover:text-white transition">Bookings</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Contact Us</h2>
          <p className="text-gray-400">📍 123 Car St, Auto City, PK</p>
          <p className="text-gray-400">📞 +92 300 1234567</p>
          <p className="text-gray-400">📧 support@carrental.com</p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-pink-500 p-2 rounded-full hover:bg-pink-600 transition">
              <FaInstagram />
            </a>
            <a href="#" className="bg-sky-500 p-2 rounded-full hover:bg-sky-600 transition">
              <FaTwitter />
            </a>
            <a href="#" className="bg-blue-800 p-2 rounded-full hover:bg-blue-900 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} CarRental. All rights reserved.
      </div>
    </footer>
  );
}
