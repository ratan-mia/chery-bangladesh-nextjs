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
  const contentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: 0.3
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.98
    }
  }

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* Background Image (Car, pool and architectural elements) */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src="/images/banners/contact.jpg" 
          alt="Chery SUV by a pool" 
          fill 
          className="object-cover"
          priority
          sizes="100vw"
          quality={95}
        />
      </div>
      
      {/* Content container - positioned on the left side */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-lg ml-8 md:ml-16 lg:ml-24 py-20">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="bg-black/20 backdrop-blur-sm p-8 md:p-12 rounded-sm"
          >
            {/* Greeting heading with mixed styles */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-3">
              Hi there, <span className="font-normal">we are Chery Bangladesh.</span>
            </h2>
            
            {/* Subheading */}
            <p className="text-xl text-white/90 mb-8">
              We'd love to hear from you!
            </p>
            
            {/* Contact button */}
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover="hover"
              whileTap="tap"
            >
              <Link 
                href="/contact" 
                className="inline-block bg-[#b5976b] text-white py-3 px-10 uppercase tracking-wider text-sm font-medium hover:bg-[#a38655] transition-colors"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Optional: subtle gradient overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent pointer-events-none"></div>
    </section>
  )
}

export default ContactSection