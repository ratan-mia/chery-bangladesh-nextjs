'use client';

import { useInView } from 'framer-motion';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';

// Optimized animated counter component with spring physics
const AnimatedCounter = React.memo(({ value, suffix = '', decimal = false }) => {
  const counterRef = useRef(null);
  const inView = useInView(counterRef, { once: true, threshold: 0.1 });
  const [displayValue, setDisplayValue] = useState("0");
  
  // Spring animation constants for natural-feeling motion
  const springConfig = {
    stiffness: 100,
    damping: 20,
    precision: 0.01
  };

  // Using useCallback to optimize performance
  const animateValue = useCallback(() => {
    if (!inView) return;
    
    let currentVal = 0;
    let velocity = 0;
    let lastTime = performance.now();
    let rafId;
    
    const updateSpring = (time) => {
      const elapsed = time - lastTime;
      lastTime = time;
      
      // Spring physics calculation
      const spring = (value - currentVal) * springConfig.stiffness;
      const damper = velocity * springConfig.damping;
      const acceleration = spring - damper;
      
      velocity += acceleration * (elapsed / 1000);
      currentVal += velocity * (elapsed / 1000);
      
      // Format and set the display value
      setDisplayValue(decimal ? currentVal.toFixed(1) : Math.round(currentVal).toString());
      
      // Continue animation until close enough to target value
      if (Math.abs(value - currentVal) > springConfig.precision || Math.abs(velocity) > springConfig.precision) {
        rafId = requestAnimationFrame(updateSpring);
      } else {
        setDisplayValue(decimal ? value.toFixed(1) : value.toString());
      }
    };
    
    rafId = requestAnimationFrame(updateSpring);
    return () => cancelAnimationFrame(rafId);
  }, [inView, value, decimal, springConfig.stiffness, springConfig.damping, springConfig.precision]);
  
  useEffect(() => {
    const cleanup = animateValue();
    return cleanup;
  }, [animateValue]);

  return (
    <span ref={counterRef} className="tabular-nums font-bold">
      {displayValue}{suffix}
    </span>
  );
});

