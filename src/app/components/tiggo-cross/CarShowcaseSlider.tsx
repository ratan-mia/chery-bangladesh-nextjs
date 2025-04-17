'use client';

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

// Sample data if none is provided
const slidesData = [
  {
    id: "exterior",
    src: "/images/tiggocross/hero/1.webp",
    modelName: "TIGGO CROSS",
    tagline: "FOR EVERY KIND OF YOU",
    brochureLink: "#",
    testDriveLink: "#",
    buttonText: {
      brochure: "View Brochure",
      testDrive: "Test Drive"
    }
  },
  {
    id: "interior",
    src: "/images/tiggocross/hero/2.webp",
    modelName: "TIGGO CROSS",
    tagline: "COMFORT REDEFINED",
    brochureLink: "#",
    testDriveLink: "#",
    buttonText: {
      brochure: "View Brochure",
      testDrive: "Test Drive"
    }
  },
];

const CarShowcase = ({
  slides = slidesData,
  height = "h-[80vh]",
  autoplaySpeed = 6000,
  showNavigation = true,
  className = "",
  buttonColor = "#8c735d", // Primary 700 from Chery design system
  navigationPosition = 'bottom',
  navigationStyle = 'lines',
}) => {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Check if on mobile device for responsive adjustments
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  // Pause autoplay on hover
  const handleMouseEnter = () => {
    if (swiperInstance && isPlaying) {
      swiperInstance.autoplay.stop();
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (swiperInstance && isPlaying) {
      swiperInstance.autoplay.start();
      setIsHovered(false);
    }
  };

  // Toggle autoplay
  const toggleAutoplay = () => {
    if (swiperInstance) {
      if (isPlaying) {
        swiperInstance.autoplay.stop();
      } else {
        swiperInstance.autoplay.start();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Calculate navigation position
  const getNavigationPosition = () => {
    switch (navigationPosition) {
      case 'top':
        return 'top-8';
      case 'middle':
        return 'top-1/2 -translate-y-1/2';
      default:
        return 'bottom-10 md:bottom-12';
    }
  };

  if (!slides || slides.length === 0) {
    return (
      <div
        className={`flex items-center justify-center ${height} bg-gray-900`}
      >
        <p className="text-white text-xl">No vehicles available to display</p>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden ${className} ${height}`}
      role="region"
      aria-label="Car showcase"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {mounted && (
        <Swiper
          modules={[Autoplay, EffectFade, Navigation]}
          effect="fade"
          speed={1000}
          slidesPerView={1}
          loop={true}
          autoplay={
            isPlaying
              ? {
                delay: autoplaySpeed,
                disableOnInteraction: false,
              }
              : false
          }
          onSlideChange={handleSlideChange}
          onSwiper={setSwiperInstance}
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id || index} className="h-full">
              <div className="relative h-full w-full">
                {/* Background gradient for better text readability */}
                <div
                  className="absolute inset-0 z-0 bg-gradient-to-b from-black/20 via-transparent to-black/70"
                  aria-hidden="true"
                >
                  <Image
                    src={slide.src}
                    alt={`${slide.modelName} - ${slide.tagline}`}
                    fill
                    priority
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    sizes="100vw"
                    quality={95}
                  />
                </div>

                {/* Content positioned at bottom with animation */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-8 md:p-12 lg:p-16 transform transition-transform duration-500">
                  <div className="max-w-7xl mx-auto">
                    <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider uppercase mb-2 animate-fade-in">
                      {slide.modelName}
                    </h2>
                    <p className="text-white text-lg md:text-xl uppercase tracking-wide mb-8 animate-fade-in-delay">
                      {slide.tagline}
                    </p>

                    <div className="flex flex-wrap gap-4">
                      {slide.brochureLink && (
                        <a
                          href={slide.brochureLink}
                          className="text-white px-8 py-3 inline-block transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                          style={{ backgroundColor: buttonColor }}
                        >
                          {slide.buttonText?.brochure || "View Brochure"}
                        </a>
                      )}

                      {slide.testDriveLink && (
                        <a
                          href={slide.testDriveLink}
                          className="text-white border-2 border-white px-8 py-3 inline-block transition-all duration-300 bg-transparent hover:bg-white hover:text-black hover:shadow-lg hover:-translate-y-1"
                        >
                          {slide.buttonText?.testDrive || "Test Drive"}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Navigation indicators with improved styling */}
      {showNavigation && slides.length > 1 && (
        <div className={`absolute ${getNavigationPosition()} left-0 right-0 z-20 flex justify-center`}>
          <div className="flex items-center space-x-3 py-2 px-3 rounded-full bg-black/20 backdrop-blur">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => swiperInstance?.slideTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={activeIndex === idx ? "true" : "false"}
                className={navigationStyle === 'lines'
                  ? `h-1 transition-all duration-500 ${activeIndex === idx
                    ? "w-8 bg-white"
                    : "w-4 bg-white/40 hover:bg-white/60"}`
                  : `w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === idx ? "bg-white scale-110" : "bg-white/50 hover:bg-white/70"
                  }`
                }
              />
            ))}

            {/* Autoplay control button */}
            <button
              onClick={toggleAutoplay}
              className="ml-2 pl-2 border-l border-white/30"
              aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="6" y="4" width="4" height="16" fill="white" />
                  <rect x="14" y="4" width="4" height="16" fill="white" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path fillRule="evenodd" d="M5 3l14 9-14 9V3z" fill="white" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Enhanced arrow navigation */}
      <div className={`${isMobile ? 'hidden' : 'block'} opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}>
        <button
          onClick={() => swiperInstance?.slidePrev()}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-black/30 backdrop-blur rounded-full hover:bg-black/50 transition-all duration-300"
          aria-label="Previous slide"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M15 19L8 12L15 5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={() => swiperInstance?.slideNext()}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-black/30 backdrop-blur rounded-full hover:bg-black/50 transition-all duration-300"
          aria-label="Next slide"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M9 5L16 12L9 19"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Slide counter */}
      <div className="absolute top-4 right-4 z-10 bg-black/30 backdrop-blur px-3 py-1 rounded-full text-white text-sm">
        <span>{activeIndex + 1}</span>
        <span> / </span>
        <span>{slides.length}</span>
      </div>
    </div>
  );
};

export default CarShowcase;