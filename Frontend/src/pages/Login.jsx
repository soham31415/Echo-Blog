import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link

const Login = () => {
  const [uname, setUname] = useState('');
  const [upassword, setUpassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { uname, upassword });
      const { token } = response.data;
      localStorage.setItem('token', token); 
      navigate('/'); 
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Login to Echo Journal</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
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

        <button type="submit" className="login-button">Login</button>
      </form>

      <p className="register-link">
        Not registered? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
