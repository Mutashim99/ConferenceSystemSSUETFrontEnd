import { motion } from "framer-motion";
import { Brain, ShieldCheck, Database, Cloud, Bot, Code } from "lucide-react";

// Track data - you can customize this
const tracks = [
  {
    icon: <Brain size={40} className="text-[#447E36]" />,
    title: "AI & Machine Learning",
    description: "Exploring the new frontiers of artificial intelligence.",
  },
  {
    icon: <ShieldCheck size={40} className="text-[#447E36]" />,
    title: "Cybersecurity",
    description: "Securing the digital world from modern threats.",
  },
  {
    icon: <Database size={40} className="text-[#447E36]" />,
    title: "Data Science",
    description: "Leveraging big data for insightful analytics.",
  },
  {
    icon: <Cloud size={40} className="text-[#447E36]" />,
    title: "Cloud Computing",
    description: "The future of scalable infrastructure and services.",
  },
  {
    icon: <Bot size={40} className="text-[#447E36]" />,
    title: "Robotics & IoT",
    description: "Connecting the physical and digital worlds.",
  },
  {
    icon: <Code size={40} className="text-[#447E36]" />,
    title: "Software Engineering",
    description: "Advanced methodologies for robust development.",
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { scale: 1.05, y: -5, transition: { type: "spring", stiffness: 300 } },
};

export const ConferenceTracks = () => {
  return (
    <section className="py-20 md:py-24 px-6 md:px-16 bg-gray-50 font-poppins">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase text-[#521028] font-sans mb-16">
          Conference Tracks
        </h2>

        {/* Tracks Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {tracks.map((track) => (
            <motion.div
              key={track.title}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 flex flex-col items-center text-center"
            >
              <div className="mb-5">{track.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {track.title}
              </h3>
              <p className="text-base text-gray-600">{track.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ConferenceTracks;
