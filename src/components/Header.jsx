import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const topRowLogos = [
  "/logos/ku.jpg",
  "/logos/ssuet.png",
  "/logos/hec_sindh.jpeg",
  "https://www.iccs.edu/esims/images/iccbs_logo.png",
  "/logos/ieekarachi.jpg",
  "/logos/ieeeadvance.jpg",
];

const bottomRowLogos = [
  "/logos/ubit.jpeg",
  "/logos/sed.jpg",
  "/logos/csit.jpg",
];

export const Header = () => {
  return (
    <header className="relative w-full min-h-[calc(100vh-5rem)] flex items-center justify-center text-center text-white font-poppins py-8 lg:py-0">
      {/* Background Image */}
      <img
        src="/header-img.png"
        alt="Conference background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Purple overlay */}
      <div className="absolute inset-0 w-full h-full bg-[#521028] opacity-60"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 px-4 w-full max-w-5xl mx-auto flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Glassmorphism Sponsor Container */}
        <motion.div
          variants={itemVariants}
          className="bg-white/50 backdrop-blur-md border border-white/30 rounded-[1.5rem] md:rounded-[2rem] px-3 py-4 md:px-8 md:py-6 mb-5 md:mb-8 shadow-2xl w-full max-w-5xl"
        >
          {/* Unified Logo Container - This fixes the awkward wrapping */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 md:gap-5 lg:gap-6">
            {/* Top Array */}
            {topRowLogos.map((logo, index) => (
              <div
                key={`top-${index}`}
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white rounded-xl shadow-sm flex items-center justify-center p-1.5 hover:scale-110 transition-transform duration-300"
              >
                <img
                  src={logo}
                  alt={`Sponsor ${index + 1}`}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/128x64?text=LOGO";
                  }}
                />
              </div>
            ))}

            {/* Bottom Array */}
            {bottomRowLogos.map((logo, index) => (
              <div
                key={`bottom-${index}`}
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white rounded-xl shadow-sm flex items-center justify-center p-1.5 hover:scale-110 transition-transform duration-300"
              >
                <img
                  src={logo}
                  alt={`Sponsor bottom ${index + 1}`}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/128x64?text=LOGO";
                  }}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Text and CTAs */}
        <motion.h2
          className="text-xl md:text-2xl font-bold mb-2 tracking-wide drop-shadow-md"
          variants={itemVariants}
        >
          GET READY
        </motion.h2>

        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-3 md:mb-4 drop-shadow-lg"
          variants={itemVariants}
        >
          4th International Conference On Information Science & Communication
          Technology 2026
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-2xl font-semibold mb-2 drop-shadow-md"
          variants={itemVariants}
        >
          15 April - 16 April 2026
        </motion.p>

        <motion.h3
          className="text-sm sm:text-base md:text-2xl font-semibold mb-6 md:mb-8 drop-shadow-md"
          variants={itemVariants}
        >
          Venue:{" "}
          <span className="font-bold">
            UBIT, University Of Karachi & Sir Syed University of Engineering and
            Technology
          </span>
        </motion.h3>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto"
          variants={itemVariants}
        >
          <motion.a
            href="/author/dashboard/submit"
            className="bg-[#447E36] text-white font-semibold px-6 py-3 rounded-lg text-base md:text-lg hover:bg-[#3b6e2f] transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            Submit a Paper
          </motion.a>
          <motion.a
            href="#about"
            className="bg-white text-[#521028] font-semibold px-6 py-3 rounded-lg text-base md:text-lg hover:bg-gray-100 transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            Learn More
          </motion.a>
        </motion.div>
      </motion.div>
    </header>
  );
};

export default Header;
