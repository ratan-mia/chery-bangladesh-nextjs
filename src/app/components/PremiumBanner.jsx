'use client'

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

/**
 * PremiumBanner - A highly reusable and customizable banner/slider component
 * 
 * @param {Object} props
 * @param {Array} props.slides - Array of slide objects with content details
 * @param {boolean} props.darkMode - Enable dark mode styling
 * @param {string} props.accentColor - Primary accent color (hex)
 * @param {number} props.transitionDuration - Slide transition duration in seconds
 * @param {number} props.autoplayInterval - Time between slide changes in milliseconds
 * @param {boolean} props.fullHeight - Whether to use full viewport height
 * @param {string|number} props.customHeight - Custom height value (e.g. '500px', '40vh')
 * @param {boolean} props.showControls - Show navigation controls
 * @param {boolean} props.showProgressBar - Show progress indicator
 * @param {string} props.overlayStyle - Overlay style ('dark', 'light', 'gradient', 'none')
 * @param {Function} props.onSlideChange - Callback when slide changes
 * @param {boolean} props.pauseOnHover - Pause autoplay on hover
 * @param {Object} props.textStyles - Custom text styling options
 * @param {Object} props.buttonStyles - Custom button styling options
 */
const PremiumBanner = ({
  // Content props
  slides = [],
  
  // Style props
  darkMode = true,
  accentColor = '#c00',
  transitionDuration = 0.6,
  autoplayInterval = 6000,
  
  // Layout props
  fullHeight = true,
  customHeight = '600px',
  showControls = true,
  showProgressBar = true,
  overlayStyle = 'gradient', // 'dark', 'light', 'gradient', 'none'
  
  // Interaction props
  onSlideChange = null,
  pauseOnHover = true,
  
  // Advanced styling props
  textStyles = {
    titleSize: 'text-4xl md:text-5xl lg:text-6xl',
    titleWeight: 'font-bold',
    titleSpacing: 'tracking-tight',
    subtitleSize: 'text-sm',
    subtitleStyle: 'tracking-wider font-medium',
    descriptionSize: 'text-lg md:text-xl',
    maxWidth: 'max-w-3xl',
  },
  
  buttonStyles = {
    style: 'default', // 'default', 'rounded', 'minimal'
    size: 'md', // 'sm', 'md', 'lg'
    hoverEffect: 'scale', // 'scale', 'bg', 'none'
  }
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // If no slides are provided, show nothing
  if (!slides || slides.length === 0) {
    return null;
  }
  
  // Autoplay functionality
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        const newIndex = (currentIndex + 1) % slides.length;
        setCurrentIndex(newIndex);
        if (onSlideChange && typeof onSlideChange === 'function') {
          onSlideChange(newIndex);
        }
      }, autoplayInterval);
      
      return () => clearInterval(interval);
    }
  }, [isPaused, slides.length, autoplayInterval, currentIndex, onSlideChange]);
  
  // Navigation functions
  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
    if (onSlideChange && typeof onSlideChange === 'function') {
      onSlideChange(newIndex);
    }
  };
  
  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
    if (onSlideChange && typeof onSlideChange === 'function') {
      onSlideChange(newIndex);
    }
  };
  
  const goToSlide = (index) => {
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
      transition: { 
        duration: transitionDuration,
        ease: "easeInOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: transitionDuration / 2,
        ease: "easeInOut"
      }
    }
  };
  
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: custom => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut",
        delay: custom * 0.1 + transitionDuration / 2
      }
    }),
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  // Helper to determine height style
  const heightStyle = fullHeight ? 'h-screen' : `h-[${customHeight}]`;

  // Helper for overlay style
  const getOverlayClasses = () => {
    switch (overlayStyle) {
      case 'dark':
        return 'bg-black/30 mix-blend-darken';
      case 'light':
        return 'bg-white/10 mix-blend-normal';
      case 'gradient':
        return 'bg-gradient-to-t from-black/60 via-transparent to-transparent';
      case 'none':
        return 'hidden';
      default:
        return 'bg-black/30 mix-blend-darken';
    }
  };

  // Helper for button styling
  const getButtonClasses = () => {
    let baseClasses = 'inline-flex items-center';
    
    // Size
    switch (buttonStyles.size) {
      case 'sm':
        baseClasses += ' px-4 py-2 text-sm';
        break;
      case 'lg':
        baseClasses += ' px-8 py-4 text-lg';
        break;
      case 'md':
      default:
        baseClasses += ' px-6 py-3';
        break;
    }
    
    // Style
    switch (buttonStyles.style) {
      case 'rounded':
        baseClasses += ' rounded-full';
        break;
      case 'minimal':
        baseClasses += ' border-b-2 px-1 py-1';
        break;
      case 'default':
      default:
        // Default is rectangle, no additional classes needed
        break;
    }
    
    // Text color based on dark mode
    baseClasses += darkMode ? ' text-white' : ' text-white';
    
    // Font style
    baseClasses += ' font-medium tracking-wide';
    
    // Hover effect
    switch (buttonStyles.hoverEffect) {
      case 'scale':
        baseClasses += ' transition-transform hover:scale-105';
        break;
      case 'bg':
        baseClasses += ' transition-colors hover:bg-opacity-80';
        break;
      case 'none':
      default:
        // No hover effect
        break;
    }
    
    return baseClasses;
  };

  return (
    <div 
      className={`relative overflow-hidden w-full ${heightStyle}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
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
            {/* Handle different image sources: URLs, Next.js images, or custom elements */}
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
            
            {/* Support custom content instead of just images */}
            {slides[currentIndex].customContent && (
              <div className="absolute inset-0">
                {slides[currentIndex].customContent}
              </div>
            )}
            
            {/* Gradient overlay for better text readability */}
            {overlayStyle !== 'none' && (
              <div className={`absolute inset-0 ${getOverlayClasses()}`}></div>
            )}
          </div>
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-20">
            <div className={textStyles.maxWidth || 'max-w-3xl'}>
              {/* Subtitle */}
              {slides[currentIndex].subtitle && (
                <motion.div
                  className="mb-2"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={1}
                >
                  <span 
                    className={`inline-block px-3 py-1 ${textStyles.subtitleSize || 'text-sm'} ${textStyles.subtitleStyle || 'tracking-wider font-medium'} ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`} 
                    style={{ backgroundColor: accentColor }}
                  >
                    {slides[currentIndex].subtitle}
                  </span>
                </motion.div>
              )}
              
              {/* Title */}
              {slides[currentIndex].title && (
                <motion.h2
                  className={`${textStyles.titleSize || 'text-4xl md:text-5xl lg:text-6xl'} ${textStyles.titleWeight || 'font-bold'} ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 ${textStyles.titleSpacing || 'tracking-tight'}`}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={2}
                >
                  {slides[currentIndex].title}
                </motion.h2>
              )}
              
              {/* Description */}
              {slides[currentIndex].description && (
                <motion.p
                  className={`${textStyles.descriptionSize || 'text-lg md:text-xl'} mb-8 ${darkMode ? 'text-gray-200' : 'text-gray-700'} max-w-2xl`}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={3}
                >
                  {slides[currentIndex].description}
                </motion.p>
              )}
              
              {/* CTA Button */}
              {slides[currentIndex].ctaText && slides[currentIndex].ctaLink && (
                <motion.div
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={4}
                >
                  <a 
                    href={slides[currentIndex].ctaLink}
                    style={{ 
                      backgroundColor: buttonStyles.style === 'minimal' ? 'transparent' : accentColor,
                      borderColor: accentColor,
                      borderBottomColor: buttonStyles.style === 'minimal' ? accentColor : 'transparent'
                    }}
                    className={getButtonClasses()}
                  >
                    {slides[currentIndex].ctaText}
                    
                    {/* Allow customizable arrow/icon */}
                    {slides[currentIndex].ctaIcon ? (
                      slides[currentIndex].ctaIcon
                    ) : (
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 ml-2" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    )}
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation Controls */}
      {showControls && slides.length > 1 && (
        <div className="absolute right-6 md:right-12 bottom-6 md:bottom-12 flex items-center gap-3 z-10">
          {/* Slide indicators */}
          <div className="flex gap-2 mr-4">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-white scale-125' : 'bg-white/40'}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Previous/Next buttons */}
          <button
            className="w-10 h-10 flex items-center justify-center border border-white/30 text-white hover:bg-white/10 transition-colors"
            onClick={prevSlide}
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
            className="w-10 h-10 flex items-center justify-center border border-white/30 text-white hover:bg-white/10 transition-colors"
            onClick={nextSlide}
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
        </div>
      )}
      
      {/* Progress bar */}
      {showProgressBar && slides.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <motion.div
            className="h-full"
            style={{ backgroundColor: accentColor }}
            initial={{ width: "0%" }}
            animate={{ 
              width: "100%",
              transition: {
                duration: autoplayInterval / 1000,
                ease: "linear",
                repeat: isPaused ? 0 : Infinity,
                repeatType: "loop"
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PremiumBanner;