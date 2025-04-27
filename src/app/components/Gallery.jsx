'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { A11y, FreeMode, Keyboard, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

/**
 * A premium gallery component following Chery Bangladesh design guidelines
 * 
 * @param {Object} props
 * @param {Array} props.images - Array of image objects with src and alt
 * @param {string} props.title - Gallery section title
 * @param {string} props.subtitle - Optional subtitle for the gallery section
 * @param {string} props.aspectRatio - Aspect ratio of the main image container (default: 'aspect-[16/9]')
 * @param {function} props.onImageChange - Callback when active image changes
 * @returns {JSX.Element} Gallery component
 */
export default function CherryGallery({ 
  images,
  title = 'Gallery',
  subtitle,
  aspectRatio = 'aspect-[16/9]',
  onImageChange
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const mainSwiperRef = useRef(null)
  
  // Handle slide change
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex)
    if (onImageChange) {
      onImageChange(swiper.activeIndex)
    }
  }
  
  // Set mounted state to avoid hydration issues
  useEffect(() => {
    setIsMounted(true)
    return () => {
      if (thumbsSwiper && !thumbsSwiper.destroyed) {
        thumbsSwiper.destroy()
      }
      if (mainSwiperRef.current) {
        mainSwiperRef.current.destroy()
      }
    }
  }, [])
  
  // If not mounted yet or no images, render nothing to avoid hydration mismatch
  if (!isMounted || !images || images.length === 0) {
    return null
  }
  
  return (
    <div className="w-full max-w-7xl mx-auto py-5 px-4 md:px-6">
      {/* Section Header with Chery styling */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h2>
        <div className="w-24 h-1 bg-primary-700 mx-auto mb-6"></div>
        {subtitle && (
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
      
      {/* Main Gallery Container */}
      <div className="flex flex-col mb-16">
        {/* Main Image Slider */}
        <div className={`relative ${aspectRatio} w-full mb-3 overflow-hidden`}>
          <Swiper
            onSwiper={(swiper) => {
              mainSwiperRef.current = swiper
            }}
            modules={[FreeMode, Navigation, Thumbs, Keyboard, A11y]}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            navigation={{
              nextEl: '.gallery-button-next',
              prevEl: '.gallery-button-prev',
            }}
            keyboard={{
              enabled: true,
            }}
            onSlideChange={handleSlideChange}
            grabCursor={true}
            loop={false}
            className="h-full w-full"
          >
            {images.map((image, index) => (
              <SwiperSlide key={`main-slide-${index}`} className="h-full w-full">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt || `Gallery image ${index + 1}`}
                    fill
                    priority={index === 0}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom navigation buttons with Chery styling */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 sm:px-6 z-10 pointer-events-none">
            <button 
              className="gallery-button-prev w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-gray-900 dark:text-white pointer-events-auto hover:bg-primary-700 hover:text-white transition-colors duration-300"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button 
              className="gallery-button-next w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-gray-900 dark:text-white pointer-events-auto hover:bg-primary-700 hover:text-white transition-colors duration-300"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Image Information Bar */}
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {activeIndex + 1} / {images.length}
          </span>
          
          <div className="inline-flex items-center text-sm font-medium text-primary-700 tracking-wider hover:text-primary-900 transition-colors duration-300 group cursor-pointer">
            VIEW ALL
            <ArrowRight
              size={16}
              className="ml-2 group-hover:ml-3 transition-all duration-300"
            />
          </div>
        </div>
        
        {/* Thumbnails Slider with Chery styling */}
        <div className="w-full">
          <Swiper
            onSwiper={setThumbsSwiper}
            modules={[FreeMode, Navigation, Thumbs, A11y]}
            watchSlidesProgress={true}
            slidesPerView="auto"
            spaceBetween={8}
            freeMode={true}
            navigation={{
              nextEl: '.thumb-button-next',
              prevEl: '.thumb-button-prev',
            }}
            breakpoints={{
              0: { slidesPerView: 3.5 },
              480: { slidesPerView: 4.5 },
              640: { slidesPerView: 5.5 },
              768: { slidesPerView: 6.5 },
              1024: { slidesPerView: 8.5 },
            }}
            className="thumbnails-swiper relative px-10"
          >
            {images.map((image, index) => (
              <SwiperSlide key={`thumb-slide-${index}`} className="!w-auto !h-20 cursor-pointer relative">
                <div className="relative h-full aspect-square">
                  <Image
                    src={image.src}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className={`object-cover transition-opacity duration-300 ${activeIndex === index ? 'opacity-100' : 'opacity-60 hover:opacity-90'}`}
                    sizes="100px"
                  />
                  {/* Accent border for active thumbnail */}
                  <div className={`absolute inset-0 pointer-events-none border-2 border-transparent transition-colors duration-300 ${activeIndex === index ? 'border-primary-800' : ''}`}></div>
                  {/* Bottom accent line that appears on active thumbnail */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200">
                    <div className={`h-full bg-primary-700 transition-all duration-300 ${activeIndex === index ? 'w-full' : 'w-0'}`}></div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            
            {/* Thumbnail navigation controls with gradient fade */}
            <div className="thumb-button-prev absolute left-0 top-0 bottom-0 w-10 z-10 flex items-center justify-center bg-gradient-to-r from-white/90 dark:from-gray-900/90 to-transparent cursor-pointer">
              <button className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-primary-700 hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            </div>
            <div className="thumb-button-next absolute right-0 top-0 bottom-0 w-10 z-10 flex items-center justify-center bg-gradient-to-l from-white/90 dark:from-gray-900/90 to-transparent cursor-pointer">
              <button className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-primary-700 hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  )
}