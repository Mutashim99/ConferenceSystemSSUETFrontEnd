import { motion } from "framer-motion";
import {
  Brain,
  ShieldCheck,
  Database,
  Cloud,
  Wifi,
  Radio,
  Blocks,
  Leaf,
  Glasses,
} from "lucide-react";

// 1. Major Themes Data
const majorTracks = [
  {
    icon: <Brain size={40} className="text-[#447E36]" />,
    title: "AI & Machine Learning",
    description:
      "Innovations in AI algorithms and applications of machine learning across industries.",
  },
  {
    icon: <ShieldCheck size={40} className="text-[#447E36]" />,
    title: "Cybersecurity & Privacy",
    description:
      "Emerging threats, defense mechanisms, and best practices for data protection.",
  },
  {
    icon: <Database size={40} className="text-[#447E36]" />,
    title: "Big Data & Analytics",
    description:
      "Techniques for managing large datasets and case studies on data-driven decision-making.",
  },
  {
    icon: <Wifi size={40} className="text-[#447E36]" />,
    title: "Internet of Things (IoT)",
    description:
      "Smart cities, connected devices, and challenges in IoT security architectures.",
  },
  {
    icon: <Cloud size={40} className="text-[#447E36]" />,
    title: "Cloud Computing",
    description:
      "Advances in cloud technologies, services, and solutions for scalable computing.",
  },
  {
    icon: <Radio size={40} className="text-[#447E36]" />,
    title: "Wireless Networks",
    description:
      "Developments in 5G, future communication technologies, and network security optimization.",
  },
  {
    icon: <Blocks size={40} className="text-[#447E36]" />,
    title: "Blockchain Technology",
    description:
      "Applications of blockchain across sectors, smart contracts, and decentralized systems.",
  },
  {
    icon: <Leaf size={40} className="text-[#447E36]" />,
    title: "Sustainable Computing",
    description:
      "Eco-friendly practices in IT, green technologies, and reducing carbon footprints.",
  },
  {
    icon: <Glasses size={40} className="text-[#447E36]" />,
    title: "AR & VR",
    description:
      "Immersive technologies and their applications in education, healthcare, and entertainment.",
  },
];

// 2. Sub-Themes List
const subThemes = [
  "Natural Language Processing",
  "Image & Pattern Recognition",
  "Speech & Signal Processing",
  "Computational Intelligence",
  "Data Mining & Warehousing",
  "Web Mining",
  "Biomedical Informatics",
  "IoT Architectures & Protocols",
  "IoT’s Impact on 5G",
  "Wireless Sensor Networks",
  "Smart City Applications",
  "Smart Contracts",
  "Decentralized Applications",
  "Industrial Blockchain",
  "Cryptocurrency & Digital Assets",
  "Grid & Cluster Computing",
  "High Performance Computing",
  "Embedded Computing",
  "Green Computing",
  "Mobile & Ubiquitous Computing",
  "Mobile Ad-hoc Networks",
  "Cryptography & Data Security",
  "Cyber-Physical Systems",
];

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { scale: 1.05, y: -5, transition: { type: "spring", stiffness: 300 } },
};

export const ConferenceTracks = () => {
  return (
    <section className="py-20 md:py-24 px-6 md:px-16 bg-gray-50 font-poppins">
      <div className="max-w-7xl mx-auto">
        {/* --- SECTION 1: HEADER & INTRO --- */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase text-[#521028] font-sans mb-6">
            Theme of Conference
          </h2>
          <div className="w-24 h-1 bg-[#447E36] mx-auto rounded-full mb-8"></div>

          <p className="text-lg text-gray-700 leading-relaxed">
            The swift progression of technology is transforming the world,
            creating both opportunities and challenges across diverse sectors.
            This symposium is dedicated to examining critical topics in{" "}
            <span className="font-semibold text-[#521028]">
              Information Science and Communication Technology
            </span>
            . By uniting experts, researchers, and practitioners, we aim to
            encourage collaboration and inspire fresh ideas that will drive the
            continued development of the technology landscape.
          </p>
        </div>

        {/* --- SECTION 2: MAJOR TRACKS GRID --- */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {majorTracks.map((track) => (
            <motion.div
              key={track.title}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white p-8 rounded-xl shadow-md border-b-4 border-[#447E36] hover:shadow-xl transition-all flex flex-col items-center text-center group"
            >
              <div className="mb-6 p-4 bg-green-50 rounded-full group-hover:bg-[#447E36]/10 transition-colors">
                {track.icon}
              </div>
              <h3 className="text-xl font-bold text-[#521028] mb-3">
                {track.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {track.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* --- SECTION 3: SUB-THEMES --- */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-center text-[#521028] mb-8 uppercase tracking-wider">
            Detailed Sub-Themes
          </h3>

          <div className="flex flex-wrap justify-center gap-3">
            {subThemes.map((theme, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 text-gray-700 text-sm md:text-base rounded-full font-medium hover:bg-[#521028] hover:text-white transition-colors duration-300 cursor-default"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConferenceTracks;
