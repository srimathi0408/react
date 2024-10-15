// src/CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.name === product.name);
            if (existingProduct) {
                // If the product already exists, increase its quantity
                return prevCart.map(item =>
                    item.name === product.name
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            // If it's a new product, add it with quantity 1
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productName) => {
        setCart((prevCart) => prevCart.filter(item => item.name !== productName));
    };

    const incrementItem = (productName) => {
        setCart((prevCart) => 
            prevCart.map(item =>
                item.name === productName 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
            )
        );
    };

    const decrementItem = (productName) => {
        setCart((prevCart) => 
            prevCart.map(item =>
                item.name === productName && item.quantity > 1 
                    ? { ...item, quantity: item.quantity - 1 } 
                    : item
            )
        );
    };

    const value = { cart, addToCart, removeFromCart, incrementItem, decrementItem };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    return useContext(CartContext);
};
