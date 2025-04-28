'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function HeroSection() {
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

  // Quick contact methods
  const contactMethods = [
    { 
      icon: Phone, 
      text: '09639119977',
      href: 'tel:09639119977'
    },
    { 
      icon: Mail, 
      text: 'info@cherybd.com',
      href: 'mailto:info@cherybd.com'
    },
    { 
      icon: MapPin, 
      text: 'Find us on the map',
      href: 'https://www.google.com/maps/place/Chery+Bangladesh+-+Asian+Motorspex+Ltd./@23.7701958,90.4075286,17z/data=!3m1!4b1!4m6!3m5!1s0x3755c7876eb61d75:0x94d0fb4b26e08e86!8m2!3d23.7701909!4d90.4101035!16s%2Fg%2F11s5ynvq3q?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D',
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
        <div className="lg:col-span-6 xl:col-span-5 relative z-20 flex flex-col justify-center px-4 sm:px-6 lg:px-12 xl:px-20 py-16 lg:py-0 bg-white">
          <div className="lg:min-h-screen flex flex-col justify-center max-w-2xl mx-auto lg:mx-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="lg:pr-6"
            >
              {/* Accent line with refined animation */}
              <motion.div 
                className="h-1 w-10 mb-4 bg-primary"
                variants={itemVariants}
              />
              
              <motion.span
                variants={itemVariants}
                className="inline-block text-sm uppercase tracking-wider mb-3 text-primary"
              >
                Get In Touch
              </motion.span>
              
              {/* Enhanced Typography */}
              <motion.h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-gray-900"
                variants={itemVariants}
              >
                Connect With <span className="text-primary">Chery</span> Bangladesh
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-600 leading-relaxed mb-8"
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
                    className="flex items-center text-gray-600 hover:text-primary transition-colors duration-300"
                    target="_blank"
                  >
                    <div className="w-10 h-10 rounded flex items-center justify-center bg-gray-100 mr-4">
                      <method.icon size={20} className="text-primary" />
                    </div>
                    <span className="text-lg">{method.text}</span>
                  </a>
                ))}
              </motion.div>
              
              {/* Primary CTA Button */}
              <motion.div variants={itemVariants} className="mt-8">
                <a
                  href="#contact-form"
                  className="inline-flex items-center justify-center px-8 py-3 font-medium bg-primary hover:bg-primary-dark text-white transition-colors duration-300 group"
                >
                  Send us a message
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
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
              alt="Chery showroom and vehicles"
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
            <div className="bg-white shadow-lg p-8 ml-12 border-l-2 border-l-primary">
              <h3 className="text-xl font-bold text-gray-900 mb-4 relative">
                <span className="absolute -left-12 top-1/2 transform -translate-y-1/2 w-8 h-1 bg-primary"></span>
                Showroom Location
              </h3>
              <address className="not-italic text-gray-600 space-y-3">
                <p>Chery Bangladesh - Asian Motorspex Limited</p>
                <p>206/1-207/1 Bir Uttam Mir Shawkat Sarak</p>
                <p>Tejgaon Gulshan Link Road, Dhaka</p>
              </address>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-sm text-gray-500">Business Hours</div>
                <div className="text-gray-600">Sat-Fri: 10:00 AM - 8:00 PM</div>
              </div>
            </div>
          </motion.div>
          
          {/* Mobile version of the image (displayed only on small screens) */}
          <div className="lg:hidden relative h-64 sm:h-80">
            <Image
              src="/images/contact/contact-hero.jpg"
              alt="Chery showroom and vehicles"
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
    </section>
  )
}