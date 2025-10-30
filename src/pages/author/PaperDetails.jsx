import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

const PaperDetails = () => {
  const { id } = useParams();
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Dummy data simulating your backend
    const fetchPaper = async () => {
      setLoading(true);
      try {
        const dummyData = {
          id: parseInt(id),
          title: "My Test Paper",
          abstract:
            "This is the abstract of the paper. It explains the research topic and main contributions briefly for reviewers.",
          fileUrl:
            "https://res.cloudinary.com/ddekxztzz/raw/upload/v1761841414/conference_papers/sample-paper.pdf",
          keywords: "testing, api, conference",
          topicArea: "Artificial Intelligence",
          status: "UNDER_REVIEW",
          submittedAt: "2025-10-30T16:23:34.655Z",
          authorId: 3,
          coAuthors: [
            {
              id: 1,
              paperId: 1,
              name: "Co-author Jane",
              email: "jane@example.com",
              affiliation: "University of Testing",
            },
          ],
          reviews: [
            {
              id: 1,
              comments:
                "This is a great paper, but it needs minor revisions on the methodology section.",
              rating: 5,
              recommendation: "MINOR_REVISION",
              reviewedAt: "2025-10-30T17:36:28.749Z",
            },
          ],
        };

        const dummyMessages = [
          {
            id: 1,
            sender: "Reviewer",
            message:
              "Hello, please review your paper again. I have added comments on methodology.",
            time: "2025-10-31T12:30:00.000Z",
          },
          {
            id: 2,
            sender: "Author",
            message:
              "Thank you! I’ve updated the methodology as per your feedback.",
            time: "2025-10-31T13:15:00.000Z",
          },
        ];

        setTimeout(() => {
          setPaper(dummyData);
          setMessages(dummyMessages);
          setLoading(false);
        }, 700);
      } catch (err) {
        console.error("Error fetching paper:", err);
        setLoading(false);
      }
    };

    fetchPaper();
  }, [id]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      sender: "Author",
      message: newMessage,
      time: new Date().toISOString(),
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-center text-gray-600 mt-10">
          Loading paper details...
        </p>
      </DashboardLayout>
    );
  }

  if (!paper) {
    return (
      <DashboardLayout>
        <p className="text-center text-gray-600 mt-10">No paper found.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT: Paper Details */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-6 space-y-6">
          <h1 className="text-2xl font-bold text-[#521028] mb-4">
            {paper.title}
          </h1>

          {/* Basic Info */}
          <section>
            <h2 className="text-lg font-semibold text-[#521028] mb-2">
              Paper Information
            </h2>
            <p>
              <strong>Status:</strong> {paper.status}
            </p>
            <p>
              <strong>Keywords:</strong> {paper.keywords}
            </p>
            <p>
              <strong>Submitted On:</strong>{" "}
              {new Date(paper.submittedAt).toLocaleDateString()}
            </p>
            {paper.fileUrl && (
              <a
                href={paper.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 text-[#521028] font-semibold hover:underline"
              >
                📄 View Paper PDF
              </a>
            )}
          </section>

          {/* Abstract */}
          <section>
            <h2 className="text-lg font-semibold text-[#521028] mb-2">
              Abstract
            </h2>
            <p className="text-gray-700 leading-relaxed">{paper.abstract}</p>
          </section>

          {/* Co-Authors */}
          {paper.coAuthors?.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-[#521028] mb-2">
                Co-Authors
              </h2>
              <ul className="list-disc ml-5 text-gray-700">
                {paper.coAuthors.map((co) => (
                  <li key={co.id}>
                    {co.name}{" "}
                    {co.affiliation && (
                      <span className="text-sm text-gray-500">
                        — {co.affiliation}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Reviews */}
          {paper.reviews?.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-[#521028] mb-2">
                Reviews
              </h2>
              {paper.reviews.map((review) => (
                <div
                  key={review.id}
                  className="p-3 border border-gray-200 rounded-md mb-2"
                >
                  <p className="text-gray-700">{review.comments}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Rating:</strong> {review.rating} / 5
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Recommendation:</strong> {review.recommendation}
                  </p>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* RIGHT: Chat Sidebar */}
        <div className="w-full lg:w-[30%] bg-white shadow-md rounded-lg flex flex-col h-[75vh]">
          <div className="border-b p-4 bg-[#521028] text-white rounded-t-lg">
            <h2 className="font-semibold text-lg">Reviewer Chat</h2>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  msg.sender === "Author"
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
                <p>
                  {msg.sender.firstName} {msg.sender.lastName}
                </p>
              </div>
            ))}
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
              className="bg-[#521028] text-white px-4 py-2 rounded-md hover:bg-[#6b1b3a]"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PaperDetails;
