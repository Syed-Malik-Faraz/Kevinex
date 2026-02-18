import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Load cart safely
  useEffect(() => {
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

      <div className="pt-24 min-h-screen bg-gray-100 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between border-b py-5"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`http://localhost:5000${item.image}`}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <h2 className="font-semibold text-lg">
                        {item.name}
                      </h2>
                      <p className="text-gray-500">
                        ₹{item.price}
                      </p>
                      <p className="font-semibold mt-2">
                        Subtotal: ₹{item.qty * item.price}
                      </p>
                      <p className="text-sm text-gray-400">
                        Stock: {item.countInStock}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      disabled={item.qty <= 1}
                      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
                    >
                      -
                    </button>

                    <span className="font-semibold">
                      {item.qty}
                    </span>

                    <button
                      onClick={() => increaseQty(item._id)}
                      disabled={item.qty >= item.countInStock}
                      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeHandler(item._id)}
                    className="text-red-500 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}

            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="mt-6 text-red-600 font-semibold"
              >
                Clear Cart
              </button>
            )}
          </div>

          {/* RIGHT SIDE - SUMMARY */}
          <div className="bg-white rounded-xl shadow p-6 h-fit">
            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between mb-3">
              <span>Items</span>
              <span>₹{itemsPrice}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span>Shipping</span>
              <span>₹{shippingPrice}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span>Tax (18%)</span>
              <span>₹{taxPrice}</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              disabled={cartItems.length === 0}
              className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
            >
              Proceed to Checkout
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}
