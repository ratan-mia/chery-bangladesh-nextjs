"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/navigation";
import "swiper/css/pagination";

// ============= THEME CONFIGURATION =============
const getTheme = (customPrimaryColor) => {
  return {
    primaryLight: customPrimaryColor || '#c4b19c', // Primary Light from design system
    primary700: customPrimaryColor ? adjustColorShade(customPrimaryColor, -20) : '#8c735d', // Primary 700
    primary800: customPrimaryColor ? adjustColorShade(customPrimaryColor, 10) : '#b7a99a',  // Primary 800
    primary900: customPrimaryColor ? adjustColorShade(customPrimaryColor, -40) : '#524336', // Primary 900
    text: '#111827',         // Gray 900 for headings and primary text
    textSecondary: '#4B5563', // Gray 600 for body text
    contentBg: '#FFFFFF',    // White background
    borderColor: '#E5E7EB',  // Gray 200 for borders
    cardBg: '#F3F4F6',       // Gray 100 for background accents
    overlay: "rgba(255, 255, 255, 0.7)"
  };
};

// Helper function to adjust color shades
const adjustColorShade = (hex, percent) => {
  // This is a simplified version - in production you'd want a more robust color manipulation
  return hex;
};

// ============= SUBCOMPONENTS =============

// Media placeholder component
const ImagePlaceholder = ({ theme }) => {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        backgroundColor: theme.cardBg,
        borderColor: theme.borderColor,
      }}
    >
      <svg
        className="w-12 h-12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: theme.primary700 }}
      >
        <rect x="3" y="3" width="18" height="18" rx="0" ry="0"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
      </svg>
    </div>
  );
};

// Video player component
const VideoPlayer = ({ src, poster, theme }) => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (videoRef.current) {
            videoRef.current.play().catch(error => {
              console.log("Autoplay prevented:", error);
            });
          }
        } else {
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleVideoLoaded = () => {
    setIsLoaded(true);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-10 h-10 border-4 rounded-full animate-spin" 
               style={{ borderColor: theme.primary700, borderTopColor: 'transparent' }}>
          </div>
        </div>
      )}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
        poster={poster}
        autoPlay={isVisible}
        onLoadedData={handleVideoLoaded}
        aria-label="Feature demonstration video"
      >
        {isVisible && <source src={src} type="video/mp4" />}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

// Navigation Arrow Button Component
const NavArrowButton = ({ direction, onClick, disabled, theme }) => {
  const isNext = direction === 'next';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        group flex items-center justify-center rounded-full
        transition-all duration-300 ease-out
        ${disabled 
          ? 'opacity-40 cursor-not-allowed' 
          : 'opacity-100 hover:opacity-100 cursor-pointer hover:scale-110 active:scale-95'
        }
        bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl
        w-10 h-10 sm:w-12 sm:h-12
        ${isNext ? 'ml-2' : 'mr-2'}
      `}
      style={{
        border: `1px solid ${theme.borderColor}`,
      }}
      aria-label={`${isNext ? 'Next' : 'Previous'} slide`}
    >
      <div 
        className={`
          transition-transform duration-300 
          ${!disabled && 'group-hover:scale-110'}
          ${!disabled && isNext && 'group-hover:translate-x-0.5'}
          ${!disabled && !isNext && 'group-hover:-translate-x-0.5'}
        `}
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={isNext ? "M9 5L16 12L9 19" : "M15 19L8 12L15 5"}
            stroke={disabled ? theme.textSecondary : theme.primary700}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  );
};

// Pagination Dot Component
const PaginationDot = ({ isActive, onClick, index, theme }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative rounded-full transition-all duration-300 ease-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        ${isActive 
          ? 'w-8 h-2' 
          : 'w-2 h-2 hover:w-3 hover:h-3 hover:opacity-100'
        }
      `}
      style={{
        backgroundColor: isActive ? theme.primary700 : theme.borderColor,
        opacity: isActive ? 1 : 0.6,
        focusVisible: { ringColor: theme.primary700 }
      }}
      aria-label={`Go to slide ${index + 1}`}
      aria-current={isActive ? "true" : "false"}
    >
      {isActive && (
        <span 
          className="absolute inset-0 rounded-full animate-pulse"
          style={{ 
            backgroundColor: theme.primary700,
            opacity: 0.3
          }}
        />
      )}
    </button>
  );
};

