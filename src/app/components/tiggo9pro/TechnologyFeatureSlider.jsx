'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/**
 * TechnologyFeatureSlider Component - Enhanced with Fixed Navigation
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

  // Enhanced Tiggo 9 Pro technology features data - original 4 + new features from brochure
  const features = [
    {
      id: 1,
      title: '15.6" 2.5K HD Screen (90% Screen-to-Body)',
      image: '/images/tiggo9pro/technology/1.jpg',
      alt: 'Chery Tiggo 9 Pro 15.6 inch 2.5K HD screen with 90% screen-to-body ratio',
      description: 'Super wide body surround intelligent cabin featuring an immersive 15.6" 2.5K HD screen with 90% screen-to-body ratio and 3D mesh suede dash with multi-function center console.',
      specifications: [
        '90% Screen-to-Body Ratio',
        '3D Mesh Suede Dashboard',
        'Multi-function Center Console'
      ]
    },
    {
      id: 2,
      title: 'W-HUD Virtual Reality Heads Up Display',
      image: '/images/tiggo9pro/technology/2.jpg',
      alt: 'W-HUD Virtual Reality Heads Up Display system in Tiggo 9 Pro',
      description: 'Advanced W-HUD Virtual Reality Heads Up Display projects essential driving information directly onto the windshield for enhanced safety and convenience without taking eyes off the road.',
      specifications: [
        'Virtual Reality Display Technology',
        'Enhanced Safety Information',
        'Windshield Projection System'
      ]
    },
    {
      id: 3,
      title: 'Qualcomm 8155 Chip+ High Performance',
      image: '/images/tiggo9pro/technology/3.jpg',
      alt: 'Qualcomm 8155 processor chip powering Tiggo 9 Pro intelligent systems',
      description: 'Powerful Qualcomm 8155 chip+ ensures lightning-fast response times, seamless multi-tasking, and superior performance for all intelligent vehicle systems and entertainment features.',
      specifications: [
        'High Performance Processing',
        'Lightning-Fast Response',
        'Seamless Multi-tasking'
      ]
    },
    {
      id: 4,
      title: 'Lion LionSmartCloud & Intelligent Voice Assistant',
      image: '/images/tiggo9pro/technology/4.jpg',
      alt: 'Lion LionSmartCloud connectivity and Intelligent Voice Assistant features',
      description: 'Comprehensive Lion LionSmartCloud system with Intelligent Voice Assistant (IVA) for hands-free control, online navigation, remote vehicle control, and FOTA updates.',
      specifications: [
        'Natural Language Processing',
        'FOTA Upgrade Capability',
        'Remote Vehicle Control'
      ]
    },
    // {
    //   id: 5,
    //   title: 'Connectivity & Entertainment Suite',
    //   image: '/images/tiggo9pro/technology/5.jpg',
    //   alt: 'Wireless CarPlay and Android Auto connectivity in Tiggo 9 Pro',
    //   description: 'Complete connectivity solution featuring wireless/wired CarPlay + Android Auto with HiCar, WiFi hotspot capability, Bluetooth connectivity, and online navigation system.',
    //   specifications: [
    //     'Wireless/Wired CarPlay + Android Auto with HiCar',
    //     'WiFi Hotspot Capability',
    //     'Bluetooth Connectivity',
    //     'Online Navigation System'
    //   ]
    // },
    // {
    //   id: 6,
    //   title: 'Premium 14-Speaker Audio System',
    //   image: '/images/tiggo9pro/technology/6.jpg',
    //   alt: '14 loudspeakers premium audio system with headrest integration',
    //   description: 'Immersive 14 loudspeakers premium audio system with headrest audio system integration, multiple audio sources, and high-quality sound experience throughout the cabin.',
    //   specifications: [
    //     '14 Loudspeakers Premium Audio',
    //     'Headrest Audio System Integration',
    //     'Multiple Audio Sources',
    //     'High-Quality Sound Experience'
    //   ]
    // },
    // {
    //   id: 7,
    //   title: 'Advanced Charging & Connectivity Ports',
    //   image: '/images/tiggo9pro/technology/7.jpg',
    //   alt: 'Wireless phone charging with ventilation cooling and USB ports',
    //   description: 'Wireless phone charging with ventilation cooling, USB Type-A + Type-C ports, fast charging support, and multiple charging zones for all passengers.',
    //   specifications: [
    //     'Wireless Phone Charging with Ventilation Cooling',
    //     'USB Type-A + Type-C Ports',
    //     'Fast Charging Support',
    //     'Multiple Charging Zones'
    //   ]
    // },
    // {
    //   id: 8,
    //   title: 'Remote Control & Smart Features',
    //   image: '/images/tiggo9pro/technology/8.jpg',
    //   alt: 'Remote network engine start and mobile app control features',
    //   description: 'Remote network engine start, remote network start air conditioning, mobile APP remote control, and FOTA (Firmware Over-The-Air) updates for continuous improvement.',
    //   specifications: [
    //     'Remote Network Engine Start',
    //     'Remote Network Start Air Conditioning',
    //     'Mobile APP Remote Control',
    //     'FOTA (Firmware Over-The-Air) Updates'
    //   ]
    // }
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
    }, 6000); // Change slide every 6 seconds for more content
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
    if (window.innerWidth < 1280) return 3;
    return 3; // Max 3 for optimal viewing
  };
  
  const visibleSlides = getVisibleSlides();
  
  // Calculate the maximum index we can navigate to
  const getMaxIndex = () => {
    const max = totalSlides - visibleSlides;
    return Math.max(0, max);
  };
  
  const maxIndex = getMaxIndex();
  
  // Calculate total available navigation positions
  const totalPositions = maxIndex + 1;
  
  // Check if navigation is needed (more slides than visible)
  const needsNavigation = totalSlides > visibleSlides;

  // Navigation functions with proper bounds checking
  const nextSlide = () => {
    if (isAnimating || !needsNavigation) return;
    
    setIsAnimating(true);
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex >= maxIndex ? 0 : prevIndex + 1;
      return newIndex;
    });
    
    // Reset animating state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };
  
  const prevSlide = () => {
    if (isAnimating || !needsNavigation) return;
    
    setIsAnimating(true);
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex <= 0 ? maxIndex : prevIndex - 1;
      return newIndex;
    });
    
    // Reset animating state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  // Handle slide navigation with bounds checking
  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex || index > maxIndex || index < 0 || !needsNavigation) return;
    
    setIsAnimating(true);
    setCurrentIndex(index);
    
    // Reset animating state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  // Check if we can navigate in a direction
  const canNavigatePrev = needsNavigation && currentIndex > 0;
  const canNavigateNext = needsNavigation && currentIndex < maxIndex;

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

  // Slide animation variants with improved staggering
  const slideVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.1
      }
    }
  };

  // Enhanced container animation variants for better staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section 
      className="w-full py-12 md:py-16 lg:py-24 bg-white relative overflow-hidden"
      id="technology-features"
      aria-label="Technology Features"
    >
      {/* Background pattern elements - elegant minimalism */}
      {isMounted && (
        <>
          <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 border-t border-r border-primary-light/10 hidden lg:block"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 md:w-36 md:h-36 border-b border-l border-primary-light/10 hidden lg:block"></div>
        </>
      )}
      
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-20 relative">
        {/* Section header - following design system typography */}
        <div className="max-w-full mx-auto mb-8 md:mb-12 lg:mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col"
          >
            <motion.h2 
              variants={titleVariants}
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 md:mb-4 tracking-tight leading-tight"
            >
              LEADING
              <br />
              <span className="text-primary-900">INTELLIGENT TECHNOLOGY</span>
            </motion.h2>
            
            <motion.div 
              variants={dividerVariants}
              className="h-0.5 bg-primary-700 w-full max-w-xs mb-4 md:mb-6 lg:mb-8"
            />
            
            <motion.p 
              variants={titleVariants}
              custom={1}
              className="text-gray-600 max-w-2xl text-sm md:text-base lg:text-lg leading-relaxed"
            >
              Experience the future of driving with Tiggo 9 Pro's cutting-edge intelligent technology suite, 
              featuring advanced connectivity, premium displays, and seamless IoV integration.
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
                  className="px-2 sm:px-3 md:px-4 lg:px-5"
                  style={{ width: `${100 / totalSlides}%` }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-10%" }}
                  variants={slideVariants}
                  custom={index}
                >
                  <div 
                    className="group h-full flex flex-col bg-white shadow-sm transition-all duration-500 hover:bg-gray-50 hover:shadow-md border border-gray-200 hover:border-primary-200"
                    tabIndex={currentIndex <= index && index < currentIndex + visibleSlides ? 0 : -1}
                  >
                    {/* Feature image container with enhanced responsiveness */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={feature.image}
                        alt={feature.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-primary-900/20 to-transparent transition-all duration-500"></div>
                      
                      {/* Feature number badge - clean, premium feel */}
                      <div className="absolute top-3 right-3 md:top-4 md:right-4 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-primary-700/80 backdrop-blur-sm text-white font-medium text-xs md:text-sm">
                        {index + 1}
                      </div>
                    </div>
                    
                    {/* Feature content with improved responsive styling */}
                    <div className="p-4 md:p-5 lg:p-6 flex flex-col flex-grow">
                      {/* Feature title - following type system */}
                      <h3 className="text-base md:text-lg lg:text-xl font-medium text-gray-900 mb-2 md:mb-3 leading-tight line-clamp-2">
                        {feature.title}
                      </h3>
                      
                      {/* Feature description */}
                      <p className="text-gray-600 text-xs md:text-sm lg:text-base mb-4 md:mb-5 lg:mb-6 leading-relaxed line-clamp-3">
                        {feature.description}
                      </p>
                      
                      {/* Technical specifications */}
                      <div className="mb-3 md:mb-4">
                        <div className="text-xs md:text-sm text-primary-700 font-medium space-y-1">
                          {feature.specifications.map((spec, specIndex) => (
                            <div key={specIndex} className="flex items-start">
                              <span className="text-primary-500 mr-1 flex-shrink-0">•</span>
                              <span className="line-clamp-1">{spec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Learn more link - purposeful motion */}
                      <div className="mt-auto">
                        <a 
                          href={`#feature-${feature.id}`}
                          className="inline-flex items-center text-primary-700 text-xs md:text-sm font-medium group-hover:text-primary-900 transition-colors duration-300"
                          aria-label={`Learn more about ${feature.title}`}
                        >
                          Learn more
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-3 w-3 md:h-4 md:w-4 ml-1 md:ml-2 group-hover:ml-2 md:group-hover:ml-3 transition-all duration-300" 
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
                      <div className="h-0.5 w-full bg-gray-200 mt-4 md:mt-5 lg:mt-6">
                        <div className="h-full bg-primary-700 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Navigation controls - only show if navigation is needed */}
          {needsNavigation && (
            <div className="flex flex-col sm:flex-row items-center justify-between mt-8 md:mt-10 lg:mt-12 gap-4 sm:gap-6">
              {/* Progress bar and slide indicators */}
              <div className="flex flex-col w-full sm:w-3/4 lg:w-4/5">
                {/* Progress bar - purposeful motion */}
                <div className="w-full h-0.5 bg-gray-200 relative mb-3 md:mb-4">
                  <motion.div 
                    className="h-1 bg-primary-700 absolute -top-[2px]" 
                    initial={false}
                    animate={{ 
                      width: totalPositions > 1 ? `${(currentIndex / maxIndex) * 100}%` : '100%',
                    }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                
                {/* Slide dot indicators - only show if we have multiple positions */}
                {totalPositions > 1 && (
                  <div className="flex flex-wrap gap-2 md:gap-3 justify-center sm:justify-start">
                    {[...Array(totalPositions)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 md:w-2.5 md:h-2.5 transition-all duration-300 ${
                          currentIndex === index 
                            ? 'bg-primary-700 scale-125' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        style={{ borderRadius: '50%' }}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={currentIndex === index ? 'true' : 'false'}
                        disabled={isAnimating}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Navigation arrows - only show if we can navigate */}
              <div className="flex gap-2 md:gap-3">
                <button 
                  onClick={prevSlide}
                  className={`w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center border border-gray-200 transition-all duration-300 group ${
                    !canNavigatePrev
                      ? 'text-gray-300 cursor-not-allowed border-gray-100'
                      : 'text-gray-600 hover:bg-primary-700/10 hover:border-primary-700 hover:text-primary-900'
                  }`}
                  aria-label="Previous slide"
                  disabled={isAnimating || !canNavigatePrev}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <button 
                  onClick={nextSlide}
                  className={`w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center border border-gray-200 transition-all duration-300 group ${
                    !canNavigateNext
                      ? 'text-gray-300 cursor-not-allowed border-gray-100'
                      : 'text-gray-600 hover:bg-primary-700/10 hover:border-primary-700 hover:text-primary-900'
                  }`}
                  aria-label="Next slide"
                  disabled={isAnimating || !canNavigateNext}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TechnologyFeatureSlider;