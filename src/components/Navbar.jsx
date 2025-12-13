import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate("/login");
  };

  // Dashboard redirect based on roles
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

  // --- NAVIGATION LOGIC ---

  const homeLink = { label: "HOME", to: "/" };

  const homeSectionLinks = [
    { label: "ABOUT", href: "#about" },
    { label: "SPEAKERS", href: "#speakers" },
    { label: "CONTACT", href: "#contact" },
  ];

  const isHomePage = location.pathname === "/";

  const visibleLinks = isHomePage
    ? [homeLink, ...homeSectionLinks]
    : [homeLink];

  // Guest navigation items
  const publicNavItems = [
    ...visibleLinks,
    { label: "REGISTRATION INFO", to: "/registration-info" },
    { label: "SUBMIT A PAPER", to: "/author/dashboard/submit", cta: true },
    { label: "LOGIN", to: "/login" },
    { label: "REGISTER", to: "/register" },
  ];

  // Logged-in user items
  const userNavItems = [
    ...visibleLinks,
    // 🔥 ADDED: Registration info is now visible for logged-in users
    { label: "REGISTRATION INFO", to: "/registration-info" },
    { label: "DASHBOARD", to: dashboardPath },
    { label: "LOGOUT", onClick: handleLogout },
  ];

  const navItems = !user ? publicNavItems : userNavItems;

  // --- RENDER FUNCTIONS ---

  const renderNavItem = (item) => {
    if (item.href) {
      return (
        <a
          key={item.label}
          href={item.href}
          className="text-sm font-semibold hover:opacity-80 transition-opacity"
        >
          {item.label}
        </a>
      );
    }

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

    if (item.to) {
      if (item.cta) {
        return (
          <Link
            key={item.label}
            to={item.to}
            className="text-sm font-semibold text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all"
          >
            {item.label}
          </Link>
        );
      }
      return (
        <Link
          key={item.label}
          to={item.to}
          className="text-sm font-semibold hover:opacity-80 transition-opacity"
        >
          {item.label}
        </Link>
      );
    }

    return (
      <span key={item.label} className="text-sm font-semibold text-gray-200">
        {item.label}
      </span>
    );
  };

  const renderMobileNavItem = (item) => {
    if (item.href) {
      return (
        <a
          key={item.label}
          href={item.href}
          onClick={() => setIsOpen(false)}
          className="block px-6 py-4 text-base font-medium hover:bg-[#5a2781] transition-colors"
        >
          {item.label}
        </a>
      );
    }

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

    if (item.to) {
      if (item.cta) {
        return (
          <Link
            key={item.label}
            to={item.to}
            onClick={() => setIsOpen(false)}
            className="block px-6 py-4 text-base font-medium bg-[#447E36] text-center"
          >
            {item.label}
          </Link>
        );
      }
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
    }

    return (
      <span
        key={item.label}
        className="block w-full text-left px-6 py-4 text-base font-medium text-gray-300"
      >
        {item.label}
      </span>
    );
  };

  return (
    <>
      <nav className="bg-[#521028] text-white w-full sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl h-20 mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 shrink-0">
            <img
              src="/logo.png"
              alt="ICISCT Logo"
              className="h-12 w-auto object-contain"
              draggable="false"
              onError={(e) => (e.target.style.display = "none")}
            />
          </Link>

          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map(renderNavItem)}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-[#521028] text-white z-60 shadow-2xl"
            >
              <div className="flex justify-end p-5">
                <button onClick={() => setIsOpen(false)}>
                  <X size={28} />
                </button>
              </div>

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
