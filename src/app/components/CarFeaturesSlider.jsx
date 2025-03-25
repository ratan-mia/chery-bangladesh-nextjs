'use client'

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const CarFeaturesSlider = ({ 
  // Content props
  features,
  
  // Styling props
  backgroundColor = "bg-white",
  textColor = "text-gray-700",
  accentColor = "bg-primary-700",
  accentTextColor = "text-blue-600",
  
  // Layout & behavior props
  slidesPerView = { 
    mobile: 1,
    tablet: 2,
    desktop: 3
  },
  aspectRatio = "aspect-video", // 16:9 aspect ratio
  autoplay = true,
  autoplaySpeed = 4000,
  showHeading = true,
  heading = "Vehicle Features",
  subtitle = "Experience premium design and functionality"
}) => {
  // Default features if none are provided
  const defaultFeatures = [
    {
      id: 1,
      image: "/images/tiggo8pro/features/pic01_01.jpg",
      title: "Dynamic LED Lighting",
      text: "Adaptive lighting system that automatically adjusts to driving conditions"
    },
    {
      id: 2,
      image: "/images/tiggo8pro/features/pic01_02.jpg",
      title: "Premium Alloy Wheels",
      text: "Lightweight aerodynamic design enhancing performance and efficiency"
    },
    {
      id: 3,
      image: "/images/tiggo8pro/features/pic01_03.jpg",
      title: "Signature Front Grille",
      text: "Distinctive design with premium finish for unmistakable presence"
    },
    {
      id: 4,
      image: "/images/tiggo8pro/features/pic01_01.jpg",
      title: "Panoramic Sunroof",
      text: "Full-length glass roof providing an enhanced sense of space and light"
    },
    {
      id: 5,
      image: "/images/tiggo8pro/features/pic01_02.jpg",
      title: "Advanced Infotainment",
      text: "Seamless connectivity with intuitive controls and premium audio"
    }
  ];

  const items = features || defaultFeatures;
  const totalItems = items.length;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [visibleItems, setVisibleItems] = useState(slidesPerView.desktop);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null);
  const autoplayTimerRef = useRef(null);
  
  // Responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(slidesPerView.mobile);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(slidesPerView.tablet);
      } else {
        setVisibleItems(slidesPerView.desktop);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [slidesPerView]);

  // Calculate max index based on visible items
  const maxIndex = Math.max(0, totalItems - visibleItems);

  // Autoplay functionality
  useEffect(() => {
    if (autoplay && !isPaused) {
      autoplayTimerRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => 
          prevIndex < maxIndex ? prevIndex + 1 : 0
        );
      }, autoplaySpeed);
    }
    
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [autoplay, autoplaySpeed, isPaused, maxIndex]);

  const nextSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex < maxIndex ? prevIndex + 1 : 0
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex > 0 ? prevIndex - 1 : maxIndex
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(Math.max(0, index), maxIndex));
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 70) {
      nextSlide();
    }
    if (touchEnd - touchStart > 70) {
      prevSlide();
    }
    setIsPaused(false);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Animation variants
  const sliderVariants = {
    animate: {
      x: `calc(-${currentIndex * (100 / visibleItems)}%)`,
      transition: {
        x: { type: "tween", ease: "easeInOut", duration: 0.6 }
      }
    }
  };

  // Simplified card animation for flat design
  const cardVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className={`w-full ${backgroundColor} py-12 px-4 md:px-8 lg:px-16 overflow-hidden`}>
      {/* Header section */}
      {showHeading && (
        <div className="max-w-7xl mx-auto mb-10">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={`text-2xl md:text-3xl font-semibold ${textColor} mb-2`}>
              {heading}
            </h2>
            <p className="text-gray-500 max-w-2xl">
              {subtitle}
            </p>
            <div className={`${accentColor} h-1 w-16 mt-4`}></div>
          </motion.div>
        </div>
      )}
      
      {/* Main slider container */}
      <div className="max-w-7xl mx-auto relative">
        {/* Top slider controls */}
        <div className="flex justify-between items-center mb-6">
          {/* Slide count indicator */}
          <div className="text-sm font-medium text-gray-500">
            <span className={accentTextColor}>{currentIndex + 1}</span>
            <span className="mx-1">/</span>
            <span>{maxIndex + 1}</span>
          </div>
          
          {/* Navigation controls */}
          <div className="flex items-center gap-1">
            <motion.button 
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 focus:outline-none"
              whileTap={{ scale: 0.95 }}
              aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
            >
              {isPaused ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              )}
            </motion.button>
            
            <motion.button 
              onClick={prevSlide}
              className="p-2 focus:outline-none"
              whileTap={{ scale: 0.95 }}
              aria-label="Previous slide"
              disabled={currentIndex === 0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={currentIndex === 0 ? "text-gray-300" : "text-gray-600"}>
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </motion.button>
            
            <motion.button 
              onClick={nextSlide}
              className="p-2 focus:outline-none"
              whileTap={{ scale: 0.95 }}
              aria-label="Next slide"
              disabled={currentIndex === maxIndex}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={currentIndex === maxIndex ? "text-gray-300" : "text-gray-600"}>
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </motion.button>
          </div>
        </div>
      
        {/* Progress bar */}
        <div className="h-0.5 bg-gray-100 w-full mb-6 relative">
          <motion.div 
            className={`h-full ${accentColor} absolute left-0 top-0`}
            initial={{ width: "0%" }}
            animate={{ 
              width: `${((currentIndex) / (maxIndex)) * 100}%` 
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        {/* Slider container */}
        <div 
          className="overflow-hidden"
          ref={sliderRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div 
            className="flex gap-6"
            variants={sliderVariants}
            animate="animate"
          >
            {items.map((feature, index) => (
              <AnimatePresence key={feature.id || index}>
                <motion.div 
                  className="flex-none"
                  style={{ width: `calc(${100 / visibleItems}% - ${(6 * (visibleItems - 1)) / visibleItems}rem)` }}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <div className="h-full">
                    {/* Image container */}
                    <div className={`relative w-full ${aspectRatio} mb-4 overflow-hidden`}>
                      <Image 
                        src={feature.image}
                        alt={feature.title || ''}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        priority={index < 3}
                      />
                    </div>
                    
                    {/* Text content */}
                    <div>
                      {feature.title && (
                        <h3 className={`${textColor} text-lg font-medium mb-2`}>
                          {feature.title}
                        </h3>
                      )}
                      {feature.text && (
                        <p className="text-gray-500 text-sm leading-relaxed">
                          {feature.text}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            ))}
          </motion.div>
        </div>
        
        {/* Slide indicator dots */}
        <div className="flex justify-center mt-8 gap-1.5">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-8 h-1 rounded-none transition-colors duration-300 ${currentIndex === index ? accentColor : 'bg-gray-200'}`}
              whileTap={{ scale: 0.95 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarFeaturesSlider;