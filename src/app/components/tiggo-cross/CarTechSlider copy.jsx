'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Grid, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CarTechSlider = ({ slides = [], className = "" }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const swiperRef = useRef(null);
  
  // Update progress bar when slide changes
  useEffect(() => {
    if (slides.length > 0) {
      const totalSlides = Math.ceil(slides.length / 3); // For large screens showing 3 slides
      setProgressWidth((activeIndex / (totalSlides - 1)) * 100);
    }
  }, [activeIndex, slides.length]);

  // Handle slide change event
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <div className={`w-full py-8 md:py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Custom navigation buttons */}
        <div className="hidden">
          <button className="car-tech-prev" aria-label="Previous slide" />
          <button className="car-tech-next" aria-label="Next slide" />
        </div>

        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, Grid]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, grid: { rows: 1 } },
            1024: { slidesPerView: 3, grid: { rows: 1 } }
          }}
          onSlideChange={handleSlideChange}
          navigation={{
            nextEl: '.car-tech-next',
            prevEl: '.car-tech-prev',
          }}
          loop={true}
          className="mb-8"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="h-auto">
              <div className="h-full flex flex-col">
                <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded bg-brown-50 dark:bg-brown-900 shadow-lg transition-transform duration-300 hover:-translate-y-1 group flex-grow">
                  {slide.mediaType === 'image' ? (
                    slide.image ? (
                      <div className="relative w-full h-full">
                        <Image 
                          src={slide.image}
                          alt={slide.title || 'Car technology feature'}
                          className="object-cover"
                          fill
                          priority={index < 3}
                          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="bg-brown-200 w-full h-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-brown-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                      </div>
                    )
                  ) : slide.mediaType === 'video' ? (
                    slide.videoUrl ? (
                      <div className="relative w-full h-full group">
                        <video
                          className="w-full h-full object-cover"
                          autoPlay
                          muted
                          loop
                          playsInline
                          poster={slide.videoPoster || ''}
                        >
                          <source src={slide.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-brown-500/80 rounded-full flex items-center justify-center cursor-pointer opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
                          <svg className="w-6 h-6 text-brown-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"></polygon>
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-brown-200 w-full h-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-brown-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                          <line x1="7" y1="2" x2="7" y2="22"></line>
                          <line x1="17" y1="2" x2="17" y2="22"></line>
                          <line x1="2" y1="12" x2="22" y2="12"></line>
                          <line x1="2" y1="7" x2="7" y2="7"></line>
                          <line x1="2" y1="17" x2="7" y2="17"></line>
                          <line x1="17" y1="17" x2="22" y2="17"></line>
                          <line x1="17" y1="7" x2="22" y2="7"></line>
                        </svg>
                      </div>
                    )
                  ) : null}
                </div>
                <h3 className="text-center text-lg md:text-xl font-medium text-brown-900 dark:text-brown-50 mb-2">
                  {slide.title}
                </h3>
                {slide.description && (
                  <p className="text-center text-sm text-brown-700 dark:text-brown-200 line-clamp-2">
                    {slide.description}
                  </p>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div className="flex flex-col items-center space-y-4 mt-8">
          {/* Progress bar */}
          <div className="w-full max-w-md h-1 bg-brown-200 dark:bg-brown-700 relative rounded-sm overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-brown-500 transition-all duration-300 ease-out"
              style={{ width: `${progressWidth}%` }}
            ></div>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-center space-x-6 mt-2">
            <button 
              onClick={() => swiperRef.current?.swiper.slidePrev()}
              className="w-10 h-10 flex items-center justify-center border border-brown-300 dark:border-brown-600 rounded-full text-brown-700 dark:text-brown-200 hover:bg-brown-100 dark:hover:bg-brown-800 transition-colors duration-300 group" 
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 8L10 12L14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              onClick={() => swiperRef.current?.swiper.slideNext()}
              className="w-10 h-10 flex items-center justify-center border border-brown-300 dark:border-brown-600 rounded-full text-brown-700 dark:text-brown-200 hover:bg-brown-100 dark:hover:bg-brown-800 transition-colors duration-300 group" 
              aria-label="Next slide"
            >
              <svg className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 8L14 12L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarTechSlider;