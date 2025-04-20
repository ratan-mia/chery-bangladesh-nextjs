'use client'

import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

/**
 * Contact information card for HR department
 * Following Chery Bangladesh design system guidelines
 */
const ContactCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="p-6 border border-gray-200 bg-white hover:border-primary-700 transition-all duration-300 shadow-sm"
    >
      <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center">
        <Mail className="w-5 h-5 mr-2 text-primary-700" />
        Have Questions?
      </h3>
      
      <p className="mb-4 text-sm text-gray-600 leading-normal">
        Contact our HR department for more information about career opportunities at Chery Bangladesh.
      </p>
      
      <a 
        href="mailto:hr@cherybd.com"
        className="inline-block text-sm font-medium text-primary-700 hover:text-primary-900 transition-colors duration-300"
      >
        hr@cherybd.com
      </a>
    </motion.div>
  )
}

export default ContactCard