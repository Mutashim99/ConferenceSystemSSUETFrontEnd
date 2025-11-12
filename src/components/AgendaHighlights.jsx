import { motion } from "framer-motion";
import { Mic, Users, Award, Coffee } from "lucide-react";

const timelineEvents = [
  {
    icon: <Mic size={24} />,
    time: "Day 1: 09:00 AM",
    title: "Opening Keynote",
    description: "Join us for the opening ceremony and keynote address.",
  },
  {
    icon: <Users size={24} />,
    time: "Day 1: 11:00 AM",
    title: "Technical Sessions",
    description: "Deep dive into AI, Cybersecurity, and Cloud tracks.",
  },
  {
    icon: <Coffee size={24} />,
    time: "Day 2: 01:00 PM",
    title: "Panel Discussion & Networking",
    description: "Engage with industry leaders and peers.",
  },
  {
    icon: <Award size={24} />,
    time: "Day 2: 04:00 PM",
    title: "Closing Ceremony",
    description: "Awards and concluding remarks for ICISCT 2026.",
  },
];

export const AgendaHighlights = () => {
  return (
    <section className="py-20 md:py-24 px-6 md:px-16 bg-white font-poppins">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase text-[#662D91] font-sans mb-16 text-center">
          Agenda Highlights
        </h2>

        {/* Vertical Timeline */}
        <div className="relative flex flex-col pl-6 border-l-4 border-[#34B04A]">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              className="mb-10 relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* Timeline Dot */}
              <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-white border-4 border-[#34B04A]"></div>
              
              {/* Icon */}
              <div className="absolute -left-[43px] top-0 p-2 bg-[#34B04A] text-white rounded-full shadow-md">
                {event.icon}
              </div>

              {/* Content */}
              <div className="pl-6">
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  {event.time}
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-base text-gray-700">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgendaHighlights;