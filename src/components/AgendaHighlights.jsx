import { motion } from "framer-motion";
import { Mic, Users, Award, Coffee } from "lucide-react";

const timelineEvents = [
  {
    icon: <Mic size={24} />,
    time: "Day 1: 09:00 AM - 11:00 AM",
    title: "Opening Session",
  },
  {
    icon: <Users size={24} />,
    time: "Day 1: 11:00 AM - 05:00 PM",
    title: "Technical & Keynote Session",
  },
  {
    icon: <Users size={24} />,
    time: "Day 2: 09:00 AM - 04:00 PM",
    title: "Technical & Keynote Session",
  },
  {
    icon: <Award size={24} />,
    time: "Day 2: 04:00 PM - 05:00 PM",
    title: "Closing Session",
  },
];

export const AgendaHighlights = () => {
  return (
    <section className="py-20 md:py-28 px-6 md:px-16 bg-white font-poppins overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide uppercase text-[#521028] font-sans mb-4">
            Agenda Highlights
          </h2>
          <div className="w-24 h-1 bg-[#447E36] mx-auto rounded-full"></div>
        </div>

        {/* The Central Vertical Line (Visible on Desktop) */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 rounded-full top-0"></div>

        <div className="flex flex-col gap-12 md:gap-0">
          {timelineEvents.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                className={`relative flex items-center md:justify-between ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Desktop Center Icon */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center w-14 h-14 bg-[#447E36] text-white rounded-full shadow-lg z-10 border-4 border-white">
                  {event.icon}
                </div>

                {/* Content Side */}
                <div className={`w-full md:w-[45%] ${isEven ? "text-left" : "md:text-right"}`}>
                  
                  {/* Mobile Layout Wrapper (Flex) */}
                  <div className="flex md:block items-start gap-4">
                    
                    {/* Mobile Icon (Hidden on Desktop) */}
                    <div className="md:hidden flex-shrink-0 flex items-center justify-center w-12 h-12 bg-[#447E36] text-white rounded-full shadow-md">
                      {event.icon}
                    </div>

                    {/* Text Card */}
                    <div className={`flex-1 bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 ${!isEven && "md:ml-auto"}`}>
                      <span className="inline-block py-1 px-3 rounded-full bg-[#521028]/10 text-[#521028] text-sm font-bold tracking-wider mb-3">
                        {event.time}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                        {event.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Empty Spacer for the other side on desktop */}
                <div className="hidden md:block w-[45%]"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AgendaHighlights;