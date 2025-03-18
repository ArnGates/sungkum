import React from "react";
import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython } from "react-icons/fa";

const icons = [
  <FaHtml5 className="text-orange-500" />, 
  <FaCss3Alt className="text-blue-500" />, 
  <FaJs className="text-yellow-500" />, 
  <FaReact className="text-cyan-500" />, 
  <FaNodeJs className="text-green-500" />, 
  <FaPython className="text-blue-400" />
];

const SlideIcons = () => {
  return (
    <div className="w-full bg-gradient-to-t from-black to-black/40  py-6 overflow-hidden relative">
      <div className="w-full h-[1px] bg-gray-500 my-4"></div>

      <motion.div
        className="flex w-max"
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...icons, ...icons].map((icon, index) => (
          <div key={index} className="text-6xl mx-12">{icon}</div>
        ))}
      </motion.div>
     
    </div>
  );
};

export default SlideIcons;
