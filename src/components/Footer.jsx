import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  return (
    // Updated background to primary purple
    <footer className="bg-[#662D91] text-white py-10 font-poppins">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Social Icons */}
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            // Updated hover color
            className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-white hover:bg-white hover:text-[#662D91] transition-all duration-300"
          >
            <FaFacebookF size={18} />
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            // Updated hover color
            className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-white hover:bg-white hover:text-[#662D91] transition-all duration-300"
          >
            <FaXTwitter size={18} />
          </a>

          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            // Updated hover color
            className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-white hover:bg-white hover:text-[#662D91] transition-all duration-300"
          >
            <FaInstagram size={18} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-200">
          © {new Date().getFullYear()} ICISCT — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;