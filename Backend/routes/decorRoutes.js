const express = require('express');
const router = express.Router();
const Decor = require('../models/Decor'); // Correct model name

// Route to get all decors
router.get('/decor', async (req, res) => {
  try {
    const decors = await Decor.find(); // Use the Decor model to fetch all decor items
    res.json(decors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
