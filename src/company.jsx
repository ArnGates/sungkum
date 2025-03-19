import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./footer";
import AOS from "aos";
import "aos/dist/aos.css";

// Image slider component
const images = ["/logo.png", "/logocom.png"];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full flex justify-center overflow-hidden" data-aos="fade-left">
      <img
        src={images[currentIndex]}
        alt="Mission"
        className="w-full max-w-xs md:max-w-full rounded-lg shadow-lg mx-auto transition-opacity duration-1000 opacity-100"
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
    <div className="w-full min-h-screen bg-black text-white font-[Poppins] overflow-hidden">
      {/* Main Content Wrapper */}
      <div className="flex flex-col items-center py-12 px-6">
        {/* Header Section */}
        <div className="text-center max-w-3xl" data-aos="fade-up">
          <h1 className="text-lg md:text-4xl font-bold text-cyan-400 mb-6">
            Welcome to Sungkum Website - Professional Web Design & Development
          </h1>
          <p className="text-sm md:text-xl text-gray-300 leading-relaxed">
            At Sungkum, we specialize in modern, high-performance web design and development to help businesses
            establish a strong online presence.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full max-w-5xl overflow-hidden">
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

          {/* Image Slider */}
          <ImageSlider />
        </div>

        {/* Services Section */}
        <div className="mt-12 text-center w-full max-w-5xl overflow-hidden" data-aos="fade-up">
          <h2 className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-6">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {["Custom Website Design", "E-Commerce Solutions", "SEO & Optimization"].map((service, index) => (
              <div key={index} className="p-10 md:p-14 bg-gray-800 rounded-lg shadow-lg" data-aos="zoom-in">
                <h3 className="text-lg md:text-xl font-bold text-white">{service}</h3>
                <p className="text-gray-400 mt-2 text-xs md:text-base">
                  {index === 0 && "Unique and visually appealing website designs tailored to your brand."}
                  {index === 1 && "Powerful online stores with seamless shopping experiences."}
                  {index === 2 && "Boost your website’s ranking and performance with our SEO strategies."}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Video Section */}
        <div className="mt-12 w-full max-w-4xl overflow-hidden" data-aos="fade-up">
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
            onClick={() => window.scrollTo(0, 0)}
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
