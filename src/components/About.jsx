export const About = () => {
  return (
    <section
      id="about"
      // Increased padding for more white space
      className="py-20 md:py-24 px-6 md:px-16 bg-white text-gray-800 font-poppins"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading (Updated to primary purple) */}
        <h2 className="text-3xl mb-6 md:text-4xl font-extrabold tracking-wide uppercase text-[#521028] font-sans">
          About Us
        </h2>

        {/* Content (Updated text size and line height for elegance) */}
        <div className="text-justify mb-12 text-base md:text-lg text-gray-700 leading-relaxed space-y-5">
          <p>
            University of Karachi holds a unique position in the country’s
            educational system. As a respected research and teaching
            institution, it is committed to intellectual leadership, and to
            excellence in both developing knowledge and conveying that knowledge
            to its students. University Of Karachi meets the commitments to
            preserve knowledge through its instructional and research programs
            for higher level education.
          </p>
          <p>
            The Department of Computer Science, University of Karachi, offers a
            comprehensive range of degree programs, including BS degrees in
            Computer Science (CS), Software Engineering (SE), and Artificial
            Intelligence (AI). Additionally, the department provides advanced
            postgraduate studies through its MS and PhD programs in Computer
            Science.
          </p>
          <p>
            To further strengthen the discipline of Computer Science by
            producing high-quality professionals with sound fundamental
            knowledge, the Department launched the BS (Computer Science) program
            in 1996 and 2001 — a four-year degree leading to the MS (Computer
            Science), a two-year program after completing the BS.
          </p>
        </div>

        {/* Heading (Updated to primary purple) */}
        <h2 className="text-3xl mb-6 md:text-4xl font-extrabold tracking-wide uppercase text-[#521028] font-sans">
          Conference Aims and Objectives
        </h2>

        {/* Content (Updated text size and line height) */}
        <div className="text-justify text-base md:text-lg text-gray-700 leading-relaxed space-y-5">
          <p>
            The International Research Conference is a federated organization
            dedicated to bringing together a significant number of diverse
            scholarly events for presentation within the conference program.
            Events will run over a span of time during the conference depending
            on the number and length of the presentations.
          </p>
          <p>
            The ICISCT 2026 event aims to bring together leading academic
            scientists, researchers and research scholars to exchange and share
            their experiences and research results on all aspects of INFORMATION
            SCIENCE and COMMUNICATION TECHNOLOGY. It also provides a premier
            interdisciplinary platform for researchers, practitioners and
            educators to present and discuss the most recent innovations,
            trends, and concerns as well as practical challenges encountered and
            solutions adopted in the fields of INFORMATION SCIENCE and
            COMMUNICATION TECHNOLOGY.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
