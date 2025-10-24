import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const navItems = [
    { label: "HOME", href: "#" },
    { label: "ABOUT", href: "#about" },
    {
      label: "SPEAKERS",
      hasDropdown: true,
      items: [
        { name: "Keynote Speakers", href: "#keynote" },
        { name: "Invited Speakers", href: "#invited" },
      ],
    },
    { label: "CALL FOR PAPERS", href: "#papers" },
    { label: "REGISTRATION", href: "#registration" },
    { label: "COMMITTEE", href: "#committee" },
    {
      label: "ARCHIVES",
      hasDropdown: true,
      items: [
        { name: "ICISCT 2023", href: "#archive2023" },
        { name: "ICISCT 2022", href: "#archive2022" },
        { name: "ICISCT 2021", href: "#archive2021" },
      ],
    },
    { label: "SCHEDULE", href: "#schedule" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <nav className="bg-[#521028] text-white w-full sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl h-20 mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2 shrink-0">
          <img
            src="https://icisct.com/wp-content/uploads/2024/11/logo.png"
            alt="ICISCT Logo"
            className="h-12 w-auto object-contain"
            draggable="false"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div key={item.label} className="relative group">
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className="flex items-center space-x-1 text-sm font-semibold hover:text-gray-300 transition-colors"
                >
                  <span>{item.label}</span>
                  <ChevronDown size={14} />
                </button>

                <div className="absolute left-0 top-6 hidden group-hover:block bg-white text-black rounded-md shadow-md w-48 py-2">
                  {item.items.map((sub) => (
                    <a
                      key={sub.name}
                      href={sub.href}
                      className="block px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      {sub.name}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-semibold hover:text-gray-300 transition-colors"
              >
                {item.label}
              </a>
            )
          )}
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
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div key={item.label} className="border-b border-gray-700">
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className="flex justify-between w-full px-4 py-3 text-left text-sm font-semibold"
                >
                  <span>{item.label}</span>
                  <ChevronDown size={16} />
                </button>

                {openDropdown === item.label && (
                  <div className="bg-[#5d0e30]">
                    {item.items.map((sub) => (
                      <a
                        key={sub.name}
                        href={sub.href}
                        className="block px-8 py-2 text-sm text-gray-200 hover:bg-[#6f123b]"
                        onClick={() => setIsOpen(false)}
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 border-b border-gray-700 text-sm font-semibold"
              >
                {item.label}
              </a>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
