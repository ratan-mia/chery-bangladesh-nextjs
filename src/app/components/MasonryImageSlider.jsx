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
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideProgress, setSlideProgress] = useState(0)
  const swiperRef = useRef(null)
  const contentRef = useRef(null)
  const progressIntervalRef = useRef(null)
  
  // Autoplay duration (in ms)
  const autoplayDuration = 5000
  
  // Reset and start progress animation
  const resetProgress = () => {
    setSlideProgress(0)
    clearInterval(progressIntervalRef.current)
    
    progressIntervalRef.current = setInterval(() => {
      setSlideProgress(prev => {
        const newProgress = prev + (100 / (autoplayDuration / 100))
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 100)
  }
  
  // Handle slide change
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex)
    resetProgress()
  }
  
  useEffect(() => {
    setIsMounted(true)
    resetProgress()
    
    return () => {
      clearInterval(progressIntervalRef.current)
    }
  }, [])
  
  // Define slider content
  const sliderContent = [
    {
      id: 1,
      images: [
        {
          src: '/images/masonary/1/001-2.png',
          alt: 'Tiggo exterior with couple',
          className: 'col-span-3 row-span-2 md:col-span-2 md:row-span-1 h-full',
          position: 'top-left',
        },
        {
          src: '/images/masonary/1/002-2.png', 
          alt: 'Tiggo charging station',
          className: 'col-span-3 row-span-1 md:col-span-1 md:row-span-2 h-full',
          position: 'top-right',
        },
        {
          src: '/images/masonary/1/003-2.png',
          alt: 'Tiggo interior with driver',
          className: 'col-span-3 row-span-1 md:col-span-1 md:row-span-1 h-full',
          position: 'bottom-left',
        },
        {
          src: '/images/masonary/1/004-2.png',
          alt: 'Family inside Tiggo',
          className: 'col-span-3 row-span-1 md:col-span-1 md:row-span-1 h-full',
          position: 'bottom-right',
        },
      ],
      textOverlay: {
        model: 'TIGGO 8 PRO',
        variant: 'Premium 7-Seater SUV',
        tagline: 'Experience the design charm on the road',
        color: '#333' // Brand color for Tiggo
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
        model: 'TIGGO CROSS',
        variant: 'Ultimate Crossover',
        tagline: 'Elegance meets performance',
        color: '#333' // Brand color for Arrizo
      }
    },
  ]
  
  // Return null during SSR to prevent hydration errors with Swiper
  if (!isMounted) {
    return null
  }
  
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Pagination, EffectFade, Autoplay]}
        navigation={false}
        pagination={false} // Using custom pagination
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: autoplayDuration,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={800}
        onSlideChange={handleSlideChange}
        className="w-full masonry-slider"
      >
        {sliderContent.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[600px] sm:h-[700px] md:h-[800px] lg:h-[90vh] max-h-[900px]">
               {/* Masonry grid layout  */}
                      <div className="grid grid-cols-3 grid-rows-4 md:grid-rows-2 gap-1 h-full">
                      {slide.images.map((image, index) => (
                        <div key={index} className={`relative ${image.className} overflow-hidden`}>
                        <Image 
                          src={image.src} 
                          alt={image.alt}
                          fill
                          className="object-cover object-center transition-transform duration-700 hover:scale-105"
                          sizes="100vw"
                          priority={slide.id === 1 && index === 0}
                        />
                        </div>
                      ))}
                      
                      {/* Content overlay - with themed background color */}
                <div 
                  ref={contentRef}
                  className="absolute bottom-0 right-0 p-6 md:p-8 flex flex-col justify-center w-full md:w-1/3"
                  style={{ background: 'linear-gradient(to right, #d4b598, #c8a482)' }}
                >
                  {/* Accent color line */}
                  <div 
                    className="w-12 h-1 mb-4"
                    style={{ backgroundColor: slide.textOverlay.color }}
                  ></div>
                  
                  <div className="mb-4">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-white mb-1">
                      {slide.textOverlay.model}
                    </h2>
                    <h3 className="text-lg md:text-xl text-white mb-2">
                      {slide.textOverlay.variant}
                    </h3>
                    <p className="text-white text-sm md:text-base">
                      {slide.textOverlay.tagline}
                    </p>
                  </div>
                  
                  {/* Custom pagination */}
                  <div className="mt-4 flex flex-col gap-4">
                    {/* Models list as pagination */}
                    <div className="flex space-x-8">
                      {sliderContent.map((item, index) => (
                        <button
                          key={index}
                          className="text-xs tracking-wider uppercase font-medium flex flex-col items-start"
                          onClick={() => {
                            swiperRef.current.slideTo(index + 1);
                            resetProgress();
                          }}
                          aria-label={`View ${item.textOverlay.model}`}
                        >
                          <span 
                            className={`transition-colors duration-300 ${
                              activeIndex === index ? 'text-white' : 'text-gray-200'
                            }`}
                          >
                            {item.textOverlay.model}
                          </span>
                          
                          {/* Progress indicator */}
                          <div className="mt-2 w-12 h-[2px] bg-gray-100 overflow-hidden">
                            {activeIndex === index && (
                              <div 
                                className="h-full" 
                                style={{ 
                                  width: `${slideProgress}%`,
                                  backgroundColor: item.textOverlay.color
                                }}
                              ></div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    {/* Navigation buttons */}
                    <div className="flex justify-end space-x-2">
                      <button 
                        className="w-10 h-10 flex items-center justify-center border border-white text-white hover:bg-white hover:text-gray-800 transition-colors"
                        onClick={() => {
                          swiperRef.current.slidePrev();
                          resetProgress();
                        }}
                        aria-label="Previous slide"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                      </button>
                      <button 
                        className="w-10 h-10 flex items-center justify-center border border-white text-white hover:bg-white hover:text-gray-800 transition-colors"
                        onClick={() => {
                          swiperRef.current.slideNext();
                          resetProgress();
                        }}
                        aria-label="Next slide"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Mobile navigation - only visible on smaller screens */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between md:hidden z-10">
        <button 
          className="w-10 h-10 flex items-center justify-center bg-gray-50/90 dark:bg-gray-900/90 text-gray-900 dark:text-gray-100"
          onClick={() => {
            swiperRef.current.slidePrev();
            resetProgress();
          }}
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button 
          className="w-10 h-10 flex items-center justify-center bg-gray-50/90 dark:bg-gray-900/90 text-gray-900 dark:text-gray-100"
          onClick={() => {
            swiperRef.current.slideNext();
            resetProgress();
          }}
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </section>
  )
}
