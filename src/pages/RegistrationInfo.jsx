import { motion } from "framer-motion";
import { CreditCard, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const RegistrationInfo = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  // Dates from your handwritten note
  const timelineEvents = [
    {
      date: "1 DEC 2025",
      label: "Call for Papers",
      color: "blue-500",
      position: "top",
    },
    {
      date: "15 JAN 2026",
      label: "Abstract Submission Deadline",
      color: "purple-500",
      position: "bottom",
    },
    {
      date: "20 JAN 2026",
      label: "Approval of Abstract",
      color: "indigo-500",
      position: "top",
    },
    {
      date: "15 FEB 2026",
      label: "Paper Submission Deadline",
      color: "yellow-500",
      position: "bottom",
    },
    {
      date: "1 MAR 2026",
      label: "Notification of Acceptance / Revision",
      color: "red-600",
      position: "top",
    },
    {
      date: "15 MAR 2026",
      label: "Camera Ready Submission & Copyright",
      color: "teal-500",
      position: "bottom",
    },
    {
      date: "20 MAR 2026",
      label: "Registration Deadline",
      color: "[#447E36]",
      position: "top",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen font-poppins pt-10 pb-20">
        {/* Page Header */}
        <div className="text-center mb-16 px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#521028] mb-4 uppercase tracking-wide">
            Registration Details
          </h1>
          <div className="w-24 h-1 bg-[#447E36] mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Everything you need to know about important dates, fees, and
            submission guidelines.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
          {/* --- SECTION 1: IMPORTANT DATES TIMELINE --- */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative pt-10 pb-10 flex justify-center"
          >
            {/* ================= MOBILE VIEW ================= */}
            <div className="md:hidden relative w-full max-w-md">
              <h2 className="text-2xl font-bold text-[#521028] mb-10 text-center">
                Important Dates
              </h2>
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 top-0 rounded-full"></div>
              <div className="space-y-8 relative z-10">
                {timelineEvents.map((event, idx) => {
                  const isLeft = idx % 2 === 0;
                  return (
                    <div
                      key={idx}
                      className={`flex items-center w-full ${
                        isLeft ? "flex-row" : "flex-row-reverse"
                      }`}
                    >
                      <div
                        className={`w-[45%] ${
                          isLeft ? "text-right pr-4" : "text-left pl-4"
                        }`}
                      >
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                          <p
                            className={`text-xs font-bold uppercase tracking-wider text-${event.color}`}
                          >
                            {event.label}
                          </p>
                          <p className="text-lg font-extrabold text-[#521028] mt-1">
                            {event.date}
                          </p>
                        </div>
                      </div>
                      <div className="w-[10%] flex justify-center">
                        <div
                          className={`w-6 h-6 rounded-full bg-${event.color} border-4 border-white ring-2 ring-${event.color} shadow-sm`}
                        ></div>
                      </div>
                      <div className="w-[45%]"></div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ================= DESKTOP VIEW ================= */}
            <div className="hidden md:block relative h-80 w-full max-w-6xl mt-10">
              <div className="absolute top-1/2 left-0 w-full h-1.5 bg-gray-200 rounded-full -translate-y-1/2"></div>
              <div className="relative w-full h-full flex justify-between items-center px-8">
                {timelineEvents.map((event, index) => {
                  const isTopText = event.position === "top";
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: isTopText ? -30 : 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15, duration: 0.5 }}
                      className="relative flex flex-col items-center group w-32"
                    >
                      <div
                        className={`w-10 h-10 rounded-full bg-${event.color} border-[6px] border-white ring-4 ring-${event.color} z-10 relative transition-transform duration-300 group-hover:scale-110 shadow-lg`}
                      >
                        <div
                          className={`absolute inset-0 rounded-full bg-${event.color} blur-xl opacity-0 group-hover:opacity-40 transition-opacity`}
                        ></div>
                      </div>
                      <div
                        className={`absolute w-56 text-center flex flex-col items-center ${
                          isTopText ? "bottom-14" : "top-14"
                        }`}
                      >
                        <div
                          className={`absolute w-0.5 h-12 bg-gray-300 ${
                            isTopText ? "-bottom-14" : "-top-14"
                          }`}
                        ></div>
                        {isTopText ? (
                          <>
                            <span
                              className={`text-xs font-bold text-${event.color} uppercase leading-tight mb-2 px-2`}
                            >
                              {event.label}
                            </span>
                            <span className="text-xl font-extrabold text-[#521028]">
                              {event.date}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-xl font-extrabold text-[#521028] mb-2">
                              {event.date}
                            </span>
                            <span
                              className={`text-xs font-bold text-${event.color} uppercase leading-tight px-2`}
                            >
                              {event.label}
                            </span>
                          </>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.section>

          {/* --- SECTION 2: FEE STRUCTURE --- */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <CreditCard className="text-[#447E36]" size={32} />
              <h2 className="text-2xl font-bold text-[#521028]">
                Registration Fees
              </h2>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#521028] text-white">
                    <th className="p-4 font-semibold w-1/2">Category</th>
                    <th className="p-4 font-semibold">Early Bird</th>
                    <th className="p-4 font-semibold">Regular Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    {
                      cat: "Author (IEEE Member)",
                      early: "-",
                      reg: "PKR 5000",
                    },
                    {
                      cat: "Author (Student)",
                      early: "PKR 6000",
                      reg: "PKR 8000",
                    },
                    {
                      cat: "Author (Professional)",
                      early: "PKR 8000",
                      reg: "PKR 10000",
                    },
                    {
                      cat: "Attendee (Non-Author)",
                      early: "-",
                      reg: "PKR 1500",
                    },
                    {
                      cat: "International Author",
                      early: "-",
                      reg: "$200",
                    },
                    {
                      cat: "International IEEE Member",
                      early: "-",
                      reg: "$150",
                    },
                  ].map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4 font-medium text-gray-800">
                        {row.cat}
                      </td>
                      <td className="p-4 text-[#447E36] font-bold">
                        {row.early}
                      </td>
                      <td className="p-4 text-gray-600 font-bold">{row.reg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* --- SECTION 3: WHAT IS INCLUDED --- */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Bank Details for local */}
            <div className="bg-[#521028] text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">
                  Bank Transfer Details For Local Authors
                </h3>
                <div className="space-y-3 font-mono text-sm opacity-90">
                  <p>
                    <span className="opacity-60 block text-xs uppercase">
                      Bank Name
                    </span>{" "}
                    Easypaisa Bank Limited
                  </p>
                  <p>
                    <span className="opacity-60 block text-xs uppercase">
                      Account Title
                    </span>{" "}
                    Wasif Waheed
                  </p>
                  <p>
                    <span className="opacity-60 block text-xs uppercase">
                      IBAN
                    </span>{" "}
                    PK29TMFB0000000057871761
                  </p>{" "}
                  <p>
                    <span className="opacity-60 block text-xs uppercase">
                      Account number
                    </span>{" "}
                    0316-2308010
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#447E36] rounded-full blur-2xl opacity-50"></div>
            </div>

            {/* Inclusions for international*/}
            <div className="bg-[#521028] text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">
                  Bank Transfer Details For International Authors
                </h3>
                <div className="space-y-3 font-mono text-sm opacity-90">
                  <p>
                    <span className="opacity-60 block text-xs uppercase">
                      Bank Name
                    </span>{" "}
                    Dummy
                  </p>
                  <p>
                    <span className="opacity-60 block text-xs uppercase">
                      Account Title
                    </span>{" "}
                    Dummy
                  </p>
                  <p>
                    <span className="opacity-60 block text-xs uppercase">
                      IBAN
                    </span>{" "}
                    Dummy
                  </p>
                  <p>
                    <span className="opacity-60 block text-xs uppercase">
                      Swift Code
                    </span>{" "}
                    Dummy
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#447E36] rounded-full blur-2xl opacity-50"></div>
            </div>
          </motion.section>

          {/* CALL TO ACTION */}
          <div className="flex justify-center pt-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Ready to join us?
              </h3>
              <Link
                to="/register"
                className="inline-block bg-[#447E36] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#36662b] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Create Account & Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationInfo;
