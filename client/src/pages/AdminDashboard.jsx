import React from "react";
import { useStore } from "../context/StoreContext";

const AdminDashboard = () => {
  const { user } = useStore();
  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p>Welcome, <strong>{user?.name}</strong></p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-gray-100 rounded">Manage Products</div>
          <div className="p-4 bg-gray-100 rounded">Manage Users</div>
          <div className="p-4 bg-gray-100 rounded">Orders</div>
          <div className="p-4 bg-gray-100 rounded">Reports</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
