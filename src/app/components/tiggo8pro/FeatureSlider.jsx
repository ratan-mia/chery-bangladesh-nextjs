'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Enhanced slide data with more comprehensive fields
const slides = [
  {
    id: 'slide1',
    type: 'video',
    src: '/videos/tiggo8pro-hero.mp4',
    poster: '/images/tiggo8pro/hero-slider/video-frame.png',
    logoSrc: '/images/tiggo8pro/hero-slider/tiggo8-logo.png',
    logoAlt: 'Tiggo 8 Pro Max Logo',
    title: 'ENJOY YOUR FIRST CLASS',
    subtitle: 'LED Matrix Headlights',
    description: 'Intelligent lighting system that automatically adapts to driving conditions for optimal visibility and safety.',
    ariaLabel: 'Tiggo 8 Pro featuring LED Matrix Headlights',
    ctaText: 'Explore Features',
    ctaLink: '/features',
    specs: [
      { label: 'Engine', value: '1.6T GDI' },
      { label: 'Power', value: '197 HP' }
    ]
  },
  {
    id: 'slide2',
    type: 'image',
    src: '/images/tiggo8pro/hero-slider/tiggo8pro-banner.jpg',
    logoSrc: '/images/tiggo8pro/hero-slider/tiggo8-logo.png',
    logoAlt: 'Tiggo 8 Pro Max Logo',
    title: 'BOLD PRESENCE',
    subtitle: 'Dynamic Exterior Design',
    description: 'Striking aesthetics with premium details that command attention on every journey.',
    ariaLabel: 'Tiggo 8 Pro showcasing its dynamic exterior design',
    ctaText: 'View Gallery',
    ctaLink: '/gallery',
    specs: [
      { label: 'Length', value: '4,722 mm' },
      { label: 'Width', value: '1,860 mm' }
    ]
  },
]

// Enhanced animation variants
const fadeInAnimations = {
  hidden: { opacity: 0, y: -10 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
  }),
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.5, ease: 'easeInOut' }
  }
}

const slideUpAnimations = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }
  }),
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.5, ease: 'easeInOut' }
  }
}

// Improved SlideContent component with enhanced layout and animations
const SlideContent = ({ slide, isActive }) => (
  <div className="absolute inset-0 flex flex-col justify-end md:items-start p-6 md:p-16 text-white">
    <div className="md:max-w-xl w-full flex flex-col items-center md:items-start">
      <AnimatePresence mode="wait">
        {isActive && (
          <>
            {/* Logo */}
            <motion.div
              key={`logo-${slide.id}`}
              variants={fadeInAnimations}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={0.2}
              className="mb-4 md:mb-8 md:mt-0 w-full flex justify-center md:justify-start"
            >
              <Image
                src={slide.logoSrc}
                alt={slide.logoAlt}
                width={280}
                height={80}
                className="object-contain md:w-60 lg:w-72"
                priority
              />
            </motion.div>

            {/* Decorative line */}
            <motion.div
              key={`line-${slide.id}`}
              variants={fadeInAnimations}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={0.3}
              className="hidden md:block w-24 h-1 bg-gradient-to-r from-primary-600 to-primary-400 mb-5"
            />

            {/* Title */}
            <motion.h2
              key={`title-${slide.id}`}
              variants={fadeInAnimations}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={0.4}
              className="text-2xl md:text-3xl lg:text-5xl uppercase tracking-wider font-light mb-2 text-center md:text-left"
            >
              {slide.title}
            </motion.h2>

            {/* Subtitle */}
            {slide.subtitle && (
              <motion.p
                key={`subtitle-${slide.id}`}
                variants={fadeInAnimations}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={0.5}
                className="text-lg md:text-2xl text-white/90 mb-3 text-center md:text-left font-light"
              >
                {slide.subtitle}
              </motion.p>
            )}

            {/* Description - new addition */}
            {slide.description && (
              <motion.p
                key={`desc-${slide.id}`}
                variants={fadeInAnimations}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={0.6}
                className="text-sm md:text-base text-white/80 mb-4 text-center md:text-left max-w-lg hidden md:block"
              >
                {slide.description}
              </motion.p>
            )}

            {/* Specs - new addition */}
            {slide.specs && (
              <motion.div
                key={`specs-${slide.id}`}
                variants={slideUpAnimations}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={0.65}
                className="flex gap-6 mt-1 mb-6 hidden md:flex"
              >
                {slide.specs.map((spec, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="text-white/60 text-xs uppercase tracking-wider">{spec.label}</span>
                    <span className="text-white font-medium">{spec.value}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {/* CTA Button */}
            <motion.div
              key={`cta-${slide.id}`}
              variants={slideUpAnimations}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={0.7}
              className="mt-4 md:mt-6"
            >
              <Link 
                href={slide.ctaLink}
                className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 transition-colors duration-300 text-sm md:text-base tracking-wide group"
              >
                <span>{slide.ctaText}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  </div>
)

const FeatureSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false)
  const [progressWidth, setProgressWidth] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const swiperRef = useRef(null)
  const videoRefs = useRef([])
  const progressIntervalRef = useRef(null)

  // Handle slide change with enhanced video control
  const handleSlideChange = useCallback((swiper) => {
    const newIndex = swiper.realIndex
    setActiveIndex(newIndex)
    resetProgress()

    // Pause all videos first
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause()
        video.currentTime = 0
      }
    })

    // Play video on the active slide if autoplay is not paused
    if (!isAutoplayPaused) {
      const currentSlide = slides[newIndex]
      if (currentSlide?.type === 'video') {
        const videoElement = videoRefs.current[newIndex]
        if (videoElement) {
          videoElement.currentTime = 0
          videoElement.play().catch((err) => {
            console.warn('Error playing video:', err)
          })
        }
      }
    }
  }, [isAutoplayPaused])

  // Reset and animate progress bar
  const resetProgress = useCallback(() => {
    setProgressWidth(0)
    clearInterval(progressIntervalRef.current)
    
    if (!isAutoplayPaused) {
      progressIntervalRef.current = setInterval(() => {
        setProgressWidth(prev => {
          if (prev >= 100) {
            clearInterval(progressIntervalRef.current)
            return 100
          }
          return prev + 0.5
        })
      }, 25) // Update every 25ms for smooth animation
    }
  }, [isAutoplayPaused])

  // Toggle autoplay pause/resume with improved video handling
  const toggleAutoplay = useCallback(() => {
    if (!swiperRef.current) return
    
    const swiper = swiperRef.current.swiper
    
    if (isAutoplayPaused) {
      swiper.autoplay.start()
      resetProgress()
      
      // Resume video if the current slide is a video
      const currentSlide = slides[activeIndex]
      if (currentSlide?.type === 'video') {
        const videoElement = videoRefs.current[activeIndex]
        if (videoElement) {
          videoElement.play().catch(() => {})
        }
      }
    } else {
      swiper.autoplay.stop()
      clearInterval(progressIntervalRef.current)
      
      // Pause video if the current slide is a video
      const videoElement = videoRefs.current[activeIndex]
      if (videoElement) {
        videoElement.pause()
      }
    }
    
    setIsAutoplayPaused(!isAutoplayPaused)
  }, [isAutoplayPaused, activeIndex, resetProgress])

  // Initialize the slider
  useEffect(() => {
    // Set loading state until first video/image is ready
    const timeout = setTimeout(() => {
      setIsLoading(false)
      
      if (slides[0]?.type === 'video') {
        const videoElement = videoRefs.current[0]
        if (videoElement) {
          videoElement.play().catch(() => {
            // Silent catch - autoplay might be blocked by browser policy
          })
        }
      }
      
      resetProgress()
    }, 800)

    // Clean up function
    return () => {
      clearTimeout(timeout)
      clearInterval(progressIntervalRef.current)
      videoRefs.current.forEach((video) => {
        if (video) video.pause()
      })
    }
  }, [resetProgress])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!swiperRef.current) return
      
      const swiper = swiperRef.current.swiper
      if (e.key === 'ArrowLeft') {
        swiper.slidePrev()
      } else if (e.key === 'ArrowRight') {
        swiper.slideNext()
      } else if (e.key === ' ') {
        // Space bar toggles autoplay
        toggleAutoplay()
        e.preventDefault()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleAutoplay])

  // Go to specific slide
  const goToSlide = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index + 1) // +1 because of loop mode
    }
  }

  return (
    <section 
      className="w-full h-screen relative overflow-hidden" 
      aria-label="Tiggo 8 Pro Feature Showcase"
    >
      {/* Loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-50 bg-black flex items-center justify-center"
          >
            <motion.div 
              animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-16 h-16"
            >
              <Image 
                src="/images/tiggo8pro/hero-slider/tiggo8-logo.png"
                alt="Loading"
                width={160}
                height={160}
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar at the top */}
      <div className="absolute top-0 left-0 right-0 z-20 h-1 bg-white/10">
        <motion.div 
          className="h-full bg-primary-600"
          style={{ width: `${progressWidth}%` }}
          transition={{ ease: 'linear' }}
        />
      </div>

      {/* Model badge in top left */}
      <div className="absolute top-6 left-6 z-20 bg-black/40 backdrop-blur-sm px-4 py-2">
        <span className="text-white text-sm font-medium tracking-wider">TIGGO 8 PRO</span>
      </div>

      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={800}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          el: '.custom-pagination',
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className}" 
            aria-label="Go to slide ${index + 1}: ${slides[index]?.title || ''}"></span>`,
        }}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        onSlideChange={handleSlideChange}
        loop={true}
        a11y={{
          enabled: true,
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
        }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide 
            key={slide.id} 
            className="relative" 
            aria-label={slide.ariaLabel}
          >
            {/* Video or Image Background */}
            {slide.type === 'video' ? (
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                className="absolute inset-0 w-full h-full object-cover"
                playsInline
                muted
                loop
                poster={slide.poster}
                preload="auto"
                aria-hidden="true"
              >
                <source src={slide.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={slide.src}
                  alt=""
                  fill
                  className="object-cover"
                  priority={index === 0}
                  quality={90}
                  sizes="100vw"
                  aria-hidden="true"
                />
              </div>
            )}

            {/* Improved dark gradient overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30"></div>

            {/* Slide Content */}
            <SlideContent slide={slide} isActive={index === activeIndex} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Improved Controls Container */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-4">
        {/* Custom Pagination with labels */}
        <div className="flex items-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}: ${slide.title}`}
              aria-current={index === activeIndex ? 'true' : 'false'}
            />
          ))}
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={toggleAutoplay}
          className="bg-black/30 backdrop-blur-sm text-white p-3 w-10 h-10 flex items-center justify-center transition-colors hover:bg-black/50 border border-white/20"
          aria-label={isAutoplayPaused ? "Resume slideshow" : "Pause slideshow"}
        >
          {isAutoplayPaused ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          )}
        </button>
      </div>

      {/* Improved Navigation Arrows */}
      <button 
        className="swiper-button-prev absolute left-4 top-1/2 z-20 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white w-12 h-12 flex items-center justify-center transition-all duration-300 border border-white/20 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transform group-hover:-translate-x-1 transition-transform duration-300">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      
      <button 
        className="swiper-button-next absolute right-4 top-1/2 z-20 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white w-12 h-12 flex items-center justify-center transition-all duration-300 border border-white/20 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transform group-hover:translate-x-1 transition-transform duration-300">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      {/* Current slide / total slides indicator */}
      <div className="absolute bottom-6 left-6 z-20 bg-black/30 backdrop-blur-sm px-4 py-2 flex items-center">
        <span className="text-primary-500 font-medium mr-1">{activeIndex + 1}</span>
        <span className="text-white/70 text-sm">/</span>
        <span className="text-white/70 text-sm ml-1">{slides.length}</span>
      </div>

      {/* Custom Swiper Styling */}
      <style jsx global>{`
        /* Hide default swiper navigation arrows since we have custom ones */
        .swiper-button-next::after,
        .swiper-button-prev::after {
          display: none;
        }

        .swiper-button-disabled {
          opacity: 0.35 !important;
          pointer-events: none;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .swiper-button-prev,
          .swiper-button-next {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </section>
  )
}

export default FeatureSlider