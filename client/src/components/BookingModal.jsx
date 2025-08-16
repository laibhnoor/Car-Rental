import React, { useState } from 'react';

export default function BookingModal({ car, onClose, onSubmit }) {
  const [rentalDays, setRentalDays] = useState(1);

  const handleDaysChange = (e) => {
    const days = e.target.value;
    // Allow empty input for user to clear it, but default to 1 for calculation
    setRentalDays(days);
  };

  // Calculate total price, ensuring we have valid numbers
  const totalPrice = car && rentalDays > 0 ? (car.price_per_day * rentalDays).toFixed(2) : '0.00';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rentalDays > 0) {
      onSubmit(rentalDays);
    } else {
      alert("Please enter a valid number of days.");
    }
  };

  if (!car) {
    return null;
  }

  return (
    // Backdrop
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Book: {car.name}</h2>
          <button onClick={onClose} className="text-2xl font-bold text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <p className="mb-4 text-lg">Price per day: <span className="font-semibold">${car.price_per_day.toFixed(2)}</span></p>
          
          <div className="mb-4">
            <label htmlFor="rentalDays" className="block mb-1 font-medium">Rental Days</label>
            <input
              id="rentalDays"
              type="number"
              min="1"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              value={rentalDays}
              onChange={handleDaysChange}
              required
            />
          </div>
          
          <div className="my-6 text-center">
            <p className="text-xl">Total Price</p>
            <p className="text-3xl font-bold text-blue-600">${totalPrice}</p>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}