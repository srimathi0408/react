const express = require('express');
const router = express.Router();
const Craft = require('../models/craft');

// Route to get all crafts
router.get('/crafts', async (req, res) => {
  try {
    const crafts = await Craft.find();
    res.json(crafts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;