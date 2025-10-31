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
  Star,
  CheckCircle,
  Edit,
  Users,
} from "lucide-react";
import api from "../../api/axios";
import ReviewerLayout from "../../components/ReviewerLayout";
import useAuthStore from "../../store/authStore";

// --- Helper Functions & Components ---

/**
 * Formats a date string.
 */

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

// Star rating component
const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex items-center gap-1">
      {/* CHANGE: Updated to 5 stars */}
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={24}
          className={`cursor-pointer ${
            star <= rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
          onClick={() => setRating(star)}
        />
      ))}
      {/* CHANGE: Updated to /5 */}
      <span className="ml-2 font-bold text-lg text-gray-700">{rating}/5</span>
    </div>
  );
};

// --- Main Component ---

const ReviewerPaperDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For the review form
  const [reviewForm, setReviewForm] = useState({
    comments: "",
    rating: 3, // Default rating
    recommendation: "MINOR_REVISION",
  });
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // ADDED
  const [successMessage, setSuccessMessage] = useState(""); // ADDED

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

      // Check if this reviewer has already submitted a review
      if (res.data.myReview) {
        setReviewForm({
          comments: res.data.myReview.comments,
          // CHANGE: Ensure rating is max 5
          rating: Math.max(1, Math.min(5, res.data.myReview.rating)),
          recommendation: res.data.myReview.recommendation,
        });
        setIsReviewSubmitted(true);
      } else {
        // CHANGE: Set default rating to 3
        setReviewForm((prev) => ({ ...prev, rating: 3 }));
        setIsReviewSubmitted(false);
      }
    } catch (err) {
      console.error("Error fetching paper details:", err);
      setError(
        err.response?.data?.message ||
          "Failed to fetch paper details. You may not have access to this paper."
      );
    } finally {
      setLoading(false);
    }
  }, [id, paper]); // Add paper dependency

  useEffect(() => {
    fetchPaperDetails();
  }, [id]); // Only fetch on ID change

  // Poll for chat updates
  useEffect(() => {
    const interval = setInterval(() => {
      fetchPaperDetails();
    }, 15000); // Refetch every 15 seconds
    return () => clearInterval(interval);
  }, [fetchPaperDetails]);

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

  const handleRatingChange = (newRating) => {
    setReviewForm((prev) => ({ ...prev, rating: newRating }));
  };

  /**
   * Submit or Update the review
   */
  // UPDATED Function
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewLoading(true);
    setError(null);
    const wasAlreadySubmitted = isReviewSubmitted; // ADDED: Capture state before submit

    try {
      // API Call: POST /api/reviewer/papers/:id/review
      await api.post(`/reviewer/papers/${id}/review`, reviewForm);
      // Refresh data to show updated review
      fetchPaperDetails();

      // --- ADDED: Show success popup ---
      setSuccessMessage(
        wasAlreadySubmitted
          ? "Review updated successfully!"
          : "Review submitted successfully!"
      );
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000); // Hide after 3s
      // --- END ADDED ---
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
      <ReviewerLayout>
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
      </ReviewerLayout>
    );
  }

  if (!paper) {
    return <ReviewerLayout />; // Should be covered by loading/error
  }

  return (
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

        {/* ADD: Author Info Card */}
        {paper.author && (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#521028] mb-4">
              <Users size={20} className="inline-block mr-2" />
              Author Information
            </h3>
            {/* Main Author */}
            <div className="mb-4">
              <h4 className="text-base font-semibold text-gray-800 mb-1">
                Corresponding Author
              </h4>
              <p className="text-sm text-gray-700">
                {paper.author.firstName} {paper.author.lastName}
                <br />
                <span className="text-xs text-gray-500">
                  {paper.author.email}
                </span>
                <br />
                <span className="text-xs text-gray-500">
                  {paper.author.affiliation || "No affiliation listed"}
                </span>
              </p>
            </div>

            {/* Co-Authors */}
            {paper.coAuthors && paper.coAuthors.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="text-base font-semibold text-gray-800 mb-2">
                  Co-Authors
                </h4>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {paper.coAuthors.map((coAuthor) => (
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
            {/* Rating */}
            <div>
              {/* CHANGE: Updated label */}
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Overall Rating (1-5)
              </label>
              <StarRating
                rating={reviewForm.rating}
                setRating={handleRatingChange}
              />
            </div>

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

            {/* --- ADDED: Success Popup --- */}
            {showSuccessPopup && (
              <div className="bg-green-100 border border-green-300 text-green-800 p-3 rounded-md text-sm mb-4 flex items-center gap-2">
                <CheckCircle size={18} />
                <span>{successMessage}</span>
              </div>
            )}
            {/* --- END ADDED --- */}

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
  );
};

export default ReviewerPaperDetails;