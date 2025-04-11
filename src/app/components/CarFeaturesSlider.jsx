'use client'

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const PremiumCarFeaturesSwiper = ({
  // Content props
  features,
  
  // Styling props
  backgroundColor = "bg-black",
  textColor = "text-white",
  accentColor = "bg-amber-500",
  accentTextColor = "text-amber-500",
  
  // Layout & behavior props
  showHeading = true,
  heading = "Explore Excellence",
  subtitle = "Discover what sets our vehicles apart"
}) => {
  // Default features if none are provided
  const defaultFeatures = [
    {
      id: 1,
      image: "/api/placeholder/1920/1080",
      title: "Dynamic LED Lighting",
      text: "Adaptive lighting system that automatically adjusts to driving conditions."
    },
    {
      id: 2,
      image: "/api/placeholder/1920/1080",
      title: "Premium Alloy Wheels",
      text: "Lightweight design enhancing performance and efficiency with premium materials."
    },
    {
      id: 3,
      image: "/api/placeholder/1920/1080",
      title: "Signature Front Grille",
      text: "Distinctive design with premium finish for unmistakable presence on the road."
    },
    {
      id: 4,
      image: "/api/placeholder/1920/1080",
      title: "Panoramic Sunroof",
      text: "Full-length glass roof providing an enhanced sense of space and light."
    },
    {
      id: 5,
      image: "/api/placeholder/1920/1080",
      title: "Advanced Infotainment",
      text: "Seamless connectivity with intuitive controls and premium audio."
    }
  ];

  const items = features || defaultFeatures;
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const swiperRef = useRef(null);
  const thumbsRef = useRef(null);
  const autoplayTimerRef = useRef(null);
  
  // For client-side only
  useEffect(() => {
    setIsClient(true);
    return () => {
      // Cleanup autoplay
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, []);

  // Initialize Swiper once component is mounted
  useEffect(() => {
    if (!isClient) return;
    
    // Import Swiper dynamically
    const initSwiper = async () => {
      try {
        // Dynamically import Swiper and required modules
        const { Swiper, Navigation, Pagination, Autoplay, EffectFade, Thumbs } = await import('swiper');
        await import('swiper/css');
        await import('swiper/css/effect-fade');
        await import('swiper/css/navigation');
        await import('swiper/css/pagination');
        await import('swiper/css/thumbs');
        
        // Initialize thumbnail swiper
        const thumbsSwiper = new Swiper(thumbsRef.current, {
          modules: [Navigation],
          spaceBetween: 10,
          slidesPerView: 4,
          watchSlidesProgress: true,
          breakpoints: {
            0: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            }
          }
        });
        
        // Initialize main swiper
        const mainSwiper = new Swiper(swiperRef.current, {
          modules: [Navigation, Pagination, Autoplay, EffectFade, Thumbs],
          slidesPerView: 1,
          spaceBetween: 0,
          effect: 'fade',
          fadeEffect: {
            crossFade: true
          },
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          thumbs: {
            swiper: thumbsSwiper,
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
        
        // Store swiper instance
        setSwiper(mainSwiper);
      } catch (error) {
        console.error('Error initializing Swiper:', error);
      }
    };
    
    initSwiper();
  }, [isClient]);

  const goToSlide = (index) => {
    if (swiper) {
      swiper.slideTo(index);
    }
  };

  return (
    <div className={`w-full ${backgroundColor}`}>
      {/* Header Section */}
      {showHeading && (
        <div className="relative w-full">
          <div className="max-w-screen-2xl mx-auto px-6 pt-16 pb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
              <div>
                <div className={`${accentColor} h-1 w-16 mb-4`}></div>
                <h2 className={`text-3xl md:text-4xl font-bold ${textColor} mb-2`}>
                  {heading}
                </h2>
                <p className="text-gray-400 text-base max-w-xl">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Swiper */}
      <div className="w-full relative">
        {isClient ? (
          <>
            {/* Main full-width Swiper */}
            <div className="swiper-container" ref={swiperRef}>
              <div className="swiper-wrapper">
                {items.map((feature, index) => (
                  <div className="swiper-slide" key={feature.id || index}>
                    {/* Full-screen feature image */}
                    <div className="relative w-full h-[70vh] overflow-hidden">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                      />
                      
                      {/* Content overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent">
                        <div className="flex h-full items-center">
                          <div className="max-w-screen-2xl mx-auto px-6 md:px-8 w-full">
                            <div className="max-w-lg">
                              <div className={`${accentColor} h-1 w-12 mb-4`}></div>
                              <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                {feature.title}
                              </h3>
                              <p className="text-lg text-gray-200 mb-8">
                                {feature.text}
                              </p>
                              <button className={`inline-flex items-center px-6 py-3 ${accentColor} text-black font-medium transition hover:bg-opacity-90`}>
                                Discover More
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
                ))}
              </div>
              
              {/* Custom Navigation Buttons */}
              <div className="swiper-button-next !right-6 !text-white after:!text-2xl"></div>
              <div className="swiper-button-prev !left-6 !text-white after:!text-2xl"></div>
              
              {/* Progress Bar */}
              <div className="swiper-pagination max-w-screen-2xl mx-auto !top-auto !bottom-36 !left-6 !right-6 !h-0.5 !bg-white/20"></div>
              
              {/* Slide Counter */}
              <div className="absolute bottom-24 left-6 flex items-center text-white text-sm z-10 font-medium">
                <span className="text-xl text-amber-500 mr-1">{(activeIndex + 1).toString().padStart(2, '0')}</span>
                <span className="mx-2">/</span>
                <span className="text-white/60">{items.length.toString().padStart(2, '0')}</span>
              </div>
            </div>
            
            {/* Thumbnails Swiper */}
            <div className="bg-gray-900 py-6">
              <div className="max-w-screen-2xl mx-auto px-6">
                <div className="swiper-thumbs" ref={thumbsRef}>
                  <div className="swiper-wrapper">
                    {items.map((feature, index) => (
                      <div 
                        className="swiper-slide cursor-pointer" 
                        key={`thumb-${feature.id || index}`}
                        onClick={() => goToSlide(index)}
                      >
                        <div className={`p-4 border-b-2 transition-colors ${activeIndex === index ? 'border-amber-500' : 'border-transparent'}`}>
                          <h4 className={`font-medium truncate ${activeIndex === index ? 'text-white' : 'text-gray-400'}`}>
                            {feature.title}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Placeholder while loading
          <div className="w-full h-[70vh] bg-gray-900 flex items-center justify-center">
            <div className="text-white">Loading slider...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PremiumCarFeaturesSwiper;