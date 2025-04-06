'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { type Swiper as SwiperType } from 'swiper';
import { A11y, Autoplay, Grid, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/a11y';
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
  theme?: 'light' | 'dark';
  layout?: 'standard' | 'centered' | 'overlaid' | 'fullwidth';
  autoplay?: boolean;
  autoplaySpeed?: number;
  showCaptions?: boolean;
}

// Media placeholder components with clean, flat design
const ImagePlaceholder = () => (
  <div className="bg-gray-100 dark:bg-gray-800 w-full h-full flex items-center justify-center">
    <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="1" ry="1"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  </div>
);

const VideoPlaceholder = () => (
  <div className="bg-gray-100 dark:bg-gray-800 w-full h-full flex items-center justify-center">
    <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
    </svg>
  </div>
);

// Clean, minimal video player component
const VideoPlayer = ({ src, poster }: { src: string; poster?: string }) => {
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

      {/* Clean, flat play button */}
      <div
        onClick={togglePlay}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 
          bg-black/30 flex items-center justify-center 
          cursor-pointer transition-opacity duration-200 
          group-hover:opacity-90"
        aria-hidden="true"
      >
        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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

// Minimal, flat navigation buttons
const NavigationButtons = ({
  onPrev,
  onNext,
  theme = 'light',
  layout = 'standard'
}: {
  onPrev: () => void;
  onNext: () => void;
  theme?: 'light' | 'dark';
  layout?: 'standard' | 'centered' | 'overlaid' | 'fullwidth';
}) => {
  // Clean, minimal button styles based on layout
  const getButtonClasses = () => {
    const baseClasses = "flex items-center justify-center focus:outline-none transition-colors duration-200";

    if (layout === 'overlaid' || layout === 'fullwidth') {
      return `${baseClasses} absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12
        bg-white/70 dark:bg-black/70
        hover:bg-white dark:hover:bg-black`;
    }

    // Standard flat buttons
    return `${baseClasses} w-10 h-10 bg-gray-100 dark:bg-gray-800 text-gray-700 
      dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700`;
  };

  const prevBtnClasses = `${getButtonClasses()} ${layout === 'overlaid' || layout === 'fullwidth' ? 'left-4' : ''}`;
  const nextBtnClasses = `${getButtonClasses()} ${layout === 'overlaid' || layout === 'fullwidth' ? 'right-4' : ''}`;

  // If overlay layout, render as separate component
  if (layout === 'overlaid' || layout === 'fullwidth') {
    return (
      <>
        <button
          onClick={onPrev}
          className={prevBtnClasses}
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={onNext}
          className={nextBtnClasses}
          aria-label="Next slide"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </>
    );
  }

  // Standard layout with centered buttons
  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button
        onClick={onPrev}
        className={prevBtnClasses}
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={onNext}
        className={nextBtnClasses}
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
};

// Clean, flat progress bar
const ProgressBar = ({
  activeIndex,
  totalSlides,
  theme = 'light'
}: {
  activeIndex: number;
  totalSlides: number;
  theme?: 'light' | 'dark';
}) => {
  // Calculate progress width
  const progressWidth = totalSlides <= 1 ? 100 : (activeIndex / (totalSlides - 1)) * 100;

  return (
    <div className="w-full max-w-sm h-1 bg-gray-200 dark:bg-gray-700 relative">
      <div
        className="absolute top-0 left-0 h-full bg-gray-600 dark:bg-gray-400 transition-all duration-300"
        style={{ width: `${progressWidth}%` }}
        role="progressbar"
        aria-valuenow={progressWidth}
        aria-valuemin={0}
        aria-valuemax={100}
      ></div>
    </div>
  );
};

// Minimal pagination dots
const PaginationDots = ({
  activeIndex,
  totalSlides,
  onDotClick,
  theme = 'light'
}: {
  activeIndex: number;
  totalSlides: number;
  onDotClick: (index: number) => void;
  theme?: 'light' | 'dark';
}) => {
  // Generate array of slide indices
  const slideIndices = Array.from({ length: totalSlides }, (_, i) => i);

  return (
    <div className="flex items-center justify-center space-x-2 py-2">
      {slideIndices.map((index) => (
        <button
          key={index}
          className={`w-2 h-2 transition-all duration-200 cursor-pointer ${index === activeIndex
            ? 'bg-gray-800 dark:bg-gray-200'
            : 'bg-gray-400 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-400'
            }`}
          onClick={() => onDotClick(index)}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === activeIndex ? 'true' : 'false'}
        />
      ))}
    </div>
  );
};

