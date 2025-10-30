import React from "react";
import DashboardLayout from "../../components/DashboardLayout";

const dummyPapers = [
  {
    id: 1,
    title: "AI for Healthcare",
    status: "Under Review",
    submittedAt: "2025-02-10",
  },
  {
    id: 2,
    title: "Blockchain Security",
    status: "Accepted",
    submittedAt: "2025-01-15",
  },
];

const SubmittedPapers = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-[#521028] mb-6">
        Submitted Papers
      </h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-[#521028] text-white">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Title</th>
              <th className="p-3">Status</th>
              <th className="p-3">Submitted On</th>
            </tr>
          </thead>
          <tbody>
            {dummyPapers.map((paper) => (
              <tr key={paper.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{paper.id}</td>
                <td className="p-3 font-medium">{paper.title}</td>
                <td className="p-3">{paper.status}</td>
                <td className="p-3">{paper.submittedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default SubmittedPapers;
