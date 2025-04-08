import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
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
  
  // Refined parallax effects with gentler values for better readability
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], ['2%', '0%', '-3%']);
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
    }, 6000); // Slightly longer delay for better readability
    
    return () => clearInterval(interval);
  }, []);
  
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
          
          {/* Strong background overlay for maximum contrast and visibility */}
          <div className="absolute inset-0 bg-black/70 z-10"></div>
          
          {/* Improved gradient overlay on top of black for visual interest */}
          <div className="absolute inset-0 bg-gradient-to-r from-brown-950/80 via-brown-900/50 to-transparent z-20"></div>
          
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-[url('/images/pattern-dot.png')] opacity-10 mix-blend-soft-light z-30"></div>
        </div>
      </motion.div>
      
      {/* Content Layout */}
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            className="relative z-40 h-full w-full flex items-center"
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
                <div className="lg:col-span-2 lg:pr-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-black/50 backdrop-blur-sm p-6 md:p-8 rounded-sm border-l-4 border-primary"
                  >
                    <div className="w-16 h-1 bg-primary mb-6"></div>
                    
                    <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                      <span className="block text-shadow">Chery</span>
                      <span className="block text-primary mt-1 text-shadow">Honors</span>
                    </h2>
                    
                    <p className="text-white text-lg mb-8 max-w-lg leading-relaxed">
                      Since 1997, Chery has been recognized globally for innovation, quality, 
                      and excellence in the automotive industry.
                    </p>
                    
                    {/* Stats row with enhanced visibility */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {stats.map((stat, index) => (
                        <motion.div 
                          key={stat.label}
                          className="text-center p-3 md:p-4 bg-black/40 rounded-sm border border-primary/30"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                          whileHover={{ scale: 1.03, backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                        >
                          <span className="block text-primary text-3xl font-bold">{stat.value}</span>
                          <span className="text-white text-sm font-medium">{stat.label}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.div 
                      className="flex flex-wrap gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <Link href="/achievements" legacyBehavior>
                        <a className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-sm font-medium transition-colors flex items-center group">
                          <span>View All Achievements</span>
                          <motion.svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="18" 
                            height="18" 
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
                
                {/* Right Column - Honors Cards */}
                <div className="lg:col-span-3 relative">
                  {/* Vertical line decorator */}
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0 hidden lg:block"></div>
                  
                  {/* Honors showcase with improved visibility */}
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
                        <div className="bg-black/60 backdrop-blur-md border border-primary/20 p-8 rounded-sm shadow-lg">
                          <div className="flex flex-col md:flex-row md:items-center mb-6 gap-3">
                            <span className="bg-primary/50 text-white text-sm py-1.5 px-4 rounded-sm font-medium inline-block">
                              {honor.year}
                            </span>
                            <span className="text-brown-200 text-sm inline-block">Achievement {index + 1} of {honors.length}</span>
                          </div>
                          
                          <h3 className="text-white text-2xl md:text-3xl font-bold mb-4 text-shadow-sm">
                            {honor.title}
                          </h3>
                          
                          <p className="text-white text-base md:text-lg mb-8 leading-relaxed">
                            {honor.description}
                          </p>
                          
                          <div className="flex justify-between items-center">
                            <Link href={honor.link || "#"} legacyBehavior>
                              <a className="text-primary hover:text-primary-light flex items-center transition-colors group">
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
                            
                            {/* Line indicators instead of dots */}
                            <div className="flex space-x-2">
                              {honors.map((_, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setActiveHonor(idx)}
                                  className={`h-1 transition-all duration-300 ${
                                    activeHonor === idx ? 'w-8 bg-primary' : 'w-4 bg-gray-500'
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
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent z-50"></div>
    </section>
  );
};

export default CheryHonorsParallax;