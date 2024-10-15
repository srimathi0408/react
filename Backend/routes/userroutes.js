const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Ensure this path is correct
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Middleware to validate and sanitize input
const validateUser = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// Route for user login
router.post('/login', validateUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Store user session (ensure session middleware is configured)
        req.session.user = { id: user._id, email: user.email, role: user.role };

        res.status(200).json({ role: user.role });
    } catch (error) {
        console.error('Server error during login:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// Route for user signup
router.post('/signup', validateUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, role: 'normal' });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Server error during signup:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
