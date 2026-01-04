import { Mail, Lock, UserPlus, User } from "lucide-react";
import api from "../services/api.js";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/register", { name, email, password });
      const { accessToken, refreshToken } = res.data.data;
      login({ accessToken, refreshToken });
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <h1 className="text-2xl font-semibold mb-6">Create an account</h1>

      {error && <div className="mb-4 text-sm text-red-500">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-3 w-3 h-3 text-gray-400" />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 outline-none"
            required
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-3 h-3 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 outline-none"
            required
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-3 h-3 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 outline-none"
            required
          />
        </div>
        <button
          disabled={loading}
          className="w-full flex item-center justify-center gap-2 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black"
        >
          <UserPlus className="w-4 h-4" />
          {loading ? "Creating..." : "Register"}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-500">
        Already have an account?
        <Link to="/login" className="underline" />
        Login
      </p>
      
    </div>
  );
};

export default Register;