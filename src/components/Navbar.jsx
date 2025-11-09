import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate("/login");
  };

  // --- New Logic to Determine Dashboard Path ---
  let dashboardPath = "/"; // Default fallback
  if (user) {
    switch (user.role) {
      case "ADMIN":
        dashboardPath = "/admin/dashboard";
        break;
      case "AUTHOR":
        dashboardPath = "/author/dashboard";
        break;
      case "REVIEWER":
        // Links to the main page within the reviewer's layout
        dashboardPath = "/reviewer/dashboard/papers"; 
        break;
      default:
        dashboardPath = "/"; // Fallback to home
    }
  }
  // --- End of New Logic ---

  // Links visible when logged out
  const publicNavItems = [
    { label: "SUBMIT A PAPER", to: "/author/dashboard/submit" },
    { label: "LOGIN", to: "/login" },
    { label: "REGISTER", to: "/register" },
  ];

  // Links visible when logged in (Updated)
  const userNavItems = [
    { label: `Welcome, ${user?.firstName || user?.email}` },
    { label: "MY DASHBOARD", to: dashboardPath }, // <-- Here is the new link
    { label: "LOGOUT", onClick: handleLogout },
  ];

  const navItems = !user ? publicNavItems : userNavItems;

  const renderNavItem = (item) => {
    // Render a button for actions
    if (item.onClick) {
      return (
        <button
          key={item.label}
          onClick={item.onClick}
          className="text-sm font-semibold hover:text-gray-300 transition-colors"
        >
          {item.label}
        </button>
      );
    }
    // Render a non-clickable welcome message
    if (!item.to) {
      return (
        <span key={item.label} className="text-sm font-semibold text-gray-300">
          {item.label}
        </span>
      );
    }
    // Render a navigation Link
    return (
      <Link
        key={item.label}
        to={item.to}
        className="text-sm font-semibold hover:text-gray-300 transition-colors"
      >
        {item.label}
      </Link>
    );
  };

  const renderMobileNavItem = (item) => {
    // Render a button for actions
    if (item.onClick) {
      return (
        <button
          key={item.label}
          onClick={() => {
            item.onClick();
            setIsOpen(false);
          }}
          className="block w-full text-left px-4 py-3 border-b border-gray-700 text-sm font-semibold"
        >
          {item.label}
        </button>
      );
    }
    // Render a non-clickable welcome message
    if (!item.to) {
      return (
        <span
          key={item.label}
          className="block w-full text-left px-4 py-3 border-b border-gray-700 text-sm font-semibold text-gray-300"
        >
          {item.label}
        </span>
      );
    }
    // Render a navigation Link
    return (
      <Link
        key={item.label}
        to={item.to}
        onClick={() => setIsOpen(false)}
        className="block px-4 py-3 border-b border-gray-700 text-sm font-semibold"
      >
        {item.label}
      </Link>
    );
  };

  return (
    <nav className="bg-[#521028] text-white w-full sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl h-20 mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo - changed to Link to home */}
        <Link to="/" className="flex items-center space-x-2 shrink-0">
          <img
            src="https://icisct.com/wp-content/uploads/2024/11/logo.png"
            alt="ICISCT Logo"
            className="h-12 w-auto object-contain"
            draggable="false"
            onError={(e) => {
              e.target.style.display = 'none'; // Hide broken image
            }}
          />
          {/* <h1 className="font-bold">DEMO APP</h1> */}
          
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map(renderNavItem)}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#4a0b25] border-t border-gray-700">
          {navItems.map(renderMobileNavItem)}
        </div>
      )}
    </nav>
  );
};
export default Navbar;
