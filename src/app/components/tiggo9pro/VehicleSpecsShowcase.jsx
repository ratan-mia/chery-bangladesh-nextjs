'use client';

import { animate, motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

// Professional animated counter with clean animation
const AnimatedCounter = ({ value, duration = 2, suffix = '', decimal = false }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
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
    <span ref={ref} className="tabular-nums font-bold">
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
  const [isMobile, setIsMobile] = useState(false);
  
  // Check for mobile/tablet devices to adjust animations
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Enhanced scroll-based animations with refined parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Responsive animation adjustments
  // Adjust scroll positions based on viewport size
  const scrollFactorTitle = isMobile ? [0.05, 0.2, 0.65, 0.8] : [0.1, 0.25, 0.7, 0.9];
  const scrollFactorSpecs = isMobile ? [0.25, 0.35, 0.75, 0.85] : [0.3, 0.45, 0.85, 0.95];
  
  // First content block - Title and description
  const contentOpacity = useTransform(
    scrollYProgress, 
    scrollFactorTitle, 
    [0, 1, 1, 0]
  );
  const contentY = useTransform(
    scrollYProgress, 
    scrollFactorTitle, 
    [60, 0, 0, -30]
  );
  
  // Second content block - Specifications panel
  const specsOpacity = useTransform(
    scrollYProgress, 
    scrollFactorSpecs, 
    [0, 1, 1, 0]
  );
  const specsY = useTransform(
    scrollYProgress, 
    scrollFactorSpecs, 
    [50, 0, 0, -20]
  );
  
  // Enhanced image parallax effects for depth
  // Reduced motion on mobile for better performance
  const imageY = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, isMobile ? -60 : -120]
  );
  const imageScale = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    [1.05, 1.025, 1]
  );
  const imageBlur = useTransform(
    scrollYProgress,
    [0.8, 1],
    [0, isMobile ? 1 : 3]
  );
  
  // Line animation with eased timing
  const lineWidth = useTransform(
    scrollYProgress, 
    [0.15, 0.3], 
    [0, isMobile ? 80 : 120]
  );

  return (
    <section 
      ref={containerRef} 
      className={`relative w-full overflow-hidden bg-stone-900 ${className}`}
      style={{
        height: isMobile ? 'calc(130vh)' : 'calc(120vh)'
      }}
    >
      {/* Main container with enhanced parallax */}
      <div className="relative h-full">
        {/* Vehicle image with advanced parallax */}
        <motion.div 
          className="absolute inset-0"
          style={{ 
            y: imageY, 
            scale: imageScale,
            filter: `blur(${imageBlur}px)`,
            transition: 'filter 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
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
          
          {/* Responsive gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        </motion.div>

        {/* First content block - Title area with responsive layout */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ 
            opacity: contentOpacity
          }}
        >
          <div className="relative h-full max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8">
            <motion.div 
              className="absolute left-0 right-0 md:left-8 lg:left-16 top-1/4 max-w-xl mx-auto md:mx-0 text-center md:text-left px-4 md:px-0"
              style={{ 
                y: contentY
              }}
            >
              {/* Responsive typography */}
              <motion.p 
                className="text-sm md:text-base font-medium tracking-wider text-primary-light mb-3 md:mb-4 uppercase"
              >
                {overtitle}
              </motion.p>
              
              <motion.h2 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tighter"
              >
                {title}
              </motion.h2>
              
              {/* Centered line on mobile, left-aligned on desktop */}
              <motion.div 
                className="h-1 bg-primary-700 mt-4 md:mt-6 mb-4 md:mb-6 mx-auto md:mx-0"
                style={{ width: lineWidth }}
              />

              {/* Responsive description - visible on all devices */}
              <motion.p
                className="text-base md:text-lg text-white/90 leading-relaxed"
              >
                {description}
              </motion.p>

              {/* Centered button on mobile */}
              <motion.div className="mt-6 md:mt-8">
                <a
                  href="#explore-performance"
                  className="group inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-primary-700 text-white text-sm md:text-base font-medium hover:bg-primary-800 transition-all duration-300"
                >
                  Explore Performance
                  <ChevronRight 
                    size={isMobile ? 16 : 20}
                    className="ml-2 group-hover:ml-3 transition-all duration-300"
                  />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Specifications - responsive grid */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0"
          style={{
            y: specsY,
            opacity: specsOpacity
          }}
        >
          <div className="bg-primary-900/80 backdrop-blur-md border-t border-primary-light/10">
            <div className="max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8">
              {/* 2 columns on mobile, 4 on desktop */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 py-6 md:py-8 lg:py-10">
                {specs.map((spec, index) => (
                  <motion.div
                    key={spec.label}
                    className="text-center md:text-left relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    {/* Responsive typography */}
                    <div className="text-xs sm:text-sm font-medium text-primary-light/90 mb-1 md:mb-2 tracking-wider uppercase">
                      {spec.label}
                    </div>
                    
                    {/* Adjusted font sizes for readability */}
                    <div className="flex items-baseline justify-center md:justify-start gap-1">
                      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white">
                        <AnimatedCounter
                          value={spec.value}
                          duration={spec.duration || 2}
                          decimal={spec.decimal}
                        />
                      </div>
                      <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-primary-light/90">
                        {spec.unit}
                      </span>
                    </div>
                    
                    {/* Center on mobile, left on desktop */}
                    <div className="h-0.5 w-12 bg-primary-700/50 mt-2 md:mt-3 mx-auto md:mx-0" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VehicleSpecsShowcase;