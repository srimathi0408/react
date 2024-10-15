const express = require('express');
const Like = require('../models/Like');
const router = express.Router();

// Add or remove like
router.post('/', async (req, res) => {
    const { userId, productId } = req.body;

    // Validate input
    if (!userId || !productId) {
        return res.status(400).json({ message: 'User ID and Product ID are required' });
    }

    try {
        const existingLike = await Like.findOne({ userId, productId });
        if (existingLike) {
            // If the like already exists, remove it
            await Like.deleteOne({ _id: existingLike._id });
            res.status(200).json({ message: 'Like removed' });
        } else {
            // If the like does not exist, create a new one
            const newLike = new Like({ userId, productId });
            await newLike.save();
            res.status(201).json({ message: 'Product liked' });
        }
    } catch (error) {
        console.error('Failed to like/unlike product:', error); // Log detailed error for debugging
        res.status(500).json({ message: 'Failed to like/unlike product' });
    }
});

// Get user likes
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    // Validate userId
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        // Find all likes for the given user
        const likes = await Like.find({ userId }).populate('productId');
        if (!likes.length) {
            return res.status(404).json({ message: 'No likes found for this user' });
        }
        res.status(200).json(likes);
    } catch (error) {
        console.error('Failed to fetch likes:', error); // Log detailed error for debugging
        res.status(500).json({ message: 'Failed to fetch likes' });
    }
});

module.exports = router;
