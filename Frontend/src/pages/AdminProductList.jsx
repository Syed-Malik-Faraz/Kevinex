import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo?.token}`,
        },
    };

    const fetchProducts = async (pageNumber = 1) => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/products?pageNumber=${pageNumber}`);
            setProducts(data.products || data);
            setPage(data.page || 1);
            setPages(data.pages || 1);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`http://localhost:5000/api/products/${id}`, config);
                fetchProducts(page); // Refresh list
                alert("Product deleted!");
            } catch (error) {
                alert(error.response?.data?.message || error.message);
            }
        }
    };

    if (loading) return <div className="p-10 font-bold">Loading...</div>;

    return (
        <>
            <AdminNavbar />
            <div className="pt-24 p-8 bg-gray-50 min-h-screen">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">Manage Products</h1>
                    <button
                        onClick={() => window.location.href = "/admin/add-product"}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 shadow-md transition"
                    >
                        Add New Product
                    </button>
                </div>

                <div className="bg-white shadow rounded-2xl overflow-hidden border border-gray-100 mb-8">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-5">Product Name</th>
                                    <th className="px-8 py-5">Price</th>
                                    <th className="px-8 py-5">Category</th>
                                    <th className="px-8 py-5">Brand</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products.map((product) => (
                                    <tr key={product._id} className="hover:bg-indigo-50/30 transition">
                                        <td className="px-8 py-5 font-bold text-gray-900">{product.name}</td>
                                        <td className="px-8 py-5 font-medium text-gray-600">${product.price.toFixed(2)}</td>
                                        <td className="px-8 py-5 text-gray-600">{product.category}</td>
                                        <td className="px-8 py-5 text-gray-600">{product.brand}</td>
                                        <td className="px-8 py-5 text-right space-x-3">
                                            <button
                                                title="Edit Product"
                                                onClick={() => navigate(`/admin/product/${product._id}/edit`)}
                                                className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition shadow-sm"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                title="Delete Product"
                                                onClick={() => deleteHandler(product._id)}
                                                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition shadow-sm"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination Controls */}
                {pages > 1 && (
                    <div className="flex justify-center space-x-2">
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
