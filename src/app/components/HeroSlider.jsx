'use client'

import { AnimatePresence, motion } from 'framer-motion'
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
  const [isMounted, setIsMounted] = useState(false)
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
      color: '#8c735d', // Updated to match design system primary-700
      link: '/models/tiggo8pro'
    },
    {
      id: 'tiggocross',
      title: 'TIGGO CROSS',
      subtitle: 'For Every Kind Of You',
      description: 'Modern, safe, comfortable and stylish crossover with biomimetic design',
      image: '/images/tiggocross/slider.jpg',
      color: '#8c735d',
      link: '/models/tiggocross'
    },
    {
      id: 'tiggocross2',
      title: 'TIGGO CROSS',
      subtitle: 'Wonderful Urban SUV',
      description: 'Sleek and aerodynamic with tiger face styling and advanced safety features',
      image: '/images/tiggocross/slider2.jpg',
      color: '#8c735d',
      link: '/models/tiggocross'
    },
    {
      id: 'tiggo8pro2',
      title: 'TIGGO 8 PRO',
      subtitle: 'First Class Cabin',
      description: 'Luxurious leather interior with dual 12.3" screens and panoramic sunroof',
      image: '/images/tiggo8pro/hero-slider/tiggo-8-pro.jpg',
      color: '#8c735d',
      link: '/models/tiggo8pro'
    }
  ]

  // Animation variants
  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: (custom) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.1 * custom 
      }
    }),
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  }

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.5
      }
    },
    hover: {
      backgroundColor: "#524336", // primaryDark
      scale: 1.05,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  }

  const badgeVariants = {
    hidden: { 
      opacity: 0, 
      x: -20 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2
      }
    }
  }

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
    
    setIsMounted(true)
    
    return () => {
      setIsMounted(false)
    }
  }, [])
  
  // Cleanup interval on unmount
  useEffect(() => {
    resetProgress()
    
    return () => {
      clearInterval(progressIntervalRef.current)
    }
  }, [isPaused])
  
  return (
    <div className="relative w-full h-[calc(100vh-4rem)] sm:h-[calc(100vh-4.5rem)] lg:h-[calc(100vh-5rem)] min-h-[500px]">
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
            {/* Background image */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
            
            {/* Enhanced gradient overlay with more depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10"></div>
            
            {/* Content container */}
            <div className="absolute inset-0 flex flex-col justify-center z-20 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 py-16 sm:py-20">
              <AnimatePresence mode="wait">
                {index === activeIndex % heroSlides.length && isMounted && (
                  <motion.div 
                    key={`content-${slide.id}`}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="max-w-3xl"
                  >
                    {/* Model name with top accent line */}
                    <motion.div 
                      variants={textVariants}
                      custom={0}
                      className="mb-4 sm:mb-6"
                    >
                      <div 
                        className="w-10 sm:w-16 h-1.5 mb-4 sm:mb-6"
                        style={{ backgroundColor: slide.color }}
                      ></div>
                      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-wide leading-tight">
                        {slide.title}
                      </h2>
                    </motion.div>
                    
                    {/* Subtitle with enhanced typography */}
                    <motion.p 
                      variants={textVariants}
                      custom={1}
                      className="text-xl sm:text-2xl md:text-3xl text-white font-light mb-2 sm:mb-4"
                    >
                      {slide.subtitle}
                    </motion.p>
                    
                    {/* Description with improved readability */}
                    <motion.p 
                      variants={textVariants}
                      custom={2}
                      className="text-base sm:text-lg text-gray-200 mb-6 sm:mb-8 md:mb-10 max-w-xl"
                    >
                      {slide.description}
                    </motion.p>
                    
                    {/* Animated CTA button */}
                    <motion.div
                      variants={textVariants}
                      custom={3}
                    >
                      <Link href={slide.link}>
                        <motion.button 
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap={{ scale: 0.98 }}
                          className="px-8 sm:px-10 py-3 sm:py-4 cursor-pointer text-white uppercase tracking-wider text-sm sm:text-base font-medium flex items-center"
                          style={{ backgroundColor: slide.color }}
                        >
                          Explore
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4 sm:h-5 sm:w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </motion.button>
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Fixed bottom controls bar - enhanced for responsiveness */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col sm:flex-row justify-between items-center border-t border-white/10 bg-black/30 backdrop-blur-md">
        {/* Progress indicators */}
        <div className="flex-1 px-4 sm:px-6 md:px-8 lg:px-10 h-full w-full sm:w-auto py-3 sm:py-4">
          <div className="flex items-center space-x-3 sm:space-x-5 md:space-x-8 h-full">
            {/* Slide indicators with improved touch targets */}
            <div className="flex space-x-3 sm:space-x-5 h-full items-center">
              {heroSlides.map((_, index) => {
                const realIndex = index % heroSlides.length
                const isCurrent = realIndex === activeIndex % heroSlides.length
                
                return (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className="group relative h-full flex items-center cursor-pointer py-1"
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    <span 
                      className={`block w-6 sm:w-8 md:w-10 h-[3px] transition-all ${
                        isCurrent ? 'bg-white' : 'bg-white/30 group-hover:bg-white/50'
                      }`}
                    ></span>
                    
                    {/* Progress overlay with smoother animation */}
                    {isCurrent && (
                      <motion.span 
                        className="absolute left-0 top-0 h-full flex items-center pointer-events-none"
                        style={{
                          width: `${slideProgress}%`,
                          maxWidth: '100%'
                        }}
                        initial={{ width: '0%' }}
                        animate={{ width: `${slideProgress}%` }}
                        transition={{ duration: 0.1, ease: "linear" }}
                      >
                        <span 
                          className="block w-full h-[3px]"
                          style={{ backgroundColor: heroSlides[realIndex].color }}
                        ></span>
                      </motion.span>
                    )}
                  </button>
                )
              })}
            </div>
            
            {/* Pause/Play button with improved touch target */}
            <button 
              onClick={toggleAutoplay}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPaused ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                )}
              </motion.div>
            </button>
          </div>
        </div>
        
        {/* Navigation and counter with improved layout */}
        <div className="flex items-center h-12 sm:h-14 md:h-16 w-full sm:w-auto border-t sm:border-t-0 border-white/10">
          {/* Slide counter with larger text */}
          <div className="px-4 sm:px-6 md:px-8 border-r border-l sm:border-l-0 border-white/10 h-full flex items-center">
            <span className="text-white flex items-baseline">
              <span className="text-lg sm:text-xl md:text-2xl font-bold">{(activeIndex % heroSlides.length) + 1}</span>
              <span className="mx-1.5 text-sm sm:text-base opacity-50">/</span>
              <span className="text-sm sm:text-base opacity-50">{heroSlides.length}</span>
            </span>
          </div>
          
          {/* Navigation buttons with improved touch targets */}
          <div className="flex h-full flex-1 sm:flex-auto">
            <motion.button 
              ref={navigationPrevRef}
              className="flex-1 sm:flex-auto w-16 sm:w-20 h-full flex items-center justify-center border-r border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </motion.button>
            <motion.button 
              ref={navigationNextRef}
              className="flex-1 sm:flex-auto w-16 sm:w-20 h-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Model name indicator with animation */}
      <motion.div 
        className="absolute top-6 left-6 sm:top-8 sm:left-8 md:top-10 md:left-10 lg:left-16 z-30"
        variants={badgeVariants}
        initial="hidden"
        animate="visible"
      >
        <div 
          className="py-2 px-3 sm:px-4 text-xs sm:text-sm font-medium uppercase tracking-widest"
          style={{ 
            backgroundColor: heroSlides[activeIndex % heroSlides.length].color,
            color: 'white'
          }}
        >
          {heroSlides[activeIndex % heroSlides.length].title}
        </div>
      </motion.div>
    </div>
  )
}