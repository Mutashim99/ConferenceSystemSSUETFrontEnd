import { useRef } from "react";
import { motion } from "framer-motion";

// This component wraps any section to make it fade-in and slide-up on scroll
const AnimatedSection = ({ children }) => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // 'amount: 0.2' triggers when 20% is visible
      transition={{ duration: 0.6, ease: "easeOut" }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;