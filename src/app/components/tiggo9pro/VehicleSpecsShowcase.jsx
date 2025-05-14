'use client';

import { animate, motion, useInView } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

// Professional animated counter with clean animation
const AnimatedCounter = ({ value, duration = 2, suffix = '', decimal = false }) => {
  const counterRef = useRef(null);
  const inView = useInView(counterRef, { once: true, margin: "-20px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: duration,
        ease: [0.16, 1, 0.3, 1], // Custom easing for professional feel
        onUpdate: (latest) => {
          if (decimal) {
            setDisplayValue(latest.toFixed(1));
          } else {
            setDisplayValue(Math.round(latest).toString());
          }
        }
      });

      return () => controls.stop();
    }
  }, [inView, value, duration, decimal]);

  return (
    <span ref={counterRef} className="tabular-nums font-bold">
      {displayValue}{suffix}
    </span>
  );
};

const VehicleSpecsShowcase = ({
  imageSrc = "/images/tiggo9pro/power.jpg",
  imageAlt = "Chery Tiggo 9 Pro with couple",
  overtitle = "POWER",
  title = "MASSIVE POWER",
  description = "Experience breathtaking acceleration and responsive handling with our advanced powertrain technology.",
  specs = [
    {
      label: "Maximum power",
      value: 187,
      unit: "kW",
      decimal: false,
      duration: 2
    },
    {
      label: "Maximum output torque",
      value: 390,
      unit: "N·m",
      decimal: false,
      duration: 2.2
    },
    {
      label: "Maximum input torque",
      value: 470,
      unit: "N·m",
      decimal: false,
      duration: 2.4
    },
    {
      label: "0-100km acceleration",
      value: 8,
      unit: "s",
      decimal: true,
      duration: 1.5
    }
  ],
  primaryColor = "rgb(var(--color-primary-700, 239, 68, 68))",
  primaryLightColor = "rgb(var(--color-primary-light, 248, 180, 180))",
  className = ""
}) => {
  const containerRef = useRef(null);
  const titleSectionRef = useRef(null);
  const specsSectionRef = useRef(null);
  const [scrollState, setScrollState] = useState(0); // 0: initial, 1: title visible, 2: specs visible
  const [windowHeight, setWindowHeight] = useState(0);
  const [deviceType, setDeviceType] = useState('desktop');
  
  // Handle resize and set device type
  useEffect(() => {
    const checkDeviceSize = () => {
      setWindowHeight(window.innerHeight);
      
      if (window.innerWidth < 640) {
        setDeviceType('mobile');
      } else if (window.innerWidth < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };
    
    checkDeviceSize();
    
    // Throttled resize handler for better performance
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkDeviceSize, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);
  
  // Handle scroll and manage scroll state
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate progress based on how much of the container has been scrolled past
      // Normalize between 0 and 1
      const scrollProgress = Math.min(1, Math.max(0, (-containerRect.top) / (containerHeight - viewportHeight)));
      
      // Set scroll state based on scroll percentage
      if (scrollProgress < 0.3) {
        setScrollState(0);
      } else if (scrollProgress < 0.7) {
        setScrollState(1);
      } else {
        setScrollState(2);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [windowHeight]);
  
  // Title section animations
  const titleOpacity = scrollState >= 1 ? 1 : 0;
  const titleY = scrollState >= 1 ? 0 : 40;
  
  // Specs section animations
  const specsOpacity = scrollState >= 2 ? 1 : 0;
  const specsY = scrollState >= 2 ? 0 : 60;
  
  // Background image transformations
  const imageBlur = scrollState === 0 ? 0 : scrollState === 1 ? 1 : 2;
  const imageScale = 1.1 - scrollState * 0.05;
  const imageY = -scrollState * 40;
  
  // Section heights for proper scrolling
  const containerStyle = {
    height: deviceType === 'mobile' ? '320vh' : deviceType === 'tablet' ? '300vh' : '270vh'
  };

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={containerStyle}
    >
      {/* Sticky container for scrollable effect */}
      <div className="sticky top-0 left-0 w-full h-screen z-10 overflow-hidden">
        {/* Background image with parallax */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          animate={{ 
            y: imageY,
            scale: imageScale,
            filter: `blur(${imageBlur}px)`
          }}
          transition={{ 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            quality={95}
          />
          
          {/* Enhanced gradient overlays for dramatic lighting effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/30 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
          {/* Subtle vignette effect */}
          <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
        </motion.div>

        {/* Main content container */}
        <div className="relative h-full max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8 flex flex-col">
          {/* Title section */}
          <motion.div 
            ref={titleSectionRef}
            className="flex-1 flex flex-col justify-center items-center md:items-start md:justify-center md:ml-16 max-w-xl mx-auto md:mx-0"
            animate={{ 
              opacity: titleOpacity,
              y: titleY
            }}
            transition={{ 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1],
              staggerChildren: 0.1
            }}
          >
            {/* Subtle decorative element */}
            <motion.div
              className="w-12 h-0.5 bg-primary-light/40 mb-6 hidden md:block"
              initial={{ width: 0 }}
              animate={{ width: titleOpacity ? 48 : 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
            />
            
            <motion.p 
              className="text-sm md:text-base font-medium tracking-wider text-primary-light mb-3 md:mb-4 uppercase relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: titleOpacity, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="relative">
                {overtitle}
                <motion.span 
                  className="absolute -bottom-1 left-0 right-0 h-px bg-primary-light/30"
                  initial={{ width: 0 }}
                  animate={{ width: titleOpacity ? '100%' : 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                />
              </span>
            </motion.p>
            
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tighter text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: titleOpacity, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {title}
            </motion.h2>
            
            <motion.div 
              className="h-1.5 bg-gradient-to-r from-primary-600 to-primary-800 mt-4 md:mt-6 mb-6 md:mb-8 mx-auto md:mx-0 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: titleOpacity ? (deviceType === 'mobile' ? 80 : 140) : 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            />

            <motion.p
              className="text-base md:text-lg text-white/80 leading-relaxed text-center md:text-left font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: titleOpacity, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {description}
            </motion.p>
            
            {/* Decorative corner element */}
            <motion.div
              className="absolute -bottom-12 -right-12 w-24 h-24 border-r-2 border-b-2 border-primary-light/20 hidden lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: titleOpacity }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
          </motion.div>

          {/* Specifications panel */}
          <motion.div 
            ref={specsSectionRef}
            className="absolute bottom-0 left-0 right-0 w-full"
            animate={{ 
              opacity: specsOpacity,
              y: specsY
            }}
            transition={{ 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <div className="bg-gradient-to-b from-primary-900/90 to-black/95 backdrop-blur-md border-t border-primary-light/10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
              <div className="max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8 relative">
                {/* Subtle decorative element */}
                <motion.div 
                  className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-20 h-10 md:h-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: specsOpacity }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  
                </motion.div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-10 py-8 md:py-10 lg:py-12">
                  {specs.map((spec, index) => (
                    <motion.div
                      key={spec.label}
                      className="text-center md:text-left relative group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: specsOpacity, y: 0 }}
                      transition={{ 
                        duration: 0.5,
                        delay: 0.2 + (index * 0.1),
                        ease: "easeOut"
                      }}
                    >
                      <div className="text-xs sm:text-sm font-medium text-primary-light/90 mb-2 md:mb-3 tracking-wider uppercase relative inline-block">
                        {spec.label}
                        <motion.span 
                          className="absolute -bottom-1 left-0 right-0 h-px bg-primary-light/30"
                          initial={{ width: 0 }}
                          animate={{ width: specsOpacity ? '100%' : 0 }}
                          transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                        />
                      </div>
                      
                      <div className="flex items-baseline justify-center md:justify-start gap-1 md:gap-2">
                        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white">
                          {specsOpacity > 0.5 && (
                            <AnimatedCounter
                              value={spec.value}
                              duration={spec.duration || 2}
                              decimal={spec.decimal}
                            />
                          )}
                        </div>
                        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-primary-light/90">
                          {spec.unit}
                        </span>
                      </div>
                      
                      <motion.div 
                        className="h-0.5 bg-gradient-to-r from-primary-600 to-primary-800/50 mt-3 md:mt-4 mx-auto md:mx-0 rounded-full transition-all duration-300 group-hover:w-16"
                        initial={{ width: 0 }}
                        animate={{ width: specsOpacity ? 48 : 0 }}
                        transition={{ duration: 0.7, delay: 0.3 + (index * 0.1) }}
                      />
                      
                      {/* Subtle hover effect */}
                      <div className="absolute inset-0 bg-primary-800/0 group-hover:bg-primary-800/5 transition-all duration-300 rounded-lg -m-2 p-2 pointer-events-none" />
                    </motion.div>
                  ))}
                </div>
                
                {/* Optional bottom decorative element */}
                <div className="relative h-6 overflow-hidden">
                  <motion.div 
                    className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-light/20 to-transparent" 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: specsOpacity }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Empty spacer elements to create scroll room */}
      <div style={{height: "100vh"}}></div>
      <div style={{height: "100vh"}}></div>
      {deviceType === 'mobile' && <div style={{height: "100vh"}}></div>}
    </div>
  );
};

export default VehicleSpecsShowcase;