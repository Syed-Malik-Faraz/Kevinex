import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import { ChevronLeft, CreditCard, Truck, User, Calendar, MapPin } from "lucide-react";

export default function AdminOrderDetails() {
    const { id: orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo?.token}`,
        },
    };

    const fetchOrder = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:5000/api/orders/${orderId}`,
                config
            );
            setOrder(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching order details:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [orderId]);

    const deliverHandler = async () => {
        try {
            await axios.put(`http://localhost:5000/api/orders/${orderId}/deliver`, {}, config);
            fetchOrder();
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };

    const payHandler = async () => {
        try {
            await axios.put(`http://localhost:5000/api/orders/${orderId}/pay`, {}, config);
            fetchOrder();
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };

    if (loading) return <div className="p-10 font-bold">Loading...</div>;
    if (!order) return <div className="p-10 font-bold">Order not found.</div>;

    return (
        <>
            <AdminNavbar />
            <div className="pt-24 px-8 pb-12 bg-gray-50 min-h-screen">
                <button
                    onClick={() => navigate("/admin/dashboard")}
                    className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition"
                >
                    <ChevronLeft size={20} className="mr-1" /> Back to Dashboard
                </button>

                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">Order <span className="text-gray-500 font-mono text-xl">#{order._id}</span></h1>
                    <div className="flex space-x-3">
                        {!order.isPaid && (
                            <button
                                onClick={payHandler}
                                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 shadow-md transition"
                            >
                                Mark as Paid
                            </button>
                        )}
                        {order.isPaid && !order.isDelivered && (
                            <button
                                onClick={deliverHandler}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 shadow-md transition"
                            >
                                Mark as Delivered
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Details Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Customer Information */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center mb-6">
                                <div className="p-3 bg-indigo-50 rounded-lg mr-4">
                                    <User className="text-indigo-600" size={24} />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">Customer Details</h2>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500 uppercase font-bold text-xs tracking-wider mb-1">Name</p>
                                    <p className="font-medium text-gray-900">{order.user?.name}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 uppercase font-bold text-xs tracking-wider mb-1">Email</p>
                                    <p className="font-medium text-gray-900">{order.user?.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-8 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-gray-800">Order Items</h2>
                            </div>
                            <div className="p-0">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-widest">
                                        <tr>
                                            <th className="px-8 py-4">Product</th>
                                            <th className="px-8 py-4 text-center">Qty</th>
                                            <th className="px-8 py-4 text-right">Price</th>
                                            <th className="px-8 py-4 text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {order.orderItems.map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-50 transition">
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center">
                                                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md mr-4" />
                                                        <span className="font-medium text-gray-800">{item.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-center font-medium text-gray-700">{item.qty}</td>
                                                <td className="px-8 py-5 text-right font-medium text-gray-700">${item.price.toFixed(2)}</td>
                                                <td className="px-8 py-5 text-right font-bold text-indigo-600">${(item.price * item.qty).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Logistics & Payment Column */}
                    <div className="space-y-8">
                        {/* Status & Payment Summary */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Status</h2>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="flex items-center text-sm font-bold text-gray-500 uppercase tracking-wider">
                                            <CreditCard size={16} className="mr-2" /> Payment
                                        </span>
                                        {order.isPaid ? (
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Paid</span>
                                        ) : (
                                            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">Pending</span>
                                        )}
                                    </div>
                                    {order.isPaid && (
                                        <p className="text-xs text-gray-400 mt-1">On: {new Date(order.paidAt).toLocaleString()}</p>
                                    )}
                                </div>

                                <hr className="border-gray-100" />

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="flex items-center text-sm font-bold text-gray-500 uppercase tracking-wider">
                                            <Truck size={16} className="mr-2" /> Delivery
                                        </span>
                                        {order.isDelivered ? (
                                            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">Delivered</span>
                                        ) : (
                                            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">In Transit</span>
                                        )}
                                    </div>
                                    {order.isDelivered && (
                                        <p className="text-xs text-gray-400 mt-1">On: {new Date(order.deliveredAt).toLocaleString()}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center mb-6">
                                <MapPin className="text-gray-400 mr-2" size={20} />
                                <h2 className="text-xl font-bold text-gray-800">Shipping To</h2>
                            </div>
                            <div className="text-sm text-gray-600 leading-relaxed">
                                <p className="font-bold text-gray-800 text-base mb-2">{order.user?.name}</p>
                                <p>{order.shippingAddress.address}</p>
                                <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                                <p>{order.shippingAddress.country}</p>
                            </div>
                        </div>

                        {/* Order Total */}
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 shadow-lg text-white">
                            <h2 className="text-lg font-bold opacity-80 mb-6 font-mono tracking-widest uppercase">Summary</h2>
                            <div className="flex justify-between items-center text-3xl font-extrabold">
                                <span>Total</span>
                                <span>${order.totalPrice.toFixed(2)}</span>
                            </div>
                            <p className="text-xs opacity-60 mt-4 text-center italic">Thank you for your business!</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
