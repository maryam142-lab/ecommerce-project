import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // --- AUTH FUNCTIONS ---
  const login = (role = "user") => {
    setUser({ name: "John Doe", role });
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setWishlist([]);
  };

  // --- CART FUNCTIONS ---
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id, quantity) => {
    if (quantity <= 0) return removeFromCart(id);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // --- WISHLIST FUNCTIONS ---
  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.find((item) => item.id === product.id)) {
        return prevWishlist; // already in wishlist
      }
      return [...prevWishlist, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== id)
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
