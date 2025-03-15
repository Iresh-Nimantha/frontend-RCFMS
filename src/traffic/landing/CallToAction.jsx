import { useState } from "react";
import {
  AlertCircle,
  CheckCircle,
  Send,
  User,
  Mail,
  MessageSquare,
} from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject: "General Inquiry", // Added subject field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [validationErrors, setValidationErrors] = useState({});

  // Added subject options
  const subjectOptions = [
    "General Inquiry",
    "Technical Support",
    "Billing Question",
    "Feature Request",
    "Report a Bug",
  ];

  const validateField = (name, value) => {
    if (!value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address";
      }
    }

    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setValidationErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const errors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "subject") {
        // Skip validation for subject since it has a default
        const error = validateField(key, value);
        if (error) errors[key] = error;
      }
    });

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission with possible error
    setTimeout(() => {
      setIsSubmitting(false);

      // Simulate 90% success rate
      if (Math.random() > 0.1) {
        setSubmitStatus("success");
        setSubmitMessage(
          "Thank you! Your message has been sent successfully. We'll respond within 24-48 hours."
        );
        setFormData({
          name: "",
          email: "",
          message: "",
          subject: "General Inquiry",
        });
      } else {
        setSubmitStatus("error");
        setSubmitMessage(
          "There was an error sending your message. Please try again or contact us directly."
        );
      }
    }, 1500);
  };

  const resetForm = () => {
    setSubmitMessage("");
    setSubmitStatus(null);
    setValidationErrors({});
  };

  return (
    <div className="py-8 md:py-16 px-4 md:px-6 bg-gradient-to-br from-blue-600 to-blue-800 text-center text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold">Get in Touch</h2>
        <p className="mt-2 text-base md:text-lg max-w-2xl mx-auto">
          Have questions or need support? We're here to help! Fill out the form
          below, and our team will get back to you as soon as possible.
        </p>

        {submitStatus ? (
          <div
            className={`mt-6 p-6 ${
              submitStatus === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            } rounded-lg shadow-md max-w-lg mx-auto`}
          >
            <div className="flex items-center justify-center mb-4">
              {submitStatus === "success" ? (
                <CheckCircle className="w-12 h-12 text-green-600" />
              ) : (
                <AlertCircle className="w-12 h-12 text-red-600" />
              )}
            </div>
            <p className="text-lg font-medium">{submitMessage}</p>
            {submitStatus === "error" && (
              <p className="mt-2 text-sm">
                Our team has been notified of this issue.
              </p>
            )}
            <button
              onClick={resetForm}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              {submitStatus === "success"
                ? "Send Another Message"
                : "Try Again"}
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg text-gray-800 transition-all hover:shadow-xl"
          >
            <div className="mb-4 relative">
              <label
                htmlFor="name"
                className="block text-left font-medium mb-1 text-gray-700"
              >
                Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition ${
                    validationErrors.name
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Your Name"
                  aria-required="true"
                />
              </div>
              {validationErrors.name && (
                <p className="mt-1 text-red-500 text-sm text-left">
                  {validationErrors.name}
                </p>
              )}
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="email"
                className="block text-left font-medium mb-1 text-gray-700"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition ${
                    validationErrors.email
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="your.email@example.com"
                  aria-required="true"
                />
              </div>
              {validationErrors.email && (
                <p className="mt-1 text-red-500 text-sm text-left">
                  {validationErrors.email}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-left font-medium mb-1 text-gray-700"
              >
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition bg-white"
                aria-required="true"
              >
                {subjectOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5 relative">
              <label
                htmlFor="message"
                className="block text-left font-medium mb-1 text-gray-700"
              >
                Message
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <MessageSquare className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition ${
                    validationErrors.message
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Please describe how we can help you..."
                  rows="5"
                  aria-required="true"
                ></textarea>
              </div>
              {validationErrors.message && (
                <p className="mt-1 text-red-500 text-sm text-left">
                  {validationErrors.message}
                </p>
              )}
            </div>

            <div className="flex items-center mb-4">
              <input
                id="privacy"
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                required
              />
              <label htmlFor="privacy" className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  privacy policy
                </a>{" "}
                and consent to being contacted.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 active:bg-blue-800 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </>
              )}
            </button>

            <div className="mt-6 flex items-center gap-4 text-gray-500 text-sm justify-center">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>24-48h Response</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Private</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
