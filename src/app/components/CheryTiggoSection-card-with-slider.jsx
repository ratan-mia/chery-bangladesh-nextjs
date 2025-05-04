'use client'

import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Award, Car, Check, Cpu, Eye, Shield, Sparkles, X, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Add custom styles for Swiper
const swiperStyles = `
  .models-swiper {
    position: relative;
    padding: 0 60px;
  }
  
  .models-swiper .swiper-button-prev,
  .models-swiper .swiper-button-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 0;
    color: #524336;
    transition: all 0.3s ease;
    z-index: 10;
  }
  
  .models-swiper .swiper-button-prev {
    left: 0;
  }
  
  .models-swiper .swiper-button-next {
    right: 0;
  }
  
  .models-swiper .swiper-button-prev:hover,
  .models-swiper .swiper-button-next:hover {
    background: #524336;
    border-color: #524336;
    color: white;
  }
  
  .models-swiper .swiper-button-prev::after,
  .models-swiper .swiper-button-next::after {
    font-size: 18px;
    font-weight: bold;
  }
  
  .models-swiper .swiper-button-disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  .models-swiper .swiper-pagination {
    position: relative;
    margin-top: 40px;
    bottom: auto;
  }
  
  .models-swiper .swiper-pagination-bullet {
    width: 40px;
    height: 3px;
    background: #e5e7eb;
    border-radius: 0;
    opacity: 1;
    margin: 0 6px !important;
    transition: all 0.3s ease;
  }
  
  .models-swiper .swiper-pagination-bullet-active {
    background: #8c735d;
    width: 60px;
  }
`

