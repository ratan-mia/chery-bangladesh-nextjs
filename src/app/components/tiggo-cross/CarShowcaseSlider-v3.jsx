
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CarShowcaseSlider = ({
  slides = [],
  primaryColor = "#111827",
  accentColor = "#3b82f6",
  autoplaySpeed = 5000,
  showPagination = true,
  showNavigation = true,
  aspectRatio = "aspect-[16/9]",
  darkOverlay = true,
  effectFade = true,
  showSpecs = true
}) => {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const swiperRef = useRef(null);
  const progressRef = useRef(null);
  const progressInterval = useRef(null);
  
  // Only render client-side to prevent hydration issues
  useEffect(() => {
    setMounted(true);
    
    // Clean up on unmount
    return () => {
      if (swiperRef.current?.swiper?.autoplay) {
        swiperRef.current.swiper.autoplay.stop();
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  // Control autoplay progress indicator
  useEffect(() => {
    if (!mounted || !swiperRef.current?.swiper || !progressRef.current) return;
    
    const startProgress = () => {
      let startTime = Date.now();
      const duration = autoplaySpeed;
      
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      
      progressInterval.current = setInterval(() => {
        if (isPaused) return;
        
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration * 100, 100);
        
        if (progressRef.current) {
          progressRef.current.style.width = `${progress}%`;
        }
        
        if (progress >= 100) {
          startTime = Date.now();
        }
      }, 16); // ~60fps
    };
    
    startProgress();
    
    swiperRef.current.swiper.on('slideChange', startProgress);
    
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [mounted, autoplaySpeed, isPaused]);

  // Handle slide change
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  // Play/Pause controls
  const toggleAutoplay = () => {
    if (!swiperRef.current?.swiper) return;
    
    setIsPaused(prev => {
      const newState = !prev;
      if (newState) {
        swiperRef.current.swiper.autoplay.stop();
      } else {
        swiperRef.current.swiper.autoplay.start();
      }
      return newState;
    });
  };

  // Empty state handling
  if (!slides || slides.length === 0) {
    return (
      <div 
        className={`p-8 text-center bg-gray-900 text-white flex items-center justify-center min-h-[50vh] ${aspectRatio}`}
      >
        <p>No vehicles available to display</p>
      </div>
    );
  }

  // CSS styles for the slider
  const swiperStyles = `
    .swiper-container {
      overflow: visible;
    }
    
    .swiper-pagination {
      bottom: 24px !important;
      display: flex;
      justify-content: center;
      gap: 8px;
      padding: 0 16px;
    }
    
    .swiper-pagination-bullet {
      width: 10px;
      height: 10px;
      background-color: rgba(255, 255, 255, 0.6);
      opacity: 1;
      transition: all 0.3s ease;
      border-radius: 50%;
      margin: 0 !important;
    }
    
    .swiper-pagination-bullet-active {
      background-color: ${accentColor};
      transform: scale(1.2);
    }
    
    .custom-navigation-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 20;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      border: none;
      color: white;
    }
    
    .custom-navigation-btn:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
    
    .custom-navigation-btn.prev {
      left: 16px;
    }
    
    .custom-navigation-btn.next {
      right: 16px;
    }
    
    .car-slide-content {
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .swiper-slide-active .car-slide-content {
      opacity: 1;
      transform: translateY(0);
    }
    
    .swiper-slide:not(.swiper-slide-active) .car-slide-content {
      opacity: 0;
      transform: translateY(20px);
    }
    
    @media (max-width: 640px) {
      .custom-navigation-btn {
        width: 40px;
        height: 40px;
      }
    }
  `;

  const activeSlide = slides[activeIndex] || {};

  return (
    <div 
      className="relative w-full overflow-hidden rounded-lg shadow-xl"
      style={{ backgroundColor: primaryColor }}
    >
      {/* CSS styles */}
      <style jsx global>{swiperStyles}</style>

      {/* Model indicator & index */}
      <div className="absolute top-0 left-0 z-10 flex items-center bg-black/40 backdrop-blur-sm">
        <div className="py-2 px-4">
          <p className="text-white text-sm font-medium">
            {activeSlide.modelName || ''}
          </p>
        </div>
        {slides.length > 1 && (
          <div className="py-2 px-3 border-l border-white/20">
            <p className="text-white text-xs font-medium">
              {activeIndex + 1}/{slides.length}
            </p>
          </div>
        )}
      </div>

      {/* Play/Pause button */}
      {slides.length > 1 && mounted && (
        <button 
          className="absolute top-0 right-0 z-10 bg-black/40 backdrop-blur-sm p-2 text-white"
          onClick={toggleAutoplay}
          aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
        >
          {isPaused ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          )}
        </button>
      )}

      {mounted && (
        <div className={`w-full ${aspectRatio}`}>
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            slidesPerView={1}
            effect={effectFade ? 'fade' : 'slide'}
            navigation={false} // Using custom navigation
            pagination={showPagination ? { clickable: true } : false}
            autoplay={slides.length > 1 ? {
              delay: autoplaySpeed,
              disableOnInteraction: false,
            } : false}
            loop={slides.length > 1}
            onSlideChange={handleSlideChange}
            className="h-full"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={`slide-${index}`} className="h-full">
                {/* Image/Video */}
                <div className="relative h-full overflow-hidden">
                  {slide.type === 'video' ? (
                    <video
                      src={slide.src}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <Image
                      src={slide.src}
                      alt={`${slide.modelName} - ${slide.tagline}`}
                      fill
                      sizes="100vw"
                      style={{ 
                        objectFit: 'cover',
                        transition: 'transform 10s ease',
                        transform: index === activeIndex ? 'scale(1.05)' : 'scale(1)',
                      }}
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      quality={90}
                    />
                  )}
                  
                  {/* Dark overlay for text readability */}
                  {darkOverlay && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  )}
                </div>

                {/* Content */}
                <div className="car-slide-content absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
                  <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                      <div>
                        <h2 className="text-white text-3xl sm:text-4xl font-bold mb-3 drop-shadow-md">
                          {slide.modelName}
                        </h2>
                        
                        <p className="text-white/90 text-lg mb-4 max-w-xl">
                          {slide.tagline}
                        </p>
                        
                        <div className="flex flex-wrap gap-3">
                          {slide.brochureLink && (
                            <Link 
                              href={slide.brochureLink} 
                              className="inline-block bg-white/10 backdrop-blur-md text-white py-3 px-6 font-medium rounded-full hover:bg-white/20 transition-all border border-white/20"
                            >
                              View Brochure
                            </Link>
                          )}
                          
                          {slide.testDriveLink && (
                            <Link 
                              href={slide.testDriveLink} 
                              className="inline-block text-white py-3 px-6 font-medium rounded-full hover:shadow-lg transition-all"
                              style={{ backgroundColor: accentColor }}
                            >
                              Book Test Drive
                            </Link>
                          )}
                        </div>
                      </div>
                      
                      {/* Car Specs */}
                      {showSpecs && slide.specs && (
                        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {slide.specs.power && (
                              <div>
                                <p className="text-white/70 text-xs mb-1">Engine Power</p>
                                <p className="text-white font-medium">{slide.specs.power}</p>
                              </div>
                            )}
                            {slide.specs.acceleration && (
                              <div>
                                <p className="text-white/70 text-xs mb-1">0-60 mph</p>
                                <p className="text-white font-medium">{slide.specs.acceleration}</p>
                              </div>
                            )}
                            {slide.specs.topSpeed && (
                              <div>
                                <p className="text-white/70 text-xs mb-1">Top Speed</p>
                                <p className="text-white font-medium">{slide.specs.topSpeed}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom navigation buttons */}
          {showNavigation && slides.length > 1 && (
            <>
              <button 
                className="custom-navigation-btn prev" 
                onClick={() => swiperRef.current?.swiper.slidePrev()}
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button 
                className="custom-navigation-btn next" 
                onClick={() => swiperRef.current?.swiper.slideNext()}
                aria-label="Next slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </>
          )}
          
          {/* Progress bar */}
          {slides.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-10">
              <div 
                ref={progressRef} 
                className="h-full transition-all duration-300"
                style={{ width: '0%', backgroundColor: accentColor }}
              ></div>
            </div>
          )}
        </div>
      )}
      
      {/* Thumbnails (optional extra feature) */}
      {slides.length > 1 && mounted && (
        <div className="hidden md:flex justify-center mt-2 gap-2 p-2 bg-gray-900">
          {slides.map((slide, index) => (
            <button
              key={`thumb-${index}`}
              className={`relative w-20 h-12 overflow-hidden rounded transition-all 
                ${index === activeIndex ? 'ring-2 ring-offset-1' : 'opacity-70 hover:opacity-100'}`}
              style={{ ringColor: accentColor }}
              onClick={() => swiperRef.current?.swiper.slideTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              <Image
                src={slide.src}
                alt=""
                fill
                sizes="80px"
                style={{ objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarShowcaseSlider;