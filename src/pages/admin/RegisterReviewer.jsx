import React, { useState } from "react";
import AdminLayout from "../../components/AdminLayout";

const RegisterReviewer = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New reviewer registered:", form);
    alert("Reviewer registered successfully (dummy)");
    setForm({ firstName: "", lastName: "", email: "" });
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-[#521028] mb-6">
        Register New Reviewer
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4 max-w-md"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-[#521028]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-[#521028]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-[#521028]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#521028] text-white font-semibold py-2 rounded-md hover:bg-[#6b1b3a]"
        >
          Register Reviewer
        </button>
      </form>
    </AdminLayout>
  );
};

export default RegisterReviewer;
