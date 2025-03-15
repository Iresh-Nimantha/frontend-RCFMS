import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "About RCFMS", path: "/about", icon: "📋" },
    { name: "Key Features", path: "/features", icon: "🔑" },
    { name: "How It Works", path: "/how-it-works", icon: "⚙️" },
    { name: "Testimonials", path: "/testimonials", icon: "💬" },
    { name: "Call to Action", path: "/cta", icon: "🚀" },
  ];

  const authItems = [
    { name: "Login", path: "/login", primary: false, icon: "👤" },
    { name: "Sign Up", path: "/signup", primary: true, icon: "✅" },
  ];

  // Add scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white text-blue-600 shadow-lg py-2"
          : "bg-blue-600 text-white py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div
            className={`text-2xl font-bold transition-transform group-hover:scale-105 ${
              scrolled ? "text-blue-600" : "text-white"
            }`}
          >
            <span className="inline-block transform hover:rotate-3 transition-transform">
              R
            </span>
            <span className="inline-block transform hover:rotate-3 transition-transform">
              C
            </span>
            <span className="inline-block transform hover:rotate-3 transition-transform">
              F
            </span>
            <span className="inline-block transform hover:rotate-3 transition-transform">
              M
            </span>
            <span className="inline-block transform hover:rotate-3 transition-transform">
              S
            </span>
          </div>
        </Link>

        {/* Menu button for mobile */}
        <button
          className="md:hidden p-2 rounded hover:bg-opacity-20 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-1">
          <ul className="flex space-x-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors hover:bg-blue-700 hover:text-white ${
                    location.pathname === item.path
                      ? scrolled
                        ? "bg-blue-100 text-blue-600"
                        : "bg-blue-700 text-white"
                      : scrolled
                      ? "text-blue-600"
                      : "text-white"
                  }`}
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-4 flex items-center space-x-2">
            {authItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-transform hover:scale-105 flex items-center ${
                  item.primary
                    ? "bg-white text-blue-600 hover:bg-blue-50"
                    : scrolled
                    ? "border border-blue-600 text-blue-600 hover:bg-blue-50"
                    : "border border-white text-white hover:bg-blue-700"
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute w-full left-0 transition-all duration-300 ease-in-out bg-white shadow-lg ${
          isOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <div className="flex items-center">
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </div>
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col space-y-2">
            {authItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  item.primary
                    ? "bg-blue-600 text-white"
                    : "border border-blue-600 text-blue-600 hover:bg-blue-50"
                }`}
              >
                <div className="flex items-center justify-center">
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
