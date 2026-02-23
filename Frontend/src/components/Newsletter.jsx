import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

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
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-900 rounded-[3rem] overflow-hidden relative shadow-2xl">
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/20 blur-[100px] -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-600/20 blur-[100px] -ml-20 -mb-20"></div>

          <div className="relative z-10 grid lg:grid-cols-2">

            {/* Contact Info (Dark Side) */}
            <div className="p-10 md:p-20 text-white flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-extrabold mb-8">
                  Get in touch
                </h2>
                <p className="text-gray-400 text-lg mb-12 max-w-md leading-relaxed">
                  Have questions or want to learn more about our philosophy? Send us a message and we'll get back to you shortly.
                </p>

                <div className="space-y-8">
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-600 transition duration-300">
                      <Mail className="w-6 h-6 text-indigo-400 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Email us</p>
                      <p className="text-lg font-semibold">support@kevinnex.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-600 transition duration-300">
                      <Phone className="w-6 h-6 text-indigo-400 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Call us</p>
                      <p className="text-lg font-semibold">+91 01234 56789</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-600 transition duration-300">
                      <MapPin className="w-6 h-6 text-indigo-400 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Visit us</p>
                      <p className="text-lg font-semibold">New Delhi, India</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form (Light/Integrated Side) */}
            <div className="bg-white/5 lg:bg-white/5 border-t lg:border-t-0 lg:border-l border-white/10 p-10 md:p-20">
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 ml-1">Message</label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-300 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-5 rounded-2xl bg-indigo-600 text-white font-bold text-lg shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  Send Message <Send className="w-5 h-5" />
                </button>
              </motion.form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
