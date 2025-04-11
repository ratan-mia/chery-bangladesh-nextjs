'use client'

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const LuxuryCarFeatures = ({
  // Content props
  features,
  
  // Styling props
  backgroundColor = "bg-zinc-950",
  textColor = "text-white",
  accentColor = "bg-amber-500",
  accentTextColor = "text-amber-500",
  
  // Layout & behavior props
  showHeading = true,
  heading = "Engineering Excellence",
  subtitle = "Discover the premium features that define our automotive masterpieces"
}) => {
  // Default features if none are provided
  const defaultFeatures = [
    {
      id: 1,
      image: "/api/placeholder/1920/1080",
      title: "Dynamic LED Matrix Lighting",
      text: "Precision lighting that adapts to road conditions, eliminating glare for oncoming traffic while maximizing visibility.",
      detail: "Advanced sensors continuously monitor surroundings to adjust lighting patterns in real-time."
    },
    {
      id: 2,
      image: "/api/placeholder/1920/1080",
      title: "Forged Carbon Fiber Interior",
      text: "Handcrafted interior elements combining carbon fiber with premium leather for unmatched luxury and performance.",
      detail: "Each component requires 16 hours of skilled craftsmanship to produce."
    },
    {
      id: 3,
      image: "/api/placeholder/1920/1080",
      title: "Aerodynamic Sculpting",
      text: "Wind tunnel-tested exterior design that enhances stability and efficiency at all speeds.",
      detail: "Reduces drag coefficient to an industry-leading 0.23 Cd for improved fuel economy."
    },
    {
      id: 4,
      image: "/api/placeholder/1920/1080",
      title: "Panoramic Electrochromic Roof",
      text: "Electronically adjustable transparency levels for optimal natural lighting and cabin temperature.",
      detail: "Five levels of tint can be adjusted via touchscreen or voice command."
    },
    {
      id: 5,
      image: "/api/placeholder/1920/1080",
      title: "Advanced Infotainment System",
      text: "Seamless connectivity with ultra-responsive 17-inch display and premium audio experience.",
      detail: "3D spatial audio calibrated specifically for the vehicle's acoustic environment."
    }
  ];

  const items = features || defaultFeatures;
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const swiperMainRef = useRef(null);
  const swiperThumbsRef = useRef(null);
  const autoplayTimerRef = useRef(null);
  
  // For client-side only rendering
  useEffect(() => {
    setIsClient(true);
    
    // Simulating loading of high-quality images
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => {
      clearTimeout(timer);
      // Cleanup autoplay
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, []);

  // Initialize Swiper once component is mounted
  useEffect(() => {
    if (!isClient) return;
    
    const initSwiper = async () => {
      try {
        // Dynamically import Swiper and required modules
        const { Swiper, Navigation, Pagination, Autoplay, EffectFade, Thumbs, Keyboard, Mousewheel } = await import('swiper');
        await import('swiper/css');
        await import('swiper/css/effect-fade');
        await import('swiper/css/navigation');
        await import('swiper/css/pagination');
        await import('swiper/css/thumbs');
        
        // Initialize thumbnail swiper first
        if (swiperThumbsRef.current) {
          const thumbsSwiperInstance = new Swiper(swiperThumbsRef.current, {
            modules: [Navigation, Mousewheel],
            spaceBetween: 16,
            slidesPerView: 'auto',
            watchSlidesProgress: true,
            mousewheel: true,
            slideToClickedSlide: true,
            breakpoints: {
              0: {
                slidesPerView: 1.2,
                spaceBetween: 8
              },
              640: {
                slidesPerView: 2.5,
                spaceBetween: 12
              },
              1024: {
                slidesPerView: 3.5,
                spaceBetween: 16
              }
            }
          });
          
          setThumbsSwiper(thumbsSwiperInstance);
          
          // Initialize main swiper after thumbs is ready
          if (swiperMainRef.current) {
            const mainSwiperInstance = new Swiper(swiperMainRef.current, {
              modules: [Navigation, Pagination, Autoplay, EffectFade, Thumbs, Keyboard],
              slidesPerView: 1,
              spaceBetween: 0,
              effect: 'fade',
              fadeEffect: {
                crossFade: true
              },
              speed: 800,
              autoplay: {
                delay: 6000,
                disableOnInteraction: false,
              },
              thumbs: {
                swiper: thumbsSwiperInstance,
              },
              keyboard: {
                enabled: true,
              },
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
              pagination: {
                el: '.swiper-pagination',
                type: 'progressbar',
              },
              on: {
                slideChange: (swiper) => {
                  setActiveIndex(swiper.activeIndex);
                }
              }
            });
            
            setSwiper(mainSwiperInstance);
          }
        }
      } catch (error) {
        console.error('Error initializing Swiper:', error);
      }
    };
    
    if (!isLoading) {
      initSwiper();
    }
  }, [isClient, isLoading]);

  // Manual navigation function
  const goToSlide = (index) => {
    if (swiper) {
      swiper.slideTo(index);
    }
  };

  // Pause/resume autoplay
  const toggleAutoplay = () => {
    if (swiper) {
      if (swiper.autoplay.running) {
        swiper.autoplay.stop();
      } else {
        swiper.autoplay.start();
      }
    }
  };

  return (
    <div className={`w-full ${backgroundColor}`}>
      {/* Minimal header */}
      {showHeading && (
        <div className="relative w-full border-b border-white/10">
          <div className="max-w-screen-2xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className={`text-3xl md:text-4xl font-light ${textColor}`}>
                  {heading}
                </h2>
              </div>
              <p className="text-zinc-400 text-sm md:text-base max-w-md text-center md:text-right">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content Area */}
      <div className="w-full relative">
        {isClient && !isLoading ? (
          <div className="w-full">
            {/* Main Swiper with Full-Height Images */}
            <div className="w-full h-[75vh] relative">
              <div className="swiper-container h-full" ref={swiperMainRef}>
                <div className="swiper-wrapper h-full">
                  {items.map((feature, index) => (
                    <div className="swiper-slide h-full" key={feature.id || index}>
                      {/* Feature image background */}
                      <div className="relative w-full h-full overflow-hidden">
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          fill
                          priority
                          sizes="100vw"
                          className="object-cover"
                        />
                        
                        {/* Gradient overlay for text */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent">
                          <div className="relative h-full flex flex-col">
                            <div className="flex-grow flex items-center">
                              <div className="max-w-screen-2xl w-full mx-auto px-6 md:px-12">
                                <div className="max-w-2xl">
                                  {/* Feature number */}
                                  <div className="inline-flex items-center space-x-3 mb-6">
                                    <span className={`text-5xl font-light ${accentTextColor}`}>
                                      {(index + 1).toString().padStart(2, '0')}
                                    </span>
                                    <div className={`h-[1px] w-12 ${accentColor}`}></div>
                                  </div>
                                  
                                  {/* Feature title and description */}
                                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
                                    {feature.title}
                                  </h3>
                                  <p className="text-lg md:text-xl text-zinc-300 mb-4 max-w-xl leading-relaxed">
                                    {feature.text}
                                  </p>
                                  <p className="text-sm text-zinc-400 mb-8">
                                    {feature.detail}
                                  </p>
                                  
                                  {/* Action button */}
                                  <button className={`inline-flex items-center px-8 py-4 ${accentColor} text-black font-medium transition-transform hover:translate-x-1`}>
                                    Explore Feature
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                                      <line x1="5" y1="12" x2="19" y2="12"></line>
                                      <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Custom Navigation Buttons */}
                <div className="absolute z-10 bottom-12 right-12 flex space-x-3">
                  <button 
                    onClick={toggleAutoplay}
                    className="w-12 h-12 border border-white/20 flex items-center justify-center focus:outline-none hover:bg-white/10 transition"
                    aria-label="Toggle autoplay"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <rect x="6" y="4" width="4" height="16"></rect>
                      <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                  </button>
                  <button 
                    className="swiper-button-prev !static !w-12 !h-12 !mt-0 border border-white/20 flex items-center justify-center hover:bg-white/10 transition after:!content-[''] focus:outline-none"
                    aria-label="Previous slide"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button 
                    className="swiper-button-next !static !w-12 !h-12 !mt-0 border border-white/20 flex items-center justify-center hover:bg-white/10 transition after:!content-[''] focus:outline-none"
                    aria-label="Next slide"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
                
                {/* Progress bar and counter */}
                <div className="absolute z-10 bottom-12 left-6 md:left-12 right-1/2 flex items-center space-x-4">
                  {/* Slide counter */}
                  <div className="text-white text-sm flex items-baseline space-x-2">
                    <span className={`text-2xl font-light ${accentTextColor}`}>
                      {(activeIndex + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="text-white/40">/</span>
                    <span className="text-white/40">
                      {items.length.toString().padStart(2, '0')}
                    </span>
                  </div>
                  
                  {/* Custom progressbar */}
                  <div className="flex-grow h-[2px] bg-white/20 relative overflow-hidden">
                    <div 
                      className={`absolute top-0 left-0 h-full ${accentColor} transition-all duration-300`}
                      style={{ width: `${((activeIndex) / (items.length - 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Thumbnail Navigation with Feature Names */}
            <div className="w-full bg-zinc-900 border-t border-white/10">
              <div className="max-w-screen-2xl mx-auto px-6 py-6">
                <div className="swiper-thumbnails" ref={swiperThumbsRef}>
                  <div className="swiper-wrapper">
                    {items.map((feature, index) => (
                      <div 
                        className="swiper-slide cursor-pointer w-auto" 
                        key={`thumb-${feature.id || index}`}
                        onClick={() => goToSlide(index)}
                      >
                        <div className={`relative px-4 py-4 transition-all duration-300 ${
                          activeIndex === index 
                            ? 'opacity-100'
                            : 'opacity-50 hover:opacity-80'
                        }`}>
                          {/* Active indicator bar */}
                          {activeIndex === index && (
                            <div className={`absolute top-0 left-4 right-4 h-0.5 ${accentColor}`}></div>
                          )}
                          
                          {/* Feature number */}
                          <div className="flex items-center space-x-3 mb-2">
                            <span className={`text-sm font-medium ${activeIndex === index ? accentTextColor : 'text-white/60'}`}>
                              {(index + 1).toString().padStart(2, '0')}
                            </span>
                          </div>
                          
                          {/* Feature name */}
                          <h4 className={`text-base font-medium whitespace-normal ${
                            activeIndex === index ? 'text-white' : 'text-white/60'
                          }`}>
                            {feature.title}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Elegant loading state
          <div className="w-full h-[75vh] flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 border-t-2 border-b-2 ${accentColor} rounded-full animate-spin mb-4`}></div>
              <p className="text-zinc-400">Loading experience...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LuxuryCarFeatures;