import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import { useState,useEffect } from "react";
import {
  FileSearch, // Added for empty state
  Loader2, // Added for loading
  AlertTriangle, // Added for error
} from "lucide-react";


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
          <p className="mt-2">
            You have not submitted any papers yet.
          </p>
        </div>
      );
    }

    return (
      <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-[#521028] text-white">
            <tr>
              <th className="p-3 w-1/6">ID</th>
              <th className="p-3 w-3/6">Title</th>
              <th className="p-3 w-1/6">Status</th>
              <th className="p-3 w-1/6">Submitted On</th>
              <th className="p-3 w-2/6">Detailed View</th>
            </tr>
          </thead>
          <tbody>
            {papers.map((paper) => (
              <tr
                key={paper.id}
                className="border-b "
               
              >
                <td className="p-3 font-medium text-gray-600">#{paper.id}</td>
                <td className="p-3 font-semibold text-gray-900">{paper.title}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusClass(
                      paper.status
                    )}`}
                  >
                    {paper.status.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="p-3 text-gray-600">{formatDate(paper.submittedAt)}</td>
                <td className="p-3 text-gray-600 hover:bg-gray-100 cursor-pointer" onClick={() => navigate(`/author/dashboard/papers/${paper.id}`)} >View</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-[#521028] mb-8">
        Submitted Papers
      </h1>
      {renderContent()}
    </DashboardLayout>
  );
};
export default SubmittedPapers;
