import AdminLayout from "../../components/AdminLayout";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext,
} from "react";


import {
  Menu,
  X,
  ChevronDown,
  Loader2,
  AlertTriangle,
  FileText,
  Users,
  MessageSquare,
  BookOpen,
  Send,
  UploadCloud,
  Paperclip,
  Trash2,
  Check,
  XCircle,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  ThumbsUp,
  Save,
  Star,
  Download,
  List,
} from "lucide-react";
import api from "../../api/axios"


const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Gets Tailwind classes for a paper status.
 * @param {string} status
 * @returns {string} Tailwind classes
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
 * @param {{status: string, className?: string}} props
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

/**
 * A reusable modal component context for opening/closing.
 */
const ModalContext = createContext(null); // Default to null

const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => setModalContent(() => content);
  const closeModal = () => setModalContent(null);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalContent && (
        <div
          className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {modalContent}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

// REMOVED the useModal hook. We will call useContext directly.


// --- Main Component ---
// Renamed to "Internal" - this is the component logic
const AdminSubmittedPapersInternal = () => {
  // --- State ---
  const [papers, setPapers] = useState([]); // List of all papers
  const [selectedPaper, setSelectedPaper] = useState(null); // The paper being viewed
  const [reviewers, setReviewers] = useState([]); // List of all available reviewers
  const [selectedReviewerIds, setSelectedReviewerIds] = useState([]); // Reviewers to assign

  // Loading States
  const [listLoading, setListLoading] = useState(true); // Main list loading
  const [detailLoading, setDetailLoading] = useState(false); // Detail view loading
  const [viewingPaperId, setViewingPaperId] = useState(null); // Which paper is being loaded
  const [actionLoading, setActionLoading] = useState(null); // For specific buttons (approve, assign, etc.)

  // Errors
  const [error, setError] = useState(null);

  // Modal
  // Call useContext directly inside the component
  const modalContext = useContext(ModalContext);
  
  // State for the "Final Status" dropdown
  const [newFinalStatus, setNewFinalStatus] = useState("");

  // Final decision statuses
  const finalStatuses = ["ACCEPTED", "REJECTED", "REVISION_REQUIRED"];

  // --- API Functions ---

  // Fetch all papers
  const fetchPapers = useCallback(async () => {
    setListLoading(true);
    setError(null);
    try {
      const res = await api.get("/admin/papers");
      setPapers(res.data);
    } catch (err) {
      console.error("Error fetching papers:", err);
      setError(
        err.response?.data?.message || "Failed to fetch papers. Please try again."
      );
    } finally {
      setListLoading(false);
    }
  }, []); // Empty dependency array makes this function stable

  // Initial fetch and re-fetch on filter change
  useEffect(() => {
    // This effect now directly depends on filterStatus
    // and calls the stable fetchPapers function
    if (!selectedPaper) {
      fetchPapers();
    }
  }, [fetchPapers, selectedPaper]); // Add selectedPaper to prevent refetch when viewing details

  // Fetch single paper + all reviewers
  const fetchPaperDetails = useCallback(async (paperId) => {
    setDetailLoading(true);
    setError(null);
    setSelectedReviewerIds([]);
    try {
      // Fetch paper details and reviewers in parallel
      const [paperRes, reviewersRes] = await Promise.all([
        api.get(`/admin/papers/${paperId}`),
        api.get("/admin/reviewers"),
      ]);

      const paperData = paperRes.data;
      setSelectedPaper(paperData);
      setReviewers(reviewersRes.data || []);

      // Pre-fill the "Final Status" dropdown if a final status is already set
      if (finalStatuses.includes(paperData.status)) {
        setNewFinalStatus(paperData.status);
      } else {
        setNewFinalStatus("");
      }
    } catch (err) {
      console.error("Error fetching paper details:", err);
      setError(
        err.response?.data?.message ||
          "Failed to fetch paper details. Please try again."
      );
    } finally {
      setDetailLoading(false);
      setViewingPaperId(null);
    }
  }, []); // Removed finalStatuses from dependencies, it's a constant

  // --- Action Handlers ---

  const handleViewPaper = (id) => {
    setViewingPaperId(id);
    fetchPaperDetails(id);
  };

  const handleBackToList = () => {
    setSelectedPaper(null);
    setError(null);
    fetchPapers(); // Refetch list
  };
  
  // This component must have the modal context to function
  if (!modalContext) {
    console.error("AdminSubmittedPapersInternal must be wrapped in ModalProvider.");
    return (
      <AdminLayout>
        <div className="text-center text-red-600 mt-10">
          <AlertTriangle size={40} className="mx-auto mb-2" />
          <p>Critical Error: ModalContext is missing.</p>
        </div>
      </AdminLayout>
    );
  }
  
  const { openModal, closeModal } = modalContext;

  // Generic action handler to wrap API calls with loading and error handling
  const handleAdminAction = async (
    actionName,
    apiCall,
    successMessage
  ) => {
    setActionLoading(actionName);
    setError(null);
    try {
      await apiCall();

      // Show success modal
      openModal(
        <div className="text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium">Success</h3>
          <p className="text-sm text-gray-600 mb-4">{successMessage}</p>
          <button
            onClick={closeModal}
            className="w-full bg-[#521028] text-white font-semibold py-2 rounded-md hover:bg-[#6b1b3a]"
          >
            Close
          </button>
        </div>
      );

      // Refresh data
      if (selectedPaper) {
        fetchPaperDetails(selectedPaper.id); // Refresh detail view
      } else {
        fetchPapers(); // Refresh list view
      }
    } catch (err) {
      console.error(`Error during ${actionName}:`, err);
      const message =
        err.response?.data?.message || `Failed to ${actionName}. Please try again.`;
      setError(message); // Show error in the UI
    } finally {
      setActionLoading(null);
    }
  };

  // --- Specific Actions ---

  const onApprovePaper = (paperId) => {
    openModal(
      <div>
        <h3 className="text-lg font-medium">Confirm Approval</h3>
        <p className="text-sm text-gray-600 my-4">
          Are you sure you want to approve this paper for review? This will change
          its status to "PENDING_REVIEW".
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-md border text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              closeModal();
              handleAdminAction(
                "approve",
                () => api.patch(`/admin/papers/${paperId}/approve`),
                "Paper approved successfully. It is now pending review."
              );
            }}
            className="px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium"
          >
            {actionLoading === "approve" ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Approve"
            )}
          </button>
        </div>
      </div>
    );
  };

  const onAssignReviewers = () => {
    if (selectedReviewerIds.length === 0) {
      setError("Please select at least one reviewer to assign.");
      return;
    }
    handleAdminAction(
      "assign",
      () =>
        api.post(`/admin/papers/${selectedPaper.id}/assign`, {
          reviewerIds: selectedReviewerIds.map(Number), // Ensure IDs are numbers
        }),
      "Reviewer(s) assigned successfully."
    );
  };

  const onSetFinalStatus = () => {
    if (!newFinalStatus) {
      setError("Please select a final status.");
      return;
    }
    openModal(
      <div>
        <h3 className="text-lg font-medium">Confirm Final Status</h3>
        <p className="text-sm text-gray-600 my-4">
          Are you sure you want to set the final status to
          <strong> "{newFinalStatus.replace(/_/g, " ")}"</strong>? This action
          is final.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-md border text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              closeModal();
              handleAdminAction(
                "status",
                () =>
                  api.patch(`/admin/papers/${selectedPaper.id}/status`, {
                    status: newFinalStatus,
                  }),
                `Paper status successfully updated to "${newFinalStatus}".`
              );
            }}
            className="px-4 py-2 rounded-md bg-[#521028] text-white text-sm font-medium"
          >
            {actionLoading === "status" ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
    );
  };

  const onDeletePaper = (paperId, paperTitle) => {
    openModal(
      <div>
        <h3 className="text-lg font-medium text-red-700">Confirm Deletion</h3>
        <p className="text-sm text-gray-600 my-4">
          Are you sure you want to permanently delete the paper:
          <strong className="block mt-2">"{paperTitle}"</strong>?
          <br />
          <br />
          This will delete the paper, its file, all reviews, and all assignments.
          This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-md border text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              closeModal();
              handleAdminAction(
                "delete",
                () => api.delete(`/admin/papers/${paperId}`),
                "Paper deleted successfully."
              );
            }}
            className="px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium"
          >
            {actionLoading === "delete" ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Delete Paper"
            )}
          </button>
        </div>
      </div>
    );
  };

  // --- Memoized Components ---

  // Filter out reviewers who are already assigned to this paper
  const availableReviewers = React.useMemo(() => {
    if (!selectedPaper || !reviewers.length) return [];
    const assignedIds = new Set(
      selectedPaper.assignments?.map((a) => a.reviewer.id) || []
    );
    return reviewers.filter((r) => !assignedIds.has(r.id));
  }, [reviewers, selectedPaper]);

  // --- Render ---

  if (selectedPaper) {
    // --- Detail View ---
    return (
      <AdminLayout>
        {detailLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 text-[#521028] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column (Paper Info) */}
            <div className="lg:col-span-2 space-y-6">
              {/* --- Header Card --- */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-[#521028]">
                      {selectedPaper.title}
                    </h1>
                    <button
                      onClick={handleBackToList}
                      className="text-sm text-[#521028] font-semibold hover:underline mt-1"
                    >
                      &larr; Back to list
                    </button>
                  </div>
                  <StatusBadge
                    status={selectedPaper.status}
                    className="text-base"
                  />
                </div>

                <div className="space-y-3 text-sm text-gray-700">
                  <p>
                    <strong>Submitted On:</strong>{" "}
                    {formatDate(selectedPaper.submittedAt)}
                  </p>
                  <p>
                    <strong>Keywords:</strong> {selectedPaper.keywords || "N/A"}
                  </p>
                  <p>
                    <strong>Topic Area:</strong>{" "}
                    {selectedPaper.topicArea || "N/A"}
                  </p>
                  {selectedPaper.fileUrl && (
                    <a
                      href={selectedPaper.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 mt-2 text-[#521028] font-semibold hover:underline"
                    >
                      <Download size={16} /> View/Download Paper PDF
                    </a>
                  )}
                </div>

                {/* --- Author & Co-Authors --- */}
                <div className="mt-6 pt-4 border-t">
                  <h4 className="text-base font-semibold text-gray-800 mb-2">
                    Corresponding Author
                  </h4>
                  <p className="text-sm text-gray-700">
                    {selectedPaper.author.firstName}{" "}
                    {selectedPaper.author.lastName}
                    <br />
                    <span className="text-xs text-gray-500">
                      {selectedPaper.author.email}
                    </span>
                    <br />
                    <span className="text-xs text-gray-500">
                      {selectedPaper.author.affiliation ||
                        "No affiliation listed"}
                    </span>
                  </p>

                  {selectedPaper.coAuthors &&
                    selectedPaper.coAuthors.length > 0 && (
                      <>
                        <h4 className="text-base font-semibold text-gray-800 mt-4 mb-2">
                          Co-Authors
                        </h4>
                        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                          {selectedPaper.coAuthors.map((coAuthor) => (
                            <li key={coAuthor.id}>
                              {coAuthor.name}
                              {coAuthor.affiliation && (
                                <span className="text-xs text-gray-500">
                                  {" "}
                                  ({coAuthor.affiliation})
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                </div>
              </div>

              {/* --- Abstract --- */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#521028] mb-4">
                  Abstract
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedPaper.abstract || "No abstract provided."}
                </p>
              </div>

              {/* --- Reviews Section --- */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#521028] mb-4">
                  Reviews
                </h3>
                {selectedPaper.reviews &&
                selectedPaper.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {selectedPaper.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-semibold text-gray-900">
                            {review.reviewer.firstName}{" "}
                            {review.reviewer.lastName}
                          </p>
                          <StatusBadge status={review.recommendation} />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <strong>Rating:</strong>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={
                                  i < review.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                          ({review.rating}/5)
                        </div>
                        <p className="text-gray-700 text-sm mt-3 whitespace-pre-wrap">
                          {review.comments}
                        </p>
                        <p className="text-xs text-gray-400 text-right mt-2">
                          Reviewed on: {formatDate(review.reviewedAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No reviews have been submitted for this paper yet.
                  </p>
                )}
              </div>

              {/* --- Feedback Log --- */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#521028] mb-4">
                  Feedback Log
                </h3>
                {selectedPaper.feedbacks &&
                selectedPaper.feedbacks.length > 0 ? (
                  <div className="space-y-3 max-h-60 overflow-y-auto p-1">
                    {selectedPaper.feedbacks.map((feedback) => (
                      <div
                        key={feedback.id}
                        className={`p-3 rounded-lg text-sm ${
                          feedback.sender.role === "AUTHOR"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-blue-50 text-blue-900"
                        }`}
                      >
                        <p className="font-semibold">
                          {feedback.sender.firstName}{" "}
                          {feedback.sender.lastName} ({feedback.sender.role})
                        </p>
                        <p className="mt-1">{feedback.message}</p>
                        <p className="text-xs text-gray-500 text-right mt-1">
                          {formatDate(feedback.sentAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No feedback has been exchanged for this paper.
                  </p>
                )}
              </div>
            </div>

            {/* Right Column (Actions & Assignments) */}
            <div className="lg:col-span-1 space-y-6">
              {/* --- Admin Actions --- */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#521028] mb-4">
                  Admin Actions
                </h3>
                {error && (
                  <div className="bg-red-100 border border-red-300 text-red-800 text-sm p-3 rounded-md mb-4">
                    {error}
                  </div>
                )}

                {/* ACTION: Approve Paper */}
                {selectedPaper.status === "PENDING_APPROVAL" && (
                  <div>
                    <p className="text-sm text-gray-700 mb-3">
                      This paper is awaiting your approval to be sent for review.
                    </p>
                    <button
                      onClick={() => onApprovePaper(selectedPaper.id)}
                      disabled={actionLoading}
                      className="w-full bg-green-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                      {actionLoading === "approve" ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <ThumbsUp size={16} />
                      )}
                      Approve Paper for Review
                    </button>
                  </div>
                )}

                {/* ACTION: Set Final Status */}
                <div>
                  <label
                    htmlFor="finalStatus"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Set Final Decision
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Set or update the paper's final status.
                  </p>
                  <div className="flex gap-2">
                    <select
                      id="finalStatus"
                      value={newFinalStatus}
                      onChange={(e) => setNewFinalStatus(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#521028] focus:outline-none"
                    >
                      <option value="">Select status...</option>
                      {finalStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status.replace(/_/g, " ")}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={onSetFinalStatus}
                      disabled={!newFinalStatus || actionLoading}
                      className="bg-[#521028] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#6b1b3a] flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {actionLoading === "status" ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Save size={16} />
                      )}
                      Save
                    </button>
                  </div>
                </div>

                {/* ACTION: Delete Paper */}
                <div className="mt-6 border-t pt-6">
                  <h4 className="text-base font-medium text-red-700 mb-2">
                    Danger Zone
                  </h4>
                  <button
                    onClick={() =>
                      onDeletePaper(selectedPaper.id, selectedPaper.title)
                    }
                    disabled={actionLoading}
                    className="w-full bg-red-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-red-700 flex items-center justify-center gap-2"
                  >
                    {actionLoading === "delete" ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                    Delete This Paper
                  </button>
                </div>
              </div>

              {/* --- Reviewer Assignments --- */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#521028] mb-4">
                  Reviewer Assignments
                </h3>

                {/* Assigned Reviewers List */}
                {selectedPaper.assignments &&
                selectedPaper.assignments.length > 0 ? (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Assigned Reviewers
                    </h4>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                      {selectedPaper.assignments.map((a) => (
                        <li key={a.id}>
                          {a.reviewer.firstName} {a.reviewer.lastName} (
                          {a.reviewer.email})
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mb-4">
                    No reviewers assigned yet.
                  </p>
                )}

                {/* Assign New Reviewers Form */}
                <div className="border-t pt-4">
                  <label
                    htmlFor="reviewers"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Assign New Reviewers
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Select one or more reviewers (Ctrl/Cmd + click).
                  </p>
                  {availableReviewers.length > 0 ? (
                    <>
                      <select
                        id="reviewers"
                        multiple
                        value={selectedReviewerIds}
                        onChange={(e) =>
                          setSelectedReviewerIds(
                            Array.from(
                              e.target.selectedOptions,
                              (option) => option.value
                            )
                          )
                        }
                        className="w-full border border-gray-300 rounded-md p-2 h-32 text-sm focus:ring-2 focus:ring-[#521028] focus:outline-none"
                      >
                        {availableReviewers.map((rev) => (
                          <option key={rev.id} value={rev.id}>
                            {rev.firstName} {rev.lastName} ({rev.email})
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={onAssignReviewers}
                        disabled={
                          selectedReviewerIds.length === 0 || actionLoading
                        }
                        className="w-full mt-4 bg-[#521028] text-white font-semibold py-2 rounded-md hover:bg-[#6b1b3a] flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {actionLoading === "assign" ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <Send size={16} />
                        )}
                        Assign Selected
                      </button>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500">
                      All available reviewers have been assigned.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    );
  }

  // --- Main List View ---
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#521028]">Submitted Papers</h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-800 text-sm p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {listLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 text-[#521028] animate-spin" />
        </div>
      ) : papers.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <FileText size={40} className="mx-auto mb-2" />
          <p>No papers found.</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-[#521028] text-white">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Author</th>
                <th className="p-3">Status</th>
                <th className="p-3">Reviews</th>
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
                  <td className="p-3 text-gray-700">
                    {paper.author.firstName} {paper.author.lastName}
                    <br />
                    <span className="text-xs text-gray-500">
                      {paper.author.email}
                    </span>
                  </td>
                  <td className="p-3">
                    <StatusBadge status={paper.status} />
                  </td>
                  <td className="p-3 text-center text-gray-700">
                    {paper._count.reviews || 0}
                  </td>
                  <td className="p-3 text-gray-700">
                    {formatDate(paper.submittedAt)}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleViewPaper(paper.id)}
                      className="text-[#521028] font-semibold hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
                      disabled={detailLoading}
                    >
                      {detailLoading && viewingPaperId === paper.id ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Eye size={16} />
                      )}
                      {detailLoading && viewingPaperId === paper.id
                        ? "Loading..."
                        : "View"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

// This is the component that will be exported.
// It wraps the internal component with the ModalProvider.
const AdminSubmittedPapers = () =>(
  <ModalProvider>
    <AdminSubmittedPapersInternal />
  </ModalProvider>
);


export default AdminSubmittedPapers;