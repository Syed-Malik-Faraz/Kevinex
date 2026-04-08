import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  ShoppingCart, 
  MessageCircle, 
  CheckCircle, 
  ChevronRight,
  TrendingUp,
  Award
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

export default function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Review states
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loadingReview, setLoadingReview] = useState(false);
  const [reviewMessage, setReviewMessage] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data.product);

        // Fetch related products
        const { data: relatedData } = await axios.get(`http://localhost:5000/api/products/${id}/related`);
        setRelatedProducts(relatedData);

        setError("");
      } catch (err) {
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
    window.scrollTo(0, 0);
  }, [id]);

  const addToCartHandler = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const existItem = cartItems.find((x) => x._id === product._id);

    if (existItem) {
      existItem.qty = qty;
    } else {
      cartItems.push({
        _id: product._id,
        name: product.name,
        price: Number(product.price),
        image: product.image,
        countInStock: Number(product.countInStock),
        qty: Number(qty),
      });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setReviewMessage("Please select a rating");
      return;
    }

    try {
      setLoadingReview(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        `http://localhost:5000/api/products/${id}/reviews`,
        { rating, comment },
        config
      );

      setReviewMessage("Review submitted successfully!");
      setRating(0);
      setComment("");
      
      // Refresh product to show new review
      const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(data.product);
    } catch (err) {
      setReviewMessage(err.response?.data?.message || "Failed to submit review");
    } finally {
      setLoadingReview(false);
    }
  };

  const RatingStars = ({ value, onClick, interactive = false }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= value ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            } ${interactive ? "cursor-pointer transition-transform hover:scale-110" : ""}`}
            onClick={interactive ? () => onClick(star) : undefined}
          />
        ))}
      </div>
    );
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <main className="pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        {error ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-800">{error}</h2>
            <Link to="/products" className="text-indigo-600 mt-4 inline-block hover:underline">
              Back to Products
            </Link>
          </div>
        ) : (
          <>
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm text-gray-500 mb-8 space-x-2">
              <Link to="/" className="hover:text-indigo-600">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/products" className="hover:text-indigo-600">Products</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium truncate">{product.name}</span>
            </nav>

            {/* Product Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 mb-20">
              {/* Product Image */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative group lg:sticky lg:top-32 h-fit"
              >
                <div className="aspect-square rounded-3xl overflow-hidden bg-gray-50 flex items-center justify-center p-8 transition-all duration-700 hover:shadow-2xl">
                  <motion.img
                    layoutId={`product-${product._id}`}
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                {/* Stats overlays */}
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">In High Demand</p>
                    <p className="text-sm font-bold text-gray-900">20+ bought since yesterday</p>
                  </div>
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col"
              >
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                      {product.category}
                    </span>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                       {product.brand}
                    </span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
                    {product.name}
                  </h1>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-yellow-700">{product.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-gray-400 text-sm font-medium">
                      ({product.numReviews} Global Reviews)
                    </span>
                  </div>

                  <p className="text-4xl font-black text-gray-900 flex items-baseline gap-2">
                    ₹{product.price.toLocaleString()}
                    <span className="text-sm text-gray-400 line-through font-medium uppercase tracking-tighter">
                      ₹{(product.price * 1.2).toLocaleString()}
                    </span>
                  </p>
                </div>

                <div className="space-y-6 mb-10">
                  <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                      <Award className="w-4 h-4" /> Key Highlights
                    </h3>
                    <p className="text-gray-600 leading-relaxed italic">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">Availability</span>
                      <span className={`text-sm font-bold ${product.countInStock > 0 ? "text-green-600" : "text-red-500"}`}>
                        {product.countInStock > 0 ? `In Stock (${product.countInStock} items)` : "Out of Stock"}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-600 rounded-full" 
                        style={{ width: `${Math.min((product.countInStock / 20) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {product.countInStock > 0 && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center bg-gray-50 rounded-2xl border border-gray-100 p-1">
                      <button 
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        className="w-12 h-12 flex items-center justify-center font-bold text-xl hover:bg-white rounded-xl transition-all"
                      >-</button>
                      <span className="w-10 text-center font-bold">{qty}</span>
                      <button 
                        onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                        className="w-12 h-12 flex items-center justify-center font-bold text-xl hover:bg-white rounded-xl transition-all"
                      >+</button>
                    </div>

                    <button
                      onClick={addToCartHandler}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-indigo-100 hover:-translate-y-1 active:scale-95"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                  </div>
                )}
                
                <div className="mt-8 flex items-center gap-8 border-t pt-8">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-indigo-600" />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-indigo-600" />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Fast Delivery</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
              <section className="mb-24">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-black text-gray-900">You May Also Like</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {relatedProducts.map((p) => (
                    <ProductCard key={p._id} product={p} />
                  ))}
                </div>
              </section>
            )}

            {/* Reviews Section */}
            <section id="reviews" className="border-t pt-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                
                {/* Review Stats */}
                <div className="lg:col-span-4">
                  <h2 className="text-3xl font-black text-gray-900 mb-6 underline decoration-indigo-600 decoration-8 underline-offset-8">
                    Reviews
                  </h2>
                  <div className="flex flex-col gap-8 bg-gray-50 rounded-3xl p-8 border border-gray-100">
                    <div className="text-center">
                      <p className="text-6xl font-black text-gray-900">{product.rating.toFixed(1)}</p>
                      <RatingStars value={product.rating} />
                      <p className="text-gray-400 mt-2 font-medium">Based on {product.numReviews} reviews</p>
                    </div>

                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = product.reviews.filter(r => Math.floor(r.rating) === star).length;
                        const percentage = product.numReviews > 0 ? (count / product.numReviews) * 100 : 0;
                        return (
                          <div key={star} className="flex items-center gap-4">
                            <span className="text-sm font-bold text-gray-600 w-4">{star}</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-yellow-400" style={{ width: `${percentage}%` }}></div>
                            </div>
                            <span className="text-xs font-bold text-gray-400 w-8">{Math.round(percentage)}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Reviews List & Form */}
                <div className="lg:col-span-8 flex flex-col gap-12">
                  
                  {/* Reviews List */}
                  <div className="space-y-8">
                    {product.reviews.length === 0 ? (
                      <div className="p-12 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                        <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium">No reviews yet. Be the first to share your experience!</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {product.reviews.map((review) => (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            key={review._id} 
                            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm transition-hover hover:shadow-md"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-black">
                                  {review.name.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-bold text-gray-900">{review.name}</p>
                                  <p className="text-xs text-gray-400 font-medium capitalize">{new Date(review.createdAt).toLocaleDateString()}</p>
                                </div>
                              </div>
                              <RatingStars value={review.rating} />
                            </div>
                            <p className="text-gray-600 leading-relaxed mt-2">{review.comment}</p>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Add Review Form */}
                  <div className="bg-indigo-900 rounded-[3rem] p-8 md:p-12 text-white overflow-hidden relative">
                    {/* Decorative background circle */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-800 rounded-full translate-x-20 -translate-y-20"></div>
                    
                    <div className="relative z-10">
                      <h3 className="text-2xl font-black mb-2">Write a Review</h3>
                      <p className="text-indigo-200 mb-8 max-w-md">Share your experience with our community. Only verified purchasers can leave feedback.</p>

                      <AnimatePresence>
                        {reviewMessage && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`mb-6 p-4 rounded-2xl font-bold text-sm ${reviewMessage.includes("success") ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}
                          >
                            {reviewMessage}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {userInfo ? (
                        <form onSubmit={submitHandler} className="space-y-6">
                          <div>
                            <label className="block text-sm font-bold uppercase tracking-widest text-indigo-300 mb-3">Rate this product</label>
                            <div className="bg-white/10 w-fit p-3 rounded-2xl backdrop-blur-md">
                              <RatingStars value={rating} onClick={setRating} interactive />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-bold uppercase tracking-widest text-indigo-300 mb-3">Your Message</label>
                            <textarea
                              rows="4"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              className="w-full bg-white/10 border border-white/20 rounded-3xl p-6 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-white/30"
                              placeholder="What did you like or dislike?"
                              required
                            ></textarea>
                          </div>

                          <button
                            type="submit"
                            disabled={loadingReview}
                            className="bg-white text-indigo-900 font-bold py-4 px-10 rounded-2xl hover:bg-indigo-50 transition-all disabled:opacity-50 active:scale-95"
                          >
                            {loadingReview ? "Posting..." : "Post Review"}
                          </button>
                        </form>
                      ) : (
                        <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-md text-center">
                          <p className="text-indigo-200 mb-4">Please log in to write a review</p>
                          <Link 
                            to="/login"
                            className="inline-block bg-white text-indigo-900 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50"
                          >
                            Login Now
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
