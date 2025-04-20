'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

/**
 * Premium full-width banner component with background image for Career page
 * Following Chery Bangladesh design system with enhanced visual appeal
 * Features improved layout, typography, and interactive elements
 * 
 * @param {Object} props
 * @param {string} props.title - Main banner heading
 * @param {string} props.subtitle - Optional small text above title
 * @param {string} props.description - Optional paragraph text below title
 * @param {string} props.imagePath - Path to background image (defaults to career banner)
 * @param {string} props.imageAlt - Alt text for the background image
 * @param {string} props.ctaText - Optional call-to-action button text
 * @param {string} props.ctaUrl - Optional call-to-action button URL
 */
const CareerBanner = ({
  title = "Join Our Team",
  subtitle,
  description = "Discover exciting career opportunities with Chery Bangladesh. Join us in our mission to provide exceptional automotive experiences to our customers.",
  imagePath = "/images/banners/career-banner.jpg",
  imageAlt = "Chery Bangladesh Careers",
  ctaText,
  ctaUrl
}) => {
  // Animation variants
  const contentAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  }
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }
  
  const fadeInUp = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <section 
      className="relative overflow-hidden min-h-[90vh] flex items-center" 
      aria-label="Career banner section"
    >
      {/* Background image with parallax effect */}
      <div className="absolute inset-0 w-full h-full">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full w-full"
        >
          <Image
            src={imagePath}
            alt={imageAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
        </motion.div>
        
        {/* Enhanced layered overlay for better visual depth */}
        <div className="absolute inset-0 bg-black/50" aria-hidden="true"></div>
        <div 
          className="absolute inset-0 bg-gradient-to-r from-primary-900/80 via-primary-900/60 to-transparent" 
          aria-hidden="true"
        ></div>
        
        {/* Subtle pattern overlay for texture */}
        <div 
          className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('/images/pattern.png')]" 
          aria-hidden="true"
        ></div>
      </div>
      
      {/* Content container with improved layout */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="max-w-4xl py-20 sm:py-24 md:py-28 lg:py-36"
        >
          {subtitle && (
            <motion.div variants={fadeInUp}>
              <span className="inline-block py-1 px-3 rounded-full bg-primary-700/30 text-sm uppercase tracking-wider mb-5 text-primary-light font-medium border border-primary-600/30">
                {subtitle}
              </span>
            </motion.div>
          )}
          
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight"
          >
            {title}
          </motion.h1>
          
          {description && (
            <motion.p 
              variants={fadeInUp}
              className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed mb-8 sm:mb-10"
            >
              {description}
            </motion.p>
          )}
          
          {/* CTA Button */}
          {ctaText && ctaUrl && (
            <motion.div 
              variants={fadeInUp}
              className="mt-6"
            >
              <a 
                href={ctaUrl}
                className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-primary-600 rounded-lg shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-primary-900 transition-all duration-300"
              >
                {ctaText}
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </motion.div>
          )}
          
          {/* Enhanced decorative element with animation */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="h-1.5 bg-gradient-to-r from-primary-500 to-primary-400 mt-10 rounded-full"
            aria-hidden="true"
          ></motion.div>
        </motion.div>
      </div>
      
      {/* Decorative scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden md:block"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        aria-hidden="true"
      >
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center items-start p-1">
          <motion.div 
            className="w-1.5 h-3 bg-white/80 rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          />
        </div>
      </motion.div>
    </section>
  )
}

export default CareerBanner