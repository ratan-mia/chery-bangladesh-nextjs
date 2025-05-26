'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Enhanced Chery Brand Masonry Slider
 * Strictly follows Chery Bangladesh Design System Guidelines
 * Features elegant minimalism, warm neutral palette, and premium interactions
 */

// Vehicle data with enhanced content structure and more images
const vehicleData = [
  {
    id: 1,
    images: [
      {
        src: '/images/masonary/1/001-2.png',
        alt: 'TIGGO 8 PRO - Premium 7-Seater SUV',
      },
      {
        src: '/images/masonary/1/002-2.png',
        alt: 'Illuminating Chery Front Logo',
      },
      {
        src: '/images/masonary/1/003-2.png',
        alt: '19" Aluminium Alloy Rim Wheels',
      },
      {
        src: '/images/masonary/1/004-2.png',
        alt: 'LED Headlights with DRL',
      },
      {
        src: '/images/masonary/1/001-2.png',
        alt: 'Panoramic Power Sunroof',
      },
      {
        src: '/images/masonary/1/002-2.png',
        alt: 'Premium Interior Design',
      },
      {
        src: '/images/masonary/1/003-2.png',
        alt: 'Advanced Safety Features',
      },
      {
        src: '/images/masonary/1/004-2.png',
        alt: 'Sporty Exterior Profile',
      },
    ],
    content: {
      title: 'TIGGO 8 PRO',
      subtitle: 'PREMIUM 7-SEATER SUV',
      description: 'The Tiggo 8 Pro represents the pinnacle of luxury and sophistication. Its diamond-shaped front grille and illuminated logo create an unmistakable presence that commands attention on every journey.',
      highlights: [
        '1.6L Turbocharged Engine with 195 BHP',
        'Advanced CVT Transmission',
        '207mm Ground Clearance',
        'Premium LED Lighting System'
      ],
      specs: [
        { name: 'Engine', value: '1.6L Turbo' },
        { name: 'Power', value: '195 BHP' },
        { name: 'Torque', value: '290Nm' },
        { name: 'Seats', value: '7 Seater' }
      ],
      ctaLink: '/models/tiggo8pro'
    }
  },
  {
    id: 2,
    images: [
      {
        src: '/images/masonary/2/0081.png',
        alt: 'TIGGO CROSS - Ultimate Crossover',
      },
      {
        src: '/images/masonary/2/0082.png',
        alt: 'Starry Diamond-Shaped Grille',
      },
      {
        src: '/images/masonary/2/0083.png',
        alt: 'Dual 12.3-inch LCD Screens',
      },
      {
        src: '/images/masonary/2/0084.png',
        alt: 'Panoramic Sunroof Interior',
      },
      {
        src: '/images/masonary/2/0081.png',
        alt: 'Tiggo Cross Profile View',
      },
      {
        src: '/images/masonary/2/0082.png',
        alt: 'Sophisticated Dashboard',
      },
      {
        src: '/images/masonary/2/0083.png',
        alt: 'Premium Leather Seats',
      },
      {
        src: '/images/masonary/2/0084.png',
        alt: 'Advanced Technology Suite',
      },
    ],
    content: {
      title: 'TIGGO CROSS',
      subtitle: 'DYNAMIC CROSSOVER',
      description: 'Experience absolute luxury with hand-stitched leather upholstery and sophisticated ambient lighting. The Tiggo Cross delivers first-class comfort with distinctive biomimetic design elements.',
      highlights: [
        'Biomimetic Tiger Face Design',
        'Tiger Claw Style Headlights',
        'Comprehensive 7 Airbag System',
        '6-Speaker Sony Audio System'
      ],
      specs: [
        { name: 'Display', value: '10.25" LCD' },
        { name: 'Audio', value: '6-Speaker' },
        { name: 'Safety', value: '7 Airbags' },
        { name: 'Colors', value: '4 Options' }
      ],
      ctaLink: '/models/tiggocross'
    }
  },
  {
    id: 3,
    images: [
      {
        src: '/images/masonary/3/1.jpg',
        alt: 'TIGGO 9 PRO - Hybrid SUV Power',
      },
      {
        src: '/images/masonary/3/2.jpg',
        alt: 'Intelligent Cabin with 15.6" 2.5K Screen',
      },
      {
        src: '/images/masonary/3/3.jpg',
        alt: 'Luxury 7-Seater Interior Comfort',
      },
      {
        src: '/images/masonary/3/4.jpg',
        alt: 'Five-Star Safety Structure',
      },
      {
        src: '/images/tiggo9pro/safety/airbag-system.jpg',
        alt: '10 Airbags Safety System',
      },
      {
        src: '/images/tiggo9pro/safety/adas.jpg',
        alt: '19 ADAS Functions',
      },
      {
        src: '/images/tiggo9pro/power.jpg',
        alt: 'Tiger-Eye Diamond Grille Design',
      },
      {
        src: '/images/tiggo9pro/cabin-banner.jpg',
        alt: '20-inch Alloy Rims',
      },
    ],
    content: {
      title: 'TIGGO 9 PRO',
      subtitle: 'HYBRID INTELLIGENT SUV',
      description: 'Experience breathtaking acceleration and responsive handling with our advanced hybrid powertrain technology. The Tiggo 9 Pro combines massive power with intelligent features for the ultimate driving experience.',
      highlights: [
        '1.5TGDI+3DHT Hybrid System with 455kW Power',
        '15.6" 2.5K HD Screen with 90% Screen-to-Body Ratio',
        '19 ADAS Functions for Intelligent Driving',
        'Global Five-Star Security Standard with 10 Airbags'
      ],
      specs: [
        { name: 'Engine', value: '1.5L TGDI' },
        { name: 'Total Power', value: '455kW' },
        { name: 'Total Torque', value: '920Nm' },
        { name: 'Acceleration', value: '5.7s (0-100)' }
      ],
      ctaLink: '/models/tiggo9pro'
    }
  }
];

