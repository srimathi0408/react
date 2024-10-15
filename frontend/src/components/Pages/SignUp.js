import React, { useState } from "react";
import axios from 'axios';
import './sign.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { username, email, password, confirmPassword };
    const validationErrors = validateForm(formData);
    
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:5000/api/signup', {
          username,
          email,
          password
        });
        console.log('Signup successful:', response.data);
        setSuccessMessage('Signup successful!');
        setErrors({});
        resetFormFields(); // Reset form fields
      } catch (error) {
        console.error('Signup failed:', error.response?.data?.message);
        setErrors({ server: error.response?.data?.message || 'Signup failed' });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (formData) => {
    const validationErrors = {};
    if (formData.username.trim() === '') {
      validationErrors.username = 'Username is required';
    }
    if (formData.email.trim() === '') {
      validationErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      validationErrors.email = 'Invalid email address';
    }
    if (formData.password.trim() === '') {
      validationErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      validationErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.confirmPassword.trim() === '') {
      validationErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }
    return validationErrors;
  };

  const resetFormFields = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1 className="signup-title">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username:</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="form-input"
            />
            {errors.username && <div className="error-message">{errors.username}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="form-input"
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="form-input"
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password" className="form-label">Confirm Password:</label>
            <input 
              type="password" 
              id="confirm-password" 
              name="confirm-password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              className="form-input"
            />
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>

          {errors.server && <div className="error-message">{errors.server}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}

          <input type="submit" value="Sign Up" className="submit-button" />
        </form>
      </div>
    </div>
  );
}

export default Signup;
