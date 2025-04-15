import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const CheryHonorsParallax = () => {
  const sectionRef = useRef(null);
  const [windowHeight, setWindowHeight] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // Enhanced scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Refined parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], ['5%', '0%', '-15%']);
  const opacityTitle = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const opacityText = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  
  // Window height calculation for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    
    // Delayed visibility for entrance animation
    const timer = setTimeout(() => setIsVisible(true), 300);
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.8
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
  return (
    <section 
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-secondary"
      style={{ 
        height: `${Math.max(windowHeight, 500)}px`,
        minHeight: '100vh'
      }}
    >
      {/* Background with Parallax */}
      <motion.div 
        className="absolute inset-0 w-full z-0"
        style={{ 
          y: backgroundY,
          height: "130%",
          top: "-15%",
          position: "absolute"
        }}
      >
        <div className="relative w-full h-full">
          <Image 
            src="/images/honors/chery-mountain-sunset.jpg" 
            alt="Mountain landscape at sunset" 
            fill 
            priority
            sizes="100vw"
            style={{ 
              objectFit: 'cover',
              objectPosition: 'center 70%'
            }}
            className="transition-all duration-700 ease-in-out"
          />
          
          {/* Gradient overlay with brand colors */}
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-transparent z-10"></div>
          
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-black/20 z-10 
                         bg-[url('/images/pattern-dot.png')] opacity-30"></div>
        </div>
      </motion.div>
      
      {/* Content Container with Animation */}
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            className="relative z-20 h-full w-full flex flex-col justify-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="container mx-auto px-6 md:px-12 max-w-screen-xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Title Section */}
                <motion.div 
                  className="md:col-span-5 pr-0 md:pr-8" 
                  style={{ 
                    y: textY,
                    opacity: opacityTitle,
                    scale
                  }}
                  variants={itemVariants}
                >
                  <div className="space-y-4">
                    <motion.div 
                      className="h-1 w-20 bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: 80 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                    ></motion.div>
                    
                    <h2 className="text-white text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                      <motion.span 
                        className="block"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                      >
                        Chery
                      </motion.span>
                      <motion.span 
                        className="block text-primary"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                      >
                        Honors
                      </motion.span>
                    </h2>
                    
                    <motion.div 
                      className="pt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 0.8 }}
                    >
                      <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary-light text-sm font-medium">
                        Excellence Since 1997
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* Content Section */}
                <motion.div 
                  className="md:col-span-7 text-white"
                  style={{ 
                    y: textY,
                    opacity: opacityText
                  }}
                  variants={itemVariants}
                >
                  <div className="space-y-6 backdrop-blur-sm bg-secondary-dark/30 p-6 rounded-lg border border-primary-light/10">
                    <p className="text-base md:text-lg leading-relaxed text-gray-200">
                      Since its establishment in 1997, Chery Automobile has been committed to providing high-quality products and services to consumers around the world through technological innovation and excellence in engineering.
                    </p>
                    
                    <p className="text-base md:text-lg leading-relaxed text-gray-300">
                      Our honors represent not only the milestones in our brand's journey, but also affirm Chery Automobile's growing global competitiveness in the automotive industry.
                    </p>
                    
                    <motion.div 
                      className="flex flex-wrap gap-4 pt-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.8 }}
                    >
                      <motion.div 
                        className="flex items-center space-x-2 px-3 py-2 bg-secondary-light/50 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="text-primary-light text-2xl font-bold">120+</span>
                        <span className="text-gray-200 text-sm">Global Awards</span>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center space-x-2 px-3 py-2 bg-secondary-light/50 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="text-primary-light text-2xl font-bold">80+</span>
                        <span className="text-gray-200 text-sm">Countries</span>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center space-x-2 px-3 py-2 bg-secondary-light/50 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="text-primary-light text-2xl font-bold">10M+</span>
                        <span className="text-gray-200 text-sm">Vehicles Sold</span>
                      </motion.div>
                    </motion.div>
                    
                    <motion.div
                      className="pt-4 flex flex-wrap gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4, duration: 0.8 }}
                    >
                      <motion.button 
                        className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium 
                                  transition-all duration-300 flex items-center space-x-2 group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Explore Our Achievements</span>
                        <motion.span 
                          className="inline-block"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >→</motion.span>
                      </motion.button>
                      
                      <motion.button 
                        className="px-6 py-3 bg-transparent border border-primary text-primary hover:bg-primary/10 
                                  rounded-lg font-medium transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>View Timeline</span>
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute bottom-10 right-10 w-20 h-20 rounded-full bg-gradient-to-r from-primary-light to-primary opacity-20 blur-xl z-10"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      
      <motion.div 
        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-secondary-light to-secondary opacity-10 blur-xl z-10"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      
      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-light to-transparent z-30"></div>
    </section>
  );
};

export default CheryHonorsParallax;