// Design system compliant animation variants
const animations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.7,
      },
    },
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  },
  image: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      },
    }),
  },
  text: {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + (i * 0.1),
        duration: 0.5
      }
    })
  }
};

export default function CheryBrandMasonrySlider({
  showNavigation = true,
  autoplayDuration = 6000,
  className = ''
}) {
  // State management
  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Refs
  const progressIntervalRef = useRef(null);
  const autoplayTimeoutRef = useRef(null);

  // Progress and autoplay management
  const resetProgress = useCallback(() => {
    setSlideProgress(0);
    clearInterval(progressIntervalRef.current);
    clearTimeout(autoplayTimeoutRef.current);

    if (!isPaused) {
      // Start progress animation
      progressIntervalRef.current = setInterval(() => {
        setSlideProgress(prev => {
          const increment = 100 / (autoplayDuration / 100);
          const newProgress = prev + increment;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 100);

      // Set autoplay timeout
      autoplayTimeoutRef.current = setTimeout(() => {
        if (!isPaused) {
          nextSlide();
        }
      }, autoplayDuration);
    }
  }, [autoplayDuration, isPaused]);

  // Navigation functions
  const goToSlide = useCallback((index) => {
    if (isTransitioning || index === activeIndex) return;
    
    setIsTransitioning(true);
    setActiveIndex(index);
    resetProgress();
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  }, [activeIndex, isTransitioning, resetProgress]);

  const nextSlide = useCallback(() => {
    const nextIndex = (activeIndex + 1) % vehicleData.length;
    goToSlide(nextIndex);
  }, [activeIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    const prevIndex = activeIndex === 0 ? vehicleData.length - 1 : activeIndex - 1;
    goToSlide(prevIndex);
  }, [activeIndex, goToSlide]);

  // Pause/resume autoplay
  const togglePause = useCallback(() => {
    setIsPaused(prev => {
      const newState = !prev;
      if (newState) {
        clearInterval(progressIntervalRef.current);
        clearTimeout(autoplayTimeoutRef.current);
      } else {
        resetProgress();
      }
      return newState;
    });
  }, [resetProgress]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        prevSlide();
        break;
      case 'ArrowRight':
        e.preventDefault();
        nextSlide();
        break;
      case ' ':
      case 'Spacebar':
        e.preventDefault();
        togglePause();
        break;
    }
  }, [prevSlide, nextSlide, togglePause]);

  // Mount and cleanup effects
  useEffect(() => {
    setIsMounted(true);
    resetProgress();

    // Add keyboard listener
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(progressIntervalRef.current);
      clearTimeout(autoplayTimeoutRef.current);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [resetProgress, handleKeyDown]);

  // Reset progress when dependencies change
  useEffect(() => {
    if (isMounted) {
      resetProgress();
    }
  }, [activeIndex, isPaused, autoplayDuration, resetProgress, isMounted]);

  if (!isMounted) {
    return null; // Prevent hydration mismatch
  }

  const currentVehicle = vehicleData[activeIndex];

  return (
    <section 
      className={`relative w-full bg-gray-100 overflow-hidden ${className}`}
      role="region"
      aria-label="Vehicle Showcase"
      aria-roledescription="carousel"
    >
      {/* Enhanced Controls */}
      <div className="absolute top-6 right-6 z-30 flex items-center space-x-3">
        {/* Autoplay toggle */}
        <motion.button
          onClick={togglePause}
          className="bg-white/90 backdrop-blur-sm border border-gray-200 p-3 rounded-full shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-700"
          aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPaused ? (
            <Play size={16} className="text-primary-900" />
          ) : (
            <Pause size={16} className="text-primary-900" />
          )}
        </motion.button>

        {/* Progress indicator */}
        <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm border border-gray-200 px-3 py-2 rounded-full shadow-sm">
          <span className="text-xs font-medium text-gray-900">
            {String(activeIndex + 1).padStart(2, '0')} / {String(vehicleData.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentVehicle.id}
          className="grid lg:grid-cols-12 min-h-[70vh] lg:min-h-[80vh]"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={animations.container}
        >
          {/* Content Section - 4 columns (Left) */}
          <motion.div
            className="lg:col-span-4 bg-primary-600 p-8 md:p-12 lg:p-16 flex flex-col justify-center order-1 lg:order-1"
            variants={animations.item}
          >
            <motion.div variants={animations.text} custom={0}>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 rounded">
                <span className="text-white font-bold text-lg">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
              </div>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
              variants={animations.text}
              custom={1}
            >
              {currentVehicle.content.title}
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-primary-light font-medium mb-6"
              variants={animations.text}
              custom={2}
            >
              {currentVehicle.content.subtitle}
            </motion.p>

            <motion.div
              className="w-24 h-1 bg-white mb-8"
              variants={animations.text}
              custom={3}
            />

            <motion.p
              className="text-white/90 mb-8 leading-normal"
              variants={animations.text}
              custom={4}
            >
              {currentVehicle.content.description}
            </motion.p>

            {/* Feature highlights */}
            <motion.div className="mb-8" variants={animations.text} custom={5}>
              <ul className="space-y-3">
                {currentVehicle.content.highlights.map((highlight, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start text-white/80"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + (index * 0.1), duration: 0.3 }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* CTA Button */}
            <motion.a
              href={currentVehicle.content.ctaLink}
              className="group inline-flex items-center px-8 py-4 bg-white text-primary-900 font-medium hover:bg-primary-light hover:text-primary-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-800"
              variants={animations.text}
              custom={6}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              LEARN MORE
              <svg 
                className="ml-2 group-hover:ml-3 transition-all duration-300" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </motion.a>
          </motion.div>

          {/* Image Grid - 8 columns (Right) - 2×2 Grid */}
          <motion.div
            className="lg:col-span-8 grid grid-cols-2 grid-rows-2 order-2 lg:order-2"
            variants={animations.item}
          >
            {currentVehicle.images.slice(0, 4).map((image, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden group"
                variants={animations.image}
                custom={index}
                onMouseEnter={() => setHoveredSection(`image-${index}`)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <div className="relative w-full h-full min-h-[35vh] lg:min-h-[40vh]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 40vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Hover overlay */}
                  <AnimatePresence>
                    {hoveredSection === `image-${index}` && (
                      <motion.div
                        className="absolute inset-0 bg-primary-900/60 flex items-end"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.p
                          className="text-white text-sm font-medium p-4"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          {image.alt}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Bar */}
      {showNavigation && (
        <motion.div
          className="bg-white border-t border-gray-200 py-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              {/* Model tabs */}
              <div className="flex space-x-8">
                {vehicleData.map((vehicle, index) => (
                  <button
                    key={vehicle.id}
                    onClick={() => goToSlide(index)}
                    className={`group relative flex flex-col items-start transition-all duration-300 ${
                      activeIndex === index ? 'opacity-100' : 'opacity-60 hover:opacity-80'
                    }`}
                    disabled={isTransitioning}
                    aria-label={`View ${vehicle.content.title}`}
                    aria-current={activeIndex === index ? "true" : "false"}
                  >
                    <span className="text-lg font-bold text-gray-900 mb-1">
                      {vehicle.content.title}
                    </span>
                    <span className="text-sm text-gray-600 mb-3">
                      {vehicle.content.subtitle}
                    </span>
                    
                    {/* Progress bar */}
                    <div className="w-full h-1 bg-gray-200 rounded-full">
                      {activeIndex === index && (
                        <motion.div
                          className="h-full bg-primary-700 rounded-full"
                          initial={{ width: '0%' }}
                          animate={{ width: `${slideProgress}%` }}
                          transition={{ duration: 0.1, ease: "linear" }}
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Specifications */}
              <div className="hidden md:flex items-center space-x-8">
                {currentVehicle.content.specs.map((spec, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + (index * 0.1) }}
                  >
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      {spec.name}
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      {spec.value}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Navigation arrows */}
              <div className="flex items-center space-x-3">
                <motion.button
                  onClick={prevSlide}
                  className="w-12 h-12 border-2 border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:border-primary-700 hover:text-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-700"
                  disabled={isTransitioning}
                  aria-label="Previous vehicle"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft size={18} />
                </motion.button>
                
                <motion.button
                  onClick={nextSlide}
                  className="w-12 h-12 border-2 border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:border-primary-700 hover:text-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-700"
                  disabled={isTransitioning}
                  aria-label="Next vehicle"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight size={18} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Slide ${activeIndex + 1} of ${vehicleData.length}: ${currentVehicle.content.title}`}
      </div>
    </section>
  );
}