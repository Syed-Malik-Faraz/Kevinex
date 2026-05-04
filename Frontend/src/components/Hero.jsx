// src/components/Hero.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Play, ShoppingBag, Stars } from "lucide-react";
import squigglyTube from "../assets/squiggly_tube.png";
import pyramid from "../assets/pyramid.png";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20 px-6 bg-hero-dark bg-grain">
      {/* Background Radial Highlight */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[150px] opacity-60"></div>
      </div>

      {/* Floating 3D Assets */}
      <motion.div
        animate={{ 
          y: [0, -40, 0],
          rotate: [0, 10, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-[15%] right-[5%] lg:top-[20%] lg:right-[10%] w-32 h-32 lg:w-64 lg:h-64 z-10 pointer-events-none opacity-50 lg:opacity-100"
        style={{
          backgroundImage: `url(${squigglyTube})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'screen',
          filter: 'contrast(1.2) brightness(1.1) drop-shadow(0 0 30px rgba(79,70,229,0.4))',
          WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 70%)',
          maskImage: 'radial-gradient(circle, black 40%, transparent 70%)'
        }}
      />

      <motion.div
        animate={{ 
          y: [0, 30, 0],
          rotate: [0, -15, 0]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-[10%] left-[5%] lg:bottom-[15%] lg:left-[5%] w-20 h-20 lg:w-32 lg:h-32 z-10 pointer-events-none opacity-50 lg:opacity-100"
        style={{
          backgroundImage: `url(${pyramid})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'screen',
          filter: 'contrast(1.2) brightness(1.1) drop-shadow(0 0 20px rgba(79,70,229,0.3))',
          WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 70%)',
          maskImage: 'radial-gradient(circle, black 40%, transparent 70%)'
        }}
      />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10 w-full">

        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-indigo-500/10 backdrop-blur-md border border-indigo-500/20 text-[#359cea] text-sm font-black mb-10 shadow-lg shadow-indigo-500/5"
          >
            <Stars className="w-4 h-4 text-[#359cea] animate-pulse" />
            <span className="uppercase tracking-widest">New Collection {new Date().getFullYear()}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-black text-white leading-[0.9] mb-10 tracking-tighter"
          >
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-[#359cea] text-glow">
              Daily Living.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-xl text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium"
          >
          Kevinex Private Limited remains committed to
          consistent quality, operational reliability, and
          sustainable growth across all its present
          and future business categories.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
          >
            <button
              onClick={() => navigate("/products")}
              className="group flex items-center gap-4 bg-[#359cea] text-slate-900 px-10 py-5 rounded-[2rem] font-black hover:bg-indigo-700 hover:text-white transition-all duration-500 shadow-2xl shadow-indigo-500/20 hover:-translate-y-1 active:scale-95"
            >
              <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Explore Now
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition" />
            </button>

            <button
              className="flex items-center gap-4 px-10 py-5 rounded-[2rem] font-bold text-slate-300 hover:text-white transition-all duration-500 group border-2 border-slate-800 hover:border-indigo-500/50"
            >
              <div className="w-12 h-12 rounded-full border-2 border-slate-800 flex items-center justify-center bg-slate-900 group-hover:scale-110 transition-transform group-hover:border-indigo-500/50">
                <Play className="w-5 h-5 fill-indigo-400 text-indigo-400 ml-1" />
              </div>
              The story
            </button>
          </motion.div>
        </div>

        {/* Right Graphic Area */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 relative group py-10 flex justify-center items-center w-full"
        >
          <div className="relative w-full max-w-[320px] md:max-w-[500px] aspect-square">
            {/* Animated Ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-500/20"
            ></motion.div>
            
            <div className="absolute inset-4 rounded-full border border-indigo-500/10 backdrop-blur-sm bg-indigo-500/5 flex items-center justify-center overflow-hidden">
               <img
                src="/heroimage.jpg"
                alt="Kevinex Premium Product"
                className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:opacity-100 transition-opacity duration-700"
              />
            </div>

            {/* Float Card */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-2 md:-top-10 md:-right-4 bg-slate-900/80 backdrop-blur-xl p-3 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl z-20 border border-white/10"
            >
              <div className="flex items-center gap-2 md:gap-4">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-indigo-500/20 rounded-xl md:rounded-2xl flex items-center justify-center border border-indigo-500/30">
                  <Stars className="w-4 h-4 md:w-6 md:h-6 text-indigo-400" />
                </div>
                <div>
                  <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-indigo-400">Premium</p>
                  <p className="text-xs md:text-sm font-black text-white whitespace-nowrap">Verified Quality</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
