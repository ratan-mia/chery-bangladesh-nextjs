'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const GlobalPresenceBanner = () => {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef(null)

  // Use intersection observer to trigger animations when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
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

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.2
      }
    }
  }
  
  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: 0.6
      }
    },
    hover: {
      x: 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen min-h-[600px] flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Background video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/ocean-poster.jpg"
        >
          <source src="/videos/ocean-horizon.mp4" type="video/mp4" />
        </video>
        
        {/* Gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>
      </div>
      
      {/* Content container */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4 flex flex-col items-center">
        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide uppercase mb-8"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Global Layout
        </motion.h2>
        
        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-white/90 leading-relaxed mb-10"
          variants={textVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Chery International proudly maintains a prominent global presence,
          conducting business in over 100 countries and regions as a top-tier luxury
          brand recognized for its excellence and innovation.
        </motion.p>
        
        {/* View more button */}
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover="hover"
        >
          <Link 
            href="#view-more" 
            className="inline-flex items-center text-white hover:text-white/90 transition-colors group"
          >
            <span className="text-lg font-medium">View more</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" 
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
        </motion.div>
      </div>
    </section>
  )
}

export default GlobalPresenceBanner