'use client';
import { animate, motion, useInView } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

// Refined animated counter component with smooth animation
const AnimatedCounter = React.memo(({ value, duration = 2, suffix = '', decimal = false }) => {
  const counterRef = useRef(null);
  const inView = useInView(counterRef, { once: true, margin: "-20px" });
  const [displayValue, setDisplayValue] = useState("0");

  // Only animate if the value is a number
  const isNumber = typeof value === 'number';

  useEffect(() => {
    if (!isNumber) {
      // If not a number, just set the value directly without animation
      setDisplayValue(value.toString());
      return;
    }

    if (inView) {
      const controls = animate(0, value, {
        duration: duration,
        ease: [0.16, 1, 0.3, 1], // Custom easing for refined feel
        onUpdate: (latest) => {
          setDisplayValue(decimal ? latest.toFixed(1) : Math.round(latest).toString());
        }
      });

      return () => controls.stop();
    }
  }, [inView, value, duration, decimal, isNumber]);

  return (
    <span ref={counterRef} className="tabular-nums font-bold">
      {displayValue}{suffix}
    </span>
  );
});

AnimatedCounter.displayName = 'AnimatedCounter';

const VehicleSpecsShowcase = ({ data, className = "" }) => {
  const {
    imageSrc,
    imageAlt,
    overtitle,
    title,
    description,
    specs
  } = data;
  
  const containerRef = useRef(null);
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
    
    // Debounced resize handler for better performance
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
  
  // Improved scroll handler with smoother transitions between states
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate progress based on how much of the container has been scrolled past
      const scrollProgress = Math.min(1, Math.max(0, (-containerRect.top) / (containerHeight - viewportHeight)));
      
      // Updated thresholds for smoother state transitions
      if (scrollProgress < 0.35) {
        setScrollState(0);
      } else if (scrollProgress < 0.65) {
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
  
  // Title section animations with improved timing
  // Fade out title when specs appear
  const titleOpacity = scrollState === 1 ? 1 : 0;
  const titleY = scrollState === 1 ? 0 : 40;
  
  // Specs section animations
  const specsOpacity = scrollState === 2 ? 1 : 0;
  const specsY = scrollState === 2 ? 0 : 60;
  
  // Background image transformations - reduced blur and better scaling
  const imageScale = scrollState === 0 ? 1.05 : scrollState === 1 ? 1.03 : 1;
  const imageY = -scrollState * 20; // Reduced movement for subtler parallax
  
  // Section heights for proper scrolling - adjusted for better pacing
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
          
          {/* Gradient overlay for better readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </motion.div>

        {/* Main content container */}
        <div className="relative h-full max-w-[95%] mx-auto px-4 md:px-6 lg:px-8 flex flex-col">
          {/* Title section */}
          <motion.div 
            className="flex-1 flex flex-col justify-center items-center md:items-start md:justify-center md:ml-16 max-w-xl mx-auto md:mx-0"
            animate={{ 
              opacity: titleOpacity,
              y: titleY
            }}
            transition={{ 
              duration: 0.6, 
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            {/* Decorative element with glow effect */}
            <motion.div
              className="w-12 h-0.5 bg-[#c4b19c] mb-6 hidden md:block shadow-md"
              initial={{ width: 0 }}
              animate={{ width: titleOpacity ? 48 : 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
            />
            
            <motion.p 
              className="text-sm md:text-base font-medium tracking-wider text-[#c4b19c] mb-3 md:mb-4 uppercase relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: titleOpacity, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="relative">
                {overtitle}
                <motion.span 
                  className="absolute -bottom-1 left-0 right-0 h-px bg-[#c4b19c]/50"
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
              className="h-1.5 bg-gradient-to-r from-[#8c735d] to-[#524336] mt-4 md:mt-6 mb-6 md:mb-8 mx-auto md:mx-0 rounded-full shadow-md"
              initial={{ width: 0 }}
              animate={{ width: titleOpacity ? (deviceType === 'mobile' ? 80 : 140) : 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            />

            <motion.p
              className="text-base md:text-lg text-white leading-relaxed text-center md:text-left font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: titleOpacity, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {description}
            </motion.p>
            
            {/* Corner element */}
            <motion.div
              className="absolute -bottom-12 -right-12 w-24 h-24 border-r-2 border-b-2 border-[#c4b19c]/30 hidden lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: titleOpacity }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
          </motion.div>

          {/* Specifications panel */}
          <motion.div 
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
            <div className="bg-gradient-to-b from-black/80 to-black/90 backdrop-blur-sm border-t border-[#c4b19c]/20 shadow-lg">
              <div className="max-w-[95%] mx-auto px-4 md:px-6 lg:px-8 relative">
                {/* Decorative element */}
                <motion.div 
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gradient-to-r from-transparent via-[#c4b19c]/40 to-transparent rounded-full"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: specsOpacity, width: 96 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12 py-10 md:py-12 lg:py-14">
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
                      <div className="text-xs sm:text-sm font-medium text-[#c4b19c] mb-2 md:mb-3 tracking-wider uppercase relative inline-block">
                        {spec.label}
                        <motion.span 
                          className="absolute -bottom-1 left-0 right-0 h-px bg-[#c4b19c]/50"
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
                        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-[#c4b19c]">
                          {spec.unit}
                        </span>
                      </div>
                      
                      <motion.div 
                        className="h-0.5 bg-gradient-to-r from-[#8c735d] to-[#524336]/50 mt-3 md:mt-4 mx-auto md:mx-0 rounded-full transition-all duration-300 group-hover:w-24"
                        initial={{ width: 0 }}
                        animate={{ width: specsOpacity ? 48 : 0 }}
                        transition={{ duration: 0.7, delay: 0.3 + (index * 0.1) }}
                      />
                      
                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-[#524336]/0 group-hover:bg-[#524336]/10 transition-all duration-300 rounded-lg -m-2 p-2 pointer-events-none" />
                    </motion.div>
                  ))}
                </div>
                
                {/* Bottom decorative element */}
                <div className="relative h-6 overflow-hidden">
                  <motion.div 
                    className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#c4b19c]/30 to-transparent" 
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