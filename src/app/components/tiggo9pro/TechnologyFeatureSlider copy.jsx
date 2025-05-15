'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

/**
 * TechnologyFeatureSlider Component
 * A responsive slider showcasing Chery's intelligent technology features
 * Following the Chery Bangladesh design system guidelines
 */
const TechnologyFeatureSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [sliderWidth, setSliderWidth] = useState(0);
  const sliderRef = useRef(null);

  // Technology features data
  const features = [
    {
      id: 1,
      title: '15.6-inch HD screen + 10.25-inch instrument cluster',
      image: '/images/tiggo9pro/technology/1.jpg',
      alt: 'Chery vehicle dual screen display with HD resolution',
      description: 'Immersive digital experience with seamless connectivity and intuitive controls'
    },
    {
      id: 2,
      title: 'HD W-HUD',
      image: '/images/tiggo9pro/technology/2.jpg',
      alt: 'Chery vehicle heads-up display showing navigation and speed',
      description: 'Advanced heads-up display projects essential information onto windshield'
    },
    {
      id: 3,
      title: '8155 chip with high hashrate',
      image: '/images/tiggo9pro/technology/3.jpg',
      alt: 'Snapdragon 8155 processor chip powering Chery intelligent systems',
      description: 'Powerful processing ensures smooth operation of all smart features'
    },
    {
      id: 4,
      title: 'Smart Voice Assistant',
      image: '/images/tiggo9pro/technology/4.jpg',
      alt: 'Voice command interface in Chery vehicle',
      description: 'Natural language processing for hands-free control of vehicle functions'
    }
  ];

  // Calculate total slides and visible slides based on screen width
  const totalSlides = features.length;
  
  // Handle client-side mounting and resize events
  useEffect(() => {
    setIsMounted(true);
    
    const handleResize = () => {
      if (sliderRef.current) {
        setSliderWidth(sliderRef.current.offsetWidth);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate how many slides to show based on screen width
  const getVisibleSlides = () => {
    if (!isMounted) return 3; // Default for SSR
    
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };
  
  const visibleSlides = getVisibleSlides();

  // Navigation functions
  const nextSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex >= totalSlides - visibleSlides ? 0 : prevIndex + 1
    );
  };
  
  const prevSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex <= 0 ? totalSlides - visibleSlides : prevIndex - 1
    );
  };

  // Component animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };
  
  const dividerVariants = {
    hidden: { width: 0 },
    visible: { 
      width: '100%', 
      transition: { 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  // Slide animation variants
  const slideVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section 
      className="w-full py-16 md:py-20 bg-[#7d6653]"
      id="technology-features"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col"
          >
            <motion.h2 
              variants={titleVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3"
            >
              LEADING
              <br />
              <span className="text-primary-light">INTELLIGENT TECHNOLOGY</span>
            </motion.h2>
            
            <motion.div 
              variants={dividerVariants}
              className="h-0.5 bg-primary-light/70 w-full max-w-xs mb-8"
            />
            
            <motion.p 
              variants={titleVariants}
              custom={1}
              className="text-white/90 max-w-xl text-base md:text-lg"
            >
              Experience the future of driving with Chery's cutting-edge intelligent technology suite, 
              designed to enhance safety, connectivity, and convenience.
            </motion.p>
          </motion.div>
        </div>
        
        {/* Slider container */}
        <div className="relative" ref={sliderRef}>
          {/* Slider track */}
          <div className="overflow-hidden">
            <motion.div 
              className="flex"
              initial={false}
              animate={{
                x: isMounted ? `-${currentIndex * (100 / visibleSlides)}%` : 0
              }}
              transition={{
                x: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
              }}
              style={{
                width: `${(totalSlides / visibleSlides) * 100}%`
              }}
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.id}
                  className="px-2 sm:px-3 md:px-4"
                  style={{ width: `${100 / totalSlides}%` }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-10%" }}
                  variants={slideVariants}
                  custom={index}
                >
                  <div className="group h-full flex flex-col">
                    {/* Feature image container */}
                    <div className="relative aspect-[4/3] overflow-hidden mb-5">
                      <Image
                        src={feature.image}
                        alt={feature.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-primary-900/20 group-hover:bg-primary-900/0 transition-all duration-500"></div>
                    </div>
                    
                    {/* Feature title */}
                    <h3 className="text-white text-lg md:text-xl font-medium mb-3">
                      {feature.title}
                    </h3>
                    
                    {/* Bottom accent line that fills on hover */}
                    <div className="h-0.5 w-full bg-white/20 mt-auto">
                      <div className="h-full bg-primary-light w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Navigation arrows */}
          <div className="flex justify-between mt-8">
            <div className="w-full h-px bg-white/20">
              <div 
                className="h-full bg-primary-light" 
                style={{ width: `${(currentIndex / (totalSlides - visibleSlides)) * 100}%` }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <div className="flex gap-2 ml-6">
              <button 
                onClick={prevSlide}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border border-white/20 text-white/80 hover:border-primary-light hover:text-primary-light transition-all duration-300"
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <button 
                onClick={nextSlide}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border border-white/20 text-white/80 hover:border-primary-light hover:text-primary-light transition-all duration-300"
                aria-label="Next slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyFeatureSlider;