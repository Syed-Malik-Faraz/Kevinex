import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ShoppingBag, Package, Truck, CheckCircle, XCircle, ChevronRight, MapPin, Calendar, CreditCard } from "lucide-react";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if (!user) {
            navigate("/");
            return;
        }
        setUserInfo(user);

        const fetchOrders = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.get(`${API}/api/orders/myorders`, config);
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, [navigate]);

    const getStatusStep = (order) => {
        if (order.isDelivered) return 3;
        if (order.isPaid) return 2;
        return 1;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="pt-24 min-h-screen bg-gray-50 px-6 pb-20">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <ShoppingBag className="w-8 h-8 text-indigo-600" />
                        <h1 className="text-3xl font-extrabold text-gray-900">My Orders</h1>
                    </div>

                    {orders.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Package className="w-10 h-10 text-indigo-400" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">No orders yet</h2>
                            <p className="text-gray-500 mb-8">Looks like you haven't placed any orders yet. Start shopping to see your history!</p>
                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
                            >
                                Browse Products <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {orders.map((order) => (
                                <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-300">
                                    {/* Order Header */}
                                    <div className="bg-gray-50 px-8 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                                        <div className="flex gap-8">
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Order Placed</p>
                                                <p className="text-sm font-semibold text-gray-700">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Amount</p>
                                                <p className="text-sm font-bold text-indigo-600">₹{order.totalPrice}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Ship To</p>
                                                <p className="text-sm font-semibold text-gray-700">{order.shippingAddress.address}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Order ID</p>
                                            <p className="text-xs font-medium text-gray-500 font-mono">#{order._id.substring(order._id.length - 12)}</p>
                                        </div>
                                    </div>

                                    <div className="p-8">
                                        <div className="grid md:grid-cols-2 gap-12">
                                            {/* Items List */}
                                            <div className="space-y-6">
                                                {order.orderItems.map((item, index) => (
                                                    <div key={index} className="flex gap-4">
                                                        <img
                                                            src={`${API}${item.image}`}
                                                            alt={item.name}
                                                            className="w-20 h-20 object-cover rounded-lg border border-gray-100"
                                                        />
                                                        <div className="flex-1">
                                                            <h3 className="font-bold text-gray-800 leading-tight mb-1">{item.name}</h3>
                                                            <p className="text-sm text-gray-500 font-medium">Qty: {item.qty} × ₹{item.price}</p>
                                                            <div className="mt-2 text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded inline-block">
                                                                ₹{item.qty * item.price}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Tracking/Status Section */}
                                            <div className="flex flex-col justify-center">
                                                <h4 className="text-sm font-bold text-gray-900 mb-6 flex items-center gap-2">
                                                    <Truck className="w-4 h-4" /> Order Tracking
                                                </h4>

                                                <div className="relative">
                                                    {/* Progress Line */}
                                                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-100"></div>

                                                    <div className="space-y-8 relative">
                                                        {/* Step 1: Confirmed */}
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${getStatusStep(order) >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                                                <CheckCircle className="w-5 h-5" />
                                                            </div>
                                                            <div>
                                                                <p className={`text-sm font-bold ${getStatusStep(order) >= 1 ? 'text-gray-900' : 'text-gray-400'}`}>Order Confirmed</p>
                                                                <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                                            </div>
                                                        </div>

                                                        {/* Step 2: Payment */}
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${order.isPaid ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                                                <CreditCard className="w-5 h-5" />
                                                            </div>
                                                            <div>
                                                                <p className={`text-sm font-bold ${order.isPaid ? 'text-gray-900' : 'text-gray-400'}`}>Payment Successful</p>
                                                                <p className="text-xs text-gray-500">{order.isPaid ? new Date(order.paidAt).toLocaleDateString() : 'Awaiting confirmation'}</p>
                                                            </div>
                                                        </div>

                                                        {/* Step 3: Delivery */}
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${order.isDelivered ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                                                <Truck className="w-5 h-5" />
                                                            </div>
                                                            <div>
                                                                <p className={`text-sm font-bold ${order.isDelivered ? 'text-gray-900' : 'text-gray-400'}`}>Product Delivered</p>
                                                                <p className="text-xs text-gray-500">{order.isDelivered ? new Date(order.deliveredAt).toLocaleDateString() : 'In process'}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Footer */}
                                    <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-4">
                                        <Link
                                            to={`/product/${order.orderItems[0].product}`}
                                            className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition"
                                        >
                                            Buy Again
                                        </Link>
                                        <button className="text-sm font-bold text-indigo-600 hover:underline">
                                            Get Help
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
