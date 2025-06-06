import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./footer";
import AOS from "aos";
import "aos/dist/aos.css";
import ButtonSection from "./Button"

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
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white font-futuristic overflow-hidden">
      <ButtonSection/>
      {/* Main Content */}
      <div className="flex flex-col items-center py-12 px-6">
        {/* Header Section */}
        <div className="text-center max-w-3xl" data-aos="fade-up">
          <h1 className="text-lg md:text-4xl font-bold text-cyan-400 mb-6 font-arcade">
            Welcome to Sungkum Website
          </h1>
          <p className="text-sm md:text-xl text-gray-300 leading-relaxed font-modern">
            We specialize in modern, high-performance web design and development.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full max-w-5xl overflow-hidden">
          <div className="text-left order-2 md:order-1" data-aos="fade-right">
            <h2 className="text-lg md:text-3xl font-semibold text-cyan-400 mb-4 font-arcade">
              Why Choose Us?
            </h2>
            <ul className="text-gray-300 text-xs md:text-lg leading-relaxed space-y-2 font-pixel">
              <li>✔ Creative & Unique Designs</li>
              <li>✔ Mobile-Responsive</li>
              <li>✔ SEO-Optimized</li>
              <li>✔ Fast Delivery</li>
              <li>✔ Secure & Scalable</li>
            </ul>
          </div>

          {/* Image Slider */}
          <ImageSlider />
        </div>

        {/* Services Section */}
        <div className="mt-12 text-center w-full max-w-5xl overflow-hidden" data-aos="fade-up">
          <h2 className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-6 font-arcade">
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {["Custom Website Design", "E-Commerce Solutions", "SEO & Optimization"].map((service, index) => (
              <div key={index} className="p-10 md:p-14 bg-gray-800 rounded-lg shadow-lg" data-aos="zoom-in">
                <h3 className="text-lg md:text-xl font-bold text-white font-arcade">{service}</h3>
                <p className="text-gray-400 mt-2 text-xs md:text-base font-modern">
                  {index === 0 && "Unique designs tailored to your brand."}
                  {index === 1 && "Powerful online stores with smooth shopping experiences."}
                  {index === 2 && "Boost your website’s ranking with SEO."}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Video Section */}
        <div className="mt-12 w-full max-w-4xl overflow-hidden" data-aos="fade-up">
          <h2 className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-6 text-center font-arcade">
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
            className="px-6 py-3 bg-cyan-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-cyan-600 transition-all font-modern"
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
