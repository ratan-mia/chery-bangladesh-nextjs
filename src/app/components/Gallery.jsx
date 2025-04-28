'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { A11y, FreeMode, Keyboard, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/css/zoom'

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
  const mainSwiperRef = useRef(null)

  useEffect(() => {
    setIsMounted(true)
    return () => {
      if (thumbsSwiper && !thumbsSwiper.destroyed) thumbsSwiper.destroy()
      if (mainSwiperRef.current) mainSwiperRef.current.destroy()
    }
  }, [])

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex)
    if (onImageChange) onImageChange(swiper.activeIndex)
  }

  if (!isMounted || !images?.length) return null

  return (
    <div className={`w-full bg-gray-100 ${className}`}>
      {/* Header Section - Updated with design system styling */}
      <div className="text-center mb-12 w-full py-16 px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
          {title}
        </h2>
        <div className="w-24 h-1 bg-primary-700 mx-auto mb-8"></div>
        {subtitle && (
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-normal">
            {subtitle}
          </p>
        )}
      </div>

      {/* Main Gallery Container */}
      <div className="flex flex-col mb-16 w-full px-0">
        {/* Main Image Container */}
        <div className={`relative ${aspectRatio} w-full mb-6 bg-white shadow-md overflow-hidden`}>
          <Swiper
            onSwiper={(swiper) => { mainSwiperRef.current = swiper }}
            modules={[FreeMode, Navigation, Thumbs, Keyboard, A11y]}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            navigation={{
              nextEl: '.gallery-button-next',
              prevEl: '.gallery-button-prev',
            }}
            keyboard={{ enabled: true }}
            onSlideChange={handleSlideChange}
            grabCursor={true}
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
                    className="object-contain transition-transform duration-500"
                    sizes="100vw"
                    quality={90}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons - Updated with design system styling */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 sm:px-6 md:px-8 z-10">
            <button 
              className="gallery-button-prev w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/90 shadow-md text-primary-900 hover:bg-white hover:text-primary-700 transition-all duration-300"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className="gallery-button-next w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/90 shadow-md text-primary-900 hover:bg-white hover:text-primary-700 transition-all duration-300"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Bottom Controls Section */}
        <div className="w-full px-4 md:px-6">
          {/* Image Counter & Info */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-600">
              {activeIndex + 1} / {images.length}
            </span>
            {images[activeIndex].caption && (
              <p className="text-sm text-gray-600 max-w-2xl truncate">
                {images[activeIndex].caption}
              </p>
            )}
          </div>

          {/* Thumbnails Slider - Updated with design system styling */}
          <div className="w-full bg-white p-4 border-t border-b border-gray-200 shadow-sm">
            <Swiper
              onSwiper={setThumbsSwiper}
              modules={[FreeMode, Navigation, Thumbs, A11y]}
              watchSlidesProgress={true}
              slidesPerView="auto"
              spaceBetween={8}
              freeMode={true}
              breakpoints={{
                0: { slidesPerView: 4.5 },
                480: { slidesPerView: 5.5 },
                640: { slidesPerView: 6.5 },
                768: { slidesPerView: 7.5 },
                1024: { slidesPerView: 9.5 },
              }}
              className="thumbnails-swiper relative px-12"
            >
              {images.map((image, index) => (
                <SwiperSlide key={`thumb-${index}`} className="!w-auto !h-16 cursor-pointer">
                  <div className="relative h-full aspect-square overflow-hidden">
                    <Image
                      src={image.src}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className={`object-cover transition-all duration-300 ${
                        activeIndex === index 
                          ? 'border-2 border-primary-700 opacity-100' 
                          : 'border border-gray-200 opacity-60 hover:opacity-100'
                      }`}
                      sizes="100px"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}