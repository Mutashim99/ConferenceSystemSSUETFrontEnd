import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import {
  Loader2,
  AlertTriangle,
  FileText,
  MessageSquare,
  BookOpen,
  Send,
  Download,
  // Star, // <-- REMOVED
  CheckCircle,
  Edit,
  Users,
} from "lucide-react";
import api from "../../api/axios"; // <-- Corrected path

import useAuthStore from "../../store/authStore"; // <-- Corrected path
import Breadcrumbs from "../../components/Breadcrumbs"; // <-- Corrected path

// --- Helper Functions & Components ---

/**
 * Formats a date string.
 */
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

// Recommendation options
const RECOMMENDATION_OPTIONS = [
  "ACCEPT",
  "REJECT",
  "MINOR_REVISION",
  "MAJOR_REVISION",
];

// --- REMOVED: StarRating component is no longer needed ---

// --- Main Component ---

const ReviewerPaperDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  console.log(user);

  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For the review form
  const [reviewForm, setReviewForm] = useState({
    comments: "",
    // --- REMOVED: rating is no longer part of the review ---
    recommendation: "MINOR_REVISION",
  });
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // For the chat
  const [newMessage, setNewMessage] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatBottomRef = useRef(null); // Add ref for chat scrolling

  // --- Data Fetching ---
  const fetchPaperDetails = useCallback(async () => {
    // Don't set loading on refetch
    if (!paper) setLoading(true);
    setError(null);
    try {
      // API Call: GET /api/reviewer/papers/:id
      const res = await api.get(`/reviewer/papers/${id}`);
      setPaper(res.data);

      // --- START: UPDATED LOGIC ---
      // Find this user's review in the reviews array
      const myReview = res.data.reviews.find(
        (review) => review.reviewerId === user?.id
      );

      // Check if this reviewer has already submitted a review
      if (myReview) {
        setReviewForm({
          comments: myReview.comments,
          // --- REMOVED: rating is no longer used ---
          recommendation: myReview.recommendation,
        });
        setIsReviewSubmitted(true);
      } else {
        // No review found for this user, set defaults
        setReviewForm({
          comments: "",
          // --- REMOVED: rating is no longer used ---
          recommendation: "MINOR_REVISION",
        });
        setIsReviewSubmitted(false);
      }
      // --- END: UPDATED LOGIC ---
    } catch (err) {
      console.error("Error fetching paper details:", err);
      setError(
        err.response?.data?.message ||
          "Failed to fetch paper details. You may not have access to this paper."
      );
    } finally {
      setLoading(false);
    }
  }, [id, user?.id, paper]); // UPDATED Dependencies

  useEffect(() => {
    fetchPaperDetails();
  }, [id, user?.id]); // UPDATED Dependency

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [paper?.feedbacks]);

  // --- Handlers ---

  const handleReviewFormChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({ ...prev, [name]: value }));
  };

  // --- REMOVED: handleRatingChange is no longer needed ---

  /**
   * Submit or Update the review
   */
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewLoading(true);
    setError(null);
    const wasAlreadySubmitted = isReviewSubmitted;

    try {
      // API Call: POST /api/reviewer/papers/:id/review
      // reviewForm state no longer contains rating, so this is correct.
      await api.post(`/reviewer/papers/${id}/review`, reviewForm);
      // Refresh data to show updated review
      fetchPaperDetails();

      // --- Show success popup ---
      setSuccessMessage(
        wasAlreadySubmitted
          ? "Review updated successfully!"
          : "Review submitted successfully!"
      );
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000); // Hide after 3s
    } catch (err) {
      console.error("Error submitting review:", err);
      setError(
        err.response?.data?.message ||
          "Failed to submit review. Please try again."
      );
    } finally {
      setReviewLoading(false);
    }
  };

  /**
   * Submit a new chat message
   */
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setChatLoading(true);

    try {
      // API Call: POST /api/reviewer/papers/:id/feedback
      await api.post(`/reviewer/papers/${id}/feedback`, {
        message: newMessage,
      });
      setNewMessage("");
      // Refresh data to show new message
      fetchPaperDetails();
    } catch (err) {
      console.error("Error sending feedback:", err);
      setError(
        err.response?.data?.message ||
          "Failed to send message. Please try again."
      );
    } finally {
      setChatLoading(false);
    }
  };

  const breadcrumbActions = (
    <Link
      to="/reviewer/dashboard/papers"
      className="flex items-center text-sm font-semibold text-gray-700 hover:text-[#521028] px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors whitespace-nowrap"
    >
      <FileText className="w-4 h-4 me-1.5" />
      Submitted Papers
    </Link>
  );
  // --- Render ---

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-12 w-12 text-[#521028] animate-spin" />
      </div>
    );
  }

  if (error && !paper) {
    return (
      <>
        <Breadcrumbs actions={breadcrumbActions} />
        <div className="text-center text-red-600 mt-10">
          <AlertTriangle size={40} className="mx-auto mb-2" />
          <h3 className="text-lg font-semibold">Error Loading Paper</h3>
          <p>{error}</p>
          <Link
            to="/reviewer/dashboard/papers"
            className="text-[#521028] font-semibold hover:underline mt-4 inline-block"
          >
            &larr; Back to all papers
          </Link>
        </div>
      </>
    );
  }

  if (!paper) {
    return <Breadcrumbs />; // Should be covered by loading/error
  }

  return (
    <>
    <Breadcrumbs actions={breadcrumbActions} />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column (Paper Info & Review Form) */}
      <div className="lg:col-span-2 space-y-6">
        {/* --- Paper Details Card --- */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <button
            onClick={() => navigate("/reviewer/dashboard/papers")}
            className="text-sm text-[#521028] font-semibold hover:underline mb-3"
          >
            &larr; Back to all papers
          </button>
          <h1 className="text-2xl font-bold text-[#521028]">{paper.title}</h1>
          <p className="text-sm text-gray-500 mt-2">
            <strong>Submitted On:</strong> {formatDate(paper.submittedAt)}
          </p>
          <p className="text-sm text-gray-500">
            <strong>Keywords:</strong> {paper.keywords || "N/A"}
          </p>
          {paper.fileUrl && (
            <a
              href={paper.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-[#521028] font-semibold hover:underline"
            >
              <Download size={16} /> View/Download Paper PDF
            </a>
          )}
        </div>

        {/* --- Abstract Card --- */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-[#521028] mb-4">
            <BookOpen size={20} className="inline-block mr-2" />
            Abstract
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
            {paper.abstract || "No abstract provided."}
          </p>
        </div>

        {/* --- CHANGED: Author Info Card --- */}
        {paper.author && (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#521028] mb-4">
              <Users size={20} className="inline-block mr-2" />
              Author Information
            </h3>
            {/* Submitter Info (Kept blind) */}
            <div className="mb-4">
              <h4 className="text-base font-semibold text-gray-800 mb-1">
                Submitter
              </h4>
              <p className="text-sm text-gray-700">
                {paper.author.firstName} {paper.author.lastName}
                <br />
                <span className="text-xs text-gray-500">
                  {paper.author.affiliation || "No affiliation listed"}
                </span>
              </p>
            </div>

            {/* --- CHANGED: Reads from `paper.authors` --- */}
            {paper.authors && paper.authors.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="text-base font-semibold text-gray-800 mb-2">
                  All Authors
                </h4>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {paper.authors.map((author) => (
                    <li key={author.id}>
                      {author.salutation} {author.name}
                      {author.institute && (
                        <span className="text-xs text-gray-500">
                          {" "}
                          ({author.institute})
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* --- Review Form Card --- */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-[#521028] mb-4">
            <Edit size={20} className="inline-block mr-2" />
            {isReviewSubmitted ? "Update Your Review" : "Submit Your Review"}
          </h3>
          {isReviewSubmitted && (
            <div className="bg-blue-50 text-blue-800 p-3 rounded-md text-sm mb-4">
              You have already submitted a review for this paper. You can update
              and resubmit it below.
            </div>
          )}
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            {/* --- REMOVED: Rating section --- */}

            {/* Recommendation */}
            <div>
              <label
                htmlFor="recommendation"
                className="block text-sm font-semibold text-gray-700"
              >
                Recommendation
              </label>
              <select
                id="recommendation"
                name="recommendation"
                value={reviewForm.recommendation}
                onChange={handleReviewFormChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#521028] focus:outline-none"
              >
                {RECOMMENDATION_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>

            {/* Comments */}
            <div>
              <label
                htmlFor="comments"
                className="block text-sm font-semibold text-gray-700"
              >
                Comments for the Author
              </label>
              <textarea
                id="comments"
                name="comments"
                rows="8"
                value={reviewForm.comments}
                onChange={handleReviewFormChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#521028] focus:outline-none"
                placeholder="Provide constructive feedback for the author..."
                required
              />
            </div>

            {/* --- Success Popup --- */}
            {showSuccessPopup && (
              <div className="bg-green-100 border border-green-300 text-green-800 p-3 rounded-md text-sm mb-4 flex items-center gap-2">
                <CheckCircle size={18} />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Error for review form */}
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={reviewLoading}
              className="w-full bg-[#521028] text-white font-semibold py-2.5 rounded-md hover:bg-[#6b1b3a] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {reviewLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  {isReviewSubmitted ? "Update Review" : "Submit Review"}
                  <CheckCircle size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right Column (Chat) */}
      <div className="lg:col-span-1">
        <div className="bg-white shadow-lg rounded-lg flex flex-col h-[80vh] max-h-[800px]">
          <div className="border-b p-4 bg-[#521028] text-white rounded-t-lg">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <MessageSquare size={20} />
              Author Feedback Chat
            </h2>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {paper.feedbacks && paper.feedbacks.length > 0 ? (
              paper.feedbacks.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[85%] w-fit p-3 rounded-lg text-sm ${
                    msg.sender.id === user?.id
                      ? "bg-[#521028] text-white ml-auto" // Reviewer's message
                      : "bg-gray-100 text-gray-800" // Author's message
                  }`}
                >
                  <p className="font-semibold text-xs mb-1">
                    {msg.sender.firstName} {msg.sender.lastName} (
                    {msg.sender.role})
                  </p>
                  <p>{msg.message}</p>
                  <p
                    className={`text-[10px] mt-1 text-right ${
                      msg.sender.id === user?.id
                        ? "text-gray-300"
                        : "text-gray-500"
                    }`}
                  >
                    {formatDate(msg.sentAt)}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 text-sm p-4">
                No feedback has been exchanged yet.
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Message Input */}
          <form
            onSubmit={handleFeedbackSubmit}
            className="border-t p-3 flex items-center gap-2"
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#521028]"
            />
            <button
              type="submit"
              disabled={chatLoading}
              className="bg-[#521028] text-white p-2 rounded-md hover:bg-[#6b1b3a] disabled:opacity-70"
            >
              {chatLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default ReviewerPaperDetails;