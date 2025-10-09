import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import { useStore } from "../context/StoreContext";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id, 10));
  const navigate = useNavigate();
  const { addToCart, addToWishlist } = useStore();

  if (!product) return <div className="p-8 text-center">Product not found</div>;

  return (
    <div className="p-8 flex flex-col md:flex-row gap-8">
      <img src={`/images/${product.image}`} alt={product.name} className="w-full md:w-1/2 h-96 object-cover rounded" />
      <div className="md:flex-1">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="mt-2 text-gray-600">₹{product.price}</p>
        <p className="mt-4">{product.description}</p>
        <div className="mt-6 flex gap-3">
          <button onClick={() => { addToCart(product); navigate("/cart"); }} className="px-4 py-2 bg-green-600 text-white rounded">Add to Cart</button>
          <button onClick={() => addToWishlist(product)} className="px-4 py-2 bg-pink-500 text-white rounded">Wishlist</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
