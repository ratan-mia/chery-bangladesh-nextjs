import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const KeyAwardsSlider = () => {
  const swiperRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Award data
  const awards = [
    {
      id: 1,
      year: "2024",
      title: "CHERY GROUP",
      subtitle: "ACHIEVES FIRST-TIME ENTRY INTO FORTUNE GLOBAL 500, RANKING 385TH",
      image: "/images/hero-slider/header-image.jpg",
      logo: "/images/awards/fortune-logo.png",
      link: "/awards/fortune-500"
    },
    {
      id: 2,
      year: "2024",
      title: "CHERY WINS",
      subtitle: "BRANDZ PIONEERING CHINESE GLOBAL BRAND",
      image: "/images/hero-slider/slider2.jpg",
      additionalText: "AWARD AS THE SOLE WINNER IN THE AUTOMOTIVE INDUSTRY",
      organization: "KANTAR BRANDZ",
      link: "/awards/brandz"
    },
    {
      id: 3,
      year: "2024",
      title: "CHERY RANKED",
      subtitle: "THE BEST PERFORMING GLOBAL BRAND IN CHINA",
      image: "/images/awards/china-brand.jpg",
      additionalText: "CHINESE GLOBAL BRAND TOP 14",
      organization: "KANTAR BRANDZ",
      link: "/awards/brandz-china"
    },
    {
      id: 4,
      year: "2023",
      title: "CHERY TIGGO 7 PRO MAX",
      subtitle: "AWARDED BEST COMPACT SUV",
      image: "/images/awards/tiggo-award.jpg",
      additionalText: "MIDDLE EAST CAR OF THE YEAR AWARDS",
      organization: "MECOTY",
      link: "/awards/mecoty"
    }
  ];

  // Set mounted state to true after component mounts to avoid hydration issues
  useEffect(() => {
    setMounted(true);
    
    // Handle keyboard navigation for accessibility
    const handleKeyDown = (e) => {
      if (swiperRef.current) {
        if (e.key === 'ArrowLeft') {
          swiperRef.current.slidePrev();
        } else if (e.key === 'ArrowRight') {
          swiperRef.current.slideNext();
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handle slide change
  const handleSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  // Navigation handlers
  const handlePrev = useCallback(() => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  }, []);

  const handleNext = useCallback(() => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  }, []);

  // Custom pagination component
  const renderPagination = useCallback(() => {
    return (
      <div className="flex justify-center items-center gap-2 mt-8 mb-2">
        {awards.map((_, index) => (
          <button
            key={index}
            onClick={() => swiperRef.current?.swiper?.slideTo(index + 1)}
            className={`h-1 rounded-none transition-all duration-300 
              ${activeIndex === index ? 'w-8 bg-primary' : 'w-4 bg-brown-300'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    );
  }, [activeIndex, awards]);

  return (
    <section className="py-16 md:py-20 bg-white" aria-labelledby="key-awards-heading">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <div className="w-16 h-px bg-primary mb-4"></div>
            <h2 
              id="key-awards-heading" 
              className="text-brown-900 text-3xl font-bold tracking-tight mb-2"
            >
              KEY AWARDS
            </h2>
            <p className="text-brown-600 max-w-md mb-6 md:mb-0">
              Recognition of our commitment to excellence in the automotive industry
            </p>
          </div>
          
          {/* Navigation controls */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex text-sm text-brown-500">
              <span className="font-medium">{activeIndex + 1}</span>
              <span className="mx-2">/</span>
              <span>{awards.length}</span>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 flex items-center justify-center text-brown-700 hover:text-primary focus:text-primary transition-colors border border-transparent hover:border-brown-200 focus:border-brown-200 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-md"
                aria-label="Previous award"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button 
                onClick={handleNext}
                className="w-10 h-10 flex items-center justify-center text-brown-700 hover:text-primary focus:text-primary transition-colors border border-transparent hover:border-brown-200 focus:border-brown-200 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-md"
                aria-label="Next award"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {mounted && (
          <>
            <div className="relative equal-height-slider">
              <Swiper
                ref={swiperRef}
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                centeredSlides={false}
                loop={true}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                pagination={false} // Disable default pagination
                breakpoints={{
                  640: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 28,
                  },
                  1280: {
                    slidesPerView: 3,
                    spaceBetween: 32,
                  },
                }}
                onSlideChange={handleSlideChange}
                a11y={{
                  prevSlideMessage: 'Previous award',
                  nextSlideMessage: 'Next award',
                  firstSlideMessage: 'This is the first award',
                  lastSlideMessage: 'This is the last award',
                }}
                className="equal-height-swiper"
              >
                {awards.map((award, index) => (
                  <SwiperSlide key={award.id} className="h-auto">
                    <div className="bg-white border border-brown-100 hover:border-brown-300 rounded-lg overflow-hidden h-full flex flex-col transition-all duration-300 shadow-sm hover:shadow-md">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        {/* Overlay gradient for better text visibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-60 hover:opacity-40 transition-opacity"></div>
                        
                        {/* Year tag */}
                        <div className="absolute top-4 left-4 z-20">
                          <div className="bg-white px-3 py-1 text-xs font-medium text-brown-800 shadow-sm hover:bg-primary hover:text-white transition-colors duration-300">
                            {award.year}
                          </div>
                        </div>
                        
                        {/* Organization tag */}
                        {award.organization && (
                          <div className="absolute top-4 right-4 z-20">
                            <div className="bg-primary px-3 py-1 shadow-sm">
                              <span className="text-xs font-medium text-white">{award.organization}</span>
                            </div>
                          </div>
                        )}
                        
                        {/* Image */}
                        <div className="relative w-full h-full">
                          <Image
                            src={award.image}
                            alt={`${award.title} - ${award.subtitle}`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw"
                            className="object-cover transition-transform duration-500 hover:scale-105"
                            priority={index < 2} // Prioritize loading the first two images
                          />
                        </div>
                      </div>
                      
                      <div className="p-5 md:p-6 flex flex-col flex-grow">
                        <h3 className="text-brown-900 text-lg md:text-xl font-bold mb-2 hover:text-primary transition-colors duration-300">
                          {award.title}
                        </h3>
                        <p className="text-brown-700 text-sm mb-4">{award.subtitle}</p>
                        
                        {award.additionalText && (
                          <div className="mt-auto pt-3 border-t border-brown-100">
                            <p className="text-xs text-brown-600">
                              {award.additionalText}
                            </p>
                          </div>
                        )}
                        
                        {/* Read more link */}
                        <Link
                          href={award.link || "#"}
                          className="mt-4 inline-flex items-center text-sm font-medium text-primary opacity-75 hover:opacity-100 transition-opacity duration-300"
                        >
                          <span>Read more</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            
            {/* Custom pagination as lines */}
            {renderPagination()}
          </>
        )}
        
        {/* View all link */}
        <div className="flex justify-center mt-8">
          <Link 
            href="/awards" 
            className="inline-flex items-center px-6 py-2.5 border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300 font-medium rounded-md group"
          >
            <span>View all awards</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Add global CSS for equal height slides */}
      <style jsx global>{`
        .equal-height-swiper .swiper-wrapper {
          align-items: stretch;
        }
        
        .equal-height-swiper .swiper-slide {
          height: auto;
          display: flex;
        }
        
        .equal-height-swiper .swiper-slide > div {
          width: 100%;
        }
      `}</style>
    </section>
  );
};

export default KeyAwardsSlider;