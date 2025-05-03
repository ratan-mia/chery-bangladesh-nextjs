'use client';

import { animate, motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

// Animated counter component with proper animation
const AnimatedCounter = ({ value, duration = 2, suffix = '', decimal = false }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: duration,
        ease: "easeOut",
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
    <span ref={ref} className="tabular-nums">
      {displayValue}
    </span>
  );
};

const VehicleSpecsShowcase = ({
  imageSrc = "/images/tiggo9pro/power.jpg",
  imageAlt = "Chery Tiggo 9 Pro with couple",
  overtitle = "POWER",
  title = "MASSIVE POWER",
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
      decimal: false,
      duration: 1.5
    }
  ],
  enableParallax = true,
  className = ""
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms for content appearing from bottom
  const contentY = useTransform(scrollYProgress, [0, 0.5], [200, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  
  const specsY = useTransform(scrollYProgress, [0.2, 0.7], [150, 0]);
  const specsOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  
  // Image parallax effect
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1]);
  
  return (
    <section ref={containerRef} className={`relative w-full overflow-hidden bg-gray-50 ${className}`}>
      {/* Main container */}
      <div className="relative">
        {/* Vehicle image with parallax */}
        <div className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh]">
          <motion.div 
            className="absolute inset-0"
            style={enableParallax ? { y: imageY, scale: imageScale } : {}}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-center"
              priority
            />
          </motion.div>
          
          {/* Subtle gradient for contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-900/30" />
        </div>

        {/* First content - appears from bottom on scroll */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative h-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <motion.div 
              className="absolute left-4 md:left-8 lg:left-12 bottom-48 md:bottom-56 lg:bottom-64"
              style={enableParallax ? { 
                y: contentY,
                opacity: contentOpacity
              } : {}}
            >
              {/* Overtitle */}
              <motion.p 
                className="text-sm md:text-base lg:text-lg font-semibold tracking-[0.3em] text-primary-light/90 mb-4 uppercase"
              >
                {overtitle}
              </motion.p>
              
              {/* Main title */}
              <motion.h2 
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.9] tracking-tight"
              >
                {title}
              </motion.h2>
              
              {/* Decorative line */}
              <motion.div 
                className="w-24 h-1 bg-primary-700 mt-6"
                initial={{ width: 0 }}
                whileInView={{ width: "6rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </motion.div>
          </div>
        </div>

        {/* Second content - specifications bar appears from bottom with delay */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0"
          style={enableParallax ? {
            y: specsY,
            opacity: specsOpacity
          } : {}}
        >
          <div className="bg-gradient-to-r from-primary-900/40 via-primary-900/30 to-primary-900/40 backdrop-blur-md border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-8 md:py-10"
              >
                {specs.map((spec, index) => (
                  <motion.div
                    key={spec.label}
                    className="text-center md:text-left relative"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    {/* Decorative dot */}
                    <motion.div 
                      className="absolute -left-3 top-1/2 hidden md:block w-1.5 h-1.5 rounded-full bg-primary-light"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.5 }}
                    />
                    
                    {/* Label */}
                    <motion.div 
                      className="text-xs md:text-sm font-medium text-primary-light/90 mb-2 tracking-wide uppercase"
                    >
                      {spec.label}
                    </motion.div>
                    
                    {/* Value and Unit */}
                    <div className="flex items-baseline justify-center md:justify-start gap-1">
                      <motion.div 
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
                      >
                        <AnimatedCounter
                          value={spec.value}
                          duration={spec.duration || 2}
                          decimal={spec.decimal}
                        />
                      </motion.div>
                      <motion.span 
                        className="text-xl md:text-2xl lg:text-3xl font-medium text-primary-light/90"
                      >
                        {spec.unit}
                      </motion.span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VehicleSpecsShowcase;