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
  const swiperRef = useRef(null)
  const sectionRef = useRef(null)
  const [isInitialized, setIsInitialized] = useState(false)

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
      className="py-20 relative overflow-hidden bg-white dark:bg-gray-900"
    >
      {/* Minimal background */}
      <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900"></div>

      <div className="container mx-auto px-4 relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white tracking-tight">
            Discover the Tiggo Family
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
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
              className="w-full p-3 bg-white dark:bg-gray-800 border-0 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-primary"
            >
              {models.map((model, index) => (
                <option key={index} value={index}>{model.name}</option>
              ))}
            </select>
          </div>

          {/* Desktop tabs - flat and professional */}
          <div className="hidden md:flex border-b border-gray-200 dark:border-gray-700 w-full max-w-xl mx-auto">
            {models.map((model, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={`
                  relative flex-1 text-center px-6 py-3 font-medium transition-all duration-200
                  ${activeTabIndex === index 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 border-b-2 border-transparent'
                  }
                `}
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
                    {/* Flat minimal platform */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-1 bg-gray-200 dark:bg-gray-700"></div>
                    
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
                className={`p-2 border ${activeTabIndex === 0 ? 'border-gray-200 text-gray-300 cursor-not-allowed dark:border-gray-700 dark:text-gray-600' : 'border-gray-200 text-gray-700 hover:border-primary hover:text-primary dark:border-gray-700 dark:text-gray-300'}`}
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
                className={`p-2 border ${activeTabIndex === models.length - 1 ? 'border-gray-200 text-gray-300 cursor-not-allowed dark:border-gray-700 dark:text-gray-600' : 'border-gray-200 text-gray-700 hover:border-primary hover:text-primary dark:border-gray-700 dark:text-gray-300'}`}
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
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{models[activeTabIndex]?.name}</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">{models[activeTabIndex]?.subtitle}</p>
            </motion.div>

            <motion.div variants={animations.item} className="mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Key Specifications</h4>
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Engine</p>
                    <p className="font-medium text-gray-900 dark:text-white">{models[activeTabIndex]?.specs.engine}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Power</p>
                    <p className="font-medium text-gray-900 dark:text-white">{models[activeTabIndex]?.specs.power}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Torque</p>
                    <p className="font-medium text-gray-900 dark:text-white">{models[activeTabIndex]?.specs.torque}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Transmission</p>
                    <p className="font-medium text-gray-900 dark:text-white">{models[activeTabIndex]?.specs.transmission}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={animations.item} className="mb-8">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Featured Highlights</h4>
              <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                {models[activeTabIndex]?.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-5 h-5 flex items-center justify-center bg-primary-light mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={animations.item}>
              <Link href={models[activeTabIndex]?.link || "#"}>
                <span className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium transition-colors duration-200 hover:bg-primary-dark">
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
          <div className="bg-white dark:bg-gray-800 p-5 border-t border-gray-200 dark:border-gray-700">
            <div className="w-10 h-1 bg-primary mb-4"></div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Performance</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Powerful and efficient engines for optimal driving</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-5 border-t border-gray-200 dark:border-gray-700">
            <div className="w-10 h-1 bg-primary mb-4"></div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Safety</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Advanced driver assistance systems for peace of mind</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-5 border-t border-gray-200 dark:border-gray-700">
            <div className="w-10 h-1 bg-primary mb-4"></div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Technology</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Intuitive infotainment and connectivity features</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-5 border-t border-gray-200 dark:border-gray-700">
            <div className="w-10 h-1 bg-primary mb-4"></div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Warranty</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Comprehensive 5-year/100,000 km coverage</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}