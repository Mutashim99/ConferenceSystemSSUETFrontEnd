import { useState } from "react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Message submitted successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form
  };

  return (
    <section
      id="contact"
      // Changed to white bg for an alternating-section feel
      className="py-20 md:py-24 px-6 md:px-16 bg-white text-gray-800 font-poppins"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Heading (Updated to primary purple) */}
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase text-[#521028] font-sans mb-12">
          Contact Us
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 shadow-xl rounded-lg p-8 space-y-6 text-left border border-gray-100"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              // Updated focus ring to accent green
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#447E36] focus:outline-none transition-all"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              // Updated focus ring to accent green
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#447E36] focus:outline-none transition-all"
              placeholder="Enter your email"
            />
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              // Updated focus ring to accent green
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#447E36] focus:outline-none transition-all"
              placeholder="Enter subject"
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Your Message <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              // Updated focus ring to accent green
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#447E36] focus:outline-none resize-none transition-all"
              placeholder="Type your message here..."
            ></textarea>
          </div>

          {/* Submit Button (Updated to accent green) */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#447E36] hover:bg-opacity-90 text-white font-semibold px-10 py-3 rounded-lg transition-all duration-200 shadow-md"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
