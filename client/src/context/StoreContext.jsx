import React, { createContext, useContext, useEffect, useState } from "react";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cart")) || []; } catch { return []; }
  });
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem("wishlist")) || []; } catch { return []; }
  });

  // Persist to localStorage
  useEffect(() => { localStorage.setItem("user", JSON.stringify(user)); }, [user]);
  useEffect(() => { if (token) localStorage.setItem("token", token); else localStorage.removeItem("token"); }, [token]);
  useEffect(() => { localStorage.setItem("cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("wishlist", JSON.stringify(wishlist)); }, [wishlist]);

  // Auth
  const login = (userObj, tokenValue) => {
    setUser(userObj);
    if (tokenValue) setToken(tokenValue);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCart([]);
    setWishlist([]);
  };

  // Cart
  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: (p.quantity || 1) + qty } : p);
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const updateQuantity = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(p => p.id === id ? { ...p, quantity: qty } : p));
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(p => p.id !== id));
  const clearCart = () => setCart([]);

  // Wishlist
  const addToWishlist = (product) => {
    setWishlist(prev => {
      if (prev.some(p => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => setWishlist(prev => prev.filter(p => p.id !== id));

  return (
    <StoreContext.Provider value={{
      user, token, login, logout,
      cart, addToCart, updateQuantity, removeFromCart, clearCart,
      wishlist, addToWishlist, removeFromWishlist
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
