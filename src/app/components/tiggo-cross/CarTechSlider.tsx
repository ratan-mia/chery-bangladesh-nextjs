'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { type Swiper as SwiperType } from 'swiper';
import { A11y, Autoplay, EffectCoverflow, EffectFade, Grid, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-fade';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Define TypeScript interfaces for props
interface Slide {
  id: string;
  title: string;
  description?: string;
  mediaType: 'image' | 'video';
  image?: string;
  videoUrl?: string;
  videoPoster?: string;
}

interface CarTechSliderProps {
  slides?: Slide[];
  className?: string;
  title?: string;
  theme?: 'modern' | 'classic' | 'minimal' | 'tech';
  layout?: 'standard' | 'filmstrip' | 'showcase' | 'cards';
  autoplay?: boolean;
  autoplaySpeed?: number;
  showCaptions?: boolean;
}

// Media placeholder components
const ImagePlaceholder = ({ theme = 'modern' }: { theme?: string }) => {
  const getThemeClasses = () => {
    switch (theme) {
      case 'classic':
        return "bg-amber-50 border border-amber-200";
      case 'tech':
        return "bg-zinc-900 border border-zinc-700";
      case 'minimal':
        return "bg-gray-50";
      default: // modern
        return "bg-gradient-to-br from-blue-50 to-indigo-100";
    }
  };

  return (
    <div className={`w-full h-full flex items-center justify-center ${getThemeClasses()}`}>
      <svg className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
      </svg>
    </div>
  );
};

const VideoPlaceholder = ({ theme = 'modern' }: { theme?: string }) => {
  const getThemeClasses = () => {
    switch (theme) {
      case 'classic':
        return "bg-amber-50 border border-amber-200";
      case 'tech':
        return "bg-zinc-900 border border-zinc-700";
      case 'minimal':
        return "bg-gray-50";
      default: // modern
        return "bg-gradient-to-br from-blue-50 to-indigo-100";
    }
  };

  return (
    <div className={`w-full h-full flex items-center justify-center ${getThemeClasses()}`}>
      <svg className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
      </svg>
    </div>
  );
};

// Video player component
const VideoPlayer = ({ src, poster, theme = 'modern' }: { src: string; poster?: string; theme?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
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

    return () => {
      observer.disconnect();
    };
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

  // Themed play button
  const getPlayButtonClasses = () => {
    switch (theme) {
      case 'classic':
        return "bg-amber-800/80 hover:bg-amber-800";
      case 'tech':
        return "bg-cyan-500/80 hover:bg-cyan-500 backdrop-blur";
      case 'minimal':
        return "bg-black/50 hover:bg-black/70";
      default: // modern
        return "bg-primary hover:bg-indigo-600 backdrop-blur";
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden group">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
        poster={poster || ''}
        aria-label="Feature demonstration video"
      >
        {isVisible && <source src={src} type="video/mp4" />}
        Your browser does not support the video tag.
      </video>

      <div
        onClick={togglePlay}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 
          ${getPlayButtonClasses()} flex items-center justify-center 
          cursor-pointer transition-all duration-300 
          group-hover:scale-110`}
        aria-hidden="true"
      >
        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          {isPlaying ? (
            <rect x="6" y="5" width="4" height="14" fill="currentColor" />
          ) : (
            <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
          )}
        </svg>
      </div>
    </div>
  );
};

// Navigation components based on theme
const NavigationButtons = ({
  onPrev,
  onNext,
  theme = 'modern',
  layout = 'grid'
}: {
  onPrev: () => void;
  onNext: () => void;
  theme?: 'modern' | 'classic' | 'minimal' | 'tech';
  layout?: string;
}) => {
  // Get button styles based on theme
  const getButtonClasses = () => {
    const baseClasses = "flex items-center justify-center transition-all duration-200";

    switch (theme) {
      case 'classic':
        return `${baseClasses} w-12 h-12 bg-amber-50 border border-amber-300 text-amber-800 
          hover:bg-amber-100`;
      case 'tech':
        return `${baseClasses} w-10 h-10 bg-zinc-800 text-cyan-400 border border-zinc-700
          hover:bg-zinc-700 hover:border-cyan-400`;
      case 'minimal':
        return `${baseClasses} w-10 h-10 bg-transparent border border-gray-300 text-gray-700 
          hover:bg-gray-100`;
      default: // modern
        return `${baseClasses} w-12 h-12 bg-primary text-white rounded-full 
          hover:bg-indigo-700 shadow-md hover:shadow-lg`;
    }
  };

  // Different button shapes/styles for different layouts
  const getButtonStyle = () => {
    if (layout === 'showcase') {
      return "absolute top-1/2 -translate-y-1/2 z-10";
    }

    if (layout === 'filmstrip') {
      return "mt-4";
    }

    return "";
  };

  const prevBtnClasses = `${getButtonClasses()} ${getButtonStyle()} ${layout === 'showcase' ? 'left-4' : ''}`;
  const nextBtnClasses = `${getButtonClasses()} ${getButtonStyle()} ${layout === 'showcase' ? 'right-4' : ''}`;

  // If showcase layout, render as separate component
  if (layout === 'showcase') {
    return (
      <>
        <button
          onClick={onPrev}
          className={prevBtnClasses}
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={onNext}
          className={nextBtnClasses}
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </>
    );
  }

  // Other layouts
  return (
    <div className="flex justify-center space-x-4">
      <button
        onClick={onPrev}
        className={prevBtnClasses}
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={onNext}
        className={nextBtnClasses}
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
};

// Themed pagination indicators
const PaginationIndicator = ({
  activeIndex,
  totalSlides,
  onDotClick,
  theme = 'modern'
}: {
  activeIndex: number;
  totalSlides: number;
  onDotClick: (index: number) => void;
  theme: 'modern' | 'classic' | 'minimal' | 'tech';
}) => {
  // Generate array of slide indices
  const slideIndices = Array.from({ length: totalSlides }, (_, i) => i);

  // Get theme-specific styles
  const getContainerClasses = () => {
    switch (theme) {
      case 'classic':
        return "space-x-3";
      case 'tech':
        return "space-x-1";
      case 'minimal':
        return "space-x-2";
      default: // modern
        return "space-x-2";
    }
  };

  const getDotClasses = (isActive: boolean) => {
    const baseClasses = "transition-all duration-300 cursor-pointer";

    switch (theme) {
      case 'classic':
        return `${baseClasses} w-3 h-3 rounded-full ${isActive
          ? 'bg-amber-800 scale-110'
          : 'bg-amber-200 hover:bg-amber-300'}`;
      case 'tech':
        return `${baseClasses} w-8 h-1 ${isActive
          ? 'bg-cyan-400'
          : 'bg-zinc-700 hover:bg-zinc-600'}`;
      case 'minimal':
        return `${baseClasses} w-2.5 h-2.5 rounded-full border ${isActive
          ? 'bg-black border-black'
          : 'bg-white border-gray-300 hover:border-gray-400'}`;
      default: // modern
        return `${baseClasses} w-2.5 h-2.5 rounded-full ${isActive
          ? 'bg-indigo-600 scale-110'
          : 'bg-indigo-200 hover:bg-indigo-300'}`;
    }
  };

  return (
    <div className={`flex items-center justify-center ${getContainerClasses()} py-3`}>
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
}: CarTechSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  // Calculate effective number of slides for pagination based on layout
  const getEffectiveTotalSlides = () => {
    if (layout === 'showcase' || layout === 'cards') {
      return slides.length;
    }
    if (layout === 'filmstrip') {
      return Math.ceil(slides.length / 4); // Assuming 4 slides visible at max
    }
    // For grid layout (now horizontal)
    return Math.ceil(slides.length / 3); // Assuming 3 slides per row max
  };

  const effectiveTotalSlides = getEffectiveTotalSlides();

  // Memoize slide navigation functions
  const handlePrev = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  }, []);

  const handleNext = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  }, []);

  // Handle slide change event
  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  // Handle direct navigation via dots
  const handleDotClick = useCallback((index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  }, []);

  // Auto-play/pause controls based on hover state
  useEffect(() => {
    if (swiperRef.current && autoplay) {
      if (isHovering) {
        swiperRef.current.autoplay?.stop();
      } else {
        swiperRef.current.autoplay?.start();
      }
    }
  }, [isHovering, autoplay]);

  // Early return for empty slides
  if (!slides.length) {
    return null;
  }

  // Theme-specific container styles
  const getContainerClasses = () => {
    switch (theme) {
      case 'classic':
        return 'bg-amber-100/50 border-y border-amber-200';
      case 'tech':
        return 'bg-zinc-900 text-white';
      case 'minimal':
        return 'bg-white';
      default: // modern
        return 'bg-white';
    }
  };

  // Get slide component classes based on layout and theme
  const getSlideComponentClasses = () => {
    // Base classes with theme variations
    const baseClasses = "h-full flex flex-col";

    // Layout-specific modifiers
    switch (layout) {
      case 'cards':
        return `${baseClasses} ${theme === 'classic'
          ? 'bg-amber-50 border border-amber-200 p-3 shadow-sm rounded'
          : theme === 'tech'
            ? 'bg-zinc-800 border border-zinc-700 p-3 rounded-sm'
            : theme === 'minimal'
              ? 'bg-white border border-gray-200 p-3'
              : 'bg-white p-3 shadow-md rounded-lg'}`;
      case 'showcase':
        return `${baseClasses} relative`;
      case 'filmstrip':
        return `${baseClasses} px-2`;
      default: // grid
        return `${baseClasses} ${theme === 'minimal' ? 'p-2' : 'p-3'}`;
    }
  };

  // Get slide media container classes based on layout and theme
  const getMediaContainerClasses = () => {
    // Base classes with theme variations
    const baseClasses = "relative overflow-hidden flex-grow";

    // Layout-specific modifiers
    switch (layout) {
      case 'cards':
        return `${baseClasses} aspect-[3/2] mb-3 ${theme !== 'minimal' ? 'rounded-t-lg overflow-hidden' : ''}`;
      case 'showcase':
        return `${baseClasses} aspect-[16/9] ${theme === 'modern' ? 'rounded-lg overflow-hidden shadow-lg' : ''}`;
      case 'filmstrip':
        return `${baseClasses} aspect-square ${theme === 'modern' ? 'rounded-lg overflow-hidden' : theme === 'tech' ? 'border border-zinc-700' : ''}`;
      default: // grid
        return `${baseClasses} aspect-[4/3] mb-2 ${theme === 'modern' ? 'rounded-lg overflow-hidden shadow-sm' : theme === 'tech' ? 'border border-zinc-700' : ''}`;
    }
  };

  // Get slide content classes based on layout and theme
  const getContentClasses = () => {
    switch (layout) {
      case 'showcase':
        return "absolute bottom-0 left-0 right-0 p-6 pt-16 bg-gradient-to-t from-black/80 to-transparent text-white";
      case 'cards':
        return "px-1 flex-grow";
      default:
        return "mt-2";
    }
  };

  // Configure swiper options based on layout for responsive design - all horizontal
  const getSwiperOptions = () => {
    // Base options for all layouts - ensuring horizontal orientation
    const baseOptions = {
      loop: slides.length > 1,
      autoplay: autoplay ? {
        delay: autoplaySpeed,
        disableOnInteraction: false
      } : false,
      direction: 'horizontal', // Explicitly set horizontal direction
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
          slidesPerView: 2.5,
          spaceBetween: 16,
          centeredSlides: false,
          breakpoints: {
            640: { slidesPerView: 3.5, spaceBetween: 20 },
            1024: { slidesPerView: 4.5, spaceBetween: 24 }
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
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 }
          }
        };

      default: // grid - now horizontal instead of grid
        return {
          ...baseOptions,
          slidesPerView: 1,
          spaceBetween: 16,
          breakpoints: {
            480: { slidesPerView: 1.5, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 }
          }
        };
    }
  };

  // Get theme-specific title classes
  const getTitleClasses = () => {
    switch (theme) {
      case 'classic':
        return "text-2xl md:text-3xl font-serif text-amber-900 mb-8";
      case 'tech':
        return "text-xl md:text-2xl uppercase tracking-wider text-cyan-400 mb-6";
      case 'minimal':
        return "text-xl md:text-2xl font-normal text-gray-900 mb-6";
      default: // modern
        return "text-2xl md:text-3xl font-bold text-primary-900 mb-8";
    }
  };

  return (
    <section
      className={`w-full py-8 md:py-12 ${getContainerClasses()} ${className}`}
      aria-labelledby="car-tech-slider-title"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={`mx-auto px-4 ${layout === 'filmstrip' ? 'max-w-full' : 'max-w-7xl'}`}>
        {title && (
          <h2
            id="car-tech-slider-title"
            className={`${getTitleClasses()} text-center`}
          >
            {title}
          </h2>
        )}

        <div className="relative mx-auto">
          {/* Overlaid navigation buttons for showcase layout */}
          {layout === 'showcase' && slides.length > 1 && (
            <NavigationButtons
              onPrev={handlePrev}
              onNext={handleNext}
              theme={theme}
              layout={layout}
            />
          )}

          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Pagination, Grid, A11y, Autoplay, EffectFade, EffectCoverflow]}
            {...getSwiperOptions()}
            onSlideChange={handleSlideChange}
            navigation={{
              nextEl: '.car-tech-next',
              prevEl: '.car-tech-prev',
            }}
            className={`mb-6 ${layout === 'cards' ? 'py-8' : ''}`}
            a11y={{
              prevSlideMessage: 'Previous slide',
              nextSlideMessage: 'Next slide',
              firstSlideMessage: 'This is the first slide',
              lastSlideMessage: 'This is the last slide',
            }}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.id || index} className="h-auto">
                <div className={getSlideComponentClasses()}>
                  <div className={getMediaContainerClasses()}>
                    {slide.mediaType === 'image' ? (
                      slide.image ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={slide.image}
                            alt={slide.title || 'Car technology feature'}
                            className="object-cover w-full h-full"
                            fill
                            priority={index < 3}
                            sizes={`${layout === 'showcase' ? '100vw' : '(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw'}`}
                            loading={index < 3 ? "eager" : "lazy"}
                          />
                        </div>
                      ) : (
                        <ImagePlaceholder theme={theme} />
                      )
                    ) : slide.mediaType === 'video' ? (
                      slide.videoUrl ? (
                        <VideoPlayer src={slide.videoUrl} poster={slide.videoPoster} theme={theme} />
                      ) : (
                        <VideoPlaceholder theme={theme} />
                      )
                    ) : null}
                  </div>

                  {showCaptions && (
                    <div className={getContentClasses()}>
                      <h3 className={`${theme === 'classic'
                        ? 'text-lg font-serif text-amber-900'
                        : theme === 'tech'
                          ? 'text-base uppercase tracking-wider text-cyan-400'
                          : theme === 'minimal'
                            ? 'text-base font-medium text-gray-900'
                            : 'text-lg font-semibold text-primary-900'
                        } ${layout === 'showcase' ? 'text-white' : ''} mb-1`}>
                        {slide.title}
                      </h3>
                      {slide.description && (
                        <p className={`text-sm ${layout === 'showcase'
                          ? 'text-gray-200'
                          : theme === 'classic'
                            ? 'text-amber-800'
                            : theme === 'tech'
                              ? 'text-gray-400'
                              : theme === 'minimal'
                                ? 'text-gray-600'
                                : 'text-primary-700'
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

          {/* Navigation controls */}
          {slides.length > 1 && (
            <div className="flex flex-col items-center space-y-4">
              {/* Pagination dots */}
              <PaginationIndicator
                activeIndex={activeIndex}
                totalSlides={effectiveTotalSlides}
                onDotClick={handleDotClick}
                theme={theme}
              />

              {/* Navigation buttons for non-showcase layouts */}
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

          {/* Hidden buttons for Swiper's built-in navigation */}
          <div className="hidden">
            <button className="car-tech-prev" aria-hidden="true" />
            <button className="car-tech-next" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarTechSlider;