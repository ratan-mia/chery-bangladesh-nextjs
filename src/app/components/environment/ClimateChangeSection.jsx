'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

// Enhanced Climate Change Section component
const ClimateChangeSection = ({
  title,
  subtitle,
  content,
  backgroundImage,
  overlayColor = 'rgba(17, 24, 39, 0.65)', // Default overlay - dark gray
  contentPosition = 'right', // 'left' or 'right'
  className = '',
  showCta = true,
  ctaText = 'Learn More',
  ctaLink = '#learn-more',
  secondaryCta = null, // Optional secondary CTA
  stats = null, // Optional stats to display
  decorativeElement = null, // Optional decorative element
  decorativeOverlay = null, // Optional pattern overlay
}) => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  // Observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Determine the overlay style based on prop
  const overlayStyle = typeof overlayColor === 'string'
    ? { backgroundColor: overlayColor }
    : { background: overlayColor }; // For gradients

  return (
    <section ref={sectionRef} className={`relative w-full overflow-hidden ${className}`}>
      {/* Background Image with Parallax effect */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={isInView ? { scale: 1 } : { scale: 1.05 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            aria-hidden="true"
          />
        </motion.div>
        
        {/* Custom overlay for better text readability */}
        <div className="absolute inset-0 z-10" style={overlayStyle}></div>
        
        {/* Optional pattern overlay */}
        {decorativeOverlay && (
          <div className="absolute inset-0 z-10 mix-blend-soft-light opacity-20">
            <Image
              src={decorativeOverlay}
              alt=""
              fill
              className="object-cover"
              aria-hidden="true"
              sizes="100vw"
            />
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[70vh]">
          {/* Content Column */}
          <motion.div 
            className={`lg:col-span-6 ${contentPosition === 'left' ? 'lg:col-start-1' : 'lg:col-start-7'}`}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Top accent line */}
            <motion.div
              className="w-12 h-1 bg-white mb-6"
              variants={itemVariants}
            ></motion.div>
            
            {/* Title with improved typography */}
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight tracking-tight"
              variants={itemVariants}
            >
              {title}
            </motion.h2>
            
            {/* Optional subtitle */}
            {subtitle && (
              <motion.p
                className="text-xl sm:text-2xl text-white/90 mb-6 font-light leading-relaxed"
                variants={itemVariants}
              >
                {subtitle}
              </motion.p>
            )}

            {/* Main content */}
            <motion.div 
              className="text-white/85 space-y-4 text-base sm:text-lg"
              variants={itemVariants}
            >
              {content}
            </motion.div>

            {/* Stats display if provided */}
            {stats && (
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8"
                variants={itemVariants}
              >
                {stats.map((stat, index) => (
                  <div key={index} className="border-l-2 border-white/30 pl-3">
                    <div className="text-white text-2xl sm:text-3xl font-bold">{stat.value}</div>
                    <div className="text-white/70 text-sm uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* CTA buttons */}
            {showCta && (
              <motion.div 
                className="mt-8 flex flex-col sm:flex-row gap-4"
                variants={itemVariants}
              >
                <a 
                  href={ctaLink} 
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-900 font-medium transition-all duration-300 hover:bg-white/90 group"
                >
                  {ctaText}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </a>
                
                {secondaryCta && (
                  <a 
                    href={secondaryCta.link} 
                    className="inline-flex items-center justify-center px-8 py-3 border border-white text-white font-medium transition-all duration-300 hover:bg-white/10"
                  >
                    {secondaryCta.text}
                  </a>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Decorative elements column */}
          {decorativeElement && (
            <motion.div 
              className={`hidden lg:block lg:col-span-5 ${contentPosition === 'left' ? 'lg:col-start-8' : 'lg:col-start-1'}`}
              initial={{ opacity: 0, x: contentPosition === 'left' ? 50 : -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: contentPosition === 'left' ? 50 : -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative h-full w-full min-h-[300px]">
                <Image
                  src={decorativeElement}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-white/70 text-xs uppercase tracking-wider mb-2">Scroll</span>
          <div className="w-5 h-10 border border-white/30 rounded-full flex justify-center">
            <motion.div 
              className="w-1.5 h-1.5 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ClimateChangeSection;