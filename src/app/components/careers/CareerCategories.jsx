'use client'

import { motion } from 'framer-motion'
import { Building, ChevronRight } from 'lucide-react'
import Link from 'next/link'

/**
 * Career categories grid showing different departments
 * Following Chery Bangladesh design system guidelines
 */
const CareerCategories = () => {
  const categories = [
    {
      id: 'sales',
      title: 'Sales',
      icon: <Building className="h-5 w-5" />,
      description: 'Join our sales team to help customers find their perfect Chery vehicle.',
      link: '/careers/departments/sales'
    },
    {
      id: 'service',
      title: 'Service & After-Sales',
      icon: <Building className="h-5 w-5" />,
      description: 'Be part of our team providing excellent service to Chery vehicle owners.',
      link: '/careers/departments/service'
    },
    {
      id: 'marketing',
      title: 'Marketing',
      icon: <Building className="h-5 w-5" />,
      description: 'Drive our digital marketing strategies across various platforms.',
      link: '/careers/departments/marketing'
    },
    {
      id: 'admin',
      title: 'Administration',
      icon: <Building className="h-5 w-5" />,
      description: 'Provide administrative support to our executive team.',
      link: '/careers/departments/admin'
    },
    {
      id: 'parts',
      title: 'Parts & Logistics',
      icon: <Building className="h-5 w-5" />,
      description: 'Manage our parts inventory system to ensure availability and distribution.',
      link: '/careers/departments/parts'
    }
  ]

  // Animation variants following the guidelines
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {categories.map((category) => (
        <motion.div key={category.id} variants={itemVariants}>
          <Link
            href={category.link}
            className="p-6 bg-white border border-gray-200 hover:border-primary-700 transition-all duration-300 group flex flex-col h-full shadow-sm"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 flex items-center justify-center mr-3 bg-primary-light bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300">
                <span className="text-primary-900">{category.icon}</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary-900 transition-colors duration-300">{category.title}</h3>
            </div>
            
            <p className="text-gray-600 mb-4 flex-grow leading-normal">{category.description}</p>
            
            <div className="flex items-center text-primary-700 text-sm font-medium group-hover:text-primary-900 transition-colors duration-300">
              <span>Explore opportunities</span>
              <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default CareerCategories