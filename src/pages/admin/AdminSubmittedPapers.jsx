import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";

const AdminSubmittedPapers = () => {
  const [papers, setPapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewLoading, setViewLoading] = useState(false);
  const [reviewers, setReviewers] = useState([]);
  const [selectedReviewers, setSelectedReviewers] = useState([]);

  // Fetch all papers
  useEffect(() => {
    const fetchPapers = async () => {
      setLoading(true);
      try {
        // Dummy data simulating /admin/papers API
        const dummyResponse = [
          {
            id: 1,
            title: "My Test Paper",
            abstract: "This is the abstract...",
            fileUrl:
              "https://res.cloudinary.com/ddekxztzz/raw/upload/v1761841414/conference_papers/sample.pdf",
            keywords: "testing, api, conference",
            topicArea: null,
            status: "UNDER_REVIEW",
            submittedAt: "2025-10-30T16:23:34.655Z",
            authorId: 3,
            author: {
              id: 3,
              firstName: "Test",
              lastName: "Author",
              email: "author@test.com",
            },
            _count: { reviews: 1, assignments: 1 },
          },
        ];

        // Simulate delay
        setTimeout(() => {
          setPapers(dummyResponse);
          setLoading(false);
        }, 600);
      } catch (err) {
        console.error("Error fetching papers:", err);
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  // Fetch paper by ID
  const handleViewPaper = async (id) => {
    setViewLoading(true);
    try {
      const dummyPaper = {
        id: 1,
        title: "My Test Paper",
        abstract:
          "This is the abstract of the paper. It explains the research topic and main contributions briefly.",
        fileUrl:
          "https://res.cloudinary.com/ddekxztzz/raw/upload/v1761841414/conference_papers/sample.pdf",
        keywords: "testing, api, conference",
        topicArea: "Artificial Intelligence",
        status: "UNDER_REVIEW", // change to PENDING_APPROVAL to test condition
        submittedAt: "2025-10-30T16:23:34.655Z",
        author: {
          id: 3,
          firstName: "Test",
          lastName: "Author",
          email: "author@test.com",
          affiliation: "Test University",
        },
        coAuthors: [
          {
            id: 1,
            name: "Co-author Jane",
            affiliation: "Test College",
          },
        ],
        reviews: [
          {
            id: 1,
            comments:
              "This is a great paper, but it needs minor revisions on the methodology section.",
            rating: 5,
            recommendation: "MINOR_REVISION",
            reviewer: {
              id: 8,
              firstName: "Test",
              lastName: "Reviewer",
              email: "reviewer@test.com",
            },
          },
        ],
        feedbacks: [
          {
            id: 1,
            message: "Thank you for the review. I am working on the revisions.",
            sender: {
              firstName: "Test",
              lastName: "Author",
              role: "AUTHOR",
            },
          },
        ],
        assignments: [
          {
            id: 1,
            reviewer: { id: 8, firstName: "Test", lastName: "Reviewer" },
            assignedAt: "2025-10-30T17:34:55.108Z",
          },
        ],
      };

      // Dummy reviewers (for dropdown)
      const dummyReviewers = [
        { id: 8, email: "reviewer1@test.com" },
        { id: 9, email: "reviewer2@test.com" },
        { id: 10, email: "reviewer3@test.com" },
      ];

      // Simulate delay
      setTimeout(() => {
        setSelectedPaper(dummyPaper);
        setReviewers(dummyReviewers);
        setViewLoading(false);
      }, 600);
    } catch (err) {
      console.error("Error fetching paper details:", err);
      setViewLoading(false);
    }
  };

  const handleApprovePaper = async (paperId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to approve this paper for review?"
      );
      if (!confirm) return;

      console.log(`PATCH /admin/papers/${paperId}/approve`);
      alert(
        "Paper approved successfully! It is now ready for reviewer assignment."
      );

      setSelectedPaper((prev) => ({
        ...prev,
        status: "UNDER_REVIEW",
      }));
    } catch (err) {
      console.error("Error approving paper:", err);
      alert("Failed to approve paper. Please try again.");
    }
  };

  const handleFinalStatusChange = async (paperId, newStatus) => {
    if (!newStatus) {
      alert("Please select a status before saving.");
      return;
    }
    const confirm = window.confirm(
      `Are you sure you want to set this paper's final status to "${newStatus}"?`
    );
    if (!confirm) return;

    console.log(`PATCH /admin/papers/${paperId}/status`, { status: newStatus });
    alert(`Paper status updated to "${newStatus}" successfully.`);
    setSelectedPaper((prev) => ({
      ...prev,
      status: newStatus,
    }));
  };

  const handleAssignReviewers = async () => {
    if (!selectedReviewers.length) {
      alert("Please select at least one reviewer.");
      return;
    }

    console.log(
      `POST /admin/papers/${selectedPaper.id}/assign`,
      JSON.stringify({ reviewerIds: selectedReviewers })
    );

    // Simulate assignment update
    const assigned = reviewers.filter((r) => selectedReviewers.includes(r.id));

    setSelectedPaper((prev) => ({
      ...prev,
      assignments: [
        ...(prev.assignments || []),
        ...assigned.map((a) => ({
          id: Math.random(),
          reviewer: {
            id: a.id,
            firstName: "New",
            lastName: "Reviewer",
            email: a.email,
          },
          assignedAt: new Date().toISOString(),
        })),
      ],
    }));

    alert("Reviewer(s) assigned successfully!");
    setSelectedReviewers([]);
  };

  const handleSelectReviewer = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) selected.push(parseInt(options[i].value));
    }
    setSelectedReviewers(selected);
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-[#521028] mb-6">
        Submitted Papers
      </h1>

      {/* Paper Table */}
      {!selectedPaper && (
        <>
          {loading ? (
            <p className="text-center text-gray-600 mt-10">
              Loading submitted papers...
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
                    <th className="p-3">Reviews</th>
                    <th className="p-3">Submitted On</th>
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
                      <td className="p-3 text-center">
                        {paper._count.reviews || 0}
                      </td>
                      <td className="p-3">
                        {new Date(paper.submittedAt).toLocaleDateString()}
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

      {/* Paper Details Section */}
      {selectedPaper && (
        <div className="flex flex-col lg:flex-row gap-6 animate-fadeIn">
          {/* LEFT SIDE */}
          <div className="flex-1 bg-white shadow-md rounded-lg p-6">
            {viewLoading ? (
              <p className="text-gray-600">Loading paper details...</p>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
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

                <p>
                  <strong>Status:</strong> {selectedPaper.status}
                </p>
                <p>
                  <strong>Author:</strong> {selectedPaper.author.firstName}{" "}
                  {selectedPaper.author.lastName} ({selectedPaper.author.email})
                </p>
                <p>
                  <strong>Affiliation:</strong>{" "}
                  {selectedPaper.author.affiliation}
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

                {/* Conditional Rendering */}
                {selectedPaper.status === "PENDING_APPROVAL" && (
                  <section className="mt-8 border-t pt-6">
                    <h3 className="text-lg font-semibold text-[#521028] mb-2">
                      Admin Action
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Approve this paper to allow reviewer assignment.
                    </p>
                    <button
                      onClick={() => handleApprovePaper(selectedPaper.id)}
                      className="bg-[#521028] text-white font-semibold px-5 py-2 rounded-md hover:bg-[#6b1b3a]"
                    >
                      ✅ Approve Paper for Review
                    </button>
                  </section>
                )}

                {selectedPaper.status === "UNDER_REVIEW" && (
                  <section className="mt-8 border-t pt-6">
                    <h3 className="text-lg font-semibold text-[#521028] mb-2">
                      Final Paper Decision
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Set the final decision after review completion.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <select
                        value={selectedPaper.status}
                        onChange={(e) =>
                          setSelectedPaper((prev) => ({
                            ...prev,
                            status: e.target.value,
                          }))
                        }
                        className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-64 focus:ring-2 focus:ring-[#521028]"
                      >
                        <option value="">Select Status</option>
                        <option value="ACCEPTED">ACCEPTED</option>
                        <option value="REJECTED">REJECTED</option>
                        <option value="REVISION_REQUIRED">
                          REVISION_REQUIRED
                        </option>
                      </select>

                      <button
                        onClick={() =>
                          handleFinalStatusChange(
                            selectedPaper.id,
                            selectedPaper.status
                          )
                        }
                        className="bg-[#521028] text-white font-semibold px-5 py-2 rounded-md hover:bg-[#6b1b3a]"
                      >
                        💾 Save Status
                      </button>
                    </div>
                  </section>
                )}
              </>
            )}
          </div>

          {/* RIGHT SIDE — Reviewer Assignment Sidebar */}
          {selectedPaper.status === "UNDER_REVIEW" && (
            <div className="w-full lg:w-[30%] bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#521028] mb-4">
                Assign Reviewers
              </h3>

              <p className="text-gray-700 mb-2">
                Select one or more reviewers to assign.
              </p>

              <select
                multiple
                value={selectedReviewers}
                onChange={handleSelectReviewer}
                className="w-full border border-gray-300 rounded-md p-2 h-32 focus:ring-2 focus:ring-[#521028]"
              >
                {reviewers.map((rev) => (
                  <option key={rev.id} value={rev.id}>
                    {rev.email}
                  </option>
                ))}
              </select>

              <button
                onClick={handleAssignReviewers}
                className="w-full mt-4 bg-[#521028] text-white font-semibold py-2 rounded-md hover:bg-[#6b1b3a]"
              >
                📤 Assign Reviewer(s)
              </button>

              {/* Live assigned reviewers */}
              {selectedPaper.assignments?.length > 0 && (
                <div className="mt-6 border-t pt-4">
                  <h4 className="font-semibold text-[#521028] mb-2">
                    ✅ Assigned Reviewers
                  </h4>
                  <ul className="list-disc ml-5 text-gray-700 text-sm">
                    {selectedPaper.assignments.map((a) => (
                      <li key={a.id}>
                        {a.reviewer.email ||
                          `${a.reviewer.firstName} ${a.reviewer.lastName}`}{" "}
                        — {new Date(a.assignedAt).toLocaleDateString()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminSubmittedPapers;
