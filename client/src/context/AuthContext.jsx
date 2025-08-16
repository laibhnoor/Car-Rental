import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
  // --- START OF CHANGES ---

  // Initialize all state from localStorage. This is the single source of truth.
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  
  // isLoggedIn is now derived directly from whether a token exists.
  // This simplifies logic and prevents state from getting out of sync.
  const [isLoggedIn, setIsLoggedIn] = useState(!!token); 
  
  // --- END OF CHANGES ---

  const navigate = useNavigate();

  // This effect runs whenever the token changes (e.g., during login or logout)
  useEffect(() => {
    // If a token exists, the user is logged in. Otherwise, they are not.
    setIsLoggedIn(!!token);
  }, [token]); // Dependency array ensures this runs only when the token state changes

  // Login function: updates localStorage AND component state
  const login = (newToken, name) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userName", name);
    setToken(newToken);      // Update the token in our state
    setUserName(name);
  };

  // Logout function: clears localStorage AND component state
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setToken(null);          // Clear the token from our state
    setUserName(null);
    navigate("/login"); 
  };
  
  // --- THE MOST IMPORTANT CHANGE IS HERE ---
  // We now include the 'token' in the value provided to all consuming components.
  const contextValue = {
    token, // <-- This makes the token available to your Dashboard
    isLoggedIn,
    userName,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the context so other components can use it
export default AuthContext;