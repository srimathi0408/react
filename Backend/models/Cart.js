const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ 
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { 
            type: Number, 
            required: true,
            min: [1, 'Quantity cannot be less than 1']  // Constraint to ensure quantity is at least 1
        }
    }]
}, { timestamps: true });  // Add timestamps for createdAt and updatedAt

module.exports = mongoose.model('Cart', cartSchema);
