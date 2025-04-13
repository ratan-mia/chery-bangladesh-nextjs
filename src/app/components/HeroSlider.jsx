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

  // Hero slides data
  const heroSlides = [
    {
      id: 'tiggo8',
      title: 'TIGGO 8',
      subtitle: 'Enjoy Your First Class',
      description: 'Premium 7-seater SUV with luxury features and advanced tech',
      image: '/images/hero-slider/header-image.jpg',
      color: '#b7a99a', // Beige/Gold color
      link: '/models/tiggo8'
    },
    {
      id: 'tiggo9',
      title: 'TIGGO 9',
      subtitle: 'Beyond Extraordinary',
      description: 'Our flagship SUV with cutting-edge design and performance',
      image: '/images/hero-slider/slider2.jpg',
      color: '#b7a99a', // Teal color
      link: '/models/tiggo9'
    },
    {
      id: 'tiggo7pro',
      title: 'TIGGO 7 PRO',
      subtitle: 'Designed For Distinction',
      description: 'Stylish compact SUV with smart technology and efficiency',
      image: '/images/hero-slider/header-image.jpg',
      color: '#b7a99a', // Blue color
      link: '/models/tiggo7-pro'
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
  
  // Cleanup interval on unmount
  useEffect(() => {
    resetProgress()
    
    return () => {
      clearInterval(progressIntervalRef.current)
    }
  }, [])
  
  return (
    <div className="relative w-full h-[calc(100vh-64px)]">
      {/* Main Slider */}
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        slidesPerView={1}
        navigation={{
          nextEl: '.hero-button-next',
          prevEl: '.hero-button-prev',
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
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10"></div>
            
            {/* Background image */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
            
            {/* Content - positioned to ensure it doesn't overlap with bottom bar */}
            <div className="absolute inset-0 flex flex-col justify-end z-20 p-8 md:p-16 lg:p-20 pb-24">
              <div className="max-w-xl">
                {/* Model name with top accent line */}
                <div className="mb-4">
                  <div 
                    className="w-12 h-1 mb-4"
                    style={{ backgroundColor: slide.color }}
                  ></div>
                  <h2 className="text-5xl md:text-6xl font-bold text-white tracking-wide">
                    {slide.title}
                  </h2>
                </div>
                
                {/* Subtitle and description */}
                <p className="text-xl md:text-2xl text-white font-light mb-2">{slide.subtitle}</p>
                <p className="text-base text-gray-200 mb-8 max-w-md">{slide.description}</p>
                
                {/* CTA button with accent color */}
                <Link href={slide.link}>
                  <button 
                    className="group px-10 py-3 text-white uppercase tracking-wider text-sm font-medium transition-all duration-300 flex items-center"
                    style={{ backgroundColor: slide.color }}
                  >
                    Explore
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
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
      <div className="absolute bottom-0 left-0 right-0 z-30 flex justify-between items-center border-t border-white/10 bg-black/20 backdrop-blur-sm h-16">
        {/* Progress indicators */}
        <div className="flex-1 px-8 h-full">
          <div className="flex items-center space-x-6 h-full">
            {/* Slide indicators */}
            <div className="flex space-x-3 h-full items-center">
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
                      className={`block w-8 h-[2px] transition-all ${
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
              className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors"
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
        </div>
        
        {/* Navigation and counter */}
        <div className="flex items-center h-full">
          {/* Slide counter */}
          <div className="px-6 border-l border-white/10 h-full flex items-center">
            <span className="text-white flex items-baseline">
              <span className="text-xl font-bold">{(activeIndex % heroSlides.length) + 1}</span>
              <span className="mx-1 text-sm opacity-50">/</span>
              <span className="text-sm opacity-50">{heroSlides.length}</span>
            </span>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex h-full">
            <button className="hero-button-prev w-16 h-full flex items-center justify-center border-l border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button className="hero-button-next w-16 h-full flex items-center justify-center border-l border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Model name indicator */}
      <div className="absolute top-8 left-8 md:left-16 z-30">
        <div 
          className="py-1 px-3 text-xs font-medium uppercase tracking-widest"
          style={{ 
            backgroundColor: heroSlides[activeIndex % heroSlides.length].color,
            color: 'white'
          }}
        >
          {heroSlides[activeIndex % heroSlides.length].id}
        </div>
      </div>
    </div>
  )
}