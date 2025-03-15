import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importing Router and Routes

import Navbar from "./traffic/landing/Navbar";
import HeroSection from "./traffic/landing/HeroSection ";
import AboutSection from "./traffic/landing/AboutSection";
import FeaturesSection from "./traffic/landing/FeaturesSection";
import HowItWorks from "./traffic/landing/HowItWorks";
import Testimonials from "./traffic/landing/Testimonials";
import CallToAction from "./traffic/landing/CallToAction";
import Footer from "./traffic/landing/Footer";

// import Home from "./components/Home";
// import WorkoutForm from "./components/WorkoutForm";
// import Navbar from "./components/Navbar";
// import LoginForm from "./components/LoginForm";
// import SignupForm from "./components/SignupForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
      <Footer />
      <Routes>
        {/*  <Route path="/" element={<Home />} />

        <Route path="/workout-form" element={<WorkoutForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
