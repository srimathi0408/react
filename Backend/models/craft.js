const mongoose = require('mongoose');

const craftSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
});

const Craft = mongoose.model('craft', craftSchema);

module.exports = Craft;