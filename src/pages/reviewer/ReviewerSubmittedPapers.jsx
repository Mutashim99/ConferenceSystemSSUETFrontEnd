import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, FileText, Eye } from "lucide-react";
import api from "../../api/axios";
import Breadcrumbs from "../../components/Breadcrumbs";

// --- Main Component ---
const ReviewerSubmittedPapers = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Helper components are expected to be in scope from App.jsx
  // If StatusBadge or formatDate are not defined, we need to import them
  // Assuming they are globally available or imported in App.jsx's scope
  // For safety, let's re-define just the helpers this component needs,
  // but *not* the layout.

  /**
   * Formats a date string.
   */
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  /**
   * Gets Tailwind classes for a paper status.
   */
  const getStatusClass = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      case "REVISION_REQUIRED":
      case "MAJOR_REVISION":
      case "MINOR_REVISION":
        return "bg-yellow-100 text-yellow-800";
      case "PENDING_APPROVAL":
        return "bg-cyan-100 text-cyan-800";
      case "PENDING_REVIEW":
      case "UNDER_REVIEW":
      case "RESUBMITTED":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  /**
   * A reusable status badge.
   */
  const StatusBadge = ({ status, className = "" }) => (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${getStatusClass(
        status
      )} ${className}`}
    >
      {status ? status.replace(/_/g, " ") : "N/A"}
    </span>
  );

  useEffect(() => {
    const fetchAssignedPapers = async () => {
      setLoading(true);
      setError(null);
      try {
        // API Call: GET /api/reviewer/papers
        const res = await api.get("/reviewer/papers");
        setPapers(res.data);
        // This extra brace was causing the error. It has been removed.
      } catch (err) {
        console.error("Error fetching assigned papers:", err);
        setError(
          err.response?.data?.message ||
            "Failed to fetch assigned papers. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedPapers();
  }, []);

  const handlePaperClick = (paperId) => {
    // This navigate call matches the route in App.jsx
    navigate(`/reviewer/dashboard/papers/${paperId}`);
  };

  const breadcrumbActions = (
    <Link
      to="/reviewer/dashboard/papers/:id"
      className="flex items-center text-sm font-semibold text-gray-700 hover:text-[#521028] px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors whitespace-nowrap"
    >
      <FileText className="w-4 h-4 me-1.5" />
      Paper Details
    </Link>
  );

  return (
    <>
      <Breadcrumbs actions={breadcrumbActions} />
      <h1 className="text-3xl font-bold text-[#521028] mb-6">
        Assigned Papers for Review
      </h1>
      <p className="text-gray-600 mb-6 max-w-2xl">
        Here is a list of all papers that have been assigned to you for review.
        Click on a paper to view its details, submit your review, and
        communicate with the author.
      </p>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-800 text-sm p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 text-[#521028] animate-spin" />
        </div>
      ) : papers.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <FileText size={40} className="mx-auto mb-2" />
          <h3 className="text-lg font-semibold">No Papers Assigned</h3>
          <p>You currently have no papers assigned to you for review.</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-[#521028] text-white">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Status</th>
                <th className="p-3">Submitted On</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {papers.map((paper) => (
                <tr
                  key={paper.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium text-gray-900">
                    {paper.title}
                  </td>
                  <td className="p-3">
                    <StatusBadge status={paper.status} />
                  </td>
                  <td className="p-3 text-gray-700">
                    {formatDate(paper.submittedAt)}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handlePaperClick(paper.id)}
                      className="text-[#521028] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Eye size={16} />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ReviewerSubmittedPapers;
