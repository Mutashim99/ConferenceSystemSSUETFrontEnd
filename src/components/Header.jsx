import { motion } from "framer-motion"; // Import motion

// Define variants for the container and its items
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Each child will animate 0.2s after the previous one
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


export const Header = () => {
  return (
    <header className="relative w-full min-h-[calc(100vh-5rem)] flex items-center justify-center text-center text-white font-poppins">
      {/* Background Image */}
      <img
        src="/header-img.png"
        alt="Conference background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Purple overlay */}
      <div className="absolute inset-0 w-full h-full bg-[#662D91] opacity-50"></div>

      {/* Content (Wrapped in motion.div) */}
      <motion.div
        className="relative z-10 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible" // Animate on load
      >
        <motion.h2
          className="text-2xl md:text-3xl font-bold mb-3 tracking-wide"
          variants={itemVariants}
        >
          GET READY
        </motion.h2>
        
        <motion.h1
          className="text-3xl md:text-5xl font-extrabold leading-tight mb-5 drop-shadow-md"
          variants={itemVariants}
        >
          4th International Conference On Information Science & Communication
          Technology 2026
        </motion.h1>
        
        <motion.p
          className="text-lg md:text-2xl font-semibold mb-2"
          variants={itemVariants}
        >
          15 April - 16 April 2026
        </motion.p>
        
        <motion.h3
          className="text-lg md:text-2xl font-semibold mb-10"
          variants={itemVariants}
        >
          Venue:{" "}
          <span className="font-bold">
            Sir Syed University of Engineering and Technology, Karachi
          </span>
        </motion.h3>
        
        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={itemVariants}
        >
          <motion.a
            href="/author/dashboard/submit"
            className="bg-[#34B04A] text-white font-semibold px-8 py-3 rounded-lg text-lg hover:bg-opacity-90 transition-all shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            Submit a Paper
          </motion.a>
          <motion.a
            href="#about"
            className="bg-white text-[#662D91] font-semibold px-8 py-3 rounded-lg text-lg hover:bg-gray-100 transition-all shadow-lg"
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