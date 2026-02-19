import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent Successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (

    <>
    
    <Navbar />
        <div className=" min-h-screen bg-[#deebfe] px-6 py-16 pt-24">

      <div className="max-w-6xl mx-auto backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10 md:p-16">

        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Contact Information */}
          <div className="text-gray-500 space-y-6">
            <h2 className="text-2xl font-semibold">Get in Touch</h2>
            <p className="text-gray-400">
              Have questions or want to work with us? Fill out the form and our
              team will get back to you shortly.
            </p>

             <div className="space-y-4 text-gray-500">
              <p>📍 India</p>
              <p>📧 support@kevinnex.com</p>
              <p>📞 +91 98765 43210</p>
              {/* <p>🕒 Mon - Sat : 9AM - 6PM</p> */}
            </div> 
            
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-white/80 text-gray-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 transition duration-300"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-white/80 text-gray-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 transition duration-300"
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-white/80 text-gray-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 transition duration-300"
            />

            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-white/80 text-gray-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 transition duration-300 resize-none"
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
    </div>
    <Footer />
</>

  );
}
