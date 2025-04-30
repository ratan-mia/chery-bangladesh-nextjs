'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideProgress, setSlideProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const swiperRef = useRef(null)
  const progressIntervalRef = useRef(null)
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)

  // Hero slides data - enhanced with information from the brochures
  const heroSlides = [
    {
      id: 'tiggo8pro',
      title: 'TIGGO 8 PRO',
      subtitle: 'Enjoy Your First Class',
      description: 'The epitome of luxury with 195 BHP and premium 7-seat configuration',
      image: '/images/tiggo8pro/hero-slider/tiggo-8pro-banner.jpg',
      color: '#b7a99a', 
      link: '/models/tiggo8pro'
    },
    {
      id: 'tiggocross',
      title: 'TIGGO CROSS',
      subtitle: 'For Every Kind Of You',
      description: 'Modern, safe, comfortable and stylish crossover with biomimetic design',
      image: '/images/tiggocross/slider.jpg',
      color: '#b7a99a',
      link: '/models/tiggocross'
    },
    {
      id: 'tiggocross2',
      title: 'TIGGO CROSS',
      subtitle: 'Wonderful Urban SUV',
      description: 'Sleek and aerodynamic with tiger face styling and advanced safety features',
      image: '/images/tiggocross/slider2.jpg',
      color: '#b7a99a',
      link: '/models/tiggocross'
    },
    {
      id: 'tiggo8pro2',
      title: 'TIGGO 8 PRO',
      subtitle: 'First Class Cabin',
      description: 'Luxurious leather interior with dual 12.3" screens and panoramic sunroof',
      image: '/images/tiggo8pro/hero-slider/tiggo-8-pro.jpg',
      color: '#b7a99a', 
      link: '/models/tiggo8pro'
    }
  ]

  // Progress animation duration (should match swiper autoplay delay)
  const autoplayDelay = 6000

  // Handle slide change
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex)
    resetProgress()
  }

  // Custom pagination UI
  const goToSlide = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index)
    }
  }
  
  // Progress bar animation
  const resetProgress = () => {
    setSlideProgress(0)
    clearInterval(progressIntervalRef.current)
    
    if (!isPaused) {
      progressIntervalRef.current = setInterval(() => {
        setSlideProgress(prev => {
          const newProgress = prev + (100 / (autoplayDelay / 100))
          return newProgress >= 100 ? 100 : newProgress
        })
      }, 100)
    }
  }
  
  // Handle autoplay pause/resume
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
  
  // Set up navigation refs when the component mounts
  useEffect(() => {
    if (swiperRef.current && navigationPrevRef.current && navigationNextRef.current) {
      swiperRef.current.swiper.navigation.init()
      swiperRef.current.swiper.navigation.update()
    }
  }, [])
  
  // Cleanup interval on unmount
  useEffect(() => {
    resetProgress()
    
    return () => {
      clearInterval(progressIntervalRef.current)
    }
  }, [])
  
  return (
    <div className="relative w-full h-[calc(100vh-64px)] min-h-[500px]">
      {/* Main Slider */}
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        slidesPerView={1}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current
          swiper.params.navigation.nextEl = navigationNextRef.current
        }}
        loop={true}
        speed={800}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
        onSlideChange={handleSlideChange}
        className="w-full h-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Clean flat gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent z-10"></div>
            
            {/* Background image */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
                className="object-cover object-center"
              />
            </div>
            
            {/* Content - positioned higher up in the slider */}
            <div className="absolute inset-0 flex flex-col justify-center z-20 p-4 sm:p-6 md:p-10 lg:p-16 pb-20 sm:pb-24">
              <div className="max-w-xl">
                {/* Model name with top accent line */}
                <div className="mb-2 sm:mb-4">
                  <div 
                    className="w-8 sm:w-12 h-1 mb-2 sm:mb-4"
                    style={{ backgroundColor: slide.color }}
                  ></div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide">
                    {slide.title}
                  </h2>
                </div>
                
                {/* Subtitle and description */}
                <p className="text-lg sm:text-xl md:text-2xl text-white font-light mb-1 sm:mb-2">{slide.subtitle}</p>
                <p className="text-sm sm:text-base text-gray-200 mb-4 sm:mb-6 md:mb-8 max-w-md">{slide.description}</p>
                
                {/* CTA button with accent color */}
                <Link href={slide.link}>
                  <button 
                    className="group px-6 sm:px-8 md:px-10 py-2 sm:py-3 text-white uppercase tracking-wider text-xs sm:text-sm font-medium transition-all duration-300 flex items-center"
                    style={{ backgroundColor: slide.color }}
                  >
                    Explore
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-3 w-3 sm:h-4 sm:w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Fixed bottom controls bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col sm:flex-row justify-between items-center border-t border-white/10 bg-black/20 backdrop-blur-sm h-auto sm:h-16">
        {/* Progress indicators */}
        <div className="flex-1 px-3 sm:px-4 md:px-6 lg:px-8 h-full w-full sm:w-auto py-2 sm:py-0">
          <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6 h-full">
            {/* Slide indicators - visible on all screen sizes */}
            <div className="flex space-x-2 sm:space-x-3 h-full items-center">
              {heroSlides.map((_, index) => {
                const realIndex = index % heroSlides.length
                const isCurrent = realIndex === activeIndex % heroSlides.length
                
                return (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className="group relative h-full flex items-center cursor-pointer"
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    <span 
                      className={`block w-5 sm:w-6 md:w-8 h-[2px] transition-all ${
                        isCurrent ? 'bg-white' : 'bg-white/30 group-hover:bg-white/50'
                      }`}
                    ></span>
                    
                    {/* Progress overlay for current slide */}
                    {isCurrent && (
                      <span 
                        className="absolute left-0 top-0 h-full flex items-center pointer-events-none"
                        style={{
                          width: `${slideProgress}%`,
                          maxWidth: '100%'
                        }}
                      >
                        <span 
                          className="block w-full h-[2px]"
                          style={{ backgroundColor: heroSlides[realIndex].color }}
                        ></span>
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
            
            {/* Pause/Play button */}
            <button 
              onClick={toggleAutoplay}
              className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
            >
              {isPaused ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Navigation and counter */}
        <div className="flex items-center h-10 sm:h-full w-full sm:w-auto border-t sm:border-t-0 border-white/10">
          {/* Slide counter */}
          <div className="px-3 sm:px-4 md:px-6 border-r sm:border-l sm:border-r-0 border-white/10 h-full flex items-center">
            <span className="text-white flex items-baseline">
              <span className="text-base sm:text-lg md:text-xl font-bold">{(activeIndex % heroSlides.length) + 1}</span>
              <span className="mx-1 text-xs sm:text-sm opacity-50">/</span>
              <span className="text-xs sm:text-sm opacity-50">{heroSlides.length}</span>
            </span>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex h-full flex-1 sm:flex-auto">
            <button 
              ref={navigationPrevRef}
              className="flex-1 sm:flex-auto w-12 sm:w-16 h-full flex items-center justify-center border-r border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button 
              ref={navigationNextRef}
              className="flex-1 sm:flex-auto w-12 sm:w-16 h-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Model name indicator */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-10 lg:left-16 z-30">
        <div 
          className="py-1 px-2 sm:px-3 text-xs font-medium uppercase tracking-widest"
          style={{ 
            backgroundColor: heroSlides[activeIndex % heroSlides.length].color,
            color: 'white'
          }}
        >
          {heroSlides[activeIndex % heroSlides.length].title}
        </div>
      </div>
    </div>
  )
}