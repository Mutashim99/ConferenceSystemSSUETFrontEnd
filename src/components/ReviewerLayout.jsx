import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ReviewerLayout = ({ children }) => {
  const location = useLocation();
  // State to manage sidebar visibility on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Helper function to close sidebar on mobile (e.g., when a link is clicked)
  const closeSidebar = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Backdrop: Dims the content on mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-[#521028] text-white flex flex-col transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:flex md:w-64`}
      >
        {/* Sidebar Header with Close Button (Mobile Only) */}
        <div className="flex items-center justify-between p-4 border-b border-[#6b1b3a]">
          <span className="text-2xl font-bold">Reviewer Panel</span>
          {/* Mobile-only close button ('X') */}
          <button
            onClick={toggleSidebar}
            className="text-white md:hidden focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/reviewer/dashboard/papers"
            className={`block px-3 py-2 rounded-md font-medium ${
              location.pathname.includes("/reviewer/papers")
                ? "bg-white text-[#521028]"
                : "hover:bg-[#6b1b3a]"
            }`}
            onClick={closeSidebar} // Close sidebar on link click
          >
            Assigned Papers
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Mobile Header with Hamburger Menu */}
        <header className="sticky top-0 z-30 flex items-center justify-between p-4 bg-white shadow-md md:hidden">
          {/* Title for mobile header */}
          <span className="text-xl font-bold text-[#521028]">
            Reviewer Panel
          </span>
          {/* Hamburger button */}
          <button
            onClick={toggleSidebar}
            className="text-[#521028] focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default ReviewerLayout;