'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

/**
 * InteriorShowcase Component
 * Follows Chery Bangladesh Design System Guidelines:
 * - Elegant Minimalism: Clean layouts with ample white space
 * - Purposeful Motion: Animations enhance usability and guide attention
 * - Content Focus: Vehicle imagery and key messaging is prominent
 * - Premium Feel: Attention to detail in spacing, alignment, and typography
 */
const InteriorShowcase = () => {
  // State for component interactions and responsive behavior
  const [activeImage, setActiveImage] = useState(null);
  const [screenSize, setScreenSize] = useState({
    width: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  // Interior features data - structured for consistent rendering
  const interiorFeatures = [
    {
      id: "main",
      title: "INSTRUMENT CLUSTER WITH SUEDETTE",
      description: "Premium suedette materials combine luxurious comfort with cutting-edge technology for an elevated driving experience",
      imageSrc: "/images/tiggo9pro/interior-main.jpg",
      alt: "Chery interior cabin with suedette instrument cluster"
    },
    {
      id: "knob",
      title: "EMBOSSED KNOB WITH DIAMOND-SHAPED ARGYLE",
      description: "Meticulously crafted control surfaces with elegant diamond patterning that reflects superior attention to detail",
      imageSrc: "/images/tiggo9pro/knob.jpg",
      alt: "Embossed knob with diamond-shaped argyle"
    },
    {
      id: "panels",
      title: "PANELS WITH WOOD GRAIN",
      description: "Natural wood grain textures create a warm, sophisticated cabin atmosphere that balances luxury with comfort",
      imageSrc: "/images/tiggo9pro/panels.jpg",
      alt: "Panels with wood grain"
    }
  ];

  // Handle responsive behavior
  useEffect(() => {
    const checkDeviceSize = () => {
      const width = window.innerWidth;
      setScreenSize({
        width,
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024
      });
    };
    
    // Initial check
    checkDeviceSize();
    
    // Debounced resize handler for better performance
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkDeviceSize, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);
  
  // Intersection observer to trigger animations when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          // Reset for re-animation if scrolled away (optional)
          // setIsInView(false); 
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Handle image interactions
  const handleImageInteraction = (id) => {
    // On touch devices, toggle the active state
    if (screenSize.isMobile || screenSize.isTablet) {
      setActiveImage(activeImage === id ? null : id);
    }
  };

  // Get appropriate image height based on screen size and position
  const getImageHeight = (position) => {
    if (position === 'main') {
      if (screenSize.isMobile) return 'h-[50vh]';
      if (screenSize.isTablet) return 'h-[60vh]';
      return 'h-[75vh]';
    } else {
      if (screenSize.isMobile) return 'h-52';
      if (screenSize.isTablet) return 'h-64';
      return 'h-80';
    }
  };

  // Animation variants - following the design system guidelines
  const animations = {
    // Container variants for staggering children
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.1,
        },
      },
    },
    
    // Item variants for individual elements
    item: {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }, // Design system easing
      },
    },
    
    // Image scaling animations
    image: {
      hover: { 
        scale: 1.05, 
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
      },
      initial: { 
        scale: 1, 
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
      }
    },
    
    // Text animations
    text: {
      hidden: { opacity: 0, y: 15 },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
          duration: 0.3, 
          ease: [0.16, 1, 0.3, 1] 
        } 
      }
    },
    
    // Fade in animation
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration: 0.5 }
      }
    },
    
    // Header animations
    headerContainer: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          staggerChildren: 0.1,
          delayChildren: 0.05
        }
      }
    },
    
    headerElement: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
          duration: 0.6, 
          ease: [0.16, 1, 0.3, 1] 
        } 
      }
    },
    
    // Divider animations
    divider: {
      hidden: { width: 0 },
      visible: (custom) => ({ 
        width: custom, 
        transition: { 
          duration: 0.5, 
          delay: 0.2,
          ease: [0.16, 1, 0.3, 1]
        } 
      })
    },
    
    // CTA button animation
    cta: {
      hidden: { opacity: 0, y: 10 },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
          duration: 0.5, 
          delay: 0.6,
          ease: [0.16, 1, 0.3, 1]
        } 
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-stone-100 overflow-hidden py-16 md:py-20 lg:py-24"
    >
      {/* Standard container from design system */}
      <div className="w-full mx-auto px-4 md:px-6 lg:px-8">
        {/* Header section with branding elements */}
        <motion.div 
          className="mb-10 md:mb-16 lg:mb-20"
          variants={animations.headerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Decorative element with glow effect - per design guide */}
          <motion.div 
            className="w-12 h-0.5 bg-[#c4b19c] mb-6 hidden md:block shadow-md"
            initial={{ width: 0 }}
            animate={isInView ? { width: 48 } : { width: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
          />
          
          {/* Overtitle with underline animation - per design guide */}
          <motion.p 
            variants={animations.headerElement}
            className="text-sm md:text-base font-medium tracking-wider text-[#8c735d] mb-3 md:mb-4 uppercase relative inline-block"
          >
            <span className="relative">
              LUXURIOUS DESIGN
              <motion.span 
                className="absolute -bottom-1 left-0 right-0 h-px bg-[#c4b19c]/50"
                initial={{ width: 0 }}
                animate={isInView ? { width: '100%' } : { width: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              />
            </span>
          </motion.p>
          
          {/* Main heading - following typography guidelines */}
          <motion.h2 
            variants={animations.headerElement}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#524336] leading-tight tracking-tighter"
          >
            EXTRA-WIDE<br className="md:block hidden" /> SURROUNDING CABIN
          </motion.h2>
          
          {/* Section divider with gradient - per design guide */}
          <motion.div 
            className="h-1.5 bg-gradient-to-r from-[#8c735d] to-[#524336]/70 mt-4 md:mt-6 mb-6 md:mb-8 rounded-full shadow-md"
            custom={screenSize.isMobile ? 80 : screenSize.isTablet ? 120 : 140}
            variants={animations.divider}
          />
          
          {/* Description paragraph - follows body text guidelines */}
          <motion.p
            variants={animations.headerElement}
            className="text-gray-600 text-base md:text-lg max-w-3xl leading-relaxed"
          >
            Every detail of our interior showcases premium craftsmanship and attention to detail, 
            creating a sophisticated driving environment designed for your comfort.
          </motion.p>
        </motion.div>

        {/* Main content container with staggered animations */}
        <motion.div
          variants={animations.container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8 md:space-y-10 lg:space-y-12"
        >
          {/* Main feature image - following the card pattern from design system */}
          <motion.div 
            className="relative overflow-hidden rounded-lg shadow-xl group"
            variants={animations.item}
            onHoverStart={() => !screenSize.isMobile && !screenSize.isTablet && setActiveImage("main")}
            onHoverEnd={() => !screenSize.isMobile && !screenSize.isTablet && setActiveImage(null)}
            onClick={() => handleImageInteraction("main")}
          >
            <div className={`relative w-full ${getImageHeight('main')}`}>
              <motion.div
                className="w-full h-full"
                variants={animations.image}
                animate={activeImage === "main" ? "hover" : "initial"}
              >
                <Image
                  src={interiorFeatures[0].imageSrc}
                  alt={interiorFeatures[0].alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
                  className="object-cover"
                  priority
                  quality={95}
                />
              </motion.div>
              
              {/* Enhanced feature label overlay - following card pattern */}
              <div 
                className={`absolute bottom-0 left-0 bg-gradient-to-t from-black/90 to-black/80 backdrop-blur-sm 
                  text-white py-5 md:py-6 px-6 md:px-8 transition-all duration-500 ease-in-out 
                  border-l-2 border-[#c4b19c] ${activeImage === "main" || screenSize.isMobile ? 
                  'w-full md:w-2/3 lg:w-1/2' : 'w-auto max-w-sm'}`}
              >
                <motion.div
                  variants={animations.text}
                  key={activeImage === "main" ? "main-active" : "main-inactive"}
                >
                  <h3 className="text-base md:text-lg lg:text-xl font-bold tracking-wide mb-3">
                    {interiorFeatures[0].title}
                  </h3>
                  {(activeImage === "main" || screenSize.isMobile) && (
                    <motion.div>
                      <motion.div 
                        className="w-12 h-0.5 bg-[#c4b19c] mb-3"
                        initial={{ width: 0 }}
                        animate={{ width: 48 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                      <motion.p 
                        variants={animations.fadeIn}
                        className="text-white/90 text-sm md:text-base max-w-xl leading-relaxed"
                      >
                        {interiorFeatures[0].description}
                      </motion.p>
                      
                      {/* Small CTA that only appears on main feature when active */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                        className="mt-4 hidden md:block"
                      >
                        <a 
                          href="#learn-more" 
                          className="inline-flex items-center text-xs text-[#c4b19c] font-medium group"
                        >
                          LEARN MORE
                          <ArrowRight
                            size={12}
                            className="ml-1 group-hover:ml-2 transition-all duration-300"
                          />
                        </a>
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              </div>
              
              {/* Enhanced premium gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none
                opacity-60 group-hover:opacity-40 transition-opacity duration-500`}></div>
              
              {/* Corner design elements - only visible on desktop */}
              <motion.div 
                className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-[#c4b19c]/30 hidden lg:block"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              />
              <motion.div 
                className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-[#c4b19c]/30 hidden lg:block"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              />
            </div>
          </motion.div>

          {/* Secondary features grid with enhanced spacing and layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {/* Map through the secondary features */}
            {interiorFeatures.slice(1).map((feature, index) => (
              <motion.div 
                key={feature.id}
                className="relative overflow-hidden rounded-lg shadow-lg group"
                variants={animations.item}
                onHoverStart={() => !screenSize.isMobile && !screenSize.isTablet && setActiveImage(feature.id)}
                onHoverEnd={() => !screenSize.isMobile && !screenSize.isTablet && setActiveImage(null)}
                onClick={() => handleImageInteraction(feature.id)}
              >
                <div className={`relative w-full ${getImageHeight('secondary')}`}>
                  <motion.div
                    className="w-full h-full"
                    variants={animations.image}
                    animate={activeImage === feature.id ? "hover" : "initial"}
                  >
                    <Image
                      src={feature.imageSrc}
                      alt={feature.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                      className="object-cover"
                      loading="eager"
                      quality={90}
                    />
                  </motion.div>
                  
                  {/* Enhanced feature label overlay */}
                  <div 
                    className={`absolute bottom-0 left-0 bg-gradient-to-t from-black/90 to-black/80 backdrop-blur-sm 
                      text-white py-4 md:py-5 px-5 md:px-6 transition-all duration-500 ease-in-out 
                      border-l-2 border-[#c4b19c] ${activeImage === feature.id || screenSize.isMobile ? 
                      'w-full' : 'w-auto max-w-md'}`}
                  >
                    <motion.div
                      variants={animations.text}
                      key={`${feature.id}-${activeImage === feature.id ? 'active' : 'inactive'}`}
                    >
                      <h3 className="text-sm md:text-base lg:text-lg font-bold tracking-wide mb-2">
                        {feature.title}
                      </h3>
                      {(activeImage === feature.id || screenSize.isMobile) && (
                        <motion.div>
                          <motion.div 
                            className="w-12 h-0.5 bg-[#c4b19c] mb-3"
                            initial={{ width: 0 }}
                            animate={{ width: 48 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          />
                          <motion.p 
                            variants={animations.fadeIn}
                            className="text-white/90 text-xs md:text-sm leading-relaxed"
                          >
                            {feature.description}
                          </motion.p>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                  
                  {/* Enhanced premium gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 
                    pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                  
                  {/* Small corner accent */}
                  <div className="absolute top-0 right-0 border-t-8 border-r-8 border-white/10 w-8 h-8"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced CTA button following design system button pattern */}
        <motion.div 
          className="mt-12 md:mt-16 lg:mt-20 text-center"
          variants={animations.cta}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <a
            href="#view-more-features"
            className="group inline-flex items-center justify-center px-10 py-4 bg-transparent 
              border border-[#8c735d] text-[#8c735d] font-medium hover:bg-[#8c735d] 
              hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
          >
            VIEW ALL FEATURES
            <ArrowRight
              size={16}
              className="ml-2 group-hover:ml-3 transition-all duration-300"
            />
          </a>
        </motion.div>
        
        {/* Small divider accent at the bottom */}
        <motion.div
          className="mt-20 md:mt-24 h-px w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-[#c4b19c]/30 to-transparent"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        />
      </div>
    </section>
  );
};

export default InteriorShowcase;