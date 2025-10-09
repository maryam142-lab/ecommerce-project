import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) { setError("All fields required"); return; }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(u => u.email === email)) { setError("Email already registered"); return; }

    users.push({ name, email, password, role: "user" });
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <div className="text-red-500 mb-3">{error}</div>}
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Full name" className="w-full p-2 border mb-3 rounded" />
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border mb-3 rounded" />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border mb-3 rounded" />
        <button className="w-full bg-green-600 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
