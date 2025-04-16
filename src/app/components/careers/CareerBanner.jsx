'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

/**
 * Full-width banner component with background image for Career page
 * Following Chery Bangladesh design system guidelines
 */
const CareerBanner = ({ title, subtitle, description }) => {
  return (
    <section className="relative overflow-hidden">
      {/* Background image layer */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/careers/career-banner.jpg" // Replace with your actual image path
          alt="Chery Bangladesh Careers"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient overlay for text legibility - follows design guideline for gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 via-primary-900/60 to-transparent"></div>
      </div>

      {/* Content layer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-24 md:py-32 lg:py-40 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {subtitle && (
              <span className="inline-block text-sm uppercase tracking-wider mb-3 text-primary-light font-medium">
                {subtitle}
              </span>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {title || "Join Our Team"}
            </h1>
            
            {description && (
              <p className="text-xl text-gray-100 max-w-2xl leading-relaxed">
                {description || "Discover exciting career opportunities with Chery Bangladesh. Join us in our mission to provide exceptional automotive experiences to our customers."}
              </p>
            )}
            
            {/* Optional decorative element */}
            <div className="h-1 w-24 bg-primary-700 mt-8"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CareerBanner