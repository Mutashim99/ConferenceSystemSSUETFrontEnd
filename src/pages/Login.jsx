import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Get state and actions from the store
  const { login, error, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // **FIX:** The 'login' function now returns the user object or 'false'.
    // This avoids a race condition where we try to read the state
    // before Zustand has finished updating it.
    const user = await login(email, password);

    if (user) {
      // Now we can safely check the role from the returned user object.
      if (user.role === "ADMIN") navigate("/admin/dashboard");
      else if (user.role === "AUTHOR") navigate("/author/dashboard");
      else if (user.role === "REVIEWER") navigate("/reviewer/dashboard");
      else navigate("/"); // Fallback for any other roles
    }
    // If 'user' is false, the 'error' state in the store
    // will be set, and the UI will display it.
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-[#521028] mb-6">
            Login to ICISCT
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521028]"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521028]"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 mt-4 btn-green text-white font-semibold rounded-md transition-colors disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && (
              <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
            )}
          </form>
          <p className="text-sm text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-[#447E36] font-semibold">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default Login;
