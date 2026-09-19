import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import { useState, useEffect, useMemo } from "react";
import {
  FileSearch,
  Loader2,
  AlertTriangle,
  Eye,
  FileText,
  Search,
} from "lucide-react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Link } from "react-router-dom";

const PAPER_STATUSES = [
  "PENDING_APPROVAL",
  "PENDING_REVIEW",
  "UNDER_REVIEW",
  "REVISION_REQUIRED",
  "RESUBMITTED",
  "ACCEPTED",
  "REJECTED",
];

const SubmittedPapers = () => {
  const navigate = useNavigate();
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");

  const statusOptions = useMemo(
    () =>
      [
        ...new Set([...PAPER_STATUSES, ...papers.map((paper) => paper.status)]),
      ].sort(),
    [papers],
  );

  const paymentOptions = useMemo(
    () =>
      [
        ...new Set(papers.map((paper) => paper.paymentStatus || "UNPAID")),
      ].sort(),
    [papers],
  );

  const displayedPapers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return papers.filter((paper) => {
      const paymentStatus = paper.paymentStatus || "UNPAID";
      const searchableText = [
        paper.title,
        paper.id,
        paper.status,
        paper.status?.replace(/_/g, " "),
        paymentStatus,
        paymentStatus.replace(/_/g, " "),
      ]
        .join(" ")
        .toLowerCase();

      return (
        (!normalizedSearch || searchableText.includes(normalizedSearch)) &&
        (!statusFilter || paper.status === statusFilter) &&
        (!paymentFilter || paymentStatus === paymentFilter)
      );
    });
  }, [papers, paymentFilter, searchTerm, statusFilter]);

  const clearListControls = () => {
    setSearchTerm("");
    setStatusFilter("");
    setPaymentFilter("");
  };

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        setLoading(true);
        const res = await api.get("/author/papers");
        setPapers(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch papers.");
      } finally {
        setLoading(false);
      }
    };
    fetchPapers();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
      case "PENDING_REVIEW":
      case "UNDER_REVIEW":
      case "RESUBMITTED":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // --- NEW: Payment Status Helper ---
  const getPaymentClass = (status) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800 border-green-200";
      case "WAIVED":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "UNPAID":
      default:
        return "bg-red-50 text-red-800 border-red-200";
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 text-[#521028] animate-spin" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col justify-center items-center h-64 text-red-600">
          <AlertTriangle className="h-12 w-12 mb-4" />
          <p className="text-xl font-semibold">{error}</p>
        </div>
      );
    }

    if (papers.length === 0) {
      return (
        <div className="flex flex-col justify-center items-center h-64 text-gray-500">
          <FileSearch className="h-16 w-16 mb-4" />
          <h2 className="text-2xl font-semibold">No Papers Found</h2>
          <p className="mt-2">You have not submitted any papers yet.</p>
        </div>
      );
    }

    return (
      <>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-5">
          <div className="flex flex-col lg:flex-row gap-3 lg:items-end">
            <div className="flex-1">
              <label
                htmlFor="author-paper-search"
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
                  id="author-paper-search"
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by title, status, fees, or ID"
                  className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-[#521028] focus:outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:w-[28rem]">
              <div>
                <label
                  htmlFor="author-status-filter"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Status
                </label>
                <select
                  id="author-status-filter"
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
                  htmlFor="author-payment-filter"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Fees Status
                </label>
                <select
                  id="author-payment-filter"
                  value={paymentFilter}
                  onChange={(event) => setPaymentFilter(event.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#521028] focus:outline-none"
                >
                  <option value="">All fees statuses</option>
                  {paymentOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="button"
              onClick={clearListControls}
              disabled={!searchTerm && !statusFilter && !paymentFilter}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear filters
            </button>
          </div>
        </div>

        {displayedPapers.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <FileSearch className="h-12 w-12 mx-auto mb-3" />
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
            {/* --- Mobile Card View (Visible < lg) --- */}
            <div className="lg:hidden space-y-4">
              {displayedPapers.map((paper) => (
                <div
                  key={paper.id}
                  className="bg-white shadow-md rounded-lg p-4"
                >
                  {/* Top: Title and Status */}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-[#521028] pr-2">
                      {paper.title}
                    </h3>
                    <div className="flex flex-col gap-1 items-end">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${getStatusClass(
                          paper.status,
                        )}`}
                      >
                        {paper.status.replace(/_/g, " ")}
                      </span>
                      {/* Payment Badge Mobile */}
                      <span
                        className={`px-2 py-0.5 text-xs font-bold border rounded ${getPaymentClass(paper.paymentStatus)}`}
                      >
                        Fees: {paper.paymentStatus || "UNPAID"}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="text-sm text-gray-700 mb-4 space-y-1 border-t pt-3">
                    <p>
                      <strong>ID:</strong> #{paper.id}
                    </p>
                    <p>
                      <strong>Submitted:</strong>{" "}
                      {formatDate(paper.submittedAt)}
                    </p>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() =>
                      navigate(`/author/dashboard/papers/${paper.id}`)
                    }
                    className="w-full mt-3 bg-[#521028] text-white font-semibold py-2 rounded-md hover:bg-[#6b1b3a] flex items-center justify-center gap-2"
                  >
                    <Eye size={16} />
                    View Details
                  </button>
                </div>
              ))}
            </div>

            {/* --- Desktop Table View (Hidden < lg) --- */}
            <div className="hidden lg:block bg-white shadow-lg rounded-lg overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-[#521028] text-white">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Fees Status</th> {/* <-- NEW COLUMN */}
                    <th className="p-3">Submitted On</th>
                    <th className="p-3">Detailed View</th>
                  </tr>
                </thead>
                <tbody>
                  {papers.map((paper) => (
                    <tr
                      key={paper.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-3 font-medium text-gray-600">
                        #{paper.id}
                      </td>
                      <td className="p-3 font-semibold text-gray-900">
                        {paper.title}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusClass(
                            paper.status,
                          )}`}
                        >
                          {paper.status.replace(/_/g, " ")}
                        </span>
                      </td>
                      {/* Fees Badge Desktop */}
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 text-xs font-bold border rounded ${getPaymentClass(paper.paymentStatus)}`}
                        >
                          {paper.paymentStatus || "UNPAID"}
                        </span>
                      </td>
                      <td className="p-3 text-gray-600">
                        {formatDate(paper.submittedAt)}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() =>
                            navigate(`/author/dashboard/papers/${paper.id}`)
                          }
                          className="text-[#447E36] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Eye size={16} />
                          View
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
    );
  };

  const breadcrumbActions = (
    <Link
      to="/author/dashboard/submit"
      className="flex items-center text-sm font-semibold text-gray-700 hover:text-[#447E36] px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors whitespace-nowrap"
    >
      <FileText className="w-4 h-4 me-1.5" />
      Submit Paper
    </Link>
  );

  return (
    <>
      <Breadcrumbs actions={breadcrumbActions} />
      <div className="p-2 md:p-6">
        <h1 className="text-3xl font-bold text-[#521028] mb-8">
          Submitted Papers
        </h1>
        {renderContent()}
      </div>
    </>
  );
};
export default SubmittedPapers;
