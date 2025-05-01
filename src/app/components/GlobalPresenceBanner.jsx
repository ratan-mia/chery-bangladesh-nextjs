'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const GlobalPresenceBanner = () => {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef(null)
  const videoRef = useRef(null)

  // Use intersection observer to trigger animations when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        } else {
          setIsInView(false)
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
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

  // Playback optimization - pause video when not in view
  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(() => {
          // Auto-play might be blocked by browser, handle silently
        })
      } else {
        videoRef.current.pause()
      }
    }
  }, [isInView])

  // Animation variants aligned with design system
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Adjusted to match design guidelines (0.1)
        delayChildren: 0.1,
        duration: 0.5 // Adjusted to match design guidelines
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Using 20px as per design guidelines
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5, // Adjusted to match design guidelines
        ease: "easeOut"
      }
    }
  }

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-[90vh] min-h-[600px] max-h-[900px] overflow-hidden"
      aria-label="Global presence information"
    >
      {/* Background video with optimized loading */}
      <div className="absolute inset-0 w-full h-full bg-gray-900">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/ocean-poster.jpg"
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/videos/ocean-horizon.mp4" type="video/mp4" />
        </video>
        
        {/* Gradient overlay using brand colors */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/60 via-primary-900/40 to-black/70 backdrop-filter backdrop-blur-sm"></div>
      </div>
      
      {/* Content container */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Top accent line using primary color */}
            <motion.div 
              className="w-24 h-1 bg-primary-700 mx-auto mb-8"
              variants={itemVariants}
            ></motion.div>
            
            {/* Subtitle with brand styling */}
            <motion.span 
              className="inline-block text-primary-light font-medium mb-3 text-sm tracking-wider uppercase"
              variants={itemVariants}
            >
              Excellence & Innovation Across Continents
            </motion.span>
            
            {/* Heading with improved typography */}
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
              variants={itemVariants}
            >
              Global <span className="text-primary-light">Presence</span>
            </motion.h2>
            
            {/* Description with better typography and contrast */}
            <motion.p
              className="text-base md:text-lg text-white/80 leading-normal mb-10 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Chery International maintains a distinguished global presence in over 100 countries 
              and regions. As a premium luxury brand, we're recognized worldwide for engineering 
              excellence and breakthrough innovation. Our extensive global network ensures exceptional 
              service and personalized support for our customers wherever they are.
            </motion.p>
            
            {/* CTA buttons - styled according to design system */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
              variants={itemVariants}
            >
              <Link 
                href="/about" 
                className="group inline-flex items-center px-10 py-4 bg-primary-700 hover:bg-primary-900 text-white font-medium transition-colors duration-300"
                aria-label="Explore our global network"
              >
                Explore Our Network
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="ml-2 group-hover:ml-3 transition-all duration-300"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              
              <Link 
                href="/about" 
                className="inline-flex items-center justify-center px-10 py-4 bg-transparent border border-primary-700 text-white font-medium hover:bg-primary-700/10 transition-colors duration-300"
                aria-label="Read about Chery"
              >
                About Chery
              </Link>
            </motion.div>
            
            {/* Bottom accent line */}
            <motion.div 
              className="w-16 h-0.5 bg-primary-800 opacity-40 mx-auto mt-16"
              variants={itemVariants}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 0.4, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            ></motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Optional floating indicators - add visual interest */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-primary-light"></span>
          <span className="w-16 h-0.5 bg-primary-light"></span>
          <span className="text-primary-light text-xs tracking-widest uppercase font-medium">Global Presence</span>
        </motion.div>
      </div>
    </section>
  )
}

export default GlobalPresenceBanner