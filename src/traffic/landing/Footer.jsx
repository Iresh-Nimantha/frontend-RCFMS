import React, { useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowUp,
  Send,
  ChevronDown,
  Globe,
  HelpCircle,
  FileText,
  Shield,
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [expandedSection, setExpandedSection] = useState("");
  const [language, setLanguage] = useState("English");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    setEmailError("");
    // Here you would typically call an API to subscribe the user
    alert(
      `Thanks for subscribing with ${email}. You'll receive our newsletter soon!`
    );
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection("");
    } else {
      setExpandedSection(section);
    }
  };

  const languages = ["English", "සිංහල", "தமிழ்"];

  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white pt-16 pb-8 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Top Section with Newsletter */}

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 text-left border-b border-gray-700 pb-8">
          {/* About Company */}
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">About RCFMS</h3>
              <button
                className="md:hidden"
                onClick={() => toggleSection("about")}
                aria-label="Toggle about section"
              >
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-300 ${
                    expandedSection === "about" ? "transform rotate-180" : ""
                  }`}
                />
              </button>
            </div>
            <div
              className={`mt-4 space-y-2 ${
                expandedSection === "about" || expandedSection === ""
                  ? "block"
                  : "hidden md:block"
              }`}
            >
              <p className="text-gray-300">
                Road and City Fine Management System helps citizens and
                authorities to manage traffic violations efficiently.
              </p>
              <div className="flex items-center space-x-4 mt-4">
                <a
                  href="#"
                  className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="#"
                  className="bg-blue-400 hover:bg-blue-500 p-2 rounded-full transition-colors duration-300"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="#"
                  className="bg-pink-500 hover:bg-pink-600 p-2 rounded-full transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Quick Links</h3>
              <button
                className="md:hidden"
                onClick={() => toggleSection("links")}
                aria-label="Toggle links section"
              >
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-300 ${
                    expandedSection === "links" ? "transform rotate-180" : ""
                  }`}
                />
              </button>
            </div>
            <div
              className={`mt-4 space-y-2 ${
                expandedSection === "links" || expandedSection === ""
                  ? "block"
                  : "hidden md:block"
              }`}
            >
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
              >
                <FileText size={16} className="mr-2" /> Terms & Conditions
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
              >
                <Shield size={16} className="mr-2" /> Privacy Policy
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
              >
                <HelpCircle size={16} className="mr-2" /> FAQ
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
              >
                <Globe size={16} className="mr-2" /> Traffic Rules
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Contact Us</h3>
              <button
                className="md:hidden"
                onClick={() => toggleSection("contact")}
                aria-label="Toggle contact section"
              >
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-300 ${
                    expandedSection === "contact" ? "transform rotate-180" : ""
                  }`}
                />
              </button>
            </div>
            <div
              className={`mt-4 space-y-3 ${
                expandedSection === "contact" || expandedSection === ""
                  ? "block"
                  : "hidden md:block"
              }`}
            >
              <div className="flex items-start">
                <Mail
                  className="mr-3 text-blue-400 flex-shrink-0 mt-1"
                  size={18}
                />
                <div>
                  <p className="text-sm text-gray-400">Email:</p>
                  <a
                    href="mailto:support@rcfms.com"
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    support@rcfms.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone
                  className="mr-3 text-blue-400 flex-shrink-0 mt-1"
                  size={18}
                />
                <div>
                  <p className="text-sm text-gray-400">Phone:</p>
                  <a
                    href="tel:+94123456789"
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    +94 123 456 789
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin
                  className="mr-3 text-blue-400 flex-shrink-0 mt-1"
                  size={18}
                />
                <div>
                  <p className="text-sm text-gray-400">Location:</p>
                  <p className="text-gray-300">Colombo, Sri Lanka</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock
                  className="mr-3 text-blue-400 flex-shrink-0 mt-1"
                  size={18}
                />
                <div>
                  <p className="text-sm text-gray-400">Business Hours:</p>
                  <p className="text-gray-300">Mon-Fri: 9AM - 5PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Our Location</h3>
              <button
                className="md:hidden"
                onClick={() => toggleSection("map")}
                aria-label="Toggle map section"
              >
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-300 ${
                    expandedSection === "map" ? "transform rotate-180" : ""
                  }`}
                />
              </button>
            </div>
            <div
              className={`mt-4 ${
                expandedSection === "map" || expandedSection === ""
                  ? "block"
                  : "hidden md:block"
              }`}
            >
              <div className="rounded-lg overflow-hidden shadow-lg border border-gray-700">
                <iframe
                  className="w-full h-48"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.49935106358!2d79.78616407167294!3d6.927078610112582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2592f79f28a07%3A0x974b8e3d062e8f9a!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2s!4v1647012301045!5m2!1sen!2s"
                  allowFullScreen=""
                  loading="lazy"
                  title="Colombo Location"
                ></iframe>
              </div>
              <button
                className="mt-3 text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center"
                onClick={() =>
                  window.open(
                    "https://goo.gl/maps/your-actual-link-here",
                    "_blank"
                  )
                }
              >
                Get Directions
                <ArrowUp size={14} className="ml-1 transform rotate-45" />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright and Bottom Links */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-sm">
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2025 RCFMS. All Rights Reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="absolute right-6 -top-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;
