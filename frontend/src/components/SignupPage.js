import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        setIsSubmitting(true);

        try {
            await axios.post('http://localhost:5000/api/signup', { email, password });
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert('Error signing up, please try again later');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Signup</h2>
            <div>
                <label>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Confirm Password:</label>
                <input 
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Signing up...' : 'Signup'}
            </button>
        </form>
    );
};

export default SignupPage;
