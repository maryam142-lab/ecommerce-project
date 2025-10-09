import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

function Navbar() {
  const { cart, wishlist, user, logout } = useStore();

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold">🛍️ MyShop</Link>

      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-yellow-400">Home</Link>
        <Link to="/shop" className="hover:text-yellow-400">Shop</Link>
        <Link to="/cart" className="hover:text-yellow-400">Cart ({cart.length})</Link>
        <Link to="/wishlist" className="hover:text-yellow-400">Wishlist ({wishlist.length})</Link>

        {user ? (
          <>
            <Link to="/profile" className="hover:text-yellow-400">Profile</Link>
            {user.role === "admin" && <Link to="/admin" className="hover:text-yellow-400">Admin</Link>}
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-yellow-400">Login</Link>
            <Link to="/register" className="hover:text-yellow-400">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
