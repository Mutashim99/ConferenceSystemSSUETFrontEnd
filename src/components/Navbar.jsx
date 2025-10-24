import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const navItems = [
    { label: "HOME" },
    { label: "ABOUT" },
    {
      label: "SPEAKERS",
      hasDropdown: true,
      items: ["Keynote Speakers", "Invited Speakers"],
    },
    { label: "CALL FOR PAPERS" },
    { label: "REGISTRATION" },
    { label: "COMMITTEE" },
    {
      label: "ARCHIVES",
      hasDropdown: true,
      items: ["ICISCT 2023", "ICISCT 2022", "ICISCT 2021"],
    },
    { label: "SCHEDULE" },
    { label: "CONTACT" },
  ];

  return (
    <nav className="bg-[#521028] text-white w-full sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl h-30 mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2 shrink-0">
          <img
            src="https://icisct.com/wp-content/uploads/2024/11/logo.png"
            alt="ICISCT Logo"
            className="h-12 w-auto object-contain"
            draggable="false"
          />

          {/* <span className="text-4xl font-bold tracking-wider text-white">
            ICISCT
          </span> */}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              <button
                onClick={() => item.hasDropdown && toggleDropdown(item.label)}
                className="flex items-center space-x-1 text-sm font-semibold hover:text-gray-300 transition-colors"
              >
                <span>{item.label}</span>
                {item.hasDropdown && <ChevronDown size={14} />}
              </button>

              {item.hasDropdown && (
                <div className="absolute left-0 top-6 hidden group-hover:block bg-white text-black rounded-md shadow-md w-44 py-2">
                  {item.items?.map((sub) => (
                    <a
                      key={sub}
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
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
          {navItems.map((item) => (
            <div key={item.label} className="border-b border-gray-700">
              <button
                onClick={() => item.hasDropdown && toggleDropdown(item.label)}
                className="flex justify-between w-full px-4 py-3 text-left text-sm font-semibold"
              >
                <span>{item.label}</span>
                {item.hasDropdown && <ChevronDown size={16} />}
              </button>

              {item.hasDropdown && openDropdown === item.label && (
                <div className="bg-[#5d0e30]">
                  {item.items?.map((sub) => (
                    <a
                      key={sub}
                      href="#"
                      className="block px-8 py-2 text-sm text-gray-200 hover:bg-[#6f123b]"
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
