'use client'

import { motion } from 'framer-motion'
import { Clock, ExternalLink, MapPin, Navigation } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function MapSection({ mapSrc, location = { address: "123 Main Street, Dhaka, Bangladesh", coordinates: "23.8103, 90.4125" } }) {
  // Theme configuration based on the climate design system
  const theme = {
    accent: '#e2cdb8',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.95)',
    buttonBg: '#e2cdb8',
    buttonText: '#111827',
    accentLine: '#e2cdb8',
    contentBg: 'rgba(17, 24, 39, 0.85)'
  }

  const [isInView, setIsInView] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const sectionRef = useRef(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 }
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

  // Animation variants from the design system
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const openDirections = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${location.coordinates}`, '_blank')
  }

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden"
    >
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(17, 24, 39, 1), rgba(17, 24, 39, 0.95))'
          }}
        />
        
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 z-1 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Accent line */}
          <motion.div 
            variants={itemVariants}
            className="h-1.5 w-28 mx-auto mb-8"
            style={{ backgroundColor: theme.accentLine }}
          />
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold mb-12 text-center leading-tight"
            style={{ 
              color: theme.text,
              letterSpacing: '-0.01em'
            }}
          >
            Find Our Showroom
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Info panel */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-4 lg:col-start-1 order-2 lg:order-1"
            >
              <div 
                className="backdrop-blur-sm p-8 md:p-10 h-full"
                style={{
                  backgroundColor: theme.contentBg,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div 
                  className="h-1 w-16 mb-6"
                  style={{ backgroundColor: theme.accentLine }}
                />
                
                <h3 
                  className="text-2xl font-medium mb-6"
                  style={{ color: theme.textSecondary }}
                >
                  Visit Us
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin 
                      style={{ color: theme.accent }} 
                      className="w-5 h-5 mt-1 mr-3 flex-shrink-0" 
                    />
                    <div>
                      <h4 
                        className="font-medium mb-1"
                        style={{ color: theme.text }}
                      >
                        Address
                      </h4>
                      <p 
                        style={{ color: theme.textSecondary }}
                        className="text-lg leading-relaxed"
                      >
                        {location.address}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock 
                      style={{ color: theme.accent }} 
                      className="w-5 h-5 mt-1 mr-3 flex-shrink-0" 
                    />
                    <div>
                      <h4 
                        className="font-medium mb-1"
                        style={{ color: theme.text }}
                      >
                        Business Hours
                      </h4>
                      <p 
                        style={{ color: theme.textSecondary }}
                        className="text-lg leading-relaxed"
                      >
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button
                    onClick={openDirections}
                    className="inline-flex items-center justify-center px-8 py-4 transition-all duration-300"
                    style={{
                      backgroundColor: theme.buttonBg,
                      color: theme.buttonText,
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <Navigation className="mr-2 -ml-1 w-5 h-5" />
                    Get Directions
                    
                    <motion.div
                      animate={{ x: isHovering ? 4 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </motion.div>
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Map container */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-8 lg:col-start-5 order-1 lg:order-2"
            >
              <div
                className="overflow-hidden"
                style={{
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                  height: '500px'
                }}
              >
                {/* Map decorative frame */}
                <div className="p-1 h-full" style={{ backgroundColor: theme.accent }}>
                  <iframe 
                    src={mapSrc}
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, display: 'block' }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Chery Bangladesh Location Map"
                    aria-label="Map showing Chery Bangladesh location"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div 
        className="absolute inset-x-0 bottom-0 blur-3xl opacity-30 z-0"
        style={{
          background: `radial-gradient(circle at center, ${theme.accent}44 0%, transparent 70%)`,
          transform: 'translate(0, 50%)',
          height: '200px'
        }}
        aria-hidden="true"
      />
      
      {/* Additional decorative element */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 0.15 : 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute -top-20 -right-20 w-64 h-64 blur-2xl z-0"
        style={{
          background: `radial-gradient(circle at center, ${theme.accent}66 0%, transparent 70%)`
        }}
        aria-hidden="true"
      />
    </section>
  )
}