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
  const prevButtonRef = useRef(null)
  const nextButtonRef = useRef(null)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Define slider content
  const sliderContent = [
    {
      id: 1,
      images: [
        {
          src: '/images/masonary/1/001-2.jpg', // Replace with your image paths
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
    // Add more slides as needed
  ]
  
  // Return null during SSR to prevent hydration errors with Swiper
  if (!isMounted) {
    return null
  }
  
  return (
    <section className="relative w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, EffectFade, Autoplay]}
        navigation={{
          prevEl: prevButtonRef.current,
          nextEl: nextButtonRef.current,
        }}
        pagination={{ 
          clickable: true,
          el: '.swiper-pagination-container'
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevButtonRef.current
          swiper.params.navigation.nextEl = nextButtonRef.current
          swiper.navigation.init()
          swiper.navigation.update()
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={800}
        className="w-full"
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
                    
                    {/* Text overlay only on the bottom right image */}
                    {image.position === 'bottom-right' && (
                      <div className="absolute inset-0 bg-stone-300 bg-opacity-90 p-4 md:p-8 flex flex-col justify-center">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-wider text-white mb-1">
                          {slide.textOverlay.model}
                        </h2>
                        <h3 className="text-lg md:text-xl font-medium text-white mb-2 md:mb-4">
                          {slide.textOverlay.variant}
                        </h3>
                        <p className="text-white text-xs md:text-sm font-light">
                          {slide.textOverlay.tagline}
                        </p>
                        <div className="flex space-x-2 mt-2 md:mt-4">
                          <span className="w-6 md:w-8 h-[2px] bg-white"></span>
                          <span className="w-6 md:w-8 h-[2px] bg-white"></span>
                          <span className="w-6 md:w-8 h-[2px] bg-white"></span>
                        </div>
                      </div>
                    )}
                    
                    {/* For mobile view, add text overlay on the 4th image for first slide */}
                    {slide.id === 1 && image.position === 'bottom-left' && (
                      <div className="absolute inset-0 bg-stone-300 bg-opacity-90 p-4 md:hidden flex flex-col justify-center">
                        <h2 className="text-3xl font-bold tracking-wider text-white mb-1">
                          {slide.textOverlay.model}
                        </h2>
                        <h3 className="text-lg font-medium text-white mb-2">
                          {slide.textOverlay.variant}
                        </h3>
                        <p className="text-white text-xs font-light">
                          {slide.textOverlay.tagline}
                        </p>
                        <div className="flex space-x-2 mt-2">
                          <span className="w-6 h-[2px] bg-white"></span>
                          <span className="w-6 h-[2px] bg-white"></span>
                          <span className="w-6 h-[2px] bg-white"></span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Add a specific text container for the first slide in tablet/desktop view */}
                {slide.id === 1 && (
                  <div className="absolute bottom-0 right-0 w-1/3 hidden md:block">
                    <div className="bg-stone-300 bg-opacity-90 p-8 h-full flex flex-col justify-center">
                      <h2 className="text-5xl font-bold tracking-wider text-white mb-1">
                        {slide.textOverlay.model}
                      </h2>
                      <h3 className="text-xl font-medium text-white mb-4">
                        {slide.textOverlay.variant}
                      </h3>
                      <p className="text-white text-sm font-light">
                        {slide.textOverlay.tagline}
                      </p>
                      <div className="flex space-x-2 mt-4">
                        <span className="w-8 h-[2px] bg-white"></span>
                        <span className="w-8 h-[2px] bg-white"></span>
                        <span className="w-8 h-[2px] bg-white"></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
        
        {/* Pagination container */}
        <div className="swiper-pagination-container absolute bottom-6 z-10 w-full flex justify-center"></div>
      </Swiper>
      
      {/* Custom navigation arrows */}
      <button 
        ref={prevButtonRef} 
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-all focus:outline-none"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button 
        ref={nextButtonRef} 
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-all focus:outline-none"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
      
      {/* Custom styles for Swiper */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background-color: white;
          opacity: 0.6;
          margin: 0 4px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background-color: white;
          opacity: 1;
          width: 12px;
          height: 12px;
        }
        
        @media (min-width: 768px) {
          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            margin: 0 5px;
          }
          .swiper-pagination-bullet-active {
            width: 14px;
            height: 14px;
          }
        }
      `}</style>
    </section>
  )
}