import React, { useState, useEffect } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  ThumbsUp,
  User,
} from "lucide-react";
import person1 from "./assets/business.jpg";

import person2 from "./assets/driver.jpg";
import person3 from "./assets/traffuc.jpg";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [expanded, setExpanded] = useState(null);

  // Enhanced reviews with more details
  const reviews = [
    {
      name: "Samantha Perera",
      role: "Driver",
      feedback:
        "RCFMS made paying fines so much easier! No more long queues at the police station.",
      rating: 5,
      image: person3,
      date: "February 15, 2025",
      longFeedback:
        "I used to spend hours at the police station to pay my fines. With RCFMS, I can now check and pay all my fines online within minutes. The receipt is delivered instantly to my email. This system has saved me so much time and frustration!",
      helpful: 27,
    },
    {
      name: "Officer Kumarasinghe",
      role: "Traffic Officer",
      feedback:
        "Issuing fines digitally has reduced paperwork and improved efficiency in my work.",
      rating: 4,
      image: person2,
      date: "January 22, 2025",
      longFeedback:
        "As a traffic officer with over 15 years of experience, I've seen how much time we waste on paperwork. RCFMS has revolutionized how we issue fines. The digital system is fast, accurate, and reduces errors. I can now focus more on ensuring road safety instead of administrative tasks.",
      helpful: 43,
    },
    {
      name: "Amal Fernando",
      role: "Admin",
      feedback:
        "Tracking payments and generating reports has never been this simple. Great system!",
      rating: 5,
      image: person1,
      date: "March 3, 2025",
      longFeedback:
        "The administrative dashboard is powerful yet intuitive. I can generate comprehensive reports in seconds, track payment statistics, and monitor system performance all from one place. The analytics features help us identify trends and make data-driven decisions.",
      helpful: 19,
    },
    {
      name: "Priya Jayawardena",
      role: "Business Owner",
      feedback:
        "Managing fines for my fleet of delivery vehicles is now streamlined and organized.",
      rating: 4,
      image: person2,
      date: "February 28, 2025",
      longFeedback:
        "With a fleet of 12 delivery vehicles, keeping track of fines was a nightmare before RCFMS. Now I can view all vehicles in one dashboard, set up alerts for new fines, and manage payments centrally. This has significantly improved our compliance and reduced late payment penalties.",
      helpful: 31,
    },
    {
      name: "Dinesh Gunawardena",
      role: "Senior Citizen",
      feedback:
        "Even at my age, I found the system easy to use. The interface is very clear and straightforward.",
      rating: 5,
      image: person1,
      date: "January 10, 2025",
      longFeedback:
        "At 72 years old, I was worried about using a digital system. However, RCFMS surprised me with its simplicity. The large text, clear instructions, and helpful support made it easy for me to check and pay my fine without assistance. I recommend it to everyone in my senior community.",
      helpful: 38,
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, reviews.length]);

  // Navigation functions
  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const goToPrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  // Toggle expanded review
  const toggleExpanded = (index) => {
    setExpanded(expanded === index ? null : index);
    setAutoplay(expanded === index);
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }
        />
      ));
  };

  return (
    <div className="py-16 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Hear from drivers, officers, and admins who use RCFMS daily to
            manage traffic fines efficiently.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="relative mb-12 overflow-hidden rounded-xl shadow-lg">
          <div className="absolute top-4 right-4 z-10 flex items-center bg-white px-3 py-1 rounded-full shadow-md">
            <button
              onClick={() => setAutoplay(!autoplay)}
              className={`text-sm font-medium ${
                autoplay ? "text-blue-600" : "text-gray-500"
              }`}
            >
              {autoplay ? "Auto-playing" : "Paused"}
            </button>
          </div>

          <div className="relative h-full">
            <div
              className="transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
                display: "flex",
              }}
            >
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="min-w-full bg-white p-8 md:p-12 rounded-xl"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="h-16 w-16 md:h-24 md:w-24 rounded-full overflow-hidden mb-4 bg-gray-200 flex items-center justify-center">
                        {review.image ? (
                          <img
                            src={review.image}
                            alt={review.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User size={32} className="text-gray-400" />
                        )}
                      </div>
                      <div className="flex mb-2">
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>

                    <div className="flex-grow">
                      <div className="mb-4">
                        <p className="text-gray-700 text-lg italic md:text-xl leading-relaxed mb-6">
                          "
                          {expanded === index
                            ? review.longFeedback
                            : review.feedback}
                          {review.longFeedback &&
                            review.longFeedback !== review.feedback &&
                            expanded !== index &&
                            "..."}
                        </p>
                        {review.longFeedback &&
                          review.longFeedback !== review.feedback && (
                            <button
                              onClick={() => toggleExpanded(index)}
                              className="text-blue-600 text-sm font-medium hover:underline flex items-center"
                            >
                              {expanded === index ? "Read less" : "Read more"}
                              <MessageSquare size={14} className="ml-1" />
                            </button>
                          )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {review.name}
                          </h3>
                          <p className="text-sm text-gray-500">{review.role}</p>
                        </div>
                        <button className="flex items-center text-gray-500 text-sm hover:text-blue-600">
                          <ThumbsUp size={14} className="mr-1" />
                          <span>{review.helpful}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} className="text-gray-700" />
          </button>
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center space-x-2 mb-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                activeIndex === index
                  ? "bg-blue-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-md transition-all duration-300 cursor-pointer ${
                activeIndex === index
                  ? "bg-blue-50 border-2 border-blue-200 transform scale-105"
                  : "bg-white hover:bg-gray-50 border border-gray-100"
              }`}
              onClick={() => goToSlide(index)}
            >
              <div className="flex mb-4">{renderStars(review.rating)}</div>
              <p className="text-gray-600 italic mb-4">"{review.feedback}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{review.name}</h3>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <ThumbsUp size={14} className="mr-1" />
                  <span>{review.helpful}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
