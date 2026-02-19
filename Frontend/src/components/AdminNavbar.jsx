import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, PlusCircle, LogOut, Eye, Users } from "lucide-react";

export default function AdminNavbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    };

    const navLinks = [
        { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "Products", path: "/admin/product-list", icon: <Package size={20} /> },
        { name: "Add Product", path: "/admin/add-product", icon: <PlusCircle size={20} /> },
        { name: "Users", path: "/admin/user-list", icon: <Users size={20} /> },
    ];

    return (
        <nav className="fixed w-full bg-gray-900 text-white shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* Brand & Mode Toggle */}
                <div className="flex items-center space-x-6">
                    <NavLink
                        to="/admin/dashboard"
                        className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"
                    >
                        Kevinnex Admin
                    </NavLink>
                    <NavLink
                        to="/home"
                        className="flex items-center space-x-1 text-xs bg-gray-800 text-gray-300 px-3 py-1.5 rounded-full hover:bg-gray-700 transition"
                    >
                        <Eye size={14} />
                        <span>Customer View</span>
                    </NavLink>
                </div>

                {/* Links */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `flex items-center space-x-2 text-sm font-medium transition duration-200 ${isActive ? "text-blue-400" : "text-gray-400 hover:text-white"
                                }`
                            }
                        >
                            {link.icon}
                            <span>{link.name}</span>
                        </NavLink>
                    ))}
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-sm font-medium text-red-400 hover:text-red-300 transition"
                >
                    <LogOut size={20} />
                    <span className="hidden md:inline">Logout</span>
                </button>

            </div>
        </nav>
    );
}
