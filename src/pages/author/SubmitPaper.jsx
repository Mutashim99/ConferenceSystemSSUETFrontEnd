import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

const SubmitPaper = () => {
  const [form, setForm] = useState({
    title: "",
    abstract: "",
    keywords: "",
    coAuthors: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Paper submitted (dummy)");
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-[#521028] mb-6">
        Submit Your Paper
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4 max-w-2xl"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-[#521028]"
            placeholder="Enter paper title"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Abstract
          </label>
          <textarea
            name="abstract"
            value={form.abstract}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-[#521028]"
            rows="4"
            placeholder="Write abstract here"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Keywords
          </label>
          <input
            type="text"
            name="keywords"
            value={form.keywords}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-[#521028]"
            placeholder="e.g., AI, ML, Data Science"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Co-Authors
          </label>
          <input
            type="text"
            name="coAuthors"
            value={form.coAuthors}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-[#521028]"
            placeholder="Enter names separated by commas (e.g., John Doe, Jane Smith)"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Upload PDF
          </label>
          <input
            type="file"
            name="file"
            accept="application/pdf"
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#521028] text-white font-semibold py-2 rounded-md hover:bg-[#6b1b3a]"
        >
          Submit Paper
        </button>
      </form>
    </DashboardLayout>
  );
};

export default SubmitPaper;
