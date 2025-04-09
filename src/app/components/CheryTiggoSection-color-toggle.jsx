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

// Theme configuration based on the Climate Design System
const themes = {
  dark: {
    accent: '#e2cdb8',       // Lighter tan for better contrast
    text: '#ffffff',         // Pure white text
    textSecondary: 'rgba(255, 255, 255, 0.95)', // Higher opacity for better readability
    buttonBg: '#e2cdb8',     // Accent color for primary button
    buttonText: '#111827',   // Dark text on primary button
    accentLine: '#e2cdb8',   // Accent line color
    contentBg: 'rgba(17, 24, 39, 0.85)', // Semi-transparent background for text content
    backgroundOverlay: 'rgba(17, 24, 39, 0.97)',
    cardBg: 'rgba(30, 41, 59, 0.95)',
    featureIconBg: 'rgba(226, 205, 184, 0.15)'
  },
  light: {
    accent: '#1a365d',       // Deep blue color
    text: '#111827',         // Dark text
    textSecondary: 'rgba(26, 32, 44, 0.95)', // Higher opacity for better readability
    buttonBg: '#1a365d',     // Accent color for primary button
    buttonText: '#ffffff',   // White text on primary button
    accentLine: '#1a365d',   // Accent line color
    contentBg: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background
    backgroundOverlay: 'rgba(255, 255, 255, 0.97)',
    cardBg: 'rgba(241, 245, 249, 0.95)',
    featureIconBg: 'rgba(26, 54, 93, 0.1)'
  }
}

