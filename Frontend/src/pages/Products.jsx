import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { Search, Filter, ChevronLeft, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter States
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products/categories");
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({
          pageNumber: page,
          keyword: keyword,
          category: category,
          minPrice: minPrice,
          maxPrice: maxPrice,
        });

        const { data } = await axios.get(`http://localhost:5000/api/products?${queryParams}`);
        setProducts(data.products);
        setPages(data.pages);
        setPage(data.page);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [page, keyword, category, minPrice, maxPrice]);

  const resetFilters = () => {
    setKeyword("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setPage(1);
  };

  return (
    <>
      <Navbar />

      <div className="pt-24 pb-20 min-h-screen bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Header & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Our Collection</h1>
              <p className="text-gray-500 mt-2">Discover products that fit your lifestyle</p>
            </div>

            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={keyword}
                onChange={(e) => { setKeyword(e.target.value); setPage(1); }}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition shadow-sm bg-white"
              />
            </div>

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex md:hidden items-center justify-center gap-2 bg-white border border-gray-200 p-3.5 rounded-2xl font-bold text-gray-700 shadow-sm"
            >
              <SlidersHorizontal className="w-5 h-5" /> Filters
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">

            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block w-64 space-y-8 h-fit sticky top-28">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-indigo-600" /> Categories
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => { setCategory(""); setPage(1); }}
                    className={`block w-full text-left px-4 py-2.5 rounded-xl transition font-medium ${!category ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-white hover:shadow-sm'}`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setCategory(cat); setPage(1); }}
                      className={`block w-full text-left px-4 py-2.5 rounded-xl transition font-medium ${category === cat ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-white hover:shadow-sm'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Price Range</h3>
                <div className="flex gap-3 items-center">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">₹</span>
                    <input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
                      className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm shadow-sm"
                    />
                  </div>
                  <span className="text-gray-300">-</span>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">₹</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
                      className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm shadow-sm"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={resetFilters}
                className="w-full py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-500 font-bold hover:border-indigo-300 hover:text-indigo-600 transition flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" /> Reset Filters
              </button>
            </aside>

            {/* Mobile Filter Modal (AnimatePresence) */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  className="fixed inset-0 z-[60] bg-white lg:hidden p-8 overflow-y-auto"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">Filters</h2>
                    <button onClick={() => setIsFilterOpen(false)}><X className="w-8 h-8 text-gray-400" /></button>
                  </div>

                  <div className="space-y-10">
                    <div>
                      <h3 className="text-lg font-bold mb-4">Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => { setCategory(""); setPage(1); setIsFilterOpen(false); }}
                          className={`px-4 py-2 rounded-full font-bold border transition ${!category ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-200'}`}
                        >
                          All
                        </button>
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => { setCategory(cat); setPage(1); setIsFilterOpen(false); }}
                            className={`px-4 py-2 rounded-full font-bold border transition ${category === cat ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-200'}`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">Price Range</h3>
                      <div className="flex gap-4">
                        <input
                          type="number"
                          placeholder="Min Price"
                          value={minPrice}
                          onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
                          className="flex-1 border p-4 rounded-2xl"
                        />
                        <input
                          type="number"
                          placeholder="Max Price"
                          value={maxPrice}
                          onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
                          className="flex-1 border p-4 rounded-2xl"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => { resetFilters(); setIsFilterOpen(false); }}
                      className="w-full py-4 bg-gray-100 rounded-2xl font-bold text-gray-600"
                    >
                      Clear All Filters
                    </button>

                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200"
                    >
                      Show Results
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Product Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 animate-pulse">
                      <div className="w-full aspect-square bg-gray-100 rounded-2xl mb-4"></div>
                      <div className="h-6 w-3/4 bg-gray-100 rounded-md mb-2"></div>
                      <div className="h-4 w-1/2 bg-gray-100 rounded-md"></div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="bg-red-50 p-6 rounded-2xl text-center border border-red-100">
                  <p className="text-red-500 font-bold">{error}</p>
                  <button onClick={() => window.location.reload()} className="mt-2 text-red-600 underline">Try Again</button>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-gray-300" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">No products found</h2>
                  <p className="text-gray-500 mt-2">Try adjusting your search or filters to find what you're looking for.</p>
                  <button onClick={resetFilters} className="mt-6 text-indigo-600 font-bold hover:underline">Clear all filters</button>
                </div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {pages > 1 && (
                    <div className="mt-16 flex items-center justify-center gap-2">
                      <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="p-3 rounded-xl border border-gray-200 bg-white disabled:opacity-30 hover:bg-gray-50 transition shadow-sm"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <div className="flex gap-2">
                        {[...Array(pages).keys()].map((num) => (
                          <button
                            key={num + 1}
                            onClick={() => setPage(num + 1)}
                            className={`w-12 h-12 rounded-xl border font-bold transition shadow-sm ${page === num + 1 ? 'bg-indigo-600 text-white border-indigo-600 shadow-indigo-100' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                          >
                            {num + 1}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === pages}
                        className="p-3 rounded-xl border border-gray-200 bg-white disabled:opacity-30 hover:bg-gray-50 transition shadow-sm"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
