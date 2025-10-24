

export const Header = () => {
  return (
    <header className="relative w-full h-[85vh] flex items-center justify-center text-center text-white font-poppins">
      {/* Background Image */}
      <img
        src="/header-img.png"
        alt="Conference background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content */}
      <div className="relative z-10 px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">GET READY</h2>
        <h1 className="text-xl md:text-4xl font-extrabold leading-snug mb-5">
          3rd International Conference On Information Science & Communication
          <br className="hidden md:block" /> Technology 2025
        </h1>
        <p className="text-lg md:text-2xl font-semibold mb-2">
          15 April - 16 April 2025
        </p>
        <h3 className="text-lg md:text-2xl font-semibold">
          Venue:{" "}
          <span className="font-bold">
            Sir Syed University of Engineering and Technology, Karachi
          </span>
        </h3>
      </div>
    </header>
  );
};

export default Header;
