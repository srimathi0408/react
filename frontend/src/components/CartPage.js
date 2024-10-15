// src/components/CartPage.js
import React from 'react';
import { useCart } from './CartContext';

const CartPage = () => {
    const { cart, removeFromCart, incrementItem, decrementItem } = useCart(); // Access cart and functions from context

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    return (
        <div className="cart-page">
            <h1 className="cart-title">Your Cart</h1>
            {cart.length === 0 ? (
                <p className="cart-empty-message">Your cart is empty.</p>
            ) : (
                <div>
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3 className="cart-item-name">{item.name}</h3>
                                    <p className="cart-item-price">Price: ${item.price.toFixed(2)}</p>
                                </div>
                                <div className="cart-item-quantity">
                                    <button className="quantity-button" onClick={() => decrementItem(item.name)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button className="quantity-button" onClick={() => incrementItem(item.name)}>+</button>
                                </div>
                                <button className="remove-button" onClick={() => removeFromCart(item.name)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <h2 className="cart-total">Total: ${calculateTotal()}</h2>
                </div>
            )}
        </div>
    );
};

export default CartPage;
