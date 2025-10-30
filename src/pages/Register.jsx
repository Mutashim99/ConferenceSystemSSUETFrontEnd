import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#521028] px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#521028] mb-6">
          Register for ICISCT
        </h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              First Name
            </label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521028]"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521028]"
              placeholder="Enter your last name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521028]"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Affiliation
            </label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521028]"
              placeholder="Enter your affiliation"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521028]"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-[#521028] text-white font-semibold rounded-md hover:bg-[#6b1b3a] transition-colors"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#521028] font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
