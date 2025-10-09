import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // make sure to import styles

const Checkout = () => {
  const { cart, clearCart } = useStore();
  const [form, setForm] = useState({ name: "", address: "", payment: "cod" });

  const total = cart.reduce((s, i) => s + (i.price * (i.quantity || 1)), 0);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCheckout = () => {
    if (!form.name.trim() || !form.address.trim()) {
      toast.error("❌ Please fill in name and address.");
      return;
    }

    toast.success(
      `✅ Order placed successfully!\nTotal: ₹${total.toFixed(
        2
      )}\nPayment: ${form.payment.toUpperCase()}`,
      {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );

    clearCart();
    setForm({ name: "", address: "", payment: "cod" });
  };

  if (!cart || cart.length === 0)
    return <div className="text-center mt-10">Your cart is empty.</div>;

  return (
    <div className="max-w-md mx-auto p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Full name"
        className="w-full p-2 border mb-3 rounded"
      />
      <textarea
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Address"
        className="w-full p-2 border mb-3 rounded"
      />
      <select
        name="payment"
        value={form.payment}
        onChange={handleChange}
        className="w-full p-2 border mb-3 rounded"
      >
        <option value="cod">Cash on Delivery</option>
        <option value="card">Card</option>
        <option value="paypal">PayPal</option>
      </select>

      <div className="text-lg font-semibold mb-4">
        Total: ₹{total.toFixed(2)}
      </div>
      <button
        onClick={handleCheckout}
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
