import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, CreditCard, ChevronRight, Package, Truck, ShieldCheck } from "lucide-react";

export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const API = import.meta.env.VITE_API_URL;
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "India",
    phone: "",
    secondaryPhone: "",
  });

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      return;
    }
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
    if (items.length === 0) {
      navigate("/cart");
    }
  }, [navigate]); // Removed userInfo from dependencies

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const shippingPrice = itemsPrice > 1000 ? 0 : 100;
  const taxPrice = Number((0.18 * itemsPrice).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.phone) {
      alert("Please fill all required shipping details (Address, City, Pincode, and Phone)");
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const orderData = {
        orderItems: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
        })),
        shippingAddress: {
          address: shippingAddress.address,
          city: shippingAddress.city,
          postalCode: shippingAddress.postalCode,
          country: shippingAddress.country,
          phone: shippingAddress.phone,
          secondaryPhone: shippingAddress.secondaryPhone,
        },
        paymentMethod: "COD",
        totalPrice,
      };

      await axios.post(
        `${API}/api/orders`,
        orderData,
        config
      );

      localStorage.removeItem("cart");
      navigate("/my-orders");
    } catch (error) {
      alert(error.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <main className="pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center text-sm text-gray-500 mb-8 space-x-2">
          <Link to="/cart" className="hover:text-indigo-600">Cart</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-bold">Checkout</span>
        </div>

        <h1 className="text-4xl font-black text-gray-900 mb-10 tracking-tight">Checkout</h1>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Main Checkout Form */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Shipping Information */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Shipping Details</h2>
              </div>

              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Delivery Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Street, House No, Landmark"
                    required
                    value={shippingAddress.address}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none transition duration-300"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">City</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Your City"
                      required
                      value={shippingAddress.city}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none transition duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Postal Code (Pincode)</label>
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="e.g. 110001"
                      required
                      value={shippingAddress.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none transition duration-300"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Contact Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Primary Phone"
                        required
                        value={shippingAddress.phone}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none transition duration-300"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Secondary Phone (Optional)</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="secondaryPhone"
                        placeholder="Secondary Phone"
                        value={shippingAddress.secondaryPhone}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none transition duration-300"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>

            {/* Payment Method */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
              </div>
              <div className="p-5 border-2 border-indigo-600 bg-indigo-50 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="font-bold text-indigo-900">Cash on Delivery (COD)</p>
                  <p className="text-sm text-indigo-600">Pay when you receive the package</p>
                </div>
                <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                </div>
              </div>
            </motion.div>

            {/* Delivery Timeline */}
            <div className="flex items-center gap-6 p-6 bg-blue-50 rounded-3xl border border-blue-100">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-blue-900">Estimated Delivery</p>
                <p className="text-sm text-blue-600 font-medium">3-5 business days from today</p>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-32">
              <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <Package className="w-5 h-5" /> Order Summary
              </h3>

              <div className="space-y-6 max-h-[300px] overflow-y-auto mb-8 pr-2">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4">
                    <img 
                      src={`${API}${item.image}`} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-xl bg-gray-50"
                    />
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-sm line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-400 font-medium">{item.qty} units • ₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t font-medium text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-gray-900 font-bold">₹{itemsPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={shippingPrice === 0 ? "text-green-600 font-bold" : "text-gray-900 font-bold"}>
                    {shippingPrice === 0 ? "FREE" : `₹${shippingPrice}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span className="text-gray-900 font-bold">₹{taxPrice}</span>
                </div>
                <div className="flex justify-between pt-4 border-t text-xl font-black text-gray-900">
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={placeOrderHandler}
                disabled={loading || cartItems.length === 0}
                className="w-full mt-10 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? "Processing..." : "Confirm & Place Order"}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Safe & Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
