import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const BodySection = () => {
  const [showPopup, setShowPopup] = useState(true); 

  const handleEnquiryClick = () => {
    window.open("/services", "_blank");
  };

  return (
    <div className="w-full m-0 p-0 overflow-hidden relative">
      {/* Popup Advertisement */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="relative bg-white/95 backdrop-blur-md rounded-lg p-4 w-[90%] sm:w-[400px] shadow-lg">
            {/* Close Button */}
            <button
              className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition-all"
              onClick={() => setShowPopup(false)}
            >
              ✕
            </button>

            {/* Advertisement Image */}
            <img
              src="/ads1.jpg" 
              alt="Special Offer"
              className="w-full rounded-lg"
            />

            {/* Ad Text */}
            <p className="text-black text-center mt-2 font-semibold text-sm sm:text-base">
              🚀 Limited slots available 🚀
            </p>
          </div>
        </div>
      )}

      {/* Background Image Section */}
      <div 
        className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] bg-cover bg-center flex items-center justify-center relative px-6 sm:px-12 md:px-16" 
        style={{ backgroundImage: "url('/1.jpg')" }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-black/40"></div>

        {/* Text Content with Motion Effects */}
        <motion.div 
          className="relative text-white text-center max-w-[95%] sm:max-w-[85%] md:max-w-[80%] px-4 sm:px-8 py-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-2xl sm:text-4xl md:text-6xl font-extrabold"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <span className="bg-gradient-to-r from-[#ff7200] to-orange-600 bg-clip-text text-transparent">Sungkum</span> <span className="text-white">website</span>
          </motion.h1>
          <p className="text-sm sm:text-base md:text-lg mt-2 text-white">
            Unlock Your Business Potential with a Professional Website!
          </p>
          
          <motion.h2 
            className="text-md sm:text-lg md:text-2xl font-semibold font-[Bodoni MT] mt-4 text-blue-400"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Note:
          </motion.h2>
          <p className="text-sm sm:text-base md:text-lg mt-4 text-white">
            Are you looking to grow your business and reach more customers? Now is the perfect time to invest in a professional website at an affordable price!
          </p>
          <br />
          <motion.p 
            className="text-white text-xs sm:text-lg md:text-xl font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          > 
            🚀 <span className="text-blue-400 font-bold text-sm sm:text-lg md:text-2xl">Special Offer – Limited Time!</span> 🚀 <br />
            We are offering high-quality web design services at an unbeatable price! Whether you need a business website, portfolio, or e-commerce store, we got you covered.
          </motion.p>
          
          {/* Enquiry Button */}
          <motion.button 
            className="mt-6 sm:mt-8 px-8 sm:px-12 py-3 sm:py-4 text-sm sm:text-lg font-semibold bg-blue-600 text-white shadow-xl hover:bg-blue-800 transition-transform duration-300 hover:shadow-2xl cursor-pointer rounded-lg"
            whileHover={{ scale: 1.1 }}
            onClick={handleEnquiryClick}
          >
            Enquiry
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default BodySection;
