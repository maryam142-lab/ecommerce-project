import React, { useState } from "react";
import { Link } from "react-router-dom";
import productsList from "../data/products";

const Shop = () => {
  const [sortOption, setSortOption] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  let filtered = productsList;
  if (filterCategory !== "All") filtered = filtered.filter(p => p.category === filterCategory);

  if (sortOption === "low-to-high") filtered = [...filtered].sort((a,b)=>a.price-b.price);
  if (sortOption === "high-to-low") filtered = [...filtered].sort((a,b)=>b.price-a.price);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.max(1, Math.ceil(filtered.length / productsPerPage));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shop</h1>

      <div className="flex gap-4 mb-6">
        <select value={sortOption} onChange={(e)=>setSortOption(e.target.value)} className="border p-2 rounded">
          <option value="">Sort by</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>

        <select value={filterCategory} onChange={(e)=>setFilterCategory(e.target.value)} className="border p-2 rounded">
          <option value="All">All</option>
          <option value="Clothing">Clothing</option>
          <option value="Footwear">Footwear</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentProducts.map(product => (
          <div key={product.id} className="border rounded p-4 flex flex-col items-center">
            <img src={`/images/${product.image}`} alt={product.name} className="w-full h-44 object-cover rounded mb-2" />
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-gray-600">₹{product.price}</p>
            <Link to={`/product/${product.id}`} className="mt-2 px-3 py-1 bg-blue-600 text-white rounded">View</Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage===1} className="px-4 py-2 bg-gray-200 rounded">Prev</button>
        <div className="px-4 py-2">Page {currentPage} of {totalPages}</div>
        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage===totalPages} className="px-4 py-2 bg-gray-200 rounded">Next</button>
      </div>
    </div>
  );
};

export default Shop;
