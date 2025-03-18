import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Footer from "./footer";
import supabase from "./supabaseClient";

const Services = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    plan: "Basic Plan"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Refs for scroll animations
  const servicesRef = useRef(null);
  const pricingRef = useRef(null);
  const buttonsRef = useRef(null);
  
  // View detection hooks
  const isServicesInView = useInView(servicesRef, { once: true });
  const isPricingInView = useInView(pricingRef, { once: true });
  const isButtonsInView = useInView(buttonsRef, { once: true });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.phone.match(/^\d{10}$/)) {
      setError("Please enter a valid 10-digit phone number");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('applications')
        .insert([formData]);

      if (error) throw error;
      
      alert("Thank you! We will contact you soon.");
      setShowForm(false);
      setFormData({ name: "", phone: "", email: "", plan: "Basic Plan" });
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message || "Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-black text-white font-[Poppins] py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Services Header */}
          <motion.h1 
            ref={servicesRef}
            initial={{ opacity: 0, y: -50 }}
            animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold text-cyan-400 mb-6 transition-all duration-300 hover:text-cyan-300"
          >
            Our Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isServicesInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-sm md:text-lg text-gray-300 mb-8"
          >
            We offer a range of web design and development services to help you build a strong online presence.
          </motion.p>

          {/* Services List */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid md:grid-cols-2 gap-6 text-left mb-20"
          >
            {[
              { title: "Custom Website Design", desc: "Tailor-made website designs that align with your brand identity and goals." },
              { title: "E-Commerce Development", desc: "Build secure and user-friendly online stores to enhance your business growth." },
              { title: "SEO & Digital Marketing", desc: "Optimize your website for search engines and boost online visibility." },
              { title: "Website Maintenance & Support", desc: "Keep your website secure, updated, and running smoothly with our support services." }
            ].map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-gray-800 rounded-lg shadow-lg transition-all duration-300 hover:bg-cyan-500 hover:text-black"
              >
                <h2 className="text-lg md:text-xl font-semibold">{service.title}</h2>
                <p className="mt-2 text-sm md:text-base">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Pricing Section */}
          <motion.div 
            ref={pricingRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isPricingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-20 text-center"
          >
            <h2 className="text-3xl font-semibold text-cyan-400 mb-6 transition-all duration-300 hover:text-cyan-300">
              Pricing Plans
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              {[
                { name: "Basic Plan", price: "₹2000", details: "Simple website with essential features." },
                { name: "Standard Plan", price: "₹5000", details: "Advanced design with SEO optimization." },
                { name: "Premium Plan", price: "₹10000", details: "Full-featured custom website with maintenance. Free domain and SSL certificate" }
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-gray-800 rounded-lg shadow-lg transition-all duration-300 hover:bg-cyan-500 hover:text-black"
                >
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="mt-2">{plan.price}</p>
                  <p className="mt-2 text-sm">{plan.details}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Apply Buttons */}
          <motion.div 
            ref={buttonsRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isButtonsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-8 grid md:grid-cols-2 gap-6 md:w-full"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="w-full p-6 bg-cyan-500 text-black font-semibold text-lg transition-all duration-300 hover:bg-cyan-400"
              onClick={() => setShowForm(true)}
            >
              Apply Online
            </motion.button>
            <motion.a 
              href="https://wa.me/916009051189"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="w-full p-6 bg-green-500 text-black font-semibold text-lg text-center transition-all duration-300 hover:bg-green-400"
            >
              Apply from WhatsApp
            </motion.a>
          </motion.div>
        </div>

        {/* Application Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div 
                className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full mx-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <h2 className="text-xl font-semibold text-cyan-400 mb-4">Application Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full p-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                  
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full p-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-cyan-500"
                    pattern="[0-9]{10}"
                    required
                  />
                  
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full p-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                  
                  <select
                    name="plan"
                    value={formData.plan}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="Basic Plan">Basic Plan (₹2000)</option>
                    <option value="Standard Plan">Standard Plan (₹5000)</option>
                    <option value="Premium Plan">Premium Plan (₹10000)</option>
                  </select>

                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
};

export default Services;