import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, PlusCircle, LogOut, Eye, Users, Menu, X } from "lucide-react";
import logo from "../assets/logo.jpeg";

export default function AdminNavbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

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
                <div className="flex items-center space-x-4 lg:space-x-6">
                    <NavLink
                        to="/admin/dashboard"
                        className="flex items-center"
                    >
                        <img src={logo} alt="Kevinex Admin" className="h-8 w-auto object-cover brightness-110 contrast-125" />
                        <span className="ml-2 lg:ml-3 text-base lg:text-lg font-black tracking-widest text-white uppercase">Admin</span>
                    </NavLink>
                    <NavLink
                        to="/home"
                        className="hidden sm:flex items-center space-x-1 text-[10px] lg:text-xs bg-gray-800 text-gray-300 px-3 py-1.5 rounded-full hover:bg-gray-700 transition"
                    >
                        <Eye size={14} />
                        <span>Customer View</span>
                    </NavLink>
                </div>

                {/* Desktop Links */}
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

                <div className="flex items-center space-x-4">
                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 text-sm font-medium text-red-400 hover:text-red-300 transition"
                    >
                        <LogOut size={20} />
                        <span className="hidden lg:inline">Logout</span>
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-1 text-gray-400 hover:text-white transition"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-gray-800 border-t border-gray-700 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-300">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center space-x-4 p-3 rounded-xl transition duration-200 ${isActive ? "bg-blue-600 text-white" : "bg-gray-900/50 text-gray-300 hover:text-white"
                                }`
                            }
                        >
                            {link.icon}
                            <span className="font-bold">{link.name}</span>
                        </NavLink>
                    ))}
                    <NavLink
                        to="/home"
                        className="flex items-center space-x-4 p-3 rounded-xl bg-gray-900/50 text-gray-300 hover:text-white"
                    >
                        <Eye size={20} />
                        <span className="font-bold">Customer View</span>
                    </NavLink>
                </div>
            )}
        </nav>
    );
}
