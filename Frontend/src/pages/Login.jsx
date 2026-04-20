import { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import bgImage from "../assets/Background2.jpeg";
import { API_URL } from "../apiConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API = API_URL;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${API}/api/users/login`,
        { email, password }
      );

      localStorage.setItem("userInfo", JSON.stringify(data));

      if (data.isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid login credentials");
    }
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col overflow-hidden">
      {/* Background with Zoom Animation */}
      <motion.div 
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Dynamic Overlay - Darker for better text visibility */}
      <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-[4px] z-1"></div>

      <Navbar />
      
      <div className="flex-1 flex justify-center items-center relative z-10 px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-effect p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] rounded-[3rem] w-full max-w-md border border-white/40"
        >
          <div className="text-center mb-10">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-black text-gray-900 tracking-tight mb-2"
            >
              Sign In
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 font-bold"
            >
              Enter the premium world of Kevinex
            </motion.p>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-xs font-black text-indigo-600 uppercase tracking-[0.2em] mb-3 ml-1">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-white/60 border border-white/80 p-4 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-300 font-medium"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-xs font-black text-indigo-600 uppercase tracking-[0.2em] mb-3 ml-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/60 border border-white/80 p-4 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-300 font-medium"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </motion.div>

            <motion.button 
              whileHover={{ scale: 1.02, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-lg shadow-2xl shadow-gray-900/30 hover:bg-gray-800 transition-all duration-300"
            >
              Continue
            </motion.button>

            <div className="pt-6 relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-2 text-gray-400 font-bold">or</span></div>
            </div>

            <p className="text-center text-sm text-gray-600 font-bold">
              Don't have an account?{" "}
              <NavLink to="/signup" className="text-indigo-600 font-black hover:underline underline-offset-4">
                Join Now
              </NavLink>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
