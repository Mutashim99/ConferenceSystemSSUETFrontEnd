import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Navbar from "../components/Navbar";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    affiliation: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { register, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await register(formData);

    if (user) navigate("/author/dashboard/submit");
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100 py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-[#521028] mb-6">
            Register for ICISCT
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                First Name
              </label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521028]"
                placeholder="Enter your first name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Last Name
              </label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521028]"
                placeholder="Enter your last name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521028]"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Affiliation
              </label>
              <input
                name="affiliation"
                value={formData.affiliation}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521028]"
                placeholder="Enter your affiliation"
                required
              />
            </div>

            {/* PASSWORD FIELD WITH EYE TOGGLE */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                className="w-full mt-1 p-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521028]"
                placeholder="Enter your password"
                required
                minLength={6}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[62%] -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 mt-4 btn-green text-white font-semibold rounded-md transition-colors disabled:opacity-70"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-[#447E36] font-semibold">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
