import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, cart } = useContext(AuthContext);

  const inCart = cart.find((item) => item.id === product.id);

  return (
    <div className="border p-4 rounded shadow">
      <img src={`/images/${product.image}`} alt={product.name} className="w-full h-40 object-cover" />
      <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>

      <div className="mt-3 flex gap-2">
        {inCart ? (
          <Link
            to="/cart"
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            View in Cart
          </Link>
        ) : (
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add to Cart
          </button>
        )}

        <button
          onClick={() => addToWishlist(product)}
          className="bg-pink-500 text-white px-3 py-1 rounded"
        >
          Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
