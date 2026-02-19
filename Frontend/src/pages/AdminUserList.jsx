import { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import { Trash2, UserCheck, UserPlus, Shield, Mail, Calendar, Search } from "lucide-react";

export default function AdminUserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo?.token}`,
        },
    };

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/users", config);
            setUsers(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`http://localhost:5000/api/users/${id}`, config);
                fetchUsers();
                alert("User removed successfully.");
            } catch (error) {
                alert(error.response?.data?.message || error.message);
            }
        }
    };

    const toggleAdminHandler = async (user) => {
        try {
            await axios.put(
                `http://localhost:5000/api/users/${user._id}`,
                { isAdmin: !user.isAdmin },
                config
            );
            fetchUsers();
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-10 font-bold">Loading...</div>;

    return (
        <>
            <AdminNavbar />
            <div className="pt-24 px-8 pb-12 bg-gray-50 min-h-screen">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">User Management</h1>
                        <p className="text-gray-500 mt-1">Manage permissions and oversee your growing community.</p>
                    </div>

                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Find by name or email..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-5">User Profile</th>
                                    <th className="px-8 py-5">Role</th>
                                    <th className="px-8 py-5">Join Date</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-indigo-50/30 transition group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 text-white font-bold text-lg ${user.isAdmin ? 'bg-indigo-600' : 'bg-gray-400'}`}>
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 leading-none mb-1">{user.name}</p>
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <Mail size={14} className="mr-1" /> {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            {user.isAdmin ? (
                                                <span className="inline-flex items-center bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold border border-indigo-200">
                                                    <Shield size={12} className="mr-1" /> Admin
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold border border-gray-200">
                                                    Customer
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Calendar size={14} className="mr-1" />
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right space-x-3">
                                            <button
                                                onClick={() => toggleAdminHandler(user)}
                                                className={`p-2 rounded-lg transition-all ${user.isAdmin ? 'bg-gray-100 text-gray-400 hover:text-gray-600' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 shadow-sm'}`}
                                                title={user.isAdmin ? "Remove Admin Privileges" : "Promote to Admin"}
                                            >
                                                <UserPlus size={18} />
                                            </button>
                                            <button
                                                onClick={() => deleteHandler(user._id)}
                                                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all shadow-sm"
                                                title="Delete User"
                                                disabled={user.isAdmin}
                                            >
                                                <Trash2 size={18} className={user.isAdmin ? 'opacity-20' : ''} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
