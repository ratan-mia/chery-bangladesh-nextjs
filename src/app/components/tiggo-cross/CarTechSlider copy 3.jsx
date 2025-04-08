'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { A11y, Autoplay, EffectCoverflow, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Media placeholder components
const ImagePlaceholder = ({ theme = 'modern' }) => {
  const themeClasses = {
    classic: "bg-amber-50 border border-amber-200",
    tech: "bg-zinc-900 border border-zinc-700",
    minimal: "bg-gray-50 border border-gray-200",
    modern: "bg-gradient-to-br from-blue-50 to-indigo-100"
  };

  return (
    <div className={`w-full h-full flex items-center justify-center ${themeClasses[theme] || themeClasses.modern}`}>
      <svg className="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
      </svg>
    </div>
  );
};

const VideoPlaceholder = ({ theme = 'modern' }) => {
  const themeClasses = {
    classic: "bg-amber-50 border border-amber-200",
    tech: "bg-zinc-900 border border-zinc-700",
    minimal: "bg-gray-50 border border-gray-200",
    modern: "bg-gradient-to-br from-blue-50 to-indigo-100"
  };

  return (
    <div className={`w-full h-full flex items-center justify-center ${themeClasses[theme] || themeClasses.modern}`}>
      <svg className="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
      </svg>
    </div>
  );
};

