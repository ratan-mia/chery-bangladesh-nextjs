'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { A11y, Autoplay, EffectCreative, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CarFeaturesSlider = ({
  // Content props
  features,
  
  // Style options
  variant = "split", // "overlay", "split", "minimal", "magazine" 
  colorScheme = "light", // "dark", "light", "accent", "monochrome"
  
  // Layout & behavior props
  spaceBetween = 24,
  autoplay = true,
  autoplaySpeed = 5000,
  heading = "Distinctive Features",
  subtitle = "Experience innovation in every detail",
  
  // Enhanced functionality
  linkBase = '/features',
  showIndicators = false,
  showArrows = true,
  showNumbers = true,
  showHeading = false,
  transition = "slide", // "slide", "fade", "creative"
  height = "lg", // "sm", "md", "lg", "xl"
}) => {
  const defaultFeatures = [
    {
      id: 1,
      image: "/api/placeholder/800/600",
      title: "Dynamic LED Lighting",
      description: "Adaptive lighting system that automatically adjusts to driving conditions.",
      tagline: "Illuminate the road ahead",
      specs: ["Adaptive beam", "Dynamic cornering lights", "Signature DRLs"],
      link: "/features/lighting"
    },
    {
      id: 2,
      image: "/api/placeholder/800/600",
      title: "Premium Alloy Wheels",
      description: "Lightweight design enhancing performance and efficiency with premium materials.",
      tagline: "Form meets function",
      specs: ["20-inch diameter", "Diamond-cut finish", "Reduced unsprung weight"],
      link: "/features/wheels"
    },
    {
      id: 3,
      image: "/api/placeholder/800/600",
      title: "Signature Front Grille",
      description: "Distinctive design with premium finish for unmistakable presence on the road.",
      tagline: "Bold presence",
      specs: ["Integrated sensors", "Active cooling", "Premium finish"],
      link: "/features/grille"
    },
    {
      id: 4,
      image: "/api/placeholder/800/600",
      title: "Panoramic Sunroof",
      description: "Full-length glass roof providing an enhanced sense of space and light.",
      tagline: "Sky at your fingertips",
      specs: ["UV protection", "One-touch operation", "Blackout shade"],
      link: "/features/sunroof"
    },
    {
      id: 5,
      image: "/api/placeholder/800/600",
      title: "Advanced Infotainment",
      description: "Seamless connectivity with intuitive controls and premium audio.",
      tagline: "Stay connected",
      specs: ["15-inch display", "Wireless connection", "Premium sound system"],
      link: "/features/infotainment"
    }
  ];

  const items = features || defaultFeatures;
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    // Handle initial sizing and resize events
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3);
      } else if (window.innerWidth >= 640) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    // Initial call
    updateSlidesPerView();

    // Set up resize listener
    window.addEventListener('resize', updateSlidesPerView);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateSlidesPerView);
    };
  }, []);

  const getColorScheme = () => {
    switch (colorScheme) {
      case 'light':
        return {
          background: 'bg-white',
          text: 'text-gray-900',
          subtext: 'text-gray-600',
          accent: 'bg-primary-500',
          accentText: 'text-primary-500',
          card: 'bg-gray-50',
          border: 'border-gray-200',
          indicator: 'bg-primary-500',
          overlay: 'from-gray-900/70 to-transparent',
          inactive: 'bg-gray-300',
          button: 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50'
        };
      case 'accent':
        return {
          background: 'bg-primary-900',
          text: 'text-white',
          subtext: 'text-gray-300',
          accent: 'bg-primary-400',
          accentText: 'text-primary-400',
          card: 'bg-primary-800',
          border: 'border-primary-700',
          indicator: 'bg-primary-400',
          overlay: 'from-primary-900/80 to-transparent',
          inactive: 'bg-primary-700',
          button: 'bg-primary-800 text-white border-primary-700 hover:bg-primary-700'
        };
      case 'monochrome':
        return {
          background: 'bg-gray-100',
          text: 'text-black',
          subtext: 'text-gray-700',
          accent: 'bg-black',
          accentText: 'text-black',
          card: 'bg-white',
          border: 'border-gray-300',
          indicator: 'bg-black',
          overlay: 'from-black/80 to-transparent',
          inactive: 'bg-gray-400',
          button: 'bg-black text-white border-black hover:bg-gray-900'
        };
      default: // 'dark'
        return {
          background: 'bg-gray-900',
          text: 'text-white',
          subtext: 'text-gray-300',
          accent: 'bg-primary-500',
          accentText: 'text-primary-500',
          card: 'bg-gray-800',
          border: 'border-gray-700',
          indicator: 'bg-primary-500',
          overlay: 'from-black/80 to-transparent',
          inactive: 'bg-gray-700',
          button: 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700'
        };
    }
  };

  const getHeightClass = () => {
    switch (height) {
      case 'sm':
        return 'h-64 sm:h-72 md:h-80';
      case 'md':
        return 'h-80 sm:h-96 md:h-96';
      case 'lg':
        return 'h-96 sm:h-96 md:h-108'; // Custom height: 27rem
      case 'xl':
        return 'h-96 sm:h-108 md:h-128'; // Custom heights: 27rem, 32rem
      default:
        return 'h-80 sm:h-96 md:h-96';
    }
  };

  const colors = getColorScheme();
  const heightClass = getHeightClass();

  // Handle slide change
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
    resetProgressAnimation();
  };

  // Toggle autoplay
  const toggleAutoplay = () => {
    setIsPaused(!isPaused);
    
    if (swiperRef.current && swiperRef.current.swiper) {
      if (isPaused) {
        swiperRef.current.swiper.autoplay.start();
        startProgressAnimation();
      } else {
        swiperRef.current.swiper.autoplay.stop();
        stopProgressAnimation();
      }
    }
  };

  // Progress bar animation
  const startProgressAnimation = () => {
    if (!autoplay || !showIndicators) return;
    
    stopProgressAnimation(); // Clear any existing interval
    
    const duration = autoplaySpeed;
    const intervalTime = 50; // Update every 50ms for smooth animation
    const steps = duration / intervalTime;
    let currentStep = 0;
    
    progressIntervalRef.current = setInterval(() => {
      currentStep++;
      const animationProgress = (currentStep / steps) * 100;
      
      if (progressRef.current) {
        progressRef.current.style.width = `${animationProgress}%`;
      }
      
      if (currentStep >= steps) {
        resetProgressAnimation();
      }
    }, intervalTime);
  };
  
  const resetProgressAnimation = () => {
    stopProgressAnimation();
    if (progressRef.current) {
      progressRef.current.style.width = '0%';
    }
    if (autoplay && !isPaused) {
      startProgressAnimation();
    }
  };
  
  const stopProgressAnimation = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  // Initialize swiper
  const handleSwiperInit = (swiper) => {
    if (isPaused && swiper.autoplay) {
      swiper.autoplay.stop();
    } else if (autoplay) {
      startProgressAnimation();
    }
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      stopProgressAnimation();
    };
  }, []);

  // Get transition effect and configuration
  const getTransitionConfig = () => {
    const config = {
      modules: [Navigation, Pagination, Autoplay, A11y],
      effect: undefined,
      effectOptions: {}
    };

    if (transition === 'creative' && slidesPerView === 1) {
      config.modules.push(EffectCreative);
      config.effect = 'creative';
      config.effectOptions = {
        creativeEffect: {
          prev: {
            shadow: true,
            translate: ['-20%', 0, -1],
          },
          current: {
            shadow: true,
            translate: [0, 0, 0],
          },
          next: {
            shadow: true, 
            translate: ['100%', 0, 0],
          },
        }
      };
    } else if (transition === 'fade' && slidesPerView === 1) {
      config.modules.push(EffectCreative);
      config.effect = 'creative';
      config.effectOptions = {
        creativeEffect: {
          prev: {
            opacity: 0,
            translate: [0, 0, -400],
          },
          current: {
            opacity: 1,
            translate: [0, 0, 0],
          },
          next: {
            opacity: 0,
            translate: [0, 0, -400],
          },
        }
      };
    }

    return config;
  };

  const transitionConfig = getTransitionConfig();

  // Render variant-specific slide content
  const renderSlideContent = (feature, index) => {
    switch (variant) {
      case 'split':
        return (
          <div className={`group flex flex-col h-full mt-3 overflow-hidden ${colors.card} border ${colors.border}`}>
            <div className="relative w-full pt-[56.25%]"> {/* 16:9 aspect ratio */}
              <Image 
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={index < 3}
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${colors.overlay} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </div>
            <div className="flex flex-col p-6 flex-grow">
              <span className={`text-sm uppercase tracking-wider font-medium mb-2 ${colors.accentText}`}>{feature.tagline}</span>
              <h3 className={`text-xl sm:text-2xl font-bold mb-3 group-hover:text-primary-500 transition-colors duration-300 ${colors.text}`}>{feature.title}</h3>
              <p className={`mb-4 text-sm sm:text-base line-clamp-3 ${colors.subtext}`}>{feature.description}</p>
              
              <div className="mt-auto pt-4">
                <Link 
                  href={feature.link || `${linkBase}/${feature.id}`} 
                  className={`inline-flex items-center ${colors.accentText} text-sm font-medium group-hover:underline`}
                >
                  Learn more
                  <svg className="ml-2 w-4 h-4 group-hover:ml-3 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        );

      case 'minimal':
        return (
          <div className={`group h-full ${colors.card} mt-3 border ${colors.border} hover:border-primary-500 transition-colors duration-300 flex flex-col`}>
            <div className="p-6 flex flex-col flex-grow">
              <span className={`text-sm uppercase tracking-wider font-medium mb-2 ${colors.accentText}`}>
                {String(index + 1).padStart(2, '0')} — {feature.tagline}
              </span>
              <h3 className={`text-xl sm:text-2xl font-bold mb-3 group-hover:text-primary-500 transition-colors duration-300 ${colors.text}`}>
                {feature.title}
              </h3>
              <p className={`mb-4 text-sm sm:text-base line-clamp-3 ${colors.subtext}`}>
                {feature.description}
              </p>
              
              {feature.specs && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {feature.specs.slice(0, 2).map((spec, i) => (
                    <span key={i} className={`px-2 py-1 text-xs ${colors.border} border ${colors.subtext}`}>
                      {spec}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="mt-auto pt-4 border-t border-gray-700/20">
                <Link 
                  href={feature.link || `${linkBase}/${feature.id}`} 
                  className={`inline-flex items-center ${colors.accentText} text-sm font-medium group-hover:underline`}
                >
                  View details
                  <svg className="ml-2 w-4 h-4 group-hover:ml-3 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        );

      case 'magazine':
        return (
          <div className={`group h-full mt-3 relative overflow-hidden ${colors.card} border ${colors.border}`}>
            <div className="absolute inset-0 z-0">
              <Image 
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={index < 3}
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${colors.overlay}`}></div>
            </div>

            <div className="relative z-10 flex flex-col h-full p-6">
              {/* Magazine-style feature number */}
              <div className="mb-2">
                <span className="text-5xl font-bold text-white/20">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              
              <div className="mt-auto">
                <div className="w-12 h-0.5 bg-primary-500 mb-3"></div>
                <h3 className="text-white text-xl sm:text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white/80 mb-4 text-sm line-clamp-2">{feature.description}</p>
                
                <Link 
                  href={feature.link || `${linkBase}/${feature.id}`} 
                  className="inline-flex items-center text-white hover:text-primary-300 text-sm font-medium"
                >
                  Discover
                  <svg className="ml-2 w-4 h-4 group-hover:ml-3 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        );

      default: // 'overlay'
        return (
          <div className="group relative mt-3 h-full overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image 
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={index < 3}
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${colors.overlay} opacity-60 group-hover:opacity-80 transition-opacity duration-300`}></div>
            </div>
            
            <div className="relative z-10 flex flex-col justify-end h-full p-6">
              <div>
                <span className={`inline-block text-xs uppercase tracking-wider font-medium mb-2 text-white`}>
                  {feature.tagline}
                </span>
                <h3 className="text-white text-xl sm:text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/80 mb-4 text-sm line-clamp-3">{feature.description}</p>
                
                <Link 
                  href={feature.link || `${linkBase}/${feature.id}`} 
                  className="inline-flex items-center text-white hover:text-primary-300 text-sm font-medium"
                >
                  View details
                  <svg className="ml-2 w-4 h-4 group-hover:ml-3 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`${colors.background}  overflow-hidden`}>
      {/* Header section */}
      {showHeading && (
        <div className="w-full py-8 md:py-12">
          <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between">
              <div>
                <div className="max-w-xl">
                  <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${colors.text} mb-2`}>
                    {heading}
                  </h2>
                  <p className={`${colors.subtext} text-base md:text-lg`}>
                    {subtitle}
                  </p>
                </div>
              </div>
              
              {/* Controls */}
              {showArrows && (
                <div className="flex items-center mt-6 md:mt-0">
                  <button 
                    onClick={() => swiperRef.current?.swiper.slidePrev()}
                    className={`${colors.button} w-10 h-10 border flex items-center justify-center mr-2`}
                    aria-label="Previous slide"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
                    </svg>
                  </button>
                  
                  <button 
                    onClick={() => swiperRef.current?.swiper.slideNext()}
                    className={`${colors.button} w-10 h-10 border flex items-center justify-center`}
                    aria-label="Next slide"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Slider section */}
      <div className="w-full mt-3">
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
          <Swiper
            ref={swiperRef}
            modules={transitionConfig.modules}
            effect={transitionConfig.effect}
            slidesPerView={slidesPerView}
            spaceBetween={spaceBetween}
            autoplay={autoplay ? { delay: autoplaySpeed, disableOnInteraction: false } : false}
            onSlideChange={handleSlideChange}
            onSwiper={handleSwiperInit}
            className="w-full"
            {...transitionConfig.effectOptions}
          >
            {items.map((feature, index) => (
              <SwiperSlide key={feature.id || index} className="h-auto">
                <div className={`${heightClass} w-full`}>
                  {renderSlideContent(feature, index)}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      
      {/* Controls and indicators */}
      {showIndicators && (
        <div className="w-full max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Play/pause button */}
            <button 
              onClick={toggleAutoplay}
              className={`${colors.button} w-10 h-10 border flex items-center justify-center`}
              aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
            >
              {isPaused ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 4L20 12L6 20V4Z" fill="currentColor"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
                  <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
                </svg>
              )}
            </button>
            
            {/* Progress bar */}
            <div className="flex-1 mx-6">
              <div className={`h-1 ${colors.inactive} w-full overflow-hidden relative`}>
                <div 
                  className={`h-full ${colors.indicator} absolute left-0 top-0`}
                  style={{ width: `${(activeIndex / (items.length - 1)) * 100}%` }}
                />
                <div 
                  ref={progressRef}
                  className={`h-full ${colors.indicator} opacity-50 absolute left-0 top-0 w-0`}
                />
              </div>
            </div>
            
            {/* Slide counter */}
            {showNumbers && (
              <div className={`text-lg font-medium ${colors.text}`}>
                <span>
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className={`mx-2 ${colors.subtext}`}>/</span>
                <span className={colors.subtext}>
                  {String(items.length).padStart(2, '0')}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarFeaturesSlider;