// src/components/Hero.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Play, ShoppingBag, Stars } from "lucide-react";
import heroBg from "../assets/Background10.jpeg";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-32 pb-20 px-6">
      {/* Background with Asset */}
      <div 
        className="absolute inset-0 z-0 opacity-10 grayscale-[0.5] scale-105"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Modern Gradient Overlays */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-[120px] opacity-40 mix-blend-multiply animate-pulse"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-purple-100 rounded-full blur-[100px] opacity-30 mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10 w-full">
        
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/50 backdrop-blur-md border border-indigo-100 text-indigo-700 text-sm font-black mb-10 shadow-sm"
          >
            <Stars className="w-4 h-4 text-indigo-500 animate-spin-slow" />
            <span className="uppercase tracking-widest">New Collection {new Date().getFullYear()}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-black text-gray-900 leading-[0.9] mb-10 tracking-tighter"
          >
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 text-glow">
              Daily Living.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-500 mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium"
          >
            Discover the harmony of minimalism and performance. Kevinex brings you curated essentials designed to transform your space into a sanctuary of elegance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
          >
            <button
              onClick={() => navigate("/products")}
              className="group flex items-center gap-4 bg-gray-900 text-white px-10 py-5 rounded-[2rem] font-black hover:bg-indigo-600 transition-all duration-500 shadow-2xl shadow-indigo-200/50 hover:-translate-y-1 active:scale-95"
            >
              <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Explore Now
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition" />
            </button>

            <button
              className="flex items-center gap-4 px-10 py-5 rounded-[2rem] font-bold text-gray-900 hover:bg-white hover:shadow-xl transition-all duration-500 group border-2 border-transparent hover:border-gray-50"
            >
              <div className="w-12 h-12 rounded-full border-2 border-gray-100 flex items-center justify-center bg-white group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 fill-indigo-600 text-indigo-600 ml-1" />
              </div>
              The story
            </button>
          </motion.div>
        </div>

        {/* Right Image/Graphic Area with 3D Effect */}
        <motion.div
          initial={{ opacity: 0, x: 60, rotate: 5 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 relative group py-10"
        >
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-[12px] border-white max-w-[500px] mx-auto transform transition-transform duration-700 group-hover:scale-[1.02] group-hover:-rotate-1">
            <img
              src="/heroimage.jpg"
              alt="Kevinex Premium Product"
              className="w-full h-auto object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* Floating UI Elements */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 lg:-right-12 bg-white p-6 rounded-3xl shadow-2xl z-20 border border-gray-50 hidden sm:block"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
                <Stars className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Premium</p>
                <p className="text-sm font-black text-gray-900">Verified Quality</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-10 -left-6 lg:-left-12 bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl z-20 border border-white/50 hidden md:block"
          >
            <div className="space-y-3">
              <p className="text-4xl font-black text-indigo-600">4.9/5</p>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => <div key={i} className="w-2 h-2 rounded-full bg-indigo-600"></div>)}
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Customer Satisfaction</p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
