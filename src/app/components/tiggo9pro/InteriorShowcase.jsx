'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const InteriorShowcase = () => {
  const [activeImage, setActiveImage] = useState(null);
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    isMobile: false,
    isTablet: false
  });
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  
  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        width,
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024
      });
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Intersection observer to trigger animations when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
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

  // Updated features data with more detailed descriptions
  const features = [
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

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const imageVariants = {
    hover: { 
      scale: 1.05, 
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } 
    },
    initial: { 
      scale: 1, 
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } 
    }
  };
  
  const textVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.4, 
        ease: [0.25, 0.1, 0.25, 1] 
      } 
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Handle image interactions
  const handleImageInteraction = (id) => {
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
      if (screenSize.isMobile) return 'h-48';
      if (screenSize.isTablet) return 'h-64';
      return 'h-80';
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-stone-100 overflow-hidden py-8 sm:py-12 md:py-16 lg:py-20"
    >
      <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section with improved responsive adjustments */}
        <motion.div 
          className="mb-6 sm:mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-xs sm:text-sm text-primary-700 font-medium uppercase mb-1 sm:mb-2 tracking-wider">
            LUXURIOUS DESIGN
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-primary-900 leading-tight tracking-tighter">
            EXTRA-WIDE<br className="md:block hidden" /> SURROUNDING CABIN
          </h2>
          {/* Section divider with responsive width */}
          <div className="w-16 sm:w-20 lg:w-24 h-1 bg-primary-700 mt-4 sm:mt-5 lg:mt-6 mb-5 sm:mb-6 lg:mb-8"></div>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl">
            Every detail of our interior showcases premium craftsmanship and attention to detail, 
            creating a sophisticated driving environment designed for your comfort.
          </p>
        </motion.div>

        {/* Main content container with improved responsive layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-2 sm:space-y-3 lg:space-y-4"
        >
          {/* Main image section with adaptive height */}
          <motion.div 
            className="relative mb-2 sm:mb-3 lg:mb-4 overflow-hidden rounded-sm group"
            variants={itemVariants}
            onHoverStart={() => !screenSize.isMobile && !screenSize.isTablet && setActiveImage("main")}
            onHoverEnd={() => !screenSize.isMobile && !screenSize.isTablet && setActiveImage(null)}
            onClick={() => handleImageInteraction("main")}
          >
            <div className={`relative w-full ${getImageHeight('main')}`}>
              <motion.div
                className="w-full h-full"
                variants={imageVariants}
                animate={activeImage === "main" ? "hover" : "initial"}
              >
                <Image
                  src={features[0].imageSrc}
                  alt={features[0].alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
                  className="object-cover"
                  priority
                  quality={90}
                />
              </motion.div>
              
              {/* Enhanced feature label overlay with better responsiveness */}
              <div className={`absolute bottom-0 left-0 bg-black/70 backdrop-blur-sm text-white py-2 sm:py-3 px-3 sm:px-4 lg:px-5 
                ${activeImage === "main" || screenSize.isMobile ? 'w-full' : 'w-auto'}`}>
                <motion.div
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  key={activeImage === "main" ? "main-active" : "main-inactive"}
                >
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-wide mb-1">
                    {features[0].title}
                  </h3>
                  {(activeImage === "main" || screenSize.isMobile) && (
                    <motion.p 
                      variants={fadeInVariants}
                      className="text-white/90 text-xs sm:text-sm md:text-base max-w-xl"
                    >
                      {features[0].description}
                    </motion.p>
                  )}
                </motion.div>
              </div>
              
              {/* Gradient overlay with increased visibility on mobile */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15 pointer-events-none
                ${screenSize.isMobile ? 'opacity-80' : 'opacity-60'}`}></div>
            </div>
          </motion.div>

          {/* Responsive grid layout for bottom features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
            {/* Map through the remaining features */}
            {features.slice(1).map((feature, index) => (
              <motion.div 
                key={feature.id}
                className="relative overflow-hidden rounded-sm group"
                variants={itemVariants}
                onHoverStart={() => !screenSize.isMobile && !screenSize.isTablet && setActiveImage(feature.id)}
                onHoverEnd={() => !screenSize.isMobile && !screenSize.isTablet && setActiveImage(null)}
                onClick={() => handleImageInteraction(feature.id)}
              >
                <div className={`relative w-full ${getImageHeight('secondary')}`}>
                  <motion.div
                    className="w-full h-full"
                    variants={imageVariants}
                    animate={activeImage === feature.id ? "hover" : "initial"}
                  >
                    <Image
                      src={feature.imageSrc}
                      alt={feature.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                      className="object-cover"
                      loading="eager"
                      quality={85}
                    />
                  </motion.div>
                  
                  {/* Improved responsive label overlay */}
                  <div className={`absolute bottom-0 left-0 bg-black/70 backdrop-blur-sm text-white py-2 sm:py-3 px-3 sm:px-4 
                    ${activeImage === feature.id || screenSize.isMobile ? 'w-full' : 'w-auto'}`}>
                    <motion.div
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      key={`${feature.id}-${activeImage === feature.id ? 'active' : 'inactive'}`}
                    >
                      <h3 className="text-sm sm:text-base md:text-lg font-bold tracking-wide mb-1">
                        {feature.title}
                      </h3>
                      {(activeImage === feature.id || screenSize.isMobile) && (
                        <motion.p 
                          variants={fadeInVariants}
                          className="text-white/90 text-xs sm:text-sm"
                        >
                          {feature.description}
                        </motion.p>
                      )}
                    </motion.div>
                  </div>
                  
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15 pointer-events-none
                    ${screenSize.isMobile ? 'opacity-80' : 'opacity-60'}`}></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Improved CTA button with better responsive styling */}
        <motion.div 
          className="mt-6 sm:mt-8 lg:mt-12 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a
            href="#view-more-features"
            className="group inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-medium text-primary-700 hover:text-white border border-primary-700 hover:bg-primary-700 rounded transition-all duration-300 tracking-wider uppercase"
          >
            VIEW ALL FEATURES
            <ArrowRight
              size={16}
              className="ml-2 group-hover:translate-x-1 transition-all duration-300"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InteriorShowcase;