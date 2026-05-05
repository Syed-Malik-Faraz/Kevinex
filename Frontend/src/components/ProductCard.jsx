// src/components/ProductCard.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Heart } from "lucide-react";
import { API_URL } from "../apiConfig";

export default function ProductCard({ product }) {
  const API = API_URL;
  const discountPrice = Math.round(product.price * 1.2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      {/* ================= IMAGE SECTION ================= */}
      <div className="relative h-[420px] rounded-3xl bg-gray-100 overflow-hidden flex items-center justify-center p-10 transition-all duration-500 hover:shadow-xl">

        <Link
          to={`/product/${product._id}`}
          className="flex items-center justify-center w-full h-full"
        >
          <img
            src={product.image?.startsWith("http") ? product.image : `${API}${product.image}`}
            alt={product.name}
            className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Floating Buttons */}
        <div className="absolute top-6 right-6 flex flex-col gap-3 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">

          <button className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-gray-900 shadow-md hover:bg-gray-900 hover:text-white transition duration-300">
            <Heart className="w-5 h-5" />
          </button>

          <Link
            to={`/product/${product._id}`}
            className="w-11 h-11 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-md hover:bg-indigo-700 transition duration-300"
          >
            <ShoppingCart className="w-5 h-5" />
          </Link>
        </div>

        {/* Exclusive Badge */}
        {discountPrice > product.price && (
          <div className="absolute top-6 left-6 bg-white/70 backdrop-blur-xl px-4 py-1 rounded-full shadow-sm">
            <p className="text-[10px] font-semibold tracking-widest text-gray-900 uppercase">
              Exclusive
            </p>
          </div>
        )}
      </div>

      {/* ================= INFO SECTION ================= */}
      <div className="mt-6 px-1">
        <div className="flex justify-between items-start gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2 font-semibold">
              {product.brand} • {product.category}
            </p>

            <Link to={`/product/${product._id}`}>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                {product.name}
              </h3>
            </Link>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">
              ₹{product.price}
            </p>
            {/* <p className="text-sm text-gray-400 line-through">
              ₹{discountPrice}
            </p> */}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
