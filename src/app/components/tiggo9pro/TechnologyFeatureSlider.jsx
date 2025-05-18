'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/**
 * TechnologyFeatureSlider Component
 * A premium responsive slider showcasing Chery's intelligent technology features
 * Following the Chery Bangladesh design system guidelines
 */
const TechnologyFeatureSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const sliderRef = useRef(null);
  const autoplayRef = useRef(null);

  // Technology features data
  const features = [
    {
      id: 1,
      title: '15.6-inch HD screen + 10.25-inch instrument cluster',
      image: '/images/tiggo9pro/technology/1.jpg',
      alt: 'Chery vehicle dual screen display with HD resolution',
      description: 'Immersive dual display system delivers crystal-clear information and entertainment with intuitive touch controls.'
    },
    {
      id: 2,
      title: 'HD W-HUD',
      image: '/images/tiggo9pro/technology/2.jpg',
      alt: 'Chery vehicle heads-up display showing navigation and speed',
      description: 'High-definition wide-view heads-up display projects essential driving information onto the windshield for enhanced safety.'
    },
    {
      id: 3,
      title: '8155 chip with high hashrate',
      image: '/images/tiggo9pro/technology/3.jpg',
      alt: 'Snapdragon 8155 processor chip powering Chery intelligent systems',
      description: 'Powerful Snapdragon processor ensures lightning-fast response times and seamless multi-tasking for all vehicle systems.'
    },
    {
      id: 4,
      title: 'Smart Voice Assistant',
      image: '/images/tiggo9pro/technology/4.jpg',
      alt: 'Voice command interface in Chery vehicle',
      description: 'Intelligent voice recognition system with natural language processing for hands-free control of vehicle functions.'
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
    
    // Start autoplay
    startAutoplay();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      stopAutoplay();
    };
  }, []);
  
  // Update autoplay when current index changes
  useEffect(() => {
    if (!isAutoplayPaused) {
      stopAutoplay();
      startAutoplay();
    }
  }, [currentIndex, isAutoplayPaused]);

  // Autoplay functionality
  const startAutoplay = () => {
    autoplayRef.current = setTimeout(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 5000); // Change slide every 5 seconds
  };
  
  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
    }
  };

  // Pause autoplay on hover
  const pauseAutoplay = () => {
    setIsAutoplayPaused(true);
    stopAutoplay();
  };
  
  // Resume autoplay on mouse leave
  const resumeAutoplay = () => {
    setIsAutoplayPaused(false);
    startAutoplay();
  };

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
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex >= totalSlides - visibleSlides ? 0 : prevIndex + 1;
      return newIndex;
    });
    
    // Reset animating state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };
  
  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex <= 0 ? totalSlides - visibleSlides : prevIndex - 1;
      return newIndex;
    });
    
    // Reset animating state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  // Handle slide navigation
  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    
    setIsAnimating(true);
    setCurrentIndex(index);
    
    // Reset animating state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
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
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Container animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section 
      className="w-full py-16 md:py-24 bg-white relative overflow-hidden"
      id="technology-features"
      aria-label="Technology Features"
    >
      {/* Background pattern elements - elegant minimalism */}
      {isMounted && (
        <>
          <div className="absolute top-0 right-0 w-48 h-48 border-t border-r border-primary-light/10 hidden lg:block"></div>
          <div className="absolute bottom-0 left-0 w-36 h-36 border-b border-l border-primary-light/10 hidden lg:block"></div>
        </>
      )}
      
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 relative">
        {/* Section header - following design system typography */}
        <div className="max-w-full mx-auto mb-12 md:mb-16 lg:mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col"
          >
            <motion.h2 
              variants={titleVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight leading-tight"
            >
              LEADING
              <br />
              <span className="text-primary-900">INTELLIGENT TECHNOLOGY</span>
            </motion.h2>
            
            <motion.div 
              variants={dividerVariants}
              className="h-0.5 bg-primary-700 w-full max-w-xs mb-6 md:mb-8"
            />
            
            <motion.p 
              variants={titleVariants}
              custom={1}
              className="text-gray-600 max-w-2xl text-base md:text-lg leading-normal"
            >
              Experience the future of driving with Chery's cutting-edge intelligent technology suite, 
              designed to enhance safety, connectivity, and convenience.
            </motion.p>
          </motion.div>
        </div>
        
        {/* Slider container */}
        <div 
          className="relative" 
          ref={sliderRef}
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
        >
          {/* Slider track with content focus */}
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
                  className="px-3 sm:px-4 md:px-5"
                  style={{ width: `${100 / totalSlides}%` }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-10%" }}
                  variants={slideVariants}
                  custom={index}
                >
                  <div 
                    className="group h-full flex flex-col bg-white shadow-sm transition-all duration-500 hover:bg-gray-100 border border-gray-200"
                    tabIndex={currentIndex <= index && index < currentIndex + visibleSlides ? 0 : -1}
                  >
                    {/* Feature image container with content focus */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={feature.image}
                        alt={feature.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-primary-900/20 to-transparent transition-all duration-500"></div>
                      
                      {/* Feature number badge - clean, premium feel */}
                      <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-primary-700/80 backdrop-blur-sm text-white font-medium text-sm">
                        {index + 1}
                      </div>
                    </div>
                    
                    {/* Feature content with improved styling */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Feature title - following type system */}
                      <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-3 leading-tight">
                        {feature.title}
                      </h3>
                      
                      {/* Feature description */}
                      <p className="text-gray-600 text-sm md:text-base mb-6 leading-normal">
                        {feature.description}
                      </p>
                      
                      {/* Learn more link - purposeful motion */}
                      <div className="mt-auto">
                        <a 
                          href={`#feature-${feature.id}`}
                          className="inline-flex items-center text-primary-700 text-sm font-medium group-hover:text-primary-900 transition-colors duration-300"
                          aria-label={`Learn more about ${feature.title}`}
                        >
                          Learn more
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4 ml-2 group-hover:ml-3 transition-all duration-300" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </div>
                      
                      {/* Bottom accent line that fills on hover - premium feel */}
                      <div className="h-0.5 w-full bg-gray-200 mt-6">
                        <div className="h-full bg-primary-700 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Navigation controls with improved design */}
          <div className="flex items-center justify-between mt-12">
            {/* Progress bar and slide indicators */}
            <div className="flex flex-col w-full md:w-4/5 lg:w-3/4">
              {/* Progress bar - purposeful motion */}
              <div className="w-full h-0.5 bg-gray-200 relative mb-4">
                <motion.div 
                  className="h-1 bg-primary-700 absolute -top-[2px]" 
                  initial={false}
                  animate={{ 
                    width: `${((currentIndex) / (totalSlides - visibleSlides)) * 100}%`,
                  }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              
              {/* Slide dot indicators */}
              <div className="hidden sm:flex space-x-3">
                {[...Array(totalSlides - visibleSlides + 1)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      currentIndex === index 
                        ? 'bg-primary-700 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={currentIndex === index ? 'true' : 'false'}
                    disabled={isAnimating}
                  />
                ))}
              </div>
            </div>
            
            {/* Navigation arrows with improved styling - premium feel */}
            <div className="flex gap-3">
              <button 
                onClick={prevSlide}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-primary-700/10 hover:border-primary-700 hover:text-primary-900 transition-all duration-300 group"
                aria-label="Previous slide"
                disabled={isAnimating}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <button 
                onClick={nextSlide}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-primary-700/10 hover:border-primary-700 hover:text-primary-900 transition-all duration-300 group"
                aria-label="Next slide"
                disabled={isAnimating}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
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