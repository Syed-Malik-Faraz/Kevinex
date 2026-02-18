// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Products", path: "/products" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Cart", path: "/cart" },
  ];

  return (
    <nav className="fixed w-full bg-white/70 backdrop-blur-lg shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">

        {/* Logo */}
        <NavLink
          to="/home"
          className="text-2xl font-bold tracking-wide bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
       style={{ fontFamily: "'Great Vibes', cursive" }}
       >
          Kevinnex
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative transition duration-300 ${
                  isActive
                    ? "text-indigo-600"
                    : "text-gray-700 hover:text-indigo-600"
                }`
              }
            >
              {link.name}

              {/* Underline Animation */}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          ))}
        </div>

        {/* Mobile Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-800 transition duration-300"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-md transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col items-center space-y-4 font-medium">
          {navLinks.map((link) => (
           
           <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `transition duration-300 ${
                  isActive
                    ? "text-indigo-600"
                    : "text-gray-700 hover:text-indigo-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
