import React, { useState, useEffect } from "react";

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("drivers");
  const [isVisible, setIsVisible] = useState(false);

  // Animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("about-section");
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // User type cards with detailed information
  const userTypes = {
    drivers: {
      title: "For Drivers",
      icon: "🚗",
      color: "blue",
      bgColor: "bg-blue-600",
      hoverBgColor: "hover:bg-blue-700",
      textColor: "text-blue-600",
      textColorLight: "text-blue-500",
      features: [
        "View all your traffic fines in one dashboard",
        "Receive instant notifications for new fines",
        "Pay fines online using multiple payment methods",
        "Download payment receipts for your records",
        "Track payment history and fine status",
      ],
      cta: "Register as a Driver",
    },
    officers: {
      title: "For Officers",
      icon: "👮",
      color: "green",
      bgColor: "bg-green-600",
      hoverBgColor: "hover:bg-green-700",
      textColor: "text-green-600",
      textColorLight: "text-green-500",
      features: [
        "Issue digital tickets using mobile devices",
        "Upload violation evidence (photos, videos)",
        "Verify driver information instantly",
        "Track issued fines and their status",
        "Generate daily activity reports",
      ],
      cta: "Register as an Officer",
    },
    admins: {
      title: "For Administrators",
      icon: "📊",
      color: "purple",
      bgColor: "bg-purple-600",
      hoverBgColor: "hover:bg-purple-700",
      textColor: "text-purple-600",
      textColorLight: "text-purple-500",
      features: [
        "Comprehensive dashboard with real-time statistics",
        "Generate detailed reports and analytics",
        "Manage officer accounts and permissions",
        "Track revenue collection and trends",
        "Configure system settings and rules",
      ],
      cta: "Admin Access",
    },
  };

  // Counter animation function
  const Counter = ({ end, duration = 2000, prefix = "", suffix = "" }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let startTime;
      let animationFrame;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, isVisible]);

    return (
      <span className="text-2xl md:text-4xl font-bold">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </span>
    );
  };

  // Function to get button classes based on active state
  const getTabButtonClasses = (type) => {
    const userType = userTypes[type];
    return `px-6 py-3 rounded-full font-medium transition-all ${
      activeTab === type
        ? `${userType.bgColor} text-white shadow-md`
        : `bg-white text-gray-700 hover:bg-gray-50`
    }`;
  };

  return (
    <div
      id="about-section"
      className="py-16 px-6 bg-gradient-to-b from-gray-50 to-gray-100"
    >
      {/* Main  and description */}
      <div
        className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 relative inline-block">
          What is RCFMS?
          <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
        </h2>
        <p className="mt-6 mx-auto text-gray-700 leading-relaxed text-lg">
          The{" "}
          <strong className="text-blue-600">
            Road Crime Fine Management System (RCFMS)
          </strong>{" "}
          is an innovative online platform that revolutionizes how drivers,
          traffic officers, and administrators manage road fines efficiently. It
          replaces the outdated manual system with an intuitive, digital
          solution designed for the modern world.
        </p>
      </div>

      {/* Stats section */}
      <div
        className={`mt-12 max-w-5xl mx-auto grid md:grid-cols-3 gap-6 text-center transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="text-blue-500 mb-2">
            <svg
              className="w-12 h-12 mx-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
            </svg>
          </div>
          <div className="mt-3">
            <Counter end={50000} suffix="+" />
            <p className="text-gray-600 mt-1">Registered Users</p>
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="text-green-500 mb-2">
            <svg
              className="w-12 h-12 mx-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="mt-3">
            <Counter end={125000} suffix="+" />
            <p className="text-gray-600 mt-1">Fines Processed</p>
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="text-purple-500 mb-2">
            <svg
              className="w-12 h-12 mx-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707L15 4.414A1 1 0 0116.414 3L14.121.707a1 1 0 00-1.414 0L10 3.414l.293.293a1 1 0 011.414 0zM14.121 15.121a1 1 0 001.414 0l2.121-2.121a1 1 0 00-1.414-1.414L14 13.414l-2.121-2.121a1 1 0 00-1.414 1.414l2.121 2.121a1 1 0 001.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="mt-3">
            <Counter end={98} suffix="%" />
            <p className="text-gray-600 mt-1">User Satisfaction</p>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div
        className={`mt-16 max-w-4xl mx-auto transition-all duration-1000 delay-600 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {Object.keys(userTypes).map((type) => (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              className={getTabButtonClasses(type)}
            >
              <span className="mr-2">{userTypes[type].icon}</span>
              {userTypes[type].title}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 overflow-hidden relative h-96">
          {Object.keys(userTypes).map((type) => {
            const userType = userTypes[type];
            return (
              <div
                key={type}
                className={`transition-all duration-500 absolute inset-0 p-6 md:p-8 ${
                  activeTab === type
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-20 pointer-events-none"
                }`}
              >
                <div
                  className={`${userType.textColor} text-2xl md:text-3xl mb-4 `}
                >
                  <span className="text-4xl mr-2">{userType.icon}</span>
                  <span className="font-bold">{userType.title}</span>
                </div>

                <ul className="mt-4 space-y-3">
                  {userType.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className={`w-5 h-5 ${userType.textColorLight} mt-1 mr-2 flex-shrink-0`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-6 px-6 py-3 ${userType.bgColor} text-white rounded-lg ${userType.hoverBgColor} transition-colors shadow-md hover:shadow-lg transform hover:scale-105 transition-transform`}
                >
                  {userType.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video or illustration section */}
      {/* <div
        className={`mt-16 max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-1000 delay-900 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="p-6 md:p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800">See How It Works</h3>
          <p className="mt-2 text-gray-600">
            Watch our quick overview of the RCFMS platform
          </p>
        </div>
        <div className="relative pb-[56.25%] h-0 bg-gray-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/api/placeholder/800/450"
              alt="RCFMS video thumbnail"
              className="w-full h-full object-cover"
            />
            <button className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                <svg
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AboutSection;
