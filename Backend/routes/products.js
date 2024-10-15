const express = require('express');
const router = express.Router();
const Handicraft = require('../models/craft');
const HomeDecor = require('../models/Decor');
const Statue = require('../models/Statue');

// Route to add a product
router.post('/add', async (req, res) => {
  const { name, price, description, image, category } = req.body;

  try {
    let product;
    if (category === 'handicraft') {
      product = new Handicraft({ name, image, price, description });
    } else if (category === 'home-decor') {
      product = new HomeDecor({ name, image, price, description });
    } else if (category === 'statue') {
      product = new Statue({ name, image, price, description });
    } else {
      return res.status(400).json({ message: 'Invalid category' });
    }

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
