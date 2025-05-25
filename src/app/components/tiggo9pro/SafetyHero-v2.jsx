'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/**
 * SafetyHero Component - Enhanced Design with Tiggo 9 Pro Safety Features
 * A premium full-width hero section with improved layout and visual hierarchy
 * Following Chery Bangladesh Design System Guidelines
 */
const SafetyHero = () => {
  const [isInView, setIsInView] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [isMounted, setIsMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const componentRef = useRef(null);

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
  }, []);

  // Track mouse movement for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
        duration: 1,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const slideUpVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const slideInFromLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const slideInFromRight = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Enhanced parallax effect
  const parallaxVariants = {
    initial: { scale: 1.1, x: 0, y: 0 },
    animate: { 
      scale: 1,
      x: isMounted ? (mousePosition.x - 50) * 0.02 : 0,
      y: isMounted ? (mousePosition.y - 50) * 0.02 : 0,
      transition: {
        scale: { duration: 12, ease: [0.16, 1, 0.3, 1] },
        x: { duration: 2, ease: "easeOut" },
        y: { duration: 2, ease: "easeOut" }
      }
    }
  };

  // Floating elements animation
  const floatingVariants = {
    float: (i) => ({
      y: [0, -30, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4 + (i * 0.5),
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.2
      }
    })
  };

  return (
    <section 
      ref={componentRef}
      className="w-full h-screen min-h-[700px] max-h-[1200px] relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black"
      id="safety-hero"
      style={{
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      {/* Enhanced background with multiple layers */}
      <div className="absolute inset-0 w-full h-full">
        {/* Main background image */}
        {isMounted ? (
          <motion.div
            className="w-full h-full"
            variants={parallaxVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
          >
            <Image
              src="/images/tiggo9pro/chery-safety-family.jpg" 
              alt="Family enjoying a picnic by the lake with their Chery Tiggo 9 Pro SUV"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
              quality={95}
            />
          </motion.div>
        ) : (
          <div className="w-full h-full">
            <Image
              src="/images/tiggo9pro/chery-safety-family.jpg" 
              alt="Family enjoying a picnic by the lake with their Chery Tiggo 9 Pro SUV"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
              quality={95}
            />
          </div>
        )}
        
        {/* Enhanced gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"></div>
        
        {/* Animated mesh gradient overlay */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 3 }}
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(196, 177, 156, 0.15) 0%, transparent 50%)`
          }}
        />
      </div>

      {/* Geometric background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large decorative circles */}
        <motion.div 
          className="absolute -top-32 -right-32 w-96 h-96 border border-white/10"
          style={{ borderRadius: '50%' }}
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div 
          className="absolute -bottom-24 -left-24 w-64 h-64 border border-white/5"
          style={{ borderRadius: '50%' }}
          animate={{ 
            rotate: -360,
            scale: [1, 0.9, 1]
          }}
          transition={{ 
            rotate: { duration: 45, repeat: Infinity, ease: "linear" },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px'
             }}
        />
      </div>

      {/* Main content grid */}
      <div className="relative h-full w-full">
        <div className="max-w-full mx-auto h-full px-6 sm:px-8 lg:px-12 xl:px-20 2xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 h-full items-end lg:items-center gap-8">
            
            {/* Left Column - Main Content */}
            <motion.div 
              className="lg:col-span-7 xl:col-span-6 pb-16 lg:pb-0"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {/* Badge */}
              <motion.div
                className="mb-6"
                variants={slideInFromLeft}
              >
                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3">
                  <div className="w-2 h-2 bg-primary-light animate-pulse" style={{ borderRadius: '50%' }}></div>
                  <span className="text-white text-sm font-medium tracking-wider uppercase">
                    Tiggo 9 Pro Safety Excellence
                  </span>
                </div>
              </motion.div>
              
              {/* Main Heading */}
              <motion.div variants={slideUpVariants} className="mb-8">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none tracking-tight">
                  <span className="block text-white mb-2">GLOBAL</span>
                  <span className="block bg-gradient-to-r from-primary-light via-primary-800 to-primary-700 bg-clip-text text-primary mb-2">
                    FIVE-STAR
                  </span>
                  <span className="block text-white">SECURITY</span>
                </h1>
              </motion.div>

              {/* Enhanced Description */}
              <motion.div variants={slideUpVariants} className="mb-10">
                <p className="text-white/90 text-lg md:text-xl lg:text-2xl max-w-2xl leading-relaxed font-normal">
                  Experience ultimate peace of mind with Tiggo 9 Pro's comprehensive safety architecture,
                  featuring <span className="text-primary-light font-medium">advanced steel construction</span>, 
                  <span className="text-primary-light font-medium"> intelligent airbag systems</span>, and 
                  <span className="text-primary-light font-medium"> cutting-edge ADAS technology</span>.
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                variants={slideUpVariants}
                className="flex flex-col sm:flex-row gap-4 mb-8"
              >
                <motion.button
                  className="group relative overflow-hidden bg-gradient-to-r from-primary-700 to-primary-900 hover:from-primary-900 hover:to-primary-900 text-white px-8 py-4 font-medium transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Safety Features
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </motion.button>
                
                <motion.button
                  className="group border-2 border-white/30 hover:border-primary-light text-white px-8 py-4 font-medium transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Schedule Test Drive
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Column - Safety Stats */}
            <motion.div 
              className="lg:col-span-5 xl:col-span-6 pb-16 lg:pb-0"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                
                {/* Safety Stat Cards */}
                <motion.div 
                  variants={scaleInVariants}
                  custom={0}
                  className="group"
                >
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-500">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-white">85%</div>
                        <div className="text-primary-light text-sm font-medium">High-Strength Steel</div>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm">Advanced steel construction for maximum structural integrity and crash protection.</p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={scaleInVariants}
                  custom={1}
                  className="group"
                >
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-500">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-800 to-primary-900 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-white">10</div>
                        <div className="text-primary-light text-sm font-medium">Safety Airbags</div>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm">Comprehensive airbag system including far-end airbags and side curtains.</p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={scaleInVariants}
                  custom={2}
                  className="group sm:col-span-2 lg:col-span-1 xl:col-span-2"
                >
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-500">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-white">19</div>
                        <div className="text-primary-light text-sm font-medium">ADAS Functions</div>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm">Advanced Driver Assistance Systems including lane keeping, adaptive cruise control, and automatic emergency braking.</p>
                  </div>
                </motion.div>
              </div>

              {/* Additional Tech Highlight */}
              <motion.div 
                variants={slideInFromRight}
                className="mt-8 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 p-6"
              >
                <h3 className="text-white font-medium text-lg mb-3">Bosch Technology Integration</h3>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary-light" style={{ borderRadius: '50%' }}></div>
                    <span>IPB drive-by-wire braking system</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary-light" style={{ borderRadius: '50%' }}></div>
                    <span>2060mm traverse side air curtains</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary-light" style={{ borderRadius: '50%' }}></div>
                    <span>140mm front anti-collision beam</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced floating particles */}
      {isMounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              custom={i}
              animate="float"
              variants={floatingVariants}
            >
              <div 
                className="w-2 h-2 bg-primary-light/30 blur-sm"
                style={{
                  filter: `blur(${Math.random() * 2}px)`,
                  borderRadius: '50%'
                }}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
      
      {/* Corner accent */}
      <motion.div 
        className="absolute bottom-8 right-8 hidden lg:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <div className="w-16 h-16 border-r-2 border-b-2 border-primary-light/50 relative">
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary-light/80" style={{ borderRadius: '50%' }}></div>
        </div>
      </motion.div>

      {/* Enhanced accessibility */}
      <div className="sr-only">
        <h1>Tiggo 9 Pro - Global Five-Star Security Standard</h1>
        <p>Experience advanced safety with 85% high-strength steel construction, 10 comprehensive airbags, and 19 intelligent ADAS functions for ultimate family protection.</p>
      </div>
    </section>
  );
};

export default SafetyHero;