// ============= MAIN COMPONENT =============
const CarTechSlider = ({
  slides = [],
  className = "",
  title = "",
  subtitle = "",
  autoplay = true,
  autoplaySpeed = 5000,
  showCaptions = true,
  fullWidth = true,
  backdropImage = "",
  aspectRatio = "4/3",
  backgroundOverlay = true,
  showReadMoreLinks = true,
  primaryColor,
  customStyles = {},
}) => {
  // Component state
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [shouldShowNavigation, setShouldShowNavigation] = useState(false);
  const [currentBreakpoint, setCurrentBreakpoint] = useState('desktop');

  // Apply theme
  const theme = getTheme(primaryColor);
  
  // Merge styles
  const mergedStyles = {
    section: {
      backgroundColor: theme.contentBg,
      color: theme.text,
      borderTop: `1px solid ${theme.borderColor}`,
      borderBottom: `1px solid ${theme.borderColor}`,
      ...customStyles.section
    }
  };

  // Event handlers
  const handlePrev = useCallback(() => {
    swiperInstance?.slidePrev();
  }, [swiperInstance]);

  const handleNext = useCallback(() => {
    swiperInstance?.slideNext();
  }, [swiperInstance]);

  const handleSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  const handleDotClick = useCallback((index) => {
    swiperInstance?.slideTo(index);
  }, [swiperInstance]);

  // Effects
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Handle breakpoint changes and navigation visibility
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let breakpoint = 'desktop';
      let slidesPerView = 3;
      
      if (width < 640) {
        breakpoint = 'mobile';
        slidesPerView = 1;
      } else if (width < 768) {
        breakpoint = 'tablet-sm';
        slidesPerView = 2;
      } else if (width < 1024) {
        breakpoint = 'tablet';
        slidesPerView = 2;
      } else if (width < 1280) {
        breakpoint = 'desktop-sm';
        slidesPerView = 3;
      } else {
        breakpoint = 'desktop';
        slidesPerView = fullWidth ? 3 : 3;
      }
      
      setCurrentBreakpoint(breakpoint);
      setShouldShowNavigation(slides.length > slidesPerView);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [slides.length, fullWidth]);

  useEffect(() => {
    if (swiperInstance && autoplay) {
      if (isHovering) {
        swiperInstance.autoplay?.stop();
      } else {
        swiperInstance.autoplay?.start();
      }
    }
  }, [isHovering, autoplay, swiperInstance]);

  // Update navigation state when swiper instance is created or changes
  useEffect(() => {
    if (swiperInstance) {
      setIsBeginning(swiperInstance.isBeginning);
      setIsEnd(swiperInstance.isEnd);
      
      // Handle responsive update
      const onResize = () => {
        swiperInstance.update();
      };
      
      swiperInstance.on('resize', onResize);
      
      return () => {
        swiperInstance.off('resize', onResize);
      };
    }
  }, [swiperInstance]);

  if (!slides.length) {
    return null;
  }

  const getBreakpoints = () => {
    const breakpoints = {
      0: { slidesPerView: 1, spaceBetween: 16 },
      640: { slidesPerView: 2, spaceBetween: 20 },
      768: { slidesPerView: 2, spaceBetween: 24 },
      1024: { slidesPerView: 3, spaceBetween: 24 },
      1280: { slidesPerView: fullWidth ? 3 : 3, spaceBetween: 30 },
    };

    // If we have fewer slides than the max slidesPerView for any breakpoint, adjust it
    Object.keys(breakpoints).forEach(key => {
      const config = breakpoints[key];
      if (slides.length < config.slidesPerView) {
        config.slidesPerView = slides.length;
      }
    });

    return breakpoints;
  };

  const getContainerClass = () => {
    if (fullWidth) {
      return "w-full px-4 sm:px-6 lg:px-8";
    }
    return "container mx-auto px-4";
  };

  return (
    <section
      ref={sectionRef}
      className={`w-full py-8 md:py-12 lg:py-16 relative overflow-hidden ${className}`}
      style={mergedStyles.section}
      aria-labelledby="car-tech-slider-title"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {backdropImage && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={backdropImage}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          {backgroundOverlay && (
            <div 
              className="absolute inset-0"
              style={{ backgroundColor: theme.overlay }}
            ></div>
          )}
        </div>
      )}

      <div className={getContainerClass()}>
        <div className="max-w-[1920px] mx-auto">
          {title && (
            <div className="flex flex-col items-center mb-8 md:mb-12">
              <div className="flex justify-center mb-4">
                <div
                  className="h-1 transition-all duration-700 ease-out"
                  style={{
                    backgroundColor: theme.primary700,
                    width: isInView ? "96px" : "0",
                  }}
                ></div>
              </div>
              
              <h2
                id="car-tech-slider-title"
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 transition-all duration-500 relative"
                style={{
                  color: theme.text,
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "translateY(0)" : "translateY(20px)",
                }}
              >
                {title.includes('|') ? (
                  <>
                    {title.split('|')[0]} 
                    <span style={{ color: theme.primary900 }}>{title.split('|')[1]}</span>
                  </>
                ) : (
                  title
                )}
              </h2>
              
              <div
                className="w-24 h-0.5 mb-6 transition-all duration-700 ease-out delay-150"
                style={{
                  backgroundColor: theme.primary800,
                  opacity: 0.6,
                  transform: isInView ? "scaleX(1)" : "scaleX(0)",
                }}
              ></div>
              
              {subtitle && (
                <p 
                  className="text-center text-base md:text-lg max-w-3xl mx-auto transition-all duration-500 delay-200"
                  style={{ 
                    color: theme.textSecondary,
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? "translateY(0)" : "translateY(20px)",
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          )}

          <div className="relative">
            <Swiper
              onSwiper={setSwiperInstance}
              modules={[Navigation, Pagination, A11y, Autoplay]}
              spaceBetween={24}
              loop={false}
              autoplay={
                autoplay && shouldShowNavigation
                  ? {
                      delay: autoplaySpeed,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
                  : false
              }
              breakpoints={getBreakpoints()}
              onSlideChange={handleSlideChange}
              className={shouldShowNavigation ? "!px-12 md:!px-16" : ""}
              a11y={{
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
              }}
              watchSlidesProgress={true}
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={slide.id || index} className="h-auto">
                  <div
                    className="h-full flex flex-col backdrop-blur-sm transition-all duration-300 overflow-hidden rounded-lg"
                    style={{
                      backgroundColor: theme.cardBg,
                      border: `1px solid ${theme.borderColor}`,
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                    }}
                  >
                    <div 
                      className="relative overflow-hidden flex-grow"
                      style={{ aspectRatio: aspectRatio }}
                    >
                      {slide.mediaType === "image" ? (
                        slide.image ? (
                          <div className="relative w-full h-full group">
                            <Image
                              src={slide.image}
                              alt={slide.title || "Feature image"}
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              fill
                              priority={index < 3}
                              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                            />
                          </div>
                        ) : (
                          <ImagePlaceholder theme={theme} />
                        )
                      ) : slide.videoUrl ? (
                        <VideoPlayer
                          src={slide.videoUrl}
                          poster={slide.videoPoster}
                          theme={theme}
                        />
                      ) : (
                        <ImagePlaceholder theme={theme} />
                      )}
                    </div>

                    {showCaptions && (
                      <div className="px-5 py-5 bg-white border-t border-gray-100">
                        <div 
                          className="w-10 h-1 mb-4 transition-all duration-500"
                          style={{ 
                            backgroundColor: theme.primary700,
                            transform: isInView ? 'scaleX(1)' : 'scaleX(0)',
                            transformOrigin: 'left',
                            opacity: isInView ? 1 : 0
                          }}
                        ></div>
                        
                        <h3
                          className="text-lg md:text-xl lg:text-2xl font-bold mb-3 line-clamp-1 transition-all duration-300"
                          style={{ color: theme.text }}
                        >
                          {slide.title}
                        </h3>
                        
                        {slide.description && (
                          <p
                            className="text-sm md:text-base line-clamp-2 mb-4"
                            style={{ color: theme.textSecondary }}
                          >
                            {slide.description}
                          </p>
                        )}
                        
                        {showReadMoreLinks && slide.link && (
                          <a 
                            href={slide.link}
                            className="group inline-flex items-center text-sm font-medium mt-2 transition-all duration-300 hover:gap-3"
                            style={{ color: theme.primary700 }}
                          >
                            Learn more
                            <svg 
                              className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h14"></path>
                              <path d="M12 5l7 7-7 7"></path>
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Arrows - Only show when needed based on breakpoint */}
            {shouldShowNavigation && (
              <div className="hidden md:block">
                <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10">
                  <NavArrowButton 
                    direction="prev"
                    onClick={handlePrev}
                    disabled={isBeginning}
                    theme={theme}
                  />
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10">
                  <NavArrowButton 
                    direction="next"
                    onClick={handleNext}
                    disabled={isEnd}
                    theme={theme}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls - Only show when navigation is needed */}
          {shouldShowNavigation && (
            <div className="mt-8">
              {/* Pagination Dots */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {slides.map((_, index) => (
                  <PaginationDot
                    key={index}
                    isActive={index === activeIndex}
                    onClick={() => handleDotClick(index)}
                    index={index}
                    theme={theme}
                  />
                ))}
              </div>
              
              {/* Mobile Navigation Arrows */}
              <div className="flex items-center justify-center gap-4 md:hidden">
                <NavArrowButton 
                  direction="prev"
                  onClick={handlePrev}
                  disabled={isBeginning}
                  theme={theme}
                />
                <NavArrowButton 
                  direction="next"
                  onClick={handleNext}
                  disabled={isEnd}
                  theme={theme}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CarTechSlider;