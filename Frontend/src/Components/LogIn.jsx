import { useState } from "react";
import { Eye, EyeOff, LogInIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function LogIn() {
    const [ShowPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
      setError("");
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.detail || "Login failed");
          return;
        }
        localStorage.setItem("access_token", data.access_token);
        navigate("/chat");
      } catch (err) {
        setError("Piyush and his pc are resting Now . So Come after sometime!");
      } finally {
        setLoading(false);
      }
    };

    return (
        <div className="text-black">
        <h2 className="flex justify-center mt-3">Log In To <b className="text-black ml-1"> X12 AI</b></h2>
        <div className="min-h-screen  flex justify-center items-center px-4  ">
            <div className="flex flex-col max-w-md w-full gap-4 font-bold border border-gray-300 p-10 rounded-md">
                <h2 className="font-bold text-2xl text-black flex justify-center">Log In</h2>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <input type="email" placeholder="Email"  
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-400 rounded-md px-4 py-2 w-full"
                />
                <div className="relative w-full">

                    <input type={ShowPassword ? "text" : "password"} 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-400 rounded-md px-4 py-2 w-full"/>

                    <button type="button" onClick={() => setShowPassword(!ShowPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">

                        {ShowPassword ? <EyeOff size={20}/> : <Eye size={20}/>}

                    </button>
                </div>
                <button 
                onClick={handleLogin} 
                disabled={loading}
                className="flex justify-center items-center gap-2 bg-black  rounded-md text-white py-2 hover:cursor-pointer disabled:opacity-50">
                  <LogInIcon size={20}/>{loading ? "Logging in..." : "Log In"}
                </button>
                <p className="flex justify-center">Don't have an account?</p>
                <Link to="/signup" className="flex justify-center text-blue-500 hover:cursor-pointer">Sign up</Link>
            </div>
        </div>
        </div>
        
    );
}export default LogIn;