export default function CheryTiggoSection() {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const [currentTheme, setCurrentTheme] = useState('dark') // Default to dark theme
  const swiperRef = useRef(null)
  const sectionRef = useRef(null)
  const [isInitialized, setIsInitialized] = useState(false)
  
  // Get current theme
  const theme = themes[currentTheme]
  
  // Toggle theme function (can be connected to a button or system preference)
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark')
  }

  // Models data
  const models = [
    {
      name: 'Tiggo 8',
      subtitle: 'Premium 7-Seater SUV',
      link: '/models/tiggo/tiggo8',
      image: '/images/models/tiggo-8.png',
      specs: {
        engine: '1.6T GDI',
        power: '197 HP',
        torque: '290 Nm',
        transmission: '7-DCT'
      },
      features: ['Panoramic Sunroof', 'Leather Seats', 'Smart Driving', 'Climate Control']
    },
    {
      name: 'Tiggo 7 Pro',
      subtitle: 'Stylish Compact SUV',
      link: '/models/tiggo/tiggo7',
      image: '/images/models/tiggo-7.png',
      specs: {
        engine: '1.5T GDI',
        power: '156 HP',
        torque: '230 Nm',
        transmission: 'CVT'
      },
      features: ['LED Headlights', 'Digital Cluster', 'Wireless Charging', 'Auto Parking']
    },
    {
      name: 'Tiggo Cross',
      subtitle: 'Urban Crossover',
      link: '/models/tiggo/tiggo4',
      image: '/images/models/tiggo-4.png',
      specs: {
        engine: '1.5L',
        power: '145 HP',
        torque: '210 Nm',
        transmission: 'CVT'
      },
      features: ['Smart Connect', 'Sport Mode', 'Keyless Entry', 'Hill Assist']
    },
  ]

  // Animation variants - simplified for cleaner animations
  const animations = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.1
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 10 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3
        }
      }
    }
  }

  // Observer to check if section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1 }
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

  // Initialize swiper on first render and handle tab changes
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      if (swiperRef.current.swiper.activeIndex !== activeTabIndex) {
        swiperRef.current.swiper.slideTo(activeTabIndex)
      }
    }
    
    if (!isInitialized) {
      setIsInitialized(true)
    }
  }, [activeTabIndex, isInitialized])

  // Handle tab click
  const handleTabClick = (index) => {
    if (index !== activeTabIndex) {
      setActiveTabIndex(index)
    }
  }

  // Handle slider change
  const handleSlideChange = (swiper) => {
    if (swiper.activeIndex !== activeTabIndex) {
      setActiveTabIndex(swiper.activeIndex)
    }
  }

  return (
    <section 
      ref={sectionRef} 
      className="py-20 relative overflow-hidden"
      style={{ 
        backgroundColor: theme.backgroundOverlay,
        color: theme.text
      }}
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 z-0"
          style={{ backgroundColor: theme.backgroundOverlay }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Accent line element */}
        <div className="flex justify-center mb-6">
          <motion.div 
            className="h-1 w-24"
            style={{ backgroundColor: theme.accentLine }}
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 0.6 }}
          ></motion.div>
        </div>

        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
        >
          <h2 
            className="text-3xl md:text-4xl font-bold mb-3 tracking-tight"
            style={{ color: theme.text }}
          >
            Discover the Tiggo Family
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: theme.textSecondary }}
          >
            Versatile SUVs designed for every lifestyle with cutting-edge technology
          </p>
        </motion.div>

        {/* Clean, Flat Tabs navigation */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Mobile tab dropdown for smaller screens */}
          <div className="md:hidden w-full max-w-xs">
            <select 
              value={activeTabIndex} 
              onChange={(e) => handleTabClick(Number(e.target.value))}
              className="w-full p-3 border-0 border-b focus:outline-none focus:border-primary"
              style={{ 
                backgroundColor: theme.contentBg,
                borderColor: `${theme.accentLine}40`,
                color: theme.text
              }}
            >
              {models.map((model, index) => (
                <option key={index} value={index}>{model.name}</option>
              ))}
            </select>
          </div>

          {/* Desktop tabs - flat and professional */}
          <div 
            className="hidden md:flex w-full max-w-xl mx-auto"
            style={{ borderBottom: `1px solid ${theme.accentLine}30` }}
          >
            {models.map((model, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={`
                  relative flex-1 text-center px-6 py-3 font-medium transition-all duration-200
                `}
                style={{
                  color: activeTabIndex === index ? theme.accent : theme.textSecondary,
                  borderBottom: activeTabIndex === index ? `2px solid ${theme.accent}` : '2px solid transparent'
                }}
                aria-selected={activeTabIndex === index}
                role="tab"
                aria-controls={`tab-panel-${index}`}
                id={`tab-${index}`}
              >
                {model.name}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Vehicle image with Swiper - clean presentation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative order-2 md:order-1"
          >
            <Swiper
              ref={swiperRef}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              speed={400}
              allowTouchMove={true}
              modules={[EffectFade, Navigation, Autoplay]}
              onSlideChange={handleSlideChange}
              className="w-full"
              initialSlide={activeTabIndex}
            >
              {models.map((model, index) => (
                <SwiperSlide 
                  key={index} 
                  className="flex justify-center items-center"
                  role="tabpanel"
                  aria-labelledby={`tab-${index}`}
                  id={`tab-panel-${index}`}
                >
                  <div className="relative w-full h-64 md:h-80 lg:h-96">
                    {/* Flat minimal platform with glow effect */}
                    <div 
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-1"
                      style={{ backgroundColor: `${theme.accent}30` }}
                    ></div>
                    
                    {/* Glow effect under the vehicle */}
                    <div 
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-6 blur-xl"
                      style={{ backgroundColor: `${theme.accent}20` }}
                    ></div>
                    
                    {/* Clean vehicle image */}
                    <div className="relative w-full h-full">
                      <Image
                        src={model.image || "https://placehold.co/800x400/png"}
                        alt={model.name}
                        fill
                        style={{ objectFit: "contain" }}
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Clean, minimal navigation buttons */}
            <div className="flex justify-between mt-6">
              <button 
                onClick={() => {
                  if (activeTabIndex > 0) {
                    handleTabClick(activeTabIndex - 1)
                  }
                }}
                disabled={activeTabIndex === 0}
                className="p-2 border"
                style={{
                  borderColor: activeTabIndex === 0 ? `${theme.accentLine}30` : `${theme.accentLine}60`,
                  color: activeTabIndex === 0 ? `${theme.textSecondary}30` : theme.textSecondary,
                  cursor: activeTabIndex === 0 ? 'not-allowed' : 'pointer'
                }}
                aria-label="Previous model"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={() => {
                  if (activeTabIndex < models.length - 1) {
                    handleTabClick(activeTabIndex + 1)
                  }
                }}
                disabled={activeTabIndex === models.length - 1}
                className="p-2 border"
                style={{
                  borderColor: activeTabIndex === models.length - 1 ? `${theme.accentLine}30` : `${theme.accentLine}60`,
                  color: activeTabIndex === models.length - 1 ? `${theme.textSecondary}30` : theme.textSecondary,
                  cursor: activeTabIndex === models.length - 1 ? 'not-allowed' : 'pointer'
                }}
                aria-label="Next model"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Vehicle info - clean and organized */}
          <motion.div
            variants={animations.container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="order-1 md:order-2"
          >
            <motion.div variants={animations.item} className="mb-6">
              <h3 
                className="text-3xl font-bold mb-2"
                style={{ color: theme.text }}
              >
                {models[activeTabIndex]?.name}
              </h3>
              <p 
                className="text-lg"
                style={{ color: theme.textSecondary }}
              >
                {models[activeTabIndex]?.subtitle}
              </p>
            </motion.div>

            <motion.div variants={animations.item} className="mb-8">
              <div 
                className="p-6 backdrop-blur-sm"
                style={{ 
                  backgroundColor: theme.cardBg,
                  borderTop: `1px solid ${theme.accentLine}40`
                }}
              >
                <h4 
                  className="text-lg font-medium mb-4"
                  style={{ color: theme.text }}
                >
                  Key Specifications
                </h4>
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <p 
                      className="text-sm mb-1"
                      style={{ color: `${theme.textSecondary}90` }}
                    >
                      Engine
                    </p>
                    <p 
                      className="font-medium"
                      style={{ color: theme.text }}
                    >
                      {models[activeTabIndex]?.specs.engine}
                    </p>
                  </div>
                  <div>
                    <p 
                      className="text-sm mb-1"
                      style={{ color: `${theme.textSecondary}90` }}
                    >
                      Power
                    </p>
                    <p 
                      className="font-medium"
                      style={{ color: theme.text }}
                    >
                      {models[activeTabIndex]?.specs.power}
                    </p>
                  </div>
                  <div>
                    <p 
                      className="text-sm mb-1"
                      style={{ color: `${theme.textSecondary}90` }}
                    >
                      Torque
                    </p>
                    <p 
                      className="font-medium"
                      style={{ color: theme.text }}
                    >
                      {models[activeTabIndex]?.specs.torque}
                    </p>
                  </div>
                  <div>
                    <p 
                      className="text-sm mb-1"
                      style={{ color: `${theme.textSecondary}90` }}
                    >
                      Transmission
                    </p>
                    <p 
                      className="font-medium"
                      style={{ color: theme.text }}
                    >
                      {models[activeTabIndex]?.specs.transmission}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={animations.item} className="mb-8">
              <h4 
                className="text-lg font-medium mb-4"
                style={{ color: theme.text }}
              >
                Featured Highlights
              </h4>
              <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                {models[activeTabIndex]?.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-5 h-5 flex items-center justify-center mr-3"
                      style={{ backgroundColor: theme.featureIconBg }}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-3 w-3" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                        style={{ color: theme.accent }}
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span style={{ color: theme.textSecondary }}>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={animations.item}>
              <Link href={models[activeTabIndex]?.link || "#"}>
                <span 
                  className="inline-flex items-center px-6 py-3 font-medium transition-colors duration-200"
                  style={{ 
                    backgroundColor: theme.buttonBg,
                    color: theme.buttonText
                  }}
                >
                  Explore {models[activeTabIndex]?.name}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Feature highlights with flat, minimal design */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Feature cards - flat and clean */}
          <div 
            className="p-5 backdrop-blur-sm"
            style={{ 
              backgroundColor: theme.cardBg,
              borderTop: `1px solid ${theme.accentLine}40`
            }}
          >
            <div 
              className="w-10 h-1 mb-4"
              style={{ backgroundColor: theme.accent }}
            ></div>
            <h4 
              className="font-medium mb-2"
              style={{ color: theme.text }}
            >
              Performance
            </h4>
            <p 
              className="text-sm"
              style={{ color: `${theme.textSecondary}90` }}
            >
              Powerful and efficient engines for optimal driving
            </p>
          </div>
          
          <div 
            className="p-5 backdrop-blur-sm"
            style={{ 
              backgroundColor: theme.cardBg,
              borderTop: `1px solid ${theme.accentLine}40`
            }}
          >
            <div 
              className="w-10 h-1 mb-4"
              style={{ backgroundColor: theme.accent }}
            ></div>
            <h4 
              className="font-medium mb-2"
              style={{ color: theme.text }}
            >
              Safety
            </h4>
            <p 
              className="text-sm"
              style={{ color: `${theme.textSecondary}90` }}
            >
              Advanced driver assistance systems for peace of mind
            </p>
          </div>
          
          <div 
            className="p-5 backdrop-blur-sm"
            style={{ 
              backgroundColor: theme.cardBg,
              borderTop: `1px solid ${theme.accentLine}40`
            }}
          >
            <div 
              className="w-10 h-1 mb-4"
              style={{ backgroundColor: theme.accent }}
            ></div>
            <h4 
              className="font-medium mb-2"
              style={{ color: theme.text }}
            >
              Technology
            </h4>
            <p 
              className="text-sm"
              style={{ color: `${theme.textSecondary}90` }}
            >
              Intuitive infotainment and connectivity features
            </p>
          </div>
          
          <div 
            className="p-5 backdrop-blur-sm"
            style={{ 
              backgroundColor: theme.cardBg,
              borderTop: `1px solid ${theme.accentLine}40`
            }}
          >
            <div 
              className="w-10 h-1 mb-4"
              style={{ backgroundColor: theme.accent }}
            ></div>
            <h4 
              className="font-medium mb-2"
              style={{ color: theme.text }}
            >
              Warranty
            </h4>
            <p 
              className="text-sm"
              style={{ color: `${theme.textSecondary}90` }}
            >
              Comprehensive 5-year/100,000 km coverage
            </p>
          </div>
        </motion.div>
        
        {/* Theme toggle button - for testing theme changes */}
        <div className="flex justify-center mt-12">
          <button 
            onClick={toggleTheme}
            className="px-4 py-2 text-sm rounded-md" 
            style={{
              backgroundColor: theme.cardBg,
              color: theme.textSecondary,
              border: `1px solid ${theme.accentLine}40`
            }}
          >
            Toggle to {currentTheme === 'dark' ? 'Light' : 'Dark'} Theme
          </button>
        </div>
      </div>
    </section>
  )
}