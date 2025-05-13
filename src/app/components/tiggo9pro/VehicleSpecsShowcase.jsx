'use client';

import { animate, motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

// Refined animated counter component with better performance
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
  enableParallax = true,
  className = ""
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Content transforms
  const contentY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  
  // Specs transforms
  const specsY = useTransform(scrollYProgress, [0.4, 0.7], [80, 0]);
  const specsOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  
  // Image parallax effects
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);
  
  // Line animation
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.25], [0, 96]);
  
  // Variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section ref={containerRef} className={`relative w-full overflow-hidden bg-stone-900 ${className}`}>
      {/* Main container */}
      <div className="relative">
        {/* Vehicle image with parallax */}
        <div className="relative w-full h-[75vh] md:h-[85vh] lg:h-[95vh]">
          <motion.div 
            className="absolute inset-0"
            style={enableParallax ? { 
              y: imageY, 
              scale: imageScale
            } : {}}
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
          </motion.div>
          
          {/* Enhanced gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
        </div>

        {/* Content with parallax */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative h-full max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8">
            <motion.div 
              className="absolute left-4 md:left-8 lg:left-12 bottom-48 md:bottom-56 lg:bottom-64 max-w-xl"
              style={enableParallax ? { 
                y: contentY,
                opacity: contentOpacity
              } : {}}
            >
              {/* Overtitle */}
              <motion.p 
                className="text-sm md:text-base font-medium tracking-wider text-primary-light mb-4 uppercase"
              >
                {overtitle}
              </motion.p>
              
              {/* Main title */}
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tighter"
              >
                {title}
              </motion.h2>
              
              {/* Decorative line */}
              <motion.div 
                className="h-1 bg-primary-700 mt-6 mb-6"
                style={{ width: lineWidth }}
              />

              {/* Description - added for better context */}
              <motion.p
                className="text-lg text-white/90 leading-relaxed hidden md:block"
              >
                {description}
              </motion.p>

              {/* Call to action button */}
              <motion.div className="mt-8 hidden md:block">
                <a
                  href="#explore-performance"
                  className="group inline-flex items-center px-6 py-3 bg-primary-700 text-white font-medium hover:bg-primary-800 transition-all duration-300 shadow-lg"
                >
                  Explore Performance
                  <ChevronRight 
                    size={20}
                    className="ml-2 group-hover:ml-3 transition-all duration-300"
                  />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Specifications with improved styling */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0"
          style={enableParallax ? {
            y: specsY,
            opacity: specsOpacity
          } : {}}
        >
          <div className="bg-primary-900/90 backdrop-blur-md border-t border-primary-light/10 shadow-lg">
            <div className="max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8">
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-8 md:py-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {specs.map((spec, index) => (
                  <motion.div
                    key={spec.label}
                    className="text-center md:text-left relative group"
                    variants={itemVariants}
                  >
                    {/* Decorative dot */}
                    <div className="absolute -left-3 top-1/2 hidden md:block">
                      <motion.div 
                        className="w-1.5 h-1.5 rounded-full bg-primary-light"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: index * 0.1 + 0.2,
                          duration: 0.5,
                          ease: "easeOut"
                        }}
                      />
                    </div>
                    
                    {/* Label */}
                    <div 
                      className="text-xs md:text-sm font-medium text-primary-light/90 mb-2 tracking-wider uppercase transition-all duration-300 group-hover:text-primary-light"
                    >
                      {spec.label}
                    </div>
                    
                    {/* Value and Unit */}
                    <div className="flex items-baseline justify-center md:justify-start gap-1 transition-all duration-300 group-hover:translate-x-1">
                      <div 
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
                      >
                        <AnimatedCounter
                          value={spec.value}
                          duration={spec.duration || 2}
                          decimal={spec.decimal}
                        />
                      </div>
                      <span 
                        className="text-xl md:text-2xl lg:text-3xl font-medium text-primary-light/90"
                      >
                        {spec.unit}
                      </span>
                    </div>
                    
                    {/* Hover underline effect */}
                    <div className="h-0.5 w-0 bg-primary-700 mt-2 transition-all duration-300 group-hover:w-3/4 mx-auto md:mx-0" />
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