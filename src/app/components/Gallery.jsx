'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Info, X, ZoomIn, ZoomOut } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { A11y, FreeMode, Keyboard, Navigation, Thumbs, Zoom } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/css/zoom'

// Refined theme configuration with earth tones
const theme = {
  // Colors
  primary: '#8c735d',
  primaryDark: '#65584A',
  primaryLight: '#A59988',
  accent: '#D3B88C',
  text: '#2D2A26',
  textSecondary: '#5F574E',
  buttonBg: '#F3F4F6',
  buttonText: '#2D2A26',
  contentBg: '#F5F4F2',
  borderColor: '#E5E0DB',
  cardBg: '#FFFFFF',
  highlight: '#F0EBE5',
  overlay: "rgba(255, 255, 255, 0.7)",
};

export default function Gallery({
  images,
  title = 'Photo Gallery',
  subtitle = 'Browse through our collection of images',
  description = 'Explore our high-quality images showcasing every detail. Use the navigation arrows or swipe to browse, click on thumbnails to jump to specific images.',
  aspectRatio = 'aspect-[16/9]',
  onImageChange,
  className = '',
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const mainSwiperRef = useRef(null)
  const sectionRef = useRef(null)
  const galleryRef = useRef(null)

  useEffect(() => {
    setIsMounted(true)
    return () => {
      if (thumbsSwiper && !thumbsSwiper.destroyed) thumbsSwiper.destroy()
      if (mainSwiperRef.current) mainSwiperRef.current.destroy()
    }
  }, [thumbsSwiper])

  // Detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.2 }
    )
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex)
    if (onImageChange) onImageChange(swiper.activeIndex)
    
    // Reset zoom and info states on slide change
    setIsZoomed(false)
    setShowInfo(false)
  }

  const toggleZoom = useCallback(() => {
    setIsZoomed(!isZoomed)
  }, [isZoomed])

  const toggleInfo = useCallback(() => {
    setShowInfo(!showInfo)
  }, [showInfo])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isInView) return
      
      if (e.key === 'z' || e.key === 'Z') {
        toggleZoom()
      } else if (e.key === 'i' || e.key === 'I') {
        toggleInfo()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isInView, toggleZoom, toggleInfo])

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  }
  
  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  }

  if (!isMounted || !images?.length) return null

  return (
    <div 
      ref={sectionRef}
      className={`w-full ${className}`}
      style={{ backgroundColor: theme.contentBg }}
    >
      {/* Header Section with Title & Description - Centered Design */}
      <div className="w-full py-16 md:py-20 text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto mb-10 md:mb-16">
          {/* Section label with accent line */}
          <div className="flex items-center justify-center mb-4">
            <div 
              className="h-0.5 w-6 mr-3"
              style={{ backgroundColor: theme.primary }}
            />
            <span 
              className="text-sm uppercase font-medium tracking-wider"
              style={{ color: theme.primaryLight }}
            >
              Explore
            </span>
            <div 
              className="h-0.5 w-6 ml-3"
              style={{ backgroundColor: theme.primary }}
            />
          </div>
          
          {/* Main title with large emphasized styling */}
          <motion.h2 
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideUp}
            className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight"
            style={{ color: theme.text }}
          >
            {title}
          </motion.h2>
          
          {/* Subtitle with medium emphasis */}
          <motion.h3
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideUp}
            className="text-xl md:text-2xl font-medium mb-6"
            style={{ color: theme.primary }}
          >
            {subtitle}
          </motion.h3>
          
          {/* Decorative divider */}
          <div className="flex justify-center mb-6">
            <div 
              className="h-1 w-24"
              style={{ backgroundColor: theme.accent }}
            />
          </div>
          
          {/* Descriptive text with lighter weight */}
          <motion.p
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideUp}
            className="text-base md:text-lg leading-relaxed mx-auto"
            style={{ color: theme.textSecondary }}
          >
            {description}
          </motion.p>
        </div>
      </div>
      
      {/* Full-width main gallery slider */}
      <div className="w-full relative mb-10" ref={galleryRef}>
        {/* Main Image Display - Full width with 16:9 or custom aspect ratio */}
        <div 
          className={`relative w-full ${aspectRatio} overflow-hidden`}
        >
          {/* Gradient overlays for better text visibility */}
          <div 
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ 
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.4) 100%)'
            }}
          />
          
          <Swiper
            onSwiper={(swiper) => { mainSwiperRef.current = swiper }}
            modules={[FreeMode, Navigation, Thumbs, Keyboard, A11y, Zoom]}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            navigation={{
              nextEl: '.gallery-button-next',
              prevEl: '.gallery-button-prev',
            }}
            keyboard={{ enabled: true }}
            onSlideChange={handleSlideChange}
            grabCursor={true}
            zoom={{ enabled: true, maxRatio: 3 }}
            className="h-full w-full"
          >
            {images.map((image, index) => (
              <SwiperSlide key={`main-slide-${index}`} className="h-full w-full">
                <div className="swiper-zoom-container h-full w-full">
                  <Image
                    src={image.src}
                    alt={image.alt || `Gallery image ${index + 1}`}
                    fill
                    priority={index === 0}
                    className={`object-cover transition-transform duration-500 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                    sizes="100vw"
                    quality={95}
                    onClick={toggleZoom}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Image Information Panel - Full-width overlay */}
          <AnimatePresence>
            {showInfo && images[activeIndex].description && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 z-30 flex items-center justify-center backdrop-blur-sm p-6"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
              >
                <button
                  onClick={toggleInfo}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="Close information"
                >
                  <X size={20} />
                </button>
                
                <div className="max-w-3xl text-center">
                  <h3 className="text-white text-2xl font-semibold mb-4">
                    {images[activeIndex].caption || images[activeIndex].alt || 'Image Details'}
                  </h3>
                  <div className="w-16 h-0.5 bg-white/40 mx-auto mb-5" />
                  <p className="text-white/90 text-lg leading-relaxed">
                    {images[activeIndex].description}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Caption overlay on bottom */}
          {images[activeIndex].caption && (
            <div 
              className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-6"
              style={{ 
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)'
              }}
            >
              <div className="max-w-7xl mx-auto">
                <h3 className="text-white text-xl md:text-2xl font-medium">
                  {images[activeIndex].caption}
                </h3>
              </div>
            </div>
          )}

          {/* Navigation Buttons - Larger and positioned at edges */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-6 lg:px-12 z-20">
            <button 
              className="gallery-button-prev w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ 
                backgroundColor: `${theme.cardBg}CC`,
                color: theme.primary,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className="gallery-button-next w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ 
                backgroundColor: `${theme.cardBg}CC`,
                color: theme.primary,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
              }}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Action buttons - In vertical stack on top-right */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 flex flex-col space-y-3 z-20">
            {/* Zoom Button */}
            <button
              onClick={toggleZoom}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ 
                backgroundColor: `${theme.cardBg}CC`,
                color: theme.primary,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
              aria-label={isZoomed ? "Zoom out" : "Zoom in"}
              title={isZoomed ? "Zoom out" : "Zoom in"}
            >
              {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
            </button>
            
            {/* Info Button - only show if there's a description */}
            {images[activeIndex].description && (
              <button
                onClick={toggleInfo}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ 
                  backgroundColor: showInfo ? theme.primary : `${theme.cardBg}CC`,
                  color: showInfo ? 'white' : theme.primary,
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                }}
                aria-label={showInfo ? "Hide information" : "Show information"}
                title={showInfo ? "Hide information" : "Show information"}
              >
                <Info size={18} />
              </button>
            )}
          </div>
          
          {/* Image counter in top-left */}
          <div 
            className="absolute top-4 left-4 md:top-6 md:left-6 px-3 py-1.5 rounded-full z-20"
            style={{ 
              backgroundColor: `${theme.cardBg}CC`,
              color: theme.primaryDark,
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <span className="text-sm font-medium">{activeIndex + 1} / {images.length}</span>
          </div>
        </div>

        {/* Thumbnails Slider - In container for horizontal centering */}
        <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
          <div 
            className="w-full py-4 px-4 md:px-6 rounded-xl"
            style={{ 
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.borderColor}`,
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
            }}
          >
            <Swiper
              onSwiper={setThumbsSwiper}
              modules={[FreeMode, Navigation, Thumbs, A11y]}
              watchSlidesProgress={true}
              slidesPerView="auto"
              spaceBetween={12}
              freeMode={true}
              breakpoints={{
                0: { slidesPerView: 3.5 },
                480: { slidesPerView: 4.5 },
                640: { slidesPerView: 5.5 },
                768: { slidesPerView: 6.5 },
                1024: { slidesPerView: 8.5 },
              }}
              className="thumbnails-swiper"
            >
              {images.map((image, index) => (
                <SwiperSlide key={`thumb-${index}`} className="!w-auto !h-20 cursor-pointer">
                  <div 
                    className="relative h-full rounded-lg overflow-hidden transition-all duration-300"
                    style={{
                      aspectRatio: '3/2',
                      transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                      boxShadow: activeIndex === index ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "none",
                    }}
                  >
                    <Image
                      src={image.src}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover transition-all duration-300"
                      style={{
                        border: activeIndex === index 
                          ? `3px solid ${theme.primary}` 
                          : `1px solid ${theme.borderColor}`,
                        opacity: activeIndex === index ? 1 : 0.7,
                      }}
                      sizes="120px"
                    />
                    
                    {/* Thumbnail number indicator */}
                    <div 
                      className="absolute bottom-1 right-1 w-5 h-5 flex items-center justify-center rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: activeIndex === index ? theme.primary : `${theme.cardBg}CC`,
                        color: activeIndex === index ? 'white' : theme.primaryDark,
                      }}
                    >
                      {index + 1}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        
        {/* Keyboard shortcuts bar at bottom */}
        <div className="max-w-lg mx-auto mt-6 mb-14 px-4">
          <div 
            className="flex flex-wrap justify-center gap-3 py-3 px-4 rounded-full"
            style={{ 
              backgroundColor: theme.highlight,
              border: `1px solid ${theme.borderColor}`,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.03)",
            }}
          >
            <div className="flex items-center">
              <kbd className="px-2 py-1 rounded-md text-xs font-medium mr-1.5" style={{ backgroundColor: theme.cardBg, color: theme.text, border: `1px solid ${theme.borderColor}` }}>←</kbd>
              <span className="text-xs" style={{ color: theme.textSecondary }}>Previous</span>
            </div>
            <div className="flex items-center">
              <kbd className="px-2 py-1 rounded-md text-xs font-medium mr-1.5" style={{ backgroundColor: theme.cardBg, color: theme.text, border: `1px solid ${theme.borderColor}` }}>→</kbd>
              <span className="text-xs" style={{ color: theme.textSecondary }}>Next</span>
            </div>
            <div className="flex items-center">
              <kbd className="px-2 py-1 rounded-md text-xs font-medium mr-1.5" style={{ backgroundColor: theme.cardBg, color: theme.text, border: `1px solid ${theme.borderColor}` }}>Z</kbd>
              <span className="text-xs" style={{ color: theme.textSecondary }}>Zoom</span>
            </div>
            <div className="flex items-center">
              <kbd className="px-2 py-1 rounded-md text-xs font-medium mr-1.5" style={{ backgroundColor: theme.cardBg, color: theme.text, border: `1px solid ${theme.borderColor}` }}>I</kbd>
              <span className="text-xs" style={{ color: theme.textSecondary }}>Info</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}