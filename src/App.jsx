import './App.css';
import "./index.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar.jsx";
import ButtonSection from './Button.jsx';
import Company from "./company";
import Services from "./services";
import Vacancy from "./vacancy";
import Promotion from "./promotion";
import BodySection from './index.jsx';
import MidSection from './mid.jsx';
import SlideIcon from './slideIcon.jsx';
import Footer from './footer.jsx';
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import AuthCallback from "./auth-callback"; // Add this import

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={
          <div className="w-full min-h-screen bg-black m-0 p-0 overflow-hidden">
            <ButtonSection />
            <BodySection />
            <MidSection />
            <SlideIcon />
            <Footer />
          </div>
        }/>

        {/* Other Pages */}
        <Route path="/company" element={<Company />} />
        <Route path="/services" element={<Services />} />
        <Route path="/vacancy" element={<Vacancy />} />
        <Route path="/promotion" element={<Promotion />} />

        {/* Authentication Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Add Auth Callback Route */}
        <Route path="/auth-callback" element={<AuthCallback />} />
      </Routes>
    </Router>
  );
}

export default App;