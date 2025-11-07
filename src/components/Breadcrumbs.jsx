import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, ChevronRight, FileText, LogOut } from "lucide-react";

import useAuthStore from "../store/authStore"; // Assumed path: src/store/authStore.js

// A mapping to make path segments more user-friendly
const pathFriendlyNames = {
  author: "Author",
  dashboard: "Dashboard",
  submit: "Submit Paper",
  papers: "Submitted Papers",
  admin: "Admin",
  reviewer: "Reviewer",
  "register-reviewer": "Register Reviewer",
  "assign-reviewer": "Assign Reviewer",
  // Added a generic name for dynamic ID paths (e.g., /papers/123)
  ":id": "Paper Details",
};

const Breadcrumbs = ({ actions }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // Get the logout function from your auth store
  // Make sure the path '../store/authStore' is correct
  const logout = useAuthStore((state) => state.logout);

  const pathnames = location?.pathname
    ? location.pathname.split("/").filter((x) => x)
    : [];

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <nav
      className="flex items-center justify-between flex-wrap gap-y-2 py-4 px-4 sm:px-6 bg-white shadow-sm rounded-lg mb-6"
      aria-label="Breadcrumb"
    >
      {/* Breadcrumb Links */}
      <ol className="hidden md:inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {/* Home Link */}
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-semibold text-[#521028] hover:text-[#6b1b3a] transition-colors"
          >
            <Home className="w-4 h-4 me-2 text-[#521028]" />
            Home
          </Link>
        </li>

        {/* Dynamic Path Links */}
        {pathnames.map((name, index) => {
          const currentLink = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          // Check if the segment is likely an ID (e.g., all digits)
          const isId = /^\d+$/.test(name);

          // Use "Paper Details" for IDs, otherwise look up the name
          const friendlyName = isId
            ? pathFriendlyNames[":id"]
            : pathFriendlyNames[name] ||
              name.charAt(0).toUpperCase() + name.slice(1);

          return (
            <li key={currentLink}>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                {isLast ? (
                  // Current page (last item) - just display text
                  <span className="ms-1 text-sm font-medium text-gray-700 md:ms-2">
                    {friendlyName}
                  </span>
                ) : (
                  // Not last item - display a link
                  <Link
                    to={currentLink}
                    className="ms-1 text-sm font-semibold text-[#521028] hover:text-[#6b1b3a] transition-colors md:ms-2"
                  >
                    {friendlyName}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {/* Action Buttons on the right */}
      <div className="flex items-center space-x-2 sm:space-x-3 ml-4">
        {actions}
        <button
          onClick={handleLogout}
          className="flex items-center text-sm font-semibold text-white bg-[#521028] hover:bg-[#6b1b3a] px-3 py-2 rounded-md transition-colors whitespace-nowrap"
        >
          <LogOut className="w-4 h-4 me-1.5" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
