import { Instagram, Linkedin, Twitter } from "lucide-react";
import { useNavigate } from "react-router-dom"

export default function Footer() {

  const Navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        {/* Brand Section */}
        <div>
          <h2
            className="text-4xl text-white mb-4"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Kevinnex
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Delivering quality household and lifestyle products across India.
            Trusted by thousands of happy customers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
          <ul className="space-y-2">
<li className="hover:text-white transition duration-300 cursor-pointer">
  <button onClick={() => Navigate("/home")}>
    Home
  </button>
</li>
<li className="hover:text-white transition duration-300 cursor-pointer">
  <button onClick={() => Navigate("/products")}>
    Products
  </button>
</li>
<li className="hover:text-white transition duration-300 cursor-pointer">
  <button onClick={() => Navigate("/about")}>
    About Us
  </button>
</li>
<li className="hover:text-white transition duration-300 cursor-pointer">
  <button onClick={() => Navigate("/contact")}>
    Contact
  </button>
</li>

     
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Support</h3>
          <ul className="space-y-2">
            <li className="hover:text-white transition duration-300 cursor-pointer">FAQs</li>
            <li className="hover:text-white transition duration-300 cursor-pointer">Shipping</li>
            <li className="hover:text-white transition duration-300 cursor-pointer">Returns</li>
            <li className="hover:text-white transition duration-300 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Contact</h3>
          <p className="text-sm mb-2">📍 India</p>
          <p className="text-sm mb-2">📧 support@kevinnex.com</p>
          <p className="text-sm">📞 +91 98765 43210</p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-xl">
            <span className="hover:text-white transition duration-300 cursor-pointer"> <Linkedin /></span>
            <span className="hover:text-white transition duration-300 cursor-pointer"><Instagram /></span>
            <span className="hover:text-white transition duration-300 cursor-pointer"><Twitter /></span>
            {/* <span className="hover:text-white transition duration-300 cursor-pointer">🐦</span> */}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Kevinnex. All rights reserved.
      </div>
    </footer>
  );
}
