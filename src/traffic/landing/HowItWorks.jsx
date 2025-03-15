import React, { useState } from "react";
import { ArrowRight, Check, HelpCircle, AlertCircle } from "lucide-react";

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [expanded, setExpanded] = useState(null);

  const steps = [
    {
      step: "1️⃣",
      title: "Check Your Fines",
      description: "Enter your vehicle number to view any pending fines.",
      icon: <AlertCircle className="text-amber-500" size={24} />,
      details:
        "Our system quickly searches the database for any traffic violations, parking tickets, or other fines associated with your vehicle registration number. The search is secure and takes only seconds.",
      cta: "Check Now",
    },
    {
      step: "2️⃣",
      title: "Make Payment",
      description: "Choose a payment method and pay your fine securely online.",
      icon: <Check className="text-blue-500" size={24} />,
      details:
        "We accept all major credit cards, digital wallets, and bank transfers. All payments are processed through our secure payment gateway with end-to-end encryption.",
      cta: "Pay Securely",
    },
    {
      step: "3️⃣",
      title: "Download Receipt",
      description: "Receive a digital receipt as proof of payment instantly.",
      icon: <Check className="text-green-500" size={24} />,
      details:
        "Your payment confirmation and receipt are generated immediately after successful payment. You can download, print, or have it emailed to you for your records.",
      cta: "See Example",
    },
  ];

  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  const toggleExpanded = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
        <p className="text-lg text-gray-600">
          A simple and seamless process to manage your fines.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 relative">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => handleStepClick(index)}
              className={`flex flex-col items-center transition-all duration-300 ${
                index <= activeStep ? "text-blue-500" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                  index <= activeStep ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {index < activeStep ? <Check size={16} /> : index + 1}
              </div>
              <span className="text-xs font-medium">{step.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Steps Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`border rounded-lg p-6 cursor-pointer transition-all duration-300 ${
              index === activeStep
                ? "border-blue-500 shadow-md"
                : "border-gray-200 hover:border-blue-300"
            }`}
            onClick={() => handleStepClick(index)}
          >
            <div className="flex items-center mb-4">
              <div className="mr-4">{step.icon}</div>
              <h3 className="font-bold text-lg">{step.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{step.description}</p>

            <div className="flex justify-between items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpanded(index);
                }}
                className="text-blue-500 text-sm flex items-center"
              >
                {expanded === index ? "Show less" : "Learn more"}
                <HelpCircle size={16} className="ml-1" />
              </button>

              <button
                className={`px-4 py-2 rounded text-sm font-medium ${
                  index === activeStep
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {step.cta}
              </button>
            </div>

            {expanded === index && (
              <div className="mt-4 pt-4 border-t border-gray-200 text-gray-600 text-sm">
                {step.details}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
          className={`px-6 py-2 rounded font-medium ${
            activeStep === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Previous
        </button>

        <button
          onClick={() =>
            setActiveStep(Math.min(steps.length - 1, activeStep + 1))
          }
          disabled={activeStep === steps.length - 1}
          className={`px-6 py-2 rounded font-medium flex items-center ${
            activeStep === steps.length - 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
          <ArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default HowItWorks;
