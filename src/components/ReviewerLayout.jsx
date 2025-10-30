import React from "react";
import { Link, useLocation } from "react-router-dom";

const ReviewerLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#521028] text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-[#6b1b3a]">
          Reviewer Panel
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/reviewer/papers"
            className={`block px-3 py-2 rounded-md font-medium ${
              location.pathname.includes("/reviewer/papers")
                ? "bg-white text-[#521028]"
                : "hover:bg-[#6b1b3a]"
            }`}
          >
            Submitted Papers
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default ReviewerLayout;
