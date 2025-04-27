'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
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
 * A clean, white, full-width gallery component with thumbnail navigation
 * 
 * @param {Object} props
 * @param {Array} props.images - Array of image objects with src and alt
 * @param {string} props.title - Gallery section title
 * @param {string} props.subtitle - Optional subtitle for the gallery section
 * @param {string} props.aspectRatio - Aspect ratio of the main image container (default: 'aspect-[21/9]')
 * @param {function} props.onImageChange - Callback when active image changes
 * @returns {JSX.Element} Gallery component
 */
export default function Gallery({ 
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
    <div className="w-full bg-white">
      {/* Section Header */}
      <div className="text-center mb-8 max-w-7xl py-5 mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
      
      {/* Main Gallery Container - Full Width */}
      <div className="flex flex-col mb-12">
        {/* Main Image Slider */}
        <div className={`relative ${aspectRatio} w-full mb-4 bg-white overflow-hidden`}>
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
                <div className="relative h-full w-full">
                  <Image
                    src={image.src}
                    alt={image.alt || `Gallery image ${index + 1}`}
                    fill
                    priority={index === 0}
                    className="object-cover object-center"
                    sizes="100vw"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom navigation buttons */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 sm:px-8 md:px-12 lg:px-20 z-10 pointer-events-none">
            <button 
              className="gallery-button-prev w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white shadow-md text-gray-800 pointer-events-auto hover:bg-gray-50 transition-colors duration-300"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className="gallery-button-next w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white shadow-md text-gray-800 pointer-events-auto hover:bg-gray-50 transition-colors duration-300"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        
        {/* Image Counter and Thumbnails Container */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
          {/* Image counter */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">
              Image {activeIndex + 1} of {images.length}
            </span>
          </div>
          
          {/* Thumbnails Slider */}
          <div className="w-full">
            <Swiper
              onSwiper={setThumbsSwiper}
              modules={[FreeMode, Navigation, Thumbs, A11y]}
              watchSlidesProgress={true}
              slidesPerView="auto"
              spaceBetween={12}
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
              className="thumbnails-swiper relative px-12"
            >
              {images.map((image, index) => (
                <SwiperSlide key={`thumb-slide-${index}`} className="!w-auto !h-20 cursor-pointer relative">
                  <div className="relative h-full aspect-square">
                    <Image
                      src={image.src}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className={`object-cover transition-all duration-200 ${activeIndex === index 
                        ? 'border-2 border-gray-900' 
                        : 'border border-gray-200 opacity-70 hover:opacity-100'}`}
                      sizes="100px"
                    />
                  </div>
                </SwiperSlide>
              ))}
              
              {/* Thumbnail navigation controls */}
              <div className="thumb-button-prev absolute left-0 top-0 bottom-0 z-10 flex items-center justify-center">
                <button className="w-8 h-8 flex items-center justify-center bg-white shadow-sm text-gray-800 hover:bg-gray-50 transition-colors">
                  <ChevronLeft size={16} />
                </button>
              </div>
              <div className="thumb-button-next absolute right-0 top-0 bottom-0 z-10 flex items-center justify-center">
                <button className="w-8 h-8 flex items-center justify-center bg-white shadow-sm text-gray-800 hover:bg-gray-50 transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}