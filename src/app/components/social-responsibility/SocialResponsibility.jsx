'use client';

import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

const SocialResponsibility = ({
  // Content props
  title = 'GATHERING FORCES FOR GOOD',
  description = 'Chery actively fulfills its global corporate citizenship responsibilities, focusing on child development, environmental protection, and charitable aid. We give back to society with sincerity and warmth through meaningful action.',
  
  // Image props
  imageSrc = '/images/social-responsibility.jpg',
  imageAlt = 'Corporate social responsibility initiative',
  
  // Layout props
  contentPosition = 'left', // 'left' or 'right'
  overlayOpacity = 0.1,
  overlayColor = 'rgba(98, 58, 94, 0.8)', // Purple gradient base color
  textColor = '#ffffff',
  
  // Action props
  ctaText = 'Learn More',
  ctaLink = '#initiatives',
  showCta = false,
  
  // Animation props
  animationDelay = 0.2,
  
  // Container props
  height = 'min-h-screen md:h-screen', // Responsive height handling
  className = '',
}) => {
  // Animation controls
  const controls = useAnimation();
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);
  
  // Get window height for responsive sizing
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const updateHeight = () => {
        setWindowHeight(window.innerHeight);
      };
      
      updateHeight();
      window.addEventListener('resize', updateHeight);
      return () => window.removeEventListener('resize', updateHeight);
    }
  }, []);
  
  // Custom intersection observer hook
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 } // Reduced threshold for better mobile detection
    );
    
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: animationDelay
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: contentPosition === 'right' ? 20 : -20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.1, 0.25, 1.0] 
      }
    }
  };

  const imageVariants = {
    initial: { scale: 1.1 },
    animate: { 
      scale: 1,
      transition: { 
        duration: 8,
        ease: "easeOut"
      }
    }
  };

  // Start animation when in view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Responsive content classes
  // Mobile-first approach with different classes for each breakpoint
  const contentPositionClasses = contentPosition === 'right' 
    ? 'items-center text-center sm:items-end sm:text-right min-h-[500px]' 
    : 'items-center text-center sm:items-start sm:text-left min-h-[500px]';
  
  const contentClasses = contentPosition === 'right'
    ? 'w-11/12 mx-auto sm:w-auto px-4 sm:px-6 md:px-8 lg:pr-16 lg:ml-auto lg:mr-0'
    : 'w-11/12 mx-auto sm:w-auto px-4 sm:px-6 md:px-8 lg:pl-16 lg:mr-auto lg:ml-0';
  
  // Determine gradient direction based on content position
  const gradientDirection = contentPosition === 'right'
    ? 'to left'
    : 'to right';
  
  return (
    <section 
      className={`relative w-full overflow-hidden flex flex-col justify-center ${height} ${className}`}
      style={{ 
        minHeight: windowHeight > 0 ? `${windowHeight}px` : '100vh',
      }}
    >
      {/* Background Image with Motion */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-0"
        initial="initial"
        animate="animate"
        variants={imageVariants}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
          className="object-cover"
        />
      </motion.div>
      
      {/* Gradient Overlay */}
      <motion.div 
        className="absolute inset-0 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{
          background: `linear-gradient(${gradientDirection}, ${overlayColor} 0%, rgba(0,0,0,${overlayOpacity}) 100%)`,
        }}
      ></motion.div>
      
      {/* Content Container - Modified for better mobile & overall vertical alignment */}
      <div className={`relative z-20 w-full py-16 sm:py-0 flex flex-col justify-center ${contentPositionClasses}`}>
        <motion.div ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className={`w-full max-w-full sm:max-w-xl my-auto ${contentClasses}`}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight"
            style={{ color: textColor, wordBreak: 'break-word' }}
          >
            {title}
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 opacity-90 leading-relaxed"
            style={{ color: textColor }}
          >
            {description}
          </motion.p>
          
          {showCta && (
            <motion.div
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              className="mt-2 sm:mt-0"
            >
              <a 
                href={ctaLink}
                className="inline-flex items-center py-2 px-4 sm:py-3 sm:px-6 bg-white text-purple-900 font-medium text-sm sm:text-base"
              >
                <span>{ctaText}</span>
                <motion.svg 
                  className="ml-2 w-4 h-4 sm:w-5 sm:h-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  initial={{ x: 0 }}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 1.5,
                    repeatDelay: 2
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialResponsibility;