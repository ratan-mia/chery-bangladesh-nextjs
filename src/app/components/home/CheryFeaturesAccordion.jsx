// CheryFeaturesAccordion.jsx
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const CheryFeaturesAccordion = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRefs = useRef([]);
  const containerRef = useRef(null);
  
  // Enhanced feature data with icons and additional fields from both Tiggo 8 Pro and Tiggo Cross
  const features = [
    {
      id: 1,
      title: "Tiggo 8 Pro - Luxury Exterior",
      description: "The Tiggo 8 Pro is the epitome of luxury that transcends the bounds of a mere vehicle; a masterpiece that commands centre stage presence. Its diamond-shaped front grille gleams like a finely cut jewel, while the illuminated logo radiates an aura of refinement.",
      icon: "design",
      highlight: "Distinctive tiger face",
      details: "207mm ground clearance",
      model: "tiggo8"
    },
    {
      id: 2,
      title: "Tiggo 8 Pro - Premium Cabin",
      description: "Enveloping you in absolute luxury and comfort is the plush leather upholstery that's hand-stitched to perfection on the seats, steering wheel, and other key touchpoints. The cabin features ambient lighting and a top-tier 8-speaker Sony Sound System that delivers crystal-clear audio quality.",
      icon: "cabin",
      highlight: "First class comfort",
      details: "Dual 12.3-inch LCD screens",
      model: "tiggo8"
    },
    {
      id: 3,
      title: "Tiggo 8 Pro - Performance",
      description: "At its heart lies a 1600cc turbocharged high compression engine, a force of nature that pulses with 195 BHP and 290Nm of torque. With every command of the pedal, it speaks in the language of power and precision, delivering an exhilarating performance that leaves behind a fervent desire to take the wheel.",
      icon: "engine",
      highlight: "195 BHP power",
      details: "290Nm torque",
      model: "tiggo8"
    },
    {
      id: 4,
      title: "Tiggo 8 Pro - Safety Suite",
      description: "When it comes to safety, there's a commitment to unwavering confidence with the inclusion of 9 airbags, ISOFIX, and up to 15 Advanced Driver Assistance Systems (ADAS), including Automatic Emergency Braking, intelligent alerts, parking assistance, and Traffic Congestion Assist.",
      icon: "safety",
      highlight: "Complete protection",
      details: "15 ADAS features",
      model: "tiggo8"
    },
    {
      id: 5,
      title: "Tiggo Cross - Modern Design",
      description: "The Tiggo Cross features a striking biomimetic tiger face design with a starry diamond-shaped grille pattern, tiger claw style headlight trim, and distinctive fog lamp contours that convey strength and character. Its silhouette is sleek and aerodynamic, ready for adventure.",
      icon: "design",
      highlight: "Biomimetic tiger face",
      details: "Aerodynamic profile",
      model: "tiggoCross"
    },
    {
      id: 6,
      title: "Tiggo Cross - Tech Interface",
      description: "The interior showcases a 10.25-inch Ultra-Clear LCD screen with Full HD display and Multi-Touch functionality. With a resolution of up to 1920 x 720, it enhances visual clarity while supporting wireless connectivity for both Android and Apple smartphones through AA+CP technology.",
      icon: "technology",
      highlight: "HD touchscreen",
      details: "Wireless smartphone integration",
      model: "tiggoCross"
    },
    {
      id: 7,
      title: "Tiggo Cross - Safety Features",
      description: "The vehicle is equipped with a comprehensive passive safety system featuring seven airbags, including dual front airbags, front-row side airbags, curtain airbags, and bolster airbags, ensuring exceptional all-around protection for all occupants alongside advanced driver assistance systems.",
      icon: "safety",
      highlight: "7 airbag configuration",
      details: "All-around protection",
      model: "tiggoCross"
    }
  ];

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  // Intersection observer to detect when component enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
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
  }, []);

  // Scroll-based activation
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      const viewportHeight = window.innerHeight;
      
      // Calculate how far we've scrolled through the container as a percentage
      const scrollProgress = Math.max(0, Math.min(1, 
        (viewportHeight / 2 - containerTop) / (containerHeight - viewportHeight / 2)
      ));
      
      // Map scroll progress to active section
      const sectionCount = features.length;
      const sectionIndex = Math.floor(scrollProgress * sectionCount);
      
      if (sectionIndex >= 0 && sectionIndex < sectionCount) {
        setActiveSection(sectionIndex);
      } else if (scrollProgress <= 0) {
        setActiveSection(null); // Before first section
      } else if (scrollProgress >= 1) {
        setActiveSection(sectionCount - 1); // After last section
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [features.length]);

  // Manual toggle function for accessibility and mobile
  const toggleSection = (index) => {
    setActiveSection(prevActive => prevActive === index ? null : index);
  };

  // Icon component
  const renderIcon = (iconName) => {
    switch(iconName) {
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

  const [activeModel, setActiveModel] = useState("tiggo8");
  
  return (
    <div 
      className="relative flex flex-col md:flex-row min-h-screen"
      ref={containerRef}
    >
      {/* Left side - Image Section with model switcher */}
      <div className="md:w-3/5 h-[50vh] md:h-screen md:sticky top-0 relative overflow-hidden">
        {/* Multiple layered gradients for better visual depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent z-10" />
        
        {/* Image for Tiggo 8 Pro */}
        {activeModel === "tiggo8" && (
          <Image
            src="/images/tiggo8pro/banners/Intelligent.jpg"
            alt="Chery Tiggo 8 Pro SUV in pearl white color, showcasing its premium design"
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
            className="object-cover"
          />
        )}
        
        {/* Image for Tiggo Cross */}
        {activeModel === "tiggoCross" && (
          <Image
            src="/images/tiggocross/hero/exterior.jpg"
            alt="Chery Tiggo Cross SUV in pearl white color, showcasing its modern design"
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
            className="object-cover"
          />
        )}
        
        {/* Overlay content on image */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl"
          >
            {activeModel === "tiggo8" ? (
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                ENJOY YOUR FIRST CLASS
              </h1>
            ) : (
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                DISCOVER THE TIGGO CROSS
              </h1>
            )}
            <div className="h-1 w-24 bg-primary-700 mb-6" />
            <p className="text-white/90 text-lg mb-8 max-w-lg leading-normal">
              {activeModel === "tiggo8" 
                ? "The Tiggo 8 Pro is the epitome of luxury that transcends the bounds of a mere vehicle; a masterpiece that commands centre stage presence." 
                : "Wonderful. Modern. Safe. Comfortable. Stylish. The Tiggo Cross is designed for every kind of you."
              }
            </p>
            
            {/* Model switcher buttons */}
            <div className="flex space-x-4 mb-8">
              <button 
                onClick={() => setActiveModel("tiggo8")}
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
                onClick={() => setActiveModel("tiggoCross")}
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
      
      {/* Right side - Content Section */}
      <div className="md:w-2/5 bg-gray-100 py-16 px-6 md:px-10">
        <div className="max-w-xl mx-auto">
          <div className="mb-12 md:hidden">
            {/* Model switcher for mobile */}
            <div className="flex space-x-4 mb-6">
              <button 
                onClick={() => setActiveModel("tiggo8")}
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
                onClick={() => setActiveModel("tiggoCross")}
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
          
          <motion.div 
            className="py-8 md:py-16 space-y-12 md:space-y-16"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            viewport={{ once: true, amount: 0.1 }}
          >
            {features
              .filter(feature => feature.model === activeModel)
              .map((feature, index) => (
                <motion.div 
                  key={feature.id}
                  ref={el => sectionRefs.current[index] = el}
                  variants={itemVariants}
                  className="relative"
                >
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
                        {renderIcon(feature.icon)}
                      </div>
                      <h2 className={`text-2xl font-bold transition-all duration-300 ${
                        activeSection === index ? 'text-gray-900' : 'text-primary-900'
                      }`}>
                        {feature.title.split(' - ')[1]}
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
                
                  <AnimatePresence>
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
                        
                        {/* Additional content that appears when expanded */}
                        <div className="p-6 bg-white/90 backdrop-blur-sm border-l-2 border-primary-700 mb-4 shadow-sm">
                          <div className="flex items-center mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-700 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-900 font-medium">Key features:</span>
                          </div>
                          <ul className="text-gray-600 space-y-2 ml-7">
                            {/* Tiggo 8 Pro - Luxury Exterior */}
                            {feature.title.includes("Luxury Exterior") && (
                              <>
                                <li>Diamond-shaped front grille with illuminated logo</li>
                                <li>19" Aluminium Alloy Wheels for commanding presence</li>
                                <li>LED headlights with daytime running lamps</li>
                              </>
                            )}
                            
                            {/* Tiggo 8 Pro - Premium Cabin */}
                            {feature.title.includes("Premium Cabin") && (
                              <>
                                <li>Hand-stitched leather upholstery for premium comfort</li>
                                <li>12.3-inch dual LCD screens with intuitive controls</li>
                                <li>8-speaker Sony Sound System for immersive audio</li>
                              </>
                            )}
                            
                            {/* Tiggo 8 Pro - Performance */}
                            {feature.title.includes("Performance") && (
                              <>
                                <li>1600cc turbocharged high compression engine</li>
                                <li>195 BHP power with 290Nm of torque</li>
                                <li>7-speed dual clutch transmission</li>
                              </>
                            )}
                            
                            {/* Tiggo 8 Pro - Safety Suite */}
                            {feature.title.includes("Safety Suite") && (
                              <>
                                <li>9 airbags for comprehensive protection</li>
                                <li>Advanced Driver Assistance Systems (ADAS)</li>
                                <li>360° HD Panoramic Camera for complete visibility</li>
                              </>
                            )}
                            
                            {/* Tiggo Cross - Modern Design */}
                            {feature.title.includes("Modern Design") && (
                              <>
                                <li>Starry diamond-shaped grille pattern</li>
                                <li>Tiger claw style headlight trim</li>
                                <li>Sleek aerodynamic profile for modern aesthetics</li>
                              </>
                            )}
                            
                            {/* Tiggo Cross - Tech Interface */}
                            {feature.title.includes("Tech Interface") && (
                              <>
                                <li>10.25-inch Ultra-Clear LCD screen</li>
                                <li>Wireless AA+CP connectivity</li>
                                <li>Intelligent voice assistant features</li>
                              </>
                            )}
                            
                            {/* Tiggo Cross - Safety Features */}
                            {feature.title.includes("Safety Features") && (
                              <>
                                <li>7 airbags configuration for all-around protection</li>
                                <li>Front and rear parking sensors</li>
                                <li>Auto body structure with reinforced safety cage</li>
                              </>
                            )}
                          </ul>
                        </div>

                        <a
                          href={`/vehicles/${activeModel === "tiggo8" ? "tiggo-8-pro" : "tiggo-cross"}/${feature.title.split(' - ')[1].toLowerCase().replace(/\s+/g, '-')}`}
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
                  {index < features.filter(f => f.model === activeModel).length - 1 && (
                    <div className="absolute left-5 top-16 w-0.5 bg-gray-200 h-16 md:h-24" />
                  )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CheryFeaturesAccordion;