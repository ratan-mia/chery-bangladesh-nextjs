import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const EnvironmentalParallax = () => {
  const sectionRef = useRef(null);
  const [windowHeight, setWindowHeight] = useState(0);
  
  // Update window height for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    
    handleResize(); // Initial setup
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values for parallax elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const titleY = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '-10%', '-20%']);
  const subtitleY = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '-5%', '-15%']);
  const opacityOverlay = useTransform(scrollYProgress, [0, 0.8], [0.2, 0.4]);
  
  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ 
        height: `${Math.max(windowHeight, 600)}px`,
        minHeight: '100vh'
      }}
    >
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ y: backgroundY }}
      >
        <Image
          src="/images/environment/beach-aerial.jpg" // Update with your actual image path
          alt="Pristine beach landscape"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover"
        />
        
        {/* Gradient overlay using brand colors */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-primary-900/30 via-transparent to-primary-800/40"
          style={{ opacity: opacityOverlay }}
        />
      </motion.div>
      
      {/* Content Container */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 sm:px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Title with Parallax */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
            style={{ y: titleY }}
          >
            ENVIRONMENTAL PROTECTION
          </motion.h1>
          
          {/* Subtitle with Parallax */}
          <motion.div
            className="text-lg sm:text-xl md:text-2xl text-white leading-relaxed"
            style={{ y: subtitleY }}
          >
            <p>
              Chery is Dedicated to Protecting Our Shared Home
              <br />and Building a Greener Future.
            </p>
          </motion.div>
          
          {/* Button using primary brand color */}
          <motion.div 
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <a 
              href="#learn-more" 
              className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-700 text-white font-medium rounded-md transition-colors duration-300 group"
            >
              Our Initiatives
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom wave transition */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#ffffff" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0,96L80,80C160,64,320,32,480,32C640,32,800,64,960,74.7C1120,85,1280,75,1360,69.3L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default EnvironmentalParallax;