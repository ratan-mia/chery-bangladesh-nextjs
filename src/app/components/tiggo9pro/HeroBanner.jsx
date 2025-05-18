'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const Tiggo9MainBanner = () => {
  const [scrollY, setScrollY] = useState(0);
  const bannerRef = useRef(null);
  
  // Handle parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] // Smooth ease-out that feels premium
      }
    }
  };
  
  const taglineVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        delay: 0.3, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <section 
      ref={bannerRef}
      className="relative w-full h-screen max-h-[950px] overflow-hidden"
    >
      {/* Dynamic Background Image with Parallax */}
      <div 
        className="absolute inset-0"
        style={{ 
          transform: `translateY(${scrollY * 0.15}px)`,
          transition: 'transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)'
        }}
      >
        <Image
          src="/images/tiggo9pro/hero-banner.jpg"
          alt="Chery Tiggo 9 Pro with family at luxury beachfront residence"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={95}
        />
        
        {/* Refined gradient overlay for optimal text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
      </div>
      
      {/* Content Container with Parallax Offset */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ 
          transform: `translateY(${scrollY * -0.1}px)`,
          transition: 'transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)'
        }}
      >
        <div className="text-center px-4">
          {/* Main Title with Animation */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={titleVariants}
            className="mb-3"
          >
            <h1 className="text-5xl sm:text-7xl md:text-7xl font-bold text-white tracking-tight">
              TIGGO <span className="text-white">9PRO</span>
            </h1>
          </motion.div>
          
          {/* Animated Divider Line */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '100px', opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="h-0.5 bg-primary-light mx-auto mb-4"
          />
          
          {/* Tagline */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={taglineVariants}
            className="text-white text-lg sm:text-xl md:text-2xl tracking-[0.3em] uppercase font-light"
          >
            ONE STEP AHEAD
          </motion.p>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8"
          >
            <a 
              href="#exterior-features" 
              className="inline-flex items-center px-8 py-3 bg-primary-700 hover:bg-primary-900 text-white text-sm uppercase tracking-wider font-medium transition-all duration-300 group"
            >
              Discover More
              <ChevronDown 
                size={16} 
                className="ml-2 transform group-hover:translate-y-1 transition-transform duration-300" 
              />
            </a>
          </motion.div>
        </div>
      </div>
      

      
      {/* Subtle Brand Mark */}
      {/* <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute top-8 left-8"
      >
        <Image 
          src="/images/chery-logo-white.png" 
          alt="Chery" 
          width={100} 
          height={40}
          className="h-6 w-auto"
        />
      </motion.div> */}
    </section>
  );
};

export default Tiggo9MainBanner;