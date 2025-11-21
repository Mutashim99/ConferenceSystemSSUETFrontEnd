import { motion } from "framer-motion";

// Placeholder logos
const sponsorLogos = [
  "/logos/ku.jpg",
  "/logos/ubit.jpeg",
  "/logos/sed.jpg",
  "/logos/ssuet.png",
  "/logos/csit.jpg",
];

export const Sponsors = () => {
  return (
    <section className="py-20 md:py-24 px-6 md:px-16 bg-gray-50 font-poppins">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase text-[#521028] font-sans mb-16">
          Our Sponsors
        </h2>

        {/* Logo Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-8
           items-center gap-y-16 justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {sponsorLogos.map((logo, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1.8 },
              }}
              whileHover={{ scale: 2.1 }}
              className="filter hover:grayscale-0 transition-all duration-300 "
            >
              <img
                src={logo} // Note: These are placeholders. Create a 'public/logos' folder
                alt={`Sponsor ${index + 1}`}
                className="w-32 h-16 object-contain mx-auto"
                onError={(e) => {
                  // Fallback for missing images
                  e.target.src = "https://placehold.co/128x64?text=LOGO";
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Sponsors;
