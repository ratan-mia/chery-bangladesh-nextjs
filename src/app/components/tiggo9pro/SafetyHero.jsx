'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

/**
 * SafetyHero Component
 * A full-width hero section highlighting Chery's commitment to safety
 * Following the Chery Bangladesh design system guidelines
 */
const SafetyHero = () => {
  const [isInView, setIsInView] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [isMounted, setIsMounted] = useState(false);
  const componentRef = useRef(null);

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
  }, []);

  // Track when component comes into view
  useEffect(() => {
    if (!isMounted) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (componentRef.current) {
      observer.observe(componentRef.current);
    }
    
    // Listen for window resize events
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [isMounted]);

  // Container variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Text animation variants with refined easing
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Divider animation
  const dividerVariants = {
    hidden: { width: 0 },
    visible: { 
      width: '120px', 
      transition: { 
        duration: 0.8, 
        delay: 0.2, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  // Subtle parallax effect for background image
  const parallaxVariants = {
    initial: { scale: 1.05 },
    animate: { 
      scale: 1,
      transition: {
        duration: 10,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Subtle floating particle animation
  const particleVariants = {
    float: (i) => ({
      y: [0, -100, -200, -300, -400],
      opacity: [0, 0.4, 0.6, 0.4, 0],
      scale: [0.5, 1, 1.2, 1, 0.5],
      transition: {
        duration: 8 + Math.random() * 10,
        repeat: Infinity,
        delay: i * 0.5,
        ease: "linear"
      }
    })
  };

  // Scroll prompt animation
  const scrollPromptVariants = {
    animate: {
      y: [0, 10, 0],
      opacity: [0.6, 1, 0.6],
      transition: {
        y: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        },
        opacity: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        }
      }
    }
  };

  return (
    <section 
      ref={componentRef}
      className="w-full h-[90vh] md:h-screen min-h-[650px] max-h-[1080px] relative overflow-hidden"
      id="safety-hero"
    >
      {/* Background image with parallax effect */}
      <div className="absolute inset-0 w-full h-full">
        {isMounted ? (
          <motion.div
            className="w-full h-full"
            variants={parallaxVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
          >
            <Image
              src="/images/tiggo9pro/chery-safety-family.jpg" 
              alt="Family enjoying a picnic by the lake with their Chery SUV"
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
              className="object-cover object-center"
              quality={95}
            />
          </motion.div>
        ) : (
          <div className="w-full h-full">
            <Image
              src="/images/tiggo9pro/chery-safety-family.jpg" 
              alt="Family enjoying a picnic by the lake with their Chery SUV"
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
              className="object-cover object-center"
              quality={95}
            />
          </div>
        )}
        {/* Enhanced gradient overlay for better text visibility across breakpoints */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent md:from-black/70 md:via-black/30 md:to-transparent pointer-events-none"></div>
      </div>

      {/* Content container */}
      <div className="relative h-full w-full flex flex-col justify-end">
        <motion.div 
          className="w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Accent label with premium styling - responsive adjustments */}
          <motion.div
            className="mb-3 sm:mb-4 inline-block"
            variants={textVariants}
          >
            <span className="text-white text-xs sm:text-sm md:text-base font-medium tracking-wider uppercase px-3 py-1.5 sm:px-6 sm:py-2 bg-primary-900/60 backdrop-blur-sm border-l-2 border-primary-light">
              SAFETY
            </span>
          </motion.div>
          
          {/* Main heading with brand colors - responsive typography */}
          <div className="overflow-hidden">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight tracking-tighter"
              variants={textVariants}
            >
              <span className="text-white block sm:inline md:block lg:inline">SAFETY IS A </span>
              <span className="text-primary-light block sm:inline md:block lg:inline">CORE VALUE </span>
              <span className="text-white block sm:inline md:block lg:inline">AT CHERY.</span>
            </motion.h1>
          </div>

          {/* Divider with brand color */}
          <motion.div
            className="h-0.5 bg-primary-700 mb-4 sm:mb-6 md:mb-8"
            variants={dividerVariants}
            style={{ maxWidth: "120px" }}
          />
          
          {/* Description text with improved typography and responsive width */}
          <motion.p
            className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl leading-relaxed mb-6 md:mb-8"
            variants={textVariants}
          >
            EACH JOURNEY IS NOT JUST ABOUT GETTING TO A DESTINATION, BUT ALSO ABOUT 
            A SENSE OF SAFETY FOR OUR LOVED ONES. EVERY STEP REFLECTS OUR DEDICATION 
            TO CREATING A REASSURING VEHICLE AND PROVIDING USERS WITH THE STRONGEST 
            MOBILE GUARD.
          </motion.p>
          
          {/* Call to action buttons - primary and secondary */}
          {/* <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-2 sm:mt-4"
            variants={textVariants}
          >
            <a 
              href="#explore-safety" 
              className="group inline-flex items-center justify-center sm:justify-start px-6 sm:px-10 py-3 sm:py-4 bg-primary-700 text-white text-sm sm:text-base font-medium hover:bg-primary-900 transition-all duration-300"
            >
              EXPLORE SAFETY FEATURES
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 sm:h-5 sm:w-5 ml-2 group-hover:ml-3 transition-all duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a 
              href="#find-dealership" 
              className="inline-flex items-center justify-center sm:justify-start px-6 sm:px-10 py-3 sm:py-4 bg-transparent border border-primary-700 text-white text-sm sm:text-base font-medium hover:border-primary-light transition-all duration-300"
            >
              FIND DEALERSHIP
            </a>
          </motion.div> */}
          
          {/* Safety features badge - mobile only */}
          <motion.div 
            className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 border-l border-primary-light rounded-r-sm hidden sm:block lg:hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <div className="text-white text-xs tracking-wider">
              <span className="text-primary-light font-medium">5★</span> SAFETY
            </div>
          </motion.div>
          
          {/* Floating particles with enhanced effect - more on larger screens */}
          {isMounted && (
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
              {[...Array(windowWidth < 640 ? 6 : windowWidth < 1024 ? 10 : 15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-primary-light/20 backdrop-blur-sm"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: windowWidth < 640 ? `${Math.random() * 4 + 2}px` : `${Math.random() * 8 + 4}px`,
                    height: windowWidth < 640 ? `${Math.random() * 4 + 2}px` : `${Math.random() * 8 + 4}px`,
                  }}
                  custom={i}
                  animate="float"
                  variants={particleVariants}
                />
              ))}
            </div>
          )}
          
          {/* Bottom corner decoration with premium brand touch - responsive adjustments */}
          <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 lg:bottom-12 lg:right-12 hidden sm:block">
            <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-r-2 border-b-2 border-primary-light/40"></div>
            <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-primary-700/30 backdrop-blur-sm absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          {/* Scroll indicator at bottom center - desktop only */}
          {/* <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center"
            variants={scrollPromptVariants}
            animate="animate"
          >
            <div className="text-white/80 text-xs mb-2 uppercase tracking-widest">Scroll</div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-primary-light" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div> */}
        </motion.div>
      </div>

      {/* Accessibility features */}
      <div className="sr-only">
        <h1>SAFETY IS A CORE VALUE AT CHERY</h1>
        <p>Learn about Chery's commitment to safety features and design</p>
      </div>
    </section>
  );
};

export default SafetyHero;