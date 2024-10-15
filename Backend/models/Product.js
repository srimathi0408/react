const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true,
        min: [0, 'Price must be a positive number'] // Ensure price is positive
    },
    description: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String,
        validate: {
            validator: function(v) {
                return /^(http|https):\/\/.*\.(jpg|jpeg|png|gif)$/.test(v); // Simple URL validation for image
            },
            message: props => `${props.value} is not a valid image URL!`
        }
    }
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

module.exports = mongoose.model('Product', productSchema);
