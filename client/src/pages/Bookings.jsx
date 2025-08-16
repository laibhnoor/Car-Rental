import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  // Fetch bookings when the component mounts
  useEffect(() => {
    const fetchBookings = async () => {
      if (!token) {
        setLoading(false);
        setError("You must be logged in to view your bookings.");
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:5000/api/bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(response.data);
      } catch (err) {
        setError('Failed to fetch bookings. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]); // Re-run if the token changes

  // Handle the delete action
  const handleDelete = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
        return;
    }

    try {
      await axios.delete(`http://127.0.0.1:5000/api/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove the booking from the state to update the UI instantly
      setBookings(currentBookings => currentBookings.filter(b => b.id !== bookingId));
    } catch (err) {
      alert("Failed to delete booking.");
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center pt-32">Loading your bookings...</div>;
  }

  if (error) {
    return <div className="text-center pt-32 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">You have no bookings yet.</p>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booked On</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{booking.car.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{booking.rental_days} days</td>
                    <td className="px-6 py-4 whitespace-nowrap">${booking.total_price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(booking.booking_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(booking.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}