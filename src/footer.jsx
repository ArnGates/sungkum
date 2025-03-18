import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-t from-gray-900 to-black/100 text-white py-6 px-4 md:px-16 pt-40 pb-10">
      <div className="max-w-7xl mx-auto">
        {/* Footer Top - Three Columns */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-4">
          {/* About Section */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-lg font-semibold">About</h2>
            <p className="text-gray-400 text-sm md:max-w-[250px]">
              We provide modern and professional web design services to help businesses grow.
            </p>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-lg font-semibold">Contact Us</h2>
            <p className="text-gray-400 text-sm">Email: akumkatwang571@gmail.com</p>
            <p className="text-gray-400 text-sm">Phone: +91 6009051189</p>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-6">
            <a
              href="https://wa.me/+916009051189"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-400 text-2xl"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.instagram.com/akumwalker_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61572756025473"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 text-2xl"
            >
              <FaFacebook />
            </a>
          </div>
        </div>

        {/* Footer Bottom - Copyright Row */}
        <div className="text-center text-gray-500 text-sm pt-4">
          &copy; {new Date().getFullYear()} sungkum website. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
