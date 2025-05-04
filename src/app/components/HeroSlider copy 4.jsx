'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
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
  const [isLoaded, setIsLoaded] = useState(false)
  const swiperRef = useRef(null)
  const progressIntervalRef = useRef(null)
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)

  // Hero slides data
  const heroSlides = [
    {
      id: 'tiggo8pro',
      title: 'TIGGO 8 PRO',
      subtitle: 'Enjoy Your First Class',
      description: 'The epitome of luxury with 195 BHP and premium 7-seat configuration',
      image: '/images/tiggo8pro/hero-slider/tiggo-8pro-banner.jpg',
      color: '#8c735d', // primary-700
      link: '/models/tiggo8pro'
    },
    {
      id: 'tiggocross',
      title: 'TIGGO CROSS',
      subtitle: 'For Every Kind Of You',
      description: 'Modern, safe, comfortable and stylish crossover with biomimetic design',
      image: '/images/tiggocross/slider.jpg',
      color: '#8c735d', // primary-700
      link: '/models/tiggocross'
    },
    {
      id: 'tiggocross2',
      title: 'TIGGO CROSS',
      subtitle: 'Wonderful Urban SUV',
      description: 'Sleek and aerodynamic with tiger face styling and advanced safety features',
      image: '/images/tiggocross/slider2.jpg',
      color: '#8c735d', // primary-700
      link: '/models/tiggocross'
    },
    {
      id: 'tiggo8pro2',
      title: 'TIGGO 8 PRO',
      subtitle: 'First Class Cabin',
      description: 'Luxurious leather interior with dual 12.3" screens and panoramic sunroof',
      image: '/images/tiggo8pro/hero-slider/tiggo-8-pro.jpg',
      color: '#8c735d', // primary-700
      link: '/models/tiggo8pro'
    }
  ]

  // Progress animation duration
  const autoplayDelay = 6000

  // Handle slide change
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex)
    resetProgress()
  }

  // Custom pagination UI
  const goToSlide = (index) => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideTo(index)
    }
  }

  // Progress bar animation
  const resetProgress = () => {
    setSlideProgress(0)
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
    
    if (!isPaused) {
      progressIntervalRef.current = setInterval(() => {
        setSlideProgress(prev => {
          if (prev >= 100) {
            return 100
          }
          return prev + (100 / (autoplayDelay / 100))
        })
      }, 100)
    }
  }

  // Handle autoplay pause/resume
  const toggleAutoplay = () => {
    if (swiperRef.current?.swiper) {
      if (isPaused) {
        swiperRef.current.swiper.autoplay.start()
        resetProgress()
      } else {
        swiperRef.current.swiper.autoplay.stop()
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current)
        }
      }
      setIsPaused(!isPaused)
    }
  }

  // Initialize refs
  useEffect(() => {
    const initializeSwiper = async () => {
      if (swiperRef.current && navigationPrevRef.current && navigationNextRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100))
        if (swiperRef.current.swiper) {
          swiperRef.current.swiper.params.navigation.prevEl = navigationPrevRef.current
          swiperRef.current.swiper.params.navigation.nextEl = navigationNextRef.current
          swiperRef.current.swiper.navigation.init()
          swiperRef.current.swiper.navigation.update()
        }
      }
      setIsLoaded(true)
    }

    initializeSwiper()
  }, [])

  // Cleanup interval on unmount
  useEffect(() => {
    resetProgress()
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [isPaused])

  // Animation variants
  const slideVariants = {
    enter: {
      opacity: 0,
      scale: 1.1,
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5
      }
    }
  }

  const contentVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.5
      }
    }
  }

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  if (!isLoaded) {
    return (
      <div className="relative w-full h-[calc(100vh-80px)] min-h-[500px] flex items-center justify-center bg-gray-900">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[calc(100vh-80px)] min-h-[500px] overflow-hidden">
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
        loop={true}
        speed={800}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        onSlideChange={handleSlideChange}
        className="w-full h-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Image with animation */}
            <motion.div 
              className="absolute inset-0 w-full h-full"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: "easeOut" }}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
                quality={90}
              />
            </motion.div>

            {/* Gradients */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" /> */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
            
            {/* Content */}
            <AnimatePresence mode="wait">
              {activeIndex === index && (
                <motion.div 
                  className="absolute inset-0 z-20 flex items-center"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                      <motion.div 
                        className="w-12 h-1 mb-6"
                        style={{ backgroundColor: slide.color }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8 }}
                      />
                      
                      <motion.h1 
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
                        variants={itemVariants}
                      >
                        {slide.title}
                      </motion.h1>
                      
                      <motion.p 
                        className="text-xl sm:text-2xl md:text-3xl text-white font-light mb-4"
                        variants={itemVariants}
                      >
                        {slide.subtitle}
                      </motion.p>
                      
                      <motion.p 
                        className="text-base sm:text-lg text-gray-200 mb-8 max-w-2xl"
                        variants={itemVariants}
                      >
                        {slide.description}
                      </motion.p>
                      
                      <motion.div variants={itemVariants}>
                        <Link href={slide.link}>
                          <motion.button 
                            className="group inline-flex items-center px-8 py-3 bg-primary-700 hover:bg-primary-900 text-white font-medium transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Explore
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </motion.button>
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-black/30 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4">
            {/* Progress indicators */}
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className="group relative"
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    <div 
                      className={`w-12 h-1 rounded-full transition-all duration-300 ${
                        index === activeIndex ? 'bg-white/60' : 'bg-white/20 group-hover:bg-white/30'
                      }`}
                    >
                      {index === activeIndex && (
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-full bg-primary-700"
                          initial={{ width: '0%' }}
                          animate={{ width: `${slideProgress}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              
              <button 
                onClick={toggleAutoplay}
                className="p-2 text-white/70 hover:text-white transition-colors"
                aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
              >
                {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
              </button>
            </div>
            
            {/* Navigation buttons */}
            <div className="flex items-center gap-2">
              <motion.button 
                ref={navigationPrevRef}
                className="p-3 text-white/70 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              
              <div className="text-white">
                <span className="font-bold">{String(activeIndex + 1).padStart(2, '0')}</span>
                <span className="mx-2 text-white/50">/</span>
                <span className="text-white/50">{String(heroSlides.length).padStart(2, '0')}</span>
              </div>
              
              <motion.button 
                ref={navigationNextRef}
                className="p-3 text-white/70 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Model name indicator */}
      <motion.div 
        className="absolute top-6 left-6 z-30"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-primary-900/90 backdrop-blur-sm px-4 py-2">
          <span className="text-white text-sm font-medium uppercase tracking-wider">
            {heroSlides[activeIndex].title}
          </span>
        </div>
      </motion.div>
    </div>
  )
}