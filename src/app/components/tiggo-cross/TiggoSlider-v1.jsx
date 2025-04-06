'use client';

import gsap from 'gsap';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TiggoSlider = () => {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFeature, setShowFeature] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const swiperRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressAnimationRef = useRef(null);
  
  // Only render client-side
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  // Automatically show the feature after slide change with staggered animations
  useEffect(() => {
    if (mounted) {
      setShowFeature(false);
      
      const animationDelay = setTimeout(() => {
        setShowFeature(true);
        
        // Use GSAP for smoother animations if available
        if (typeof window !== 'undefined' && gsap) {
          const contentElements = document.querySelectorAll('.animate-content');
          gsap.fromTo(
            contentElements, 
            { 
              y: 40, 
              opacity: 0 
            },
            { 
              y: 0, 
              opacity: 1, 
              duration: 0.7, 
              stagger: 0.1,
              ease: 'power2.out',
              delay: 0.2
            }
          );
        }
      }, 500);
      
      return () => clearTimeout(animationDelay);
    }
  }, [activeIndex, mounted]);

  // Handle progress bar animation
  useEffect(() => {
    if (mounted && progressBarRef.current) {
      // Clear any existing animation
      if (progressAnimationRef.current) {
        progressAnimationRef.current.kill();
      }
      
      // Don't animate if hovering or autoplay is paused
      if (isHovering || autoplayPaused) return;
      
      // Create new animation
      progressAnimationRef.current = gsap.fromTo(
        progressBarRef.current,
        { scaleX: 0 },
        { 
          scaleX: 1, 
          duration: 6, 
          ease: 'none',
          onComplete: () => {
            if (swiperRef.current?.swiper && !isHovering && !autoplayPaused) {
              swiperRef.current.swiper.slideNext();
            }
          }
        }
      );
      
      return () => {
        if (progressAnimationRef.current) {
          progressAnimationRef.current.kill();
        }
      };
    }
  }, [activeIndex, mounted, isHovering, autoplayPaused]);

  // Handle mouse enter/leave for autoplay control
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    if (progressAnimationRef.current) {
      progressAnimationRef.current.pause();
    }
    
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.autoplay.stop();
      setAutoplayPaused(true);
    }
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    if (progressAnimationRef.current) {
      progressAnimationRef.current.play();
    }
    
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.autoplay.start();
      setAutoplayPaused(false);
    }
  }, []);

  // Enhanced slide data with expanded features
  const slides = [
    {
      id: 'exterior',
      modelName: 'TIGGO CROSS',
      tagline: 'FOR EVERY KIND OF YOU',
      bgImage: '/images/tiggocross/hero/1.webp',
      color: 'silver',
      colorCode: 'bg-brown-400',
      badge: 'New Model',
      specs: [
        { label: 'Engine', value: '1.5L Turbo' },
        { label: 'Power', value: '145 HP' },
        { label: 'Torque', value: '210 Nm' },
        { label: '0-100 km/h', value: '9.9 sec' }
      ],
      features: [
        'Dynamic Styling',
        'LED Lighting',
        'Aerodynamic Design',
        '18" Alloy Wheels'
      ]
    },
    {
      id: 'interior',
      modelName: 'TIGGO CROSS',
      tagline: 'COMFORT REDEFINED',
      bgImage: '/images/tiggocross/hero/2.webp',
      color: 'blue',
      colorCode: 'bg-brown-700',
      badge: 'Premium Interior',
      specs: [
        { label: 'Seats', value: '5 Leather' },
        { label: 'Display', value: '10.25" Touchscreen' },
        { label: 'Sound', value: '8-Speaker System' },
        { label: 'Panoramic Roof', value: 'Available' }
      ],
      features: [
        'Ambient Lighting',
        'Heated Seats',
        'Dual-Zone Climate',
        'Premium Materials'
      ]
    },
    {
      id: 'technology',
      modelName: 'TIGGO CROSS',
      tagline: 'ADVANCED TECHNOLOGY',
      bgImage: '/images/tiggocross/hero/1.webp', // Using first image again
      color: 'red',
      colorCode: 'bg-brown-900',
      badge: 'Smart Technology',
      specs: [
        { label: 'Safety', value: '6 Airbags' },
        { label: 'ADAS', value: 'Level 2' },
        { label: 'Connectivity', value: 'Wireless' },
        { label: 'Drive Modes', value: '4 Options' }
      ],
      features: [
        'Lane Keep Assist',
        'Adaptive Cruise',
        'Wireless CarPlay',
        'Auto Emergency Braking'
      ]
    }
  ];

  // Get the active slide
  const activeSlide = slides[activeIndex];

  // Handle slide change
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  // Helper for keyboard accessibility
  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      swiperRef.current?.swiper.slideTo(index);
    }
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {mounted && (
        <Swiper
          ref={swiperRef}
          modules={[EffectFade, Navigation, Pagination, Autoplay]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1000}
          slidesPerView={1}
          onSlideChange={handleSlideChange}
          navigation={{
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
          }}
          pagination={{
            el: '.swiper-pagination',
            clickable: true,
            type: 'bullets',
            renderBullet: function (index, className) {
              return `<span class="${className} w-8 h-1 rounded-none bg-brown-200/60 hover:bg-brown-200/90 mx-1 block transition-all duration-300"></span>`;
            },
            bulletActiveClass: '!bg-brown-400'
          }}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          loop={true}
          keyboard={{
            enabled: true,
            onlyInViewport: true,
          }}
          a11y={{
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
          }}
          className="w-full h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id} className="relative w-full h-full">
              {/* Background image with parallax effect */}
              <div 
                className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-10000 ease-out will-change-transform"
                style={{ 
                  backgroundImage: `url(${slide.bgImage})`,
                  transform: `scale(${activeIndex === index ? '1.05' : '1'})`,
                  transition: 'transform 6s ease-out'
                }}
              />
              
              {/* Enhanced overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-5"></div>
              
              {/* Content container */}
              <div className="relative z-10 w-full h-full flex flex-col">
                {/* Top badge area with improved animation */}
                {slide.badge && (
                  <div className="absolute top-8 left-8 md:left-16 z-20">
                    <div className={`animate-content inline-block bg-gradient-to-r from-brown-500 to-brown-400 text-brown-50 px-4 py-2 uppercase text-sm tracking-wider shadow-lg ${
                      showFeature ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    } transition-all duration-700 delay-300`}>
                      {slide.badge}
                    </div>
                  </div>
                )}

                {/* Main content area */}
                <div className="absolute bottom-0 left-0 right-0 pb-28 pt-40 z-20">
                  {/* Enhanced gradient for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0"></div>
                  
                  <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16">
                    <div className="flex flex-col md:flex-row justify-between items-end md:items-center">
                      {/* Left content - Text and buttons with improved animation */}
                      <div className="max-w-2xl animate-content"
                           style={{ 
                             opacity: showFeature ? 1 : 0,
                             transform: showFeature ? 'translateY(0)' : 'translateY(20px)'
                           }}>
                        <h2 className="text-brown-50 text-4xl md:text-6xl font-extralight tracking-widest leading-tight mb-2">
                          {slide.modelName}
                        </h2>
                        <div className="w-20 h-1 bg-brown-400 mb-6"></div>
                        <p className="text-brown-50 text-lg md:text-2xl font-light tracking-widest uppercase mb-8 md:mb-12">
                          {slide.tagline}
                        </p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                          <a 
                            href="#brochure" 
                            className="group bg-brown-700 hover:bg-brown-600 transition-all duration-300 text-brown-50 px-8 py-3 text-center transform hover:scale-105 hover:shadow-xl relative overflow-hidden"
                          >
                            <span className="relative z-10">View Brochure</span>
                            <span className="absolute inset-0 bg-brown-50/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                          </a>
                          <a 
                            href="#test-drive" 
                            className="group bg-brown-50/10 backdrop-blur-sm hover:bg-brown-50/20 border border-brown-50/30 transition-all duration-300 text-brown-50 px-8 py-3 text-center transform hover:scale-105 hover:shadow-xl"
                          >
                            Test Drive
                          </a>
                        </div>
                      </div>
                      
                      {/* Right content - Enhanced Specifications with features tab */}
                      {slide.specs && (
                        <div className="mt-8 md:mt-0 hidden md:block animate-content"
                             style={{ 
                                opacity: showFeature ? 1 : 0,
                                transform: showFeature ? 'translateX(0)' : 'translateX(40px)'
                              }}>
                          <div className="bg-black/40 backdrop-blur-md p-6 rounded-sm border-l-2 border-brown-400 shadow-2xl">
                            {/* Tabbed interface */}
                            <div className="flex mb-4 space-x-2">
                              <h3 className="text-brown-50 text-lg font-medium flex items-center">
                                <svg className="w-5 h-5 mr-2 text-brown-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                SPECIFICATIONS
                              </h3>
                            </div>
                            
                            <div className="mb-4 min-w-[280px]">
                              {slide.specs.map((spec, i) => (
                                <div key={i} className="flex justify-between border-b border-brown-50/10 pb-2 group mb-2">
                                  <span className="text-brown-50/70 text-sm uppercase group-hover:text-brown-400 transition-colors">{spec.label}</span>
                                  <span className="text-brown-50 font-medium group-hover:text-brown-300 transition-colors">{spec.value}</span>
                                </div>
                              ))}
                            </div>
                            
                            {/* Features list */}
                            <div className="mt-4">
                              <h4 className="text-brown-50/80 text-sm uppercase mb-2 border-b border-brown-50/10 pb-1">
                                Key Features
                              </h4>
                              <ul className="grid grid-cols-2 gap-2">
                                {slide.features.map((feature, i) => (
                                  <li key={i} className="flex items-center text-brown-50/90 text-sm">
                                    <svg className="w-4 h-4 mr-2 text-brown-400" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      
      {/* Enhanced progress bar with GSAP animation */}
      <div className="absolute bottom-16 left-8 md:left-16 right-8 md:right-16 z-30 h-1 bg-brown-50/20 rounded-full overflow-hidden">
        <div 
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-brown-500 to-brown-400 origin-left rounded-full"
          style={{ 
            transform: 'scaleX(0)',
            boxShadow: '0 0 8px rgba(245, 158, 11, 0.5)'
          }}
        ></div>
      </div>
      
      {/* Improved navigation arrows */}
      <button 
        className="slider-button-prev absolute top-1/2 -translate-y-1/2 left-4 md:left-8 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm cursor-pointer hover:bg-brown-700 transition-all duration-300 border border-brown-50/10 group focus:outline-none focus:ring-2 focus:ring-brown-400"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 text-brown-50 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      <button 
        className="slider-button-next absolute top-1/2 -translate-y-1/2 right-4 md:right-8 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm cursor-pointer hover:bg-brown-700 transition-all duration-300 border border-brown-50/10 group focus:outline-none focus:ring-2 focus:ring-brown-400"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 text-brown-50 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {/* Enhanced pagination */}
      <div className="swiper-pagination absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-2"></div>
      
      {/* Enhanced color selector with keyboard accessibility */}
      <div className="absolute bottom-8 right-8 md:right-16 z-30 flex items-center bg-black/20 backdrop-blur-sm px-3 py-2 rounded-full">
        <span className="text-brown-50/70 text-xs mr-2 uppercase tracking-wider">Color</span>
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => swiperRef.current?.swiper.slideTo(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`w-6 h-6 rounded-full ${slide.colorCode} mx-1 transition-all duration-300 ${
              activeIndex === index 
                ? 'ring-2 ring-brown-50 ring-offset-1 ring-offset-black/50 scale-110' 
                : 'opacity-70 hover:opacity-100 hover:scale-105'
            }`}
            aria-label={`View ${slide.id} slide`}
            tabIndex={0}
          />
        ))}
      </div>
      
      {/* Enhanced model info at top right */}
      <div className="absolute top-8 right-8 md:right-16 z-30">
        <div className={`bg-black/30 backdrop-blur-sm px-4 py-2 rounded-sm border-r-2 border-brown-400 transform transition-all duration-700 animate-content ${
          showFeature ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          <span className="text-brown-50/80 text-sm font-light">TIGGO SERIES</span>
          <span className="block text-brown-50 text-lg font-medium">MODEL {activeIndex + 1}/3</span>
        </div>
      </div>
      
      {/* Mobile specs button that appears on small screens */}
      <div className="md:hidden absolute bottom-24 right-8 z-30">
        <button 
          className="bg-brown-400 text-brown-50 rounded-full p-3 shadow-lg hover:bg-brown-500 transition-all duration-300"
          aria-label="Show specifications"
          onClick={() => {
            // Could implement a modal for mobile specs
            alert('Specifications for ' + activeSlide.modelName);
          }}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
      
      {/* Custom CSS for animations and styling overrides */}
      <style jsx global>{`
        @keyframes progress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        
        .swiper-pagination-bullet {
          transition: all 0.3s ease;
        }
        
        .swiper-pagination-bullet-active {
          transform: scaleX(1.5);
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        /* Smooth page scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Prevent FOUC when loading GSAP */
        .animate-content {
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default TiggoSlider;