import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useCart } from './CartContext'; // Use the useCart hook

function TypesOfHandicrafts() {
    const [favorites, setFavorites] = useState([]);
    const [message, setMessage] = useState(''); // State for message
    const { addToCart } = useCart(); // Access addToCart from useCart

    const buyNow = (productName) => {
        alert(`You are buying ${productName} now!`);
    };

    const toggleFavorite = (productName) => {
        setFavorites((prevFavorites) =>
            prevFavorites.includes(productName)
                ? prevFavorites.filter((fav) => fav !== productName)
                : [...prevFavorites, productName]
        );
    };

    // Sample product data
    const products = [
        { name: 'APPLE DESIGN', image: 'https://i.pinimg.com/736x/1b/0b/2a/1b0b2a53699cf85b44b000aba5d87817.jpg', price: 450 },
        { name: 'CORAL DESIGN', image: 'https://feelfreestuff.wordpress.com/wp-content/uploads/2021/05/h3-1.jpg?w=600&h=900', price: 550 },
        { name: 'GEOMETRIC DESIGN', image: 'https://i.pinimg.com/736x/62/c7/df/62c7dfc028a2ee861678819021d923c2.jpg', price: 350 },
        { name: 'NATURE DESIGN', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ9hKX6WEyyGyxJdBx8KjcU2qsCM_xepnZeIHR4yyONPIRo1eX6O9eysd6kYAO-GKU0UY&usqp=CAU', price: 250 },
        { name: 'WATCH DESIGN', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMZs7OPBXFJ5ZXQ5-jOKcRQQV4MkhNO1HHW8vAjV2gtCyv4Ih4AaPCJXFns7KQzJT8WsY&usqp=CAU', price: 150 },
    ];

    const handleAddToCart = (product) => {
        addToCart(product);
        setMessage(`${product.name} added to cart`); // Set message
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    };

    return (
        <div className="category-page">
            <h2 className="page-title">Types of Handicrafts</h2>
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

export default TypesOfHandicrafts;
