import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Loader2,
  FileText,
  Eye,
  CheckCircle, // <-- NEW: Added icon
  Clock, // <-- NEW: Added icon
  Search,
} from "lucide-react";
import api from "../../api/axios"; // <-- Corrected path
import Breadcrumbs from "../../components/Breadcrumbs"; // <-- Corrected path

const PAPER_STATUSES = [
  "PENDING_APPROVAL",
  "PENDING_REVIEW",
  "UNDER_REVIEW",
  "REVISION_REQUIRED",
  "RESUBMITTED",
  "ACCEPTED",
  "REJECTED",
];

// --- Main Component ---
const ReviewerSubmittedPapers = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewingPaperId, setViewingPaperId] = useState(null); // <-- NEW
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [reviewFilter, setReviewFilter] = useState("");
  const navigate = useNavigate();

  const statusOptions = useMemo(
    () =>
      [
        ...new Set([...PAPER_STATUSES, ...papers.map((paper) => paper.status)]),
      ].sort(),
    [papers],
  );

  const displayedPapers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return papers.filter((paper) => {
      const reviewStatus = paper.hasReviewed ? "SUBMITTED" : "PENDING";
      const searchableText = [
        paper.title,
        paper.id,
        paper.status,
        paper.status?.replace(/_/g, " "),
        reviewStatus,
      ]
        .join(" ")
        .toLowerCase();

      return (
        (!normalizedSearch || searchableText.includes(normalizedSearch)) &&
        (!statusFilter || paper.status === statusFilter) &&
        (!reviewFilter || reviewStatus === reviewFilter)
      );
    });
  }, [papers, reviewFilter, searchTerm, statusFilter]);

  const clearListControls = () => {
    setSearchTerm("");
    setStatusFilter("");
    setReviewFilter("");
  };

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
        status,
      )} ${className}`}
    >
      {status ? status.replace(/_/g, " ") : "N/A"}
    </span>
  );

  /**
   * --- NEW: A badge for the reviewer's own status ---
   */
  const MyStatusBadge = ({ hasReviewed }) => {
    if (hasReviewed) {
      return (
        <span className="flex items-center text-sm text-green-600 font-medium">
          <CheckCircle size={16} className="mr-1.5" />
          Submitted
        </span>
      );
    }
    return (
      <span className="flex items-center text-sm text-gray-500 font-medium">
        <Clock size={16} className="mr-1.5" />
        Pending
      </span>
    );
  };

  useEffect(() => {
    const fetchAssignedPapers = async () => {
      setLoading(true);
      setError(null);
      try {
        // API Call: GET /api/reviewer/papers
        const res = await api.get("/reviewer/papers");
        setPapers(res.data);
      } catch (err) {
        console.error("Error fetching assigned papers:", err);
        setError(
          err.response?.data?.message ||
            "Failed to fetch assigned papers. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedPapers();
  }, []);

  const handlePaperClick = (paperId) => {
    setViewingPaperId(paperId); // <-- NEW: Show loading on button
    // This navigate call matches the route in App.jsx
    navigate(`/reviewer/dashboard/papers/${paperId}`);
  };

  return (
    <>
      <Breadcrumbs /> {/* <-- REMOVED: Unnecessary action prop */}
      <div className="p-3 sm:p-4">
        <h1 className="text-3xl font-bold text-[#521028] mb-6">
          Assigned Papers for Review
        </h1>
        <p className="text-gray-600 mb-6 max-w-2xl">
          Here is a list of all papers that have been assigned to you for
          review. Click on a paper to view its details, submit your review, and
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
          <>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-5">
              <div className="flex flex-col lg:flex-row gap-3 lg:items-end">
                <div className="flex-1">
                  <label
                    htmlFor="reviewer-paper-search"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Search papers
                  </label>
                  <div className="relative">
                    <Search
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      id="reviewer-paper-search"
                      type="search"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder="Search by title, status, or ID"
                      className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-[#521028] focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:w-[28rem]">
                  <div>
                    <label
                      htmlFor="reviewer-status-filter"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      Paper Status
                    </label>
                    <select
                      id="reviewer-status-filter"
                      value={statusFilter}
                      onChange={(event) => setStatusFilter(event.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#521028] focus:outline-none"
                    >
                      <option value="">All statuses</option>
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status.replace(/_/g, " ")}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="reviewer-review-filter"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      My Review
                    </label>
                    <select
                      id="reviewer-review-filter"
                      value={reviewFilter}
                      onChange={(event) => setReviewFilter(event.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#521028] focus:outline-none"
                    >
                      <option value="">All review states</option>
                      <option value="PENDING">Pending</option>
                      <option value="SUBMITTED">Submitted</option>
                    </select>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={clearListControls}
                  disabled={!searchTerm && !statusFilter && !reviewFilter}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Clear filters
                </button>
              </div>
            </div>

            {displayedPapers.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <FileText size={40} className="mx-auto mb-2" />
                <p className="font-semibold">
                  No papers match your search/filters.
                </p>
                <button
                  type="button"
                  onClick={clearListControls}
                  className="mt-3 text-sm font-semibold text-[#447E36] hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                {/* --- NEW: Mobile Card View (Visible < lg) --- */}
                <div className="lg:hidden space-y-4">
                  {displayedPapers.map((paper) => (
                    <div
                      key={paper.id}
                      className="bg-white shadow-md rounded-lg p-4"
                    >
                      {/* Top: Title and Status */}
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-[#521028] pr-2">
                          {paper.title}
                        </h3>
                        <StatusBadge status={paper.status} />
                      </div>

                      {/* Details Grid */}
                      <div className="border-t pt-3 grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <strong className="block text-xs text-gray-500">
                            My Status
                          </strong>
                          <MyStatusBadge hasReviewed={paper.hasReviewed} />
                        </div>
                        <div>
                          <strong className="block text-xs text-gray-500">
                            Submitted
                          </strong>
                          <p className="font-medium">
                            {formatDate(paper.submittedAt)}
                          </p>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => handlePaperClick(paper.id)}
                        className="w-full mt-4 bg-[#521028] text-white font-semibold py-2 rounded-md hover:bg-[#6b1b3a] flex items-center justify-center gap-2 disabled:opacity-50"
                        disabled={viewingPaperId === paper.id}
                      >
                        {viewingPaperId === paper.id ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Eye size={16} />
                        )}
                        {viewingPaperId === paper.id
                          ? "Loading..."
                          : "View Details"}
                      </button>
                    </div>
                  ))}
                </div>

                {/* --- NEW: Desktop Table View (Hidden < lg) --- */}
                <div className="hidden lg:block bg-white shadow-md rounded-lg overflow-hidden">
                  <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-[#521028] text-white">
                      <tr>
                        <th className="p-3">Title</th>
                        <th className="p-3">Paper Status</th>
                        <th className="p-3">My Review Status</th>
                        <th className="p-3">Submitted On</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedPapers.map((paper) => (
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
                          {/* --- NEW: My Status Column --- */}
                          <td className="p-3">
                            <MyStatusBadge hasReviewed={paper.hasReviewed} />
                          </td>
                          <td className="p-3 text-gray-700">
                            {formatDate(paper.submittedAt)}
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => handlePaperClick(paper.id)}
                              className="text-[#447E36] font-semibold hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
                              disabled={viewingPaperId === paper.id}
                            >
                              {viewingPaperId === paper.id ? (
                                <Loader2 size={16} className="animate-spin" />
                              ) : (
                                <Eye size={16} />
                              )}
                              {viewingPaperId === paper.id
                                ? "Loading..."
                                : "View Details"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ReviewerSubmittedPapers;
