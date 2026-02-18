// src/components/ProductCard.jsx
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`} className="group">
      <div
        className="bg-white rounded-2xl shadow-md overflow-hidden
                   hover:shadow-2xl hover:-translate-y-2
                   transition-all duration-300"
      >
        {/* Image */}
        <div className="h-56 overflow-hidden relative object-cover">
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover
                       group-hover:scale-110 transition duration-500"
          />

          {/* Optional subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/0 
                          group-hover:bg-black/10 transition duration-300" />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {product.name}
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            {product.brand}
          </p>

          <p className="text-indigo-600 font-bold text-xl mt-3">
            ₹{product.price}
          </p>

          <div
            className="mt-4 w-full text-center bg-indigo-600 text-white py-2 rounded-lg
                       group-hover:bg-indigo-700 transition duration-300"
          >
            View Product
          </div>
        </div>
      </div>
    </Link>
  );
}
