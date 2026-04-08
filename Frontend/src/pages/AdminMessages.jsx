import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Trash2, Check, Clock, User, MessageSquare, ArrowLeft, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo?.token}`,
    },
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:5000/api/messages", config);
      setMessages(data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await axios.delete(`http://localhost:5000/api/messages/${id}`, config);
        setMessages(messages.filter((m) => m._id !== id));
      } catch (err) {
        alert(err.response?.data?.message || "Delete failed");
      }
    }
  };

  const markReadHandler = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/messages/${id}/read`, {}, config);
      setMessages(
        messages.map((m) => (m._id === id ? { ...m, isRead: true } : m))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <AdminNavbar />

      <main className="pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <Link to="/admin/dashboard" className="flex items-center gap-2 text-indigo-600 font-bold mb-2 hover:translate-x-1 transition-transform">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-4">
              Inbox <span className="text-sm bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">{messages.length}</span>
            </h1>
          </div>
          
          <button 
            onClick={fetchMessages}
            className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 font-bold text-gray-600 hover:bg-gray-50 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl font-bold mb-8 border border-red-100">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading correspondence...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <Mail className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Your inbox is empty</h3>
            <p className="text-gray-400 max-w-sm mx-auto">When customers send messages through the contact form, they will appear here.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`bg-white rounded-3xl p-8 border-l-8 shadow-sm transition-all hover:shadow-md ${
                    msg.isRead ? "border-l-gray-200 opacity-80" : "border-l-indigo-600"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* User Info */}
                    <div className="lg:w-1/4 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 font-black text-xl">
                          {msg.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{msg.name}</p>
                          <p className="text-sm text-gray-400">{msg.email}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-tighter">
                          <Clock className="w-3.3 h-3.3" /> {new Date(msg.createdAt).toLocaleString()}
                        </div>
                        {!msg.isRead && (
                          <span className="inline-block bg-indigo-100 text-indigo-600 text-[10px] font-black uppercase px-2 py-0.5 rounded-md">New Inquiry</span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-indigo-600" />
                        <h3 className="text-xl font-black text-gray-900">{msg.subject}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed bg-gray-50 p-6 rounded-2xl italic">
                        "{msg.message}"
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="lg:w-1/6 flex lg:flex-col gap-3 justify-end lg:justify-start">
                      {!msg.isRead && (
                        <button
                          onClick={() => markReadHandler(msg._id)}
                          className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-green-50 text-green-600 font-bold py-3 rounded-2xl hover:bg-green-600 hover:text-white transition-all"
                          title="Mark as Read"
                        >
                          <Check className="w-5 h-5" /> <span className="lg:hidden">Read</span>
                        </button>
                      )}
                      <button
                        onClick={() => deleteHandler(msg._id)}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-red-50 text-red-600 font-bold py-3 rounded-2xl hover:bg-red-600 hover:text-white transition-all"
                        title="Delete Message"
                      >
                        <Trash2 className="w-5 h-5" /> <span className="lg:hidden">Delete</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
