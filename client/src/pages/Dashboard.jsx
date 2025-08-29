// Dashboard.jsx

// --- Imports: Add BookingModal and update others ---
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import BookingModal from "../components/BookingModal"; // <-- Import the modal

// Create a mapping of car names to images
const carImages = {
  'Toyota Camry': '/images/toyota.jpg',
  'Honda Civic': '/images/honda.jpg',
  'Ford Mustang': '/images/fordmustang.jpg',
  'Tesla Model 3': '/images/teslamodel3.jpg',
  'Jeep Wrangler': '/images/jeepwrangler.jpg',
  'BMW 3 Series': '/images/bmw3seris.jpg',
};


// --- CarCard component: Add onBookNow prop ---
function CarCard({ car, onBookNow }) { // <-- Add onBookNow prop
 
 // Get the image from the mapping, fallback to placeholder
 const imageUrl = carImages[car.name] || placeholderImg;
 
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <img src={imageUrl} alt={car.name} className="w-full h-48 object-cover" 
      onError={(e) => { e.target.src = placeholderImg; }}/>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{car.name}</h3>
        <div className="text-gray-600 text-sm mb-4">
          <p><span className="font-semibold">Transmission:</span> {car.transmission}</p>
          <p><span className="font-semibold">Fuel:</span> {car.fuel_type}</p>
          <p><span className="font-semibold">Seats:</span> {car.seats}</p>
        </div>
        {/* --- Button: Attach the onClick handler --- */}
        <button
          onClick={() => onBookNow(car)} // <-- Call the passed function
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

// --- Dashboard component: Add state and handlers ---
export default function Dashboard() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { userName, token } = useContext(AuthContext); // <-- Get token from context

  // --- NEW: State for managing the booking modal ---
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/cars");
        setCars(response.data);
        setFilteredCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    const results = cars.filter(car =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCars(results);
  }, [searchTerm, cars]);

  // --- NEW: Function to handle the booking submission ---
  const handleBookingSubmit = async (rentalDays) => {
    if (!token) {
      alert("You must be logged in to make a booking.");
      return;
    }
    if (!selectedCar) {
      alert("No car selected.");
      return;
    }

    try {
      await axios.post(
        'http://127.0.0.1:5000/api/bookings/create',
        {
          car_id: selectedCar.id,
          rental_days: rentalDays,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(`Booking for ${selectedCar.name} successful!`);
      setSelectedCar(null); // Close the modal on success
    } catch (error) {
      console.error("Failed to create booking:", error);
      alert("Failed to create booking. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-4">Welcome, {userName || 'Guest'}!</h1>
        <h2 className="text-2xl font-semibold text-center mb-8">Find your perfect ride</h2>

        {/* Search Bar */}
        <div className="mb-8 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search for a car..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCars.map(car => (
            <CarCard
              key={car.id}
              car={car}
              onBookNow={() => setSelectedCar(car)} // <-- Pass handler to open modal
            />
          ))}
        </div>
      </div>

      {/* --- NEW: Conditionally render the Booking Modal --- */}
      {selectedCar && (
        <BookingModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)} // <-- Pass handler to close modal
          onSubmit={handleBookingSubmit}      // <-- Pass handler for submission
        />
      )}
    </div>
  );
}
