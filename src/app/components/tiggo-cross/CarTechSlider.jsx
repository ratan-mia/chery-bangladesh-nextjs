"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { A11y, Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Theme configuration using Chery Bangladesh design system guidelines
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
  // For now, just return the original color since we can't manipulate colors at runtime in this context
  return hex;
};

// Media placeholder component with design system aesthetics
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

// Enhanced video player with optimized loading and autoplay controls
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

// Enhanced navigation buttons with improved positioning and design
const NavigationButtons = ({ onPrev, onNext, theme }) => {
  return (
    <div className="flex items-center justify-center space-x-4 mt-6">
      <button
        onClick={onPrev}
        className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300 hover:scale-105 hover:shadow-md rounded-full focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2 group"
        style={{
          backgroundColor: "#FFFFFF",
          color: theme.primary900,
          border: `1px solid ${theme.borderColor}`,
        }}
        aria-label="Previous slide"
      >
        <svg
          className="w-5 h-5 group-hover:transform group-hover:translate-x-[-2px] transition-transform duration-300"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 19L8 12L15 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        onClick={onNext}
        className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300 hover:scale-105 hover:shadow-md rounded-full focus:outline-none focus:ring-2 focus:ring-primary-900 focus:ring-offset-2 group"
        style={{
          backgroundColor: theme.primary700,
          color: "#FFFFFF",
        }}
        aria-label="Next slide"
      >
        <svg
          className="w-5 h-5 group-hover:transform group-hover:translate-x-[2px] transition-transform duration-300"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 5L16 12L9 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

// Enhanced pagination indicator with refined styling and better accessibility
const PaginationIndicator = ({ activeIndex, totalSlides, onDotClick, theme }) => {
  const slideIndices = Array.from({ length: totalSlides }, (_, i) => i);

  return (
    <div className="flex items-center justify-center space-x-3 py-4">
      {slideIndices.map((index) => (
        <button
          key={index}
          className="transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 rounded-sm"
          style={{
            backgroundColor: index === activeIndex ? theme.primary700 : theme.borderColor,
            width: index === activeIndex ? "32px" : "20px",
            height: "4px",
            opacity: index === activeIndex ? 1 : 0.5,
            transform: index === activeIndex ? "scaleX(1.2)" : "scaleX(1)",
          }}
          onClick={() => onDotClick(index)}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === activeIndex ? "true" : "false"}
        />
      ))}
    </div>
  );
};

// Main component with comprehensive design system integration
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
  layout = "grid", // "grid", "fullscreen", "showcase"
  aspectRatio = "4/3", // image aspect ratio "1/1", "4/3", "16/9", etc.
  backgroundOverlay = true,
  showReadMoreLinks = true, // Option to show/hide "Read more" links
  primaryColor, // Optional custom primary color
  customStyles = {}, // Optional custom styles object for additional customization
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [slideChangeDirection, setSlideChangeDirection] = useState("next");

  // Apply theme with potential custom color
  const theme = getTheme(primaryColor);
  
  // Merge default styles with custom styles
  const mergedStyles = {
    section: {
      backgroundColor: theme.contentBg,
      color: theme.text,
      borderTop: `1px solid ${theme.borderColor}`,
      borderBottom: `1px solid ${theme.borderColor}`,
      ...customStyles.section
    }
  };

  const handlePrev = useCallback(() => {
    setSlideChangeDirection("prev");
    swiperInstance?.slidePrev();
  }, [swiperInstance]);

  const handleNext = useCallback(() => {
    setSlideChangeDirection("next");
    swiperInstance?.slideNext();
  }, [swiperInstance]);

  const handleSlideChange = useCallback((swiper) => {
    if (activeIndex !== swiper.realIndex) {
      const isNext = (swiper.realIndex > activeIndex) || 
                      (activeIndex === slides.length - 1 && swiper.realIndex === 0);
      setSlideChangeDirection(isNext ? "next" : "prev");
      setActiveIndex(swiper.realIndex);
    }
  }, [activeIndex, slides.length]);

  const handleDotClick = useCallback(
    (index) => {
      setSlideChangeDirection(index > activeIndex ? "next" : "prev");
      swiperInstance?.slideTo(index);
    },
    [swiperInstance, activeIndex]
  );

  // Observer for section visibility
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

  // Handle autoplay pause/resume on hover
  useEffect(() => {
    if (swiperInstance && autoplay) {
      if (isHovering) {
        swiperInstance.autoplay?.stop();
      } else {
        swiperInstance.autoplay?.start();
      }
    }
  }, [isHovering, autoplay, swiperInstance]);

  if (!slides.length) {
    return null;
  }

  // Calculate slides per view based on layout
  const getSlidesPerView = () => {
    if (layout === "fullscreen" || layout === "showcase") {
      return 1;
    }
    return undefined; // Let breakpoints handle it for grid layout
  };

  // Get responsive breakpoints configuration
  const getBreakpoints = () => {
    if (layout === "fullscreen" || layout === "showcase") {
      return {
        0: { slidesPerView: 1 }
      };
    }
    
    return {
      0: { slidesPerView: 1, spaceBetween: 16 },
      640: { slidesPerView: 2, spaceBetween: 20 },
      768: { slidesPerView: 2, spaceBetween: 24 },
      1024: { slidesPerView: 3, spaceBetween: 24 },
      1280: { slidesPerView: fullWidth ? 4 : 3, spaceBetween: 30 },
    };
  };

  // Responsive container class
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
      {/* Optional backdrop image with overlay */}
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
          {/* Enhanced section header with animation sequence */}
          {title && (
            <div className="flex flex-col items-center mb-8 md:mb-12">
              {/* Top accent line with animation */}
              <div className="flex justify-center mb-4">
                <div
                  className="h-1 transition-all duration-700 ease-out"
                  style={{
                    backgroundColor: theme.primary700,
                    width: isInView ? "96px" : "0",
                  }}
                ></div>
              </div>
              
              {/* Main title with animation */}
              <h2
                id="car-tech-slider-title"
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 transition-all duration-500 relative"
                style={{
                  color: theme.text,
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "translateY(0)" : "translateY(20px)",
                }}
              >
                {/* Optional highlight for part of the title */}
                {title.includes('|') ? (
                  <>
                    {title.split('|')[0]} 
                    <span style={{ color: theme.primary900 }}>{title.split('|')[1]}</span>
                  </>
                ) : (
                  title
                )}
              </h2>
              
              {/* Bottom accent decoration */}
              <div
                className="w-24 h-0.5 mb-6 transition-all duration-700 ease-out delay-150"
                style={{
                  backgroundColor: theme.primary800,
                  opacity: 0.6,
                  transform: isInView ? "scaleX(1)" : "scaleX(0)",
                }}
              ></div>
              
              {/* Subtitle with animation */}
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

          {/* Main slider component */}
          <div className="relative mx-auto">
            <Swiper
              onSwiper={setSwiperInstance}
              modules={[Navigation, Pagination, A11y, Autoplay, EffectFade]}
              slidesPerView={getSlidesPerView()}
              spaceBetween={24}
              loop={slides.length > 1}
              effect={layout === "fullscreen" ? "fade" : undefined}
              autoplay={
                autoplay
                  ? {
                      delay: autoplaySpeed,
                      disableOnInteraction: false,
                    }
                  : false
              }
              breakpoints={getBreakpoints()}
              onSlideChange={handleSlideChange}
              className="mb-6 md:mb-8"
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
                    className={`h-full flex flex-col backdrop-blur-sm transition-all duration-300 rounded-md overflow-hidden ${
                      layout === "fullscreen" ? "p-0" : "p-0" // Changed to p-0 for better design
                    }`}
                    style={{
                      backgroundColor: layout === "fullscreen" ? "transparent" : theme.cardBg,
                      border: layout === "fullscreen" ? "none" : `1px solid ${theme.borderColor}`,
                      transform: `perspective(1000px) rotateY(${isInView ? "0" : slideChangeDirection === "next" ? "5deg" : "-5deg"})`,
                      opacity: isInView ? 1 : 0.8,
                      transition: "transform 0.5s ease, opacity 0.5s ease, box-shadow 0.3s ease",
                      boxShadow: isHovering ? "0 10px 25px rgba(0, 0, 0, 0.08)" : "0 4px 12px rgba(0, 0, 0, 0.05)"
                    }}
                  >
                    {/* Media container (image or video) */}
                    <div 
                      className={`relative overflow-hidden flex-grow ${
                        layout === "fullscreen" ? "w-full h-64 sm:h-80 md:h-96 lg:h-[500px]" : ""
                      }`} 
                      style={{ aspectRatio: layout !== "fullscreen" ? aspectRatio : "auto" }}
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
                              sizes={layout === "fullscreen" ? "100vw" : "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"}
                            />
                            {layout === "fullscreen" && (
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            )}
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

                      {/* Improved fullscreen layout caption overlay */}
                      {showCaptions && layout === "fullscreen" && (
                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10">
                          {/* Background overlay with gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
                          
                          {/* Caption content */}
                          <div className="relative z-10 max-w-3xl">
                            {/* Optional decorative accent line */}
                            <div 
                              className="w-12 h-1 mb-4 bg-white opacity-80"
                            ></div>
                            
                            <h3
                              className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 md:mb-4 text-white"
                            >
                              {slide.title}
                            </h3>
                            
                            {slide.description && (
                              <p
                                className="text-sm md:text-base text-gray-200 line-clamp-2 md:line-clamp-3 lg:line-clamp-none max-w-xl leading-relaxed"
                              >
                                {slide.description}
                              </p>
                            )}
                            
                            {/* CTA button for fullscreen layout */}
                            {showReadMoreLinks && slide.link && (
                              <a
                                href={slide.link}
                                className="inline-flex items-center mt-6 px-6 py-2 bg-white text-primary-900 font-medium text-sm rounded hover:bg-primary-700 hover:text-white transition-all duration-300 group"
                              >
                                Learn More
                                <svg 
                                  className="w-4 h-4 ml-2 group-hover:ml-3 transition-all duration-300"
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
                        </div>
                      )}
                    </div>

                    {/* Enhanced caption styling for grid/showcase layout */}
                    {showCaptions && layout !== "fullscreen" && (
                      <div className="px-5 py-5 bg-white border-t border-gray-100">
                        {/* Decorative accent line on top of caption */}
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
                          className="text-lg md:text-xl lg:text-2xl font-bold mb-3 line-clamp-1 transition-all duration-300 hover:text-primary-700"
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
                        
                        {/* Read more link with enhanced styling */}
                        {showReadMoreLinks && slide.link && (
                          <a 
                            href={slide.link}
                            className="group inline-flex items-center text-sm font-medium mt-2 transition-all duration-300 uppercase tracking-wider"
                            style={{ color: theme.primary700 }}
                          >
                            Learn more
                            <svg 
                              className="w-4 h-4 ml-2 group-hover:ml-3 transition-all duration-300"
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

            {/* Improved navigation layout and positioning */}
            {slides.length > 1 && (
              <>
                {/* Absolute positioned navigation arrows for larger screens */}
                <div className="hidden md:block">
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 z-10 flex items-center justify-center w-12 h-12 -mt-6 transition-all duration-300 hover:scale-105 hover:shadow-md rounded-full focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2 bg-white bg-opacity-80 backdrop-blur-sm group"
                    style={{
                      color: theme.primary900,
                      border: `1px solid ${theme.borderColor}`,
                    }}
                    aria-label="Previous slide"
                  >
                    <svg
                      className="w-5 h-5 group-hover:transform group-hover:translate-x-[-2px] transition-transform duration-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 19L8 12L15 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 z-10 flex items-center justify-center w-12 h-12 -mt-6 transition-all duration-300 hover:scale-105 hover:shadow-md rounded-full focus:outline-none focus:ring-2 focus:ring-primary-900 focus:ring-offset-2 group"
                    style={{
                      backgroundColor: theme.primary700,
                      color: "#FFFFFF",
                    }}
                    aria-label="Next slide"
                  >
                    <svg
                      className="w-5 h-5 group-hover:transform group-hover:translate-x-[2px] transition-transform duration-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 5L16 12L9 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                
                {/* Centered pagination and navigation for all screens */}
                <div className="flex flex-col items-center mt-4">
                  <PaginationIndicator
                    activeIndex={activeIndex}
                    totalSlides={slides.length}
                    onDotClick={handleDotClick}
                    theme={theme}
                  />
                  
                  {/* Navigation buttons only shown on mobile */}
                  <div className="md:hidden">
                    <NavigationButtons
                      onPrev={handlePrev}
                      onNext={handleNext}
                      theme={theme}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarTechSlider;