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

  // Handle video modal open/close
  const openVideo = () => {
    setIsVideoOpen(true)
    // Use a more React-friendly approach to manipulate body class
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden'
    }
  }

  const closeVideo = () => {
    setIsVideoOpen(false)
    // Use a more React-friendly approach to manipulate body class
    if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }
    
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
  
  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        delay: 0.6
      }
    }
  }

  return (
    <section ref={sectionRef} className="relative bg-black min-h-[80vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/hero-bg.jpg" 
          alt="Chery Brand Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-xl"
        >
          <motion.span 
            variants={itemVariants}
            className="inline-block text-primary-500 font-medium mb-3"
          >
            Next Generation Vehicles
          </motion.span>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Redefining Automotive Excellence
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-white/80 mb-8"
          >
            Discover the perfect blend of innovation, style, and performance in every Chery vehicle. Designed for the future, built for today.
          </motion.p>
          
          <motion.div 
            variants={buttonVariants}
            className="flex flex-wrap gap-4"
          >
            <button 
              onClick={openVideo}
              className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 transition-colors px-6 py-3 rounded-full text-white font-medium"
            >
              <div className="relative">
                <div className="w-6 h-6 flex items-center justify-center bg-white rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-primary-500">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="absolute -inset-1 rounded-full animate-ping-slow bg-white/30"></div>
              </div>
              Watch Brand Film
            </button>
            
            <a
              href="#explore"
              className="px-6 py-3 rounded-full border border-white/30 text-white font-medium hover:bg-white/10 transition-colors"
            >
              Explore Models
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Video modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          >
            <div className="relative w-full max-w-4xl">
              <button
                onClick={closeVideo}
                className="absolute -top-12 right-0 text-white hover:text-primary-500 transition-colors"
                aria-label="Close video"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              <div className="aspect-video bg-black/50 overflow-hidden rounded-lg">
                <video
                  ref={videoRef}
                  controls
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/chery-brand-film.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              
              <h3 className="text-xl font-bold text-white mt-4">Chery Brand Film</h3>
              <p className="text-sm text-white/60">Experience the next generation of automotive excellence</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Custom animation for ping effect */}
      <style jsx>{`
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        .animate-ping-slow {
          animation: ping-slow 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  )
}
