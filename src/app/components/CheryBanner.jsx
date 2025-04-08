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
        delay: 0.5
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
      className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden"
    >
      {/* Background overlay - flat, clean design */}
      <div className="absolute inset-0 bg-primary/30 backdrop-filter backdrop-blur-[2px] z-10"></div>
      
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full bg-gray-900">
        <Image 
          src="/images/banners/video_pc.jpg" 
          alt="Mountain landscape" 
          fill 
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
      </div>
      
      {/* Content container - better positioning */}
      <div className="relative z-20 h-full flex flex-col justify-center">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            className="max-w-4xl"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Top accent line - consistent with other sections */}
            <motion.div 
              className="w-12 h-1 bg-white mb-8"
              variants={itemVariants}
            ></motion.div>
            
            {/* Heading - improved typography */}
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-4"
              variants={itemVariants}
            >
              Conquer with you,<br />
              Guard for love
            </motion.h1>
            
            {/* Added subtitle for better content hierarchy */}
            <motion.p
              className="text-xl md:text-2xl text-white/90 font-light mb-8 max-w-2xl"
              variants={itemVariants}
            >
              Experience exceptional luxury and performance that transcends expectations
            </motion.p>
            
            {/* Play button - cleaner, flat design */}
            <motion.div
              variants={buttonVariants}
              className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <button
                onClick={openVideo}
                aria-label="Play video"
                className="group flex items-center gap-4 focus:outline-none"
              >
                <div className="relative">
                  <div className="w-14 h-14 bg-white flex items-center justify-center group-hover:scale-95 transition-transform duration-300">
                    <span className="text-primary flex items-center justify-center translate-x-0.5">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M8 5.14v14l11-7-11-7z" />
                      </svg>
                    </span>
                  </div>
                  
                  {/* Pulsing animation */}
                  <div className="absolute top-0 left-0 w-14 h-14 -z-10">
                    <div 
                      className="absolute inset-0 bg-white/40 animate-ping-slow opacity-0"
                    />
                  </div>
                </div>
                <span className="text-white text-base font-medium">
                  Watch Brand Video
                </span>
              </button>
              
              {/* Added secondary action button */}
              <a 
                href="/models" 
                className="px-6 py-3 bg-white text-primary hover:bg-white/90 transition-colors duration-300"
              >
                Explore Models
              </a>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 right-8 z-30 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="h-20 w-[1px] bg-white/30"></div>
          <div className="transform -rotate-90 mt-4 text-white/70 text-xs uppercase tracking-widest">
            Scroll
          </div>
        </motion.div>
      </div>
      
      {/* Full screen video modal - improved design */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeVideo}
          >
            {/* Video container */}
            <div className="w-full h-full max-w-7xl max-h-[80vh] p-4 md:p-8 relative" onClick={(e) => e.stopPropagation()}>
              <div className="w-full h-full bg-black">
                <video
                  ref={videoRef}
                  className="w-full h-full object-contain"
                  autoPlay
                  playsInline
                  controls
                  controlsList="nodownload"
                  src="/videos/popup-video.mp4"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              
              {/* Close button - flat design */}
              <button
                className="absolute -top-12 right-4 w-10 h-10 text-white hover:text-white/70 transition-colors duration-300 z-10 flex items-center justify-center"
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
            
            {/* Video caption */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 text-center">
              <h3 className="text-lg font-medium">Chery Brand Film</h3>
              <p className="text-sm text-white/60">Experience the next generation of automotive excellence</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Custom animation for ping effect */}
      <style jsx global>{`
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