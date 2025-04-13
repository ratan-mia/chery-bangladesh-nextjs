'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function HeroSection() {
  // This would normally come from a theme context or provider
  // Using the dark theme from the design system by default
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
  
  useEffect(() => {
    setIsInView(true)
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

  return (
    <section className="relative w-full overflow-hidden" aria-label="Contact Us Hero Section">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/contact/contact-hero.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          aria-hidden="true"
          quality={90}
        />
        {/* Custom overlay with design system gradient */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(17, 24, 39, 0.5), rgba(17, 24, 39, 0.6))'
          }}
          aria-hidden="true"
        />
      </div>
      
      {/* Content area - using grid system from design guidelines */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" style={{ minHeight: '80vh' }}>
          {/* Center positioned content following design system grid */}
          <motion.div
            className="lg:col-span-8 lg:col-start-3 text-center"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Accent element */}
            <div 
              className="h-1.5 w-28 mx-auto mb-8"
              style={{ backgroundColor: theme.accentLine }}
            />
            
            {/* Primary heading with design system typography */}
            <motion.h1 
              className="text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ 
                color: theme.text,
                letterSpacing: '-0.01em',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}
              variants={itemVariants}
            >
              Contact Us
            </motion.h1>
            
            {/* Content container with backdrop blur */}
            <motion.div
              className="backdrop-blur-sm p-8 md:p-10  mx-auto max-w-2xl"
              style={{
                backgroundColor: theme.contentBg,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
              }}
              variants={itemVariants}
            >
              <motion.p 
                className="text-lg leading-relaxed mb-8"
                style={{ color: theme.textSecondary }}
                variants={itemVariants}
              >
                We're here to answer your questions and help you find your perfect Chery vehicle. Our team of experts is ready to provide you with the information and assistance you need.
              </motion.p>
              
              {/* Primary button with design system styling */}
              <motion.div variants={itemVariants}>
                <a
                  href="#contact-form"
                  className="inline-flex items-center justify-center px-8 py-4 font-medium transition-all duration-300"
                  style={{
                    backgroundColor: theme.buttonBg,
                    color: theme.buttonText,
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  Get in Touch
                  <svg className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative element with glow */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <div
          className="absolute inset-0 blur-3xl opacity-30"
          style={{
            background: `radial-gradient(circle at center, ${theme.accent}44 0%, transparent 70%)`,
            transform: 'translate(0, -5%)',
            height: '100px'
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  )
}