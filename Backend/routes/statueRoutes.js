const express = require('express');
const router = express.Router();
const Statue = require('../models/Statue');

// Route to get all statues and sculptures
router.get('/statues', async (req, res) => {
  try {
    const statues = await Statue.find(); // Fetch all statues from the database
    res.json(statues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new statue (optional, if you want to add creation functionality)
router.post('/statues', async (req, res) => {
  const { name, imageUrl, description } = req.body;
  
  const statue = new Statue({
    name,
    imageUrl,
    description
  });

  try {
    const newStatue = await statue.save();
    res.status(201).json(newStatue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
