'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

const ModernParallaxHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  const heroRef = useRef(null)
  const requestRef = useRef(null)
  
  // Optimized mouse movement handler with throttling
  const handleMouseMove = useCallback((e) => {
    // Don't capture every mouse event - improves performance
    if (requestRef.current) return
    
    requestRef.current = window.requestAnimationFrame(() => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      // Calculate mouse position as percentage from center (-50 to 50)
      const x = ((clientX / innerWidth) - 0.5) * 2
      const y = ((clientY / innerHeight) - 0.5) * 2
      
      setMousePosition({ x, y })
      requestRef.current = null
    })
  }, [])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Setup event listeners and cleanup
  useEffect(() => {
    // Add event listeners with passive option for performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      
      if (requestRef.current) {
        window.cancelAnimationFrame(requestRef.current)
      }
    }
  }, [handleMouseMove])

  // Smoothly scroll to "about" section
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ 
        top: window.innerHeight, 
        behavior: 'smooth' 
      })
    }
  }

  // Get transform style for parallax effect
  const getParallaxStyle = (depth = 1) => {
    // Disable parallax on mobile for better performance
    if (windowWidth < 768) {
      return {}
    }
    
    const moveX = mousePosition.x * 10 * depth
    const moveY = mousePosition.y * 10 * depth
    return {
      transform: `translate3d(${moveX}px, ${moveY}px, 0)`,
      transition: 'transform 0.2s ease-out',
    }
  }

  // Animation variants for content elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
        duration: 0.6
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden" ref={heroRef}>
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center brightness-75"
        style={{
          backgroundImage: "url('/images/about/hero.jpg')",
          ...getParallaxStyle(0.5),
        }}
      />
      
      {/* Overlay with Chery brand color */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/60 via-black/60 to-black/80" />
      
      {/* Subtle accent pattern */}
      <div className="absolute inset-0 opacity-10 bg-repeat" 
           style={{ backgroundImage: "url('/images/pattern.png')", backgroundSize: '120px' }} />
      
      {/* Content Container */}
      <motion.div 
        className="relative h-full flex flex-col items-center justify-center text-center px-4 max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="space-y-4 md:space-y-8 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl"
          variants={containerVariants}
        >
          {/* Subtitle */}
          <motion.p 
            className="text-xs sm:text-sm md:text-base text-primary-light font-medium tracking-wider"
            variants={itemVariants}
          >
            WELCOME TO CHERY BANGLADESH
          </motion.p>
          
          {/* Main Heading */}
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
            variants={itemVariants}
          >
            DRIVING <span className="text-primary-700">INNOVATION</span> FORWARD
          </motion.h1>
          
          {/* Accent Line */}
          <motion.div 
            className="w-16 sm:w-20 md:w-24 h-1 bg-primary-700 mx-auto"
            variants={itemVariants}
          />
          
          {/* Description */}
          <motion.p 
            className="text-xs sm:text-sm md:text-lg text-white/90 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            COMMITTED TO BEING A DIVERSIFIED ENTERPRISE WITH GLOBAL INFLUENCE AND COMPETITIVENESS
          </motion.p>
          
          {/* Call to Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-2 md:pt-4 w-full max-w-xs sm:max-w-md mx-auto"
            variants={itemVariants}
          >
            <motion.a 
              href="/contact"
              className="bg-primary-700 hover:bg-primary-900 text-white px-4 sm:px-6 md:px-8 py-3 md:py-4 transition-colors duration-300 uppercase tracking-wide text-xs sm:text-sm md:text-base group flex items-center justify-center"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Get in Touch
              <ArrowRight className="ml-2 group-hover:ml-3 transition-all duration-300" size={windowWidth < 640 ? 14 : 18} />
            </motion.a>
            
            <motion.a 
              href="/about/operations"
              className="border-2 border-white hover:border-primary-700 hover:bg-white/10 text-white px-4 sm:px-6 md:px-8 py-3 md:py-4 transition-all duration-300 uppercase tracking-wide text-xs sm:text-sm md:text-base mt-2 sm:mt-0"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Operations
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className={`absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10 ${windowWidth < 640 ? 'hidden' : 'block'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <div 
          className="flex flex-col items-center cursor-pointer" 
          onClick={scrollToAbout}
        >
          <p className="text-white text-xs sm:text-sm mb-1 sm:mb-2">Scroll down</p>
          <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-white flex justify-center items-start p-1">
            <motion.div 
              className="w-1 sm:w-1.5 h-2 sm:h-3 rounded-full bg-primary-700"
              animate={{ 
                y: [0, 4, 0],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
      </motion.div>
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-primary-700" />
      
      {/* Subtle brand mark in corner */}
      <div className={`absolute top-4 sm:top-6 left-4 sm:left-6 opacity-20 ${windowWidth < 640 ? 'hidden' : 'block'}`}>
        <svg width={windowWidth < 768 ? 40 : 60} height={windowWidth < 768 ? 40 : 60} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 0L95 25V75L50 100L5 75V25L50 0Z" fill="currentColor" className="text-primary-700" />
        </svg>
      </div>
    </div>
  )
}

export default ModernParallaxHero