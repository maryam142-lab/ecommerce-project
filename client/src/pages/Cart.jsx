import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useStore();
  const navigate = useNavigate();
  const total = cart.reduce((s, i) => s + (i.price * (i.quantity || 1)), 0);

  if (!cart || cart.length === 0) return (
    <div className="text-center mt-10">
      <h2 className="text-2xl">Your cart is empty</h2>
      <Link to="/shop" className="text-blue-600 underline mt-2 inline-block">Continue shopping</Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="space-y-4">
        {cart.map(item => (
          <div key={item.id} className="flex justify-between items-center border p-4 rounded">
            <div className="flex items-center gap-4">
              <img src={`/images/${item.image}`} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)} disabled={(item.quantity || 1) <= 1} className="px-2 py-1 bg-gray-200 rounded">-</button>
                  <span>{item.quantity || 1}</span>
                  <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="font-semibold">₹{((item.price) * (item.quantity || 1)).toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.id)} className="mt-2 bg-red-500 px-3 py-1 rounded text-white">Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <h3 className="text-xl font-bold">Total: ₹{total.toFixed(2)}</h3>
        <button onClick={() => navigate("/checkout")} className="mt-4 bg-green-600 text-white px-6 py-2 rounded">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
