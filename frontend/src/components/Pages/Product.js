import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa'; // Import the heart icon

function ProductPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]); // Track favorite products

  // Initial products
  const products = [
    {
      id: 1,
      name: 'Handmade Vase',
      image: 'https://asset.bloomnation.com/c_pad,d_vendor:global:catalog:product:image.png,f_auto,fl_preserve_transparency,q_auto/v1715293710/vendor/3823/catalog/product/2/0/20240415105121_file_661daf69d13e1_661dafd09a73c.jpeg',
      price: 25.99
    },
    {
      id: 2,
      name: 'Knitted Scarf',
      image: 'https://imagedelivery.net/0ObHXyjKhN5YJrtuYFSvjQ/i-fdc17949-8f64-4478-8717-56bf0c89b6a1-Hand-Knit-Scarf-Mauve--ACrookedSixpence/display',
      price: 19.99
    },
    {
      id: 3,
      name: 'Wooden Jewelry Box',
      image: 'https://5.imimg.com/data5/UH/LF/MY-18985/antique-wooden-jewelry-box.jpg',
      price: 35.50
    },
    {
      id: 4,
      name: 'Ceramic Coffee Mug',
      image: 'https://m.media-amazon.com/images/I/51bau0GfKVL._AC_UF350,350_QL80_.jpg',
      price: 15.00
    },
    {
      id: 5,
      name: 'Handcrafted Candle',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMVnYbbEElCrEvgR8VFaimex94OvQrmIeiyw&s',
      price: 12.99
    },
    {
      id: 6,
      name: 'Macrame Wall Hanging',
      image: 'https://m.media-amazon.com/images/I/71nWyZCLVgL._AC_UF350,350_QL80_.jpg',
      price: 45.00
    },
    {
      id: 7,
      name: 'Bamboo Cutting Board',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh-zBQLV7WPM0beMbKuWP-MKhUkgC9ev1asUvo3zi3Qd7qnlvQOKJjm4rHo8lXf_Ww7Jc&usqp=CAU',
      price: 22.99
    },
    {
      id: 8,
      name: 'Handmade Soap Bar',
      image: 'https://satopradhan.com/cdn/shop/files/Preview-1Almond_SheaSoap.jpg?v=1713608647',
      price: 7.99
    }
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    alert(`${product.name} has been added to your cart!`);
  };

  const buyNow = (product) => {
    alert(`You are buying ${product.name} now!`);
  };

  const toggleFavorite = (product) => {
    if (favorites.includes(product.id)) {
      setFavorites(favorites.filter((favId) => favId !== product.id));
    } else {
      setFavorites([...favorites, product.id]);
    }
  };

  return (
    <div className="product-page">
      <h2 className="page-title">Our Products</h2>
      <input
        type="text"
        placeholder ="Search products..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="heart-icon" onClick={() => toggleFavorite(product)}>
              <FaHeart
                color={favorites.includes(product.id) ? 'red' : 'grey'}
                size={24}
              />
            </div>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <div className="button-container">
              <button className="add-to-cart-button" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
              <button className="buy-now-button" onClick={() => buyNow(product)}>
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;