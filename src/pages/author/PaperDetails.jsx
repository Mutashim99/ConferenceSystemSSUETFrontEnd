import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import useAuthStore from "../../store/authStore"; 
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
  Download,
  CheckCircle, // <-- NEW
  DollarSign // <-- NEW
} from "lucide-react";
import api from "../../api/axios"; 
import Breadcrumbs from "../../components/Breadcrumbs"; 

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

const PaperDetails = () => {
  const { id } = useParams();
  const [paperData, setPaperData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showResubmit, setShowResubmit] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const chatEndRef = useRef(null);
  const { user } = useAuthStore();
  const currentUserId = user?.id;

  // --- Data Fetching ---
  const fetchPaper = useCallback(async () => {
    try {
      if (!paperData) setLoading(true);

      const res = await api.get(`/author/papers/${id}`);
      setPaperData(res.data);

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
      if (loading) setLoading(false);
    }
  }, [id, paperData, loading]); 

  useEffect(() => {
    fetchPaper();
  }, [id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [paperData?.feedbacks]);

  // --- Handlers ---
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending || !user) {
      return;
    }

    setIsSending(true);
    try {
      await api.post(`/author/papers/${id}/feedback`, {
        message: newMessage,
      });

      setNewMessage("");
      fetchPaper();
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setIsSending(false);
    }
  };

  const breadcrumbActions = (
    <Link
      to="/author/dashboard/papers"
      className="flex items-center text-sm font-semibold text-gray-700 hover:text-[#447E36] px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors whitespace-nowrap"
    >
      <FileText className="w-4 h-4 me-1.5" />
      Submitted Papers
    </Link>
  );

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
      try {
        await api.post(`/author/papers/${id}/resubmit`, formData);
        setUploadSuccess(
          "Revision submitted successfully! Status will update shortly."
        );
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = null;
        setTimeout(fetchPaper, 1000);
      } catch (err) {
        setUploadError(err.response?.data?.message || "Resubmission failed.");
      } finally {
        setIsUploading(false);
      }
    };

    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md space-y-3">
        <h3 className="text-lg font-semibold text-yellow-800">
          Action Required: Submit Revision
        </h3>
        <p className="text-sm text-yellow-700">
          Your paper requires revision. Please upload the updated PDF file
          below.
        </p>

        {!file ? (
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
              <FileText className="h-5 w-5 text-[#521028] shrink-0" />
              <span className="text-sm font-medium text-gray-800 truncate">
                {file.name}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setFile(null);
                if (fileInputRef.current) fileInputRef.current.value = null;
              }}
              className="p-1 text-red-600 rounded-full hover:bg-red-100 shrink-0"
            >
              <X size={20} />
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={handleResubmit}
          disabled={!file || isUploading}
          className="w-full btn-green text-white font-semibold py-2 px-4 rounded-md  disabled:opacity-50 flex justify-center items-center"
        >
          {isUploading ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            "Upload Revision"
          )}
        </button>
        {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}
        {uploadSuccess && (
          <p className="text-sm text-green-600">{uploadSuccess}</p>
        )}
      </div>
    );
  };

  // --- NEW: Camera Ready Upload Component ---
  const CameraReadySection = () => {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const f = e.target.files?.[0];
        // Allow DOC/DOCX/PDF for final versions usually
        if (f) {
          setFile(f);
          setUploadError(null);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true);
        setUploadError(null);
        setUploadSuccess(null);

        const formData = new FormData();
        // IMPORTANT: Must match backend key 'cameraReady'
        formData.append("cameraReady", file); 

        try {
            await api.post(`/author/papers/${id}/camera-ready`, formData);
            setUploadSuccess("Camera ready version uploaded successfully!");
            setFile(null);
            setTimeout(fetchPaper, 1000); // Refresh data to show new link
        } catch (err) {
            console.error(err);
            setUploadError(err.response?.data?.message || "Upload failed");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-md space-y-4 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-bold text-green-800 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5"/> Paper Accepted!
                    </h3>
                    <p className="text-sm text-green-700 mt-1">
                        Congratulations! Your paper has been accepted. Please upload the <strong>Camera Ready</strong> version for the final proceedings.
                    </p>
                </div>
            </div>

            {/* If a file already exists, show it */}
            {paperData.cameraReadyUrl && (
                 <div className="bg-white p-3 rounded border border-green-200 flex items-center justify-between">
                    <span className="text-sm text-gray-600 font-medium flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-600"/>
                        Current Version Uploaded
                    </span>
                    <a
                        href={paperData.cameraReadyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-green-700 font-bold hover:underline flex items-center gap-1"
                    >
                        <Download size={14} /> Download
                    </a>
                 </div>
            )}

            <div className="pt-2 border-t border-green-200">
                <p className="text-xs font-semibold text-green-800 uppercase mb-2">
                    {paperData.cameraReadyUrl ? "Upload New Version (Overwrites old one)" : "Upload Final File"}
                </p>
                
                <div className="flex gap-2 items-center">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-green-100 file:text-green-700
                            hover:file:bg-green-200
                        "
                    />
                    {file && (
                        <button 
                            onClick={handleUpload}
                            disabled={isUploading}
                            className="bg-green-700 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-800 disabled:opacity-50"
                        >
                            {isUploading ? <Loader2 className="animate-spin h-4 w-4"/> : "Upload"}
                        </button>
                    )}
                </div>
                {uploadError && <p className="text-sm text-red-600 mt-2">{uploadError}</p>}
                {uploadSuccess && <p className="text-sm text-green-700 font-bold mt-2">{uploadSuccess}</p>}
            </div>
        </div>
    );
  };

  // --- Render Logic ---
  if (loading && !paperData) {
    return (
      <>
        <Breadcrumbs actions={breadcrumbActions} />
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-16 w-16 text-[#521028] animate-spin" />
          <p className="ml-4 text-xl text-gray-600">Loading paper details...</p>
        </div>
      </>
    );
  }

  if (error || !paperData) {
    return (
      <>
        <Breadcrumbs actions={breadcrumbActions} />
        <div className="flex flex-col justify-center items-center h-64 text-red-600">
          <AlertTriangle className="h-16 w-16 mb-4" />
          <p className="text-2xl font-semibold">{error || "No paper found."}</p>
          <Link
            to="/author/dashboard/papers"
            className="mt-4 text-lg text-blue-600 hover:underline"
          >
            &larr; Back to my papers
          </Link>
        </div>
      </>
    );
  }

  const {
    title,
    abstract,
    fileUrl,
    keywords,
    status,
    paymentStatus, // <-- NEW
    submittedAt,
    authors, 
    reviews,
    feedbacks,
  } = paperData;

  return (
    <>
      <Breadcrumbs actions={breadcrumbActions} />
      <div className="flex flex-col p-3.5 lg:flex-row gap-6">
        {/* LEFT: Paper Details */}
        <div className="flex-1 space-y-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-3xl font-bold text-black mb-4">{title}</h1>
            <div className="flex flex-wrap gap-4 items-center">
              <span
                className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusClass(
                  status
                )}`}
              >
                {status.replace(/_/g, " ")}
              </span>
              
              {/* Payment Status Badge */}
              <span className={`px-3 py-1 text-sm font-bold border rounded flex items-center gap-1 ${getPaymentClass(paymentStatus)}`}>
                  <DollarSign size={14}/> Fees: {paymentStatus || "UNPAID"}
              </span>

              <span className="text-sm text-gray-600">
                <strong>Submitted On:</strong> {formatDate(submittedAt)}
              </span>
              {fileUrl && (
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[#447E36] font-semibold hover:underline"
                >
                  <Download size={18} /> View Paper PDF
                </a>
              )}
            </div>
          </div>

          {/* Conditional Rendering: Resubmit OR Camera Ready */}
          {showResubmit && <ResubmissionSection />}
          
          {/* --- NEW: Show Camera Ready Section only if Accepted --- */}
          {status === 'ACCEPTED' && <CameraReadySection />}

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-[#521028] mb-3 flex items-center gap-2">
              <BookOpen size={20} /> Abstract
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {abstract}
            </p>
            <p className="text-sm text-gray-600 mt-4">
              <strong>Keywords:</strong> {keywords}
            </p>
          </div>

          {authors?.length > 0 && (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-[#521028] mb-3 flex items-center gap-2">
                <Users size={20} /> Authors
              </h2>
              <ul className="list-none pl-0 text-sm text-gray-700 space-y-2">
                {authors.map((author) => (
                  <li
                    key={author.id}
                    className="border-t pt-2 first:border-t-0"
                  >
                    <span className="font-semibold">
                      {author.salutation} {author.name}
                    </span>
                    {author.isCorresponding && (
                      <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded">
                        Corresponding
                      </span>
                    )}
                    <br />
                    <span className="text-xs text-gray-500">
                      {author.email}
                    </span>
                    <br />
                    <span className="text-xs text-gray-500">
                      {author.institute || "No institute"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

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
                    <h3 className="font-semibold text-gray-800">
                      Review {index + 1}
                    </h3>
                    <p className="text-gray-700 mt-2 whitespace-pre-wrap">
                      {review.comments}
                    </p>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm">
                      <p className="text-gray-600">
                        <strong>Recommendation:</strong>
                        <span
                          className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                            review.recommendation
                          )}`}
                        >
                          {review.recommendation.replace(/_/g, " ")}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">
                No reviews have been submitted yet.
              </p>
            )}
          </div>
        </div>

        {/* --- RIGHT: Chat Sidebar --- */}
        <div className="w-full lg:w-[35%] lg:max-w-md">
          <div
            className={`bg-white shadow-lg rounded-lg flex flex-col transition-all duration-300 overflow-hidden 
      ${isCollapsed ? "h-14" : "h-96 lg:h-[80vh]"} 
      lg:sticky lg:top-24`}
          >
            {/* Header with collapse toggle */}
            <div className="border-b p-4 bg-[#521028] text-white rounded-t-lg flex justify-between items-center">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <MessageSquare size={20} />
                Feedback & Chat
              </h2>

              {/* Toggle Button */}
              <button
                type="button"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-white hover:text-gray-200 transition"
              >
                {isCollapsed ? "▲" : "▼"}
              </button>
            </div>

            {/* Content area (only show when not collapsed) */}
            {!isCollapsed && (
              <>
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {feedbacks?.length === 0 && (
                    <div className="text-center text-gray-500 pt-10">
                      <MessageSquare size={40} className="mx-auto mb-2" />
                      No feedback messages yet.
                    </div>
                  )}

                  {feedbacks.map((msg, index) => {
                    const isMyMessage = msg.sender.id === currentUserId;

                    return (
                      <div
                        key={msg.id || index}
                        className={`flex flex-col ${
                          isMyMessage ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`max-w-[85%] w-fit p-3 rounded-lg text-sm ${
                            isMyMessage
                              ? "bg-[#521028] text-white rounded-br-none"
                              : "bg-gray-100 text-gray-800 rounded-bl-none"
                          }`}
                        >
                          <p className="font-semibold text-xs mb-1">
                            {msg.sender?.firstName} {msg.sender?.lastName} (
                            {msg.sender?.role})
                          </p>
                          <p className="whitespace-pre-wrap">{msg.message}</p>
                          <p
                            className={`text-[10px] mt-1 text-right ${
                              isMyMessage ? "text-gray-300" : "text-gray-500"
                            }`}
                          >
                            {formatDate(msg.sentAt)}
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
                    disabled={isSending || !newMessage.trim()}
                    className="btn-green text-white p-2.5 rounded-md disabled:opacity-50"
                  >
                    {isSending ? (
                      <Loader2 className="animate-spin h-5 w-5" />
                    ) : (
                      <Send size={20} />
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PaperDetails;