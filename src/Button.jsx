import './index.css';
import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation

const ButtonSection = () => {
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation(); // Get the current URL path

  const handleClick = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <div className="w-full bg-gray-950 py-10 px-4 flex justify-center items-center gap-4 z-0 pb-5 pt-5">
      {[
        { text: 'About', path: '/company' },
        { text: 'Pricing', path: '/services' },
        { text: 'Vacancy', path: '/vacancy' },
        { text: 'Advertisement', path: '/promotion' }
      ].map((btn, index) => (
        <button
          key={index}
          onClick={() => handleClick(btn.path)} // Call handleClick with the respective path
          className={`cursor-pointer flex-1 max-w-[180px] py-3 text-[2.5vw] md:text-[1.8vw] lg:text-[1.2vw] 
                      font-extrabold uppercase tracking-wide rounded-lg transition-all duration-300 shadow-md 
                      border border-gray-700 hover:bg-gray-700 hover:border-cyan-500 hover:text-cyan-400 
                      hover:shadow-cyan-500/50
                      ${location.pathname === btn.path ? "bg-cyan-500 text-white border-cyan-400 shadow-cyan-400/50" : "bg-gray-750 text-white"}`}
        >
          {btn.text}
        </button>
      ))}
    </div>
  );
};

export default ButtonSection;
