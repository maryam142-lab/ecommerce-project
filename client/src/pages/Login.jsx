import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { loginUser as apiLogin } from "../utils/api"; // optional: if you use backend

const Login = () => {
  const { login } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError("All fields required"); return; }

    // Try backend login if you have backend (uncomment):
    // const res = await apiLogin({ email, password });
    // if (res?.user) { login(res.user, res.token); navigate(res.user.role === "admin" ? "/admin" : "/profile"); return; }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existing = users.find(u => u.email === email && u.password === password);
    if (existing) {
      login({ name: existing.name, email: existing.email, role: existing.role }, "local-token");
      navigate(existing.role === "admin" ? "/admin" : "/profile");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <div className="text-red-500 mb-3">{error}</div>}
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border mb-3 rounded" />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border mb-3 rounded" />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
