'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const SocialResponsibilityBanner = ({
  // Content props
  title = 'Social Responsibility',
  subtitle = 'Chery respects and values the worth of individuals',
  
  // Image props
  imageSrc = '/images/responsibility/unicef.jpg',
  imageAlt = 'Chery employees with UNICEF working with children',
  
  // Style props
  textColor = '#ffffff',
  
  // Animation props
  animationDuration = 0.8,
  
  // Container props
  className = '',
}) => {
  const [inView, setInView] = useState(false);
  const bannerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    const currentRef = bannerRef.current;
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
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: animationDuration,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  return (
    <section 
      ref={bannerRef}
      className={`relative w-full h-screen overflow-hidden ${className}`}
    >
      {/* Background Image with subtle zoom effect */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: inView ? 1 : 1.05 }}
        transition={{ duration: 6, ease: "easeOut" }}
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
      
      {/* Content Container - Positioned lower */}
      <div className="relative z-20 flex flex-col items-center h-full text-center px-4">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="max-w-4xl mx-auto mt-auto mb-16 md:mb-24"
        >
          <motion.h1 
            variants={textVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-wider"
            style={{ color: textColor }}
          >
            {title}
          </motion.h1>
          
          <motion.p 
            variants={textVariants}
            className="text-lg md:text-xl lg:text-2xl"
            style={{ color: textColor }}
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialResponsibilityBanner;