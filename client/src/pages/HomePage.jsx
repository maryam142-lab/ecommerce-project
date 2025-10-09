import React from "react";
import { Link } from "react-router-dom";
import products from "../data/products";

const HomePage = () => {
  const featured = products.slice(0, 3);

  return (
    <div>
      <section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-20">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Store</h1>
        <p className="text-lg mb-6">Discover the latest fashion & accessories</p>
        <Link to="/shop" className="px-6 py-3 bg-white text-purple-600 font-semibold rounded shadow hover:bg-gray-200">Shop Now</Link>
      </section>

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Featured Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map(p => (
            <div key={p.id} className="border rounded-lg shadow p-4 flex flex-col items-center">
              <img src={`/images/${p.image}`} alt={p.name} className="w-64 h-64 object-cover rounded-lg mb-4" />
              <h2 className="text-xl font-semibold">{p.name}</h2>
              <p className="text-gray-600">₹{p.price}</p>
              <Link to={`/product/${p.id}`} className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">View Details</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
