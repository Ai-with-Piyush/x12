import { UserPlus, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { API_URL } from "../config";
function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    if (!email || !password) {
      setError("Email and password required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail || "Signup failed");
        return;
      }
      navigate("/login");
    } catch (err) {
      setError("Piyush is dreaming about becoming a unicorn startup Founder. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-black justify-center items-center px-4">
      <h2 className="mb-6 text-2xl">
        Sign Up For <b className="text-black ml-1">X12 AI</b>
      </h2>

      <div className="flex flex-col max-w-md w-full gap-4 font-bold border border-gray-300 p-5 rounded-md">
        <h2 className="font-bold text-2xl text-black flex justify-center">
          Sign Up
        </h2>

        {error && <p className="text-cyan-500 text-sm text-center">{error}</p>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-400 rounded-md px-4 py-2 w-full"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-400 rounded-md px-4 py-2 w-full"
        />

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-400 rounded-md px-4 py-2 w-full pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="bg-black rounded-md px-10 py-2 text-white flex items-center justify-center gap-2 hover:cursor-pointer disabled:opacity-50"
        >
          <UserPlus size={20} />
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="flex justify-center">Already Have An Account</p>

        <Link to="/login" className="flex justify-center text-blue-500 hover:cursor-pointer">
          Log in
        </Link>
      </div>
    </div>
  );
}

export default SignUp;