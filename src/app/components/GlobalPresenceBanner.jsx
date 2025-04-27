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
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' } // Added rootMargin for earlier triggering
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

  // Animation variants - enhanced for smoother transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
        duration: 0.7
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-[85vh] min-h-[600px] max-h-[900px] overflow-hidden"
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
        >
          <source src="/videos/ocean-horizon.mp4" type="video/mp4" />
        </video>
        
        {/* Improved overlay with stronger contrast for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-gray-900/80 backdrop-filter backdrop-blur-[3px]"></div>
      </div>
      
      {/* Content container with improved vertical positioning */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Top accent line - enhanced visibility */}
          <motion.div 
            className="w-16 h-1 bg-white mx-auto mb-8"
            variants={itemVariants}
          ></motion.div>
          
          {/* Heading with improved typography and text-shadow for readability */}
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight drop-shadow-md"
            variants={itemVariants}
          >
            Global Presence
          </motion.h2>
          
          {/* Subtitle with enhanced contrast */}
          <motion.h3 
            className="text-xl md:text-2xl text-white font-light mb-8 drop-shadow-sm"
            variants={itemVariants}
          >
            Excellence & Innovation Across Continents
          </motion.h3>
          
          {/* Description with better line height, spacing and contrast */}
          <motion.p
            className="text-base md:text-lg text-white leading-relaxed mb-10 max-w-3xl mx-auto font-medium drop-shadow-sm"
            variants={itemVariants}
          >
            Chery International maintains a distinguished global presence in over 100 countries 
            and regions. As a premium luxury brand, we're recognized worldwide for engineering 
            excellence and breakthrough innovation. Our extensive global network ensures exceptional 
            service and personalized support for our customers wherever they are.
          </motion.p>
          
          {/* CTA buttons - improved styling and accessibility */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10"
            variants={itemVariants}
          >
            <Link 
              href="/about" 
              className="px-8 py-4 bg-primary text-white hover:bg-primary-dark transition-colors duration-300 inline-flex items-center  shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium"
            >
              <span>Explore Our Network</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </Link>
            
            <Link 
              href="/about" 
              className="px-8 py-4 border-2 border-white/60 text-white hover:bg-white/20 transition-all duration-300  font-medium backdrop-blur-sm"
            >
              About Chery
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default GlobalPresenceBanner