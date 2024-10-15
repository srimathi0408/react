const mongoose = require('mongoose');

// Define the schema for Decor
const decorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Ensures the name is required
  },
  imageUrl: {
    type: String,
    required: true, // Ensures the image URL is required
  },
});

// Create the model for Decor based on the schema
const Decor = mongoose.model('Decor', decorSchema);

// Export the Decor model
module.exports = Decor;
