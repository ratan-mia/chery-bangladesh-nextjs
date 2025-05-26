'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/**
 * FeatureShowcase - A reusable component for showcasing features with images or videos
 * Enhanced with title, subtitle and Chery Bangladesh design guidelines
 * 
 * @param {Object} props
 * @param {Array} props.features - Array of feature objects
 * @param {string} props.title - Main section title
 * @param {string} props.subtitle - Section subtitle/description
 * @param {string} props.bgColor - Background color for the section (defaults to #e9e7e2)
 * @param {string} props.contentBgColor - Background color for content areas (defaults to #918678)
 * @param {string} props.textColor - Text color (defaults to white)
 * @param {string} props.bulletColor - Color for bullet points (defaults to white)
 * @param {number} props.height - Height for media containers in rem (defaults to 32)
 * @param {boolean} props.centerHeader - Whether to center the header (defaults to true)
 * @param {string} props.titleHighlight - Text to highlight in title with primary color
 */
const FeatureShowcase = ({
  features = [],
  title = '',
  subtitle = '',
  bgColor = '#e9e7e2',
  contentBgColor = '#918678',
  textColor = 'white',
  bulletColor = 'white',
  height = 32,
  centerHeader = true,
  titleHighlight = ''
}) => {
  const [isInView, setIsInView] = useState(false);
  const [headerInView, setHeaderInView] = useState(false);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  
  // Intersection observer for header animations
  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderInView(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }
    
    return () => {
      if (headerRef.current) {
        headerObserver.unobserve(headerRef.current);
      }
    };
  }, []);
  
  // Intersection observer for features animations
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

  // Header animation variants
  const headerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const headerItemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.7, 
        ease: "easeOut",
      },
    },
  };

  const dividerVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: '6rem',
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.3
      },
    },
  };

  // Feature animation variants
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
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.7, 
        ease: [0.25, 0.46, 0.45, 0.94],
      },
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
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
      },
    },
  };

  const mediaVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 1.2, 
        ease: [0.25, 0.46, 0.45, 0.94],
      },
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
          priority={index === 0}
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

  // Helper function to render title with highlight
  const renderTitle = () => {
    if (!titleHighlight || !title.includes(titleHighlight)) {
      return title;
    }

    const parts = title.split(titleHighlight);
    return (
      <>
        {parts[0]}
        <span className="text-primary-900">{titleHighlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section 
      className="w-full overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <div className="w-full max-w-[1920px] mx-auto">
        {/* Header Section */}
        {(title || subtitle) && (
          <motion.div
            ref={headerRef}
            variants={headerContainerVariants}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            className={`py-16 md:py-20 lg:py-24 px-4 md:px-8 lg:px-16 ${
              centerHeader ? 'text-center' : 'text-left'
            }`}
          >
            {title && (
              <motion.h2 
                variants={headerItemVariants}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              >
                {renderTitle()}
              </motion.h2>
            )}
            
            {centerHeader && (
              <motion.div 
                variants={dividerVariants}
                className="h-1 bg-primary-700 mx-auto mb-8"
              />
            )}
            
            {subtitle && (
              <motion.p 
                variants={headerItemVariants}
                className="text-gray-600 text-lg max-w-3xl leading-normal"
                style={centerHeader ? { margin: '0 auto' } : {}}
              >
                {subtitle}
              </motion.p>
            )}
          </motion.div>
        )}

        {/* Features Section */}
        <motion.div
          ref={sectionRef}
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
                  variants={mediaVariants}
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
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 leading-tight"
                >
                  {feature.title}
                </motion.h3>
                
                <motion.ul 
                  variants={textContainerVariants}
                  className="space-y-3 md:space-y-4"
                >
                  {feature.points.map((text, pointIndex) => (
                    <motion.li 
                      key={`feature-${index}-point-${pointIndex}`}
                      variants={textItemVariants}
                      className="text-lg sm:text-xl md:text-2xl font-normal flex items-start leading-normal"
                    >
                      <motion.span 
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: 0.5 + (pointIndex * 0.1),
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        className="inline-block w-2 h-2 rounded-full mt-3 mr-3 flex-shrink-0"
                        style={{ backgroundColor: feature.bulletColor || bulletColor }}
                      />
                      {text}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureShowcase;