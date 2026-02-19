import { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );

      localStorage.setItem("userInfo", JSON.stringify(data));

      if (data.isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid login credentials");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-50 pt-20">
        <form
          onSubmit={submitHandler}
          className="bg-white p-8 shadow-xl rounded-2xl w-96 border border-gray-100"
        >
          <h2 className="text-3xl mb-6 font-bold text-gray-800 text-center">Welcome Back</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white w-full p-3 rounded-lg font-semibold mt-8 hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5">
            Log In
          </button>

          <p className="mt-6 text-center text-sm text-gray-600">
            New customer?{" "}
            <NavLink to="/signup" className="text-indigo-600 font-semibold hover:underline">
              Create an account
            </NavLink>
          </p>
        </form>
      </div>
    </>
  );
}
