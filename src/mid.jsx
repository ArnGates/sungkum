import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const MidSection = () => {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref4, inView4] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref5, inView5] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="relative w-full py-1 px-2 md:px-9 lg:px-15 text-white font-[Poppins] pb-30 pt-50">
      {/* Background Image Section */}
      <div className="absolute inset-0 z-0">
        <img
          src="/bglogo.png" 
          alt="Decorative background"
          className="w-full h-full object-cover opacity-30" // Adjust opacity here (0.3 = 30%)
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Template 1 */}
        <div ref={ref1} className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <motion.img 
            src="/t1.webp" 
            alt="Template 1 Preview" 
            className="w-60 md:w-1/2 rounded-lg shadow-lg rotate-4"
            initial={{ opacity: 0, x: -100 }}
            animate={inView1 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          />
          <motion.div 
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: 100 }}
            animate={inView1 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-semibold mb-4">Template One</h2>
            <p className="text-lg md:text-xl text-gray-300">
              User-Friendly & Interactive – Customers can engage with content, sign up, 
              and even make purchases seamlessly.
            </p>
          </motion.div>
        </div>

        {/* Template 2 */}
        <div ref={ref2} className="flex flex-col md:flex-row-reverse items-center gap-8 mb-12">
          <motion.img 
            src="/t2.webp" 
            alt="Template 2 Preview" 
            className="w-70 md:w-1/2 rounded-lg shadow-lg scale-90"
            initial={{ opacity: 0, x: 100 }}
            animate={inView2 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          />
          <motion.div 
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: -100 }}
            animate={inView2 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-semibold mb-4">Template Two</h2>
            <p className="text-lg md:text-xl text-gray-300">
              🔹 Increase Online Visibility – Attract more customers with a strong digital presence.<br/>
              🔹 Boost Sales with Online Orders – Let customers order anytime, anywhere.<br/>
              🔹 Better Customer Engagement – Showcase reviews and special offers.<br/>
              🔹 Professional Credibility – Stay ahead of competitors with a modern website.
            </p>
          </motion.div>
        </div>

        {/* Template 3 */}
        <div ref={ref3} className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <motion.img 
            src="/t3.webp" 
            alt="Template 3 Preview" 
            className="w-60 md:w-1/2 rounded-lg shadow-lg rotate-6"
            initial={{ opacity: 0, x: -100 }}
            animate={inView3 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          />
          <motion.div 
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: 100 }}
            animate={inView3 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-semibold mb-4">Template Three</h2>
            <p className="text-lg md:text-xl text-gray-300">
              Interactive Features – Allow users to register, comment, review, and interact 
              with your content seamlessly.
            </p>
          </motion.div>
        </div>

        {/* Template 4 */}
        <div ref={ref4} className="flex flex-col md:flex-row-reverse items-center gap-8 mb-12">
          <motion.img 
            src="/t4.webp" 
            alt="Template 4 Preview" 
            className="w-80 md:w-1/2 rounded-lg shadow-lg scale-95"
            initial={{ opacity: 0, x: 100 }}
            animate={inView4 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          />
          <motion.div 
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: -100 }}
            animate={inView4 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-semibold mb-4">Template Four</h2>
            <p className="text-lg md:text-xl text-gray-300">
              ✅ Immersive Dark Mode Design<br/>
              ✅ Integrated E-commerce Store<br/>
              ✅ Custom Gaming Aesthetics<br/>
              ✅ Community Engagement Features
            </p>
          </motion.div>
        </div>

        {/* Template 5 */}
        <div ref={ref5} className="flex flex-col md:flex-row items-center gap-8">
          <motion.img 
            src="/t5.webp" 
            alt="Template 5 Preview" 
            className="w-70 md:w-1/2 rounded-lg shadow-lg rotate-2"
            initial={{ opacity: 0, x: -100 }}
            animate={inView5 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          />
          <motion.div 
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: 100 }}
            animate={inView5 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-semibold mb-4">Template Five</h2>
            <p className="text-lg md:text-xl text-gray-300">
              Complete E-Commerce Solution – Integrated payment gateways, product management, 
              and inventory tracking for seamless online transactions.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MidSection;