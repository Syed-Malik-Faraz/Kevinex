// src/pages/Home.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Zap, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

import Hero from "../components/Hero";
import FeaturedGrid from "../components/FeaturedGrid"; // Changed from ProductGrid
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const { data } = await axios.get(
          "http://localhost:5000/api/products?isFeatured=true"
        );

        setProducts(data.products);

      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };


    fetchProducts();
  }, []);

  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-indigo-600" />,
      title: "Premium Quality",
      description: "We source only the finest materials for products that stand the test of time."
    },
    {
      icon: <Truck className="w-8 h-8 text-indigo-600" />,
      title: "Fast Delivery",
      description: "Enjoy lightning-fast shipping across the country, right to your doorstep."
    },
    {
      icon: <Zap className="w-8 h-8 text-indigo-600" />,
      title: "Smart Design",
      description: "Minimalist aesthetics meeting maximum functionality in every single piece."
    }
  ];

  return (
    <>
      <Navbar />

      <div className="bg-white min-h-screen pt-20">
        <Hero />

        {/* Features Section */}
        <section className="py-24 bg-gray-50 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-indigo-600 font-bold tracking-widest uppercase text-sm"
              >
                Why Kevinex?
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4"
              >
                We build for the future
              </motion.h2>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition duration-300"
                >
                  <div className="mb-6 bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Attraction */}
        <main className="bg-white">
          <div className="max-w-7xl mx-auto px-6 py-32">
            <div className="grid lg:grid-cols-2 items-end mb-32 gap-12">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-indigo-600 font-bold mb-6"
                >
                  <span className="w-12 h-[1px] bg-indigo-600"></span>
                  <span className="uppercase tracking-[0.3em] text-[10px]">Curated Selection</span>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-5xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-none"
                >
                  Featured <br />
                  <span className="text-gray-200 italic font-light">Edition</span>
                </motion.h2>
              </div>
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl text-gray-400 font-medium leading-relaxed mb-8 max-w-lg"
                >
                  A meticulous selection of products that define our belief in minimalist perfection.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-4 text-gray-900 font-bold text-lg hover:text-indigo-600 transition-colors group"
                  >
                    View All Products
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-32">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-indigo-50 border-t-indigo-600 animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-100">
                <p className="text-red-500 text-lg font-bold">{error}</p>
              </div>
            ) : (
              <div className="px-2">
                <FeaturedGrid products={products} />
              </div>
            )}
          </div>
        </main>

        <Newsletter />
        <Footer />
      </div>
    </>
  );
}
