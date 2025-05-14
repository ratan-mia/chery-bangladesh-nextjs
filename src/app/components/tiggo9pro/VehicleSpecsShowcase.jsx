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
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      
      if (window.innerWidth < 640) {
        setDeviceType('mobile');
      } else if (window.innerWidth < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
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
  const imageBlur = scrollState === 0 ? 0 : scrollState === 1 ? 1 : 3;
  const imageScale = 1.1 - scrollState * 0.05;
  const imageY = -scrollState * 40;
  
  // Section heights for proper scrolling
  const containerStyle = {
    height: deviceType === 'mobile' ? '300vh' : deviceType === 'tablet' ? '280vh' : '250vh'
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
          
          {/* Enhanced gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
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
            <motion.p 
              className="text-sm md:text-base font-medium tracking-wider text-primary-light mb-3 md:mb-4 uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: titleOpacity, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {overtitle}
            </motion.p>
            
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tighter text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: titleOpacity, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {title}
            </motion.h2>
            
            <motion.div 
              className="h-1 bg-primary-700 mt-4 md:mt-6 mb-4 md:mb-6 mx-auto md:mx-0"
              initial={{ width: 0 }}
              animate={{ width: titleOpacity ? (deviceType === 'mobile' ? 80 : 120) : 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            />

            <motion.p
              className="text-base md:text-lg text-white/90 leading-relaxed text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: titleOpacity, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {description}
            </motion.p>
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
            <div className="bg-primary-900/80 backdrop-blur-md">
              <div className="max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 py-6 md:py-8 lg:py-10">
                  {specs.map((spec, index) => (
                    <motion.div
                      key={spec.label}
                      className="text-center md:text-left relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: specsOpacity, y: 0 }}
                      transition={{ 
                        duration: 0.5,
                        delay: 0.2 + (index * 0.1),
                        ease: "easeOut"
                      }}
                    >
                      <div className="text-xs sm:text-sm font-medium text-primary-light/90 mb-1 md:mb-2 tracking-wider uppercase">
                        {spec.label}
                      </div>
                      
                      <div className="flex items-baseline justify-center md:justify-start gap-1">
                        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white">
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
                        className="h-0.5 w-12 bg-primary-700/50 mt-2 md:mt-3 mx-auto md:mx-0"
                        initial={{ width: 0 }}
                        animate={{ width: specsOpacity ? 48 : 0 }}
                        transition={{ duration: 0.7, delay: 0.3 + (index * 0.1) }}
                      />
                    </motion.div>
                  ))}
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