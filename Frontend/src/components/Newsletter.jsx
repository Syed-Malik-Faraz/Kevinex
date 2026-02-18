import { useState } from "react";

export default function Newsletter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent Successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 "></div>

      <div className="relative max-w-6xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-70 animate-gradient mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10 md:p-16">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left Side - Contact Info */}
          <div className="text-white space-y-6">
            <h2 className="text-4xl font-bold tracking-wide">
              Get In Touch
            </h2>

            <p className="text-white/80 text-lg">
              Have questions or want to work with us?  
              Send us a message and we’ll respond as soon as possible.
            </p>

            <div className="space-y-3 text-white/90">
              <p className="flex items-center gap-2">
                📧 support@yourcompany.com
              </p>
              <p className="flex items-center gap-2">
                📞 +91 98765 43210
              </p>
              <p className="flex items-center gap-2">
                📍 India
              </p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-white/80 text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-white/80 text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
            />

            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-white/80 text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 resize-none"
            ></textarea>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-white text-blue-600 font-semibold shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105"
            >
              Send Message
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}
