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

// Theme configuration with refined earth tones inspired by CarColorSwitcher
const theme = {
  primary: '#8c735d',
  primaryDark: '#65584A',
  primaryLight: '#A59988',
  accent: '#D3B88C',
  text: '#2D2A26',
  textSecondary: '#5F574E',
  buttonBg: '#F3F4F6',
  buttonText: '#2D2A26',
  contentBg: '#FFFFFF', // Changed from F7F6F4 to match CarColorSwitcher's background
  borderColor: '#E5E0DB',
  cardBg: '#F5F4F2',
  highlight: '#F0EBE5',
  overlay: "rgba(255, 255, 255, 0.7)"
};

// Media placeholder component with improved design
const ImagePlaceholder = () => {
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
        style={{ color: theme.primary }}
      >
        <rect x="3" y="3" width="18" height="18" rx="0" ry="0"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
      </svg>
    </div>
  );
};

// Enhanced video player component with autoplay and better loading
const VideoPlayer = ({ src, poster }) => {
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
          <div className="w-10 h-10 border-4 rounded-full animate-spin" style={{ borderColor: theme.primary, borderTopColor: 'transparent' }}></div>
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

// Improved navigation buttons component with refined styling
const NavigationButtons = ({ onPrev, onNext }) => {
  return (
    <div className="flex justify-center space-x-4 mt-5">
      <button
        onClick={onPrev}
        className="flex items-center justify-center w-12 h-12 transition-all duration-300 hover:scale-105 rounded-full"
        style={{
          backgroundColor: theme.buttonBg,
          color: theme.primaryDark,
          border: `1px solid ${theme.borderColor}`
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
        className="flex items-center justify-center w-12 h-12 transition-all duration-300 hover:scale-105 rounded-full"
        style={{
          backgroundColor: theme.primary,
          color: "#FFFFFF",
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
}) => {
  const slideIndices = Array.from({ length: totalSlides }, (_, i) => i);

  return (
    <div className="flex items-center justify-center space-x-2 py-3">
      {slideIndices.map((index) => (
        <button
          key={index}
          className="transition-all duration-300 cursor-pointer"
          style={{
            backgroundColor: index === activeIndex ? theme.primary : theme.borderColor,
            width: "24px",
            height: "3px",
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
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [slideChangeDirection, setSlideChangeDirection] = useState("next");

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
        backgroundColor: theme.contentBg,
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
                  backgroundColor: theme.primary,
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
                    className={`h-full flex flex-col backdrop-blur-sm transition-all duration-300 rounded-sm ${
                      layout === "fullscreen" ? "p-0" : "p-3"
                    }`}
                    style={{
                      backgroundColor: layout === "fullscreen" ? "transparent" : theme.cardBg,
                      border: layout === "fullscreen" ? "none" : `1px solid ${theme.borderColor}`,
                      transform: `perspective(1000px) rotateY(${isInView ? "0" : slideChangeDirection === "next" ? "5deg" : "-5deg"})`,
                      opacity: isInView ? 1 : 0.8,
                      transition: "transform 0.5s ease, opacity 0.5s ease, box-shadow 0.3s ease",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
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
                          <ImagePlaceholder />
                        )
                      ) : slide.videoUrl ? (
                        <VideoPlayer
                          src={slide.videoUrl}
                          poster={slide.videoPoster}
                        />
                      ) : (
                        <ImagePlaceholder />
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
                />

                <NavigationButtons
                  onPrev={handlePrev}
                  onNext={handleNext}
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