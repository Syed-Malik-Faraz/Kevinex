import { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import bgImage from "../assets/Background2.jpeg";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_URL;

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const { data } = await axios.post(
                `${API}/api/users/register`,
                { name, email, password }
            );

            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/home");
        } catch (error) {
            alert(error.response?.data?.message || error.message);
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
            
            {/* Dynamic Overlay - Darker for better visibility */}
            <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-[4px] z-1"></div>

            <Navbar />
            
            <div className="flex-1 flex justify-center items-center relative z-10 px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="glass-effect p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] rounded-[3rem] w-full max-w-lg border border-white/40"
                >
                    <div className="text-center mb-8">
                        <motion.h2 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-4xl font-black text-gray-900 tracking-tight mb-2"
                        >
                          Join us
                        </motion.h2>
                        <p className="text-gray-600 font-bold">Create your premium account today</p>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-5">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <label className="block text-xs font-black text-indigo-600 uppercase tracking-[0.2em] mb-2 ml-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full bg-white/60 border border-white/80 p-4 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-300 font-medium"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <label className="block text-xs font-black text-indigo-600 uppercase tracking-[0.2em] mb-2 ml-1">Email</label>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="w-full bg-white/60 border border-white/80 p-4 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-300 font-medium"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <label className="block text-xs font-black text-indigo-600 uppercase tracking-[0.2em] mb-2 ml-1">Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-white/60 border border-white/80 p-4 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-300 font-medium"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 }}
                            >
                                <label className="block text-xs font-black text-indigo-600 uppercase tracking-[0.2em] mb-2 ml-1">Confirm</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-white/60 border border-white/80 p-4 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-300 font-medium"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </motion.div>
                        </div>

                        <motion.button 
                            whileHover={{ scale: 1.02, translateY: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-gray-900 text-white w-full py-4 rounded-2xl font-black text-lg shadow-2xl shadow-gray-900/30 hover:bg-gray-800 transition-all duration-300 mt-4"
                        >
                            Create Account
                        </motion.button>

                        <p className="text-center text-sm text-gray-600 font-bold pt-4">
                            Already have an account?{" "}
                            <NavLink to="/login" className="text-indigo-600 font-black hover:underline underline-offset-4">
                                Login here
                            </NavLink>
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
