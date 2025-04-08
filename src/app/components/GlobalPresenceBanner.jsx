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

  // Animation variants - simplified for cleaner transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
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
        
        {/* Flat, clean gradient overlay */}
        <div className="absolute inset-0 bg-primary/30 backdrop-filter backdrop-blur-[2px]"></div>
      </div>
      
      {/* Content container with better vertical positioning */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Top accent line - matching other sections */}
          <motion.div 
            className="w-12 h-1 bg-white mx-auto mb-8"
            variants={itemVariants}
          ></motion.div>
          
          {/* Heading with improved typography */}
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
            variants={itemVariants}
          >
            Global Presence
          </motion.h2>
          
          {/* Subtitle */}
          <motion.h3 
            className="text-xl md:text-2xl text-white/90 font-light mb-8"
            variants={itemVariants}
          >
            Excellence & innovation across continents
          </motion.h3>
          
          {/* Description with better line height and spacing */}
          <motion.p
            className="text-base md:text-lg text-white/80 leading-relaxed mb-10 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Chery International proudly maintains a prominent global presence,
            conducting business in over 100 countries and regions as a top-tier luxury
            brand recognized for its excellence and innovation. Our worldwide network
            ensures exceptional service and support for customers everywhere.
          </motion.p>
          
          {/* CTA buttons - dual option */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
            variants={itemVariants}
          >
            <Link 
              href="/global-network" 
              className="px-8 py-3 bg-primary text-white hover:bg-primary-dark transition-colors duration-300 inline-flex items-center"
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
              className="px-8 py-3 border border-white/30 text-white hover:bg-white/10 transition-colors duration-300"
            >
              About Chery
            </Link>
          </motion.div>
          
          {/* Countries counter */}
          <motion.div 
            className="flex justify-center mt-12"
            variants={itemVariants}
          >
            <div className="border-l-2 border-primary pl-4">
              <div className="text-4xl font-bold text-white">100+</div>
              <div className="text-white/70 text-sm uppercase tracking-wider">Countries & Regions</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <span className="text-xs uppercase tracking-widest mb-2">Scroll Down</span>
        <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-2 bg-white mt-2 rounded-full"
            animate={{ 
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop"
            }}
          ></motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default GlobalPresenceBanner