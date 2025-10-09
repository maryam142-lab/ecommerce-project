import React from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";

function PrivateRoute({ children, adminOnly = false }) {
  const { user } = useStore();

  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/" replace />;

  return children;
}

export default PrivateRoute;
