// src/components/Hero.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Play } from "lucide-react";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-20 md:pt-48 md:pb-32 px-6">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-purple-50 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">

        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-bold mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
            New Collection 2024
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-8"
          >
            Success starts <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              with less.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0"
          >
            Experience premium quality with our minimalist collection. Designed to help you focus on what truly matters, through simplicity and elegance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5"
          >
            <button
              onClick={() => navigate("/products")}
              className="group flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition shadow-xl shadow-gray-200"
            >
              Shop Collection
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>

            <button
              className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition"
            >
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center bg-white">
                <Play className="w-4 h-4 fill-gray-700 text-gray-700 ml-1" />
              </div>
              Watch Story
            </button>
          </motion.div>
        </div>

        {/* Right Image/Graphic Area */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <img
              src="/heroimage.jpg"
              alt="Kevinnex Premium Product"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Floating Card UI */}

        </motion.div>
      </div>
    </section>
  );
}
