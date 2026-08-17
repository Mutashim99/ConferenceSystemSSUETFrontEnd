import { useState } from "react";
import { Menu, X, ArrowLeft } from "lucide-react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuthStore from "../../../store/authStore";
import { motion, AnimatePresence } from "framer-motion";

const Navbar2026 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate("/login");
  };

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

  const isHome2026 = location.pathname === "/archive/2026";

  const homeLink = { label: "HOME (2026)", to: "/archive/2026" };

  const homeSectionLinks = [
    { label: "ABOUT", href: isHome2026 ? "#about" : "/archive/2026#about" },
    { label: "SPEAKERS", href: isHome2026 ? "#speakers" : "/archive/2026#speakers" },
    { label: "CONTACT", href: isHome2026 ? "#contact" : "/archive/2026#contact" },
  ];

  const visibleLinks = [homeLink, ...homeSectionLinks];

  const publicNavItems = [
    ...visibleLinks,
    { label: "REGISTRATION INFO", to: "/archive/2026/registration-info" },
    { label: "CURRENT 2027 EDITION", to: "/", cta: true },
    { label: "LOGIN", to: "/login" },
  ];

  const userNavItems = [
    ...visibleLinks,
    { label: "REGISTRATION INFO", to: "/archive/2026/registration-info" },
    { label: "CURRENT 2027 EDITION", to: "/", cta: true },
    { label: "DASHBOARD", to: dashboardPath },
    { label: "LOGOUT", onClick: handleLogout },
  ];

  const navItems = !user ? publicNavItems : userNavItems;

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
            className="text-sm font-semibold text-white bg-[#447E36] px-4 py-2 rounded-md hover:bg-opacity-90 transition-all flex items-center gap-1.5"
          >
            <ArrowLeft size={16} />
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
      {/* Archive Notice Banner */}
      <div className="bg-amber-700 text-white text-xs sm:text-sm font-medium py-2 px-4 text-center flex items-center justify-center gap-2">
        <span>📁 You are viewing the archived <strong>ICISCT 2026</strong> conference edition.</span>
        <Link to="/" className="underline font-bold hover:text-amber-200 ml-1 inline-flex items-center">
          Go to Current 2027 Edition →
        </Link>
      </div>

      <nav className="bg-[#521028] text-white w-full sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl h-20 mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/archive/2026" className="flex items-center space-x-2 shrink-0">
            <img
              src="/logo.png"
              alt="ICISCT 2026 Logo"
              className="h-12 w-auto object-contain"
              draggable="false"
              onError={(e) => (e.target.style.display = "none")}
            />
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded text-amber-200 font-semibold tracking-wider">
              2026 ARCHIVE
            </span>
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

export default Navbar2026;
