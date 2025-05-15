'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const ContactBanner = ({
  // Background image
  backgroundImage = "/images/tiggo9pro/contact.jpg",
  backgroundAlt = "Contact background image",
  
  // Main content
  mainHeading = "LOOKING FORWARD TO YOUR CONTACT",
  subHeading = "START A WONDERFUL LIFE WITH CHERY",
  
  // Button
  buttonText = "CONTACT US",
  buttonUrl = "/contact",
  
  // Height customization
  height = "h-[60vh] sm:h-[65vh] md:h-[70vh] lg:h-[80vh]"
}) => {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef(null)

  // Use intersection observer to trigger animations when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
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
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <section 
      ref={sectionRef} 
      className={`relative w-full ${height} overflow-hidden`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src={backgroundImage} 
          alt={backgroundAlt} 
          fill 
          className="object-cover"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
          quality={90}
        />
        
        {/* Darker overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content container */}
      <div className="relative z-10 h-full w-full px-4 sm:px-6 md:px-8 lg:container lg:mx-auto">
        <div className="h-full flex flex-col justify-center">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl"
          >
            {/* Responsive heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4 tracking-wide">
              {mainHeading}
            </h2>
            
            {/* Responsive subheading */}
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-4 sm:mb-6 md:mb-8">
              {subHeading}
            </p>
            
            {/* Responsive button */}
            <Link 
              href={buttonUrl} 
              className="inline-block bg-[#c4a77d] hover:bg-[#b39669] text-white text-sm sm:text-base py-2 px-6 sm:py-2.5 sm:px-8 md:py-3 md:px-10 lg:px-12 font-medium transition-colors duration-300 uppercase"
            >
              {buttonText}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactBanner