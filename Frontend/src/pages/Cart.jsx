import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  // Load cart and userInfo safely
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    setUserInfo(user);

    const items = JSON.parse(localStorage.getItem("cart")) || [];

    const parsedItems = items.map((item) => ({
      ...item,
      qty: Number(item.qty),
      countInStock: Number(item.countInStock),
      price: Number(item.price),
    }));

    setCartItems(parsedItems);
  }, []);

  // Update cart everywhere
  const updateCart = (updated) => {
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Increase quantity (with stock validation)
  const increaseQty = (id) => {
    const updated = cartItems.map((item) => {
      if (item._id === id) {
        if (item.qty < item.countInStock) {
          return { ...item, qty: item.qty + 1 };
        } else {
          alert("No more stock available");
          return item;
        }
      }
      return item;
    });

    updateCart(updated);
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item._id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    );

    updateCart(updated);
  };

  // Remove item
  const removeHandler = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    updateCart(updated);
  };

  // Clear cart
  const clearCart = () => {
    updateCart([]);
  };

  // Calculations
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const shippingPrice = itemsPrice > 1000 ? 0 : 100;
  const taxPrice = Number((0.18 * itemsPrice).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return (
    <>
      <Navbar />

      <div className="pt-24 min-h-screen bg-gray-50 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {!userInfo ? (
            <div className="flex flex-col items-center justify-center pt-20">
              <div className="bg-white p-10 rounded-2xl shadow-xl text-center border border-gray-100 max-w-md w-full">
                <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is waiting</h1>
                <p className="text-gray-500 mb-8">Please log in to view your items and continue shopping.</p>
                <button
                  onClick={() => navigate("/")}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5"
                >
                  Log In to Continue
                </button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {/* LEFT SIDE */}
              <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-3xl font-extrabold text-gray-900">Shopping Cart</h1>
                  {cartItems.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="text-sm font-semibold text-red-500 hover:text-red-700 transition"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">Your cart is currently empty.</p>
                    <button onClick={() => navigate("/products")} className="mt-4 text-indigo-600 font-bold hover:underline">Explore Products</button>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center justify-between py-6 group"
                      >
                        <div className="flex items-center gap-6">
                          <img
                            src={`http://localhost:5000${item.image}`}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-xl shadow-sm"
                          />
                          <div>
                            <h2 className="font-bold text-lg text-gray-800 group-hover:text-indigo-600 transition">
                              {item.name}
                            </h2>
                            <p className="text-gray-500 font-medium">₹{item.price}</p>
                            <p className="text-xs text-gray-400 mt-1">Stock: {item.countInStock}</p>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                          <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
                            <button
                              onClick={() => decreaseQty(item._id)}
                              disabled={item.qty <= 1}
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-white rounded transition disabled:opacity-30"
                            >
                              -
                            </button>
                            <span className="w-10 text-center font-bold text-gray-800">{item.qty}</span>
                            <button
                              onClick={() => increaseQty(item._id)}
                              disabled={item.qty >= item.countInStock}
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-white rounded transition disabled:opacity-30"
                            >
                              +
                            </button>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-bold text-indigo-600">₹{item.qty * item.price}</span>
                            <button
                              onClick={() => removeHandler(item._id)}
                              className="text-red-400 hover:text-red-600 transition"
                              title="Remove Item"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT SIDE - SUMMARY */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-600 font-medium">
                      <span>Subtotal</span>
                      <span>₹{itemsPrice}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 font-medium">
                      <span>Shipping</span>
                      <span className={shippingPrice === 0 ? "text-green-500 font-bold" : ""}>
                        {shippingPrice === 0 ? "FREE" : `₹${shippingPrice}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600 font-medium">
                      <span>Tax (18%)</span>
                      <span>₹{taxPrice}</span>
                    </div>
                  </div>

                  <div className="my-6 border-t border-gray-100 pt-6">
                    <div className="flex justify-between items-center text-2xl font-extrabold text-gray-900">
                      <span>Total</span>
                      <span>₹{totalPrice}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/checkout")}
                    disabled={cartItems.length === 0}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
                  >
                    Proceed to Checkout
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed">Secure checkout powered by Kevinnex Payments</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
