import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./footer";
import AOS from "aos";
import "aos/dist/aos.css";

// Image slider component
const images = ["/logo.png", "/logocom.png"]; // Add your images here

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="relative w-full md:w-auto flex justify-center" data-aos="fade-left">
      <img
        src={images[currentIndex]}
        alt="Mission"
        className="w-4/5 md:w-full rounded-lg shadow-lg mx-auto transition-opacity duration-1000 opacity-100"
      />
    </div>
  );
};

const Company = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    // Ensure the page starts from the top when loaded
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white font-[Poppins]">
      {/* Main Content Wrapper */}
      <div className="flex flex-col items-center py-12 px-6">
        {/* Header Section */}
        <div className="text-center max-w-3xl" data-aos="fade-up">
          <h1 className="text-lg md:text-4xl font-bold text-cyan-400 mb-6">
            Welcome to Sungkum Website - Professional Web Design & Development
          </h1>
          <p className="text-sm md:text-xl text-gray-300 leading-relaxed">
            At Sungkum, we specialize in modern, high-performance web design and development to help businesses
            establish a strong online presence. Whether you're a startup, small business, or large enterprise,
            we create custom websites that are visually stunning, mobile-responsive, and SEO-friendly.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full max-w-5xl">
          <div className="text-left order-2 md:order-1" data-aos="fade-right">
            <h2 className="text-lg md:text-3xl font-semibold text-cyan-400 mb-4">
              Why Choose Us?
            </h2>
            <ul className="text-gray-300 text-xs md:text-lg leading-relaxed space-y-2">
              <li>✔ Creative & Unique Designs – We craft websites that reflect your brand identity.</li>
              <li>✔ User-Friendly & Mobile-Responsive – Your site will look perfect on all devices.</li>
              <li>✔ SEO-Optimized – Get higher rankings and attract more customers.</li>
              <li>✔ Affordable & Fast Delivery – High-quality websites at the best prices.</li>
              <li>✔ E-Commerce & CMS Solutions – Sell online and manage content with ease.</li>
              <li>✔ Secure & Scalable – Websites built with the latest technologies for security and growth.</li>
            </ul>
          </div>

          {/* Image Slider (New) */}
          <ImageSlider />
        </div>

        {/* Services Section */}
        <div className="mt-12 text-center w-full max-w-5xl" data-aos="fade-up">
          <h2 className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-6">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-10 md:p-14 bg-gray-800 rounded-lg shadow-lg" data-aos="zoom-in">
              <h3 className="text-lg md:text-xl font-bold text-white">Custom Website Design</h3>
              <p className="text-gray-400 mt-2 text-xs md:text-base">
                Unique and visually appealing website designs tailored to your brand.
              </p>
            </div>
            <div className="p-10 md:p-14 bg-gray-800 rounded-lg shadow-lg" data-aos="zoom-in">
              <h3 className="text-lg md:text-xl font-bold text-white">E-Commerce Solutions</h3>
              <p className="text-gray-400 mt-2 text-xs md:text-base">
                Powerful online stores with seamless shopping experiences.
              </p>
            </div>
            <div className="p-10 md:p-14 bg-gray-800 rounded-lg shadow-lg" data-aos="zoom-in">
              <h3 className="text-lg md:text-xl font-bold text-white">SEO & Optimization</h3>
              <p className="text-gray-400 mt-2 text-xs md:text-base">
                Boost your website’s ranking and performance with our SEO strategies.
              </p>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="mt-12 w-full max-w-4xl" data-aos="fade-up">
          <h2 className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-6 text-center">
            Watch Our Video
          </h2>
          <div className="relative w-full pt-[56.25%] rounded-lg shadow-lg overflow-hidden border-4 border-white">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
               src="https://www.youtube.com/embed/r_UsHyE5eqI"
              title="Watch our Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="mt-12" data-aos="fade-up">
          <Link
            to="/"
            className="px-6 py-3 bg-cyan-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-cyan-600 transition-all"
            onClick={() => window.scrollTo(0, 0)} // Ensures scroll resets
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Company;
