const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Make sure you import your User model

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        
        // Check if user exists and password matches
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Return user role on successful login
        return res.status(200).json({ role: user.role });

    } catch (error) {
        // Log any errors and return server error response
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
