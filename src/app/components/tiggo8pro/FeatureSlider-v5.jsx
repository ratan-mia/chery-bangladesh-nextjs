'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Autoplay, Controller, EffectCreative, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-creative'
import 'swiper/css/thumbs'

// Redesigned slide data with new structure
const slides = [
  {
    id: 'slide1',
    type: 'video',
    src: '/videos/tiggo8pro-hero.mp4',
    poster: '/images/tiggo8pro/hero-slider/video-frame.png',
    logoSrc: '/images/tiggo8pro/hero-slider/tiggo8-logo.png',
    logoAlt: 'Tiggo 8 Pro Max Logo',
    title: 'LED Matrix Headlights',
    tagline: 'ENJOY YOUR FIRST CLASS',
    description: 'Intelligent lighting system that automatically adapts to driving conditions for optimal visibility and safety.',
    ariaLabel: 'Tiggo 8 Pro featuring LED Matrix Headlights',
    ctaText: 'Explore Features',
    ctaLink: '/features',
    color: '#3ABFF8',
    specs: [
      { label: 'Engine', value: '1.6T GDI' },
      { label: 'Power', value: '197 HP' },
      { label: 'Torque', value: '290 Nm' }
    ],
    thumbnailText: 'Headlights'
  },
  {
    id: 'slide2',
    type: 'image',
    src: '/images/tiggo8pro/hero-slider/tiggo8pro-banner.jpg',
    logoSrc: '/images/tiggo8pro/hero-slider/tiggo8-logo.png',
    logoAlt: 'Tiggo 8 Pro Max Logo',
    title: 'Dynamic Exterior Design',
    tagline: 'BOLD PRESENCE',
    description: 'Striking aesthetics with premium details that command attention on every journey.',
    ariaLabel: 'Tiggo 8 Pro showcasing its dynamic exterior design',
    ctaText: 'View Gallery',
    ctaLink: '/gallery',
    color: '#F87171',
    specs: [
      { label: 'Length', value: '4,722 mm' },
      { label: 'Width', value: '1,860 mm' },
      { label: 'Height', value: '1,746 mm' }
    ],
    thumbnailText: 'Exterior'
  },
]

// Animation variants with staggered reveal
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
}

const slideIn = {
  hidden: { x: 60, opacity: 0 },
  show: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
  },
  exit: { 
    x: -30, 
    opacity: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
}

const fadeInUp = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  },
  exit: { 
    y: -10, 
    opacity: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
  }
}

