'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const ContactSection = () => {
  const [isInView, setIsInView] = useState(false)
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

  // Simplified animation variants for cleaner transitions
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
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
      className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src="/images/banners/contact.jpg" 
          alt="Chery SUV by a pool" 
          fill 
          className="object-cover"
          priority
          sizes="100vw"
          quality={100}
        />
        
        {/* Flat overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
      </div>
      
      {/* Split layout container */}
      <div className="relative z-10 h-full container mx-auto px-4 md:px-8">
        <div className="h-full flex flex-col justify-center">
          <div className="max-w-md md:max-w-lg">
            {/* Top accent line */}
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "3rem" } : { width: 0 }}
              transition={{ duration: 0.5 }}
              className="h-1 bg-primary mb-8"
            ></motion.div>
            
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {/* Heading with improved typography */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">
                Connect with <span className="text-primary">Chery Bangladesh</span>
              </h2>
              
              {/* Enhanced description */}
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-md">
                Experience premium automotive excellence and personalized service. Let's start a conversation today.
              </p>
              
              {/* Contact options with clean, flat design */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm border-l-2 border-primary p-4">
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-white font-medium">Email Us</span>
                  </div>
                  <a href="mailto:info@cherybd.com" className="text-white/80 hover:text-white transition-colors">
                  info@cherybd.com
                  </a>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm border-l-2 border-primary p-4">
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-white font-medium">Call Us</span>
                  </div>
                  <a href="tel:09639119977" className="text-white/80 hover:text-white transition-colors">
                  09639119977
                  </a>
                </div>
              </div>
              
              {/* CTA buttons with clean, flat design */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white py-3 px-8 font-medium transition-colors duration-300 group"
                >
                  Contact Us
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                
                <Link 
                  href="/service#locations" 
                  className="inline-flex items-center justify-center bg-transparent border border-white text-white py-3 px-8 font-medium hover:bg-white/10 transition-colors duration-300"
                >
                  Find us on Map
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Business hours callout */}
      <motion.div 
  className="hidden sm:block absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 bg-white/10 backdrop-blur-sm p-3 sm:p-4 md:p-6 w-auto max-w-[85%] sm:max-w-xs md:max-w-sm rounded-lg shadow-lg"
  initial={{ opacity: 0, y: 20 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
  transition={{ duration: 0.5, delay: 0.3 }}
>
  <div className="border-l-2 border-primary pl-3 sm:pl-4">
    <h3 className="text-white font-medium text-base sm:text-lg mb-1 sm:mb-2">Business Hours</h3>
    <p className="text-white/80 text-xs sm:text-sm mb-0.5 sm:mb-1">Mon-Fri: 10:00 AM - 8:00 PM</p>
    <p className="text-white/80 text-xs sm:text-sm mb-0.5 sm:mb-1">Saturday: 10:00 AM - 8:00 PM</p>
    <p className="text-white/80 text-xs sm:text-sm">Govt. Holidays: Closed(Not Always)</p>
  </div>
</motion.div>
    </section>
  )
}

export default ContactSection