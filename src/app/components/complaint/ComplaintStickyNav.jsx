"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ComplaintStickyNav = () => {
  const [activeSection, setActiveSection] = useState("");

  const navItems = [
    { id: "complaint-types", label: "Types" },
    { id: "process", label: "Process" },
    { id: "resolution", label: "Timeline" },
    { id: "file-complaint", label: "File Complaint" },
    { id: "contact", label: "Contact" },
    { id: "faqs", label: "FAQs" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      })).filter(item => item.element);

      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial state
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 150; // Account for sticky nav height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo/Title */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-700 flex items-center justify-center rounded">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-lg font-bold text-gray-900">Complaint Center</span>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md ${
                  activeSection === item.id
                    ? "bg-primary-700 text-white"
                    : "text-gray-600 hover:text-primary-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <select
              value={activeSection}
              onChange={(e) => handleNavClick(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-700"
            >
              <option value="">Select Section</option>
              {navItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-200">
          <motion.div
            className="h-full bg-primary-700"
            initial={{ width: "0%" }}
            animate={{ 
              width: activeSection ? `${(navItems.findIndex(item => item.id === activeSection) + 1) / navItems.length * 100}%` : "0%" 
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.nav>
  );
};

export default ComplaintStickyNav;