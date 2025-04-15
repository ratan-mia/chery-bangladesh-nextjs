'use client'

import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Phone, Settings, ShieldCheck, Star, Wrench } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const ServiceStickyNav = () => {
  const [activeSection, setActiveSection] = useState('services');
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef(null);
  const [showNavArrows, setShowNavArrows] = useState(false);
  
  // Navigation links for service page sections with improved iconography
  const navLinks = [
    { id: 'why-choose', label: 'Why Choose Us', icon: ShieldCheck },
    { id: 'assistance', label: 'Roadside Help', icon: Phone },
    { id: 'services', label: 'Services', icon: Wrench },
    { id: 'process', label: 'Process', icon: Settings },
    { id: 'maintenance', label: 'Maintenance', icon: Calendar },
    { id: 'warranty', label: 'Warranty', icon: ShieldCheck },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'book-service', label: 'Book Service', icon: Clock },
    { id: 'reviews', label: 'Reviews', icon: Star }
  ];

  // Check scroll overflow
  useEffect(() => {
    const checkOverflow = () => {
      if (navRef.current) {
        setShowNavArrows(navRef.current.scrollWidth > navRef.current.clientWidth);
      }
    };
    
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  // Check if navbar should be sticky based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Start sticky behavior after hero section
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
          
          // Scroll active menu item into view within the navbar
          if (isSticky && navRef.current) {
            const activeButton = document.querySelector(`button[data-section="${currentSection.id}"]`);
            if (activeButton) {
              const buttonRect = activeButton.getBoundingClientRect();
              const navRect = navRef.current.getBoundingClientRect();
              
              // If active button is out of view, scroll it into view
              if (buttonRect.left < navRect.left || buttonRect.right > navRect.right) {
                navRef.current.scrollLeft += buttonRect.left - navRect.left - (navRect.width / 2) + (buttonRect.width / 2);
              }
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSticky, navLinks]);

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Get the sticky nav height to offset scrolling position
      const navHeight = 64; // Slightly increased height for better spacing
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
      
      setActiveSection(sectionId);
    }
  };

  // Scroll nav horizontally
  const scrollNav = (direction) => {
    if (navRef.current) {
      navRef.current.scrollBy({
        left: direction === 'right' ? 200 : -200,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav 
      className={`w-full z-50 bg-black/90 backdrop-blur-md border-b border-gray-800 transition-all duration-300 ${
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
      <div className="container mx-auto px-4 relative">
        {/* Navigation arrows for horizontal scrolling on mobile/tablet */}
        {showNavArrows && isSticky && (
          <>
            <button 
              onClick={() => scrollNav('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 text-white p-1 rounded-full shadow-md"
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button 
              onClick={() => scrollNav('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 text-white p-1 rounded-full shadow-md"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </>
        )}
      
        <div 
          className="py-4 overflow-x-auto scrollbar-hide"
          ref={navRef}
        >
          <ul className="flex space-x-1 md:space-x-3 lg:space-x-6 whitespace-nowrap justify-start md:justify-center px-4 md:px-12">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  data-section={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`flex flex-col md:flex-row items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeSection === link.id
                      ? 'bg-primary-600/10 text-primary-500 transform scale-105'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <link.icon size={18} className={`mb-1 md:mb-0 md:mr-2 ${
                    activeSection === link.id ? 'text-primary-500' : 'text-gray-500'
                  }`} />
                  <span className="text-xs md:text-sm">{link.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Progress indicator */}
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-primary-600"
          initial={{ width: '0%' }}
          animate={{ 
            width: isSticky ? `${(navLinks.findIndex(link => link.id === activeSection) + 1) / navLinks.length * 100}%` : '0%' 
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.nav>
  );
};

export default ServiceStickyNav;