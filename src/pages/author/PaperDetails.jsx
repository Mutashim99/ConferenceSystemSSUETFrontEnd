
import DashboardLayout from "../../components/DashboardLayout";
import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import useAuthStore from "../../store/authStore"
import {
  Loader2,
  AlertTriangle,
  FileText,
  Users,
  MessageSquare,
  BookOpen,
  Send,
  UploadCloud,
  Paperclip,
  X,
} from "lucide-react";
import api from "../../api/axios";

const formatDate = (dateString, options = {}) => {
  const {
    year = "numeric",
    month = "long",
    day = "numeric",
  } = options;
  return new Date(dateString).toLocaleDateString("en-US", {
    year,
    month,
    day,
    ...options,
  });
};

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
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

const PaperDetails = () => {
  const { id } = useParams();
  const [paperData, setPaperData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showResubmit, setShowResubmit] = useState(false);
  
  const chatEndRef = useRef(null);
  
  // FIX 1: Get user from the store hook, not getState on create
  // This assumes the user is fetched and available in the store
  const { user } = useAuthStore(); 
  const currentUserId = user?.id;

  // --- Data Fetching ---
  const fetchPaper = useCallback(async () => {
    try {
      // Ensure loading is true when fetching
      if (!loading) setLoading(true); // Only set loading if not already loading
      const res = await api.get(`/author/papers/${id}`);
      setPaperData(res.data);

      // Check if paper status requires revision
      const revisionStatuses = [
        "REVISION_REQUIRED",
        "MINOR_REVISION",
        "MAJOR_REVISION",
      ];
      if (revisionStatuses.includes(res.data.status)) {
        setShowResubmit(true);
      } else {
        setShowResubmit(false);
      }
      
    } catch (err) {
      console.error("Error fetching paper:", err);
      setError(err.response?.data?.message || "Failed to load paper details.");
    } finally {
      setLoading(false);
    }
  }, [id, loading]); // Added loading dependency

  // Initial load
  useEffect(() => {
    fetchPaper();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // Only run on ID change

  // Auto-refresh chat messages every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) { // Only refetch if not already loading
        fetchPaper();
      }
    }, 15000); // 15 seconds
    
    return () => clearInterval(interval);
  }, [fetchPaper, loading]);


  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [paperData?.feedbacks]);

  // --- Handlers ---
  const handleSendMessage = async (e) => {
    e.preventDefault();
    // Add check for user object
    if (!newMessage.trim() || isSending || !user) {
      if (!user) console.error("Cannot send message: User not loaded.");
      return;
    }

    setIsSending(true);
    try {
      // Send the new message
      const res = await api.post(`/author/papers/${id}/feedback`, {
        message: newMessage,
      });

      // FIX 2: Manually construct the sender object for optimistic update
      // The POST response (res.data) likely doesn't include the nested `sender` object.
      const newFeedbackMessage = {
        ...res.data, // This is the new feedback { id, message, senderId, etc. }
        sender: {   // We add the sender object ourselves
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        }
      };

      // Optimistically update the UI with the *complete* object
      setPaperData(prevData => ({
        ...prevData,
        feedbacks: [...prevData.feedbacks, newFeedbackMessage]
      }));
      setNewMessage("");

    } catch (err) {
      console.error("Error sending message:", err);
      // You could set a specific chat error here
    } finally {
      setIsSending(false);
    }
  };
  
  // --- Resubmission Component ---
  const ResubmissionSection = () => {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
      const f = e.target.files?.[0];
      if (f && f.type === "application/pdf") {
        setFile(f);
        setUploadError(null);
      } else {
        setFile(null);
        setUploadError("Please select a PDF file.");
      }
    };
    
    const handleResubmit = async () => {
      if (!file) {
        setUploadError("Please select a file to resubmit.");
        return;
      }
      
      setIsUploading(true);
      setUploadError(null);
      setUploadSuccess(null);
      
      const formData = new FormData();
      formData.append("paper", file);
      console.log(formData);
      
      try {
        await api.post(`/author/papers/${id}/resubmit`, formData);
        setUploadSuccess("Revision submitted successfully! Status will update shortly.");
        setFile(null);
        if(fileInputRef.current) fileInputRef.current.value = null;
        // Re-fetch paper to update status and file URL
        setTimeout(fetchPaper, 1000); // Give server a second, then refetch
      } catch (err) {
        setUploadError(err.response?.data?.message || "Resubmission failed.");
      } finally {
        setIsUploading(false);
      }
    };

    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md space-y-3">
        <h3 className="text-lg font-semibold text-yellow-800">Action Required: Submit Revision</h3>
        <p className="text-sm text-yellow-700">
          Your paper requires revision. Please upload the updated PDF file below.
        </p>
        
        { !file ? (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex justify-center items-center space-x-2 px-4 py-3 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-gray-400"
          >
            <Paperclip className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Select your revised PDF
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="sr-only"
            />
          </button>
        ) : (
          <div className="flex items-center justify-between p-3 bg-gray-100 border border-gray-300 rounded-md">
            <div className="flex items-center space-x-2 overflow-hidden">
              <FileText className="h-5 w-5 text-[#521028] flex-shrink-0" />
              <span className="text-sm font-medium text-gray-800 truncate">
                {file.name}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setFile(null);
                if(fileInputRef.current) fileInputRef.current.value = null;
              }}
              className="p-1 text-red-600 rounded-full hover:bg-red-100 flex-shrink-0"
            >
              <X size={20} />
            </button>
          </div>
        )}
        
        <button
          type="button"
          onClick={handleResubmit}
          disabled={!file || isUploading}
          className="w-full bg-[#521028] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#6b1b3a] disabled:opacity-50 flex justify-center items-center"
        >
          {isUploading ? <Loader2 className="animate-spin h-5 w-5" /> : "Upload Revision"}
        </button>
        {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}
        {uploadSuccess && <p className="text-sm text-green-600">{uploadSuccess}</p>}
      </div>
    );
  };
  

  // --- Render Logic ---
  if (loading && !paperData) { // Only show full loading on first load
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-16 w-16 text-[#521028] animate-spin" />
          <p className="ml-4 text-xl text-gray-600">Loading paper details...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !paperData) {
    return (
      <DashboardLayout>
        <div className="flex flex-col justify-center items-center h-64 text-red-600">
          <AlertTriangle className="h-16 w-16 mb-4" />
          <p className="text-2xl font-semibold">{error || "No paper found."}</p>
          <Link to="/author/dashboard/papers" className="mt-4 text-lg text-blue-600 hover:underline">
            &larr; Back to my papers
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const { title, abstract, fileUrl, keywords, status, submittedAt, coAuthors, reviews, feedbacks } = paperData;

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* LEFT: Paper Details */}
        <div className="flex-1 space-y-6">
          
          {/* Header */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-3xl font-bold text-[#521028] mb-4">
              {title}
            </h1>
            <div className="flex flex-wrap gap-4 items-center">
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusClass(status)}`}>
                {status.replace(/_/g, " ")}
              </span>
              <span className="text-sm text-gray-600">
                <strong>Submitted On:</strong> {formatDate(submittedAt)}
              </span>
              {fileUrl && (
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[#521028] font-semibold hover:underline"
                >
                  <FileText size={18} /> View Paper PDF
                </a>
              )}
            </div>
          </div>
          
          {/* Resubmission Section (Conditional) */}
          {showResubmit && <ResubmissionSection />}
          
          {/* Abstract */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-[#521028] mb-3 flex items-center gap-2">
              <BookOpen size={20} /> Abstract
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{abstract}</p>
            <p className="text-sm text-gray-600 mt-4">
              <strong>Keywords:</strong> {keywords}
            </p>
          </div>

          {/* Co-Authors */}
          {coAuthors?.length > 0 && (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-[#521028] mb-3 flex items-center gap-2">
                <Users size={20} /> Authors
              </h2>
              <ul className="list-disc ml-5 text-gray-700 space-y-1">
                {coAuthors.map((co, index) => (
                  <li key={co.id || index}>
                    {co.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Reviews */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-[#521028] mb-3 flex items-center gap-2">
              <MessageSquare size={20} /> Reviews
            </h2>
            {reviews?.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div
                    key={review.id || index}
                    className="p-4 border border-gray-200 rounded-md"
                  >
                    <h3 className="font-semibold text-gray-800">Review {index + 1}</h3>
                    <p className="text-gray-700 mt-2 whitespace-pre-wrap">{review.comments}</p>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm">
                      <p className="text-gray-600">
                        <strong>Rating:</strong> {review.rating} / 10
                      </p>
                      <p className="text-gray-600">
                        <strong>Recommendation:</strong>
                        <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClass(review.recommendation)}`}>
                          {review.recommendation.replace(/_/g, " ")}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews have been submitted yet.</p>
            )}
          </div>
        </div>

        {/* RIGHT: Chat Sidebar */}
        <div className="w-full lg:w-[35%] lg:max-w-md">
          <div className="bg-white shadow-lg rounded-lg flex flex-col h-[80vh] sticky top-24">
            <div className="border-b p-4 bg-gray-50 rounded-t-lg">
              <h2 className="font-semibold text-lg text-[#521028]">
                Feedback & Chat
              </h2>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {feedbacks?.length === 0 && (
                <div className="text-center text-gray-500 pt-10">
                  <MessageSquare size={40} className="mx-auto mb-2" />
                  No feedback messages yet.
                </div>
              )}
              {feedbacks.map((msg, index) => {
                const isAuthor = msg.senderId === currentUserId;
                return (
                  <div
                    key={msg.id || index}
                    className={`flex flex-col ${
                      isAuthor ? "items-end" : "items-start"
                    }`}
                  >
                    {/* FIX 3: Optional chaining to prevent crash if sender is missing */ }
                    <span className="text-xs font-medium text-gray-500 px-1">
                      {msg.sender?.firstName} {msg.sender?.lastName}
                    </span>
                    <div
                      className={`max-w-[85%] p-3 rounded-lg text-sm ${
                        isAuthor
                          ? "bg-[#521028] text-white rounded-br-none"
                          : "bg-gray-200 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.message}</p>
                      <p className="text-[10px] mt-1 text-right opacity-70">
                        {formatTime(msg.sentAt)}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleSendMessage}
              className="border-t p-3 flex items-center gap-2 bg-gray-50 rounded-b-lg"
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
                disabled={isSending || !newMessage.trim()}
                className="bg-[#521028] text-white p-2.5 rounded-md hover:bg-[#6b1b3a] disabled:opacity-50"
              >
                {isSending ? <Loader2 className="animate-spin h-5 w-5" /> : <Send size={20} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};


export default PaperDetails;
