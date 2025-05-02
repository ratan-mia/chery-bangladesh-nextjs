'use client'

import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Vehicle data - moved outside component for better organization
const vehicleData = [
  {
    id: 1,
    hero: {
      src: '/images/masonary/1/001-2.png', 
      alt: 'TIGGO 8 PRO - Premium 7-Seater SUV',
    },
    images: [
      {
        src: '/images/masonary/1/002-2.png',
        alt: 'Illuminating Chery Front Logo',
      },
      {
        src: '/images/masonary/1/003-2.png',
        alt: '19" Aluminium Alloy Rim Wheels',
      },
      {
        src: '/images/masonary/1/004-2.png',
        alt: 'LED Headlights',
      },
      {
        src: '/images/masonary/1/001-2.png',
        alt: 'Panoramic Power Sunroof',
      },
    ],
    content: {
      title: 'TIGGO 8 PRO',
      subtitle: 'FIRST CLASS',
      description: 'The Tiggo 8 Pro is the epitome of luxury that transcends the bounds of a mere vehicle; a masterpiece that commands centre stage presence. Its diamond-shaped front grille gleams like a finely cut jewel, while the illuminated logo radiates an aura of refinement.',
      highlights: [
        'Turbocharged 1600cc high compression engine',
        'State-of-the-art 195 BHP and 290Nm of torque',
        '207mm ground clearance for all terrains',
        'Elegant LED daytime running lamps'
      ],
      specs: [
        {
          name: 'Engine',
          value: '1.6L Turbocharged'
        },
        {
          name: 'Power',
          value: '195 BHP'
        },
        {
          name: 'Torque',
          value: '290Nm'
        },
        {
          name: 'Ground Clearance',
          value: '207mm'
        }
      ],
      ctaLink: '/vehicles/tiggo-8-pro'
    }
  },
  {
    id: 2,
    hero: {
      src: '/images/masonary/2/0081.png',
      alt: 'TIGGO CROSS - Ultimate Crossover',
    },
    images: [
      {
        src: '/images/masonary/2/0082.png',
        alt: 'Starry Diamond-Shaped Grille Pattern',
      },
      {
        src: '/images/masonary/2/0083.png',
        alt: 'Dual 12.3-inch LCD Screens',
      },
      {
        src: '/images/masonary/2/0084.png',
        alt: 'Panoramic Sunroof',
      },
      {
        src: '/images/masonary/2/0081.png',
        alt: 'Tiggo Cross Exterior',
      },
    ],
    content: {
      title: 'TIGGO CROSS',
      subtitle: 'FIRST CLASS CROSSOVER',
      description: 'Enveloping you in absolute luxury and comfort is the plush leather upholstery that\'s hand-stitched to perfection on the seats, steering wheel, and other key touchpoints. Elevating that first class feeling further is the ambient lighting.',
      highlights: [
        'Distinctive biomimetic tiger face design',
        'Aggressive tiger claw style headlight trim',
        'Sleek and aerodynamic silhouette',
        'Comprehensive 7 airbag configuration'
      ],
      specs: [
        {
          name: 'Display',
          value: '10.25-inch LCD'
        },
        {
          name: 'Audio',
          value: '6-speaker Sony'
        },
        {
          name: 'Safety',
          value: '7 Airbags'
        },
        {
          name: 'Colors',
          value: '4 Options'
        }
      ],
      ctaLink: '/vehicles/tiggo-cross'
    }
  }
]

// Animation variants defined outside component for better organization
const animations = {
  image: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut"
      },
    }),
  },
  text: {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + (i * 0.1),
        duration: 0.5,
        ease: "easeOut"
      }
    })
  },
  highlight: {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.6 + (i * 0.1),
        duration: 0.4
      }
    })
  }
}

