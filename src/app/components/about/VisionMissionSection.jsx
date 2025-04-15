'use client'

import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

const VisionMissionSection = ({ 
  backgroundImage = '/images/about/mountain-landscape.jpg', 
  sections = [
    {
      title: "VISION",
      content: "Committed to being a diversified enterprise with global influence and competitiveness",
      subtitle: "Our future",
      icon: "🔭"
    },
    {
      title: "MISSION",
      content: "Innovation-driven, striving for excellence, aspiring to become a leading company in every field we enter",
      subtitle: "Our purpose",
      icon: "🚀"
    },
    {
      title: "VALUES",
      content: [
        "Pursue Practical Innovation",
        "Commitment to Excellence",
        "People-Oriented",
        "Win-Win Cooperation"
      ],
      subtitle: "Our principles",
      icon: "🌟"
    }
  ],
  title = 'Our Guiding Principles',
  description = 'The foundation of our corporate culture and what drives us forward',
  hasDecorativeSun = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Detect when section is in view
  useEffect(() => {
    setIsMounted(true);
    
    if (!window.IntersectionObserver) {
      setIsInView(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Once in view, we can stop observing
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -100px 0px" }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current && observer) {
        observer.disconnect();
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCardHover = (index) => {
    setHoveredIndex(index);
  };

  const handleCardLeave = () => {
    setHoveredIndex(null);
  };

  // Calculate optimized animations based on view state
  const shouldAnimate = isInView && isMounted;

  // Card animations with sequential reveal
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.7,
        ease: "easeOut"
      }
    })
  };

  // Content animations
  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3
      }
    }
  };

  // List item animations with staggered children
  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section 
      className="relative w-full overflow-hidden min-h-screen bg-gray-900" 
      ref={sectionRef}
      id="vision-mission-values"
    >
      {/* Background Image with optimized animation */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
        initial={{ scale: 1.05, opacity: 0.9 }}
        animate={{ 
          scale: shouldAnimate ? (isHovered ? 1.03 : 1) : 1.05,
          opacity: shouldAnimate ? 1 : 0.9
        }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      {/* Improved overlay with gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"></div>
      
      {/* Optional title and description with better animations */}
      {(title || description) && (
        <motion.div 
          className="relative pt-20 pb-10 px-4 text-center z-10 container mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {title && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </motion.div>
      )}
      
      {/* Decorative sun element with improved animations */}
      {hasDecorativeSun && (
        <motion.div 
          className="absolute top-1/4 right-1/4 pointer-events-none z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={shouldAnimate ? { 
            opacity: [0.7, 1],
            rotate: isHovered ? 45 : 0,
            scale: isHovered ? 1.1 : 1
          } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <div className="relative w-16 h-16">
            <motion.div 
              className="absolute inset-0 bg-primary-600 rounded-full opacity-90 blur-sm"
              animate={{ opacity: isHovered ? [0.7, 1, 0.7] : 0.9 }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            {[...Array(12)].map((_, index) => (
              <motion.div 
                key={index}
                className="absolute top-1/2 left-1/2 h-32 w-1 bg-primary-600 opacity-70"
                style={{ 
                  transform: `translate(-50%, -50%) rotate(${index * 30}deg)`,
                  transformOrigin: 'center',
                  filter: 'blur(0.5px)'
                }}
                animate={{ 
                  opacity: isHovered ? [0.5, 0.8, 0.5] : 0.7,
                  height: isHovered ? ['8rem', '9rem', '8rem'] : '8rem'
                }}
                transition={{ 
                  duration: 2 + (index % 3), 
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: index * 0.1
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
      
      {/* Main content container */}
      <div className="relative z-20 container mx-auto px-4 md:px-8 pt-32 pb-16 flex flex-col min-h-screen justify-end">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          
          {sections.map((section, index) => (
            <motion.div 
              key={index} 
              className="relative h-full"
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={shouldAnimate ? "visible" : "hidden"}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={handleCardLeave}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Card background with improved aesthetics */}
              <motion.div 
                className="absolute inset-0 rounded-lg overflow-hidden"
                style={{ 
                  background: index === 0 
                    ? 'linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(30,55,45,0.95))' 
                    : index === 1 
                      ? 'linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(25,45,55,0.95))' 
                      : 'linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(35,35,55,0.95))',
                  boxShadow: hoveredIndex === index ? "0 8px 30px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.2)",
                  borderLeft: `1px solid rgba(255,255,255,0.1)`,
                  borderTop: `1px solid rgba(255,255,255,0.1)`,
                  borderRight: `1px solid rgba(0,0,0,0.2)`,
                  borderBottom: `1px solid rgba(0,0,0,0.2)`,
                  backdropFilter: "blur(10px)"
                }}
                initial={{ opacity: 0.9 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0.9 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Top accent bar with primary color */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1 z-20 bg-primary-600 rounded-t-lg"
                initial={{ width: '0%' }}
                animate={{ width: hoveredIndex === index ? '100%' : '30%' }}
                transition={{ duration: 0.4 }}
              />
              
              {/* Content container */}
              <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
                {/* Title section with icon */}
                <div className="flex items-center mb-6">
                  {section.icon && (
                    <motion.div 
                      className="text-2xl mr-3"
                      animate={{ 
                        scale: hoveredIndex === index ? [1, 1.2, 1] : 1 
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: hoveredIndex === index ? Infinity : 0 
                      }}
                    >
                      {section.icon}
                    </motion.div>
                  )}
                  <motion.h3 
                    className="text-2xl md:text-3xl font-bold text-white tracking-wider"
                    variants={contentVariants}
                  >
                    {section.title}
                  </motion.h3>
                </div>
                
                {/* Content based on type (list or paragraph) */}
                {Array.isArray(section.content) ? (
                  <motion.ul 
                    className="text-white/80 text-lg space-y-4 flex-grow"
                    variants={listContainerVariants}
                    initial="hidden"
                    animate={shouldAnimate ? "visible" : "hidden"}
                  >
                    {section.content.map((item, i) => (
                      <motion.li 
                        key={i}
                        variants={listItemVariants}
                        className="flex items-start"
                      >
                        <motion.span 
                          className="inline-block w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"
                          animate={{ 
                            scale: hoveredIndex === index ? [1, 1.3, 1] : 1,
                            opacity: hoveredIndex === index ? [0.8, 1, 0.8] : 0.8
                          }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity,
                            repeatType: "reverse" 
                          }}
                        />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                ) : (
                  <motion.p 
                    className="text-white/80 text-lg leading-relaxed flex-grow"
                    variants={contentVariants}
                    initial="hidden"
                    animate={shouldAnimate ? "visible" : "hidden"}
                  >
                    {section.content}
                  </motion.p>
                )}
                
                {/* Footer section */}
                <motion.div
                  className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center"
                  initial={{ opacity: 0 }}
                  animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <div className="text-white/50 text-sm">
                    {section.subtitle}
                  </div>
                  
                  {/* Call to action */}
                  {section.cta ? (
                    <motion.button
                      onClick={section.cta.onClick}
                      className="text-primary-600 hover:text-primary-500 text-sm flex items-center"
                      whileHover={{ x: 3 }}
                    >
                      {section.cta.label}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 ml-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  ) : (
                    <motion.div
                      className="text-primary-600 hover:text-primary-500 text-sm flex items-center cursor-pointer transition-colors"
                      whileHover={{ x: 3 }}
                    >
                      Learn more
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 ml-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;