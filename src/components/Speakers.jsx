export const Speakers = () => {
    const speakers = [
    {
        name: "Dummy Name 1",
        location: "Tokyo, Japan",
        image: "https://placehold.co/600x400",
    },
    {
        name: "Dummy Name 2",
        location: "Arkansas, USA",
        image: "https://placehold.co/600x400",
    },
    {
        name: "Dummy Name 3",
        location: "United Kingdom",
        image: "https://placehold.co/600x400",
    },
    {
        name: "Dummy Name 4",
        location: "Sydney, Australia",
        image: "https://placehold.co/600x400",
    },
    {
        name: "Dummy Name 5",
        location: "Malaga, Spain",
        image: "https://placehold.co/600x400",
    },
    {
        name: "Dummy Name 6",
        location: "Melbourne, Australia",
        image: "https://placehold.co/600x400",
    },
    ];

    const invitedSpeakers = [
    {
        name: "Dummy Name 1",
        location: "Tokyo, Japan",
        image: "https://placehold.co/600x400",
    },
    {
        name: "Dummy Name 2",
        location: "Arkansas, USA",
        image: "https://placehold.co/600x400",
    },
    {
        name: "Dummy Name 3",
        location: "United Kingdom",
        image: "https://placehold.co/600x400",
    },
    ];

  return (
    <section className="py-16 px-6 md:px-16 bg-gray-50 font-poppins">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 id="keynote" className="text-2xl md:text-3xl font-extrabold tracking-wide uppercase text-[#111111] font-sans mb-12">
          Keynote Speakers
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 mb-10 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {speakers.map((speaker, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 p-6 flex flex-col items-center"
            >
              {/* Image */}
              <div className="w-40 h-40 rounded-full border-[3px] border-red-500 overflow-hidden mb-4">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {speaker.name}
              </h3>

              {/* Location */}
              <p className="text-sm text-gray-600 mb-4">({speaker.location})</p>

              {/* Button */}
              <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-sm font-medium border border-gray-300 rounded shadow-sm">
                Read More
              </button>
            </div>
          ))}
        </div>

        <h2 id="invited" className="text-2xl md:text-3xl font-extrabold tracking-wide uppercase text-[#111111] font-sans mb-12">
          Invited Speakers
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 mb-10 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {invitedSpeakers.map((speaker, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 p-6 flex flex-col items-center"
            >
              {/* Image */}
              <div className="w-40 h-40 rounded-full border-[3px] border-red-500 overflow-hidden mb-4">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {speaker.name}
              </h3>

              {/* Location */}
              <p className="text-sm text-gray-600 mb-4">({speaker.location})</p>

              {/* Button */}
              <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-sm font-medium border border-gray-300 rounded shadow-sm">
                Read More
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center">
            <img src="./sample-img.png"></img>
        </div>


      </div>
    </section>
  );
};

export default Speakers;
