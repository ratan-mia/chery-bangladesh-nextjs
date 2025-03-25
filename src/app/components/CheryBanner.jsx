'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function HeroBanner() {
  const [isInView, setIsInView] = useState(false)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const videoRef = useRef(null)
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

  // Handle video modal open/close
  const openVideo = () => {
    setIsVideoOpen(true)
    document.body.classList.add('overflow-hidden')
  }

  const closeVideo = () => {
    setIsVideoOpen(false)
    document.body.classList.remove('overflow-hidden')
    
    // Properly pause video when modal is closed
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  // Close on escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        closeVideo()
      }
    }
    
    window.addEventListener('keydown', handleEsc)
    
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  }
  
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: 0.6
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  }
  
  const carsVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 1.2, 
        ease: "easeOut",
        delay: 0.3
      }
    }
  }

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  }

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen min-h-[600px] flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Background overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-gray-900/40 to-gray-800/20 z-10"></div>
      
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src="/images/banners/video_pc.jpg" 
          alt="Mountain landscape" 
          fill 
          className="object-cover"
          priority
          sizes="100vw"
          quality={95}
        />
      </div>
      
      {/* Content container */}
      <div className="relative z-20 text-center max-w-6xl mx-auto px-4 flex flex-col items-center">
        {/* Heading */}
        <motion.div
          className="mb-12 md:mb-16 lg:mb-20"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h1 className="font-sans text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-wide uppercase">
            Conquer with you
          </h1>
          <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-wide uppercase mt-2">
            Guard for love
          </h2>
        </motion.div>
        
        {/* Play button - cleaner design */}
        <motion.button
          variants={buttonVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover="hover"
          whileTap="tap"
          className="mb-10 md:mb-16 relative group"
          onClick={openVideo}
          aria-label="Play video"
        >
          <div className="flex items-center">
            <div className="w-16 h-16 md:w-18 md:h-18 bg-white rounded-full flex items-center justify-center shadow-lg relative z-10">
              <span className="text-gray-800 flex items-center justify-center translate-x-0.5">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  className="w-7 h-7"
                >
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              </span>
            </div>
            <span className="ml-4 text-white text-base md:text-lg font-medium">
              View more
            </span>
          </div>
          
          {/* Pulsing animation */}
          <div className="absolute top-0 left-0 w-16 h-16 md:w-18 md:h-18 rounded-full -z-10">
            <motion.div 
              className="absolute inset-0 rounded-full bg-white/40"
              animate={{ 
                scale: [1, 1.5],
                opacity: [0.4, 0]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
            <motion.div 
              className="absolute inset-0 rounded-full bg-white/40"
              animate={{ 
                scale: [1, 1.5],
                opacity: [0.4, 0]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.5
              }}
            />
          </div>
        </motion.button>
      </div>
      
      {/* Ground shadow overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-[25%] bg-gradient-to-t from-black/80 to-transparent z-10"></div>

      {/* Full screen video modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Video container */}
            <div className="w-full h-full relative">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                controls
                controlsList="nodownload"
                src="/videos/popup-video.mp4"
              />
              
              {/* Close button - improved position and styling */}
              <button
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 z-10"
                onClick={closeVideo}
                aria-label="Close video"
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
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}