import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext"; 

export default function Login() {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { login } = useContext(AuthContext); 

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://127.0.0.1:5000/auth/login", {
          email,
          password,
        });
  
        const { token, name } = response.data;
        
        // *** THIS IS THE KEY CHANGE ***
        // Use the context's login function to update global state
        login(token, name); 
        
        navigate("/dashboard"); // Redirect to a protected route
      } catch (error) {
        console.error("Login error:", error.response?.data?.message || "An error occurred");
        alert(error.response?.data?.message || "Login failed");
      }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-16">
          <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
              Login to CarRental
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
    
              <div>
                <label className="block mb-1 font-medium">Password</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
    
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>
    
            <p className="mt-4 text-sm text-center">
              Don’t have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Register
              </a>
            </p>
          </div>
        </div>
      );
}