import React, { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

const AssignReviewer = () => {
  const [paperId, setPaperId] = useState("");
  const [selectedReviewers, setSelectedReviewers] = useState([]);

  const dummyReviewers = [
    { id: 1, name: "Reviewer A" },
    { id: 2, name: "Reviewer B" },
    { id: 3, name: "Reviewer C" },
  ];

  const toggleReviewer = (id) => {
    setSelectedReviewers((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const breadcrumbActions = (
    <>
      <Link
        to="/admin/dashboard/register-reviewer"
        className="flex items-center text-sm font-semibold text-gray-700 hover:text-[#521028] px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors whitespace-nowrap"
      >
        <FileText className="w-4 h-4 me-1.5" />
        Register Reviewer
      </Link>
      <Link
        to="/admin/dashboard/papers"
        className="flex items-center text-sm font-semibold text-gray-700 hover:text-[#521028] px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors whitespace-nowrap"
      >
        <FileText className="w-4 h-4 me-1.5" />
        Submitted Papers
      </Link>
    </>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Assigning reviewers:", {
      paperId,
      reviewerIds: selectedReviewers,
    });
    alert("Reviewers assigned successfully (dummy)");
    setPaperId("");
    setSelectedReviewers([]);
  };

  return (
    <>
      <Breadcrumbs actions={breadcrumbActions} />
      <h1 className="text-2xl font-bold text-[#521028] mb-6">
        Assign Reviewers to Paper
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4 max-w-lg"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Paper ID
          </label>
          <input
            type="number"
            value={paperId}
            onChange={(e) => setPaperId(e.target.value)}
            placeholder="Enter paper ID"
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-[#521028]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Select Reviewers
          </label>
          <div className="space-y-2">
            {dummyReviewers.map((rev) => (
              <label key={rev.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedReviewers.includes(rev.id)}
                  onChange={() => toggleReviewer(rev.id)}
                />
                {rev.name}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#521028] text-white font-semibold py-2 rounded-md hover:bg-[#6b1b3a]"
        >
          Assign Reviewers
        </button>
      </form>
    </>
  );
};

export default AssignReviewer;
