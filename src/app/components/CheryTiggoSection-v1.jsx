'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function CheryTiggoSection() {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const swiperRef = useRef(null)
  const sectionRef = useRef(null)

  // Enhanced sample data with more details
  const models = [
    {
      name: 'Tiggo 8',
      subtitle: 'Premium 7-Seater SUV',
      link: '/models/tiggo/tiggo8',
      image: '/images/models/tiggo-8.png',
      color: '#1E5945',
      specs: {
        engine: '1.6T',
        power: '197 HP',
        torque: '290 Nm',
        transmission: '7-DCT'
      }
    },
    {
      name: 'Tiggo 7 Pro',
      subtitle: 'Stylish Compact SUV',
      link: '/models/tiggo/tiggo7',
      image: '/images/models/tiggo-7.png',
      color: '#00A8E8',
      specs: {
        engine: '1.5T',
        power: '156 HP',
        torque: '230 Nm',
        transmission: 'CVT'
      }
    },
    {
      name: 'Tiggo Cross',
      subtitle: 'Urban Crossover',
      link: '/models/tiggo/tiggo4',
      image: '/images/models/tiggo-4.png',
      color: '#556B2F',
      specs: {
        engine: '1.5L',
        power: '145 HP',
        torque: '210 Nm',
        transmission: 'CVT'
      }
    },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  const slideVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5 
      }
    }
  }

  // Intersection Observer to trigger animations when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Handle tab click
  const handleTabClick = (index) => {
    setActiveTabIndex(index)
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideTo(index)
    }
    
    // Scroll tab into view on mobile
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      const tabElement = document.getElementById(`tiggo-tab-${index}`)
      if (tabElement) {
        tabElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
      }
    }
  }

  // Update active tab when swiper slides
  const handleSlideChange = (swiper) => {
    setActiveTabIndex(swiper.activeIndex)
  }

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-gray-50 py-16 md:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo with Animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block relative">
            <motion.svg 
              width="180" 
              height="60" 
              viewBox="0 0 200 60" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="mx-auto"
              initial={{ rotate: -5 }}
              animate={isInView ? { rotate: 0 } : { rotate: -5 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <text 
                x="50%" 
                y="50%" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fontSize="24" 
                fontWeight="bold"
                fill="#6e5a48"
                className="text-gray-50"
              >
                Tiggo
              </text>
            </motion.svg>
            <motion.div 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-amber-700"
              initial={{ width: 0 }}
              animate={isInView ? { width: 128 } : { width: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            ></motion.div>
          </div>
          <motion.p 
            className="mt-4 text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Experience innovation, style, and performance
          </motion.p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="flex justify-center mb-8 overflow-x-auto max-w-full scrollbar-hide">
            <div className="flex gap-2 border-b border-gray-200 w-full max-w-3xl justify-between">
              {models.map((model, index) => (
                <motion.button
                  key={index}
                  id={`tiggo-tab-${index}`}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`py-3 px-4 text-center whitespace-nowrap text-sm md:text-base transition-all duration-300
                              ${activeTabIndex === index 
                                ? 'text-amber-700 border-b-2 border-amber-700 font-medium' 
                                : 'text-gray-600 hover:text-gray-800 hover:border-b-2 hover:border-gray-300'}`}
                  onClick={() => handleTabClick(index)}
                >
                  {model.name}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Slider with Flat Design */}
        <motion.div
          className="relative mb-10"
          variants={slideVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Autoplay]}
            speed={500}
            slidesPerView={1}
            loop={false}
            autoplay={{
              delay: 6000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true
            }}
            onSlideChange={handleSlideChange}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            className="border border-gray-200"
          >
            {models.map((model, index) => (
              <SwiperSlide key={index} className="bg-white">
                <div className="relative">
                  {/* Main car image */}
                  <div className="h-[300px] md:h-[400px] lg:h-[500px] relative bg-white" 
                       style={{ backgroundColor: `${model.color}10` }}>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full"
                    >
                      <Image
                        src={model.image}
                        alt={model.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 1200px"
                        className="object-contain"
                        priority={index === 0}
                      />
                    </motion.div>
                    
                    {/* Model tag */}
                    <motion.div 
                      className="absolute top-4 left-4 bg-white py-1 px-3 z-10"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <h3 className="text-lg font-medium" style={{ color: model.color }}>{model.name}</h3>
                      <p className="text-xs text-gray-500">{model.subtitle}</p>
                    </motion.div>
                  </div>
                  
                  {/* Car specs bottom bar - flat design */}
                  <motion.div 
                    className="flex flex-wrap justify-center md:justify-between items-center p-4 border-t border-gray-200 bg-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <div className="md:order-1 w-full md:w-auto text-center md:text-left mb-3 md:mb-0">
                      <h3 className="text-xl font-medium">{model.name}</h3>
                      <p className="text-sm text-gray-500">{model.subtitle}</p>
                    </div>
                    
                    <div className="flex justify-center md:justify-end space-x-8 md:order-2 w-full md:w-auto">
                      {Object.entries(model.specs).map(([key, value], i) => (
                        <motion.div 
                          key={key} 
                          className="text-center"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + (i * 0.1), duration: 0.4 }}
                        >
                          <p className="text-xs text-gray-500 uppercase">{key}</p>
                          <p className="text-sm md:text-base">{value}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Flat design navigation buttons */}
          <motion.button 
            className="swiper-button-prev !w-10 !h-10 md:!w-12 md:!h-12 !bg-white !flex !items-center !justify-center !text-transparent before:!content-[''] after:!content-[''] border border-gray-200"
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-gray-800"
            >
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </motion.button>
          <motion.button 
            className="swiper-button-next !w-10 !h-10 md:!w-12 md:!h-12 !bg-white !flex !items-center !justify-center !text-transparent before:!content-[''] after:!content-[''] border border-gray-200"
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-gray-800"
            >
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </motion.button>
          
          {/* Flat progress indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {models.map((_, index) => (
              <motion.button 
                key={index}
                onClick={() => handleTabClick(index)}
                className={`w-6 h-1 transition-all duration-300 ${
                  activeTabIndex === index 
                    ? 'bg-amber-700' 
                    : 'bg-gray-300'
                }`}
                whileHover={{ scaleX: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Flat Design CTA Button */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href={models[activeTabIndex]?.link || '#'}
              className="inline-flex items-center bg-amber-700 text-white px-8 py-3 border-0 hover:bg-amber-800 transition-colors"
            >
              <span>EXPLORE {models[activeTabIndex]?.name.toUpperCase()}</span>
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "loop", 
                  duration: 1.5, 
                  ease: "easeInOut",
                  repeatDelay: 1 
                }}
              >
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </motion.svg>
            </Link>
          </motion.div>
          
          {/* Additional flat design CTAs */}
          <motion.div 
            className="mt-6 flex justify-center space-x-8 border-t border-gray-200 pt-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.button 
              className="text-gray-600 hover:text-amber-700 text-sm flex items-center transition-colors"
              variants={itemVariants}
              whileHover={{ y: -2, color: "#B45309" }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              Download Brochure
            </motion.button>
            <motion.button 
              className="text-gray-600 hover:text-amber-700 text-sm flex items-center transition-colors"
              variants={itemVariants}
              whileHover={{ y: -2, color: "#B45309" }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
              </svg>
              Compare Models
            </motion.button>
            <motion.button 
              className="text-gray-600 hover:text-amber-700 text-sm flex items-center transition-colors"
              variants={itemVariants}
              whileHover={{ y: -2, color: "#B45309" }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Specifications
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}