AnimatedCounter.displayName = 'AnimatedCounter';

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
      decimal: false
    },
    {
      label: "Maximum output torque",
      value: 390,
      unit: "N·m",
      decimal: false
    },
    {
      label: "Maximum input torque",
      value: 470,
      unit: "N·m",
      decimal: false
    },
    {
      label: "0-100km acceleration",
      value: 8,
      unit: "s",
      decimal: true
    }
  ],
  className = "",
  sectionHeight = "h-[250vh]",
  accentColor = "#c4b19c",
  gradientFrom = "#8c735d",
  gradientTo = "#524336"
}) => {
  const containerRef = useRef(null);
  const titleSectionRef = useRef(null);
  const specsSectionRef = useRef(null);

  // Using threshold options for more precise scroll animations
  const titleInView = useInView(titleSectionRef, { 
    amount: 0.6,
    once: false
  });
  
  const specsInView = useInView(specsSectionRef, { 
    amount: 0.3,
    once: false
  });

  // Dynamic styles based on props for better reusability
  const accentColorStyle = { color: accentColor };
  const accentBgStyle = { backgroundColor: accentColor };
  const accentBorderStyle = { borderColor: `${accentColor}30` };
  const gradientStyle = { backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo}50)` };

  return (
    <div 
      ref={containerRef}
      className={`relative ${sectionHeight} ${className}`}
      data-testid="vehicle-specs-showcase"
    >
      {/* Sticky container for scrollable effect */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {/* Background image with parallax effect */}
        <div className={`absolute inset-0 w-full h-full transform transition-transform duration-700 ease-out
          ${titleInView ? 'scale-[1.03] -translate-y-5' : ''} 
          ${specsInView ? 'scale-100 -translate-y-10' : 'scale-105'}`}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            quality={90}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Main content container */}
        <div className="relative h-full max-w-[95%] mx-auto px-4 md:px-6 lg:px-8 flex flex-col">
          {/* Title section */}
          <div 
            ref={titleSectionRef}
            className={`flex-1 flex flex-col justify-center items-center md:items-start md:ml-16 max-w-xl mx-auto md:mx-0
              transform transition-all duration-500 ease-out
              ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              ${specsInView ? 'opacity-0' : ''}`}
          >
            {/* Decorative element */}
            <div 
              className={`w-0 h-0.5 mb-6 hidden md:block shadow-md transition-all duration-700
                ${titleInView ? 'w-12' : ''}`}
              style={accentBgStyle}
            />
            
            <p className="text-sm md:text-base font-medium tracking-wider mb-3 md:mb-4 uppercase relative
              transition-all duration-500 delay-100"
              style={accentColorStyle}>
              <span className="relative">
                {overtitle}
                <span 
                  className={`absolute -bottom-1 left-0 right-0 h-px transition-all duration-500
                    ${titleInView ? 'w-full' : 'w-0'}`}
                  style={{ backgroundColor: `${accentColor}50` }}
                />
              </span>
            </p>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tighter text-center md:text-left
              transition-all duration-500 delay-200">
              {title}
            </h2>
            
            <div 
              className={`h-1.5 mt-4 md:mt-6 mb-6 md:mb-8 mx-auto md:mx-0 rounded-full shadow-md
                transition-all duration-700 delay-300
                ${titleInView ? 'w-20 md:w-36' : 'w-0'}`}
              style={gradientStyle}
            />

            <p className="text-base md:text-lg text-white/90 leading-relaxed text-center md:text-left font-light
              transition-all duration-500 delay-400">
              {description}
            </p>
            
            {/* Corner element */}
            <div 
              className={`absolute -bottom-12 -right-12 w-24 h-24 border-r-2 border-b-2 hidden lg:block
                transition-opacity duration-500 delay-500
                ${titleInView ? 'opacity-100' : 'opacity-0'}`}
              style={accentBorderStyle}
            />
          </div>

          {/* Specifications panel */}
          <div 
            ref={specsSectionRef}
            className={`absolute bottom-0 left-0 right-0 w-full
              transform transition-all duration-800 ease-out
              ${specsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
          >
            <div className="bg-gradient-to-b from-black/80 to-black/90 backdrop-blur-sm shadow-lg border-t border-t-white/10">
              <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative">
                {/* Decorative element */}
                <div 
                  className={`absolute -top-6 left-1/2 transform -translate-x-1/2 h-2 rounded-full
                    transition-all duration-500 delay-100
                    ${specsInView ? 'opacity-100 w-24' : 'opacity-0 w-0'}`}
                  style={{ backgroundImage: `linear-gradient(to right, transparent, ${accentColor}40, transparent)` }}
                />
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12 py-10 md:py-12 lg:py-16">
                  {specs.map((spec, index) => (
                    <div
                      key={spec.label}
                      className={`text-center md:text-left relative group
                        transform transition-all duration-500 ease-out
                        ${specsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                      style={{ transitionDelay: `${200 + index * 100}ms` }}
                    >
                      <div className="text-xs sm:text-sm font-medium mb-2 md:mb-3 tracking-wider uppercase relative inline-block"
                        style={accentColorStyle}>
                        {spec.label}
                        <span 
                          className={`absolute -bottom-1 left-0 right-0 h-px
                            transition-all duration-500
                            ${specsInView ? 'w-full' : 'w-0'}`}
                          style={{ backgroundColor: `${accentColor}50` }}
                          style={{ transitionDelay: `${300 + index * 100}ms` }} 
                        />
                      </div>
                      
                      <div className="flex items-baseline justify-center md:justify-start gap-1 md:gap-2">
                        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white">
                          {specsInView && (
                            <AnimatedCounter
                              value={spec.value}
                              decimal={spec.decimal}
                            />
                          )}
                        </div>
                        <span 
                          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium"
                          style={accentColorStyle}>
                          {spec.unit}
                        </span>
                      </div>
                      
                      <div 
                        className={`h-0.5 mt-3 md:mt-4 mx-auto md:mx-0 rounded-full
                          transition-all duration-700 group-hover:w-24`}
                        style={{ 
                          width: specsInView ? '48px' : '0px',
                          transitionDelay: `${300 + index * 100}ms`,
                          ...gradientStyle
                        }} 
                      />
                      
                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300 rounded-lg -m-2 p-2 pointer-events-none" />
                    </div>
                  ))}
                </div>
                
                {/* Bottom decorative element */}
                <div className="relative h-6 overflow-hidden">
                  <div 
                    className={`absolute inset-x-0 h-px
                      transition-opacity duration-500 delay-600
                      ${specsInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ backgroundImage: `linear-gradient(to right, transparent, ${accentColor}30, transparent)` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSpecsShowcase;
