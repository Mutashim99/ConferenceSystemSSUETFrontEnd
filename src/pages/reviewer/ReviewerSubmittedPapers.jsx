import React, { useEffect, useState } from "react";
import ReviewerLayout from "../../components/ReviewerLayout";

const ReviewerSubmittedPapers = () => {
  const [papers, setPapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    comments: "",
    rating: "",
    recommendation: "",
  });

  // Fetch assigned papers
  useEffect(() => {
    const fetchAssignedPapers = async () => {
      setLoading(true);
      const dummyResponse = [
        {
          id: 1,
          title: "AI in Education",
          abstract: "This paper explores how AI transforms education...",
          fileUrl:
            "https://res.cloudinary.com/ddekxztzz/raw/upload/v1761841414/conference_papers/sample.pdf",
          keywords: "AI, Education, Technology",
          author: { firstName: "Jane", lastName: "Doe" },
          status: "UNDER_REVIEW",
          assignedAt: "2025-10-30T16:30:00Z",
        },
        {
          id: 2,
          title: "Blockchain Security",
          abstract: "An analysis of blockchain vulnerabilities...",
          fileUrl:
            "https://res.cloudinary.com/ddekxztzz/raw/upload/v1761841414/conference_papers/sample.pdf",
          keywords: "Blockchain, Security, Cryptography",
          author: { firstName: "John", lastName: "Smith" },
          status: "UNDER_REVIEW",
          assignedAt: "2025-10-31T10:15:00Z",
        },
      ];
      setTimeout(() => {
        setPapers(dummyResponse);
        setLoading(false);
      }, 600);
    };
    fetchAssignedPapers();
  }, []);

  // Handle view paper
  const handleViewPaper = (paperId) => {
    const paper = papers.find((p) => p.id === paperId);
    setSelectedPaper(paper);

    const dummyMessages = [
      {
        id: 1,
        sender: "Reviewer",
        message:
          "Hello, I’ve reviewed your paper. Please clarify the methodology section.",
        time: "2025-10-31T12:30:00.000Z",
      },
      {
        id: 2,
        sender: "Author",
        message:
          "Sure! I’ll provide an updated explanation and resubmit shortly.",
        time: "2025-10-31T13:00:00.000Z",
      },
    ];

    setMessages(dummyMessages);
  };

  // Handle send message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      sender: "Reviewer",
      message: newMessage,
      time: new Date().toISOString(),
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  // Handle review modal submit
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (
      !reviewData.comments ||
      !reviewData.rating ||
      !reviewData.recommendation
    ) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    console.log("POST /reviewer/papers/:id/review", reviewData);
    alert("Review submitted successfully!");
    setShowModal(false);
    setReviewData({ comments: "", rating: "", recommendation: "" });
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-[#521028] mb-6">
        Submitted Papers
      </h1>

      {/* ===================== Paper List View ===================== */}
      {!selectedPaper && (
        <>
          {loading ? (
            <p className="text-gray-600 text-center mt-10">
              Loading your assigned papers...
            </p>
          ) : (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-[#521028] text-white">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Author</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Assigned On</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {papers.map((paper) => (
                    <tr
                      key={paper.id}
                      className="border-b hover:bg-gray-100 transition"
                    >
                      <td className="p-3">{paper.id}</td>
                      <td className="p-3 font-medium">{paper.title}</td>
                      <td className="p-3">
                        {paper.author.firstName} {paper.author.lastName}
                      </td>
                      <td className="p-3">{paper.status}</td>
                      <td className="p-3">
                        {new Date(paper.assignedAt).toLocaleDateString()}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleViewPaper(paper.id)}
                          className="text-[#521028] font-semibold hover:underline"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* ===================== Paper Detail + Chat View ===================== */}
      {selectedPaper && (
        <div className="flex flex-col lg:flex-row gap-6 animate-fadeIn">
          {/* LEFT: Paper Details */}
          <div className="flex-1 bg-white shadow-md rounded-lg p-6 space-y-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-[#521028]">
                {selectedPaper.title}
              </h2>
              <button
                onClick={() => setSelectedPaper(null)}
                className="text-sm text-[#521028] font-semibold hover:underline"
              >
                ← Back to list
              </button>
            </div>

            <section>
              <p>
                <strong>Status:</strong> {selectedPaper.status}
              </p>
              <p>
                <strong>Keywords:</strong> {selectedPaper.keywords}
              </p>
              <p>
                <strong>Author:</strong> {selectedPaper.author.firstName}{" "}
                {selectedPaper.author.lastName}
              </p>
              <p>
                <strong>Assigned On:</strong>{" "}
                {new Date(selectedPaper.assignedAt).toLocaleDateString()}
              </p>
              {selectedPaper.fileUrl && (
                <a
                  href={selectedPaper.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-2 text-[#521028] font-semibold hover:underline"
                >
                  📄 View Paper PDF
                </a>
              )}
            </section>

            <section>
              <h3 className="text-lg font-semibold text-[#521028] mb-1">
                Abstract
              </h3>
              <p className="text-gray-700 mb-4">{selectedPaper.abstract}</p>

              {/* Submit Final Review Button */}
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#521028] text-white px-5 py-2 rounded-md hover:bg-[#6b1b3a] transition"
              >
                📝 Submit Final Review
              </button>
            </section>
          </div>

          {/* RIGHT: Chat Sidebar */}
          <div className="w-full lg:w-[30%] bg-white shadow-md rounded-lg flex flex-col h-[75vh]">
            <div className="border-b p-4 bg-[#521028] text-white rounded-t-lg">
              <h2 className="font-semibold text-lg">Author Chat</h2>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    msg.sender === "Reviewer"
                      ? "bg-[#521028] text-white self-end ml-auto"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p>{msg.message}</p>
                  <p className="text-[10px] mt-1 text-gray-400 text-right">
                    {new Date(msg.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))}
            </div>

            {/* Chat Input */}
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
                className="bg-[#521028] text-white px-4 py-2 rounded-md hover:bg-[#6b1b3a]"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===================== Review Modal ===================== */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
            <h2 className="text-xl font-bold text-[#521028] text-center">
              Submit Final Review
            </h2>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Comments */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Comments
                </label>
                <textarea
                  value={reviewData.comments}
                  onChange={(e) =>
                    setReviewData({ ...reviewData, comments: e.target.value })
                  }
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#521028]"
                  rows="3"
                  placeholder="Write your feedback..."
                ></textarea>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Rating (1-5)
                </label>
                <select
                  value={reviewData.rating}
                  onChange={(e) =>
                    setReviewData({ ...reviewData, rating: e.target.value })
                  }
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#521028]"
                >
                  <option value="">Select rating</option>
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Recommendation */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Recommendation
                </label>
                <select
                  value={reviewData.recommendation}
                  onChange={(e) =>
                    setReviewData({
                      ...reviewData,
                      recommendation: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#521028]"
                >
                  <option value="">Select</option>
                  <option value="ACCEPTED">Accept</option>
                  <option value="REJECTED">Reject</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#521028] text-white rounded-md hover:bg-[#6b1b3a]"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewerSubmittedPapers;
