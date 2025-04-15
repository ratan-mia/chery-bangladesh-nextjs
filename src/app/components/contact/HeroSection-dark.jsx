'use client'

import { motion } from 'framer-motion'
import { ChevronRight, Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function HeroSection() {
  // Theme configuration
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
  const sectionRef = useRef(null)
  
  useEffect(() => {
    // Set initial state immediately for a smoother experience
    setIsInView(true)
    
    // Enhanced intersection observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
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

  // Quick contact methods
  const contactMethods = [
    { 
      icon: Phone, 
      text: '+880 9666 795 795',
      href: 'tel:+8809666795795'
    },
    { 
      icon: Mail, 
      text: 'info@cherybd.com',
      href: 'mailto:info@cherybd.com'
    },
    { 
      icon: MapPin, 
      text: 'Find us on the map',
      href: 'https://goo.gl/maps/3v1x5Z2g7Qk',
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative w-full overflow-hidden" 
      aria-label="Contact Us Hero Section"
    >
      {/* Split Design with Two-Column Layout */}
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column - Content */}
        <div className="lg:col-span-6 xl:col-span-5 relative z-20 flex flex-col justify-center px-4 sm:px-6 lg:px-12 xl:px-20 py-16 lg:py-0">
          <div className="lg:min-h-screen flex flex-col justify-center max-w-2xl mx-auto lg:mx-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="lg:pr-6"
            >
              {/* Accent line with refined animation */}
              <motion.div 
                className="h-1 w-16 mb-6"
                style={{ backgroundColor: theme.accentLine }}
                variants={itemVariants}
              />
              
              {/* Enhanced Typography */}
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900"
                variants={itemVariants}
              >
                Connect With <span style={{ color: '#c20000' }}>Chery</span> Bangladesh
              </motion.h1>
              
              <motion.p 
                className="text-lg text-white leading-relaxed mb-8"
                variants={itemVariants}
              >
                We're committed to providing exceptional customer service. Whether you have questions about our vehicles, need service support, or want to provide feedback, our team is here to help you every step of the way.
              </motion.p>
              
              {/* Quick Contact Methods */}
              <motion.div
                className="space-y-4 mb-8"
                variants={itemVariants}
              >
                {contactMethods.map((method, index) => (
                  <a 
                    key={index} 
                    href={method.href}
                    className="flex items-center text-white hover:text-primary-600 transition-colors"
                  >
                    <div className="w-10 h-10 rounded flex items-center justify-center bg-gray-100 mr-4">
                      <method.icon size={20} className="text-primary-600" />
                    </div>
                    <span className="text-lg">{method.text}</span>
                  </a>
                ))}
              </motion.div>
              
              {/* Primary CTA Button */}
              <motion.div variants={itemVariants} className="mt-8">
                <a
                  href="#contact-form"
                  className="group inline-flex items-center justify-center px-8 py-4 font-medium transition-all duration-300 text-white bg-primary-600 hover:bg-primary-700 shadow-md hover:shadow-lg"
                >
                  Send us a message
                  <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Right Column - Image with Overlay */}
        <div className="lg:col-span-6 xl:col-span-7 relative">
          {/* Background Image */}
          <div className="absolute inset-0 z-0 h-full lg:h-screen">
            <Image
              src="/images/contact/contact-hero.jpg"
              alt=""
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 60vw"
              quality={90}
            />
            {/* Gradient Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/20"
              aria-hidden="true"
            />
          </div>
          
          {/* Floating Contact Information Box */}
          <motion.div 
            className="hidden lg:block absolute bottom-16 left-0 z-20 max-w-md -translate-x-1/4"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-white shadow-2xl p-8 ml-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4 relative">
                <span className="absolute -left-12 top-1/2 transform -translate-y-1/2 w-8 h-1 bg-primary-600"></span>
                Headquarters
              </h3>
              <address className="not-italic text-gray-700 space-y-3">
                <p>Chery Bangladesh</p>
                <p>206/1-207/1 Bir Uttam Mir Shawkat Sarak</p>
                <p> Tejgaon Gulshan Link Road, Dhaka</p>
              </address>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-sm text-gray-500">Business Hours</div>
                <div className="text-gray-700">Mon-Fri: 9AM-6PM, Sat: 10AM-4PM</div>
              </div>
            </div>
          </motion.div>
          
          {/* Mobile version of the image (displayed only on small screens) */}
          <div className="lg:hidden relative h-64 sm:h-80">
            <Image
              src="/images/contact/contact-hero.jpg"
              alt=""
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
              quality={85}
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
      
      {/* Custom decorative element */}
      <div className="absolute top-0 right-0 w-full h-16 bg-pattern-dots opacity-5 z-10" aria-hidden="true" />
    </section>
  )
}