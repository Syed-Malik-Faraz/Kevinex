import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const shippingPrice = itemsPrice > 1000 ? 0 : 100;
  const taxPrice = Number((0.18 * itemsPrice).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = async () => {
    try {
      setLoading(true);

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!userInfo) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/orders",
        {
          orderItems: cartItems.map((item) => ({
            product: item._id,  // IMPORTANT
            name: item.name,
            qty: item.qty,
            image: item.image,
            price: item.price,
          })),

          shippingAddress: {
            address: "Default Address",
            city: "City",
            postalCode: "000000",
            country: "India",
          },

          paymentMethod: "COD",

          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      localStorage.removeItem("cart");
      alert("Order placed successfully!");
      navigate("/");

    } catch (error) {
      alert(error.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="pt-24 min-h-screen bg-gray-100 px-6">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">

          <h1 className="text-3xl font-bold mb-6">
            Confirm Order
          </h1>

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between border-b py-4"
            >
              <span>
                {item.name} x {item.qty}
              </span>
              <span>
                ₹{item.qty * item.price}
              </span>
            </div>
          ))}

          <div className="mt-6 space-y-2">
            <div className="flex justify-between">
              <span>Total:</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>

          <button
            onClick={placeOrderHandler}
            disabled={loading || cartItems.length === 0}
            className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>

        </div>
      </div>

      <Footer />
    </>
  );
}
