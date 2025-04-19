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

// Theme configuration modified with white background
const themes = {
  dark: {
    accent: "#8c735d", // Primary 700
    text: "#F9FAFB", // Gray 50
    textSecondary: "#D1D5DB", // Gray 300
    buttonBg: "#524336", // Primary 900
    buttonText: "#FFFFFF",
    contentBg: "#1F2937", // Gray 800
    borderColor: "#374151", // Gray 700
    cardBg: "#111827", // Gray 900
    overlay: "rgba(0, 0, 0, 0.7)"
  },
  light: {
    accent: "#8c735d", // Primary 700
    text: "#111827", // Gray 900
    textSecondary: "#4B5563", // Gray 600
    buttonBg: "#F3F4F6", // Gray 100
    buttonText: "#111827", // Gray 900
    contentBg: "#FFFFFF", // White background
    borderColor: "#E5E7EB", // Gray 200
    cardBg: "#F9FAFB", // Gray 50
    overlay: "rgba(255, 255, 255, 0.7)"
  },
};

// Setting the default theme to light
const defaultTheme = "light";

// Media placeholder component with improved design
const ImagePlaceholder = ({ currentTheme }) => {
  const theme = themes[currentTheme];

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
        style={{ color: theme.accent }}
      >
        <rect x="3" y="3" width="18" height="18" rx="0" ry="0"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
      </svg>
    </div>
  );
};

// Enhanced video player component with autoplay and better loading
const VideoPlayer = ({ src, poster, currentTheme }) => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const theme = themes[currentTheme];

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
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
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

