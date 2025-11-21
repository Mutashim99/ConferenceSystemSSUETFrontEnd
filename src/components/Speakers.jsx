import { motion } from "framer-motion"; // Import motion

export const Speakers = () => {
  const speakers = [
    {
      name: "Dummy Name 1",
      location: "Tokyo, Japan",
      image: "https://placehold.co/600x400",
    },
    {
      name: "Dummy Name 1",
      location: "Tokyo, Japan",
      image: "https://placehold.co/600x400",
    },
    {
      name: "Dummy Name 1",
      location: "Tokyo, Japan",
      image: "https://placehold.co/600x400",
    },
    {
      name: "Dummy Name 1",
      location: "Tokyo, Japan",
      image: "https://placehold.co/600x400",
    },
    {
      name: "Dummy Name 1",
      location: "Tokyo, Japan",
      image: "https://placehold.co/600x400",
    },
    {
      name: "Dummy Name 1",
      location: "Tokyo, Japan",
      image: "https://placehold.co/600x400",
    },
    // ... other speakers
  ];
  const invitedSpeakers = [
    {
      name: "Dummy Name 1",
      location: "Tokyo, Japan",
      image: "https://placehold.co/600x400",
    },
    {
      name: "Dummy Name 1",
      location: "Tokyo, Japan",
      image: "https://placehold.co/600x400",
    },
    {
      name: "Dummy Name 1",
      location: "Tokyo, Japan",
      image: "https://placehold.co/600x400",
    },
    {
      name: "Dummy Name 1",
      location: "Tokyo, Japan",
      image: "https://placehold.co/600x400",
    },
    {
      name: "Dummy Name 1",
      location: "Tokyo, Japan",
      image: "https://placehold.co/600x400",
    },
    {
      name: "Dummy Name 1",
      location: "Tokyo, Japan",
      image: "https://placehold.co/600x400",
    },

    // ... other invited speakers
  ];

  return (
    <section className="py-20 md:py-24 px-6 md:px-16 bg-gray-50 font-poppins">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2
          id="keynote"
          className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase text-[#521028] font-sans mb-16"
        >
          Keynote Speakers
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 mb-16 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {speakers.map((speaker, index) => (
            // Added motion.div and hover effect
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-6 flex flex-col items-center"
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Image */}
              <div className="w-40 h-40 rounded-full border-4 border-[#447E36] overflow-hidden mb-4 shadow-inner">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {speaker.name}
              </h3>

              {/* Location */}
              <p className="text-sm text-gray-600 mb-5">({speaker.location})</p>

              {/* Button */}
              <motion.button
                className="px-6 py-2 bg-[#447E36] text-white text-sm font-medium rounded-md"
                whileHover={{ scale: 1.1, backgroundColor: "#2d9a40" }}
              >
                Read More
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* ... (Same logic for Invited Speakers grid) ... */}

        <h2
          id="invited"
          className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase text-[#521028] font-sans mb-16"
        >
          Invited Speakers
        </h2>
        <div className="grid grid-cols-1 mb-16 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {invitedSpeakers.map((speaker, index) => (
            // Added motion.div and hover effect
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-6 flex flex-col items-center"
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-40 h-40 rounded-full border-4 border-[#447E36] overflow-hidden mb-4 shadow-inner">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {speaker.name}
              </h3>
              <p className="text-sm text-gray-600 mb-5">({speaker.location})</p>
              <motion.button
                className="px-6 py-2 bg-[#447E36] text-white text-sm font-medium rounded-md"
                whileHover={{ scale: 1.1, backgroundColor: "#2d9a40" }}
              >
                Read More
              </motion.button>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center items-center">
          <img src="./sample-img.png" alt="Sample" />
        </div>
      </div>
    </section>
  );
};

export default Speakers;
