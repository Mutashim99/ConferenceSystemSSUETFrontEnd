import { motion } from "framer-motion";

export const Speakers = ({ id }) => {
  const internationalInvitedSpeakers = [
    {
      name: "Prof Mariofanna Milanova",
      location: "University of Arkansas Little Rock, AR 72204, USA",
      image: "./international_invited_speakers/milanova.jpg",
    },
    {
      name: "Dr. Kashif Nisar",
      location: "Swinburne University of Technology, Sydney",
      image: "./international_invited_speakers/kashif.jpg",
    },
    {
      name: "Prof Arthur James Swart",
      location: "Central University of Technology, South Africa",
      image: "./international_invited_speakers/Arthur.webp",
    },
    {
      name: "Prof Hui Wang",
      location: "Queen's University, UK",
      image: "./international_invited_speakers/hui.webp",
    },
    {
      name: "Dr Jason Levy",
      location: "University of Hawaii West Oahu, USA",
      image: "./international_invited_speakers/jason.jpg",
    },
    {
      name: "Dr Bagwandas",
      location: "Center of AI, Torrens University Australia",
      image: "./international_invited_speakers/bhagwan.jpeg",
    },
    {
      name: "Prof Mohamed Rawidean Mohd Kassim",
      location:
        "MIMOS (Malaysian Institute of Microelectronic Systems), Malaysia",
      image: "./international_invited_speakers/kassim.avif",
    },
    {
      name: "Prof Dr Enrique Nava",
      location: "University of Malaga, Spain",
      image: "./international_invited_speakers/enrique.webp",
    },
    {
      name: "Dr. D. M. Akbar Hussain",
      location: "Aalborg University Denmark",
      image: "./international_invited_speakers/akbar.jpeg",
    },
    {
      name: "Dr. Vaidas Giedrimas",
      location:
        "Panevezio Kolegija/State Higher Education Institution (PANKO), Lithuania",
      image: "./international_invited_speakers/vaidas.jpeg",
    },
  ];

  const nationalInvitedSpeakers = [
    {
      name: "Dr Shoab Ahmed Khan",
      location: "Rector - CASE Islamabad",
      image: "./national_invited_speakers/shoaib.jpg",
    },
    {
      name: "Prof Dr Ghulam Ali Mallah",
      location: "Secretary IBCC Islamabad",
      image: "./national_invited_speakers/ghulam.jpeg",
    },
    {
      name: "Prof. Tahir Chaudhry",
      location: "Islamabad",
      image: "./national_invited_speakers/",
    },
    {
      name: "Dr Faisal Ahmed Khan",
      location: "Pro VC - BUITEMS Quetta",
      image: "./national_invited_speakers/faisal.jpeg",
    },
    {
      name: "Prof Dr Yasir Ayaz",
      location: "NUST - Islamabad",
      image: "./national_invited_speakers/yasir.png",
    },
    {
      name: "Mr Ammar Jafri",
      location: "Islamabad",
      image: "./national_invited_speakers/",
    },
    {
      name: "Dr. Shafay Shamail",
      location: "LUMS Lahore",
      image: "./national_invited_speakers/shafay.jpg",
    },
    {
      name: "Prof Dr Zunera Jalil",
      location: "Dean National Cyber Security Air University Islamabad",
      image: "./national_invited_speakers/zunera.jpg",
    },
    {
      name: "Prof Dr Muazzam A Khan",
      location: "Dept of CS Quaid-e-Azam University Islamabad",
      image: "./national_invited_speakers/muazzam.png",
    },
    {
      name: "Dr Momina Moetesum",
      location: "Head if Software Eng Dept SEECS, NUST Islamabad",
      image: "./national_invited_speakers/momina.jpeg",
    },
    {
      name: "Dr Farhana Jabeen",
      location: "Assc Prof & HOD Comsats University Islamabad",
      image: "./national_invited_speakers/farhana.jpeg",
    },
    {
      name: "Dr M Ashraf",
      location:
        "Chairperson / Assc Prof Department of CE Balochistan University of IT & Management Quetta",
      image: "./national_invited_speakers/ashraf.jpg",
    },
  ];

  const organizingCommittee = [
    {
      name: "Prof Dr Khalid Mahmood Iraqi",
      location: "Patron in Chief",
      image: "./organizing_committee/khalid.jpeg",
    },
    {
      name: "Prof. Dr. Muhammad Afzal Haq",
      location: "Patron",
      image: "./organizing_committee/afzaal.webp",
    },
    {
      name: "Dr M Sadiq Ali Khan",
      location: "Chair (Chairman Dept of CS, UoK)",
      image: "./organizing_committee/sadiq.jpeg",
    },
    {
      name: "Prof. Dr. Muhammad Aamir",
      location: "Co-Chair (Dean ECE, SSUET)",
      image: "./organizing_committee/aamir.jpeg",
    },
    {
      name: "Engr. Muhammad Zakir Shaikh",
      location: "Secretary (Chair IEEE CS Karachi)",
      image: "./organizing_committee/zakir.jpeg",
    },
    {
      name: "Engr. Dur-e-Shawar Agha",
      location: "Co-Secretary",
      image: "./organizing_committee/shawar.webp",
    },
    {
      name: "Engr. Dr. Muhammad Naseem",
      location: "Chair Program Committee",
      image: "./organizing_committee/naseem.webp",
    },
    {
      name: "Engr. Dr. Kashif Shaikh",
      location: "Chair Program Committee",
      image: "./organizing_committee/kashif.webp",
    },
    {
      name: "Prof Dr. Bhawany Shankar Choudhary",
      location: "Chair TPC",
      image: "./organizing_committee/bawaney.jpeg",
    },
    {
      name: "Engr. Dr. Huma Jamshed",
      location: "Co-Chair TPC",
      image: "./organizing_committee/huma.png",
    },
    {
      name: "Dr. Bagwandas",
      location: "Chair Review Committee",
      image: "./international_invited_speakers/bhagwan.jpeg",
    },
    {
      name: "Engr. Dr. Farheen Qazi",
      location: "Co-Chair Review Committee",
      image: "./organizing_committee/farheen.webp",
    },
    {
      name: "Engr. Priha Bhatti",
      location: "Chair Registration Committee",
      image: "./organizing_committee/priha.webp",
    },
    {
      name: "Engr. Noman Ali Khan",
      location: "Co-Chair Registration Committee",
      image: "./organizing_committee/noman.webp",
    },
    {
      name: "Engr. Hassan Zaki",
      location: "Hospitality & Protocol Coordinator",
      image: "./organizing_committee/zaki.webp",
    },
    {
      name: "Engr. Tauseef Mubeen",
      location: "Website & IT Coordinator",
      image: "./organizing_committee/tauseef.webp",
    },
    {
      name: "Engr. Osama Ahmed Siddiqui",
      location: "Logistics Coordinator",
      image: "./organizing_committee/osama.jpeg",
    },
    {
      name: "Engr. Ayesha Urooj",
      location: "Sponsorship Coordinator",
      image: "./organizing_committee/",
    },
    {
      name: "Engr. Fayyaz Ali",
      location: "Marketing & PR Coordinator",
      image: "./organizing_committee/fayyaz.jpeg",
    },
    {
      name: "Engr. Sonish Aslam / Dr. Humaira Azam",
      location: "Volunteers Coordinator",
      image: "./organizing_committee/sonish.webp",
    },
    {
      name: "Ms. Maham Imran",
      location: "Creative Designing Coordinator",
      image: "./organizing_committee/",
    },
    {
      name: "Ms. Roohi Kamal",
      location: "Member",
      image: "./organizing_committee/roohi.webp",
    },
    {
      name: "Dr. Muzammil Ahmed Khan",
      location: "Member",
      image: "./organizing_committee/muzammil.webp",
    },
    {
      name: "Dr. Waleej Haider",
      location: "Member",
      image: "./organizing_committee/waleej.jpeg",
    },
    {
      name: "Dr. Nadeem Mahmood",
      location: "Member",
      image: "./organizing_committee/nadeem.png",
    },
    {
      name: "Mr. Badar Sami",
      location: "Member",
      image: "./organizing_committee/badar.jpeg",
    },
    {
      name: "Mr. Syed Jamal Hussain",
      location: "Member",
      image: "./organizing_committee/jamal.jpg",
    },
    {
      name: "Dr. Muhammad Saeed",
      location: "Member",
      image: "./organizing_committee/saeed.jpeg",
    },
    {
      name: "Mr. Hussain Saleem",
      location: "Member",
      image: "./organizing_committee/hussain.jpeg",
    },
    {
      name: "Dr. S. M. Khalid Jamal",
      location: "Member",
      image: "./organizing_committee/khalid.jpg",
    },
    {
      name: "Dr. Syed Asim Ali",
      location: "Member",
      image: "./organizing_committee/asim.jpeg",
    },
    {
      name: "Dr. Farhan Ahmed Siddiqui",
      location: "Member",
      image: "./organizing_committee/farhaan.jpeg",
    },
    {
      name: "Dr. Humera Tariq",
      location: "Member",
      image: "./organizing_committee/humera.jpeg",
    },
    {
      name: "Mr. Mukesh Kumar Rathi Maheshwari",
      location: "Member",
      image: "./organizing_committee/",
    },
    {
      name: "Dr. Shaista Rais",
      location: "Member",
      image: "./organizing_committee/shaista.jpeg",
    },
    {
      name: "Ms. Madiha Khurram",
      location: "Member",
      image: "./organizing_committee/madiha.jpeg",
    },
    {
      name: "Ms. Maryam Feroz",
      location: "Member",
      image: "./organizing_committee/maryam.jpeg",
    },
  ];

  return (
    <motion.section
      id={id}
      className="py-20 md:py-24 px-6 md:px-16 bg-gray-50 font-poppins"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* International Speakers */}
        <h2
          id="internationallyInvitedSpeakers"
          className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase text-[#521028] font-sans mb-16"
        >
          International Invited Speakers
        </h2>
        <div className="grid grid-cols-1 mb-16 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {internationalInvitedSpeakers.map((speaker, index) => (
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
              <p className="text-sm text-gray-600 mb-5 text-center">
                ({speaker.location})
              </p>
              {/* <motion.button
                className="px-6 py-2 bg-[#447E36] text-white text-sm font-medium rounded-md"
                whileHover={{ scale: 1.1, backgroundColor: "#2d9a40" }}
              >
                Read More
              </motion.button> */}
            </motion.div>
          ))}
        </div>

        {/* National Speakers */}
        <h2
          id="nationalInvitedSpeakers"
          className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase text-[#521028] font-sans mb-16"
        >
          National Invited Speakers
        </h2>
        <div className="grid grid-cols-1 mb-16 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {nationalInvitedSpeakers.map((speaker, index) => (
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
              <p className="text-sm text-gray-600 mb-5 text-center">
                ({speaker.location})
              </p>
            </motion.div>
          ))}
        </div>

        {/* Organizing Committee */}
        <h2
          id="organizingCommittee"
          className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase text-[#521028] font-sans mb-16"
        >
          Organizing committee
        </h2>
        <div className="grid grid-cols-1 mb-16 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {organizingCommittee.map((speaker, index) => (
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
              <p className="text-sm text-gray-600 mb-5 text-center">
                ({speaker.location})
              </p>
              {/* <motion.button
                className="px-6 py-2 bg-[#447E36] text-white text-sm font-medium rounded-md"
                whileHover={{ scale: 1.1, backgroundColor: "#2d9a40" }}
              >
                Read More
              </motion.button> */}
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center items-center">
          <img src="./sample-img.png" alt="Sample" />
        </div>
      </div>
    </motion.section>
  );
};

export default Speakers;
