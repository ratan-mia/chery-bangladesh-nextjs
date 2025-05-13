'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

/**
 * FeatureShowcase - A reusable component for showcasing features with images or videos
 * 
 * @param {Object} props
 * @param {Array} props.features - Array of feature objects
 * @param {string} props.bgColor - Background color for the section (defaults to #e9e7e2)
 * @param {string} props.contentBgColor - Background color for content areas (defaults to #918678)
 * @param {string} props.textColor - Text color (defaults to white)
 * @param {string} props.bulletColor - Color for bullet points (defaults to white)
 * @param {number} props.height - Height for media containers in rem (defaults to 32)
 */
const FeatureShowcase = ({
  features = [],
  bgColor = '#e9e7e2',
  contentBgColor = '#918678',
  textColor = 'white',
  bulletColor = 'white',
  height = 32
}) => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  
  // Intersection observer to trigger animations when section is in view
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
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const textItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  // Helper function to render media (image or video)
  const renderMedia = (feature, index) => {
    const { type, src, alt } = feature.media;
    
    if (type === 'image') {
      return (
        <Image
          src={src}
          alt={alt || `Feature ${index + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          quality={100}
        />
      );
    } else if (type === 'video') {
      return (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full"
        />
      );
    }
    
    return null;
  };

  return (
    <section 
      ref={sectionRef}
      className="w-full overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <div className="w-full max-w-[1920px] mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={`feature-${index}`}
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2"
            >
              {/* Media Container - Changes order based on index */}
              <div 
                className={`relative w-full overflow-hidden
                  ${index % 2 === 1 ? 'order-1 md:order-2' : ''}
                  ${index % 2 === 0 ? 'order-1' : ''}
                `}
                style={{ height: `${height}rem` }}
              >
                <motion.div
                  initial={{ scale: 1.1 }}
                  animate={isInView ? { scale: 1 } : { scale: 1.1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full w-full"
                >
                  {renderMedia(feature, index)}
                </motion.div>
              </div>
              
              {/* Content Container - Changes order based on index */}
              <motion.div 
                variants={textContainerVariants}
                className={`p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center h-auto
                  ${index % 2 === 1 ? 'order-2 md:order-1' : ''}
                  ${index % 2 === 0 ? 'order-2' : ''}
                `}
                style={{ 
                  backgroundColor: feature.contentBgColor || contentBgColor,
                  color: feature.textColor || textColor,
                  height: `${height}rem`
                }}
              >
                <motion.h3 
                  variants={textItemVariants}
                  className="text-2xl sm:text-3xl md:text-4xl font-normal mb-6 md:mb-8"
                >
                  {feature.title}
                </motion.h3>
                <ul className="space-y-3 md:space-y-4">
                  {feature.points.map((text, pointIndex) => (
                    <motion.li 
                      key={`feature-${index}-point-${pointIndex}`}
                      variants={textItemVariants}
                      className="text-lg sm:text-xl md:text-2xl font-light flex items-start"
                    >
                      <motion.span 
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 + (pointIndex * 0.1) }}
                        className="inline-block w-2 h-2 rounded-full mt-3 mr-3 flex-shrink-0"
                        style={{ backgroundColor: feature.bulletColor || bulletColor }}
                      />
                      {text}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureShowcase;