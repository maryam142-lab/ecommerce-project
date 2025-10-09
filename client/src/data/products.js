const products = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: 1200,
    category: "Clothing",
    image: "dress.jpg",
    description: "Comfortable cotton t-shirt in multiple colors.",
    stock: 50
  },
  {
    id: 2,
    name: "Running Shoes",
    price: 3500,
    category: "Footwear",
    image: "shoes.jpg",
    description: "Lightweight running shoes with cushioned sole.",
    stock: 20
  },
  {
    id: 3,
    name: "Wireless Headphones",
    price: 4500,
    category: "Electronics",
    image: "headphones.jpg",
    description: "Noise-cancelling wireless headphones.",
    stock: 15
  },
  {
    id: 4,
    name: "Classic Watch",
    price: 5200,
    category: "Accessories",   // ✅ Corrected
    image: "watch.jpg",        // ✅ Moved image here
    description: "Stylish watch with leather strap.",
    stock: 8
  }
];

export default products;
