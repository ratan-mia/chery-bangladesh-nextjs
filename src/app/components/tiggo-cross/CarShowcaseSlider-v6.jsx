'use client';

import { useEffect, useRef, useState } from 'react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CarShowcaseSlider = ({
  slides = [],
  height = 'h-[700px]',
  autoplaySpeed = 6000,
}) => {
  // State management
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const swiperRef = useRef(null);

  // Only render client-side
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Handle slide change
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  // Toggle autoplay
  const toggleAutoplay = () => {
    setIsPlaying(prev => !prev);
    if (swiperRef.current?.swiper) {
      if (isPlaying) {
        swiperRef.current.swiper.autoplay.stop();
      } else {
        swiperRef.current.swiper.autoplay.start();
      }
    }
  };

  // Empty state handling
  if (!slides || slides.length === 0) {
    return (
      <div className={`flex items-center justify-center ${height} bg-zinc-900 text-zinc-100`}>
        <p className="text-xl font-light">No vehicles available to display</p>
      </div>
    );
  }
  
  return (
    <div 
      className="relative w-full overflow-hidden bg-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-50 bg-zinc-800 h-1">
        {isPlaying && (
          <div 
            className="h-full bg-white" 
            style={{
              width: '100%',
              animation: `progressAnim ${autoplaySpeed}ms linear infinite`,
              animationPlayState: isHovered ? 'paused' : 'running'
            }}
          ></div>
        )}
      </div>
      
      {/* Slide model indicators */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-40 flex space-x-3">
        {slides.map((slide, index) => (
          <button
            key={`indicator-${index}`}
            onClick={() => swiperRef.current?.swiper.slideTo(index)}
            className={`py-2 px-4 ${activeIndex === index 
              ? 'bg-white text-black' 
              : 'bg-black/40 text-white hover:bg-black/60'
            } backdrop-blur-sm transition-all duration-300 text-xs uppercase tracking-wider font-medium`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {slide.tagline}
          </button>
        ))}
      </div>
      
      {mounted && (
        <Swiper
          ref={swiperRef}
          modules={[EffectFade, Navigation, Pagination, Autoplay]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1000}
          slidesPerView={1}
          navigation={{
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
          }}
          autoplay={isPlaying && slides.length > 1 ? {
            delay: autoplaySpeed,
            disableOnInteraction: false,
          } : false}
          loop={slides.length > 1}
          onSlideChange={handleSlideChange}
          className={`w-full ${height}`}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={`slide-${index}`} className="relative w-full h-full">
              {/* Background media with overlay effect */}
              <div className="absolute inset-0 w-full h-full">
                {slide.type === 'video' ? (
                  <video
                    src={slide.src}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={slide.src}
                    alt={`${slide.modelName} - ${slide.tagline}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                
                {/* Overlay with diagonal gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent"></div>
              </div>
              
              {/* Main content */}
              <div className="relative h-full flex flex-col">
                {/* Top branded section */}
                <div className="h-1/4 flex items-center px-12 md:px-20 z-20 pt-12">
                  {slide.logoSrc && (
                    <img
                      src={slide.logoSrc}
                      alt={`${slide.modelName} logo`}
                      className="h-16 md:h-20 w-auto object-contain filter invert"
                    />
                  )}
                </div>
                
                {/* Main content - central section */}
                <div className="flex-grow flex items-center px-12 md:px-20 z-20">
                  <div className="w-full md:w-1/2 lg:w-2/5">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-zinc-400 text-lg uppercase tracking-wider mb-1">
                          {slide.modelName}
                        </h3>
                        <h2 className="text-white text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-none">
                          {slide.tagline}
                        </h2>
                      </div>
                      
                      {slide.description && (
                        <p className="text-zinc-300 text-lg font-light leading-relaxed">
                          {slide.description}
                        </p>
                      )}
                      
                      {/* Call to action */}
                      <div className="flex flex-wrap gap-4 pt-4">
                        {slide.brochureLink && (
                          <a 
                            href={slide.brochureLink} 
                            className="bg-white text-black px-8 py-4 transition-all hover:bg-white hover:px-10 group flex items-center"
                          >
                            <span>Discover More</span>
                            <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </a>
                        )}
                        
                        {slide.testDriveLink && (
                          <a 
                            href={slide.testDriveLink} 
                            className="border border-white text-white px-8 py-4 transition-all hover:bg-white hover:text-black"
                          >
                            Test Drive
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom section with specifications */}
                <div className="h-1/4 flex items-end pb-16 px-12 md:px-20 z-20">
                  {slide.specs && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 w-full">
                      {Object.entries(slide.specs).map(([key, value]) => (
                        <div key={key} className="border-l-2 border-white/30 pl-4">
                          <span className="block text-zinc-400 text-xs uppercase tracking-wide mb-1">{key}</span>
                          <span className="block text-white text-xl font-light">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Feature highlight box */}
              {slide.featureHighlight && (
                <div className="absolute top-1/4 right-12 md:right-20 z-30 max-w-xs hidden lg:block">
                  <div className="bg-black/50 backdrop-blur-sm p-6 border-l-2 border-white">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-white text-lg font-medium">
                        {slide.featureHighlight.title}
                      </h3>
                    </div>
                    <p className="text-zinc-300 text-sm font-light">
                      {slide.featureHighlight.description}
                    </p>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      
      {/* Custom navigation arrows */}
      <button 
        className="slider-button-prev absolute top-1/2 -translate-y-1/2 left-4 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition-all hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      <button 
        className="slider-button-next absolute top-1/2 -translate-y-1/2 right-4 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition-all hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
          <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {/* Autoplay toggle */}
      <button
        onClick={toggleAutoplay}
        className="absolute bottom-6 right-6 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isPlaying ? (
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
            <rect x="7" y="6" width="3" height="12" rx="1" fill="currentColor"/>
            <rect x="14" y="6" width="3" height="12" rx="1" fill="currentColor"/>
          </svg>
        ) : (
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
            <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
          </svg>
        )}
      </button>
      
      {/* Current slide counter */}
      <div className="absolute bottom-6 left-6 z-40 bg-black/50 backdrop-blur-sm px-4 py-2">
        <p className="text-white text-sm font-medium">
          <span className="text-xl">{activeIndex + 1}</span>
          <span className="mx-2 opacity-40">/</span>
          <span className="opacity-70">{slides.length}</span>
        </p>
      </div>
      
      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes progressAnim {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        .swiper-slide-active .animate-in {
          animation: fadeInUp 0.8s ease forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CarShowcaseSlider;