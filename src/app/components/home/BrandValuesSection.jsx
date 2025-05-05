'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Award, Cpu, Shield, Zap } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

// Container animation variants
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

// Item animation variants with spring physics for premium feel
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 14,
      duration: 0.5
    }
  }
}

export default function CheryFeaturesGrid() {
  // State management
  const [hoveredFeature, setHoveredFeature] = useState(null)
  const [windowWidth, setWindowWidth] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef(null)
  
  // Handle window resize for responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    
    // Set initial width
    handleResize()
    
    // Add event listener
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  // Parallax effect for background images
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0
      
      if (isVisible) {
        setIsInView(true)
        const scrollPosition = window.scrollY
        const parallaxElements = sectionRef.current.querySelectorAll('.parallax-bg')
        
        parallaxElements.forEach(element => {
          const speed = element.dataset.speed || 0.15
          const yPos = -(scrollPosition * speed)
          element.style.transform = `translate3d(0, ${yPos}px, 0)`
        })
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Feature data
  const features = [
    { 
      title: 'Superior Performance', 
      desc: 'Experience power and efficiency with our advanced turbocharged engines that deliver responsive acceleration and impressive fuel economy.',
      icon: Zap,
      accent: '#8c735d' // primary-700
    },
    { 
      title: 'Advanced Safety', 
      desc: 'Comprehensive safety systems with intelligent collision prevention technology and reinforced body structure to protect what matters most.',
      icon: Shield,
      accent: '#8c735d' // primary-700
    },
    { 
      title: 'Smart Technology', 
      desc: 'Stay connected with cutting-edge infotainment systems and sophisticated driver assistance features for a more intelligent driving experience.',
      icon: Cpu,
      accent: '#8c735d' // primary-700
    },
    { 
      title: 'Premium Warranty', 
      desc: 'Enjoy complete peace of mind with our exceptional 5-year comprehensive warranty coverage, including 24/7 roadside assistance.',
      icon: Award,
      accent: '#8c735d' // primary-700
    }
  ]
  
  // Determine if mobile view
  const isMobile = windowWidth < 640
  const isTablet = windowWidth >= 640 && windowWidth < 1024

  return (
    <section 
      ref={sectionRef} 
      className="py-12 md:py-20 lg:py-24 relative overflow-hidden"
      style={{ backgroundColor: '#f8f5f1' }}
    >
      {/* Background elements */}
         {/* Background car image with parallax effect - hidden on mobile */}
         {/* <div className="absolute left-0 right-0 bottom-0 w-full h-full md:h-full opacity-0 md:opacity-15 lg:opacity-20 parallax-bg" data-speed="0.08">
          <Image 
            src="/images/car-silhouette.png" 
            alt="Luxury car silhouette" 
            fill 
            className="object-cover"
            priority={false}
          />
        </div> */}
      <div className="absolute inset-0 z-0">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 mix-blend-overlay">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid-pattern" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#8c735d" strokeWidth="0.5" opacity="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-48 md:w-80 h-48 md:h-80 bg-primary-light opacity-20 filter blur-3xl -translate-x-20 md:-translate-x-40 -translate-y-20 md:-translate-y-40 parallax-bg" data-speed="0.05"></div>
        <div className="absolute top-1/4 right-0 w-64 md:w-96 h-64 md:h-96 bg-primary-700 opacity-10 filter blur-3xl translate-x-1/3 md:translate-x-1/2 parallax-bg" data-speed="0.1"></div>
        <div className="absolute bottom-0 left-1/3 w-48 md:w-64 h-48 md:h-64 bg-primary-800 opacity-15 filter blur-2xl translate-y-1/3 md:translate-y-1/2 parallax-bg" data-speed="0.15"></div>
        
     
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-16">
          <motion.p
            className="text-primary-900 font-medium text-xs sm:text-sm md:text-base uppercase tracking-wider mb-2 md:mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Extraordinary Engineering
          </motion.p>
          
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Exceptional <span className="text-primary-900">Features</span>
          </motion.h2>
          
          {/* Accent bar with enhanced animation */}
          <motion.div 
            className="w-16 sm:w-20 md:w-24 h-1 bg-primary-700 mx-auto mb-4 md:mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: isMobile ? 64 : isTablet ? 80 : 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          />
          
          <motion.p 
            className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Discover what makes our vehicles stand out from the crowd with these extraordinary features
            designed to elevate your driving experience to new heights.
          </motion.p>
        </div>
        
        {/* Features grid with responsive layout */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div 
                  className="border border-gray-200 bg-white shadow-sm overflow-hidden group-hover:border-primary-700 hover:shadow-lg transition-all duration-500 h-full backdrop-blur-sm bg-white/95"
                  style={{ 
                    transform: hoveredFeature === index ? 'translateY(-8px)' : 'none',
                    transition: 'transform 0.5s ease-out, border-color 0.3s ease, box-shadow 0.5s ease'
                  }}
                >
                  {/* Top accent */}
                  <div 
                    className="h-1 w-full transition-all duration-300" 
                    style={{ 
                      backgroundColor: feature.accent,
                      opacity: hoveredFeature === index ? 1 : 0.4,
                      width: hoveredFeature === index ? '100%' : '50%',
                      marginLeft: hoveredFeature === index ? '0' : '25%',
                    }} 
                  />
                  
                  <div className="p-4 sm:p-6 md:p-8 relative">
                    {/* Background decorative element */}
                    <div 
                      className="absolute bottom-0 right-0 w-32 md:w-40 h-32 md:h-40 transition-opacity duration-500"
                      style={{ 
                        background: `radial-gradient(circle, ${feature.accent}10 0%, transparent 70%)`,
                        opacity: hoveredFeature === index ? 0.8 : 0,
                        transform: hoveredFeature === index ? 'scale(1.2)' : 'scale(1)',
                      }}
                    />
                    
                    {/* Icon container with responsive sizing */}
                    <div 
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-4 sm:mb-5 md:mb-6 relative z-10 transition-all duration-300"
                      style={{ 
                        backgroundColor: hoveredFeature === index ? `${feature.accent}20` : '#f0ece6',
                        transform: hoveredFeature === index ? 'scale(1.05)' : 'scale(1)',
                      }}
                    >
                      <IconComponent 
                        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-colors duration-300" 
                        style={{ color: hoveredFeature === index ? feature.accent : '#524336' }} 
                      />
                    </div>
                    
                    {/* Responsive typography */}
                    <h3 
                      className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 md:mb-4 relative z-10 transition-colors duration-300"
                      style={{ color: hoveredFeature === index ? feature.accent : '#111827' }}
                    >
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm sm:text-base leading-normal mb-4 sm:mb-6 md:mb-8 relative z-10">
                      {feature.desc}
                    </p>
                    
                    {/* Learn more link */}
                    <div 
                      className="flex items-center font-medium text-xs sm:text-sm relative z-10 transition-all duration-300"
                      style={{ 
                        color: feature.accent,
                        transform: hoveredFeature === index ? 'translateX(4px)' : 'translateX(0)',
                        opacity: hoveredFeature === index ? 1 : 0.7
                      }}
                    >
                      <span>Learn more</span>
                      <ArrowRight 
                        size={isMobile ? 14 : 16} 
                        className="ml-1 sm:ml-2 transition-all duration-300"
                        style={{ 
                          transform: hoveredFeature === index ? 'translateX(4px)' : 'translateX(0)'
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className="h-0.5 w-full bg-gray-200 mt-auto overflow-hidden">
                    <div 
                      className="h-full transition-all duration-700 ease-out"
                      style={{ 
                        backgroundColor: feature.accent,
                        width: hoveredFeature === index ? '100%' : '0%'
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
        
        {/* Responsive CTA button */}
        <motion.div 
          className="mt-10 sm:mt-12 md:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {/* Mobile button */}
          <a 
            href="#explore-features"
            className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 bg-primary-700 text-white text-sm sm:text-base font-medium hover:bg-primary-900 transition-all duration-300 group"
          >
            Explore All Features
            <ArrowRight 
              size={isMobile ? 16 : 20} 
              className="ml-2 group-hover:ml-3 transition-all duration-300"
            />
          </a>
        </motion.div>
      </div>
      
      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-800 opacity-30"></div>
    </section>
  )
}