// Improved navigation buttons component with smoother hover effects
const NavigationButtons = ({ onPrev, onNext, currentTheme }) => {
  const theme = themes[currentTheme];

  return (
    <div className="flex justify-center space-x-4 mt-5">
      <button
        onClick={onPrev}
        className="flex items-center justify-center w-12 h-12 transition-all duration-300 hover:scale-105"
        style={{
          backgroundColor: theme.buttonBg,
          color: theme.buttonText,
        }}
        aria-label="Previous slide"
      >
        <svg
          className="w-5 h-5"
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
        className="flex items-center justify-center w-12 h-12 transition-all duration-300 hover:scale-105"
        style={{
          backgroundColor: theme.buttonBg,
          color: theme.buttonText,
        }}
        aria-label="Next slide"
      >
        <svg
          className="w-5 h-5"
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

// Improved pagination indicator with better UI and accessibility
const PaginationIndicator = ({
  activeIndex,
  totalSlides,
  onDotClick,
  currentTheme,
}) => {
  const slideIndices = Array.from({ length: totalSlides }, (_, i) => i);
  const theme = themes[currentTheme];

  return (
    <div className="flex items-center justify-center space-x-2 py-3">
      {slideIndices.map((index) => (
        <button
          key={index}
          className="transition-all duration-300 cursor-pointer"
          style={{
            backgroundColor: index === activeIndex ? theme.accent : `${theme.accent}40`,
            width: "24px",
            height: "2px",
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

// Main component
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
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [currentTheme, setCurrentTheme] = useState(defaultTheme); // Set to light theme by default
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [slideChangeDirection, setSlideChangeDirection] = useState("next");

  const theme = themes[currentTheme];

  const handlePrev = useCallback(() => {
    setSlideChangeDirection("prev");
    swiperInstance?.slidePrev();
  }, [swiperInstance]);

  const handleNext = useCallback(() => {
    setSlideChangeDirection("next");
    swiperInstance?.slideNext();
  }, [swiperInstance]);

  const handleSlideChange = useCallback((swiper) => {
    // Determine direction based on current and new index
    if (activeIndex !== swiper.realIndex) {
      const isNext = (swiper.realIndex > activeIndex) || 
                      (activeIndex === slides.length - 1 && swiper.realIndex === 0);
      setSlideChangeDirection(isNext ? "next" : "prev");
      setActiveIndex(swiper.realIndex);
    }
  }, [activeIndex, slides]);

  const handleDotClick = useCallback(
    (index) => {
      setSlideChangeDirection(index > activeIndex ? "next" : "prev");
      swiperInstance?.slideTo(index);
    },
    [swiperInstance, activeIndex]
  );

  // Observer to check if section is in view
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

  useEffect(() => {
    if (swiperInstance && autoplay) {
      if (isHovering) {
        swiperInstance.autoplay?.stop();
      } else {
        swiperInstance.autoplay?.start();
      }
    }
  }, [isHovering, autoplay, swiperInstance]);

  // Removed theme detector to always use light theme
  // You can uncomment this if you want to keep the auto-detection functionality
  /*
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      setCurrentTheme(e.matches ? 'dark' : 'light');
    };
    
    // Set initial value
    setCurrentTheme(darkModeMediaQuery.matches ? 'dark' : 'light');
    
    // Listen for changes
    darkModeMediaQuery.addEventListener('change', handleChange);
    
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);
  */

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

  // Get breakpoints configuration based on layout
  const getBreakpoints = () => {
    if (layout === "fullscreen" || layout === "showcase") {
      return {
        0: { slidesPerView: 1 }
      };
    }
    
    return {
      0: { slidesPerView: 1, spaceBetween: 16 },
      640: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 24 },
      1280: { slidesPerView: 4, spaceBetween: 30 },
    };
  };

  // Get container class based on fullWidth prop
  const getContainerClass = () => {
    if (fullWidth) {
      return "w-full px-4 sm:px-6 lg:px-8";
    }
    return "container mx-auto px-4";
  };

  return (
    <section
      ref={sectionRef}
      className={`w-full py-12 md:py-16 relative overflow-hidden ${className}`}
      style={{
        backgroundColor: theme.contentBg, // White background
        color: theme.text,
        borderTop: `1px solid ${theme.borderColor}`,
        borderBottom: `1px solid ${theme.borderColor}`,
      }}
      aria-labelledby="car-tech-slider-title"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Optional backdrop image */}
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
        <div className="max-w-12xl mx-auto">
          {title && (
            <div className="flex justify-center mb-4">
              <div
                className="h-1 transition-all duration-700 ease-out"
                style={{
                  backgroundColor: theme.accent,
                  width: isInView ? "96px" : "0",
                }}
              ></div>
            </div>
          )}

          {title && (
            <h2
              id="car-tech-slider-title"
              className="text-3xl md:text-4xl font-bold text-center mb-3 transition-all duration-500"
              style={{
                color: theme.text,
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {title}
            </h2>
          )}

          {subtitle && (
            <p 
              className="text-center text-lg mb-10 max-w-3xl mx-auto transition-all duration-500 delay-100"
              style={{ 
                color: theme.textSecondary,
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {subtitle}
            </p>
          )}

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
              className="mb-8"
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
                    className={`h-full flex flex-col backdrop-blur-sm transition-all duration-300 ${
                      layout === "fullscreen" ? "p-0" : "p-3"
                    }`}
                    style={{
                      backgroundColor: layout === "fullscreen" ? "transparent" : theme.cardBg,
                      border: layout === "fullscreen" ? "none" : `1px solid ${theme.borderColor}`,
                      transform: `perspective(1000px) rotateY(${isInView ? "0" : slideChangeDirection === "next" ? "5deg" : "-5deg"})`,
                      opacity: isInView ? 1 : 0.8,
                      transition: "transform 0.5s ease, opacity 0.5s ease",
                    }}
                  >
                    <div 
                      className={`relative overflow-hidden flex-grow ${
                        layout === "fullscreen" ? "w-full h-96 md:h-[500px]" : ""
                      }`} 
                      style={{ aspectRatio: layout !== "fullscreen" ? aspectRatio : "auto" }}
                    >
                      {slide.mediaType === "image" ? (
                        slide.image ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={slide.image}
                              alt={slide.title || "Feature image"}
                              className="object-cover"
                              fill
                              priority={index < 3}
                              sizes={layout === "fullscreen" ? "100vw" : "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"}
                            />
                            {layout === "fullscreen" && (
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            )}
                          </div>
                        ) : (
                          <ImagePlaceholder currentTheme={currentTheme} />
                        )
                      ) : slide.videoUrl ? (
                        <VideoPlayer
                          src={slide.videoUrl}
                          poster={slide.videoPoster}
                          currentTheme={currentTheme}
                        />
                      ) : (
                        <ImagePlaceholder currentTheme={currentTheme} />
                      )}

                      {/* Fullscreen layout caption overlay */}
                      {showCaptions && layout === "fullscreen" && (
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                          <h3
                            className="text-2xl font-semibold mb-2 text-white"
                          >
                            {slide.title}
                          </h3>
                          {slide.description && (
                            <p
                              className="text-base text-gray-300"
                            >
                              {slide.description}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Standard caption for grid layout */}
                    {showCaptions && layout !== "fullscreen" && (
                      <div className="mt-4 px-1">
                        <h3
                          className="text-lg font-semibold mb-2"
                          style={{ color: theme.text }}
                        >
                          {slide.title}
                        </h3>
                        {slide.description && (
                          <p
                            className="text-sm line-clamp-2"
                            style={{ color: theme.textSecondary }}
                          >
                            {slide.description}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {slides.length > 1 && (
              <div className="flex flex-col items-center space-y-1">
                <PaginationIndicator
                  activeIndex={activeIndex}
                  totalSlides={slides.length}
                  onDotClick={handleDotClick}
                  currentTheme={currentTheme}
                />

                <NavigationButtons
                  onPrev={handlePrev}
                  onNext={handleNext}
                  currentTheme={currentTheme}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarTechSlider;