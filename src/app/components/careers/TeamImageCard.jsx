'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

/**
 * Component displaying team image with text overlay
 */
const TeamImageCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className="relative h-64 rounded-lg overflow-hidden mb-8 border border-gray-800 hover:border-primary-800 transition-all duration-300 group"
    >
      <Image 
        src="/images/careers/team.jpg"
        fill
        alt="Chery Bangladesh Team"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 1024px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
        <div className="p-6">
          <h3 className="text-xl font-bold text-white group-hover:text-primary-light transition-colors duration-300">
            Our People
          </h3>
          <p className="text-sm text-gray-300">
            The heart of Chery Bangladesh
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default TeamImageCard