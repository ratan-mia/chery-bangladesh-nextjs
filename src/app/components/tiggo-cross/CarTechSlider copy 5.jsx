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

// Theme configuration based on the Chery Bangladesh Design System
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
  },
  light: {
    accent: "#8c735d", // Primary 700
    text: "#111827", // Gray 900
    textSecondary: "#4B5563", // Gray 600
    buttonBg: "#F3F4F6", // Gray 100
    buttonText: "#111827", // Gray 900
    contentBg: "#FFFFFF",
    borderColor: "#E5E7EB", // Gray 200
    cardBg: "#F9FAFB", // Gray 50
  },
};

// Media placeholder component
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
        className="w-10 h-10"
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

// Video player component with autoplay
const VideoPlayer = ({ src, poster, currentTheme }) => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
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
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
        poster={poster}
        autoPlay
        aria-label="Feature demonstration video"
      >
        {isVisible && <source src={src} type="video/mp4" />}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

// Navigation buttons component
const NavigationButtons = ({ onPrev, onNext, currentTheme }) => {
  const theme = themes[currentTheme];

  return (
    <div className="flex justify-center space-x-3 mt-4">
      <button
        onClick={onPrev}
        className="flex items-center justify-center w-10 h-10 transition-all duration-300"
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
        className="flex items-center justify-center w-10 h-10 transition-all duration-300"
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

// Pagination indicator component
const PaginationIndicator = ({
  activeIndex,
  totalSlides,
  onDotClick,
  currentTheme,
}) => {
  const slideIndices = Array.from({ length: totalSlides }, (_, i) => i);
  const theme = themes[currentTheme];

  return (
    <div className="flex items-center justify-center space-x-2 py-2">
      {slideIndices.map((index) => (
        <button
          key={index}
          className="transition-all duration-300 cursor-pointer"
          style={{
            backgroundColor: index === activeIndex ? theme.accent : `${theme.accent}40`,
            width: index === activeIndex ? "10px" : "8px",
            height: index === activeIndex ? "10px" : "8px",
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
  title = "Advanced Safety Technology",
  autoplay = true,
  autoplaySpeed = 5000,
  showCaptions = true,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [currentTheme, setCurrentTheme] = useState("light"); // Default to light theme
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  const theme = themes[currentTheme];

  const handlePrev = useCallback(() => {
    swiperInstance?.slidePrev();
  }, [swiperInstance]);

  const handleNext = useCallback(() => {
    swiperInstance?.slideNext();
  }, [swiperInstance]);

  const handleSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const handleDotClick = useCallback(
    (index) => {
      swiperInstance?.slideTo(index);
    },
    [swiperInstance]
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

  return (
    <section
      ref={sectionRef}
      className={`w-full py-8 md:py-12 relative overflow-hidden ${className}`}
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
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
              className="text-3xl md:text-4xl font-bold text-center mb-10 transition-all duration-500"
              style={{
                color: theme.text,
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {title}
            </h2>
          )}

          <div className="relative mx-auto">
            <Swiper
              onSwiper={setSwiperInstance}
              modules={[Navigation, Pagination, A11y, Autoplay]}
              slidesPerView={1}
              spaceBetween={16}
              loop={slides.length > 1}
              autoplay={
                autoplay
                  ? {
                      delay: autoplaySpeed,
                      disableOnInteraction: false,
                    }
                  : false
              }
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              }}
              onSlideChange={handleSlideChange}
              className="mb-6"
              a11y={{
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
              }}
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={slide.id || index} className="h-auto">
                  <div
                    className="h-full flex flex-col backdrop-blur-sm p-3 shadow-sm transition-all duration-300"
                    style={{
                      backgroundColor: theme.cardBg,
                      border: `1px solid ${theme.borderColor}`,
                    }}
                  >
                    <div className="relative overflow-hidden flex-grow aspect-[4/3]">
                      {slide.mediaType === "image" ? (
                        slide.image ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={slide.image}
                              alt={slide.title || "Feature image"}
                              className="object-cover"
                              fill
                              priority={index < 3}
                              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                            />
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
                    </div>

                    {showCaptions && (
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
              <div className="flex flex-col items-center space-y-4">
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