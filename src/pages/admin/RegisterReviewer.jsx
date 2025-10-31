import React, { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Loader2, CheckCircle, AlertTriangle, User, Mail } from "lucide-react";
import api from "../../api/axios"

// --- Main Component ---

const RegisterReviewer = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // API Call: POST /api/admin/register-reviewer
      await api.post("/admin/register-reviewer", form);

      setSuccess(
        "Reviewer registered successfully! They will receive an email with their password."
      );
      // Clear the form on success
      setForm({ firstName: "", lastName: "", email: "" });
    } catch (err) {
      console.error("Error registering reviewer:", err);
      setError(
        err.response?.data?.message ||
          "Failed to register reviewer. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-[#521028] mb-6">
        Register New Reviewer
      </h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Create a new user account with the "REVIEWER" role. An email with a
        randomly generated password will be sent to them.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 sm:p-8 space-y-6 max-w-md"
      >
        {/* First Name */}
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-semibold text-gray-700"
          >
            First Name
          </label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <User className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#521028] focus:outline-none"
              placeholder="John"
            />
          </div>
        </div>

        {/* Last Name */}
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-semibold text-gray-700"
          >
            Last Name
          </label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <User className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#521028] focus:outline-none"
              placeholder="Doe"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700"
          >
            Email
          </label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#521028] focus:outline-none"
              placeholder="reviewer@example.com"
            />
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-300 text-green-800 text-sm p-3 rounded-md flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <span>{success}</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-800 text-sm p-3 rounded-md flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#521028] text-white font-semibold py-2.5 rounded-md hover:bg-[#6b1b3a] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Register Reviewer"
          )}
        </button>
      </form>
    </AdminLayout>
  );
};

export default RegisterReviewer;
