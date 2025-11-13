import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { Link } from "react-router-dom";
// 1. Import motion and AnimatePresence
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate("/login");
  };

  // --- Logic to Determine Dashboard Path ---
  let dashboardPath = "/";
  if (user) {
    switch (user.role) {
      case "ADMIN":
        dashboardPath = "/admin/dashboard";
        break;
      case "AUTHOR":
        dashboardPath = "/author/dashboard";
        break;
      case "REVIEWER":
        dashboardPath = "/reviewer/dashboard/papers";
        break;
      default:
        dashboardPath = "/";
    }
  }

  // Links visible when logged out (Updated with a green CTA)
  const publicNavItems = [
    { label: "SUBMIT A PAPER", to: "/author/dashboard/submit", cta: true },
    { label: "LOGIN", to: "/login" },
    { label: "REGISTER", to: "/register" },
  ];

  // Links visible when logged in
  const userNavItems = [
    { label: `Welcome, ${user?.firstName || user?.email}` },
    { label: "MY DASHBOARD", to: dashboardPath },
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
          className="text-sm font-semibold hover:opacity-80 transition-opacity"
        >
          {item.label}
        </button>
      );
    }
    // Render a non-clickable welcome message
    if (!item.to) {
      return (
        <span key={item.label} className="text-sm font-semibold text-gray-200">
          {item.label}
        </span>
      );
    }
    // Render a CTA button (accent green)
    if (item.cta) {
      return (
        <Link
          key={item.label}
          to={item.to}
          className="text-sm font-semibold btn-green text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all"
        >
          {item.label}
        </Link>
      );
    }
    // Render a standard navigation Link
    return (
      <Link
        key={item.label}
        to={item.to}
        className="text-sm font-semibold hover:opacity-80 transition-opacity"
      >
        {item.label}
      </Link>
    );
  };

  // 6. Updated mobile item styles for a cleaner list
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
          className="block w-full text-left px-6 py-4 text-base font-medium hover:bg-[#5a2781] transition-colors"
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
          className="block w-full text-left px-6 py-4 text-base font-medium text-gray-300"
        >
          {item.label}
        </span>
      );
    }
    // Render a CTA button
    if (item.cta) {
      return (
        <Link
          key={item.label}
          to={item.to}
          onClick={() => setIsOpen(false)}
          className="block px-6 py-4 text-base font-medium bg-[#34B04A] text-center"
        >
          {item.label}
        </Link>
      );
    }
    // Render a navigation Link
    return (
      <Link
        key={item.label}
        to={item.to}
        onClick={() => setIsOpen(false)}
        className="block px-6 py-4 text-base font-medium hover:bg-[#5a2781] transition-colors"
      >
        {item.label}
      </Link>
    );
  };

  return (
    <>
      {/* Updated background to primary purple */}
      <nav className="bg-[#662D91] text-white w-full sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl h-20 mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 shrink-0">
            <img
              src="/logo.png"
              alt="ICISCT Logo"
              className="h-12 w-auto object-contain bg-[#662D91] " 
              draggable="false"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map(renderNavItem)}
          </div>

          {/* Mobile Menu Button - Toggles state */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {/* Show Menu icon, X is now in the drawer */}
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* 2. NEW: Animated Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 5. NEW: Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-50" // z-50 to cover page
            />

            {/* 3. NEW: Drawer Content */}
            <motion.div
              initial={{ x: "100%" }} // Start off-screen to the right
              animate={{ x: 0 }} // Animate to 0 (on-screen)
              exit={{ x: "100%" }} // Animate back off-screen
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[calc(100vw-4rem)] bg-[#662D91] text-white z-60 shadow-2xl" // z-60 to be on top of backdrop
            >
              {/* 4. NEW: Close button inside drawer */}
              <div className="flex justify-end p-5">
                <button onClick={() => setIsOpen(false)}>
                  <X size={28} />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex flex-col">
                {navItems.map(renderMobileNavItem)}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;
