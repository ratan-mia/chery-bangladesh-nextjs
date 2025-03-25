'use client'

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

/**
 * SimpleBanner - A clean, professional banner/slider component with centered content
 * 
 * @param {Object} props
 * @param {Array} props.slides - Array of slide objects with content details
 * @param {string} props.accentColor - Primary accent color (hex)
 * @param {number} props.autoplayInterval - Time between slide changes in milliseconds
 * @param {boolean} props.showControls - Show navigation controls
 * @param {string|number} props.height - Custom height value
 * @param {Function} props.onSlideChange - Callback when slide changes
 */
const SimpleBanner = ({
  slides = [],
  accentColor = '#3498db',
  autoplayInterval = 5000,
  height = '800px',
  showControls = true,
  showContents =false,
  onSlideChange = null,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Return null if no slides
  if (!slides || slides.length === 0) return null;
  
  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (currentIndex + 1) % slides.length;
      setCurrentIndex(newIndex);
      if (onSlideChange && typeof onSlideChange === 'function') {
        onSlideChange(newIndex);
      }
    }, autoplayInterval);
    
    return () => clearInterval(interval);
  }, [slides.length, autoplayInterval, currentIndex, onSlideChange]);
  
  // Navigation functions
  const handleSlideChange = (index) => {
    setCurrentIndex(index);
    if (onSlideChange && typeof onSlideChange === 'function') {
      onSlideChange(index);
    }
  };
  
  // Animation variants
  const slideVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeInOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };
  
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.3 }
    },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="relative overflow-hidden w-full" style={{ height }}>
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIndex}
          className="absolute inset-0"
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="relative w-full h-full">
            {/* Background Image */}
            {slides[currentIndex].image && (
              <Image
                src={slides[currentIndex].image}
                alt={slides[currentIndex].title || ''}
                fill
                priority
                className="object-cover"
                sizes="100vw"
                quality={90}
              />
            )}
            
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          
          {/* Centered Content */}
          
          {showContents && <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <motion.div
              className="max-w-4xl px-4"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Title */}
              {slides[currentIndex].title && (
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
                  {slides[currentIndex].title}
                </h2>
              )}
              
              {/* Description */}
              {slides[currentIndex].description && (
                <p className="text-xl md:text-2xl text-white mb-12">
                  {slides[currentIndex].description}
                </p>
              )}
              
              {/* Single Action Button */}
              {slides[currentIndex].ctaText && slides[currentIndex].ctaLink && (
                <a 
                  href={slides[currentIndex].ctaLink}
                  className="inline-flex items-center px-8 py-4 text-lg font-medium text-white rounded-md transition-transform hover:scale-105 shadow-lg"
                  style={{ backgroundColor: accentColor }}
                >
                  {slides[currentIndex].ctaText}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              )}
            </motion.div>
          </div>
            }


        </motion.div>
      </AnimatePresence>
      
      {/* Navigation Controls */}
      {showControls && slides.length > 1 && (
        <>
          {/* Left/Right Arrows - Simplified and more professional */}
          <button
            className="absolute left-8 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-colors border border-white/20"
            onClick={() => handleSlideChange((currentIndex - 1 + slides.length) % slides.length)}
            aria-label="Previous slide"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            className="absolute right-8 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-colors border border-white/20"
            onClick={() => handleSlideChange((currentIndex + 1) % slides.length)}
            aria-label="Next slide"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Slide indicators - Clean and minimal */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-white w-6' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                onClick={() => handleSlideChange(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SimpleBanner;