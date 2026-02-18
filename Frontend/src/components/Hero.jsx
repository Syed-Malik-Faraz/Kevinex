// src/components/Hero.jsx
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";

export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center h-screen flex flex-col justify-center items-center text-center px-6"
      style={{ backgroundImage: 'url("/heroimage.jpg")' }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        
        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 
                     bg-gradient-to-r from-blue-400 to-purple-500 
                     bg-clip-text text-transparent"
        >
          Success starts with less
        </motion.h1>

        {/* Animated Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
        >
          This January we’re teaming up with wellness brands 
          to help you do more with less.
        </motion.p>

        {/* Animated Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 rounded-full font-semibold text-white 
                     bg-gradient-to-r from-blue-600 to-purple-600 
                     shadow-lg shadow-blue-500/40
                     hover:shadow-purple-500/50
                     transition-all duration-300"
        >
          <button onClick={() => Navigate("/products")}>
          Learn More
           </button>
         
        </motion.button>
      </div>
    </section>
  );
}
