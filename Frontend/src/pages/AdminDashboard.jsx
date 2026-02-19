import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminDashboard() {
    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState({ totalRevenue: 0, orderCount: 0 });
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo?.token}`,
        },
    };

    const fetchData = async (pageNumber = 1) => {
        try {
            const { data: revenueData } = await axios.get(
                "http://localhost:5000/api/orders/revenue",
                config
            );
            setStats(revenueData);

            const { data: ordersData } = await axios.get(
                `http://localhost:5000/api/orders?pageNumber=${pageNumber}`,
                config
            );
            setOrders(ordersData.orders || ordersData);
            setPage(ordersData.page || 1);
            setPages(ordersData.pages || 1);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching admin data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    const deliverHandler = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/orders/${id}/deliver`, {}, config);
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };

    const payHandler = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/orders/${id}/pay`, {}, config);
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };


    if (loading) return <div className="p-10 font-bold">Loading...</div>;

    return (
        <>
            <AdminNavbar />
            <div className="pt-20 p-8 bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 shadow rounded-lg border-l-4 border-green-500">
                        <h2 className="text-gray-500 text-sm uppercase font-semibold">
                            Total Revenue
                        </h2>
                        <p className="text-3xl font-bold text-green-600">
                            ${stats.totalRevenue.toFixed(2)}
                        </p>
                    </div>
                    <div className="bg-white p-6 shadow rounded-lg border-l-4 border-blue-500">
                        <h2 className="text-gray-500 text-sm uppercase font-semibold">
                            Total Orders
                        </h2>
                        <p className="text-3xl font-bold text-blue-600">{stats.orderCount}</p>
                    </div>
                    <div className="bg-white p-6 shadow rounded-lg border-l-4 border-purple-500 flex flex-col justify-between">
                        <h2 className="text-gray-500 text-sm uppercase font-semibold">
                            Product Actions
                        </h2>
                        <div className="flex space-x-2 mt-4">
                            <button
                                onClick={() => window.location.href = "/admin/product-list"}
                                className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded hover:bg-purple-200 transition"
                            >
                                Manage Products
                            </button>
                            <button
                                onClick={() => window.location.href = "/admin/add-product"}
                                className="text-xs bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition"
                            >
                                Add New
                            </button>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100 uppercase text-xs font-bold text-gray-600">
                                <tr>
                                    <th className="p-4">ID</th>
                                    <th className="p-4">User</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Total</th>
                                    <th className="p-4">Paid</th>
                                    <th className="p-4">Delivered</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50">
                                        <td className="p-4 font-mono text-sm underline text-indigo-600">
                                            <NavLink to={`/admin/order/${order._id}`}>
                                                {order._id}
                                            </NavLink>
                                        </td>
                                        <td className="p-4">{order.user?.name || "Deleted User"}</td>
                                        <td className="p-4">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 font-semibold">${order.totalPrice.toFixed(2)}</td>
                                        <td className="p-4">
                                            {order.isPaid ? (
                                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                                    {order.paidAt.substring(0, 10)}
                                                </span>
                                            ) : (
                                                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                                                    Not Paid
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            {order.isDelivered ? (
                                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                                    {order.deliveredAt.substring(0, 10)}
                                                </span>
                                            ) : (
                                                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                                                    Pending
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 space-x-2">
                                            {!order.isPaid && (
                                                <button
                                                    onClick={() => payHandler(order._id)}
                                                    className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700"
                                                >
                                                    Mark Paid
                                                </button>
                                            )}
                                            {order.isPaid && !order.isDelivered && (
                                                <button
                                                    onClick={() => deliverHandler(order._id)}
                                                    className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                                                >
                                                    Mark Delivered
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination Controls */}
                {pages > 1 && (
                    <div className="flex justify-center mt-6 space-x-2">
                        {[...Array(pages).keys()].map((x) => (
                            <button
                                key={x + 1}
                                onClick={() => setPage(x + 1)}
                                className={`px-4 py-2 rounded-lg font-bold border ${page === x + 1 ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 transition'}`}
                            >
                                {x + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
