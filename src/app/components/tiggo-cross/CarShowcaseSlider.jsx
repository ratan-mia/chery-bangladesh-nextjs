import { useEffect, useRef, useState } from 'react';
import { Autoplay, EffectFade, Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useModal } from '@/contexts/ModalContext';


// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

// Vehicle data
const tiggoCrossData = {
  id: "tiggocross",
  modelName: "TIGGO CROSS",
  modelYear: "2025",
  tagline: "FOR EVERY KIND OF YOU",
  accentColor: '#8c735d',
  slides: [
    {
      id: "exterior",
      title: "BIOMIMETIC TIGER FACE",
      subtitle: "Aerodynamic Modern Design",
      description: "Featuring a starry diamond-shaped grille pattern, tiger claw style headlight trim, and vertical crystal-edged marker lamps for a truly distinctive appearance.",
      type: "exterior",
      src: "/images/tiggocross/hero/exterior.jpg",
      specs: [
        { label: "Engine", value: "1.5L Turbo" },
        { label: "Power", value: "145 BHP" },
        { label: "Torque", value: "210 Nm" },
        { label: "Transmission", value: "6-Speed DCT" }
      ],
      features: [
        "Starry Diamond-Shaped Grille Pattern",
        "Tiger Claw Style Headlight Trim",
        "Vertical Crystal-Edged Marker Lamp",
        "Sleek and Aerodynamic Profile"
      ]
    },
    {
      id: "interior",
      title: "PREMIUM CABIN",
      subtitle: "Modern Comfort & Technology",
      description: "Advanced 10.25-inch ultra-clear LCD screen with wireless connectivity for both Android and Apple smartphones, complemented by integrated sports seats for maximum comfort.",
      type: "interior",
      src: "/images/tiggocross/hero/interior.jpg",
      specs: [
        { label: "Display", value: "10.25\" LCD Screen" },
        { label: "Sound System", value: "6-Speaker HD" },
        { label: "Climate Control", value: "Dual-Zone" },
        { label: "Connectivity", value: "Wireless AA+CP" }
      ],
      features: [
        "10.25-inch Ultra-Clear LCD Screen",
        "Wireless Apple CarPlay and Android Auto",
        "Voice-activated Panoramic Sunroof",
        "Integrated Sports Seats"
      ]
    }
  ]
};

