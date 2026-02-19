import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]); // products array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:5000/api/products");

        // ✅ Important: get the array from data.products
        setProducts(data.products);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />

<div className="pt-24 pb-10 min-h-screen bg-[#deebfe] px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">All Products</h1>

          {loading && (
            <p className="text-center text-gray-500">Loading products...</p>
          )}

          {error && (
            <p className="text-center text-red-500">{error}</p>
          )}

          {!loading && !error && products.length === 0 && (
            <p className="text-center text-gray-500">No products available</p>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
