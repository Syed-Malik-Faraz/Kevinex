import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const AboutUs = () => {
  return (
<>
    <Navbar />
    
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen flex flex-col items-center mt-5 py-16 px-6">
    
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl font-bold text-blue-900 mb-10 text-center"
      >
        About Kevinex Private Limited
      </motion.h1>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="max-w-4xl text-lg md:text-xl text-gray-700 space-y-6"
      >
        <p>
          Kevinex Private Limited is a <span className="font-semibold">Haryana-based company</span> engaged in the business of trading and distribution of <span className="text-blue-600 font-semibold">household and consumer products</span>, with a focus on essential everyday categories. The company’s current portfolio includes <span className="font-semibold">household tissue products and baby toys</span>, designed to meet <span className="italic">quality, safety, and usability standards</span> expected by modern Indian consumers.
        </p>

        <p>
          Operating across <span className="font-semibold">pan-India markets</span>, Kevinex Private Limited supplies its products through <span className="text-blue-600 font-semibold">retail channels, social e-commerce platforms, and online marketplaces</span>, ensuring wide accessibility and efficient distribution. The company follows <span className="italic">structured sourcing, compliant packaging, and transparent business practices</span> across its operations.
        </p>

        <p>
          Looking ahead, Kevinex Private Limited plans to expand its product portfolio into the <span className="text-blue-600 font-semibold">garments category</span>, targeting both retail and digital commerce channels. This planned diversification reflects the company’s long-term vision to build a <span className="font-semibold">scalable, consumer-focused trading business</span> across multiple lifestyle segments in India.
        </p>

        <p>
          Headquartered in Haryana, India, Kevinex Private Limited remains committed to <span className="font-semibold">consistent quality, operational reliability, and sustainable growth</span> across all its present and future business categories.
        </p>
      </motion.div>

      {/* Image / Illustration */}
      <motion.img
        src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80"
        alt="Kevinex Business"
        className="mt-12 rounded-xl shadow-xl w-full max-w-3xl"
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
    </div>
  </>
  );
};

export default AboutUs;
