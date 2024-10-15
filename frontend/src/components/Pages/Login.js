import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate 
import'./login.css'// Import the CSS file

const Login = () => {
  const [email, setEmail] = useState(''); // Change username to email
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error messages
  const [successMessage, setSuccessMessage] = useState(''); // State for success messages

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email, // Use email instead of username
        password
      });
      console.log('Login successful:', response.data);
      setSuccessMessage('Login successful!'); // Update success message
      setError(''); // Clear error messages on successful login
      resetFormFields();

      // Redirect to home page after successful login
      navigate('/home'); // Change '/home' to your actual home route
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.error : 'Login failed, please try again.'); // Update error message
      setSuccessMessage(''); // Clear success messages on error
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password); // Call the login function with the input values
  };

  const resetFormFields = () => {
    setEmail(''); // Reset email field
    setPassword('');
  };

  return (
    <div className="login-container"> {/* New container for centering */}
      <div className="login-form"> {/* Existing form styling */}
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email:</label> {/* Change label to Email */}
            <input
              type="text"
              className="form-input"
              value={email} // Change username to email
              onChange={(e) => setEmail(e.target.value)} // Change username to email
              placeholder="Enter email" // Change placeholder to Email
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>} {/* Display error message */}
          {successMessage && <div className="success-message">{successMessage}</div>} {/* Display success message */}
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