// Video player component
const VideoPlayer = ({ src, poster, theme = 'modern' }) => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const playButtonClasses = {
    classic: "bg-amber-800/80 hover:bg-amber-800",
    tech: "bg-cyan-500/80 hover:bg-cyan-500 backdrop-blur",
    minimal: "bg-black/50 hover:bg-black/70",
    modern: "bg-indigo-600/90 hover:bg-indigo-600 backdrop-blur"
  };

  return (
    <div className="relative w-full h-full overflow-hidden group">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
        poster={poster}
        aria-label="Feature demonstration video"
      >
        {isVisible && <source src={src} type="video/mp4" />}
        Your browser does not support the video tag.
      </video>

      <div
        onClick={togglePlay}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 
          ${playButtonClasses[theme] || playButtonClasses.modern} flex items-center justify-center 
          rounded-full cursor-pointer transition-all duration-300 
          opacity-90 group-hover:opacity-100 group-hover:scale-105`}
        aria-hidden="true"
      >
        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          {isPlaying ? (
            <rect x="6" y="4" width="4" height="16" fill="currentColor" />
          ) : (
            <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
          )}
        </svg>
      </div>
    </div>
  );
};

// Navigation buttons component
const NavigationButtons = ({ onPrev, onNext, theme = 'modern', layout = 'standard' }) => {
  const baseButtonClasses = "flex items-center justify-center transition-all duration-200";
  
  const buttonThemeClasses = {
    classic: `${baseButtonClasses} w-10 h-10 bg-amber-50 border border-amber-300 text-amber-800 hover:bg-amber-100 rounded`,
    tech: `${baseButtonClasses} w-10 h-10 bg-zinc-800 text-cyan-400 border border-zinc-700 hover:bg-zinc-700 hover:border-cyan-400`,
    minimal: `${baseButtonClasses} w-9 h-9 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-full shadow-sm`,
    modern: `${baseButtonClasses} w-10 h-10 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 shadow-sm hover:shadow`
  };

  const buttonStyleClasses = {
    showcase: "absolute top-1/2 -translate-y-1/2 z-10",
    filmstrip: "mt-4",
    cards: "",
    standard: ""
  };

  const prevBtnClasses = `${buttonThemeClasses[theme] || buttonThemeClasses.modern} ${buttonStyleClasses[layout] || ""} ${layout === 'showcase' ? 'left-4' : ''}`;
  const nextBtnClasses = `${buttonThemeClasses[theme] || buttonThemeClasses.modern} ${buttonStyleClasses[layout] || ""} ${layout === 'showcase' ? 'right-4' : ''}`;

  if (layout === 'showcase') {
    return (
      <>
        <button onClick={onPrev} className={prevBtnClasses} aria-label="Previous slide">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button onClick={onNext} className={nextBtnClasses} aria-label="Next slide">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </>
    );
  }

  return (
    <div className="flex justify-center space-x-3">
      <button onClick={onPrev} className={prevBtnClasses} aria-label="Previous slide">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button onClick={onNext} className={nextBtnClasses} aria-label="Next slide">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
};

// Pagination component
const PaginationIndicator = ({ activeIndex, totalSlides, onDotClick, theme }) => {
  const slideIndices = Array.from({ length: totalSlides }, (_, i) => i);

  const containerClasses = {
    classic: "space-x-2",
    tech: "space-x-1",
    minimal: "space-x-2",
    modern: "space-x-2"
  };

  const getDotClasses = (isActive) => {
    const baseClasses = "transition-all duration-300 cursor-pointer";

    const dotThemeClasses = {
      classic: `${baseClasses} w-2.5 h-2.5 rounded-full ${isActive ? 'bg-amber-800 scale-110' : 'bg-amber-200 hover:bg-amber-300'}`,
      tech: `${baseClasses} w-6 h-1 ${isActive ? 'bg-cyan-400' : 'bg-zinc-700 hover:bg-zinc-600'}`,
      minimal: `${baseClasses} w-2 h-2 rounded-full border ${isActive ? 'bg-gray-900 border-gray-900' : 'bg-white border-gray-300 hover:border-gray-400'}`,
      modern: `${baseClasses} w-2.5 h-2.5 rounded-full ${isActive ? 'bg-indigo-600 scale-110' : 'bg-indigo-200 hover:bg-indigo-300'}`
    };

    return dotThemeClasses[theme] || dotThemeClasses.modern;
  };

  return (
    <div className={`flex items-center justify-center ${containerClasses[theme] || containerClasses.modern} py-2`}>
      {slideIndices.map((index) => (
        <button
          key={index}
          className={getDotClasses(index === activeIndex)}
          onClick={() => onDotClick(index)}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === activeIndex ? 'true' : 'false'}
        />
      ))}
    </div>
  );
};

// Main component
const CarTechSlider = ({
  slides = [],
  className = "",
  title = "Featured Technology",
  theme = 'modern',
  layout = 'standard',
  autoplay = false,
  autoplaySpeed = 5000,
  showCaptions = true
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const getEffectiveTotalSlides = () => {
    if (layout === 'showcase' || layout === 'cards') {
      return slides.length;
    }
    if (layout === 'filmstrip') {
      return Math.ceil(slides.length / 4);
    }
    return Math.ceil(slides.length / 3);
  };

  const effectiveTotalSlides = getEffectiveTotalSlides();

  const handlePrev = useCallback(() => {
    swiperInstance?.slidePrev();
  }, [swiperInstance]);

  const handleNext = useCallback(() => {
    swiperInstance?.slideNext();
  }, [swiperInstance]);

  const handleSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const handleDotClick = useCallback((index) => {
    swiperInstance?.slideTo(index);
  }, [swiperInstance]);

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

  const getSwiperOptions = () => {
    const baseOptions = {
      loop: slides.length > 1,
      autoplay: autoplay ? {
        delay: autoplaySpeed,
        disableOnInteraction: false
      } : false,
      direction: 'horizontal',
      watchSlidesProgress: true,
    };

    switch (layout) {
      case 'showcase':
        return {
          ...baseOptions,
          slidesPerView: 1,
          spaceBetween: 0,
          centeredSlides: true,
          effect: 'fade',
          fadeEffect: {
            crossFade: true
          }
        };

      case 'filmstrip':
        return {
          ...baseOptions,
          slidesPerView: 1.5,
          spaceBetween: 12,
          centeredSlides: false,
          breakpoints: {
            '480': {
              slidesPerView: 2.5,
              spaceBetween: 16
            },
            '640': {
              slidesPerView: 3.5,
              spaceBetween: 20
            },
            '1024': {
              slidesPerView: 4.5,
              spaceBetween: 24
            }
          }
        };

      case 'cards':
        return {
          ...baseOptions,
          slidesPerView: 1.2,
          spaceBetween: 16,
          centeredSlides: true,
          effect: 'coverflow',
          coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false
          },
          breakpoints: {
            '480': {
              slidesPerView: 1.5
            },
            '640': {
              slidesPerView: 2.2
            },
            '1024': {
              slidesPerView: 3.2
            }
          }
        };

      default:
        return {
          ...baseOptions,
          slidesPerView: 1,
          spaceBetween: 16,
          breakpoints: {
            '480': {
              slidesPerView: 1.5,
              spaceBetween: 16
            },
            '640': {
              slidesPerView: 2,
              spaceBetween: 20
            },
            '1024': {
              slidesPerView: 3,
              spaceBetween: 24
            }
          }
        };
    }
  };

  // Theme-based background classes
  const sectionBgClasses = {
    classic: "bg-amber-50 border-y border-amber-200",
    tech: "bg-zinc-900 text-white",
    minimal: "bg-white border-y border-gray-100",
    modern: "bg-gradient-to-br from-white to-indigo-50/30"
  };

  // Title styling based on theme
  const titleClasses = {
    classic: "text-2xl md:text-3xl font-serif text-amber-900",
    tech: "text-xl md:text-2xl uppercase tracking-wider text-cyan-400 font-medium",
    minimal: "text-xl md:text-2xl font-normal text-gray-900",
    modern: "text-2xl md:text-3xl font-bold text-indigo-600"
  };

  return (
    <section
      className={`w-full py-8 md:py-12 ${sectionBgClasses[theme] || sectionBgClasses.modern} ${className}`}
      aria-labelledby="car-tech-slider-title"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={`mx-auto px-4 sm:px-6 ${layout === 'filmstrip' ? 'max-w-full' : 'max-w-7xl'}`}>
        {title && (
          <h2
            id="car-tech-slider-title"
            className={`${titleClasses[theme] || titleClasses.modern} mb-8 text-center`}
          >
            {title}
          </h2>
        )}

        <div className="relative mx-auto">
          {layout === 'showcase' && slides.length > 1 && (
            <NavigationButtons
              onPrev={handlePrev}
              onNext={handleNext}
              theme={theme}
              layout={layout}
            />
          )}

          <Swiper
            onSwiper={setSwiperInstance}
            modules={[Navigation, Pagination, A11y, Autoplay, EffectFade, EffectCoverflow]}
            {...getSwiperOptions()}
            onSlideChange={handleSlideChange}
            navigation={{
              nextEl: '.car-tech-next',
              prevEl: '.car-tech-prev',
            }}
            className={`mb-6 ${layout === 'cards' ? 'py-6' : ''}`}
            a11y={{
              prevSlideMessage: 'Previous slide',
              nextSlideMessage: 'Next slide',
              firstSlideMessage: 'This is the first slide',
              lastSlideMessage: 'This is the last slide',
            }}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.id || index} className="h-auto">
                <div 
                  className={`h-full flex flex-col ${
                    layout === 'cards' 
                      ? theme === 'tech' 
                        ? 'bg-zinc-800 p-3 border border-zinc-700 rounded-lg' 
                        : theme === 'minimal'
                          ? 'bg-white p-3 border border-gray-200 rounded-lg'
                          : theme === 'classic'
                            ? 'bg-white p-3 border border-amber-200 rounded-lg'
                            : 'bg-white p-3 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg'
                      : ''
                  }`}
                >
                  <div className={`relative overflow-hidden flex-grow ${
                    layout === 'showcase' 
                      ? 'aspect-[16/9]' 
                      : layout === 'filmstrip' 
                        ? 'aspect-square' 
                        : 'aspect-[4/3]'
                  }`}>
                    {slide.mediaType === 'image' ? (
                      slide.image ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={slide.image}
                            alt={slide.title || 'Feature image'}
                            className={`object-cover ${theme === 'minimal' ? '' : 'rounded-sm'}`}
                            fill
                            priority={index < 3}
                            sizes={layout === 'showcase' ? '100vw' : '(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw'}
                          />
                        </div>
                      ) : (
                        <ImagePlaceholder theme={theme} />
                      )
                    ) : (
                      slide.videoUrl ? (
                        <VideoPlayer
                          src={slide.videoUrl}
                          poster={slide.videoPoster}
                          theme={theme}
                        />
                      ) : (
                        <VideoPlaceholder theme={theme} />
                      )
                    )}
                  </div>

                  {showCaptions && (
                    <div className={layout === 'showcase' 
                      ? 'absolute bottom-0 left-0 right-0 p-6 pt-16 bg-gradient-to-t from-black/80 to-transparent text-white' 
                      : 'mt-4 px-1'
                    }>
                      <h3 className={`text-lg font-semibold mb-2 ${
                        layout === 'showcase' 
                          ? 'text-white' 
                          : theme === 'tech' 
                            ? 'text-cyan-400' 
                            : theme === 'classic'
                              ? 'text-amber-900'
                              : 'text-gray-900'
                      }`}>
                        {slide.title}
                      </h3>
                      {slide.description && (
                        <p className={`text-sm ${
                          layout === 'showcase' 
                            ? 'text-gray-200' 
                            : theme === 'tech' 
                              ? 'text-gray-400' 
                              : 'text-gray-600'
                        } line-clamp-2`}>
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
                totalSlides={effectiveTotalSlides}
                onDotClick={handleDotClick}
                theme={theme}
              />

              {layout !== 'showcase' && (
                <NavigationButtons
                  onPrev={handlePrev}
                  onNext={handleNext}
                  theme={theme}
                  layout={layout}
                />
              )}
            </div>
          )}

          <div className="hidden">
            <button className="car-tech-prev" aria-hidden="true" />
            <button className="car-tech-next" aria-hidden="true" />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes progressAnim {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        .swiper-slide-active .animate-in {
          animation: fadeInUp 0.5s ease forwards;
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
        
        .swiper-pagination-bullet {
          background: #d1d5db;
          opacity: 1;
        }
        
        .swiper-pagination-bullet-active {
          background: ${theme === 'tech' ? '#22d3ee' : 
                     theme === 'classic' ? '#92400e' : 
                     theme === 'minimal' ? '#171717' : 
                     '#4f46e5'};
        }
      `}</style>
    </section>
  );
};

export default CarTechSlider;