'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function MasonryImageSlider() {
  const [isMounted, setIsMounted] = useState(false)
  const swiperRef = useRef(null)
  const paginationRef = useRef(null)
  
  useEffect(() => {
    setIsMounted(true)
    
    // Moving pagination to content area after Swiper initialization
    if (swiperRef.current && paginationRef.current) {
      const paginationEl = document.querySelector('.swiper-pagination');
      if (paginationEl && paginationRef.current) {
        paginationRef.current.appendChild(paginationEl);
      }
    }
  }, [isMounted])
  
  // Define slider content
  const sliderContent = [
    {
      id: 1,
      images: [
        {
          src: '/images/masonary/1/001-2.jpg',
          alt: 'Tiggo exterior with couple',
          className: 'col-span-2 row-span-1 md:row-span-2 h-full',
          position: 'top-left',
        },
        {
          src: '/images/masonary/1/002-2.jpg', 
          alt: 'Tiggo charging station',
          className: 'col-span-1 row-span-1 h-full',
          position: 'top-right-top',
        },
        {
          src: '/images/masonary/1/003-2.jpg',
          alt: 'Tiggo interior with driver',
          className: 'col-span-1 row-span-1 h-full',
          position: 'bottom-right-top',
        },
        {
          src: '/images/masonary/1/004-2.jpg',
          alt: 'Family inside Tiggo',
          className: 'col-span-2 row-span-1 md:col-span-1 md:row-span-1 h-full',
          position: 'bottom-left',
        },
      ],
      textOverlay: {
        model: 'TIGGO',
        variant: '8 PRO Plug-In Hybrid',
        tagline: 'Experience the design charm on the road',
      }
    },
    {
      id: 2,
      images: [
        {
          src: '/images/masonary/2/0081.png',
          alt: 'Arrizo exterior view',
          className: 'col-span-3 row-span-2 md:col-span-2 md:row-span-1 h-full',
          position: 'top-left',
        },
        {
          src: '/images/masonary/2/0082.png',
          alt: 'Arrizo side view',
          className: 'col-span-3 row-span-1 md:col-span-1 md:row-span-2 h-full',
          position: 'top-right',
        },
        {
          src: '/images/masonary/2/0083.png',
          alt: 'Arrizo dashboard',
          className: 'col-span-3 row-span-1 md:col-span-1 md:row-span-1 h-full',
          position: 'bottom-left',
        },
        {
          src: '/images/masonary/2/0084.png',
          alt: 'Arrizo comfortable seats',
          className: 'col-span-3 row-span-1 md:col-span-1 md:row-span-1 h-full',
          position: 'bottom-right',
        },
      ],
      textOverlay: {
        model: 'ARRIZO',
        variant: '8 Sedan',
        tagline: 'Elegance meets performance',
      }
    },
  ]
  
  // Return null during SSR to prevent hydration errors with Swiper
  if (!isMounted) {
    return null
  }
  
  return (
    <section className="relative w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, EffectFade, Autoplay]}
        navigation={false}
        pagination={{ 
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="${className} pagination-line"></span>`;
          }
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={800}
        className="w-full masonry-slider"
      >
        {sliderContent.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[600px] sm:h-[700px] md:h-[800px] lg:h-[90vh] max-h-[900px]">
              {/* Masonry grid layout */}
              <div className="grid grid-cols-3 grid-rows-4 md:grid-rows-2 gap-1 h-full">
                {slide.images.map((image, index) => (
                  <div key={index} className={`relative ${image.className}`}>
                    <Image 
                      src={image.src} 
                      alt={image.alt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      priority={slide.id === 1 && index === 0}
                    />
                  </div>
                ))}
                
                {/* Content overlay - always in bottom right */}
                <div className="absolute bottom-0 right-0 w-full md:w-1/3 bg-stone-300 bg-opacity-90 p-4 md:p-8 flex flex-col justify-center">
                  <h2 className="text-3xl md:text-5xl font-bold tracking-wider text-white mb-1">
                    {slide.textOverlay.model}
                  </h2>
                  <h3 className="text-lg md:text-xl font-medium text-white mb-2 md:mb-4">
                    {slide.textOverlay.variant}
                  </h3>
                  <p className="text-white text-xs md:text-sm font-light">
                    {slide.textOverlay.tagline}
                  </p>
                  
                  {/* Container for pagination bullets */}
                  <div ref={paginationRef} className="pagination-container mt-4 flex items-center gap-6"></div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom navigation arrows */}
      <button 
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-all focus:outline-none"
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button 
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-all focus:outline-none"
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
      
      {/* Custom styles for pagination lines */}
      <style jsx global>{`
        .masonry-slider .swiper-pagination {
          position: static;
          width: auto;
          margin-top: 1rem;
          display: flex;
          gap: 2rem;
        }
        
        .masonry-slider .pagination-line {
          display: block;
          width: 2rem;
          height: 1px;
          background-color: white;
          opacity: 0.6;
          margin: 0;
          border-radius: 0;
          transition: all 0.3s ease;
        }
        
        .masonry-slider .pagination-line.swiper-pagination-bullet-active {
          opacity: 1;
          height: 2px;
        }
        
        @media (min-width: 768px) {
          .masonry-slider .pagination-line {
            width: 2.5rem;
          }
        }
      `}</style>
    </section>
  )
}