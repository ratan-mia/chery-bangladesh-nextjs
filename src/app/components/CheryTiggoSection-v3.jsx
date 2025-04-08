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
          duration: 0.4
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

  // Move swiper when tab changes
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(activeTabIndex)
    }
  }, [activeTabIndex])

  return (
    <section 
      ref={sectionRef} 
      className="py-16 md:py-24 relative overflow-hidden bg-gray-50 dark:bg-gray-900"
    >
      {/* Flat design background element */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            Discover the Tiggo Family
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Versatile SUVs designed for every lifestyle with cutting-edge technology and exceptional value
          </p>
        </motion.div>

        {/* Tabs navigation */}
        <motion.div 
          className="flex justify-center mb-8 space-x-2 md:space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {models.map((model, index) => (
            <button
              key={index}
              onClick={() => setActiveTabIndex(index)}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTabIndex === index 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {model.name}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Vehicle image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <Swiper
              ref={swiperRef}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              speed={500}
              allowTouchMove={false}
              modules={[EffectFade, Navigation, Autoplay]}
              onSlideChange={(swiper) => setActiveTabIndex(swiper.activeIndex)}
              className="w-full"
            >
              {models.map((model, index) => (
                <SwiperSlide key={index} className="flex justify-center items-center">
                  <div className="relative w-full h-72 md:h-96">
                    {/* Platform beneath the car */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    
                    <Image
                      src={model.image || "https://placehold.co/800x400/png"}
                      alt={model.name}
                      layout="fill"
                      objectFit="contain"
                      className="drop-shadow-md"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* Vehicle info */}
          <motion.div
            variants={animations.container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="px-4 md:pl-8"
          >
            <motion.div variants={animations.item} className="mb-6">
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{models[activeTabIndex]?.name}</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">{models[activeTabIndex]?.subtitle}</p>
            </motion.div>

            <motion.div variants={animations.item} className="mb-6">
              <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm">
                <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Key Specs</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Engine</p>
                    <p className="font-medium text-gray-800 dark:text-white">{models[activeTabIndex]?.specs.engine}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Power</p>
                    <p className="font-medium text-gray-800 dark:text-white">{models[activeTabIndex]?.specs.power}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Torque</p>
                    <p className="font-medium text-gray-800 dark:text-white">{models[activeTabIndex]?.specs.torque}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Transmission</p>
                    <p className="font-medium text-gray-800 dark:text-white">{models[activeTabIndex]?.specs.transmission}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={animations.item} className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Featured Highlights</h4>
              <div className="grid grid-cols-2 gap-2">
                {models[activeTabIndex]?.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={animations.item}>
              <Link href={models[activeTabIndex]?.link || "#"}>
                <span className="inline-block px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors duration-200">
                  Explore {models[activeTabIndex]?.name}
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Feature highlights */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white">Performance</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Powerful and efficient engines</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white">Safety</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Advanced driver assistance</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white">Technology</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Advanced infotainment</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white">Warranty</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">5-year/100,000 km</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}