'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const swiperRef = useRef(null)
  const progressIntervalRef = useRef(null)

  // Hero slides data using actual content from the brochures
  const heroSlides = [
    {
      id: 'tiggocross',
      title: 'TIGGO CROSS',
      subtitle: 'FOR EVERY KIND OF YOU',
      description: 'Modern, safe, comfortable and stylish crossover with biomimetic tiger face design',
      features: ['Biomimetic Tiger Face', 'Starry Diamond Grille', 'Crystal-Edged Marker Lamps'],
      image: '/images/tiggocross/hero-slider/tiggo-cross-banner.jpg',
      color: '#8c735d', // primary-700
      textColor: '#FFFFFF',
      link: '/models/tiggocross'
    },
    {
      id: 'tiggo8pro',
      title: 'TIGGO 8 PRO',
      subtitle: 'ENJOY YOUR FIRST CLASS',
      description: 'The epitome of luxury with 195 BHP and premium 7-seat configuration',
      features: ['1.6T Turbocharged Engine', '195 BHP Power', 'Luxurious 7-Seat Interior'],
      image: '/images/tiggo8pro/hero-slider/tiggo-8pro-banner.jpg',
      color: '#8c735d',
      textColor: '#FFFFFF',
      link: '/models/tiggo8pro'
    },
    {
      id: 'tiggocross-design',
      title: 'TIGGO CROSS',
      subtitle: 'WONDERFUL URBAN SUV',
      description: 'Sleek and aerodynamic with advanced safety features and modern technology',
      features: ['Sleek & Aerodynamic Design', '10.25-inch LCD Screen', '7 Airbags Protection'],
      image: '/images/tiggocross/slider2.jpg',
      color: '#8c735d',
      textColor: '#FFFFFF',
      link: '/models/tiggocross'
    },
    {
      id: 'tiggo8pro-cabin',
      title: 'TIGGO 8 PRO',
      subtitle: 'FIRST CLASS CABIN',
      description: 'Luxurious leather interior with dual 12.3" screens and panoramic sunroof',
      features: ['Dual 12.3" Displays', 'Premium Leather Seats', 'Panoramic Sunroof'],
      image: '/images/tiggo8pro/hero-slider/tiggo-8-pro-interior.jpg',
      color: '#8c735d',
      textColor: '#FFFFFF',
      link: '/models/tiggo8pro'
    }
  ]

  // Animation variants
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: 0.1 * custom
      }
    }),
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  }

  const featureItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.5 + (0.1 * custom)
      }
    })
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.8
      }
    },
    hover: {
      backgroundColor: "#524336", // primary-900
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  }

  // The delay between slides in ms
  const autoplayDelay = 8000

  // Handle slide change
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex)
    resetProgress()
  }

  // Go to specific slide
  const goToSlide = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index)
    }
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

  // Reset and start progress animation
  const resetProgress = () => {
    setProgress(0)
    clearInterval(progressIntervalRef.current)
    
    if (!isPaused) {
      progressIntervalRef.current = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / (autoplayDelay / 100))
          return newProgress >= 100 ? 100 : newProgress
        })
      }, 100)
    }
  }

  // Initialize progress on mount, clean up on unmount
  useEffect(() => {
    resetProgress()
    
    return () => {
      clearInterval(progressIntervalRef.current)
    }
  }, [isPaused])

  return (
    <div className="relative w-full h-screen min-h-[600px] bg-gray-900">
      {/* Main Slider */}
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, EffectFade]}
        effect="fade"
        slidesPerView={1}
        loop={true}
        speed={1000}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
        onSlideChange={handleSlideChange}
        className="w-full h-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Background image with parallax effect */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={slide.image}
                alt={`${slide.title} - ${slide.subtitle}`}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center transform scale-[1.02] opacity-90"
              />
              
              {/* Gradient overlay - more sophisticated with multiple layers */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10"></div>
            </div>
            
            {/* Content container */}
            <div className="absolute inset-0 flex items-center z-20 px-8 sm:px-16 md:px-24 lg:px-32">
              <div className="container mx-auto">
                <AnimatePresence mode="wait">
                  {index === activeIndex && (
                    <motion.div 
                      key={`content-${slide.id}`}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="max-w-xl"
                    >
                      {/* Brand logo & tagline with subtle reveal animation */}
                      <motion.div
                        variants={fadeInUpVariants}
                        custom={0}
                        className="mb-4"
                      >
                        <div className="mb-2">
                          <Image 
                            src="/images/chery-logo-white.png" 
                            alt="Chery" 
                            width={100} 
                            height={32} 
                            className="opacity-90"
                          />
                        </div>
                      </motion.div>
                      
                      {/* Model name with accent line */}
                      <motion.div 
                        variants={fadeInUpVariants}
                        custom={1}
                        className="mb-2"
                      >
                        <div 
                          className="w-16 h-1 mb-4"
                          style={{ backgroundColor: slide.color }}
                        ></div>
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-wide leading-tight" style={{ color: slide.textColor }}>
                          {slide.title}
                        </h2>
                      </motion.div>
                      
                      {/* Subtitle with enhanced typography */}
                      <motion.p 
                        variants={fadeInUpVariants}
                        custom={2}
                        className="text-xl sm:text-2xl md:text-3xl font-light mb-4" 
                        style={{ color: slide.textColor }}
                      >
                        {slide.subtitle}
                      </motion.p>
                      
                      {/* Description with improved readability */}
                      <motion.p 
                        variants={fadeInUpVariants}
                        custom={3}
                        className="text-base md:text-lg mb-8 max-w-lg opacity-90" 
                        style={{ color: slide.textColor }}
                      >
                        {slide.description}
                      </motion.p>
                      
                      {/* Feature highlights */}
                      <motion.div 
                        variants={fadeInUpVariants}
                        custom={4}
                        className="mb-8"
                      >
                        <div className="space-y-2">
                          {slide.features.map((feature, i) => (
                            <motion.div 
                              key={i} 
                              variants={featureItemVariants} 
                              custom={i}
                              className="flex items-center"
                            >
                              <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: slide.color }}></div>
                              <span className="text-sm md:text-base opacity-90" style={{ color: slide.textColor }}>
                                {feature}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                      
                      {/* CTA button with animation */}
                      <motion.div
                        variants={buttonVariants}
                        className="mt-6"
                      >
                        <Link href={slide.link}>
                          <motion.button 
                            whileHover="hover"
                            className="px-8 py-3 text-white uppercase tracking-wider text-sm font-medium flex items-center rounded-sm"
                            style={{ backgroundColor: slide.color }}
                          >
                            Explore {slide.title}
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-4 w-4 ml-2 transition-transform duration-300" 
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Premium bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between py-4">
            {/* Slide indicators with progress */}
            <div className="flex items-center space-x-6 mb-4 sm:mb-0">
              {heroSlides.map((_, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className="group relative h-12 flex items-center focus:outline-none"
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    <div className="flex flex-col items-start">
                      <span 
                        className={`text-xs uppercase tracking-wider mb-2 transition-colors ${
                          isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'
                        }`}
                      >
                        {heroSlides[index].title}
                      </span>
                      <span 
                        className={`block w-12 h-[2px] transition-all ${
                          isActive ? 'bg-white/80' : 'bg-white/20 group-hover:bg-white/40'
                        }`}
                      ></span>
                      
                      {/* Progress overlay */}
                      {isActive && (
                        <motion.span 
                          className="absolute bottom-0 left-0 h-[2px] bg-primary-700"
                          style={{
                            width: `${progress}%`,
                            maxWidth: '100%',
                            backgroundColor: heroSlides[index].color
                          }}
                          initial={{ width: '0%' }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.1, ease: "linear" }}
                        ></motion.span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* Controls (slider count and navigation) */}
            <div className="flex items-center">
              {/* Slide counter */}
              <div className="px-4 flex items-baseline border-r border-white/10 h-10">
                <span className="text-white flex items-baseline space-x-1">
                  <span className="text-xl font-medium">{activeIndex + 1}</span>
                  <span className="text-sm opacity-50">/</span>
                  <span className="text-sm opacity-50">{heroSlides.length}</span>
                </span>
              </div>
              
              {/* Playback control */}
              <button 
                onClick={toggleAutoplay}
                className="w-10 h-10 flex items-center justify-center px-3 text-white/70 hover:text-white transition-colors"
                aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
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
                </motion.div>
              </button>
              
              {/* Navigation buttons */}
              <div className="flex items-center">
                <button 
                  onClick={() => {
                    if (swiperRef.current) {
                      swiperRef.current.swiper.slidePrev();
                    }
                  }}
                  className="w-10 h-10 flex items-center justify-center px-3 text-white/70 hover:text-white transition-colors"
                  aria-label="Previous slide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button 
                  onClick={() => {
                    if (swiperRef.current) {
                      swiperRef.current.swiper.slideNext();
                    }
                  }}
                  className="w-10 h-10 flex items-center justify-center px-3 text-white/70 hover:text-white transition-colors"
                  aria-label="Next slide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating model badge */}
      <motion.div 
        className="absolute top-6 left-6 sm:top-8 sm:left-8 z-30 bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm px-4 py-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-8" style={{ backgroundColor: heroSlides[activeIndex].color }}></div>
          <div>
            <p className="text-xs uppercase tracking-wider text-white/70">Chery</p>
            <p className="text-sm font-medium text-white">{heroSlides[activeIndex].title}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}