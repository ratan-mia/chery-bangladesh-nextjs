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
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.2 }
    )
    
    const currentRef = sectionRef.current
    
    if (currentRef) {
      observer.observe(currentRef)
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  // Handle video modal open/close
  const openVideo = () => {
    setIsVideoOpen(true)
    // Lock scroll when modal is open
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden'
    }
  }

  const closeVideo = () => {
    setIsVideoOpen(false)
    // Restore scroll when modal is closed
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

  // Animation variants following design system guidelines
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Adjusted to match design guidelines
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Using 20px as per design guidelines
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5, // Slow transition as per guidelines
        ease: "easeOut"
      }
    }
  }
  
  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        duration: 0.5, // Slow transition
        ease: "easeOut",
        delay: 0.6
      }
    }
  }

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-black min-h-[90vh] flex items-center overflow-hidden"
      aria-label="Brand showcase section"
    >
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/banners/video_pc.jpg" 
          alt="Chery Brand Luxury Vehicle Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Using primary-900 with opacity as per brand guidelines */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-primary-900/40 to-black/30" />
      </div>
      
      {/* Content container with proper spacing */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-xl"
        >
          {/* Accent line above the subtitle */}
          <motion.div 
            variants={itemVariants}
            className="w-16 h-1 bg-primary-700 mb-6"
          ></motion.div>
          
          <motion.span 
            variants={itemVariants}
            className="inline-block text-primary-light font-medium mb-3 text-sm tracking-wider uppercase"
          >
            Enjoy Your First Class
          </motion.span>
          
          <motion.h1 
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
          >
            The Face of <span className="text-primary-light">First Class</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-base md:text-lg text-white/80 mb-8 leading-normal"
          >
            Discover the Chery Tiggo family - an engineering marvel offering symphony of stability and handling. With ground clearance that rises above the ordinary, gliding effortlessly over any terrain.
          </motion.p>
          
          <motion.div 
            variants={buttonVariants}
            className="flex flex-wrap gap-4"
          >
            <button 
              onClick={openVideo}
              className="group inline-flex items-center gap-2 bg-primary-700 hover:bg-primary-900 transition-colors duration-300 px-10 py-4 text-white font-medium"
              aria-label="Play brand film video"
            >
              <div className="relative">
                <div className="w-6 h-6 flex items-center justify-center bg-white rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-primary-700 ml-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="absolute -inset-1 rounded-full animate-ping-slow bg-white/30"></div>
              </div>
              Watch Brand Film
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
            </button>
            
            <a
              href="#explore"
              className="inline-flex items-center justify-center bg-transparent border border-primary-700 text-white font-medium hover:bg-primary-700/10 transition-colors duration-300 px-10 py-4"
              aria-label="Explore vehicle models"
            >
              Explore Models
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Video modal with proper backdrop blur and animations */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={closeVideo}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on content
            >
              <button
                onClick={closeVideo}
                className="absolute -top-12 right-0 text-white hover:text-primary-700 transition-colors duration-300"
                aria-label="Close video"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              <div className="aspect-video bg-black overflow-hidden rounded shadow-xl border border-primary-700/30">
                <video
                  ref={videoRef}
                  controls
                  className="w-full h-full object-cover"
                  autoPlay
                >
                  <source src="/videos/chery-brand-film.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              
              <div className="mt-6">
                <h3 className="text-xl font-bold text-white mb-2">Chery Brand Film</h3>
                <p className="text-primary-light text-sm">Experience the luxury that transcends the bounds of a mere vehicle</p>
              </div>
            </motion.div>
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