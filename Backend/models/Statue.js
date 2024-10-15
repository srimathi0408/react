const mongoose = require('mongoose');

// Define the schema for Statues and Sculptures
const statueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

// Create the model based on the schema
const Statue = mongoose.model('Statue', statueSchema);

module.exports = Statue;
