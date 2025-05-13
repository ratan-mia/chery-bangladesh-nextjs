'use client';

import { animate, motion, useInView } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

// Refined counter component with clean, professional animation
const AnimatedCounter = ({ value, unit = '', duration = 2, decimal = false }) => {
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
    <span ref={ref} className="tabular-nums flex items-baseline">
      <span className="text-4xl md:text-5xl font-bold text-primary-900">
        {displayValue}
      </span>
      <span className="text-2xl md:text-3xl font-medium text-primary-900/80">
        {unit}
      </span>
    </span>
  );
};

const PowertrainSpecsSection = () => {
  const containerRef = useRef(null);
  
  // Clean, subtle animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  // Line animation variant
  const lineAnimation = {
    hidden: { width: 0 },
    visible: { 
      width: "100%",
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="w-full bg-stone-100 py-16 md:py-20 overflow-hidden"
    >
      {/* Title Section */}
      <div className="max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8 mb-12">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-primary-900 tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          GALLOP INTO THE FUTURE<br />
          WITH BOUNDLESS POWER
        </motion.h2>
        <motion.div 
          className="w-20 h-1 bg-primary-700 mt-4"
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </div>
      
      {/* Specs Grid */}
      <div className="max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT PANEL - ENGINE SPECS */}
          <motion.div 
            className="bg-white p-8 md:p-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {/* Engine Type Header */}
            <motion.h3 
              className="text-xl font-bold text-primary-700 mb-8"
              variants={fadeInUp}
            >
              2.0T GDI EFFICIENT ENGINE
            </motion.h3>
            
            {/* Engine Specs */}
            <div className="grid grid-cols-1 gap-8 mb-8">
              {/* Maximum Power */}
              <motion.div variants={fadeInUp}>
                <div className="flex flex-col">
                  <div className="mb-2">
                    <AnimatedCounter value={187} unit="kW" duration={1.8} />
                  </div>
                  <motion.div 
                    className="w-full h-px bg-primary-700/20 mb-2"
                    variants={lineAnimation}
                  />
                  <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    MAXIMUM POWER
                  </span>
                </div>
              </motion.div>
              
              {/* Maximum Output Torque */}
              <motion.div variants={fadeInUp}>
                <div className="flex flex-col">
                  <div className="mb-2">
                    <AnimatedCounter value={390} unit="N·M" duration={2} />
                  </div>
                  <motion.div 
                    className="w-full h-px bg-primary-700/20 mb-2"
                    variants={lineAnimation}
                  />
                  <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    MAXIMUM OUTPUT TORQUE
                  </span>
                </div>
              </motion.div>
              
              {/* Driving Efficiency */}
              <motion.div variants={fadeInUp}>
                <div className="flex flex-col">
                  <div className="mb-2">
                    <AnimatedCounter value={44.5} unit="%" duration={1.6} decimal={true} />
                  </div>
                  <motion.div 
                    className="w-full h-px bg-primary-700/20 mb-2"
                    variants={lineAnimation}
                  />
                  <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    DRIVING EFFICIENCY
                  </span>
                </div>
              </motion.div>
            </div>
            
            {/* Engine Image */}
            <motion.div 
              className="relative w-full pt-[75%]"
              variants={fadeInUp}
            >
              <Image
                src="/images/tiggo9pro/engine.jpg"
                alt="2.0T GDI Efficient Engine"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={95}
              />
            </motion.div>
          </motion.div>
          
          {/* RIGHT PANEL - TRANSMISSION & 4WD */}
          <motion.div 
            className="flex flex-col gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {/* Top Box - Transmission */}
            <motion.div 
              className="bg-white p-8 md:p-10"
              variants={fadeInUp}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                {/* Transmission Title & Specs */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary-700 mb-8">
                    8AT TRANSMISSION
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Driving Efficiency */}
                    <div className="flex flex-col">
                      <div className="mb-2">
                        <AnimatedCounter value={96} unit="%" duration={1.7} />
                      </div>
                      <motion.div 
                        className="w-full h-px bg-primary-700/20 mb-2"
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      />
                      <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                        DRIVING EFFICIENCY
                      </span>
                    </div>
                    
                    {/* Maximum Input Torque */}
                    <div className="flex flex-col">
                      <div className="mb-2">
                        <AnimatedCounter value={470} unit="N·M" duration={2.1} />
                      </div>
                      <motion.div 
                        className="w-full h-px bg-primary-700/20 mb-2"
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      />
                      <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                        MAXIMUM INPUT TORQUE
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Transmission Image */}
                <div className="md:w-2/5">
                  <motion.div 
                    className="relative w-full pt-[100%]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Image
                      src="/images/tiggo9pro/transmission.jpg"
                      alt="8AT Transmission"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 20vw"
                      quality={95}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            {/* Bottom Box - 4WD System */}
            <motion.div 
              className="bg-white p-8 md:p-10 flex-1"
              variants={fadeInUp}
            >
              <div className="h-full flex flex-col">
                {/* 4WD System Title */}
                <h3 className="text-xl font-bold text-primary-700 mb-6">
                  FULL SCENE INTELLIGENT 4WD SYSTEM
                </h3>
                
                {/* Divider Line */}
                <motion.div 
                  className="w-full h-px bg-gray-200 mb-8"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
                
                {/* Driving Modes */}
                <motion.div 
                  className="text-right mb-6"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <p className="text-base text-primary-900 font-medium">
                    ECONOMIC + STANDARD + SPORTS
                  </p>
                </motion.div>
                
                {/* Terrain Types */}
                <motion.div 
                  className="text-right mb-8"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <p className="text-base text-primary-900 font-medium">
                    SANDY ROAD + MUDDY GROUND +<br />
                    SNOWFIELD + OFF-ROAD
                  </p>
                </motion.div>
                
                {/* 4WD System Image */}
                <div className="relative w-full flex-1 mt-auto">
                  <motion.div 
                    className="relative w-full h-full min-h-[200px]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Image
                      src="/images/tiggo9pro/chassis.jpg"
                      alt="Full Scene Intelligent 4WD System"
                      fill
                      className="object-contain object-center"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={95}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PowertrainSpecsSection;