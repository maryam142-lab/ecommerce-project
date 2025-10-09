import axios from "axios";

// src/utils/api.js
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("token");
}

// Register User
export async function registerUser(data) {
  try {
    const res = await axios.post(`${API_URL}/auth/register`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error.response ? error.response.data : error;
  }
}

// Login User
export async function loginUser(data) {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error.response ? error.response.data : error;
  }
}

// Get Orders
export async function getOrders() {
  const token = getToken();
  try {
    const res = await axios.get(`${API_URL}/orders`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error.response ? error.response.data : error;
  }
}

// Create Order
export async function createOrder(orderData) {
  const token = getToken();
  try {
    const res = await axios.post(`${API_URL}/orders`, orderData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error.response ? error.response.data : error;
  }
}
