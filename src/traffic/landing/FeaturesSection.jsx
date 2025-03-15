import React, { useState } from "react";

const FeaturesSection = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      title: "📋 View Fines",
      description: "Easily check your pending and paid fines online.",
      icon: (
        <svg
          className="w-10 h-10 text-blue-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
          <path
            fillRule="evenodd"
            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      color: "blue",
      details:
        "Access a comprehensive list of all your traffic violations, filter by date, status, or violation type. Sort fines to prioritize payments based on due dates.",
    },
    {
      title: "💳 Online Payments",
      description: "Pay fines securely using multiple payment methods.",
      icon: (
        <svg
          className="w-10 h-10 text-green-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
          <path
            fillRule="evenodd"
            d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      color: "green",
      details:
        "Support for credit cards, debit cards, digital wallets, and bank transfers. All transactions are secured with advanced encryption and compliance with PCI DSS standards.",
    },
    {
      title: "🔔 Real-Time Alerts",
      description: "Receive instant notifications for new or due fines.",
      icon: (
        <svg
          className="w-10 h-10 text-red-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
        </svg>
      ),
      color: "red",
      details:
        "Customizable notifications via email, SMS, or push notifications. Set reminders before due dates and get confirmation alerts after successful payments.",
    },
    {
      title: "📜 Digital Records",
      description: "Access a complete history of your traffic fines.",
      icon: (
        <svg
          className="w-10 h-10 text-yellow-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      color: "yellow",
      details:
        "Download official receipts and certificates of payment. Generate comprehensive reports of your violation history for insurance or legal purposes.",
    },
    {
      title: "👮 Officer Dashboard",
      description: "Traffic officers can issue and track fines electronically.",
      icon: (
        <svg
          className="w-10 h-10 text-indigo-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
        </svg>
      ),
      color: "indigo",
      details:
        "Mobile-friendly interface for on-the-go fine issuance. Capture evidence with built-in camera integration and verify driver information in real-time.",
    },
    {
      title: "📊 Admin Analytics",
      description: "Admins can generate reports and oversee system activity.",
      icon: (
        <svg
          className="w-10 h-10 text-purple-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
        </svg>
      ),
      color: "purple",
      details:
        "Visualize trends with customizable graphs and charts. Monitor revenue collection, officer performance, and system usage patterns through an intuitive dashboard.",
    },
  ];

  return (
    <div className="py-16 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
          Key Features
        </h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        <p className="text-lg text-gray-700 mb-12">
          Explore the powerful features that make RCFMS efficient and easy to
          use for all users.
        </p>
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-${feature.color}-500 relative overflow-hidden group`}
            onMouseEnter={() => setHoveredFeature(index)}
            onMouseLeave={() => setHoveredFeature(null)}
          >
            <div className="flex items-start">
              <div className={`p-3 rounded-full bg-${feature.color}-100 mr-4`}>
                {feature.icon}
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            </div>

            {/* Expandable details section */}
            <div
              className={`mt-4 overflow-hidden transition-all duration-300 ease-in-out ${
                hoveredFeature === index
                  ? "max-h-40 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-700">{feature.details}</p>
              </div>
            </div>

            {/* Learn more button */}
            <button
              className={`mt-4 px-4 py-2 text-sm font-medium text-${
                feature.color
              }-600 bg-${feature.color}-50 rounded-md hover:bg-${
                feature.color
              }-100 transition-colors duration-300 ${
                hoveredFeature === index ? "opacity-100" : "opacity-0"
              }`}
            >
              Learn More
            </button>

            {/* Decorative background circle */}
            <div
              className={`absolute -right-12 -bottom-12 w-40 h-40 rounded-full bg-${
                feature.color
              }-100 opacity-20 transition-transform duration-500 transform ${
                hoveredFeature === index ? "scale-110" : "scale-50"
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