export default function CheryTiggoSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedModel, setSelectedModel] = useState(null)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const swiperRef = useRef(null)

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  // Models data
  const models = [
    {
      name: 'Tiggo 8 Pro',
      subtitle: 'Premium 7-Seater Luxury SUV',
      badge: 'FLAGSHIP',
      link: '/models/tiggo8pro',
      image: '/images/tiggo8pro/colors/chery-green.png',
      specs: [
        { label: 'Engine', value: '1.6T Turbocharged', icon: Zap },
        { label: 'Power', value: '195 BHP', icon: Sparkles },
        { label: 'Torque', value: '290 Nm', icon: Car },
        { label: 'Transmission', value: '7-Speed Dual Clutch', icon: Cpu }
      ],
      features: [
        'Premium Luxury 7-seat SUV', 
        'Panoramic Sunroof', 
        'Multi-color Ambient System with Music Rhythm',
        '12.3" Dual Curve Screen',
        'Ventilated and Heated Front Seats',
        'Wireless Phone Charging',
        '360° Panoramic Camera'
      ],
      description: 'The epitome of luxury that transcends the bounds of a mere vehicle; a masterpiece that commands centre stage presence with a diamond-shaped front grille and illuminated logo that radiates elegance.'
    },
    {
      name: 'Tiggo Cross',
      subtitle: 'Modern Crossover SUV',
      badge: 'NEW',
      link: '/models/tiggocross',
      image: '/images/models/tiggo-cross.png',
      specs: [
        { label: 'Engine', value: '1.5L Turbocharged', icon: Zap },
        { label: 'Power', value: '145 BHP', icon: Sparkles },
        { label: 'Torque', value: '210 Nm', icon: Car },
        { label: 'Transmission', value: '6-Speed Dual Clutch', icon: Cpu }
      ],
      features: [
        'Biomimetic Tiger Face Design', 
        '10.25" Ultra-Clear LCD Screen', 
        'Voice-Activated Panoramic Sunroof',
        '360° Panoramic Camera View',
        'LED Matrix Headlights',
        'Intelligent Cruise Control',
        'Lane Departure Warning'
      ],
      description: 'Sleek and aerodynamic - ready for adventure with its biomimetic tiger face design. Features a distinctive diamond-shaped grille pattern, tiger claw style headlight trim, and vertical crystal-edged marker lamps.'
    }
  ]

  // Animation variants following design guidelines
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

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

  // Lock body scroll when panel is open
  useEffect(() => {
    if (selectedModel) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedModel])

  // Inject custom Swiper styles
  useEffect(() => {
    const styleElement = document.createElement('style')
    styleElement.textContent = swiperStyles
    document.head.appendChild(styleElement)
    
    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  return (
    <section 
      ref={sectionRef} 
      id='explore'
      className="py-20 bg-white overflow-hidden"
    >
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header - Following design system guidelines */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Experience the <span className="text-primary-900">Tiggo Legacy</span>
          </h2>
          <div className="w-24 h-1 bg-primary-700 mx-auto mb-8"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-normal">
            Where innovation meets luxury. Discover our premium SUV collection designed for the modern driver.
          </p>
        </motion.div>

        {/* Model Cards Swiper with improved design */}
        <motion.div 
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper
            }}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={true}
            pagination={{ 
              clickable: true,
              dynamicBullets: false,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: models.length > 2 ? 3 : 2,
                spaceBetween: 30,
              },
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="models-swiper"
          >
            {models.map((model, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  variants={itemVariants}
                  className="h-full"
                >
                  <div 
                    className={`group relative bg-white border overflow-hidden transition-all duration-300 h-full ${
                      activeIndex === index 
                        ? 'border-primary-700 shadow-xl' 
                        : 'border-gray-200 shadow-sm hover:border-primary-700 hover:shadow-lg'
                    }`}
                  >
                    {/* Top accent bar - using primary-800 with opacity as per guidelines */}
                    <div 
                      className={`h-1 w-full bg-primary-800 transition-opacity duration-300 ${
                        activeIndex === index ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'
                      }`}
                    />
                    
                    {/* Badge */}
                    <div className="absolute top-6 right-6 z-10">
                      <span className="px-4 py-1 bg-primary-900 text-white text-xs font-medium uppercase tracking-wider">
                        {model.badge}
                      </span>
                    </div>

                    {/* Image Container with proper gradient overlay */}
                    <div className="relative h-56 bg-gradient-to-b from-gray-50 to-white">
                      <motion.div
                        animate={{ 
                          scale: activeIndex === index ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.5 }}
                        className="relative h-full w-full p-4"
                      >
                        <Image
                          src={model.image}
                          alt={model.name}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          priority={index < 2}
                        />
                      </motion.div>
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 via-primary-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content Container */}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-900 transition-colors duration-300">
                        {model.name}
                      </h3>
                      <p className="text-primary-700 font-medium mb-4">{model.subtitle}</p>
                      
                      <div className="h-px bg-gray-200 mb-6"></div>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-8 line-clamp-3">
                        {model.description}
                      </p>
                      
                      {/* Quick Specs - using design system icon containers */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {model.specs.slice(0, 2).map((spec, idx) => (
                          <div key={idx} className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary-light bg-opacity-40 flex items-center justify-center">
                              <spec.icon className="w-5 h-5 text-primary-900" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">{spec.label}</p>
                              <p className="text-sm font-bold text-gray-900">{spec.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* CTA Buttons - following button component guidelines */}
                      <div className="flex gap-4">
                        <Link 
                          href={model.link}
                          className="group/btn flex-1 inline-flex items-center justify-center py-3 bg-primary-700 text-white font-medium hover:bg-primary-900 transition-colors duration-300"
                        >
                          Explore
                          <ArrowRight 
                            size={20} 
                            className="ml-2 transition-all duration-300 group-hover/btn:ml-3" 
                          />
                        </Link>
                        <button 
                          onClick={() => setSelectedModel(model)}
                          className="flex-1 inline-flex items-center justify-center py-3 border border-primary-700 text-primary-700 font-medium hover:bg-primary-700 hover:text-white transition-all duration-300"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Quick View
                        </button>
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div className="h-0.5 w-full bg-gray-200 mt-auto">
                      <div 
                        className="h-full bg-primary-700 w-0 group-hover:w-full transition-all duration-700 ease-out"
                      />
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Brand Values Section - using design system feature card pattern */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {[
            { 
              title: 'Superior Performance', 
              desc: 'Experience power and efficiency with our advanced turbocharged engines',
              icon: Zap
            },
            { 
              title: 'Advanced Safety', 
              desc: 'Comprehensive safety systems that protect what matters most',
              icon: Shield
            },
            { 
              title: 'Smart Technology', 
              desc: 'Stay connected with cutting-edge infotainment and driver assistance',
              icon: Cpu
            },
            { 
              title: 'Premium Warranty', 
              desc: '5-year warranty coverage for complete peace of mind',
              icon: Award
            }
          ].map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
              >
                <div className="border border-gray-200 bg-white shadow-sm overflow-hidden group hover:border-primary-700 hover:shadow-lg transition-all duration-300">
                  {/* Top accent */}
                  <div className="h-1 w-full bg-primary-800 opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="p-8">
                    <div className="w-16 h-16 bg-primary-light bg-opacity-40 flex items-center justify-center mb-6">
                      <IconComponent className="w-8 h-8 text-primary-900" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-normal mb-8">{item.desc}</p>
                    
                    <div className="flex items-center text-primary-700 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Learn more</span>
                      <ArrowRight 
                        size={16} 
                        className="ml-2 group-hover:ml-3 transition-all duration-300"
                      />
                    </div>
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className="h-0.5 w-full bg-gray-200 mt-auto">
                    <div className="h-full bg-primary-700 w-0 group-hover:w-full transition-all duration-700 ease-out" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Slide-out Panel for Quick View - Now 1/3 Screen Width */}
      <AnimatePresence>
        {selectedModel && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 backdrop-blur-sm bg-white/30 z-50"
              onClick={() => setSelectedModel(null)}
            />
            
            {/* Slide Panel - 1/3 Screen Width */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full md:w-1/3 bg-white z-50 shadow-2xl"
            >
              {/* Panel Header */}
              <div className="h-full flex flex-col">
                <div className="border-b border-gray-200">
                  <div className="h-1 w-full bg-primary-700"></div>
                  <div className="p-6 flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedModel.name}</h3>
                      <p className="text-primary-700 font-medium">{selectedModel.subtitle}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedModel(null)}
                      className="p-2 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Panel Content */}
                <div className="flex-1 flex flex-col p-6">
                  {/* Image Section */}
                  <div className="relative h-64 bg-gradient-to-b from-gray-50 to-white mb-6">
                    <Image
                      src={selectedModel.image}
                      alt={selectedModel.name}
                      fill
                      className="object-contain p-4"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-primary-900 text-white text-xs font-medium uppercase tracking-wider">
                        {selectedModel.badge}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 flex flex-col">
                    {/* Description */}
                    <div className="mb-6">
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {selectedModel.description}
                      </p>
                    </div>

                    {/* Specifications */}
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Specifications</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedModel.specs.map((spec, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-center space-x-3 p-3 bg-gray-50 border border-gray-100"
                          >
                            <div className="w-10 h-10 bg-primary-light bg-opacity-40 flex items-center justify-center flex-shrink-0">
                              <spec.icon className="w-5 h-5 text-primary-900" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">{spec.label}</p>
                              <p className="text-sm font-bold text-gray-900">{spec.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Key Features</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedModel.features.slice(0, 6).map((feature, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-center space-x-2"
                          >
                            <Check className="w-4 h-4 text-primary-700 flex-shrink-0" />
                            <span className="text-sm text-gray-700 truncate">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA Section - Fixed at Bottom */}
                  <div className="mt-auto pt-6 border-t border-gray-200">
                    <Link 
                      href={selectedModel.link}
                      className="group inline-flex items-center justify-center w-full py-3 bg-primary-700 text-white font-medium hover:bg-primary-900 transition-colors duration-300"
                    >
                      Explore {selectedModel.name} in Detail
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:ml-3 transition-all duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}