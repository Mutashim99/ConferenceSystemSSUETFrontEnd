import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
// Changed to AuthorLayout, which we just made
import DashboardLayout from "../../components/DashboardLayout";
import { useState, useEffect } from "react";
import {
  FileSearch,
  Loader2,
  AlertTriangle,
  Eye, // Added for the view button
  FileText,
} from "lucide-react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Link } from "react-router-dom";

const SubmittedPapers = () => {
  const navigate = useNavigate();
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Helper function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper function to get status colors
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

    // --- UPDATED RESPONSIVE RETURN ---
    return (
      <>
        {/* --- Mobile Card View (Visible < lg) --- */}
        <div className="lg:hidden space-y-4">
          {papers.map((paper) => (
            <div key={paper.id} className="bg-white shadow-md rounded-lg p-4">
              {/* Top: Title and Status */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-[#521028] pr-2">
                  {paper.title}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${getStatusClass(
                    paper.status
                  )}`}
                >
                  {paper.status.replace(/_/g, " ")}
                </span>
              </div>

              {/* Details */}
              <div className="text-sm text-gray-700 mb-4 space-y-1 border-t pt-3">
                <p>
                  <strong>ID:</strong> #{paper.id}
                </p>
                <p>
                  <strong>Submitted:</strong> {formatDate(paper.submittedAt)}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => navigate(`/author/dashboard/papers/${paper.id}`)}
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
                  <td className="p-3 font-medium text-gray-600">#{paper.id}</td>
                  <td className="p-3 font-semibold text-gray-900">
                    {paper.title}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusClass(
                        paper.status
                      )}`}
                    >
                      {paper.status.replace(/_/g, " ")}
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
    // Use the correct layout
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
