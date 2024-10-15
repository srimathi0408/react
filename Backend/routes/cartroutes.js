const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

// Add item to cart
router.post('/', async (req, res) => {
    const { userId, productId, quantity } = req.body;

    // Validate input
    if (!userId || !productId || quantity <= 0) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    try {
        let cart = await Cart.findOne({ userId });
        if (cart) {
            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
            await cart.save();
        } else {
            const newCart = new Cart({ userId, products: [{ productId, quantity }] });
            await newCart.save();
        }
        res.status(200).json({ message: 'Item added to cart' });
    } catch (error) {
        console.error('Failed to add item to cart:', error); // Log detailed error for debugging
        res.status(500).json({ message: 'Failed to add item to cart' });
    }
});

// Get cart items
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    // Validate userId
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const cart = await Cart.findOne({ userId }).populate('products.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error('Failed to fetch cart items:', error); // Log detailed error for debugging
        res.status(500).json({ message: 'Failed to fetch cart items' });
    }
});

module.exports = router;
