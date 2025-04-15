'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

// Theme configuration with a more minimal and professional palette
const themes = {
  dark: {
    bg: '#121212',
    surface: '#1e1e1e',
    surfaceHighlight: '#2a2a2a',
    primary: '#e0c6b0',  // Refined tan accent
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    border: 'rgba(255, 255, 255, 0.1)',
    shadow: '0 4px 20px rgba(0, 0, 0, 0.25)'
  },
  light: {
    bg: '#f8f9fa',
    surface: '#ffffff',
    surfaceHighlight: '#f0f2f5',
    primary: '#8c735d',  // Deep brown accent
    text: '#1a1a1a',
    textSecondary: 'rgba(26, 26, 26, 0.7)',
    border: 'rgba(0, 0, 0, 0.1)',
    shadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
  }
}

export default function CheryTiggoSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const [currentTheme, setCurrentTheme] = useState('light')
  const sectionRef = useRef(null)
  
  const theme = themes[currentTheme]
  
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark')
  }

  // Models data - simplified
  const models = [
    {
      name: 'Tiggo 8',
      subtitle: 'Premium 7-Seater SUV',
      link: '/models/tiggo/tiggo8',
      image: '/images/models/tiggo-8.png',
      specs: [
        { label: 'Engine', value: '1.6T GDI' },
        { label: 'Power', value: '197 HP' },
        { label: 'Torque', value: '290 Nm' },
        { label: 'Transmission', value: '7-DCT' }
      ],
      features: ['Panoramic Sunroof', 'Leather Seats', 'Smart Driving', 'Climate Control']
    },
    {
      name: 'Tiggo 7 Pro',
      subtitle: 'Stylish Compact SUV',
      link: '/models/tiggo/tiggo7',
      image: '/images/models/tiggo-7.png',
      specs: [
        { label: 'Engine', value: '1.5T GDI' },
        { label: 'Power', value: '156 HP' },
        { label: 'Torque', value: '230 Nm' },
        { label: 'Transmission', value: 'CVT' }
      ],
      features: ['LED Headlights', 'Digital Cluster', 'Wireless Charging', 'Auto Parking']
    },
    {
      name: 'Tiggo Cross',
      subtitle: 'Urban Crossover',
      link: '/models/tiggo/tiggo4',
      image: '/images/models/tiggo-4.png',
      specs: [
        { label: 'Engine', value: '1.5L' },
        { label: 'Power', value: '145 HP' },
        { label: 'Torque', value: '210 Nm' },
        { label: 'Transmission', value: 'CVT' }
      ],
      features: ['Smart Connect', 'Sport Mode', 'Keyless Entry', 'Hill Assist']
    },
  ]

  // Set up intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
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

  return (
    <section 
      ref={sectionRef} 
      className="py-16 md:py-24 w-full overflow-hidden transition-colors duration-300"
      style={{ 
        backgroundColor: theme.bg,
        color: theme.text
      }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Theme toggle - minimal version */}
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleTheme}
            className="p-2  transition-all duration-300"
            style={{
              backgroundColor: `${theme.surfaceHighlight}`,
              border: `1px solid ${theme.border}`,
            }}
            aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {currentTheme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={theme.primary}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={theme.primary}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>

        {/* Section Header - Minimal and clean */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block mb-3">
            <div 
              className="h-1 w-16 mx-auto"
              style={{ backgroundColor: theme.primary }}
            ></div>
          </div>
          <h2 
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ color: theme.text }}
          >
            Discover the Tiggo Family
          </h2>
          <p 
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: theme.textSecondary }}
          >
            Versatile SUVs designed for every lifestyle with cutting-edge technology
          </p>
        </motion.div>

        {/* Model Selector - Tabs with clean design */}
        <motion.div 
          className="flex flex-wrap justify-center mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Mobile dropdown */}
          <div className="w-full md:hidden mb-8">
            <select 
              value={activeIndex} 
              onChange={(e) => setActiveIndex(Number(e.target.value))}
              className="w-full p-3 "
              style={{ 
                backgroundColor: theme.surface,
                borderColor: theme.border,
                color: theme.text,
                boxShadow: theme.shadow
              }}
            >
              {models.map((model, index) => (
                <option key={index} value={index}>{model.name}</option>
              ))}
            </select>
          </div>

          {/* Desktop tabs */}
          <div className="hidden md:flex space-x-1 bg-opacity-50 p-1 " style={{ backgroundColor: theme.surfaceHighlight }}>
            {models.map((model, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`px-6 py-2  transition-all duration-200 ${activeIndex === index ? 'font-medium' : ''}`}
                style={{
                  backgroundColor: activeIndex === index ? theme.surface : 'transparent',
                  color: activeIndex === index ? theme.primary : theme.textSecondary,
                  boxShadow: activeIndex === index ? theme.shadow : 'none'
                }}
              >
                {model.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12 lg:gap-16">
          {/* Vehicle Image - Clean presentation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="relative w-full aspect-[4/3] max-w-lg">
              {/* Subtle platform effect */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-[2px] " 
                style={{ backgroundColor: theme.primary, opacity: 0.3 }}></div>
              
              {/* Subtle glow */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-4 blur-xl"
                style={{ backgroundColor: theme.primary, opacity: 0.15 }}></div>
              
              {/* Image */}
              <div className="relative w-full h-full transition-opacity duration-500">
                {models.map((model, index) => (
                  <div 
                    key={index}
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{ opacity: index === activeIndex ? 1 : 0 }}
                  >
                    <Image
                      src={model.image || '/api/placeholder/800/600'}
                      alt={model.name}
                      fill
                      style={{ objectFit: "contain" }}
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Vehicle Info - Clean and organized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-1/2"
          >
            <div className="mb-6">
              <h3 
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{ color: theme.text }}
              >
                {models[activeIndex].name}
              </h3>
              <p 
                className="text-lg"
                style={{ color: theme.textSecondary }}
              >
                {models[activeIndex].subtitle}
              </p>
            </div>

            {/* Specifications Card */}
            <div 
              className="p-6  mb-6"
              style={{ 
                backgroundColor: theme.surface,
                boxShadow: theme.shadow
              }}
            >
              <h4 
                className="text-lg font-medium mb-4 flex items-center"
                style={{ color: theme.text }}
              >
                <span 
                  className="inline-block w-3 h-3 mr-2 "
                  style={{ backgroundColor: theme.primary }}
                ></span>
                Key Specifications
              </h4>
              
              <div className="grid grid-cols-2 gap-y-6">
                {models[activeIndex].specs.map((spec, index) => (
                  <div key={index}>
                    <p 
                      className="text-sm mb-1"
                      style={{ color: theme.textSecondary }}
                    >
                      {spec.label}
                    </p>
                    <p 
                      className="font-medium"
                      style={{ color: theme.text }}
                    >
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h4 
                className="text-lg font-medium mb-4 flex items-center"
                style={{ color: theme.text }}
              >
                <span 
                  className="inline-block w-3 h-3 mr-2 "
                  style={{ backgroundColor: theme.primary }}
                ></span>
                Featured Highlights
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                {models[activeIndex].features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-center p-3 "
                    style={{ backgroundColor: theme.surfaceHighlight }}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 mr-2 flex-shrink-0" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                      style={{ color: theme.primary }}
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm" style={{ color: theme.textSecondary }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button - Clean and professional */}
            <Link href={models[activeIndex].link || "#"}>
              <span 
                className="inline-flex items-center px-6 py-3  font-medium transition-all duration-200 hover:opacity-90"
                style={{ 
                  backgroundColor: theme.primary,
                  color: currentTheme === 'dark' ? '#121212' : '#ffffff',
                  boxShadow: theme.shadow
                }}
              >
                Explore {models[activeIndex].name}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Bottom Feature Cards - Minimal and clean */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { title: 'Performance', desc: 'Powerful and efficient engines for optimal driving' },
            { title: 'Safety', desc: 'Advanced driver assistance systems for peace of mind' },
            { title: 'Technology', desc: 'Intuitive infotainment and connectivity features' },
            { title: 'Warranty', desc: 'Comprehensive 5-year/100,000 km coverage' }
          ].map((item, index) => (
            <div 
              key={index}
              className="p-5  flex flex-col h-full transition-transform duration-200 hover:transform hover:translate-y-[-5px]"
              style={{ 
                backgroundColor: theme.surface,
                boxShadow: theme.shadow
              }}
            >
              <div 
                className="w-8 h-1 mb-4 "
                style={{ backgroundColor: theme.primary }}
              ></div>
              <h4 
                className="font-medium mb-2"
                style={{ color: theme.text }}
              >
                {item.title}
              </h4>
              <p 
                className="text-sm"
                style={{ color: theme.textSecondary }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Navigation Dots for Mobile */}
        <div className="flex justify-center space-x-2 mt-10 md:hidden">
          {models.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="w-2 h-2  transition-all duration-200"
              style={{
                backgroundColor: index === activeIndex ? theme.primary : theme.surfaceHighlight,
                transform: index === activeIndex ? 'scale(1.5)' : 'scale(1)'
              }}
              aria-label={`Select model ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}