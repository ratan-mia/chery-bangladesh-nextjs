'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Info, ZoomIn, ZoomOut } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { A11y, FreeMode, Keyboard, Navigation, Thumbs, Zoom } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/css/zoom'

// Refined theme configuration with earth tones from other components
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
  
  // Typography
  fontHeading: "font-serif",
  fontBody: "font-sans",
  letterSpacingHeading: "tracking-tight",
  letterSpacingBody: "tracking-normal",
  letterSpacingCaption: "tracking-wide",
  
  // Shadows and effects
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  hoverShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
  focusRing: "0 0 0 3px rgba(140, 115, 93, 0.3)"
};

export default function Gallery({
  images,
  title = 'Gallery',
  subtitle,
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
      {/* Header Section - Updated with design system styling */}
      <div className="text-center mb-16 w-full py-16 px-4 md:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="flex justify-center mb-4"
        >
          <div
            className="h-1 transition-all duration-700 ease-out"
            style={{
              backgroundColor: theme.primary,
              width: isInView ? "120px" : "0",
            }}
          />
        </motion.div>
        
        <motion.h2 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={slideUp}
          className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${theme.fontHeading} ${theme.letterSpacingHeading}`}
          style={{ color: theme.text }}
        >
          {title}
        </motion.h2>
        
        {subtitle && (
          <motion.p 
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideUp}
            className={`text-lg max-w-3xl mx-auto leading-relaxed ${theme.fontBody} ${theme.letterSpacingBody}`}
            style={{ color: theme.textSecondary }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Main Gallery Container - with max-width for better presentation */}
      <div className="max-w-7xl mx-auto flex flex-col mb-20 w-full">
        {/* Main Image Container with refined styling */}
        <div 
          className={`relative ${aspectRatio} w-full mb-8 overflow-hidden rounded-md shadow-xl`}
          style={{ 
            backgroundColor: theme.cardBg,
            border: `1px solid ${theme.borderColor}`
          }}
        >
          {/* Decorative accent bar */}
          <div 
            className="absolute top-0 left-0 right-0 h-1 z-10"
            style={{ backgroundColor: theme.primary }}
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
                    className={`object-contain transition-transform duration-500 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                    sizes="(max-width: 768px) 100vw, 80vw"
                    quality={95}
                    onClick={toggleZoom}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Image Information Panel - enhanced design */}
          <AnimatePresence>
            {showInfo && images[activeIndex].description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 p-5 md:p-7 z-20 backdrop-blur-sm"
                style={{ backgroundColor: 'rgba(45, 42, 38, 0.8)' }}
              >
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-white text-lg md:text-xl font-semibold mb-2">
                    {images[activeIndex].caption || 'Image Details'}
                  </h3>
                  <div className="w-16 h-0.5 bg-white/40 mb-3" />
                  <p className="text-white/90 text-sm md:text-base leading-relaxed">
                    {images[activeIndex].description}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons - enhanced with hover effects */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 sm:px-6 md:px-8 z-10">
            <button 
              className="gallery-button-prev w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ 
                backgroundColor: `${theme.cardBg}E6`,
                color: theme.primary,
                boxShadow: theme.boxShadow,
                focusRing: theme.focusRing
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className="gallery-button-next w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ 
                backgroundColor: `${theme.cardBg}E6`,
                color: theme.primary,
                boxShadow: theme.boxShadow,
                focusRing: theme.focusRing
              }}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Action buttons - repositioned for better visibility */}
          <div className="absolute top-4 right-4 flex space-x-2 z-30">
            {/* Zoom Button */}
            <button
              onClick={toggleZoom}
              className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ 
                backgroundColor: `${theme.cardBg}E6`,
                color: theme.primary,
                boxShadow: theme.boxShadow
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
                className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ 
                  backgroundColor: showInfo ? theme.primary : `${theme.cardBg}E6`,
                  color: showInfo ? 'white' : theme.primary,
                  boxShadow: theme.boxShadow
                }}
                aria-label={showInfo ? "Hide information" : "Show information"}
                title={showInfo ? "Hide information" : "Show information"}
              >
                <Info size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Refined Controls Section */}
        <div className="w-full max-w-5xl mx-auto px-4 md:px-0">
          {/* Enhanced Thumbnails & Controls Layout */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
            {/* Left: Image Counter & Caption */}
            <div 
              className="flex justify-between items-center px-5 py-3 rounded-md md:flex-1"
              style={{ 
                backgroundColor: theme.highlight,
                border: `1px solid ${theme.borderColor}`
              }}
            >
              <div className="flex flex-col">
                <span 
                  className="text-sm font-medium mb-1"
                  style={{ color: theme.primaryDark }}
                >
                  Image {activeIndex + 1} of {images.length}
                </span>
                
                {images[activeIndex].caption && (
                  <p 
                    className="text-sm md:text-base max-w-2xl truncate font-medium"
                    style={{ color: theme.text }}
                  >
                    {images[activeIndex].caption}
                  </p>
                )}
              </div>
              
              {/* Keyboard shortcuts hint - moved to the right side */}
              <div className="hidden md:flex items-center ml-auto">
                <div className="flex space-x-1">
                  <kbd className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: theme.cardBg, color: theme.text, border: `1px solid ${theme.borderColor}` }}>←</kbd> 
                  <kbd className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: theme.cardBg, color: theme.text, border: `1px solid ${theme.borderColor}` }}>→</kbd>
                </div>
              </div>
            </div>
          </div>
          
          {/* Thumbnails Slider - Enhanced design */}
          <div 
            className="w-full p-4 md:p-5 rounded-md"
            style={{ 
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.borderColor}`,
              boxShadow: theme.boxShadow
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
              className="thumbnails-swiper relative px-14"
            >
              {images.map((image, index) => (
                <SwiperSlide key={`thumb-${index}`} className="!w-auto !h-20 cursor-pointer">
                  <div 
                    className="relative h-full rounded-md overflow-hidden transition-all duration-300 shadow-sm"
                    style={{
                      aspectRatio: '1/1',
                      transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)'
                    }}
                  >
                    <Image
                      src={image.src}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className={`object-cover transition-all duration-300`}
                      style={{
                        border: activeIndex === index 
                          ? `2px solid ${theme.primary}` 
                          : `1px solid ${theme.borderColor}`,
                        opacity: activeIndex === index ? 1 : 0.7,
                      }}
                      sizes="100px"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          
          {/* Keyboard shortcuts hint - Mobile version */}
          <div className="mt-6 text-center md:hidden">
            <p 
              className="text-xs"
              style={{ color: theme.textSecondary }}
            >
              Keyboard shortcuts: <kbd className="px-1.5 py-0.5 mx-0.5 rounded text-xs" style={{ backgroundColor: theme.highlight, color: theme.text, border: `1px solid ${theme.borderColor}` }}>←</kbd> 
              <kbd className="px-1.5 py-0.5 mx-0.5 rounded text-xs" style={{ backgroundColor: theme.highlight, color: theme.text, border: `1px solid ${theme.borderColor}` }}>→</kbd> to navigate, 
              <kbd className="px-1.5 py-0.5 mx-0.5 rounded text-xs" style={{ backgroundColor: theme.highlight, color: theme.text, border: `1px solid ${theme.borderColor}` }}>Z</kbd> to zoom, 
              <kbd className="px-1.5 py-0.5 mx-0.5 rounded text-xs" style={{ backgroundColor: theme.highlight, color: theme.text, border: `1px solid ${theme.borderColor}` }}>I</kbd> for info
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}