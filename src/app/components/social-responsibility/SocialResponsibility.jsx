'use client';

import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const SocialResponsibility = ({
  // Content props
  title = 'GATHERING FORCES FOR GOOD',
  description = 'Chery actively fulfills its global corporate citizenship responsibilities, focusing on child development, environmental protection, and charitable aid. We give back to society with sincerity and warmth through meaningful action.',
  
  // Image props
  imageSrc = '/images/social-responsibility.jpg',
  imageAlt = 'Corporate social responsibility initiative',
  
  // Layout props
  contentPosition = 'left', // 'left' or 'right'
  overlayOpacity = 0.4,
  overlayColor = 'rgba(98, 58, 94, 0.8)', // Purple gradient base color
  textColor = '#ffffff',
  
  // Action props
  ctaText = 'Learn More',
  ctaLink = '#initiatives',
  showCta = false,
  
  // Animation props
  animationDelay = 0.2,
  
  // Container props
  height = 'h-screen',
  className = '',
}) => {
  // Animation controls
  const controls = useAnimation();
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  
  // Custom intersection observer hook
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
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

  // Determine content position classes
  const contentPositionClasses = contentPosition === 'right' 
    ? 'items-end text-right' 
    : 'items-start text-left';
  
  // Determine content width and position
  const contentClasses = contentPosition === 'right'
    ? 'md:ml-auto md:mr-0 pr-8 md:pr-16'
    : 'md:mr-auto md:ml-0 pl-8 md:pl-16';
  
  // Determine gradient direction based on content position
  const gradientDirection = contentPosition === 'right'
    ? 'to left'
    : 'to right';
  
  return (
    <section className={`relative w-full overflow-hidden ${height} ${className}`}>
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
          sizes="100vw"
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
      
      {/* Content Container */}
      <div className={`relative z-20 h-full w-full flex flex-col justify-center ${contentPositionClasses}`}>
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className={`w-full max-w-xl ${contentClasses}`}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            style={{ color: textColor }}
          >
            {title}
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-base md:text-lg mb-8 opacity-90 leading-relaxed"
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
            >
              <a 
                href={ctaLink}
                className="inline-flex items-center py-3 px-6 bg-white text-purple-900 font-medium"
              >
                <span>{ctaText}</span>
                <motion.svg 
                  className="ml-2 w-5 h-5" 
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