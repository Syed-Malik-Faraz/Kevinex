import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setProduct(data.product); // make sure backend returns { product }
      } catch (err) {
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

//   const addToCartHandler = () => {
//     const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

//     const existItem = cartItems.find((x) => x._id === product._id);

//     if (existItem) {
//       existItem.qty = qty;
//     } else {
//       cartItems.push({ ...product, qty });
//     }

//     localStorage.setItem("cart", JSON.stringify(cartItems));

//     navigate("/cart");
//   };

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


  return (
    <>
      <Navbar />

      <div className="pt-24 min-h-screen bg-gray-50 px-6">
        {loading && <p className="text-center py-10">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && product && (
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 grid md:grid-cols-2 gap-12">

            {/* Image */}
            <div>
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                className="w-full h-[450px] object-cover rounded-xl"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

              <p className="text-gray-500 mb-6">{product.description}</p>

              <p className="text-3xl font-bold text-indigo-600 mb-6">
                ₹{product.price}
              </p>

              {/* Quantity */}
              {product.countInStock > 0 && (
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">
                    Quantity
                  </label>
                  <select
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="border rounded-lg p-2 w-24"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={addToCartHandler}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition duration-300"
              >
                Add to Cart
              </button>
            </div>

          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
