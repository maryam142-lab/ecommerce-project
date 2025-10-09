import React, { createContext, useState } from "react";

export const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Add to Cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remove from Cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Add to Wishlist
  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.some((item) => item.id === product.id)) {
        return prevWishlist;
      }
      return [...prevWishlist, product];
    });
  };

  // Remove from Wishlist
  const removeFromWishlist = (id) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
  };

  return (
    <ShopContext.Provider
      value={{ cart, addToCart, removeFromCart, wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </ShopContext.Provider>
  );
}
