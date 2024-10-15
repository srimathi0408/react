import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useCart } from './CartContext'; // Ensure you have this hook for cart functionality

function HomeDecor() {
    const [favorites, setFavorites] = useState([]);
    const [message, setMessage] = useState(''); // State for message
    const { addToCart } = useCart(); // Access addToCart from useCart

    // Sample product data for Home Decor
    const products = [
        { name: 'Wall Art', image: 'https://images.woodenstreet.de/image/cache/data%2Fhome-decors%2Fwall-arts%2Fframed-wall-painting%2Fradha-krishna-colourful-mdf-wall-art-panel-set-of-5%2Fupdated%2F1-750x650.jpg', price: 120 },
        { name: 'Table Decor', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJEP37M4-6NXksmdMu98wFpqSx2D2UzbUgZg&s', price: 80 },
        { name: 'Cushion Covers', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJRaW9TW5DgRKC55pW_Ni9pmUNA-5yEUrdsuuNLzIMhoHKI4Ej48A1Gma6hp8BpgVb_Gs&usqp=CAU', price: 30 },
        { name: 'Vases', image: 'https://www.inweder.com/wp-content/uploads/2023/05/decorate-flower-cylinder-glass-vases-with-ribbon.png', price: 50 },
    ];

    const handleAddToCart = (product) => {
        addToCart(product);
        setMessage(`${product.name} added to cart`); // Set message
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    };

    const toggleFavorite = (productName) => {
        setFavorites((prevFavorites) =>
            prevFavorites.includes(productName)
                ? prevFavorites.filter((fav) => fav !== productName)
                : [...prevFavorites, productName]
        );
    };

    const buyNow = (productName) => {
        alert(`You are buying ${productName} now!`);
    };

    return (
        <div className="category-page">
            <h2 className="page-title">Home Decor</h2>
            {message && <div className="cart-message">{message}</div>} {/* Display message */}
            <div className="product-grid">
                {products.map((product, index) => (
                    <div key={index} className="product-card">
                        <div className="heart-icon" onClick={() => toggleFavorite(product.name)}>
                            <FaHeart
                                color={favorites.includes(product.name) ? 'red' : 'grey'}
                                size={24}
                            />
                        </div>
                        <img
                            src={product.image}
                            alt={product.name}
                            className="product-image"
                        />
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-price">Price: ${product.price.toFixed(2)}</p>
                        <div className="button-container">
                            <button
                                className="add-to-cart-button"
                                onClick={() => handleAddToCart({ name: product.name, image: product.image, price: product.price })}
                                aria-label={`Add ${product.name} to cart`}
                            >
                                Add to Cart
                            </button>
                            <button
                                className="buy-now-button"
                                onClick={() => buyNow(product.name)}
                                aria-label={`Buy ${product.name} now`}
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomeDecor;
