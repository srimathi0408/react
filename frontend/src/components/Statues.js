import React, { useEffect, useState } from 'react';
import './StatuesAndSculptures.css';

function TypesOfHandicrafts() {
  const [crafts, setCrafts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/statues')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the data to check if it's being fetched
        setCrafts(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAddToCart = (craft) => {
    console.log('Added to cart:', craft.name);
    // Implement logic to add product to the cart
  };

  const handleBuyNow = (craft) => {
    console.log('Buying now:', craft.name);
    // Implement logic to proceed with purchase
  };

  return (
    <div className="category-page">
      <h2 className="page-title">Statues and Sculptures</h2>
      <div className="product-grid">
        {crafts.map((craft, index) => (
          <div className="product-card" key={index}>
            <img
              src={craft.imageUrl}
              alt={craft.name}
              className="product-image"
            />
            <h3 className="product-name">{craft.name}</h3>
            <div className="button-group">
              <button 
                className="cart-button" 
                onClick={() => handleAddToCart(craft)}
              >
                Add to Cart
              </button>
              <button 
                className="buy-button" 
                onClick={() => handleBuyNow(craft)}
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
