// CheryFeaturesAccordion.jsx
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const CheryFeaturesAccordion = () => {
  // State management
  const [activeModel, setActiveModel] = useState("tiggo8");
  const [activeSection, setActiveSection] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  
  // Refs
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const scrollTimeoutRef = useRef(null);
  
  // Feature data
  const features = [
    // Tiggo 8 Pro features
    {
      id: 1,
      title: "Luxury Exterior",
      description: "The Tiggo 8 Pro is the epitome of luxury that transcends the bounds of a mere vehicle; a masterpiece that commands centre stage presence. Its diamond-shaped front grille gleams like a finely cut jewel, while the illuminated logo radiates an aura of refinement.",
      icon: "design",
      highlight: "Distinctive tiger face",
      details: "207mm ground clearance",
      model: "tiggo8",
      keyFeatures: [
        "Diamond-shaped front grille with illuminated logo",
        "19\" Aluminium Alloy Wheels for commanding presence",
        "LED headlights with daytime running lamps"
      ]
    },
    {
      id: 2,
      title: "Premium Cabin",
      description: "Enveloping you in absolute luxury and comfort is the plush leather upholstery that's hand-stitched to perfection on the seats, steering wheel, and other key touchpoints. The cabin features ambient lighting and a top-tier 8-speaker Sony Sound System that delivers crystal-clear audio quality.",
      icon: "cabin",
      highlight: "First class comfort",
      details: "Dual 12.3-inch LCD screens",
      model: "tiggo8",
      keyFeatures: [
        "Hand-stitched leather upholstery for premium comfort",
        "12.3-inch dual LCD screens with intuitive controls",
        "8-speaker Sony Sound System for immersive audio"
      ]
    },
    {
      id: 3,
      title: "Performance",
      description: "At its heart lies a 1600cc turbocharged high compression engine, a force of nature that pulses with 195 BHP and 290Nm of torque. With every command of the pedal, it speaks in the language of power and precision, delivering an exhilarating performance that leaves behind a fervent desire to take the wheel.",
      icon: "engine",
      highlight: "195 BHP power",
      details: "290Nm torque",
      model: "tiggo8",
      keyFeatures: [
        "1600cc turbocharged high compression engine",
        "195 BHP power with 290Nm of torque",
        "7-speed dual clutch transmission"
      ]
    },
    {
      id: 4,
      title: "Safety Suite",
      description: "When it comes to safety, there's a commitment to unwavering confidence with the inclusion of 9 airbags, ISOFIX, and up to 15 Advanced Driver Assistance Systems (ADAS), including Automatic Emergency Braking, intelligent alerts, parking assistance, and Traffic Congestion Assist.",
      icon: "safety",
      highlight: "Complete protection",
      details: "15 ADAS features",
      model: "tiggo8",
      keyFeatures: [
        "9 airbags for comprehensive protection",
        "Advanced Driver Assistance Systems (ADAS)",
        "360° HD Panoramic Camera for complete visibility"
      ]
    },
    
    // Tiggo Cross features
    {
      id: 5,
      title: "Modern Design",
      description: "The Tiggo Cross features a striking biomimetic tiger face design with a starry diamond-shaped grille pattern, tiger claw style headlight trim, and distinctive fog lamp contours that convey strength and character. Its silhouette is sleek and aerodynamic, ready for adventure.",
      icon: "design",
      highlight: "Biomimetic tiger face",
      details: "Aerodynamic profile",
      model: "tiggoCross",
      keyFeatures: [
        "Starry diamond-shaped grille pattern",
        "Tiger claw style headlight trim",
        "Sleek aerodynamic profile for modern aesthetics"
      ]
    },
    {
      id: 6,
      title: "Tech Interface",
      description: "The interior showcases a 10.25-inch Ultra-Clear LCD screen with Full HD display and Multi-Touch functionality. With a resolution of up to 1920 x 720, it enhances visual clarity while supporting wireless connectivity for both Android and Apple smartphones through AA+CP technology.",
      icon: "technology",
      highlight: "HD touchscreen",
      details: "Wireless smartphone integration",
      model: "tiggoCross",
      keyFeatures: [
        "10.25-inch Ultra-Clear LCD screen",
        "Wireless AA+CP connectivity",
        "Intelligent voice assistant features"
      ]
    },
    {
      id: 7,
      title: "Safety Features",
      description: "The vehicle is equipped with a comprehensive passive safety system featuring seven airbags, including dual front airbags, front-row side airbags, curtain airbags, and bolster airbags, ensuring exceptional all-around protection for all occupants alongside advanced driver assistance systems.",
      icon: "safety",
      highlight: "7 airbag configuration",
      details: "All-around protection",
      model: "tiggoCross",
      keyFeatures: [
        "7 airbags configuration for all-around protection",
        "Front and rear parking sensors",
        "Auto body structure with reinforced safety cage"
      ]
    }
  ];

  // Get filtered features based on active model
  const filteredFeatures = features.filter(feature => feature.model === activeModel);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Model switching handler
  const handleModelSwitch = (model) => {
    setActiveModel(model);
    setActiveSection(0);
    sectionRefs.current = [];
    
    setTimeout(() => {
      scrollToSection(0);
    }, 300);
  };

  // Section toggle handler
  const toggleSection = (index) => {
    if (activeSection === index) return;
    
    setActiveSection(index);
    scrollToSection(index);
  };

  // Scroll to section function
  const scrollToSection = (index) => {
    if (!sectionRefs.current[index] || isAutoScrolling) return;
    
    setIsAutoScrolling(true);
    const section = sectionRefs.current[index];
    
    // Calculate offset to center the section in the viewport
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const sectionRect = section.getBoundingClientRect();
    const sectionTop = sectionRect.top + scrollTop;
    const offset = sectionTop - (window.innerHeight / 2) + (sectionRect.height / 2);
    
    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });
    
    // Prevent scroll handling during animation
    clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setIsAutoScrolling(false);
    }, 1000);
  };

  // Intersection Observer - detect when component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && activeSection === null) {
          setActiveSection(0);
        }
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [activeSection]);

  // Scroll-based section activation
  useEffect(() => {
    let scrollTimeout;
    let lastScrollPosition = window.pageYOffset;
    let scrollDirection = null;
    
    const handleScroll = () => {
      if (isAutoScrolling) return;
      
      const currentScrollPosition = window.pageYOffset;
      scrollDirection = currentScrollPosition > lastScrollPosition ? 'down' : 'up';
      lastScrollPosition = currentScrollPosition;
      
      // Clear existing timeout
      clearTimeout(scrollTimeout);
      
      // Set a timeout to delay the scroll event handling
      scrollTimeout = setTimeout(() => {
        if (!containerRef.current) return;
        
        // Get all section positions relative to the viewport
        const sectionPositions = filteredFeatures.map((_, index) => {
          if (!sectionRefs.current[index]) return null;
          
          const rect = sectionRefs.current[index].getBoundingClientRect();
          return {
            index,
            top: rect.top,
            bottom: rect.bottom,
            height: rect.height,
            middle: rect.top + rect.height / 2
          };
        }).filter(Boolean);
        
        // Find which section is closest to the center of the viewport
        const viewportCenter = window.innerHeight / 2;
        let closestSection = null;
        let minDistance = Infinity;
        
        sectionPositions.forEach(section => {
          const distance = Math.abs(section.middle - viewportCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = section.index;
          }
        });
        
        // Activate the closest section if it's reasonably close to center
        if (closestSection !== null && closestSection !== activeSection) {
          const threshold = window.innerHeight * 0.3;
          if (minDistance < threshold) {
            setActiveSection(closestSection);
          }
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, [activeSection, isAutoScrolling, filteredFeatures.length]);

  // Auto-expand sections with delay
  useEffect(() => {
    if (!isInView) return;
    
    const timer = setTimeout(() => {
      const maxIndex = filteredFeatures.length - 1;
      if (activeSection === null) {
        setActiveSection(0);
      } else if (activeSection < maxIndex) {
        setActiveSection(activeSection + 1);
        scrollToSection(activeSection + 1);
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [activeSection, isInView, filteredFeatures.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isInView) return;
      
      switch (e.key) {
        case 'ArrowDown':
          if (activeSection < filteredFeatures.length - 1) {
            toggleSection(activeSection + 1);
          }
          break;
        case 'ArrowUp':
          if (activeSection > 0) {
            toggleSection(activeSection - 1);
          }
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSection, isInView, filteredFeatures.length]);

  // Icon component
  const FeatureIcon = ({ type }) => {
    switch(type) {
      case 'design':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        );
      case 'cabin':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        );
      case 'safety':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        );
      case 'engine':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M14 6l1 2h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 0-1 1v3"></path>
            <path d="M7 6a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 1 1 1v1a1 1 0 0 0 1 1h1"></path>
            <path d="M5 16v1a1 1 0 0 0 1 1h4"></path>
            <path d="M17 18h1a1 1 0 0 0 1-1v-3"></path>
          </svg>
        );
      case 'technology':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <div 
      className="relative flex flex-col md:flex-row min-h-screen"
      ref={containerRef}
      role="region"
      aria-label="Vehicle Features Explorer"
    >
      {/* ===== LEFT SIDE - IMAGE SECTION ===== */}
      <div className="md:w-3/5 h-[50vh] md:h-screen md:sticky top-0 relative overflow-hidden">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent z-10" />
        
        {/* Vehicle images with transitions */}
        <AnimatePresence mode="wait">
          {activeModel === "tiggo8" ? (
            <motion.div
              key="tiggo8-image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src="/images/tiggo8pro/banners/Intelligent.jpg"
                alt="Chery Tiggo 8 Pro SUV in pearl white color, showcasing its premium design"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
                className="object-cover"
              />
            </motion.div>
          ) : (
            <motion.div
              key="tiggocross-image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src="/images/tiggocross/hero/exterior.jpg"
                alt="Chery Tiggo Cross SUV in pearl white color, showcasing its modern design"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Overlay content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl"
          >
            {/* Vehicle title with animation */}
            <AnimatePresence mode="wait">
              {activeModel === "tiggo8" ? (
                <motion.h1
                  key="tiggo8-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                >
                  ENJOY YOUR FIRST CLASS
                </motion.h1>
              ) : (
                <motion.h1
                  key="tiggocross-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                >
                  DISCOVER THE TIGGO CROSS
                </motion.h1>
              )}
            </AnimatePresence>
            
            <div className="h-1 w-24 bg-primary-700 mb-6" />
            
            {/* Vehicle description with animation */}
            <AnimatePresence mode="wait">
              {activeModel === "tiggo8" ? (
                <motion.p
                  key="tiggo8-desc"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-white/90 text-lg mb-8 max-w-lg leading-normal"
                >
                  The Tiggo 8 Pro is the epitome of luxury that transcends the bounds of a mere vehicle; a masterpiece that commands centre stage presence.
                </motion.p>
              ) : (
                <motion.p
                  key="tiggocross-desc"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-white/90 text-lg mb-8 max-w-lg leading-normal"
                >
                  Wonderful. Modern. Safe. Comfortable. Stylish. The Tiggo Cross is designed for every kind of you.
                </motion.p>
              )}
            </AnimatePresence>
            
            {/* Model selector buttons */}
            <div className="flex space-x-4 mb-8">
              <button 
                onClick={() => handleModelSwitch("tiggo8")}
                className={`px-6 py-3 rounded transition-colors duration-300 font-medium ${
                  activeModel === "tiggo8" 
                    ? "bg-primary-700 text-white" 
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
                aria-pressed={activeModel === "tiggo8"}
              >
                Tiggo 8 Pro
              </button>
              <button 
                onClick={() => handleModelSwitch("tiggoCross")}
                className={`px-6 py-3 rounded transition-colors duration-300 font-medium ${
                  activeModel === "tiggoCross" 
                    ? "bg-primary-700 text-white" 
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
                aria-pressed={activeModel === "tiggoCross"}
              >
                Tiggo Cross
              </button>
            </div>
            
            {/* CTA button - desktop only */}
            <div className="hidden md:block">
              <a 
                href="/test-drive" 
                className="group inline-flex items-center px-10 py-4 bg-primary-700 text-white font-medium hover:bg-primary-900 transition-colors duration-300"
              >
                Schedule Your Test Drive
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:ml-3 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* ===== RIGHT SIDE - FEATURES SECTION ===== */}
      <div className="md:w-2/5 bg-gray-100 py-16 px-6 md:px-10">
        <div className="max-w-xl mx-auto">
          {/* Mobile controls */}
          <div className="mb-12 md:hidden">
            {/* Model switcher for mobile */}
            <div className="flex space-x-4 mb-6">
              <button 
                onClick={() => handleModelSwitch("tiggo8")}
                className={`px-6 py-3 rounded transition-colors duration-300 font-medium ${
                  activeModel === "tiggo8" 
                    ? "bg-primary-700 text-white" 
                    : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                }`}
                aria-pressed={activeModel === "tiggo8"}
              >
                Tiggo 8 Pro
              </button>
              <button 
                onClick={() => handleModelSwitch("tiggoCross")}
                className={`px-6 py-3 rounded transition-colors duration-300 font-medium ${
                  activeModel === "tiggoCross" 
                    ? "bg-primary-700 text-white" 
                    : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                }`}
                aria-pressed={activeModel === "tiggoCross"}
              >
                Tiggo Cross
              </button>
            </div>

            {/* CTA button for mobile */}
            <a 
              href="/test-drive" 
              className="group inline-flex items-center px-10 py-4 bg-primary-700 text-white font-medium hover:bg-primary-900 transition-colors duration-300"
            >
              Schedule Your Test Drive
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:ml-3 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          
          {/* Mobile section title */}
          <div className="md:hidden mb-8">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              {activeModel === "tiggo8" ? "Tiggo 8 Pro Features" : "Tiggo Cross Features"}
            </h2>
            <div className="w-16 h-1 bg-primary-700 mb-4"></div>
            <p className="text-gray-600">
              {activeModel === "tiggo8" 
                ? "Discover the exceptional features that make the Tiggo 8 Pro a class above the rest."
                : "Explore the modern features that make the Tiggo Cross perfect for every kind of you."
              }
            </p>
          </div>
          
          {/* Quick section navigation */}
          <div className="hidden md:flex mb-8 overflow-x-auto pb-2 space-x-2">
            {filteredFeatures.map((feature, index) => (
              <button
                key={`nav-${feature.id}`}
                onClick={() => toggleSection(index)}
                className={`px-3 py-2 text-sm whitespace-nowrap rounded transition-colors duration-300 ${
                  activeSection === index 
                    ? 'bg-primary-700 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                {feature.title}
              </button>
            ))}
          </div>
          
          {/* Progress indicator */}
          <div className="hidden md:block mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Progress</span>
              <span className="text-xs text-gray-500">
                {activeSection !== null ? `${activeSection + 1}/${filteredFeatures.length}` : '0/0'}
              </span>
            </div>
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-700 transition-all duration-500"
                style={{ 
                  width: activeSection !== null 
                    ? `${((activeSection + 1) / filteredFeatures.length) * 100}%` 
                    : '0%' 
                }}
              ></div>
            </div>
          </div>
          
          {/* Features accordion */}
          <motion.div 
            className="py-8 md:py-10 space-y-12 md:space-y-16"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            viewport={{ once: true, amount: 0.1 }}
          >
            {filteredFeatures.map((feature, index) => (
              <motion.div 
                key={feature.id}
                ref={el => sectionRefs.current[index] = el}
                variants={itemVariants}
                className={`relative transform transition-all duration-500 ${
                  activeSection === index 
                    ? 'scale-100 opacity-100' 
                    : 'scale-95 opacity-70'
                }`}
                id={`feature-section-${feature.id}`}
              >
                {/* Feature header (always visible) */}
                <button 
                  className="w-full text-left focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-opacity-50 p-2 -m-2 rounded"
                  onClick={() => toggleSection(index)}
                  aria-expanded={activeSection === index}
                  aria-controls={`feature-content-${feature.id}`}
                >
                  <div className="flex items-center mb-3">
                    <div className={`mr-4 p-3 rounded transition-colors duration-300 ${
                      activeSection === index ? 'bg-primary-700 text-white' : 'bg-primary-light bg-opacity-40 text-primary-900'
                    }`}>
                      <FeatureIcon type={feature.icon} />
                    </div>
                    <h2 className={`text-2xl font-bold transition-all duration-300 ${
                      activeSection === index ? 'text-gray-900' : 'text-primary-900'
                    }`}>
                      {feature.title}
                    </h2>
                  </div>
                  
                  <div className="flex items-center ml-16 mb-4">
                    <span className="text-sm text-primary-700 font-medium">{feature.highlight}</span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-sm text-primary-700 font-medium">{feature.details}</span>
                  </div>
                  
                  <div className={`h-0.5 bg-gray-200 mb-4 transition-all duration-500 ease-in-out ml-16 ${
                    activeSection === index ? 'w-full' : 'w-1/3'
                  }`}>
                    <div className={`h-full bg-primary-700 transition-all duration-500 ease-in-out ${
                      activeSection === index ? 'w-full' : 'w-0'
                    }`}></div>
                  </div>
                </button>
              
                {/* Feature content (expanded when active) */}
                <AnimatePresence initial={false}>
                  {activeSection === index && (
                    <motion.div 
                      id={`feature-content-${feature.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-16 overflow-hidden"
                    >
                      <p className="text-gray-600 mb-6 leading-normal">
                        {feature.description}
                      </p>
                      
                      {/* Key features box */}
                      <div className="p-6 bg-white/90 backdrop-blur-sm border-l-2 border-primary-700 mb-4 shadow-sm">
                        <div className="flex items-center mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-700 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-900 font-medium">Key features:</span>
                        </div>
                        <ul className="text-gray-600 space-y-2 ml-7">
                          {feature.keyFeatures.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Learn more link */}
                      <a
                        href={`/models/${activeModel === "tiggo8" ? "tiggo8pro" : "tiggocross"}`}
                        className="group inline-flex items-center text-primary-700 font-medium hover:text-primary-900 transition-colors duration-300"
                      >
                        Learn More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:ml-3 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
                  
                {/* Vertical line connecting features */}
                {index < filteredFeatures.length - 1 && (
                  <div className="absolute left-5 top-16 w-0.5 bg-gray-200 h-16 md:h-24" />
                )}
              </motion.div>
            ))}
          </motion.div>
          
          {/* Navigation controls */}
          <div className="mt-12 flex justify-between items-center">
            <button
              onClick={() => {
                if (activeSection > 0) {
                  toggleSection(activeSection - 1);
                }
              }}
              disabled={activeSection === 0}
              className={`p-3 rounded-full ${
                activeSection === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
              }`}
              aria-label="Previous feature"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            <span className="text-sm text-gray-500">
              {activeSection !== null && filteredFeatures.length > 0 
                ? `${activeSection + 1} of ${filteredFeatures.length}` 
                : ''}
            </span>
            
            <button
              onClick={() => {
                if (activeSection < filteredFeatures.length - 1) {
                  toggleSection(activeSection + 1);
                }
              }}
              disabled={activeSection === filteredFeatures.length - 1}
              className={`p-3 rounded-full ${
                activeSection === filteredFeatures.length - 1 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
              }`}
              aria-label="Next feature"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {/* "View all features" link */}
          <div className="mt-8 text-center">
            <a
              href={`/vehicles/${activeModel === "tiggo8" ? "tiggo-8-pro" : "tiggo-cross"}/features`}
              className="inline-flex items-center text-primary-700 font-medium hover:text-primary-900 transition-colors duration-300"
            >
              View All Features
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheryFeaturesAccordion;