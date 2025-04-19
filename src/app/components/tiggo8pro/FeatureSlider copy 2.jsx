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
      { label: 'Power', value: '197 HP' },
      { label: 'Torque', value: '290 Nm' }
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
      { label: 'Width', value: '1,860 mm' },
      { label: 'Height', value: '1,746 mm' }
    ]
  },
]

// Enhanced animation variants with smoother timings
const fadeInAnimations = {
  hidden: { opacity: 0, y: -15 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }
  }),
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
}

const slideUpAnimations = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }
  }),
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
}

const scaleAnimations = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (delay) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay, ease: [0.34, 1.56, 0.64, 1] }
  }),
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.6, ease: 'easeInOut' }
  }
}

// Improved SlideContent component with enhanced layout and richer visual hierarchy
const SlideContent = ({ slide, isActive }) => (
  <div className="absolute inset-0 flex flex-col justify-end md:justify-center md:items-start p-6 md:p-16 text-white z-10">
    <div className="md:max-w-2xl w-full flex flex-col items-center md:items-start md:ml-8 lg:ml-16">
      <AnimatePresence mode="wait">
        {isActive && (
          <>
            {/* Badge - new element */}
            <motion.div
              key={`badge-${slide.id}`}
              variants={scaleAnimations}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={0.1}
              className="bg-primary-600/90 backdrop-blur-sm py-1.5 px-4 mb-6 hidden md:block"
            >
              <span className="text-xs uppercase tracking-widest font-medium">Premium SUV</span>
            </motion.div>

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
                className="object-contain md:w-64 lg:w-80"
                priority
              />
            </motion.div>

            {/* Decorative dual lines with enhanced styling */}
            <motion.div
              key={`line-${slide.id}`}
              variants={fadeInAnimations}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={0.3}
              className="flex flex-col gap-1.5 mb-6 hidden md:block"
            >
              <div className="w-32 h-1 bg-gradient-to-r from-primary-600 to-primary-400"></div>
              <div className="w-16 h-1 bg-white/30"></div>
            </motion.div>

            {/* Title with enhanced typography */}
            <motion.h2
              key={`title-${slide.id}`}
              variants={fadeInAnimations}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={0.4}
              className="text-2xl md:text-4xl lg:text-6xl uppercase tracking-wider font-light mb-3 text-center md:text-left"
            >
              {slide.title}
            </motion.h2>

            {/* Subtitle with better contrast */}
            {slide.subtitle && (
              <motion.p
                key={`subtitle-${slide.id}`}
                variants={fadeInAnimations}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={0.5}
                className="text-lg md:text-2xl text-white font-medium mb-3 text-center md:text-left"
              >
                {slide.subtitle}
              </motion.p>
            )}

            {/* Description - enhanced readability */}
            {slide.description && (
              <motion.p
                key={`desc-${slide.id}`}
                variants={fadeInAnimations}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={0.6}
                className="text-sm md:text-base text-white/90 mb-5 text-center md:text-left max-w-lg hidden md:block leading-relaxed"
              >
                {slide.description}
              </motion.p>
            )}

            {/* Specs - improved visual presentation */}
            {slide.specs && (
              <motion.div
                key={`specs-${slide.id}`}
                variants={slideUpAnimations}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={0.65}
                className="grid grid-cols-3 gap-8 mt-1 mb-8 hidden md:grid bg-black/30 backdrop-blur-sm p-5 border-l-2 border-primary-500"
              >
                {slide.specs.map((spec, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="text-white/60 text-xs uppercase tracking-wider font-semibold">{spec.label}</span>
                    <span className="text-white font-medium text-lg">{spec.value}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {/* CTA Button with improved interaction */}
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
                className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-3.5 px-8 transition-all duration-300 text-sm md:text-base tracking-wide group relative overflow-hidden"
              >
                <span className="relative z-10">{slide.ctaText}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300 relative z-10"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
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

  // Reset and animate progress bar with smoother animation
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
          return prev + 0.4
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

  // Initialize the slider with improved loading transition
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
    }, 1000)

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
      {/* Enhanced loading overlay with branded animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-50 bg-gradient-to-br from-black to-gray-900 flex flex-col items-center justify-center"
          >
            <motion.div 
              animate={{ 
                scale: [0.8, 1, 0.8], 
                opacity: [0.5, 1, 0.5],
                rotateY: [0, 10, 0, -10, 0]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="w-24 h-24 mb-6"
            >
              <Image 
                src="/images/tiggo8pro/hero-slider/tiggo8-logo.png"
                alt="Loading"
                width={240}
                height={240}
                className="object-contain"
              />
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "180px" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-1 bg-gradient-to-r from-primary-600 to-primary-400"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar at the top with enhanced styling */}
      <div className="absolute top-0 left-0 right-0 z-20 h-1.5 bg-white/5">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary-600 to-primary-400"
          style={{ width: `${progressWidth}%` }}
          transition={{ ease: 'linear' }}
        />
      </div>

      {/* Enhanced model badge in top left */}
      <div className="absolute top-6 left-6 z-20 bg-black/40 backdrop-blur-md px-5 py-2.5 border-l-2 border-primary-500 flex items-center">
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-4 h-4 mr-2 text-primary-500"
        >
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-white text-sm font-medium tracking-widest">TIGGO 8 PRO</span>
      </div>

      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
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
            {/* Video or Image Background with enhanced filters */}
            <div className="absolute inset-0 w-full h-full">
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
                <Image
                  src={slide.src}
                  alt=""
                  fill
                  className="object-cover"
                  priority={index === 0}
                  quality={95}
                  sizes="100vw"
                  aria-hidden="true"
                />
              )}
              
              {/* Enhanced overlay with multiple gradients for better depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
              
              {/* Animated scan line effect for more dynamic visuals */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="w-full h-full bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.05)_50%)] bg-[length:100%_4px] animate-scan"></div>
              </div>
              
              {/* Subtle vignette effect */}
              <div className="absolute inset-0 bg-radial-gradient opacity-80"></div>
            </div>

            {/* Slide Content */}
            <SlideContent slide={slide} isActive={index === activeIndex} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Improved Controls Container */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-4">
        {/* Custom Pagination with enhanced styling */}
        <div className="flex items-center gap-4">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-primary-500 scale-125' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}: ${slide.title}`}
              aria-current={index === activeIndex ? 'true' : 'false'}
            >
              {index === activeIndex && (
                <motion.span 
                  className="absolute inset-0 rounded-full border border-primary-500"
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: 1, scale: 1.8 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Enhanced Play/Pause Button */}
        <button
          onClick={toggleAutoplay}
          className="bg-black/40 backdrop-blur-md text-white p-3.5 w-12 h-12 flex items-center justify-center transition-all hover:bg-primary-600 border border-white/20 hover:border-primary-500 group relative overflow-hidden"
          aria-label={isAutoplayPaused ? "Resume slideshow" : "Pause slideshow"}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {isAutoplayPaused ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          )}
        </button>
      </div>

      {/* Enhanced Navigation Arrows */}
      <div className="hidden md:block">
        <button 
          className="swiper-button-prev absolute left-6 top-1/2 z-20 transform -translate-y-1/2 bg-black/30 hover:bg-primary-600 backdrop-blur-md text-white w-14 h-14 flex items-center justify-center transition-all duration-300 border border-white/20 hover:border-primary-500 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-full"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transform group-hover:-translate-x-1 transition-transform duration-300">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        <button 
          className="swiper-button-next absolute right-6 top-1/2 z-20 transform -translate-y-1/2 bg-black/30 hover:bg-primary-600 backdrop-blur-md text-white w-14 h-14 flex items-center justify-center transition-all duration-300 border border-white/20 hover:border-primary-500 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-full"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transform group-hover:translate-x-1 transition-transform duration-300">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Enhanced current slide / total slides indicator */}
      <div className="absolute bottom-8 left-8 z-20 bg-black/40 backdrop-blur-md px-5 py-2.5 flex items-center border-l-2 border-primary-500">
        <span className="text-primary-500 font-medium text-lg mr-1">{activeIndex + 1}</span>
        <span className="text-white/70 text-sm">/</span>
        <span className="text-white/70 text-sm ml-1">{slides.length}</span>
      </div>

      {/* Custom Swiper Styling with additional transitions */}
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

        /* Animated scan line effect */
        @keyframes scan {
          from { transform: translateY(-100%); }
          to { transform: translateY(100%); }
        }
        
        .animate-scan {
          animation: scan 8s linear infinite;
        }
        
        /* Radial gradient for vignette effect */
        .bg-radial-gradient {
          background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%);
        }
        
        /* Enhanced swiper fade effect */
        .swiper-slide {
          transition: opacity 0.8s ease;
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .swiper-button-prev,
          .swiper-button-next {
            width: 40px;
            height: 40px;
          }
        }
        
        /* Enhance focus states for accessibility */
        button:focus-visible,
        a:focus-visible {
          outline: 2px solid #3ABFF8;
          outline-offset: 2px;
        }
      `}</style>
    </section>
  )
}

export default FeatureSlider