// Completely redesigned content display approach
const SlideContent = ({ slide, isActive }) => (
  <AnimatePresence mode="wait">
    {isActive && (
      <motion.div 
        className="w-full h-full flex flex-col justify-center z-10"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        {/* Feature Badge */}
        <motion.div 
          variants={slideIn}
          className="inline-block mb-2"
        >
          <span 
            className="px-4 py-1.5 text-xs tracking-widest font-medium rounded-sm uppercase"
            style={{ backgroundColor: `${slide.color}20`, color: slide.color }}
          >
            Tiggo 8 Pro
          </span>
        </motion.div>
        
        {/* Main Title */}
        <motion.h2 
          variants={slideIn}
          className="text-3xl md:text-5xl lg:text-6xl font-light mb-3 text-white"
        >
          {slide.title}
        </motion.h2>
        
        {/* Tagline */}
        <motion.p 
          variants={slideIn}
          className="text-sm md:text-base uppercase tracking-widest text-white/70 mb-6"
        >
          {slide.tagline}
        </motion.p>
        
        {/* Description */}
        <motion.p 
          variants={slideIn}
          className="text-base text-white/80 max-w-md mb-8 hidden md:block"
        >
          {slide.description}
        </motion.p>
        
        {/* Specifications */}
        <motion.div 
          variants={fadeInUp}
          className="flex gap-8 mb-10 hidden md:flex"
        >
          {slide.specs.map((spec, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-white/50 text-xs uppercase tracking-wide mb-1">{spec.label}</span>
              <span className="text-white text-lg font-light">{spec.value}</span>
            </div>
          ))}
        </motion.div>
        
        {/* CTA Button */}
        <motion.div variants={fadeInUp}>
          <Link 
            href={slide.ctaLink}
            className="group inline-flex items-center rounded-sm"
          >
            <span 
              className="py-3 px-6 text-sm font-medium tracking-wide transition-all duration-300"
              style={{ backgroundColor: slide.color, color: '#111111' }}
            >
              {slide.ctaText}
            </span>
            <span 
              className="p-3 flex items-center justify-center transition-all duration-300 group-hover:pl-5"
              style={{ backgroundColor: `${slide.color}30` }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke={slide.color}
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="transform group-hover:translate-x-1 transition-transform duration-300"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </Link>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

// Thumbnail item component
const ThumbnailItem = ({ slide, isActive, index, totalSlides }) => (
  <div 
    className={`
      flex items-center gap-3 py-3 px-5 border-l-2 transition-all duration-300
      ${isActive ? 'border-opacity-100 bg-white/10' : 'border-opacity-30 bg-transparent'}
    `}
    style={{ borderColor: isActive ? slide.color : 'rgba(255,255,255,0.3)' }}
  >
    <div className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden relative">
      <span 
        className={`text-sm font-medium transition-all duration-300 absolute inset-0 flex items-center justify-center ${isActive ? 'opacity-0' : 'opacity-100'}`}
        style={{ color: isActive ? slide.color : 'white' }}
      >
        {index + 1}
      </span>
      
      <svg 
        className={`w-5 h-5 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5 12L10 17L20 7" stroke={slide.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    
    <div className="flex flex-col">
      <span 
        className="text-sm font-medium transition-all duration-300"
        style={{ color: isActive ? slide.color : 'white' }}
      >
        {slide.thumbnailText}
      </span>
      <span className="text-xs text-white/50">{slide.type === 'video' ? 'Video' : 'Photo'}</span>
    </div>
  </div>
)

const FeatureSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const mainSwiperRef = useRef(null)
  const videoRefs = useRef([])

  // Initialize the slider
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false)
      
      if (slides[0]?.type === 'video') {
        const videoElement = videoRefs.current[0]
        if (videoElement) {
          videoElement.play().catch(() => {
            // Silent catch for autoplay restrictions
          })
        }
      }
    }, 1000)

    return () => {
      clearTimeout(timeout)
      videoRefs.current.forEach((video) => {
        if (video) video.pause()
      })
    }
  }, [])

  // Handle slide change
  const handleSlideChange = useCallback((swiper) => {
    const newIndex = swiper.realIndex
    setActiveIndex(newIndex)

    // Handle videos
    videoRefs.current.forEach((video, idx) => {
      if (video) {
        if (idx === newIndex) {
          video.currentTime = 0
          video.play().catch(() => {})
        } else {
          video.pause()
          video.currentTime = 0
        }
      }
    })
  }, [])

  return (
    <section className="w-full h-screen relative bg-gray-900 overflow-hidden">
      {/* Loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-50 bg-gray-900 flex flex-col items-center justify-center"
          >
            <div className="relative w-32 h-32 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-t-2 border-l-2 border-white/30"
              />
              <Image 
                src="/images/tiggo8pro/hero-slider/tiggo8-logo.png"
                alt="Loading"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-12 h-full">
        {/* Content area - 5 columns on desktop */}
        <div className="md:col-span-5 h-full bg-gray-900 z-10 p-6 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
          {/* Model name */}
          <div className="absolute top-6 left-6 z-10">
            <Image
              src={slides[activeIndex]?.logoSrc || '/images/tiggo8pro/hero-slider/tiggo8-logo.png'}
              alt={slides[activeIndex]?.logoAlt || 'Tiggo 8 Pro Logo'}
              width={160}
              height={50}
              className="object-contain"
            />
          </div>
          
          {/* Main content */}
          <div className="flex-1 flex items-center mt-16 md:mt-0">
            {slides.map((slide, index) => (
              <div key={slide.id} className={index === activeIndex ? 'block w-full' : 'hidden'}>
                <SlideContent slide={slide} isActive={index === activeIndex} />
              </div>
            ))}
          </div>
          
          {/* Bottom thumbnails */}
          <div className="mt-8 md:mt-0">
            <Swiper
              onSwiper={setThumbsSwiper}
              slidesPerView="auto"
              spaceBetween={0}
              watchSlidesProgress={true}
              className="thumbnails-swiper"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={`thumb-${slide.id}`} className="!w-auto cursor-pointer">
                  <ThumbnailItem 
                    slide={slide} 
                    isActive={index === activeIndex} 
                    index={index}
                    totalSlides={slides.length}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        
        {/* Media area - 7 columns on desktop */}
        <div className="md:col-span-7 h-full absolute md:relative top-0 left-0 w-full md:w-auto z-0 md:z-auto">
          <Swiper
            ref={mainSwiperRef}
            modules={[Autoplay, EffectCreative, Controller, Thumbs]}
            effect="creative"
            creativeEffect={{
              prev: {
                shadow: false,
                translate: ["-20%", 0, -1],
                opacity: 0
              },
              next: {
                shadow: false,
                translate: ["100%", 0, 0],
                opacity: 0
              }
            }}
            speed={1000}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            onSlideChange={handleSlideChange}
            loop={true}
            className="h-full w-full media-swiper"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.id}>
                {/* Video or Image */}
                <div className="relative w-full h-full">
                  {slide.type === 'video' ? (
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      className="absolute inset-0 w-full h-full object-cover"
                      playsInline
                      muted
                      loop
                      poster={slide.poster}
                      preload="auto"
                    >
                      <source src={slide.src} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={slide.src}
                      alt=""
                      fill
                      className="object-cover"
                      priority={index === 0}
                      quality={95}
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                  )}
                  
                  {/* Diagonal overlay */}
                  <div 
                    className="absolute inset-0 md:clip-path-diagonal"
                    style={{
                      background: `linear-gradient(135deg, ${slide.color}15 0%, #111111 100%)`,
                      mixBlendMode: 'multiply'
                    }}
                  />
                  
                  {/* Content overlay (mobile only) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent md:hidden" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Feature marker dots */}
          <div className="absolute inset-0 pointer-events-none hidden md:block">
            {activeIndex === 0 && (
              <>
                <div className="absolute top-1/4 left-1/4" style={{ color: slides[0].color }}>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${slides[0].color}30` }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: slides[0].color }}
                    />
                  </motion.div>
                </div>
                <div className="absolute top-1/3 right-1/3" style={{ color: slides[0].color }}>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${slides[0].color}30` }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: slides[0].color }}
                    />
                  </motion.div>
                </div>
              </>
            )}
            
            {activeIndex === 1 && (
              <>
                <div className="absolute top-1/3 left-1/3" style={{ color: slides[1].color }}>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${slides[1].color}30` }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: slides[1].color }}
                    />
                  </motion.div>
                </div>
                <div className="absolute bottom-1/4 right-1/4" style={{ color: slides[1].color }}>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${slides[1].color}30` }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: slides[1].color }}
                    />
                  </motion.div>
                </div>
              </>
            )}
          </div>
          
          {/* Controls for mobile */}
          <div className="absolute bottom-32 right-6 z-30 md:hidden flex gap-3">
            <button 
              onClick={() => mainSwiperRef.current?.swiper.slidePrev()}
              className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button 
              onClick={() => mainSwiperRef.current?.swiper.slideNext()}
              className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        /* Split layout clip path */
        .md\\:clip-path-diagonal {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0);
        }
        
        @media (min-width: 768px) {
          .md\\:clip-path-diagonal {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 15% 100%, 0 85%, 0 0);
          }
        }
        
        /* Custom Swiper styling */
        .thumbnails-swiper {
          width: 100%;
          overflow: visible;
        }
        
        .thumbnails-swiper .swiper-slide {
          opacity: 0.7;
          transition: opacity 0.3s;
        }
        
        .thumbnails-swiper .swiper-slide-thumb-active {
          opacity: 1;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .thumbnails-swiper {
            display: none;
          }
        }
        
        /* Prevent FOUC */
        .media-swiper,
        .thumbnails-swiper {
          visibility: ${isLoading ? 'hidden' : 'visible'};
        }
      `}</style>
    </section>
  )
}

export default FeatureSlider