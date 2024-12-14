import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [uname, setUname] = useState('');
  const [upassword, setUpassword] = useState('');
  const [uemail, setUemail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // 📘 API call logic goes here (replace the URL with your backend endpoint)
      const response = await axios.post('http://localhost:5000/register', { uname, upassword, uemail });
      
      // 📘 Handle response from API (e.g., success message, token, etc.)
      setSuccessMessage('Registration successful! You can now log in.');
      
      // 📘 Optional: Redirect to login page after successful registration
      setTimeout(() => navigate('/login'), 3000); // Wait for 3 seconds before redirecting
    } catch (err) {
      // 📘 Handle API errors (e.g., user already exists, validation errors, etc.)
      if (err.response) {
        setError(err.response.data.error);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="register-container">
      <h1>Register for Echo Journal</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="uname">Username</label>
          <input 
            type="text" 
            id="uname" 
            value={uname} 
            onChange={(e) => setUname(e.target.value)} 
            placeholder="Enter your username" 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="uemail">Email</label>
          <input 
            type="email" 
            id="uemail" 
            value={uemail} 
            onChange={(e) => setUemail(e.target.value)} 
            placeholder="Enter your email ID" 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={upassword} 
            onChange={(e) => setUpassword(e.target.value)} 
            placeholder="Enter your password" 
            required 
          />
        </div>

        <button type="submit" className="register-button">Register</button>
      </form>

      <p className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
