'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Autoplay, EffectFade, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import only the specific CSS needed
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'

export default function CheryTiggoSection() {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const [isImagesLoaded, setIsImagesLoaded] = useState(Array(3).fill(false))
  const swiperRef = useRef(null)
  const sectionRef = useRef(null)

  // Enhanced models data
  const models = [
    {
      name: 'Tiggo 8',
      subtitle: 'Premium 7-Seater SUV',
      link: '/models/tiggo/tiggo8',
      image: '/images/models/tiggo-8.png',
      color: '#C8102E',
      darkColor: '#8A0C1F',
      specs: {
        engine: '1.6T GDI',
        power: '197 HP',
        torque: '290 Nm',
        transmission: '7-DCT',
        acceleration: '8.5s (0-100 km/h)',
        topSpeed: '200 km/h'
      },
      features: ['Panoramic Sunroof', 'Leather Seats', 'Smart Driving', 'Climate Control']
    },
    {
      name: 'Tiggo 7 Pro',
      subtitle: 'Stylish Compact SUV',
      link: '/models/tiggo/tiggo7',
      image: '/images/models/tiggo-7.png',
      color: '#0056B3',
      darkColor: '#003A7A',
      specs: {
        engine: '1.5T GDI',
        power: '156 HP',
        torque: '230 Nm',
        transmission: 'CVT',
        acceleration: '9.7s (0-100 km/h)',
        topSpeed: '185 km/h'
      },
      features: ['LED Headlights', 'Digital Cluster', 'Wireless Charging', 'Auto Parking']
    },
    {
      name: 'Tiggo Cross',
      subtitle: 'Urban Crossover',
      link: '/models/tiggo/tiggo4',
      image: '/images/models/tiggo-4.png',
      color: '#005E20',
      darkColor: '#00400A',
      specs: {
        engine: '1.5L',
        power: '145 HP',
        torque: '210 Nm',
        transmission: 'CVT',
        acceleration: '10.2s (0-100 km/h)',
        topSpeed: '175 km/h'
      },
      features: ['Smart Connect', 'Sport Mode', 'Keyless Entry', 'Hill Assist']
    },
  ]

  // Animation variants
  const animations = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 100
        }
      }
    },
    slide: {
      hidden: { opacity: 0, scale: 0.98 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { 
          duration: 0.5 
        }
      }
    },
    featureItem: {
      hidden: { opacity: 0, x: -10 },
      visible: i => ({
        opacity: 1,
        x: 0,
        transition: {
          delay: i * 0.1 + 0.2,
          duration: 0.4
        }
      })
    }
  }

  // Track image loading status
  const handleImageLoad = (index) => {
    const newLoadedStatus = [...isImagesLoaded]
    newLoadedStatus[index] = true
    setIsImagesLoaded(newLoadedStatus)
  }

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
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

  // Swiper configuration
  const swiperConfig = {
    modules: [Navigation, Autoplay, EffectFade],
    spaceBetween: 0,
    slidesPerView: 1,
    effect: 'fade',
    loop: true,
    speed: 800,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    onSwiper: (swiper) => {
      swiperRef.current = swiper
    },
    onSlideChange: (swiper) => {
      setActiveTabIndex(swiper.realIndex)
    }
  }

  return (
    <section 
      ref={sectionRef} 
      className="relative overflow-hidden w-full"
      style={{ 
        minHeight: '90vh',
        backgroundImage: `radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.05) 100%)`,
        backgroundColor: '#f8f9fa'
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <svg 
          className="absolute top-0 right-0 opacity-10 h-full w-auto" 
          viewBox="0 0 400 800" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M400,0 L400,800 C300,750 200,780 100,680 C50,630 0,550 0,450 C0,350 50,250 100,200 C200,100 300,50 400,0 Z" 
            fill={models[activeTabIndex]?.color || '#000000'}
          />
        </svg>
        <div 
          className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t"
          style={{ 
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.05), transparent)`,
          }}
        />
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-[120%] h-40 rounded-[100%] bg-white/20 backdrop-blur-sm" />
      </div>

      {/* Tire track decorative element */}
      <div className="absolute bottom-10 left-0 w-full h-20 opacity-5 pointer-events-none">
        <svg viewBox="0 0 1200 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,50 C200,70 400,30 600,50 C800,70 1000,30 1200,50" 
                stroke="#000" strokeWidth="8" strokeDasharray="10 15" fill="none"/>
          <path d="M0,70 C200,90 400,50 600,70 C800,90 1000,50 1200,70" 
                stroke="#000" strokeWidth="8" strokeDasharray="10 15" fill="none"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Section heading with animation */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="uppercase text-sm font-semibold tracking-widest text-gray-500 mb-2">Discover Our Lineup</h4>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">The Tiggo Family</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        {/* Navigation tabs */}
        <motion.div 
          className="flex justify-center mb-10 overflow-auto pb-2 gap-1"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {models.map((model, index) => (
            <button
              key={index}
              onClick={() => {
                if (swiperRef.current) {
                  swiperRef.current.slideTo(index + 1)
                }
              }}
              className={`relative px-6 py-3 min-w-[120px] rounded-full transition-all duration-300 text-sm font-medium ${
                activeTabIndex === index 
                  ? 'text-white shadow-lg' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              style={
                activeTabIndex === index 
                  ? { 
                      backgroundColor: models[index].color,
                      boxShadow: `0 10px 20px -10px ${models[index].color}80`
                    } 
                  : {}
              }
              aria-pressed={activeTabIndex === index}
              aria-label={`View ${model.name}`}
            >
              {model.name}
              {activeTabIndex === index && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-1 bg-white" 
                  layoutId="activeTab"
                  style={{ 
                    borderRadius: '2px',
                    bottom: '-2px',
                    opacity: 0.7,
                    height: '3px'
                  }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Left column: Vehicle details */}
          <motion.div 
            className="order-2 lg:order-1"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={animations.container}
          >
            <motion.h3 
              className="text-3xl md:text-4xl font-bold mb-2"
              variants={animations.item}
              style={{ color: models[activeTabIndex]?.darkColor || '#000' }}
            >
              {models[activeTabIndex]?.name}
            </motion.h3>
            
            <motion.p 
              className="text-xl text-gray-600 mb-6"
              variants={animations.item}
            >
              {models[activeTabIndex]?.subtitle}
            </motion.p>
            
            {/* Specs display */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
              variants={animations.item}
            >
              {Object.entries(models[activeTabIndex]?.specs || {}).map(([key, value], i) => (
                <div 
                  key={key} 
                  className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-100"
                >
                  <h4 className="text-xs uppercase tracking-wide text-gray-500 mb-1">{key}</h4>
                  <p className="font-semibold text-gray-800">{value}</p>
                </div>
              ))}
            </motion.div>
            
            {/* Features list */}
            <motion.div 
              className="mb-8"
              variants={animations.item}
            >
              <h4 className="text-lg font-semibold mb-3 text-gray-800">Key Features</h4>
              <div className="grid grid-cols-2 gap-2">
                {models[activeTabIndex]?.features.map((feature, i) => (
                  <motion.div 
                    key={i}
                    className="flex items-center text-gray-700"
                    custom={i}
                    variants={animations.featureItem}
                  >
                    <span 
                      className="w-2 h-2 mr-2 rounded-full" 
                      style={{ backgroundColor: models[activeTabIndex]?.color }}
                    ></span>
                    {feature}
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={animations.item}
            >
              <Link 
                href={models[activeTabIndex]?.link || '#'} 
                className="inline-flex items-center px-6 py-3 rounded-full text-white font-medium transition-all duration-300 transform hover:scale-105"
                style={{ 
                  backgroundColor: models[activeTabIndex]?.color,
                  boxShadow: `0 10px 20px -10px ${models[activeTabIndex]?.color}80`
                }}
              >
                Explore {models[activeTabIndex]?.name}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </Link>
              
              <button 
                className="inline-flex items-center px-6 py-3 rounded-full bg-white text-gray-700 font-medium border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm"
              >
                Book a Test Drive
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2" 
                  viewBox="0 0 20 20" 
                  fill="currentColor" 
                  style={{ color: models[activeTabIndex]?.color }}
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
          
          {/* Right column: Vehicle image */}
          <motion.div 
            className="order-1 lg:order-2 relative"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={animations.container}
          >
            {/* Car Display area */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200">
              {/* Circular platform */}
              <motion.div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90%] h-[20px] rounded-[100%]"
                animate={{
                  boxShadow: [
                    `0 0 40px 20px ${models[activeTabIndex]?.color}20`,
                    `0 0 60px 25px ${models[activeTabIndex]?.color}15`,
                    `0 0 40px 20px ${models[activeTabIndex]?.color}20`
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              {/* Swiper for vehicle images */}
              <Swiper {...swiperConfig} className="h-full w-full">
                {models.map((model, index) => (
                  <SwiperSlide key={index} className="h-full flex items-center justify-center">
                    <motion.div
                      className="relative h-full w-full flex items-center justify-center pt-6" 
                      variants={animations.slide}
                      initial="hidden"
                      animate={isInView && activeTabIndex === index ? "visible" : "hidden"}
                    >
                      {/* Show loading skeleton if image is not loaded */}
                      {!isImagesLoaded[index] && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full max-w-md h-32 rounded-lg bg-gray-200 animate-pulse" />
                        </div>
                      )}
                      
                      {/* The vehicle image with reflection effect */}
                      <div className="relative w-full max-w-lg mx-auto transform hover:scale-[1.02] transition-transform duration-500">
                        <Image
                          src={model.image}
                          alt={`${model.name} vehicle`}
                          width={800}
                          height={450}
                          priority={index === 0}
                          onLoad={() => handleImageLoad(index)}
                          className={`object-contain transform transition-opacity duration-700 ${
                            isImagesLoaded[index] ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                        
                        {/* Reflection */}
                        <div 
                          className="absolute bottom-0 left-0 w-full h-10 transform rotate-180 scale-y-[0.3] opacity-30 blur-sm"
                          style={{
                            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), transparent)',
                            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), transparent)'
                          }}
                        >
                          <Image
                            src={model.image}
                            alt=""
                            width={800}
                            height={450}
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
                
                {/* Custom navigation buttons */}
                <div className="swiper-button-prev !w-10 !h-10 !bg-white/70 !text-gray-800 rounded-full shadow-md backdrop-blur-sm !after:text-xl hover:!bg-white transition-colors" />
                <div className="swiper-button-next !w-10 !h-10 !bg-white/70 !text-gray-800 rounded-full shadow-md backdrop-blur-sm !after:text-xl hover:!bg-white transition-colors" />
              </Swiper>
            </div>
            
            {/* Car info badges */}
            <motion.div 
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium shadow-sm"
              variants={animations.item}
              style={{ color: models[activeTabIndex]?.color }}
            >
              {models[activeTabIndex]?.specs.engine}
            </motion.div>
            
            <motion.div 
              className="absolute bottom-4 right-4 flex items-center gap-2"
              variants={animations.item}
            >
              <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
                360° View
              </span>
              <span 
                className="flex items-center justify-center w-8 h-8 rounded-full shadow-md"
                style={{ backgroundColor: models[activeTabIndex]?.color }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </span>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Bottom feature bar */}
        <motion.div 
          className="mt-16 bg-white/80 backdrop-blur-sm py-6 px-8 rounded-2xl shadow-lg border border-gray-100 flex flex-wrap justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${models[activeTabIndex]?.color}15` }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor" style={{ color: models[activeTabIndex]?.color }}>
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Performance</h4>
              <p className="text-sm text-gray-500">Powerful engine options</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${models[activeTabIndex]?.color}15` }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor" style={{ color: models[activeTabIndex]?.color }}>
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0a6 6 0 11-12 0 6 6 0 0112 0zm-1.5 0a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Safety</h4>
              <p className="text-sm text-gray-500">5-star safety rating</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${models[activeTabIndex]?.color}15` }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor" style={{ color: models[activeTabIndex]?.color }}>
                <path d="M13 7H7v6h6V7z" />
                <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Technology</h4>
              <p className="text-sm text-gray-500">Advanced infotainment</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${models[activeTabIndex]?.color}15` }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor" style={{ color: models[activeTabIndex]?.color }}>
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Warranty</h4>
              <p className="text-sm text-gray-500">5-year/100,000 km</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
