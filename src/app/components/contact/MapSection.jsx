'use client'

import { motion } from 'framer-motion'
import { Clock, ExternalLink, MapPin, Navigation } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function MapSection({ mapSrc, location = { address: "206/1-207/1 Bir Uttam Mir Shawkat Sarak, Tejgaon Gulshan Link Road, Dhaka", coordinates: "23.8103, 90.4125" } }) {
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

  // Animation variants
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  const openDirections = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${location.coordinates}`, '_blank')
  }

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden bg-white border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section header */}
          <div className="text-center mb-16">
            <motion.div
              variants={itemVariants}
              className="h-1 w-10 mx-auto mb-4 bg-primary"
            />

            <motion.span
              variants={itemVariants}
              className="inline-block text-lg uppercase tracking-wider mb-3 text-primary"
            >
              Visit Our Showroom
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 text-gray-900"
            >
              Find Our Location
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Info panel */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-4 lg:col-start-1 order-2 lg:order-1"
            >
              <div 
                className="p-8 border border-gray-200 h-full shadow-sm border-l-2 border-l-primary bg-white"
              >
                <h3 
                  className="text-2xl font-medium mb-6 text-gray-900"
                >
                  Visit Us
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin 
                      className="w-5 h-5 mt-1 mr-3 flex-shrink-0 text-primary" 
                    />
                    <div>
                      <h4 
                        className="font-medium mb-1 text-gray-900"
                      >
                        Address
                      </h4>
                      <p 
                        className="text-lg leading-relaxed text-gray-600"
                      >
                        {location.address}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock 
                      className="w-5 h-5 mt-1 mr-3 flex-shrink-0 text-primary" 
                    />
                    <div>
                      <h4 
                        className="font-medium mb-1 text-gray-900"
                      >
                        Business Hours
                      </h4>
                      <p 
                        className="text-lg leading-relaxed text-gray-600"
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
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-dark text-white transition-colors duration-300 group"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <Navigation className="mr-2 -ml-1 w-5 h-5" />
                    Get Directions
                    
                    <motion.div
                      animate={{ x: isHovering ? 4 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="group-hover:translate-x-1 transition-transform duration-300"
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
                className="overflow-hidden border border-gray-200 shadow-md"
                style={{
                  height: '500px'
                }}
              >
                {/* Map frame with top border accent */}
                <div className="p-1 h-full border-t-2 border-primary">
                  <iframe 
                    src={mapSrc || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.3037670379485!2d90.41002851498242!3d23.77189248458199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7715a40c603%3A0xec01cd75f33139f5!2sTejgaon%20-%20Gulshan%20Link%20Rd%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1650123456789!5m2!1sen!2sbd"}
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
    </section>
  )
}