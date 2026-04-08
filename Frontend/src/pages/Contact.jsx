import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const API = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await axios.post(`${API}/api/messages`, formData);
      setStatus({ type: "success", message: "Message Sent Successfully! We'll get back to you soon." });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus({ 
        type: "error", 
        message: error.response?.data?.message || "Failed to send message. Please try again later." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#deebfe] to-[#eef2ff] px-6 py-16 pt-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto backdrop-blur-xl bg-white/40 border border-white/40 rounded-[2.5rem] shadow-2xl p-8 md:p-16 overflow-hidden relative"
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 text-center mb-4 tracking-tight">
              Get In Touch
            </h1>
            <p className="text-gray-500 text-center mb-16 max-w-2xl mx-auto text-lg">
              Have a question or feedback? We'd love to hear from you.
            </p>

            <div className="grid lg:grid-cols-12 gap-16 items-start">
              {/* Contact Information */}
              <div className="lg:col-span-5 space-y-10">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900">Contact Information</h2>
                  <p className="text-gray-500 leading-relaxed text-lg">
                    Our team is here to help you. Reach out through any of these channels.
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-blue-600">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 uppercase tracking-widest text-xs mb-1">Our Location</h4>
                      <p className="text-gray-500 font-medium">India</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-blue-600">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 uppercase tracking-widest text-xs mb-1">Email Us</h4>
                      <p className="text-gray-500 font-medium">support@kevinex.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-blue-600">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 uppercase tracking-widest text-xs mb-1">Call Us</h4>
                      <p className="text-gray-500 font-medium">+91 98765 43210</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-gray-50">
                <AnimatePresence>
                  {status.message && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`mb-8 p-4 rounded-2xl flex items-center gap-3 font-bold text-sm ${
                        status.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                      }`}
                    >
                      {status.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                      {status.message}
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-blue-500 focus:bg-white focus:outline-none transition duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-blue-500 focus:bg-white focus:outline-none transition duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="How can we help?"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-blue-500 focus:bg-white focus:outline-none transition duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Message</label>
                    <textarea
                      name="message"
                      rows="5"
                      placeholder="Tell us more about your inquiry..."
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-blue-500 focus:bg-white focus:outline-none transition duration-300 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group w-full py-5 rounded-2xl bg-gray-900 text-white font-black shadow-2xl hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 active:scale-95 flex items-center justify-center gap-3 overflow-hidden"
                  >
                    <span>{loading ? "Sending..." : "Send Message"}</span>
                    {!loading && <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
