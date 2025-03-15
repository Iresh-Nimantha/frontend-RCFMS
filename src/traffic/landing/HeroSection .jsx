import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  MousePointer,
} from "lucide-react";
import heroimg1 from "../../assets/1.jpg";
import heroimg2 from "../../assets/2.jpg";
import heroimg3 from "../../assets/3.jpg";
function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoPlayRef = useRef(null);

  // Enhanced slider content without video elements
  const slides = [
    {
      id: 1,
      title: "Manage Your Road Fines Easily",
      description:
        "View, pay, and track your fines online with a seamless experience.",
      buttonText: "Get Started",
      buttonLink: "/signup",
      secondaryButtonText: "Learn More",
      image: heroimg1,
      stats: [
        { value: "3M+", label: "Users" },
        { value: "2min", label: "Avg. Time to Pay" },
        { value: "98%", label: "Satisfaction" },
      ],
      alt: "Person using a laptop to pay road fines online",
    },
    {
      id: 2,
      title: "Save Time with Online Payments",
      description:
        "No more waiting in lines. Pay your fines instantly from anywhere.",
      buttonText: "Pay Now",
      buttonLink: "/payment",
      secondaryButtonText: "Calculate Fees",
      image: heroimg2,
      stats: [
        { value: "24/7", label: "Service" },
        { value: "100%", label: "Secure" },
        { value: "5sec", label: "Payment Processing" },
      ],
      alt: "Mobile payment illustration for road fines",
    },
    {
      id: 3,
      title: "Get Instant Fine Notifications",
      description:
        "Receive alerts about new fines and payment confirmations via email or SMS.",
      buttonText: "Enable Alerts",
      buttonLink: "/alerts",
      secondaryButtonText: "View Demo",
      image: heroimg3,
      stats: [
        { value: "-60%", label: "Late Fees" },
        { value: "Instant", label: "Notifications" },
        { value: "Free", label: "SMS Alerts" },
      ],
      alt: "Notification alerts on a smartphone screen",
    },
  ];

  // Auto-advance slides when not paused
  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setTimeout(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [currentSlide, isPaused, slides.length]);

  // Animation effect when component mounts
  useEffect(() => {
    setIsVisible(true);

    // Show tooltip after 3 seconds, hide after 8 seconds
    const tooltipTimeout = setTimeout(() => {
      setShowTooltip(true);

      const hideTooltip = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);

      return () => clearTimeout(hideTooltip);
    }, 3000);

    return () => clearTimeout(tooltipTimeout);
  }, []);

  // Move to a specific slide
  const goToSlide = (index) => {
    setCurrentSlide(index);
    // Reset timer when manually changing slides
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
  };

  // Move to the next slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    // Reset timer when manually changing slides
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
  };

  // Move to the previous slide
  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
    // Reset timer when manually changing slides
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
  };

  // Toggle pause/play
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Handle swipe gestures
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left (next)
      nextSlide();
    }

    if (touchEnd - touchStart > 50) {
      // Swipe right (prev)
      prevSlide();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === " ") {
        togglePause();
        e.preventDefault(); // Prevent page scroll on spacebar
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Progress calculation
  const calculateProgress = () => {
    return `${((currentSlide + 1) / slides.length) * 100}%`;
  };

  return (
    <div
      className="relative h-screen overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Accessibility skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Skip to main content
      </a>

      {/* Background overlay with improved gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80 z-10"></div>

      {/* Interactive help tooltip */}
      <div
        className={`absolute top-1/4 right-12 z-50 bg-white text-gray-800 p-4 rounded-lg shadow-xl max-w-xs transition-all duration-500 ${
          showTooltip ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
        }`}
      >
        <div className="flex items-start gap-2">
          <MousePointer className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-sm">Navigation Tips</h4>
            <p className="text-xs mt-1">
              Use arrow keys ← → to navigate slides or swipe on touchscreen.
              Press spacebar to pause.
            </p>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-xs text-blue-600 mt-2 hover:underline"
            >
              Got it
            </button>
          </div>
        </div>
      </div>

      {/* Image slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Content container with enhanced animations */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6 max-w-5xl mx-auto">
        {/* Text content for each slide with enhanced animations */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`w-full transition-all duration-700 transform ${
              index === currentSlide
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8 absolute"
            }`}
          >
            <h1
              className={`text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 ${
                isVisible && index === currentSlide
                  ? "animate-fadeIn"
                  : "opacity-0"
              }`}
            >
              {slide.title}
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-white/90">
              {slide.description}
            </p>

            {/* Stats row */}
            <div className="mt-6 flex justify-center space-x-8 mb-8">
              {slide.stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={slide.buttonLink}
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 active:bg-gray-200 transform hover:scale-105 transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                <span>{slide.buttonText}</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>

              <button className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition flex items-center justify-center space-x-2">
                <span>{slide.secondaryButtonText}</span>
              </button>
            </div>
          </div>
        ))}

        {/* Enhanced scroll down indicator with animation and interactivity */}
        <div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <div className="w-8 h-12 rounded-full border-2 border-white flex justify-center pt-2 hover:bg-white/10 transition-colors">
            <div className="w-1 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
          <p className="text-white text-sm mt-2">Scroll Down</p>
        </div>
      </div>

      {/* Enhanced navigation controls with accessibility improvements */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full transition-colors backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full transition-colors backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Controls bar at bottom with additional functionality */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/80 to-transparent py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Progress bar */}

          {/* Slide indicators - enhanced for better usability */}
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white ${
                  index === currentSlide
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentSlide ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Skip anchor for accessibility */}
      <div id="main-content" className="sr-only">
        Main content starts here
      </div>
    </div>
  );
}

export default HeroSection;