export default function CheryBrandMasonrySlider({ 
  showNavigation = true,
  autoplayDuration = 5000,
  primaryLight = "#c4b19c",
  primary700 = "#8c735d",
  primary800 = "#b7a99a",
  primary900 = "#524336"
}) {
  // State management
  const [isMounted, setIsMounted] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideProgress, setSlideProgress] = useState(0)
  const [hoveredSection, setHoveredSection] = useState(null)
  const [isPaused, setIsPaused] = useState(false)
  const [breakpoint, setBreakpoint] = useState("desktop")
  const [orientation, setOrientation] = useState("landscape")
  
  // Refs
  const swiperRef = useRef(null)
  const progressIntervalRef = useRef(null)

  // Reset and start progress animation with improved implementation
  const resetProgress = useCallback(() => {
    setSlideProgress(0)
    clearInterval(progressIntervalRef.current)
    
    if (!isPaused) {
      progressIntervalRef.current = setInterval(() => {
        setSlideProgress(prev => {
          const newProgress = prev + (100 / (autoplayDuration / 100))
          return newProgress >= 100 ? 100 : newProgress
        })
      }, 100)
    }
  }, [autoplayDuration, isPaused])
  
  // Memoized slide change handler
  const handleSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex)
    resetProgress()
  }, [resetProgress])
  
  // Pause/resume autoplay
  const togglePause = useCallback(() => {
    setIsPaused(prev => {
      const newState = !prev
      if (newState) {
        // Pause
        clearInterval(progressIntervalRef.current)
        swiperRef.current?.autoplay.stop()
      } else {
        // Resume
        resetProgress()
        swiperRef.current?.autoplay.start()
      }
      return newState
    })
  }, [resetProgress])
  
  // Enhanced responsive breakpoint detection
  const updateBreakpoints = useCallback(() => {
    const width = window.innerWidth
    const height = window.innerHeight
    setOrientation(width > height ? "landscape" : "portrait")
    
    if (width < 640) {
      setBreakpoint("mobile")
    } else if (width < 1024) {
      setBreakpoint("tablet")
    } else if (width < 1280) {
      setBreakpoint("desktop")
    } else {
      setBreakpoint("large")
    }
  }, [])
  
  // Navigate to a specific slide with animation reset
  const goToSlide = useCallback((index) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index + 1)
      resetProgress()
    }
  }, [resetProgress])
  
  // Navigate to previous slide
  const prevSlide = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev()
      resetProgress()
    }
  }, [resetProgress])
  
  // Navigate to next slide
  const nextSlide = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.slideNext()
      resetProgress()
    }
  }, [resetProgress])
  
  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide()
    } else if (e.key === 'ArrowRight') {
      nextSlide()
    } else if (e.key === ' ' || e.key === 'Spacebar') {
      togglePause()
      e.preventDefault()
    }
  }, [prevSlide, nextSlide, togglePause])
  
  // Mount effect with cleanup
  useEffect(() => {
    setIsMounted(true)
    updateBreakpoints()
    resetProgress()
    
    // Add event listeners
    window.addEventListener('resize', updateBreakpoints)
    window.addEventListener('orientationchange', updateBreakpoints)
    window.addEventListener('keydown', handleKeyDown)
    
    // Cleanup function
    return () => {
      clearInterval(progressIntervalRef.current)
      window.removeEventListener('resize', updateBreakpoints)
      window.removeEventListener('orientationchange', updateBreakpoints)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [resetProgress, updateBreakpoints, handleKeyDown])
  
  // Reset progress when autoplay duration changes
  useEffect(() => {
    resetProgress()
  }, [autoplayDuration, resetProgress])
  
  // Helper functions for responsive design
  const getSlideHeight = () => {
    switch (breakpoint) {
      case "mobile":
        return { 
          hero: "45vh",
          grid: "35vh"
        }
      case "tablet":
        return orientation === "portrait" 
          ? { hero: "40vh", grid: "40vh" } 
          : { hero: "55vh", grid: "45vh" }
      case "desktop":
        return { hero: "70vh", grid: "70vh" }
      case "large":
        return { hero: "80vh", grid: "80vh" }
      default:
        return { hero: "60vh", grid: "60vh" }
    }
  }
  
  const getHighlightCount = () => {
    switch (breakpoint) {
      case "mobile": return 2
      case "tablet": return 3
      default: return 4
    }
  }
  
  // Skip client-side rendering for SSR compatibility
  if (!isMounted) {
    return null
  }
  
  // Get responsive dimensions
  const heights = getSlideHeight()
  const highlightCount = getHighlightCount()
  const isMobile = breakpoint === "mobile"
  const isTablet = breakpoint === "tablet"
  
  return (
    <div 
      className="relative w-full overflow-hidden bg-gray-100"
      role="region"
      aria-label="Vehicle Showcase"
      aria-roledescription="carousel"
      data-breakpoint={breakpoint}
      data-orientation={orientation}
    >
      {/* Enhanced background texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5 mix-blend-soft-light">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid-pattern" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke={primary800} strokeWidth="0.5" opacity="0.3" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>
      
      {/* Pause/Play button */}
      <button
        onClick={togglePause}
        className="absolute top-4 right-4 z-30 bg-white/80 hover:bg-white p-2 rounded-full shadow-md backdrop-blur-sm transition-all duration-200"
        aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
      >
        {isPaused ? <Play size={16} /> : <Pause size={16} />}
      </button>
      
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Pagination, EffectFade, Autoplay]}
        navigation={false}
        pagination={false}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: autoplayDuration,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={800}
        onSlideChange={handleSlideChange}
        className="w-full h-auto"
        a11y={{
          enabled: true,
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
        }}
      >
        {vehicleData.map((vehicle, slideIndex) => (
          <SwiperSlide 
            key={vehicle.id} 
            className="w-full"
            role="group"
            aria-label={`${slideIndex + 1} of ${vehicleData.length}: ${vehicle.content.title}`}
            aria-roledescription="slide"
          >
            {/* Responsive layout container */}
            <div className={`flex flex-col ${breakpoint === "mobile" || (breakpoint === "tablet" && orientation === "portrait") ? "flex-col" : "lg:flex-row"}`}>
              {/* Hero image with content overlay */}
              <div 
                className={`w-full ${breakpoint !== "mobile" && breakpoint !== "tablet" ? "lg:w-[40%]" : ""} relative overflow-hidden`} 
                style={{ height: heights.hero }}
              >
                {/* Main background image */}
                <motion.div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${vehicle.hero.src})`,
                  }}
                  initial={{ scale: 1.1 }}
                  animate={{ 
                    scale: hoveredSection === 'hero' ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.7 }}
                  role="presentation"
                />
                
                {/* Text content overlay */}
                <div 
                  className={`absolute inset-x-0 bottom-0 ${isMobile ? "p-3" : isTablet ? "p-5" : "p-8"}`}
                  onMouseEnter={() => !isMobile && setHoveredSection('hero')}
                  onMouseLeave={() => !isMobile && setHoveredSection(null)}
                >
                  {/* Background panel for text */}
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                  
                  <div className="relative z-10">
                    {/* Accent bar */}
                    <motion.div 
                      className="h-1 mb-3 md:mb-6"
                      style={{ backgroundColor: primary700 }}
                      initial={{ width: 0 }}
                      animate={{ width: isMobile ? '40px' : isTablet ? '60px' : '80px' }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                    
                    {/* Vehicle title */}
                    <motion.h2
                      custom={0}
                      variants={animations.text}
                      initial="hidden"
                      animate="visible"
                      className={`${isMobile ? "text-xl" : isTablet ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl lg:text-5xl"} font-bold text-white mb-1 md:mb-2`}
                    >
                      {vehicle.content.title}
                    </motion.h2>
                    
                    {/* Vehicle subtitle */}
                    <motion.p
                      custom={1}
                      variants={animations.text}
                      initial="hidden"
                      animate="visible"
                      className={`${isMobile ? "text-sm" : isTablet ? "text-base md:text-lg" : "text-lg md:text-xl lg:text-2xl"} font-light text-white/90 mb-2 md:mb-4`}
                    >
                      {vehicle.content.subtitle}
                    </motion.p>
                    
                    {/* Vehicle description with adaptive line clamping */}
                    <motion.p
                      custom={2}
                      variants={animations.text}
                      initial="hidden"
                      animate="visible"
                      className={`${isMobile ? "text-xs line-clamp-2" : isTablet ? "text-sm line-clamp-3" : "text-sm md:text-base line-clamp-none"} text-white/80 mb-3 md:mb-6 max-w-lg`}
                    >
                      {vehicle.content.description}
                    </motion.p>
                    
                    {/* Feature highlights - hidden on mobile in portrait */}
                    {!(isMobile && orientation === "portrait") && (
                      <div className="space-y-1 md:space-y-2 mb-3 md:mb-6">
                        {vehicle.content.highlights.slice(0, highlightCount).map((item, idx) => (
                          <motion.div 
                            key={idx}
                            custom={idx}
                            variants={animations.highlight}
                            initial="hidden"
                            animate="visible"
                            className="flex items-center"
                          >
                            <div 
                              className={`${isMobile ? "w-1 h-1" : "w-1.5 h-1.5"} rounded-full mr-2`} 
                              style={{ backgroundColor: primary700 }}
                              aria-hidden="true"
                            ></div>
                            <p className={`${isMobile ? "text-xs" : isTablet ? "text-xs md:text-sm" : "text-sm md:text-base"} text-white/70`}>
                              {item}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    
                    {/* CTA button */}
                    <motion.a
                      href={vehicle.content.ctaLink}
                      className={`group inline-flex items-center ${isMobile ? "px-4 py-2 text-xs" : isTablet ? "px-5 py-2.5 text-sm" : "px-8 py-3 text-base"} bg-primary-700 text-white font-medium hover:bg-primary-800 transition-all duration-300 tracking-wide`}
                      style={{ backgroundColor: primary700 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label={`Learn more about ${vehicle.content.title}`}
                    >
                      LEARN MORE
                      <ArrowRight
                        size={isMobile ? 12 : 16}
                        className="ml-2 group-hover:ml-3 transition-all duration-300"
                        aria-hidden="true"
                      />
                    </motion.a>
                  </div>
                </div>
              </div>
              
              {/* Grid images - responsive layout */}
              <div 
                className={`w-full ${breakpoint !== "mobile" && breakpoint !== "tablet" ? "lg:w-[60%]" : ""}`}
                style={{ height: heights.grid }}
              >
                <div className="grid grid-cols-2 grid-rows-2 h-full border border-gray-200">
                  {vehicle.images.map((image, idx) => (
                    <motion.div
                      key={idx}
                      className="relative overflow-hidden border border-gray-200"
                      custom={idx}
                      variants={animations.image}
                      initial="hidden"
                      animate="visible"
                      onMouseEnter={() => !isMobile && setHoveredSection(`image-${idx}`)}
                      onMouseLeave={() => !isMobile && setHoveredSection(null)}
                      tabIndex={0}
                      role="img"
                      aria-label={image.alt}
                    >
                      {/* Image */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                        style={{
                          backgroundImage: `url(${image.src})`,
                          transform: hoveredSection === `image-${idx}` ? 'scale(1.08)' : 'scale(1)',
                        }}
                      />
                      
                      {/* Caption overlay - responsive visibility */}
                      <AnimatePresence>
                        {(isMobile || isTablet || hoveredSection === `image-${idx}`) && (
                          <motion.div 
                            className={`absolute inset-0 flex items-end justify-end ${isMobile ? "p-1" : "p-3"}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="bg-black/60 backdrop-blur-sm py-1 px-2">
                              <p className={`${isMobile ? "text-xs" : isTablet ? "text-xs sm:text-sm" : "text-sm"} text-white font-medium text-right`}>
                                {isMobile ? image.alt.split(' ')[0] : image.alt}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Navigation bar - responsive */}
      {showNavigation && (
        <div className="w-full bg-white border-t border-gray-200 py-2 md:py-4">
          <div className={`container mx-auto px-3 md:px-6 flex flex-wrap ${isMobile ? "flex-col space-y-3" : "items-center justify-between"} gap-4`}>
            {/* Model tabs - always visible */}
            <div className={`flex ${isMobile ? "justify-between" : "space-x-4 md:space-x-8"}`}>
              {vehicleData.map((vehicle, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`flex flex-col relative ${activeIndex === index ? 'opacity-100' : 'opacity-50'} 
                  transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary-700
                  ${isMobile ? "flex-1" : ""}`}
                  aria-label={`Show ${vehicle.content.title}`}
                  aria-current={activeIndex === index ? "true" : "false"}
                >
                  <span className={`${isMobile ? "text-xs" : "text-sm md:text-base"} text-gray-900 font-medium`}>
                    {vehicle.content.title}
                  </span>
                  
                  {/* Progress bar */}
                  <div className="w-full h-0.5 mt-1.5 bg-gray-200">
                    {activeIndex === index && (
                      <motion.div 
                        className="h-full transition-all duration-100 ease-linear"
                        style={{ 
                          width: `${slideProgress}%`,
                          backgroundColor: primary700
                        }}
                        animate={{ width: `${slideProgress}%` }}
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            {/* Middle row for mobile - specs */}
            {isMobile && (
              <div className="flex justify-between">
                {vehicleData[activeIndex].content.specs
                  .slice(0, 2)
                  .map((spec, index) => (
                    <div key={index} className="text-center flex-1">
                      <p className="text-xs text-gray-500 uppercase tracking-wider">{spec.name}</p>
                      <p className="text-xs font-medium text-gray-900">{spec.value}</p>
                    </div>
                  ))}
              </div>
            )}
            
            {/* Bottom row - nav buttons for mobile, specs + nav for larger screens */}
            <div className={`flex ${isMobile ? "justify-center" : "items-center justify-between"}`}>
              {/* Specs - hidden on mobile */}
              {!isMobile && (
                <div className="hidden md:flex space-x-4 lg:space-x-6">
                  {vehicleData[activeIndex].content.specs
                    .slice(0, isTablet ? 2 : 4)
                    .map((spec, index) => (
                      <div key={index} className="text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">{spec.name}</p>
                        <p className="text-sm font-medium text-gray-900">{spec.value}</p>
                      </div>
                    ))}
                </div>
              )}
              
              {/* Navigation buttons */}
              <div className="flex space-x-2 sm:space-x-4">
                <button 
                  onClick={prevSlide}
                  className={`${isMobile ? "w-7 h-7" : "w-8 h-8 sm:w-10 sm:h-10"} flex items-center justify-center border hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-700`}
                  style={{ borderColor: primary700 }}
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={isMobile ? 14 : 16} />
                </button>
                <button 
                  onClick={nextSlide}
                  className={`${isMobile ? "w-7 h-7" : "w-8 h-8 sm:w-10 sm:h-10"} flex items-center justify-center border hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-700`}
                  style={{ borderColor: primary700 }}
                  aria-label="Next slide"
                >
                  <ChevronRight size={isMobile ? 14 : 16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Screen reader helper */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Slide ${activeIndex + 1} of ${vehicleData.length}: ${vehicleData[activeIndex].content.title}`}
      </div>
    </div>
  )
}