// Main component with professional, clean, flat design
const CarTechSlider = ({
  slides = [],
  className = "",
  title = "Featured Technology",
  theme = 'light',
  layout = 'standard',
  autoplay = true,
  autoplaySpeed = 5000,
  showCaptions = true
}: CarTechSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  // Calculate effective number of slides for pagination based on layout
  const getEffectiveTotalSlides = () => {
    if (layout === 'centered' || layout === 'fullwidth' || layout === 'overlaid') {
      return slides.length;
    }
    // For standard layout, use max number of slides per view (3 on desktop)
    return Math.ceil(slides.length / 3);
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

  // Get slide component classes based on layout - clean and flat
  const getSlideComponentClasses = (layout?: 'standard' | 'centered' | 'overlaid' | 'fullwidth') => {
    const baseClasses = "h-full flex flex-col p-2 sm:p-3";

    if (layout === 'centered') {
      return `${baseClasses} items-center`;
    }

    if (layout === 'overlaid' || layout === 'fullwidth') {
      return `${baseClasses} relative`;
    }

    return baseClasses;
  };

  // Get slide media container classes based on layout - flat design
  const getMediaContainerClasses = (layout?: 'standard' | 'centered' | 'overlaid' | 'fullwidth') => {
    const baseClasses = "relative overflow-hidden flex-grow bg-gray-50 dark:bg-gray-900";

    if (layout === 'overlaid' || layout === 'fullwidth') {
      return `${baseClasses} aspect-[16/9]`;
    }

    if (layout === 'centered') {
      return `${baseClasses} aspect-square mb-4 w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72`;
    }

    return `${baseClasses} aspect-[4/3] mb-3`;
  };

  // Get slide content classes based on layout - flat and minimal
  const getContentClasses = (layout?: 'standard' | 'centered' | 'overlaid' | 'fullwidth') => {
    if (layout === 'overlaid' || layout === 'fullwidth') {
      return "absolute bottom-0 left-0 right-0 bg-black/60 p-4 sm:p-5 text-white";
    }

    if (layout === 'centered') {
      return "text-center max-w-xs";
    }

    return "mt-2";
  };

  // Configure swiper options based on layout for responsive design
  const getSwiperOptions = () => {
    const baseOptions = {
      spaceBetween: layout === 'centered' ? 32 : 16,
      centeredSlides: layout === 'centered' || layout === 'fullwidth',
      loop: slides.length > (layout === 'centered' || layout === 'fullwidth' || layout === 'overlaid' ? 1 : 3),
      autoplay: autoplay ? {
        delay: autoplaySpeed,
        disableOnInteraction: false
      } : false,
      breakpoints: {}
    };

    if (layout === 'fullwidth') {
      return {
        ...baseOptions,
        slidesPerView: 1.2,
        spaceBetween: 12,
        breakpoints: {
          640: { slidesPerView: 1.4, spaceBetween: 16 },
          1024: { slidesPerView: 1.6, spaceBetween: 20 }
        },
        effect: undefined,
        fadeEffect: undefined
      };
    }

    if (layout === 'overlaid') {
      return {
        ...baseOptions,
        slidesPerView: 1,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        }
      };
    }

    if (layout === 'centered') {
      return {
        ...baseOptions,
        slidesPerView: 1,
        breakpoints: {
          640: { slidesPerView: 1.3 },
          1024: { slidesPerView: 2 }
        }
      };
    }

    // Standard layout - fully responsive
    return {
      ...baseOptions,
      slidesPerView: 1,
      breakpoints: {
        480: { slidesPerView: 1.5, spaceBetween: 12 },
        640: { slidesPerView: 2, spaceBetween: 16 },
        1024: { slidesPerView: 3, spaceBetween: 20 }
      }
    };
  };

  const swiperOptions = getSwiperOptions();

  return (
    <section
      className={`w-full py-6 sm:py-8 md:py-10 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} ${className}`}
      aria-labelledby="car-tech-slider-title"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={`mx-auto px-4 ${layout === 'fullwidth' ? 'max-w-full' : 'max-w-7xl'}`}>
        {title && (
          <h2
            id="car-tech-slider-title"
            className={`text-xl sm:text-2xl font-medium mb-6 ${layout === 'centered' ? 'text-center' : 'sr-only'
              }`}
          >
            {title}
          </h2>
        )}

        <div className={`relative ${layout === 'fullwidth' ? 'max-w-full' : 'max-w-6xl mx-auto'}`}>
          {/* Overlaid navigation buttons for specific layouts */}
          {(layout === 'overlaid' || layout === 'fullwidth') && slides.length > 1 && (
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
            modules={[Navigation, Pagination, Grid, A11y, Autoplay]}
            slidesPerView={swiperOptions.slidesPerView}
            spaceBetween={swiperOptions.spaceBetween}
            breakpoints={swiperOptions.breakpoints}
            onSlideChange={handleSlideChange}
            navigation={{
              nextEl: '.car-tech-next',
              prevEl: '.car-tech-prev',
            }}
            loop={swiperOptions.loop}
            autoplay={swiperOptions.autoplay}
            centeredSlides={swiperOptions.centeredSlides}
            effect={swiperOptions.effect}
            fadeEffect={swiperOptions.fadeEffect}
            className={`mb-4 ${layout === 'centered' ? 'py-4' : ''}`}
            a11y={{
              prevSlideMessage: 'Previous slide',
              nextSlideMessage: 'Next slide',
              firstSlideMessage: 'This is the first slide',
              lastSlideMessage: 'This is the last slide',
            }}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.id || index} className="h-auto">
                <div className={getSlideComponentClasses(layout)}>
                  <div className={getMediaContainerClasses(layout)}>
                    {slide.mediaType === 'image' ? (
                      slide.image ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={slide.image}
                            alt={slide.title || 'Car technology feature'}
                            className="object-cover"
                            fill
                            priority={index < 3}
                            sizes={`${layout === 'fullwidth' ? '100vw' : '(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw'}`}
                            loading={index < 3 ? "eager" : "lazy"}
                          />
                        </div>
                      ) : (
                        <ImagePlaceholder />
                      )
                    ) : slide.mediaType === 'video' ? (
                      slide.videoUrl ? (
                        <VideoPlayer src={slide.videoUrl} poster={slide.videoPoster} />
                      ) : (
                        <VideoPlaceholder />
                      )
                    ) : null}
                  </div>

                  {showCaptions && (
                    <div className={getContentClasses(layout)}>
                      <h3 className={`text-base sm:text-lg font-medium mb-1 ${layout === 'overlaid' || layout === 'fullwidth'
                        ? 'text-white'
                        : ''
                        }`}>
                        {slide.title}
                      </h3>
                      {slide.description && (
                        <p className={`text-sm line-clamp-2 ${layout === 'overlaid' || layout === 'fullwidth'
                          ? 'text-gray-200'
                          : 'text-gray-600 dark:text-gray-400'
                          }`}>
                          {slide.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation controls based on layout - clean and minimal */}
          {slides.length > 1 && (
            <div className="flex flex-col items-center space-y-3 mt-2">
              {/* Dot pagination for all layouts except standard */}
              {layout !== 'standard' && (
                <PaginationDots
                  activeIndex={activeIndex}
                  totalSlides={effectiveTotalSlides}
                  onDotClick={handleDotClick}
                  theme={theme}
                />
              )}

              {/* Progress bar for standard layout */}
              {layout === 'standard' && (
                <ProgressBar
                  activeIndex={activeIndex}
                  totalSlides={effectiveTotalSlides}
                  theme={theme}
                />
              )}

              {/* Navigation buttons for standard and centered layouts */}
              {(layout === 'standard' || layout === 'centered') && (
                <NavigationButtons onPrev={handlePrev} onNext={handleNext} theme={theme} layout={layout} />
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