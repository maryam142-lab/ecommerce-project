import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useStore();
  if (!wishlist || wishlist.length === 0) return (
    <div className="text-center mt-10">
      <h2 className="text-2xl">Your wishlist is empty</h2>
      <Link to="/shop" className="text-blue-600 underline mt-2 inline-block">Shop</Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
      <div className="space-y-4">
        {wishlist.map(item => (
          <div key={item.id} className="flex justify-between items-center border p-4 rounded">
            <div className="flex items-center gap-4">
              <img src={`/images/${item.image}`} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { addToCart(item); removeFromWishlist(item.id); }} className="bg-green-600 text-white px-3 py-1 rounded">Move to Cart</button>
              <button onClick={() => removeFromWishlist(item.id)} className="bg-red-500 text-white px-3 py-1 rounded">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
