import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";

const Profile = () => {
  const { user, logout } = useStore();
  const navigate = useNavigate();
  if (!user) { navigate("/login"); return null; }

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <button onClick={handleLogout} className="mt-4 w-full bg-red-500 text-white py-2 rounded">Logout</button>
      </div>
    </div>
  );
};

export default Profile;
