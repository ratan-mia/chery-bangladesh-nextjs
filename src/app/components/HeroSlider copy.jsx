'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef(null)

  // Hero slides data
  const heroSlides = [
    {
      id: 'tiggo8',
      title: 'TIGGO 8',
      subtitle: 'Enjoy Your First Class',
      image: '/images/hero-slider/header-image.jpg', // Replace with your actual image path
      color: '#b7a99a', // Beige/Gold color from the button in the image
      link: '/models/tiggo8'
    },
    {
      id: 'tiggo9',
      title: 'TIGGO 9',
      subtitle: 'Beyond Extraordinary',
      image: '/images/hero-slider/slider2.jpg', // Replace with your actual image
      color: '#008770', // Teal color for Tiggo 9
      link: '/models/tiggo9'
    },
    {
      id: 'tiggo7pro',
      title: 'TIGGO 7 PRO',
      subtitle: 'Designed For Distinction',
      image: '/images/hero-slider/header-image.jpg', // Replace with your actual image
      color: '#00A8E8', // Blue color for Tiggo 7 Pro
      link: '/models/tiggo7-pro'
    }
  ]

  // Handle slide change
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex)
  }

  // Custom pagination UI (outside of Swiper)
  const goToSlide = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index)
    }
  }
  
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Main Slider */}
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        slidesPerView={1}
        navigation={{
          nextEl: '.hero-button-next',
          prevEl: '.hero-button-prev',
        }}
        pagination={{
          clickable: true,
          el: '.hero-pagination',
          bulletClass: 'hero-bullet',
          bulletActiveClass: 'hero-bullet-active',
          renderBullet: (index, className) => {
            return `<span class="${className}"></span>`
          }
        }}
        loop={true}
        speed={1000}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        onSlideChange={handleSlideChange}
        className="w-full h-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Dark gradient overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10"></div>
            
            {/* Background image */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="absolute bottom-24 md:bottom-32 left-8 md:left-16 z-20 max-w-lg">
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-3 tracking-wider">{slide.title}</h2>
              <p className="text-lg md:text-xl text-gray-100 mb-8">{slide.subtitle}</p>
              <Link href={slide.link}>
                <button 
                  className="px-12 py-3 text-white uppercase tracking-wider text-sm font-medium transition-colors duration-300"
                  style={{ backgroundColor: slide.color }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = 0.9}
                  onMouseOut={(e) => e.currentTarget.style.opacity = 1}
                >
                  Explore
                </button>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Navigation */}
      <div className="absolute bottom-8 right-8 md:right-16 z-30 flex items-center space-x-4">
        <button className="hero-button-prev w-10 h-10 flex items-center justify-center border border-white/30 text-white hover:bg-white/10 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button className="hero-button-next w-10 h-10 flex items-center justify-center border border-white/30 text-white hover:bg-white/10 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
      
      {/* Slide Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-8 h-1 transition-all ${
                activeIndex === index 
                  ? 'bg-white'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Slide Counter */}
      <div className="absolute top-8 right-8 md:right-16 z-30 flex items-center">
        <span className="text-white text-lg">
          <span className="font-bold">{(activeIndex % heroSlides.length) + 1}</span>
          <span className="mx-2 opacity-40">/</span>
          <span className="opacity-40">{heroSlides.length}</span>
        </span>
      </div>
    </div>
  )
}