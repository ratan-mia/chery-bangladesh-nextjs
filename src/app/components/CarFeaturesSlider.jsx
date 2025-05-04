'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const CarFeaturesSlider = ({
  // Content props
  features = null,
  
  // Layout & behavior props
  autoplay = true,
  autoplaySpeed = 5000,
  heading = "Distinctive Features",
  subtitle = "Experience innovation in every detail",
  
  // Enhanced functionality
  linkBase = '/features',
  showIndicators = false,
  showArrows = true,
  showNumbers = true,
  showHeading = true,
  showLinks = false,
}) => {
  const defaultFeatures = [
    {
      id: 1,
      image: "/images/features/led-lighting.jpg",
      title: "Dynamic LED Lighting",
      description: "Adaptive lighting system that automatically adjusts to driving conditions for optimal visibility and safety.",
      tagline: "Illuminate the road ahead",
      specs: ["Adaptive beam", "Dynamic cornering lights", "Signature DRLs"],
      link: "/features/lighting"
    },
    {
      id: 2,
      image: "/images/features/alloy-wheels.jpg",
      title: "Premium Alloy Wheels",
      description: "Lightweight design enhancing performance and efficiency with premium materials and aerodynamic engineering.",
      tagline: "Form meets function",
      specs: ["20-inch diameter", "Diamond-cut finish", "Reduced unsprung weight"],
      link: "/features/wheels"
    },
    {
      id: 3,
      image: "/images/features/front-grille.jpg",
      title: "Signature Front Grille",
      description: "Distinctive design with premium finish for unmistakable presence on the road.",
      tagline: "Bold presence",
      specs: ["Integrated sensors", "Active cooling", "Premium finish"],
      link: "/features/grille"
    },
    {
      id: 4,
      image: "/images/features/panoramic-sunroof.jpg",
      title: "Panoramic Sunroof",
      description: "Full-length glass roof providing an enhanced sense of space and natural light throughout the cabin.",
      tagline: "Sky at your fingertips",
      specs: ["UV protection", "One-touch operation", "Blackout shade"],
      link: "/features/sunroof"
    },
    {
      id: 5,
      image: "/images/features/infotainment.jpg",
      title: "Advanced Infotainment",
      description: "Seamless connectivity with intuitive controls and premium audio for an immersive driving experience.",
      tagline: "Stay connected",
      specs: ["15-inch display", "Wireless connection", "Premium sound system"],
      link: "/features/infotainment"
    }
  ]

  const items = features || defaultFeatures
  const swiperRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const progressRef = useRef(null)
  const progressIntervalRef = useRef(null)
  const [slidesPerView, setSlidesPerView] = useState(1)
  const [isMounted, setIsMounted] = useState(false)

  // Ensure component is mounted before rendering Swiper
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle responsive slides per view
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3)
      } else if (window.innerWidth >= 640) {
        setSlidesPerView(2)
      } else {
        setSlidesPerView(1)
      }
    }

    updateSlidesPerView()
    window.addEventListener('resize', updateSlidesPerView)
    return () => window.removeEventListener('resize', updateSlidesPerView)
  }, [])

  // Handle slide change
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex)
    resetProgressAnimation()
  }

  // Toggle autoplay
  const toggleAutoplay = () => {
    setIsPaused(!isPaused)
    
    if (swiperRef.current?.swiper) {
      if (isPaused) {
        swiperRef.current.swiper.autoplay.start()
        startProgressAnimation()
      } else {
        swiperRef.current.swiper.autoplay.stop()
        stopProgressAnimation()
      }
    }
  }

  // Progress bar animation
  const startProgressAnimation = () => {
    if (!autoplay || !showIndicators) return
    
    stopProgressAnimation()
    
    const duration = autoplaySpeed
    const intervalTime = 50
    const steps = duration / intervalTime
    let currentStep = 0
    
    progressIntervalRef.current = setInterval(() => {
      currentStep++
      const animationProgress = (currentStep / steps) * 100
      
      if (progressRef.current) {
        progressRef.current.style.width = `${animationProgress}%`
      }
      
      if (currentStep >= steps) {
        resetProgressAnimation()
      }
    }, intervalTime)
  }
  
  const resetProgressAnimation = () => {
    stopProgressAnimation()
    if (progressRef.current) {
      progressRef.current.style.width = '0%'
    }
    if (autoplay && !isPaused) {
      startProgressAnimation()
    }
  }
  
  const stopProgressAnimation = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }
  }

  // Initialize swiper
  const handleSwiperInit = (swiper) => {
    if (isPaused && swiper.autoplay) {
      swiper.autoplay.stop()
    } else if (autoplay) {
      startProgressAnimation()
    }
  }

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      stopProgressAnimation()
    }
  }, [])

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  if (!isMounted) {
    return null // Prevent SSR issues
  }

  return (
    <section className="w-full bg-white overflow-hidden py-12 md:py-16 lg:py-20">
      <div className="w-full max-w-[1920px] mx-auto">
        {/* Header section */}
        {showHeading && (
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mb-12 md:mb-16">
            <motion.div 
              className="flex flex-col md:flex-row md:items-end justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {heading}
                </h2>
                <div className="w-24 h-1 bg-primary-700 mb-6"></div>
                <p className="text-gray-600 text-lg max-w-2xl">
                  {subtitle}
                </p>
              </div>
              
              {/* Navigation Controls */}
              {showArrows && (
                <div className="flex items-center gap-4 mt-8 md:mt-0">
                  <motion.button 
                    onClick={() => swiperRef.current?.swiper.slidePrev()}
                    className="w-12 h-12 border border-gray-200 bg-white hover:bg-gray-50 text-gray-900 flex items-center justify-center transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button 
                    onClick={() => swiperRef.current?.swiper.slideNext()}
                    className="w-12 h-12 border border-gray-200 bg-white hover:bg-gray-50 text-gray-900 flex items-center justify-center transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
        )}
        
        {/* Slider section with CSS Grid approach */}
        <div className="w-full">
          <div className="max-w-full mx-auto px-4 md:px-6 lg:px-8">
            <style jsx global>{`
              .swiper-slide-content {
                height: 100%;
                display: grid;
                grid-template-rows: auto 1fr auto;
              }
              .swiper-slide {
                height: auto !important;
              }
              .swiper-wrapper {
                align-items: stretch !important;
              }
            `}</style>
            
            <Swiper
              ref={swiperRef}
              modules={[Navigation, Pagination, Autoplay, A11y]}
              slidesPerView={slidesPerView}
              spaceBetween={24}
              autoplay={autoplay ? { delay: autoplaySpeed, disableOnInteraction: false } : false}
              onSlideChange={handleSlideChange}
              onSwiper={handleSwiperInit}
              className="w-full"
              style={{
                "--swiper-navigation-color": "#8c735d",
                "--swiper-pagination-color": "#8c735d",
              }}
            >
              {items.map((feature, index) => (
                <SwiperSlide key={feature.id || index}>
                  <motion.div 
                    className="swiper-slide-content group bg-white border border-gray-200 shadow-sm overflow-hidden hover:border-primary-700 hover:shadow-lg transition-all duration-300"
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    {/* Image container */}
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <Image 
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={index < 3}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-primary-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Tagline overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-xs uppercase tracking-wider font-medium text-white">
                          {feature.tagline}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content - This will stretch to fill available space */}
                    <div className="p-6 sm:p-8">
                      {/* Top accent */}
                      <div className="h-1 w-16 bg-primary-800 opacity-40 group-hover:opacity-100 transition-opacity duration-300 mb-6"></div>
                      
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-900 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-1 leading-relaxed">
                        {feature.description}
                      </p>
                      
                      {/* Specs */}
                      {feature.specs && (
                        <div className="flex flex-wrap gap-2 mb-8">
                          {feature.specs.map((spec, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1 text-xs font-medium text-gray-500 border border-gray-200 bg-gray-50"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Footer - Always at bottom */}
                   {showLinks && (
                    <div className="p-6 sm:p-8 pt-0">
                      <Link 
                        href={feature.link || `${linkBase}/${feature.id}`} 
                        className="group/link inline-flex items-center text-primary-700 font-medium hover:text-primary-900 transition-colors duration-300"
                      >
                        Learn more
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                   )}
                    
                    {/* Bottom accent line */}
                    <div className="h-0.5 w-full bg-gray-200">
                      <div className="h-full bg-primary-700 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        
        {/* Controls and indicators */}
        {showIndicators && (
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-12">
            <div className="flex items-center justify-between">
              {/* Play/pause button */}
              <motion.button 
                onClick={toggleAutoplay}
                className="w-10 h-10 border border-gray-200 bg-white hover:bg-gray-50 text-gray-900 flex items-center justify-center transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
              >
                {isPaused ? (
                  <Play className="w-4 h-4" />
                ) : (
                  <Pause className="w-4 h-4" />
                )}
              </motion.button>
              
              {/* Progress bar */}
              <div className="flex-1 mx-6">
                <div className="h-1 bg-gray-200 w-full overflow-hidden relative">
                  <div 
                    className="h-full bg-primary-700 absolute left-0 top-0 transition-all duration-300"
                    style={{ width: `${(activeIndex / Math.max(items.length - 1, 1)) * 100}%` }}
                  />
                  <div 
                    ref={progressRef}
                    className="h-full bg-primary-700 opacity-50 absolute left-0 top-0 w-0"
                  />
                </div>
              </div>
              
              {/* Slide counter */}
              {showNumbers && (
                <div className="text-lg font-medium text-gray-900">
                  <span className="text-primary-900">
                    {String(activeIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="mx-2 text-gray-500">/</span>
                  <span className="text-gray-500">
                    {String(items.length).padStart(2, '0')}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CarFeaturesSlider