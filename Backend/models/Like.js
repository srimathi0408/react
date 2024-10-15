const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
}, { timestamps: true });  // Add timestamps for createdAt and updatedAt

// Add a unique compound index to prevent duplicate likes
likeSchema.index({ userId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model('Like', likeSchema);
