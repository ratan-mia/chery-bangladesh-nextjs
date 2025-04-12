'use client'

import { motion } from 'framer-motion';
import { Calendar, Clock, HelpCircle, MapPin, Phone, ShieldCheck, Star, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';

const ServiceStickyNav = () => {
  const [activeSection, setActiveSection] = useState('services');
  const [isSticky, setIsSticky] = useState(false);
  
  // Navigation links for service page sections
  const navLinks = [
    { id: 'why-choose', label: 'Why Choose Us', icon: HelpCircle },
    { id: 'assistance', label: 'Roadside Help', icon: Phone },
    { id: 'services', label: 'Services', icon: Wrench },
    { id: 'process', label: 'Process', icon: Wrench },
    { id: 'maintenance', label: 'Maintenance', icon: Calendar },
    { id: 'warranty', label: 'Warranty', icon: ShieldCheck },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'book-service', label: 'Book Service', icon: Clock },
    { id: 'reviews', label: 'Reviews', icon: Star }
  ];

  // Check if navbar should be sticky based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Start sticky behavior after hero section (adjust 300 to match your hero height)
      setIsSticky(window.scrollY > 300);
      
      // Determine which section is currently in view
      const sections = navLinks.map(link => document.getElementById(link.id));
      const validSections = sections.filter(section => section !== null);
      
      if (validSections.length > 0) {
        // Find the section that's currently in view with some buffer
        const currentSection = validSections.find(section => {
          const rect = section.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        });
        
        if (currentSection) {
          setActiveSection(currentSection.id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Get the sticky nav height to offset scrolling position (adjust 60 to match nav height)
      const navHeight = 60;
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
      
      setActiveSection(sectionId);
    }
  };

  return (
    <motion.nav 
      className={`w-full z-50 bg-black border-b border-gray-800 transition-all duration-300 ${
        isSticky 
          ? 'fixed top-0 shadow-lg shadow-black/50' 
          : 'relative'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isSticky ? 0 : -100,
        opacity: isSticky ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="py-3 overflow-x-auto hide-scrollbar">
          <ul className="flex space-x-2 md:space-x-6 whitespace-nowrap justify-start md:justify-center">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className={`flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    activeSection === link.id
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <link.icon size={16} className="mr-2" />
                  <span>{link.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default ServiceStickyNav;