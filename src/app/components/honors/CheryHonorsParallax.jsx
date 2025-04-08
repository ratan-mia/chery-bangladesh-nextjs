import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

const CheryHonorsParallax = () => {
  const sectionRef = useRef(null);
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeHonor, setActiveHonor] = useState(0);
  
  // Enhanced scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Refined parallax effects with gentler values for better readability
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], ['2%', '0%', '-3%']);
  const opacityContent = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Window size calculation for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
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

  // Auto-rotate through honors with responsive timing (slower on mobile)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHonor((prev) => (prev + 1) % honors.length);
    }, windowWidth < 768 ? 8000 : 6000); // Longer delay on mobile for better readability
    
    return () => clearInterval(interval);
  }, [windowWidth]);
  
  // Honors data
  const honors = [
    {
      id: 1,
      title: "FORTUNE GLOBAL 500",
      year: "2024",
      description: "Chery Group achieves first-time entry into Fortune Global 500, ranking 385th",
      link: "/honors/fortune-500"
    },
    {
      id: 2,
      title: "BRANDZ RECOGNITION",
      year: "2024",
      description: "Awarded as the sole winner in the automotive industry for pioneering Chinese global brand",
      link: "/honors/brandz"
    },
    {
      id: 3,
      title: "GLOBAL EXPANSION",
      year: "2023",
      description: "Expanded to over 80 countries, affirming Chery's growing international market presence",
      link: "/honors/global-expansion"
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
          
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-brown-950/90 via-brown-900/75 to-brown-900/60 z-10"></div>
          
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-[url('/images/pattern-dot.png')] opacity-10 mix-blend-soft-light z-10"></div>
        </div>
      </motion.div>
      
      {/* Content Layout with responsive padding */}
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            className="relative z-20 min-h-screen w-full flex items-center py-16 md:py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="container mx-auto px-4 sm:px-6 md:px-8">
              <motion.div
                className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-center"
                style={{ y: contentY, opacity: opacityContent }}
              >
                {/* Left Column - Title and Stats (Full width on mobile, 5 cols on desktop) */}
                <div className="lg:col-span-5 lg:pr-4 order-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-black/55 backdrop-blur-sm p-6 sm:p-8 rounded-md shadow-xl"
                  >
                    <div className="w-12 sm:w-16 h-1 bg-primary mb-4 sm:mb-6"></div>
                    
                    <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                      <span className="block text-shadow">Chery</span>
                      <span className="block text-primary mt-1 text-shadow">Honors</span>
                    </h2>
                    
                    <p className="text-white text-base sm:text-lg mb-6 sm:mb-8 max-w-lg leading-relaxed">
                      Since 1997, Chery has been recognized globally for innovation, quality, 
                      and excellence in the automotive industry.
                    </p>
                    
                    {/* Stats row with responsive grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                      {stats.map((stat, index) => (
                        <motion.div 
                          key={stat.label}
                          className="text-center p-3 sm:p-4 bg-black/40 rounded-md border-t-2 border-primary/40"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                          whileHover={{ scale: 1.03, borderTopColor: "rgba(172, 145, 118, 0.8)" }}
                        >
                          <span className="block text-primary text-2xl sm:text-3xl font-bold">{stat.value}</span>
                          <span className="text-white text-xs sm:text-sm font-medium">{stat.label}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="flex justify-center sm:justify-start"
                    >
                      <Link href="/achievements" legacyBehavior>
                        <a className="bg-primary hover:bg-primary-dark text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-md font-medium transition-colors inline-flex items-center group text-sm sm:text-base">
                          <span>View All Achievements</span>
                          <motion.svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                          >
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                          </motion.svg>
                        </a>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
                
                {/* Right Column - Honors Cards (Full width on mobile, 7 cols on desktop) */}
                <div className="lg:col-span-7 relative order-2 min-h-[350px] sm:min-h-[380px]">
                  {/* Honors showcase with improved visibility */}
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
                      <div className="bg-black/50 backdrop-blur-md p-5 sm:p-6 md:p-8 rounded-md shadow-xl border-l-4 border-primary h-full">
                        <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                          <span className="bg-primary text-white text-xs sm:text-sm py-1 sm:py-1.5 px-3 sm:px-4 rounded-md font-medium inline-block">
                            {honor.year}
                          </span>
                          <span className="bg-white/10 text-white text-xs sm:text-sm py-1 sm:py-1.5 px-3 sm:px-4 rounded-md inline-block">
                            {index + 1} of {honors.length}
                          </span>
                        </div>
                        
                        <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-shadow-sm">
                          {honor.title}
                        </h3>
                        
                        <p className="text-white text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
                          {honor.description}
                        </p>
                        
                        <div className="flex flex-wrap justify-between items-center gap-3 sm:gap-4 mt-auto">
                          <Link href={honor.link || "#"} legacyBehavior>
                            <a className="text-primary hover:text-primary-light flex items-center transition-colors group bg-black/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-sm sm:text-base">
                              <span className="font-medium">Read more</span>
                              <motion.svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="16" 
                                height="16" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                              >
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                              </motion.svg>
                            </a>
                          </Link>
                          
                          {/* Line indicators - responsive size */}
                          <div className="flex gap-1.5 sm:gap-2">
                            {honors.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setActiveHonor(idx)}
                                className={`h-1 sm:h-1.5 rounded-none transition-all duration-300 ${
                                  activeHonor === idx ? 'w-6 sm:w-10 bg-primary' : 'w-3 sm:w-5 bg-white/30'
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
                
                {/* Mobile navigation controls - only visible on smaller screens */}
                <div className="order-3 w-full flex justify-center lg:hidden mt-4">
                  <div className="flex gap-3 items-center">
                    <button
                      onClick={() => setActiveHonor((prev) => (prev > 0 ? prev - 1 : honors.length - 1))}
                      className="bg-black/40 rounded-full p-2 text-white"
                      aria-label="Previous honor"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                    
                    <div className="flex gap-1.5">
                      {honors.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveHonor(idx)}
                          className={`h-1.5 rounded-none transition-all duration-300 ${
                            activeHonor === idx ? 'w-8 bg-primary' : 'w-4 bg-white/30'
                          }`}
                          aria-label={`View honor ${idx + 1}`}
                        />
                      ))}
                    </div>
                    
                    <button
                      onClick={() => setActiveHonor((prev) => (prev < honors.length - 1 ? prev + 1 : 0))}
                      className="bg-black/40 rounded-full p-2 text-white"
                      aria-label="Next honor"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
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