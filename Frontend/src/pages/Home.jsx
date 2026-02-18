// src/pages/Home.jsx
import { useEffect, useState } from "react";
import axios from "axios";

import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
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
      "http://localhost:5000/api/products"
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

  return (
    <>
      <Navbar />

      {/* Padding for fixed navbar */}
      <div className="pt-20 bg-gray-50 min-h-screen "> 
        <Hero />

        <main className="max-w-7xl mx-auto px-6 py-16">

          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Featured Products
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Discover our curated collection designed to bring
              simplicity, elegance, and quality into your life.
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <p className="text-center text-red-500 py-10 text-lg">
              {error}
            </p>
          )}

          {/* Products */}
          {!loading && !error && products.length > 0 && (
            <ProductGrid products={products} />
          )}

        </main>

        <Newsletter />
        <Footer />
      </div>
    </>
  );
}
