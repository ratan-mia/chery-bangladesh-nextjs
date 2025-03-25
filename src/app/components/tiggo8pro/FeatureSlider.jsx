'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Slide data with improved structure and more descriptive fields
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
    ariaLabel: 'Tiggo 8 Pro featuring LED Matrix Headlights',
    ctaText: 'Explore Features',
    ctaLink: '/features'
  },
  {
    id: 'slide2',
    type: 'image',
    src: '/images/tiggo8pro/hero-slider/tiggo8pro-banner.jpg',
    logoSrc: '/images/tiggo8pro/hero-slider/tiggo8-logo.png',
    logoAlt: 'Tiggo 8 Pro Max Logo',
    title: 'BOLD PRESENCE',
    subtitle: 'Dynamic Exterior Design',
    ariaLabel: 'Tiggo 8 Pro showcasing its dynamic exterior design',
    ctaText: 'View Gallery',
    ctaLink: '/gallery'
  },
]

// Animation variants for consistent motion effects
const fadeInAnimations = {
  hidden: { opacity: 0, y: -10 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: 'easeOut' }
  })
}

const slideUpAnimations = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: 'easeOut' }
  })
}

// Reusable SlideContent component for content overlays
const SlideContent = ({ slide, isActive }) => (
  <div className="absolute md:bottom-50  inset-0 flex flex-col items-center justify-center md:items-start md:justify-end p-6 md:p-16 text-white b">
    <div className="md:max-w-xl w-full flex flex-col items-center md:items-start">
      {/* Logo - positioned differently for mobile vs desktop */}
      <motion.div
        variants={fadeInAnimations}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        custom={0.2}
        className="mb-4 md:mb-8 md:mt-0 w-full flex justify-center md:justify-start"
      >
        <Image
          src={slide.logoSrc}
          alt={slide.logoAlt}
          width={280}
          height={80}
          className="object-contain md:w-60 lg:w-80"
          priority
        />
      </motion.div>

      {/* Decorative line */}
      <motion.div
        variants={fadeInAnimations}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        custom={0.3}
        className="hidden md:block w-24 h-1 bg-gradient-to-r from-red-100 to-red-200 mb-5"
      />

      {/* Title */}
      <motion.h2
        variants={fadeInAnimations}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        custom={0.4}
        className="text-xl md:text-3xl lg:text-4xl uppercase tracking-wider font-light mb-3 text-center md:text-left"
      >
        {slide.title}
      </motion.h2>

      {/* Subtitle */}
      {slide.subtitle && (
        <motion.p
          variants={fadeInAnimations}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          custom={0.5}
          className="text-base md:text-xl text-gray-200 mt-1 mb-6 text-center md:text-left font-light"
        >
          {slide.subtitle}
        </motion.p>
      )}

      {/* CTA Button */}
      <motion.div
        variants={slideUpAnimations}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        custom={0.7}
        className="mt-4 md:mt-8"
      >
        <a 
          href={slide.ctaLink}
          className="inline-block bg-primary-700 hover:bg-primary-800 text-white font-medium py-3 px-8 rounded-full transition-colors duration-300 text-sm md:text-base tracking-wide"
        >
          {slide.ctaText}
          <span className="ml-2">→</span>
        </a>
      </motion.div>
    </div>
  </div>
)

const FeatureSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false)
  const swiperRef = useRef(null)
  const videoRefs = useRef([])

  // Handle slide change for videos
  const handleSlideChange = useCallback((swiper) => {
    const newIndex = swiper.activeIndex
    setActiveIndex(newIndex)

    // Pause all videos
    videoRefs.current.forEach((video) => {
      if (video) video.pause()
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

  // Toggle autoplay pause/resume
  const toggleAutoplay = useCallback(() => {
    if (!swiperRef.current) return
    
    const swiper = swiperRef.current.swiper
    if (isAutoplayPaused) {
      swiper.autoplay.start()
      
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
      
      // Pause video if the current slide is a video
      const videoElement = videoRefs.current[activeIndex]
      if (videoElement) {
        videoElement.pause()
      }
    }
    
    setIsAutoplayPaused(!isAutoplayPaused)
  }, [isAutoplayPaused, activeIndex])

  // Play the first video on component mount
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (slides[0]?.type === 'video') {
        const videoElement = videoRefs.current[0]
        if (videoElement) {
          videoElement.play().catch(() => {
            // Silent catch - autoplay might be blocked by browser policy
          })
        }
      }
    }, 500)

    // Clean up function
    return () => {
      clearTimeout(timeout)
      videoRefs.current.forEach((video) => {
        if (video) video.pause()
      })
    }
  }, [])

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

  return (
    <section 
      className="w-full h-screen relative overflow-hidden" 
      aria-label="Tiggo 8 Pro Feature Showcase"
    >
      {/* Progress bar at the top */}
      <div className="absolute top-0 left-0 right-0 z-10 h-1 bg-primary-700/30">
        <motion.div 
          className="h-full bg-primary-700"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ 
            duration: 5, 
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
            repeatDelay: 0 
          }}
        />
      </div>

      {/* Model badge in top left */}
      <div className="absolute top-6 left-6 z-10 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
        <span className="text-white text-sm font-medium tracking-wider">TIGGO 8 PRO</span>
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
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  quality={95}
                  sizes="(max-width: 768px) 100vw, 100vw"
                />
              </div>
            )}

            {/* Dark gradient overlay that's stronger at bottom for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"></div>

            {/* Slide Content */}
            <SlideContent slide={slide} isActive={index === activeIndex} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Controls Container */}
      <div className="absolute bottom-8 right-8 z-10 flex items-center gap-4">
        {/* Custom Pagination */}
        <div className="custom-pagination flex gap-3 mr-3"></div>

        {/* Play/Pause Button */}
        <button
          onClick={toggleAutoplay}
          className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-full w-12 h-12 flex items-center justify-center transition-colors hover:bg-white/20 border border-white/30"
          aria-label={isAutoplayPaused ? "Resume slideshow" : "Pause slideshow"}
        >
          {isAutoplayPaused ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          )}
        </button>
      </div>

      {/* Custom Navigation Arrows */}
      <button className="swiper-button-prev absolute left-4 top-1/2 z-10 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 group">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transform group-hover:-translate-x-1 transition-transform duration-300">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      
      <button className="swiper-button-next absolute right-4 top-1/2 z-10 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 group">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transform group-hover:translate-x-1 transition-transform duration-300">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      {/* Current slide / total slides indicator */}
      <div className="absolute bottom-8 left-8 z-10 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium">
        <span className="text-red-500">{activeIndex + 1}</span>
        <span className="mx-1">/</span>
        <span>{slides.length}</span>
      </div>

      {/* Custom Swiper Styling */}
      <style jsx global>{`
        .custom-pagination {
          display: flex;
          align-items: center;
        }

        .custom-pagination .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          transition: all 0.3s ease;
          margin: 0 4px;
          opacity: 1;
        }

        .custom-pagination .swiper-pagination-bullet-active {
          background: #fff;
          transform: scale(1.3);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        /* Hide default swiper navigation arrows since we have custom ones */
        .swiper-button-next::after,
        .swiper-button-prev::after {
          display: none;
        }

        .swiper-button-disabled {
          opacity: 0.35 !important;
          pointer-events: none;
        }

        /* Custom scrollbar for the page */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }

        ::-webkit-scrollbar-thumb {
          background: #b29980;
          border-radius: 3px;
        }

        /* Custom selection color */
        ::selection {
          background: rgba(211, 47, 47, 0.7);
          color: white;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .custom-pagination .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
          }
        }

        @media (max-width: 640px) {
          .swiper-button-prev,
          .swiper-button-next {
            width: 10px;
            height: 10px;
            display: none;
          }
        }
      `}</style>
    </section>
  )
}

export default FeatureSlider