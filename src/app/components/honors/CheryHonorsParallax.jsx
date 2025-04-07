import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const CheryHonorsParallax = () => {
  const sectionRef = useRef(null);
  const [windowHeight, setWindowHeight] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeHonor, setActiveHonor] = useState(0);
  
  // Enhanced scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Refined parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], ['3%', '0%', '-5%']);
  const opacityContent = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
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

  // Auto-rotate through honors
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHonor((prev) => (prev + 1) % honors.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Honors data
  const honors = [
    {
      id: 1,
      title: "FORTUNE GLOBAL 500",
      year: "2024",
      description: "Chery Group achieves first-time entry into Fortune Global 500, ranking 385th"
    },
    {
      id: 2,
      title: "BRANDZ RECOGNITION",
      year: "2024",
      description: "Awarded as the sole winner in the automotive industry for pioneering Chinese global brand"
    },
    {
      id: 3,
      title: "GLOBAL EXPANSION",
      year: "2023",
      description: "Expanded to over 80 countries, affirming Chery's growing international market presence"
    }
  ];
  
  // Stats data
  const stats = [
    { value: "120+", label: "Global Awards" },
    { value: "80+", label: "Countries" },
    { value: "10M+", label: "Vehicles Sold" }
  ];
  
  return (
    <section 
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-brown-950"
      style={{ 
        height: `${Math.max(windowHeight, 600)}px`,
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
          
          {/* Overlay with more dramatic gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-brown-950/95 via-brown-900/85 to-brown-950/70 z-10"></div>
          
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-[url('/images/pattern-dot.png')] opacity-15 mix-blend-soft-light z-10"></div>
        </div>
      </motion.div>
      
      {/* Content Layout */}
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            className="relative z-20 h-full w-full flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="container mx-auto px-6 md:px-8">
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center"
                style={{ y: contentY, opacity: opacityContent }}
              >
                {/* Left Column - Title and Stats */}
                <div className="lg:col-span-2 lg:pr-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="w-16 h-1 bg-primary mb-6"></div>
                    
                    <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                      <span className="block">Chery</span>
                      <span className="block text-primary mt-1">Honors</span>
                    </h2>
                    
                    <p className="text-brown-200 text-lg mb-10 max-w-lg">
                      Since 1997, Chery has been recognized globally for innovation, quality, 
                      and excellence in the automotive industry.
                    </p>
                    
                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {stats.map((stat, index) => (
                        <motion.div 
                          key={stat.label}
                          className="text-center p-4"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                        >
                          <span className="block text-primary text-3xl font-bold">{stat.value}</span>
                          <span className="text-brown-300 text-sm">{stat.label}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.div 
                      className="flex flex-wrap gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <button className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-sm font-medium transition-colors flex items-center">
                        <span>View All Achievements</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </button>
                    </motion.div>
                  </motion.div>
                </div>
                
                {/* Right Column - Honors Cards */}
                <div className="lg:col-span-3 relative">
                  {/* Vertical line decorator */}
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0 hidden lg:block"></div>
                  
                  {/* Honors showcase */}
                  <div className="relative min-h-[320px] lg:min-h-[380px] lg:pl-10">
                    {honors.map((honor, index) => (
                      <motion.div
                        key={honor.id}
                        className="absolute inset-0"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ 
                          opacity: activeHonor === index ? 1 : 0,
                          x: activeHonor === index ? 0 : 40,
                          pointerEvents: activeHonor === index ? 'auto' : 'none'
                        }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                      >
                        <div className="bg-brown-900/50 backdrop-blur-sm border border-brown-700/50 p-8 rounded-sm">
                          <div className="flex items-center mb-6">
                            <span className="bg-primary/20 text-primary-light text-sm py-1 px-3 rounded-sm">
                              {honor.year}
                            </span>
                            <span className="ml-4 text-brown-400 text-sm">Achievement {index + 1} of {honors.length}</span>
                          </div>
                          
                          <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">
                            {honor.title}
                          </h3>
                          
                          <p className="text-brown-200 mb-8">
                            {honor.description}
                          </p>
                          
                          <div className="flex justify-between items-center">
                            <a href="#" className="text-primary hover:text-primary-light flex items-center transition-colors">
                              <span>Read more</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                              </svg>
                            </a>
                            
                            {/* Dots indicators */}
                            <div className="flex space-x-2">
                              {honors.map((_, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setActiveHonor(idx)}
                                  className={`w-2 h-2 rounded-full transition-all ${
                                    activeHonor === idx ? 'bg-primary w-5' : 'bg-brown-700'
                                  }`}
                                  aria-label={`View honor ${idx + 1}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent z-30"></div>
    </section>
  );
};

export default CheryHonorsParallax;