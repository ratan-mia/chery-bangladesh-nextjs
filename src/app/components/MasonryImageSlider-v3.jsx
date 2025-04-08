'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Autoplay, EffectFade, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'

export default function MasonryImageSlider() {
  const [isMounted, setIsMounted] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideProgress, setSlideProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const swiperRef = useRef(null)
  const progressIntervalRef = useRef(null)
  
  // Autoplay duration (in ms)
  const autoplayDuration = 5000
  
  // Reset and start progress animation
  const resetProgress = () => {
    setSlideProgress(0)
    clearInterval(progressIntervalRef.current)
    
    if (!isPaused) {
      progressIntervalRef.current = setInterval(() => {
        setSlideProgress(prev => {
          const newProgress = prev + (100 / (autoplayDuration / 100))
          return newProgress >= 100 ? 100 : newProgress
        })
      }, 100)
    }
  }
  
  // Handle slide change
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex)
    resetProgress()
  }
  
  // Toggle autoplay
  const toggleAutoplay = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      if (isPaused) {
        swiperRef.current.swiper.autoplay.start()
        resetProgress()
      } else {
        swiperRef.current.swiper.autoplay.stop()
        clearInterval(progressIntervalRef.current)
      }
      setIsPaused(!isPaused)
    }
  }
  
  // Handle navigation
  const handleNavigation = (direction) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      if (direction === 'prev') {
        swiperRef.current.swiper.slidePrev()
      } else {
        swiperRef.current.swiper.slideNext()
      }
      resetProgress()
    }
  }
  
  // Set up when component mounts
  useEffect(() => {
    setIsMounted(true)
    resetProgress()
    
    return () => {
      clearInterval(progressIntervalRef.current)
    }
  }, [])
  
  // Update progress when isPaused changes
  useEffect(() => {
    if (isPaused) {
      clearInterval(progressIntervalRef.current)
    } else {
      resetProgress()
    }
  }, [isPaused])
  
  // Define slider content
  const sliderContent = [
    {
      id: 1,
      images: [
        {
          src: '/images/masonary/1/001-2.jpg',
          alt: 'Tiggo exterior with couple',
          className: 'col-span-3 row-span-2 md:col-span-2 md:row-span-2',
        },
        {
          src: '/images/masonary/1/002-2.jpg', 
          alt: 'Tiggo charging station',
          className: 'col-span-3 row-span-1 md:col-span-1 md:row-span-1',
        },
        {
          src: '/images/masonary/1/003-2.jpg',
          alt: 'Tiggo interior with driver',
          className: 'col-span-3 row-span-1 md:col-span-1 md:row-span-1',
        },
        {
          src: '/images/masonary/1/004-2.jpg',
          alt: 'Family inside Tiggo',
          className: 'col-span-3 row-span-1 md:col-span-2 md:row-span-1',
        },
      ],
      content: {
        model: 'TIGGO',
        variant: '8 PRO Plug-In Hybrid',
        tagline: 'Experience the design charm on the road',
        buttonText: 'Explore TIGGO',
        buttonLink: '/models/tiggo',
        color: '#b7a99a' // Beige/Gold color for Tiggo
      }
    },
    {
      id: 2,
      images: [
        {
          src: '/images/masonary/2/0081.png',
          alt: 'Arrizo exterior view',
          className: 'col-span-3 row-span-1 md:col-span-2 md:row-span-1',
        },
        {
          src: '/images/masonary/2/0082.png',
          alt: 'Arrizo side view',
          className: 'col-span-3 row-span-1 md:col-span-1 md:row-span-2',
        },
        {
          src: '/images/masonary/2/0083.png',
          alt: 'Arrizo dashboard',
          className: 'col-span-3 row-span-1 md:col-span-1 md:row-span-1',
        },
        {
          src: '/images/masonary/2/0084.png',
          alt: 'Arrizo comfortable seats',
          className: 'col-span-3 row-span-1 md:col-span-1 md:row-span-1',
        },
      ],
      content: {
        model: 'ARRIZO',
        variant: '8 Sedan',
        tagline: 'Elegance meets performance',
        buttonText: 'Explore ARRIZO',
        buttonLink: '/models/arrizo',
        color: '#00A8E8' // Blue color for Arrizo
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
        ref={swiperRef}
        modules={[Navigation, EffectFade, Autoplay]}
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
          <SwiperSlide key={slide.id} className="relative">
            <div className="relative w-full h-[550px] sm:h-[650px] md:h-[750px] lg:h-[90vh] max-h-[900px]">
              {/* Full masonry grid layout */}
              <div className="grid grid-cols-3 md:grid-cols-4 gap-1 h-full">
                {slide.images.map((image, index) => (
                  <div key={index} className={`relative ${image.className} overflow-hidden`}>
                    <Image 
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover object-center transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      priority={slide.id === 1 && index === 0}
                    />
                  </div>
                ))}
              </div>
              
              {/* Content overlay - absolute positioned in bottom right */}
              <div className="absolute bottom-0 right-0 z-10 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-primary/90 backdrop-blur-sm">
                <div className="w-full p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col">
                  {/* Model info */}
                  <div className="mb-4 md:mb-6">
                    <div 
                      className="w-10 h-1 mb-3"
                      style={{ backgroundColor: slide.content.color }}
                    ></div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-wide text-white mb-1">
                      {slide.content.model}
                    </h2>
                    <h3 className="text-base sm:text-lg text-gray-100 mb-2">
                      {slide.content.variant}
                    </h3>
                    <p className="text-sm text-gray-200">
                      {slide.content.tagline}
                    </p>
                  </div>
                  
                  {/* CTA Button */}
                  <div className="mb-6">
                    <Link 
                      href={slide.content.buttonLink} 
                      className="inline-flex items-center text-sm font-medium text-white border-b border-white hover:border-gray-200 hover:text-gray-200 transition-colors duration-300 group"
                    >
                      {slide.content.buttonText}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                  
                  {/* Controls */}
                  <div className="mt-auto">
                    {/* Model navigation */}
                    <div className="flex space-x-6 mb-4">
                      {sliderContent.map((item, index) => (
                        <button
                          key={index}
                          className="text-xs tracking-wider uppercase font-medium flex flex-col items-start"
                          onClick={() => swiperRef.current?.slideTo(index + 1)}
                          aria-label={`View ${item.content.model}`}
                        >
                          <span 
                            className={`transition-colors duration-300 ${
                              activeIndex === index ? 'text-white' : 'text-gray-300/70'
                            }`}
                          >
                            {item.content.model}
                          </span>
                          
                          {/* Progress indicator */}
                          <div className="mt-2 w-12 h-[2px] bg-black/20 overflow-hidden">
                            {activeIndex === index && (
                              <div 
                                className="h-full" 
                                style={{ 
                                  width: `${slideProgress}%`,
                                  backgroundColor: item.content.color
                                }}
                              ></div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    {/* Navigation controls */}
                    <div className="flex justify-between">
                      {/* Play/pause button */}
                      <button 
                        onClick={toggleAutoplay}
                        className="w-8 h-8 flex items-center justify-center border border-white/30 text-white/80 hover:border-white hover:text-white transition-colors duration-200"
                        aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                      >
                        {isPaused ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                          </svg>
                        )}
                      </button>
                      
                      <div className="flex space-x-2">
                        <button 
                          className="w-8 h-8 flex items-center justify-center border border-white/30 text-white/80 hover:border-white hover:text-white transition-colors duration-200"
                          onClick={() => handleNavigation('prev')}
                          aria-label="Previous slide"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                          </svg>
                        </button>
                        <button 
                          className="w-8 h-8 flex items-center justify-center border border-white/30 text-white/80 hover:border-white hover:text-white transition-colors duration-200"
                          onClick={() => handleNavigation('next')}
                          aria-label="Next slide"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Slide counter - fixed position */}
      <div className="absolute top-4 left-4 z-10 bg-primary/80 backdrop-blur-sm px-3 py-1">
        <span className="text-white text-sm">
          <span className="font-medium">{activeIndex + 1}</span>
          <span className="mx-1 opacity-50">/</span>
          <span className="opacity-70">{sliderContent.length}</span>
        </span>
      </div>
      
      {/* Small screen floating controls for better mobile usability */}
      <div className="md:hidden fixed bottom-4 right-4 z-10 flex flex-col items-center space-y-2">
        <button 
          onClick={toggleAutoplay}
          className="w-10 h-10 flex items-center justify-center bg-primary/90 backdrop-blur-sm text-white rounded-full shadow-lg"
          aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
        >
          {isPaused ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          )}
        </button>
      </div>
    </section>
  )
}