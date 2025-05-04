'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react'
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const swiperRef = useRef(null)
  const progressIntervalRef = useRef(null)
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)

  // Hero slides data - elegant and minimal
  const heroSlides = [
    {
      id: 'tiggo8pro',
      model: 'TIGGO 8 PRO',
      year: '2025',
      category: 'FLAGSHIP LUXURY SUV',
      headline: 'Redefining Premium Excellence',
      subheadline: 'Where Sophistication Meets Performance',
      price: 'Starting from BDT 89,90,000',
      image: '/images/tiggo8pro/hero-slider/tiggo-8pro-banner.jpg',
      link: '/models/tiggo8pro',
      highlights: [
        '7-Seat Premium Configuration',
        '195 BHP Turbocharged Engine',
        'First-Class Interior Experience'
      ]
    },
    {
      id: 'tiggocross',
      model: 'TIGGO CROSS',
      year: '2025',
      category: 'URBAN CROSSOVER',
      headline: 'Designed for Modern Living',
      subheadline: 'Where Style Meets Versatility',
      price: 'Starting from BDT 59,90,000',
      image: '/images/tiggocross/slider.jpg',
      link: '/models/tiggocross',
      highlights: [
        'Biomimetic Tiger Face Design',
        '360° Panoramic Camera View',
        'Smart Connectivity Suite'
      ]
    },
    {
      id: 'tiggocross2',
      model: 'TIGGO CROSS',
      year: '2025',
      category: 'SPORT EDITION',
      headline: 'Unleash Your Urban Spirit',
      subheadline: 'Performance Redefined for City Life',
      price: 'Starting from BDT 64,90,000',
      image: '/images/tiggocross/slider2.jpg',
      link: '/models/tiggocross',
      highlights: [
        'Sport-Tuned Suspension',
        'LED Matrix Headlights',
        'Premium Safety Suite'
      ]
    },
    {
      id: 'tiggo8pro2',
      model: 'TIGGO 8 PRO',
      year: '2025',
      category: 'EXECUTIVE COLLECTION',
      headline: 'The Pinnacle of Luxury',
      subheadline: 'Experience Automotive Perfection',
      price: 'Starting from BDT 99,90,000',
      image: '/images/tiggo8pro/hero-slider/tiggo-8-pro.jpg',
      link: '/models/tiggo8pro',
      highlights: [
        'Dual 12.3" HD Displays',
        'Panoramic Crystal Sunroof',
        'Executive Rear Comfort'
      ]
    }
  ]

  // Progress animation duration (should match swiper autoplay delay)
  const autoplayDelay = 8000

  // Handle mouse move for subtle parallax effect
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    setMousePosition({
      x: (clientX - innerWidth / 2) / innerWidth,
      y: (clientY - innerHeight / 2) / innerHeight
    })
  }

  // Handle slide change
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex)
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
    setIsLoaded(true)
  }, [])
  
  // Cleanup interval on unmount
  useEffect(() => {
    resetProgress()
    
    return () => {
      clearInterval(progressIntervalRef.current)
    }
  }, [isPaused])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    }
  }

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1,
      transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] }
    }
  }
  
  return (
    <div 
      className="relative w-full h-screen min-h-[600px] max-h-[1080px] overflow-hidden bg-primary-900"
      onMouseMove={handleMouseMove}
    >
      {/* Elegant grain overlay */}
      <div className="absolute inset-0 opacity-[0.015] z-[5] pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E")',
        }}
      />

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
        speed={1500}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        onSlideChange={handleSlideChange}
        className="w-full h-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Sophisticated gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 via-primary-900/50 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-primary-900/30 z-10"></div>
            
            {/* Background image with subtle parallax */}
            <motion.div 
              className="absolute inset-0 w-full h-full"
              initial={{ scale: 1.1 }}
              animate={{ 
                scale: 1,
                x: mousePosition.x * 20,
                y: mousePosition.y * 20
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <Image
                src={slide.image}
                alt={slide.model}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
                quality={100}
              />
            </motion.div>
            
            {/* Elegant content layout */}
            <AnimatePresence mode="wait">
              {activeIndex === index && (
                <motion.div 
                  className="relative h-full z-20"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <div className="h-full flex items-center">
                    <div className="container mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-12 gap-8">
                      {/* Left content - Main information */}
                      <div className="col-span-12 lg:col-span-7 xl:col-span-6">
                        {/* Year and Category */}
                        <motion.div 
                          className="flex items-center space-x-4 mb-8"
                          variants={itemVariants}
                        >
                          <span className="text-primary-light text-sm font-medium tracking-[0.2em]">
                            {slide.year}
                          </span>
                          <span className="w-12 h-px bg-primary-light/30"></span>
                          <span className="text-primary-light/70 text-sm font-light tracking-wider">
                            {slide.category}
                          </span>
                        </motion.div>
                        
                        {/* Model name */}
                        <motion.div 
                          className="mb-6"
                          variants={itemVariants}
                        >
                          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white leading-none tracking-tight">
                            {slide.model}
                          </h1>
                          <motion.div 
                            className="h-1 bg-primary-light mt-4 origin-left"
                            variants={lineVariants}
                            style={{ width: '120px' }}
                          />
                        </motion.div>
                        
                        {/* Headline */}
                        <motion.h2 
                          className="text-3xl sm:text-4xl font-light text-primary-light mb-4 tracking-wide"
                          variants={itemVariants}
                        >
                          {slide.headline}
                        </motion.h2>
                        
                        {/* Subheadline */}
                        <motion.p 
                          className="text-xl text-gray-300 mb-8 font-light max-w-lg"
                          variants={itemVariants}
                        >
                          {slide.subheadline}
                        </motion.p>
                        
                        {/* Price */}
                        <motion.div 
                          className="mb-12"
                          variants={itemVariants}
                        >
                          <p className="text-2xl font-light text-white/90">
                            {slide.price}
                          </p>
                        </motion.div>
                        
                        {/* CTA Buttons */}
                        <motion.div 
                          className="flex flex-col sm:flex-row gap-4"
                          variants={itemVariants}
                        >
                          <Link href={slide.link}>
                            <motion.button 
                              className="group relative px-10 py-4 bg-white text-primary-900 font-medium overflow-hidden"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <span className="relative z-10 flex items-center justify-center">
                                Explore Model
                                <ArrowRight className="w-4 h-4 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" />
                              </span>
                              <motion.div
                                className="absolute inset-0 bg-primary-light"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                              />
                            </motion.button>
                          </Link>
                          <Link href="/contact">
                            <motion.button 
                              className="px-10 py-4 border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Request Test Drive
                            </motion.button>
                          </Link>
                        </motion.div>
                      </div>
                      
                      {/* Right content - Highlights */}
                      <div className="hidden lg:block lg:col-span-5 xl:col-span-6">
                        <motion.div 
                          className="h-full flex items-center justify-end"
                          variants={itemVariants}
                        >
                          <div className="max-w-md">
                            <div className="flex items-center space-x-2 mb-8">
                              <Sparkles className="w-5 h-5 text-primary-light" />
                              <span className="text-sm font-medium text-primary-light tracking-wider uppercase">
                                Key Features
                              </span>
                            </div>
                            <div className="space-y-6">
                              {slide.highlights.map((highlight, idx) => (
                                <motion.div
                                  key={idx}
                                  className="flex items-center space-x-4"
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.5 + idx * 0.1 }}
                                >
                                  <span className="w-2 h-2 rounded-full bg-primary-light"></span>
                                  <span className="text-white/80 font-light tracking-wide">
                                    {highlight}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Elegant bottom navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="border-t border-white/10 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              {/* Navigation dots */}
              <div className="flex items-center space-x-12 mb-4 sm:mb-0">
                {heroSlides.map((slide, index) => {
                  const isCurrent = index === activeIndex
                  
                  return (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className="group relative"
                      aria-label={`Go to ${slide.model}`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className={`text-xs font-medium transition-colors ${
                          isCurrent ? 'text-white' : 'text-white/40 group-hover:text-white/60'
                        }`}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="relative w-16 h-0.5">
                          <span className={`block w-full h-full transition-colors ${
                            isCurrent ? 'bg-white/30' : 'bg-white/10'
                          }`} />
                          {isCurrent && (
                            <motion.span 
                              className="absolute left-0 top-0 h-full bg-primary-light"
                              initial={{ width: "0%" }}
                              animate={{ width: `${slideProgress}%` }}
                            />
                          )}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
              
              {/* Controls */}
              <div className="flex items-center space-x-4">
                {/* Pause/Play */}
                <motion.button 
                  onClick={toggleAutoplay}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                >
                  {isPaused ? (
                    <Play className="w-4 h-4" />
                  ) : (
                    <Pause className="w-4 h-4" />
                  )}
                </motion.button>
                
                {/* Navigation arrows */}
                <div className="flex items-center space-x-2">
                  <motion.button 
                    ref={navigationPrevRef}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  <motion.button 
                    ref={navigationNextRef}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Elegant side indicator */}
      <motion.div 
        className="absolute right-8 top-1/2 -translate-y-1/2 z-30 hidden xl:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="flex flex-col items-end space-y-2">
          <span className="text-xs font-light text-white/40 tracking-wider uppercase writing-mode-vertical">
            Scroll to explore
          </span>
          <motion.div 
            className="w-px h-24 bg-white/10 relative overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: 96 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <motion.div
              className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-primary-light to-transparent"
              animate={{
                y: [0, 88, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}