'use client'

import { motion } from "framer-motion"
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function CheryBrandMasonrySlider({ 
  showNavigation = true,
  autoplayDuration = 5000,
  primaryLight = "#c4b19c",
  primary700 = "#8c735d",
  primary800 = "#b7a99a",
  primary900 = "#524336"
}) {
  const [isMounted, setIsMounted] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideProgress, setSlideProgress] = useState(0)
  const [hoveredSection, setHoveredSection] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const swiperRef = useRef(null)
  const progressIntervalRef = useRef(null)
  
  // Reset and start progress animation
  const resetProgress = () => {
    setSlideProgress(0)
    clearInterval(progressIntervalRef.current)
    
    progressIntervalRef.current = setInterval(() => {
      setSlideProgress(prev => {
        const newProgress = prev + (100 / (autoplayDuration / 100))
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 100)
  }
  
  // Handle slide change
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex)
    resetProgress()
  }
  
  // Update isMobile state based on screen size
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768)
  }
  
  useEffect(() => {
    setIsMounted(true)
    resetProgress()
    
    // Set initial mobile state
    handleResize()
    
    // Add resize event listener
    window.addEventListener('resize', handleResize)
    
    return () => {
      clearInterval(progressIntervalRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  // Define slider content based on brochure data
  const sliderContent = [
    {
      id: 1,
      hero: {
        src: '/images/masonary/1/001-2.png', // Using TIGGO 8 PRO image
        alt: 'TIGGO 8 PRO - Premium 7-Seater SUV',
      },
      images: [
        {
          src: '/images/masonary/1/002-2.png',
          alt: 'Illuminating Chery Front Logo',
        },
        {
          src: '/images/masonary/1/003-2.png',
          alt: '19" Aluminium Alloy Rim Wheels',
        },
        {
          src: '/images/masonary/1/004-2.png',
          alt: 'LED Headlights',
        },
        {
          src: '/images/masonary/1/001-2.png',
          alt: 'Panoramic Power Sunroof',
        },
      ],
      content: {
        title: 'TIGGO 8 PRO',
        subtitle: 'FIRST CLASS',
        description: 'The Tiggo 8 Pro is the epitome of luxury that transcends the bounds of a mere vehicle; a masterpiece that commands centre stage presence. Its diamond-shaped front grille gleams like a finely cut jewel, while the illuminated logo radiates an aura of refinement.',
        highlights: [
          'Turbocharged 1600cc high compression engine',
          '195 BHP and 290Nm of torque',
          '207mm ground clearance',
          'LED daytime running lamps'
        ],
        specs: [
          {
            name: 'Engine',
            value: '1.6L Turbocharged'
          },
          {
            name: 'Power',
            value: '195 BHP'
          },
          {
            name: 'Torque',
            value: '290Nm'
          },
          {
            name: 'Ground Clearance',
            value: '207mm'
          }
        ]
      }
    },
    {
      id: 2,
      hero: {
        src: '/images/masonary/2/0081.png', // Using Tiggo Cross image
        alt: 'TIGGO CROSS - Ultimate Crossover',
      },
      images: [
        {
          src: '/images/masonary/2/0082.png',
          alt: 'Starry Diamond-Shaped Grille Pattern',
        },
        {
          src: '/images/masonary/2/0083.png',
          alt: 'Dual 12.3-inch LCD Screens',
        },
        {
          src: '/images/masonary/2/0084.png',
          alt: 'Panoramic Sunroof',
        },
        {
          src: '/images/masonary/2/0081.png',
          alt: 'Tiggo Cross Exterior',
        },
      ],
      content: {
        title: 'TIGGO CROSS',
        subtitle: 'FIRST CLASS CROSSOVER',
        description: 'Enveloping you in absolute luxury and comfort is the plush leather upholstery that\'s hand-stitched to perfection on the seats, steering wheel, and other key touchpoints. Elevating that first class feeling further is the ambient lighting.',
        highlights: [
          'Biomimetic tiger face design',
          'Tiger claw style headlight trim',
          'Sleek and aerodynamic',
          '7 airbag configuration'
        ],
        specs: [
          {
            name: 'Display',
            value: '10.25-inch LCD'
          },
          {
            name: 'Audio',
            value: '6-speaker Sony'
          },
          {
            name: 'Safety',
            value: '7 Airbags'
          },
          {
            name: 'Colors',
            value: '4 Options'
          }
        ]
      }
    }
  ]
  
  // Animation variants
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut"
      },
    }),
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + (i * 0.1),
        duration: 0.5,
        ease: "easeOut"
      }
    })
  }

  const highlightVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.6 + (i * 0.1),
        duration: 0.4
      }
    })
  }
  
  // Return null during SSR to prevent hydration errors with Swiper
  if (!isMounted) {
    return null
  }
  
  return (
    <div className="relative w-full overflow-hidden bg-gray-100">
      {/* Enhanced background texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5 mix-blend-soft-light">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid-pattern" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke={primary800} strokeWidth="0.5" opacity="0.3" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>
      
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Pagination, EffectFade, Autoplay]}
        navigation={false}
        pagination={false}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: autoplayDuration,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={800}
        onSlideChange={handleSlideChange}
        className="w-full h-auto"
      >
        {sliderContent.map((slide, slideIndex) => (
          <SwiperSlide key={slide.id} className="w-full">
            <div className="flex flex-col lg:flex-row">
              {/* Left side - Hero image with content overlay */}
              <div className="w-full lg:w-[40%] relative overflow-hidden" 
                   style={{ height: isMobile ? '50vh' : '80vh', maxHeight: '900px' }}>
                {/* Main background image */}
                <motion.div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${slide.hero.src})`,
                  }}
                  initial={{ scale: 1.1 }}
                  animate={{ 
                    scale: hoveredSection === 'hero' ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.7 }}
                />
                
                {/* Text content overlay with background panel */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-8 lg:p-12">
                  {/* Background panel for text */}
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                  
                  <div className="relative z-10">
                    {/* Accent bar */}
                    <motion.div 
                      className="h-1 mb-4 md:mb-8"
                      style={{ backgroundColor: primary700 }}
                      initial={{ width: 0 }}
                      animate={{ width: '80px', sm: '120px' }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                    
                    <motion.h2
                      custom={0}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2"
                    >
                      {slide.content.title}
                    </motion.h2>
                    
                    <motion.p
                      custom={1}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      className="text-lg sm:text-xl md:text-2xl font-light text-white/90 mb-3 md:mb-6"
                    >
                      {slide.content.subtitle}
                    </motion.p>
                    
                    {/* <motion.p
                      custom={2}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      className="text-sm sm:text-base text-white/80 mb-4 md:mb-8 max-w-lg line-clamp-3 md:line-clamp-none"
                    >
                      {slide.content.description}
                    </motion.p> */}
                    
                    {/* <div className="space-y-2 md:space-y-3 mb-4 md:mb-8 hidden sm:block">
                      {slide.content.highlights.slice(0, isMobile ? 2 : 4).map((item, idx) => (
                        <motion.div 
                          key={idx}
                          custom={idx}
                          variants={highlightVariants}
                          initial="hidden"
                          animate="visible"
                          className="flex items-center"
                        >
                          <div className="w-1.5 h-1.5 rounded-full mr-2 md:mr-3" style={{ backgroundColor: primary700 }}></div>
                          <p className="text-sm md:text-base text-white/70">{item}</p>
                        </motion.div>
                      ))}
                    </div> */}
                    
                    <motion.button
                      className="group inline-flex items-center px-6 sm:px-8 md:px-10 py-3 md:py-4 bg-primary-700 text-white text-sm md:text-base font-medium hover:bg-primary-800 transition-all duration-300 tracking-wide"
                      style={{ backgroundColor: primary700, borderColor: primary700 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      whileHover={{ backgroundColor: primary800 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      LEARN MORE
                      <ArrowRight
                        size={16}
                        className="ml-2 group-hover:ml-3 transition-all duration-300"
                      />
                    </motion.button>
                  </div>
                </div>
              </div>
              
              {/* Right side - 4 grid images */}
              <div className="w-full lg:w-[60%]" style={{ height: isMobile ? '40vh' : '80vh', maxHeight: '900px' }}>
                <div className="grid grid-cols-2 grid-rows-2 h-full border border-gray-200">
                  {slide.images.map((image, idx) => (
                    <motion.div
                      key={idx}
                      className="relative overflow-hidden border border-gray-200"
                      custom={idx}
                      variants={imageVariants}
                      initial="hidden"
                      animate="visible"
                      onMouseEnter={() => !isMobile && setHoveredSection(`image-${idx}`)}
                      onMouseLeave={() => !isMobile && setHoveredSection(null)}
                    >
                      {/* Image */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                        style={{
                          backgroundImage: `url(${image.src})`,
                          transform: hoveredSection === `image-${idx}` ? 'scale(1.08)' : 'scale(1)',
                        }}
                      />
                      
                      {/* Caption overlay - always visible on mobile, only on hover for desktop */}
                      <motion.div 
                        className="absolute inset-0 flex items-end justify-end p-2 sm:p-4 md:p-6"
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: isMobile || hoveredSection === `image-${idx}` ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="bg-black/60 backdrop-blur-sm py-1 sm:py-2 px-2 sm:px-4">
                          <p className="text-xs sm:text-sm md:text-base text-white font-medium text-right">
                            {image.alt}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Navigation bar outside of slider */}
      {showNavigation && (
        <div className="w-full bg-white border-t border-gray-200 py-3 md:py-4">
          <div className="container mx-auto px-4 md:px-6 flex flex-wrap items-center justify-between gap-4">
            {/* Model tabs/pagination */}
            <div className="flex space-x-4 sm:space-x-6 md:space-x-10 flex-wrap">
              {sliderContent.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    swiperRef.current.slideTo(index + 1);
                    resetProgress();
                  }}
                  className={`flex flex-col relative ${activeIndex === index ? 'opacity-100' : 'opacity-50'} transition-opacity`}
                >
                  <span className="text-sm md:text-base text-gray-900 font-medium">
                    {item.content.title}
                  </span>
                  
                  {/* Progress bar */}
                  <div className="w-full h-0.5 mt-2 bg-gray-200">
                    {activeIndex === index && (
                      <motion.div 
                        className="h-full transition-all duration-100 ease-linear"
                        style={{ 
                          width: `${slideProgress}%`,
                          backgroundColor: primary700
                        }}
                        animate={{ width: `${slideProgress}%` }}
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            {/* Specs display for active slide - hidden on mobile */}
            <div className="hidden md:flex space-x-4 lg:space-x-6">
              {sliderContent[activeIndex].content.specs.slice(0, isMobile ? 2 : 4).map((spec, index) => (
                <div key={index} className="text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{spec.name}</p>
                  <p className="text-sm font-medium text-gray-900">{spec.value}</p>
                </div>
              ))}
            </div>
            
            {/* Navigation buttons */}
            <div className="flex space-x-2 sm:space-x-4">
              <button 
                onClick={() => {
                  swiperRef.current.slidePrev();
                  resetProgress();
                }}
                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border hover:bg-gray-100 transition-colors"
                style={{ borderColor: primary700 }}
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button 
                onClick={() => {
                  swiperRef.current.slideNext();
                  resetProgress();
                }}
                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border hover:bg-gray-100 transition-colors"
                style={{ borderColor: primary700 }}
                aria-label="Next slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}