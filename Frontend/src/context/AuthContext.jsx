import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and set authentication
      setIsAuthenticated(true);
      // Optionally fetch user details
      const decoded = jwtDecode(token);
      setUser({ uid: decoded.uid, uname: decoded.uname });
    }
  }, []);

  const login = (token, userDetails) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userDetails));
    setIsAuthenticated(true);
    setUser(userDetails);

    console.log(userDetails);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};