// Slide Content component
const SlideContent = ({ slide, isActive, onSpecsToggle, showSpecs }) => {
  const { openBrochureModal } = useModal();
  if (!isActive) return null;

  return (
    <div className="absolute inset-0 flex flex-col md:flex-row p-0 text-white z-10">
      {/* Left content panel - Enhanced text visibility with stronger background */}
      <div className="w-full md:w-2/3 h-full flex flex-col justify-end md:justify-center p-4 sm:p-6 md:p-12 lg:p-16 relative">
        <div className="relative p-4 sm:p-6 md:p-8 rounded-md bg-black/60 backdrop-blur-sm md:max-w-xl transition-opacity duration-700 ease-in-out">
          {/* Car logo */}
          <div className="mb-4 sm:mb-6 transform transition-all duration-700 ease-out">
            <img
              src="/images/tiggocross/logo.webp"
              alt="Tiggo Cross Logo"
              className="object-contain h-8 sm:h-10 md:h-12"
              width={180}
              height={50}
            />
          </div>

          {/* Title and subtitle */}
          <div className="mb-3 sm:mb-4 transform transition-all duration-700 ease-out">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-wider font-bold mb-2 text-white">
              {slide.title}
            </h2>
            {slide.subtitle && (
              <p className="text-base sm:text-lg md:text-xl text-amber-200 font-medium">
                {slide.subtitle}
              </p>
            )}
          </div>

          {/* Description - Improved visibility */}
          {slide.description && (
            <p className="text-white text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed transform transition-all duration-700 ease-out">
              {slide.description}
            </p>
          )}

          {/* Actions row with CTA and specs toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 transform transition-all duration-700 ease-out">
            {/* Primary CTA */}
            {/* <Link
              href="/brochures/tiggo-cross-brochure.pdf"
              className="inline-flex items-center text-white font-medium py-2.5 sm:py-3 px-4 sm:px-6 transition-all duration-300 text-sm tracking-wide group w-full sm:w-auto justify-center sm:justify-start"
              style={{ backgroundColor: tiggoCrossData.accentColor }}
              target='_blank'
            >
              <span>Download Brochure</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link> */}

            <button onClick={() => openBrochureModal()}
              className="inline-flex items-center bg-amber-800 hover:bg-amber-900 text-white font-medium py-3 px-6 md:px-8 transition-all duration-300 text-sm md:text-base tracking-wide group w-full sm:w-auto justify-center sm:justify-start"
              style={{ backgroundColor: tiggoCrossData.accentColor }}
            >
               <span>Download Brochure</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

            {/* Specs toggle button - Mobile friendly */}
            <button
              onClick={onSpecsToggle}
              className="inline-flex items-center cursor-pointer text-white bg-transparent border py-2.5 sm:py-3 px-4 sm:px-6 transition-all duration-300 group w-full sm:w-auto justify-center"
              style={{ borderColor: tiggoCrossData.accentColor }}
            >
              <span className="text-sm">{showSpecs ? 'Hide Specifications' : 'View Specifications'}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`ml-2 transition-transform duration-300 ${showSpecs ? 'rotate-180' : ''}`}
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Right specifications panel - Now responsive for mobile */}
      {showSpecs && isActive && slide.specs && (
        <div
          className="w-full md:w-1/3 flex flex-col justify-center bg-black/70 backdrop-blur-md border-t md:border-t-0 md:border-l transition-all duration-700 ease-out p-4 sm:p-6"
          style={{ borderColor: tiggoCrossData.accentColor }}
        >
          <div className="p-4 sm:p-6 md:p-8 lg:p-12">
            <h3 className="text-lg sm:text-xl md:text-2xl font-light text-amber-200 uppercase tracking-widest mb-4 sm:mb-6">Specifications</h3>

            {/* Specs items with staggered animation */}
            <div className="space-y-4 sm:space-y-6">
              {slide.specs.map((spec, index) => (
                <div
                  key={index}
                  className="border-b border-white/20 pb-3 transition-all duration-500"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-xs sm:text-sm uppercase tracking-wider">{spec.label}</span>
                    <span className="text-white font-medium text-sm sm:text-base md:text-lg">{spec.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const VehicleShowcase = ({ className = "" }) => {
  // Component state
  const { openBrochureModal } = useModal();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSpecs, setShowSpecs] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [progressBars, setProgressBars] = useState(
    tiggoCrossData.slides.map(() => ({ progress: 0, active: false }))
  );

  const swiperRef = useRef(null);
  const progressTimerRef = useRef(null);
  const sectionRef = useRef(null);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Listen for resize events
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Toggle specifications panel
  const handleSpecsToggle = () => {
    setShowSpecs(prev => !prev);
  };

  // Handle slide change 
  const handleSlideChange = (swiper) => {
    const newIndex = swiper.realIndex;
    setActiveIndex(newIndex);
    resetProgressBars(newIndex);
    // Reset specs panel on slide change
    setShowSpecs(false);
  };

  // Reset and animate progress bars
  const resetProgressBars = (activeIndex) => {
    clearInterval(progressTimerRef.current);

    // Reset all progress bars
    setProgressBars(tiggoCrossData.slides.map((_, index) => ({
      progress: index < activeIndex ? 100 : 0,
      active: index === activeIndex
    })));

    if (!isAutoplayPaused) {
      progressTimerRef.current = setInterval(() => {
        setProgressBars(prev => {
          const updated = [...prev];

          if (updated[activeIndex].progress >= 100) {
            clearInterval(progressTimerRef.current);
            return updated;
          }

          updated[activeIndex] = {
            ...updated[activeIndex],
            progress: updated[activeIndex].progress + 0.4
          };

          return updated;
        });
      }, 25);
    }
  };

  // Toggle autoplay pause/resume
  const toggleAutoplay = () => {
    if (!swiperRef.current) return;

    const swiper = swiperRef.current.swiper;

    if (isAutoplayPaused) {
      swiper.autoplay.start();
      resetProgressBars(activeIndex);
    } else {
      swiper.autoplay.stop();
      clearInterval(progressTimerRef.current);
    }

    setIsAutoplayPaused(!isAutoplayPaused);
  };

  // Calculate container height and set up initial state
  useEffect(() => {
    // Set loading state until first image is ready
    const timeout = setTimeout(() => {
      setIsLoading(false);
      resetProgressBars(0);
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(progressTimerRef.current);
    };
  }, []);

  // Go to specific slide
  const goToSlide = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index + 1); // +1 because of loop mode
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`w-full overflow-hidden h-screen md:h-screen ${className} relative`}
      aria-label="Tiggo Cross Vehicle Showcase"
    >
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 bg-gray-900 flex flex-col items-center justify-center transition-opacity duration-800">
          <div className="w-24 sm:w-32 h-1 bg-amber-700 mb-4 overflow-hidden" style={{ backgroundColor: tiggoCrossData.accentColor }}>
            <div
              className="h-full w-1/3 bg-amber-200 animate-[loading_1.5s_ease-in-out_infinite]"
              style={{ animation: "translateX(-100%) translateX(300%)" }}
            />
          </div>
          <img
            src="/images/tiggocross/logo.webp"
            alt="Loading"
            width={160}
            height={45}
            className="object-contain h-8 sm:h-10"
          />
        </div>
      )}

      {/* Model badge in top left */}
      <div className="absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 z-20 bg-black/40 backdrop-blur-sm px-3 sm:px-4 py-2 border-l-2 flex items-center" style={{ borderColor: tiggoCrossData.accentColor }}>
        <span className="text-white text-xs sm:text-sm font-medium tracking-widest">{tiggoCrossData.modelName}</span>
      </div>

      {/* Main slider */}
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Autoplay, EffectFade, Keyboard]}
        effect="fade"
        speed={1000}
        keyboard={{ enabled: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        onSlideChange={handleSlideChange}
        loop={true}
        className="h-full w-full"
      >
        {tiggoCrossData.slides.map((slide, index) => (
          <SwiperSlide
            key={slide.id}
            className="relative"
            aria-label={slide.title}
          >
            {/* Background image */}
            <div className="absolute inset-0 w-full h-full">
              <div className="absolute inset-0 z-0 transition-opacity duration-700">
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Content overlay - Stronger gradient for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-black/10"></div>
            </div>

            {/* Type indicator (interior/exterior) */}
            <div
              className={`absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 z-30 py-1.5 sm:py-2 px-3 sm:px-4 uppercase text-xs sm:text-sm tracking-widest rounded-sm text-white font-semibold shadow-lg transition-all duration-500 ${slide.type === 'interior' ? 'bg-amber-700' : 'bg-amber-900'
                }`}
            >
              {slide.type}
            </div>

            {/* Slide Content */}
            <SlideContent
              slide={slide}
              isActive={index === activeIndex}
              onSpecsToggle={handleSpecsToggle}
              showSpecs={showSpecs}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* MOVED: Center navigation arrows - Added to the middle of the screen instead of bottom */}
      <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 z-20 flex justify-between px-2 sm:px-4 md:px-8 pointer-events-none">
        <button
          className="swiper-button-prev flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-black/30 hover:bg-amber-700 border border-white/10 hover:border-amber-700 text-white transition-all duration-300 rounded-full pointer-events-auto"
          aria-label="Previous slide"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button
          className="swiper-button-next flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-black/30 hover:bg-amber-700 border border-white/10 hover:border-amber-700 text-white transition-all duration-300 rounded-full pointer-events-auto"
          aria-label="Next slide"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Bottom navigation with progress bars - Improved and simplified */}
      <div className="absolute left-0 right-0 bottom-0 z-20 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Progress indicators and slide dots - Improved visibility */}
            <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-hide">
              {tiggoCrossData.slides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 flex-shrink-0"
                >
                  <div
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${activeIndex === index ? '' : 'bg-white/30'}`}
                    style={{ backgroundColor: activeIndex === index ? tiggoCrossData.accentColor : '' }}
                  ></div>
                  <span className={`text-xs sm:text-sm font-medium ${activeIndex === index ? 'text-white' : 'text-white/60'}`}>
                    {slide.type}
                  </span>
                  <div className="w-12 sm:w-16 h-1 bg-white/20 overflow-hidden">
                    <div
                      className="h-full transition-all duration-300"
                      style={{
                        width: `${progressBars[index].progress}%`,
                        backgroundColor: tiggoCrossData.accentColor
                      }}
                    ></div>
                  </div>
                </button>
              ))}
            </div>

            {/* Play/Pause button - Simplified interface */}
            <button
              onClick={toggleAutoplay}
              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-black/30 rounded-full hover:bg-amber-700 text-white transition-all duration-300"
              aria-label={isAutoplayPaused ? "Resume slideshow" : "Pause slideshow"}
              style={{
                backgroundColor: isAutoplayPaused ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.3)"
              }}
            >
              {isAutoplayPaused ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleShowcase;