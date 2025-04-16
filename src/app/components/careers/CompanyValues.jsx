'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Award, Briefcase, Heart, Lightbulb, Users } from 'lucide-react'
import Link from 'next/link'

/**
 * Company values section showing core principles
 * Following Chery Bangladesh design system guidelines
 */
const CompanyValues = () => {
  const values = [
    {
      icon: <Award className="h-6 w-6" />,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from our vehicles to our workplace environment."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Teamwork",
      description: "We believe in collaborative effort and creating a supportive team environment."
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Innovation",
      description: "We encourage fresh ideas and innovative thinking to drive our company forward."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Passion",
      description: "Our team members are passionate about automotive excellence and customer satisfaction."
    }
  ]

  // Animation variants for staggered animations
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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="p-6 border border-gray-200 bg-white mb-8 transition-all duration-300 hover:border-primary-700 hover:shadow-sm"
    >
      <h3 
        className="text-xl font-bold mb-6 flex items-center text-gray-900"
      >
        <Briefcase className="w-5 h-5 mr-2 text-primary-700" />
        Join Our Team
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {values.map((value, index) => (
          <motion.div key={index} variants={itemVariants} className="flex group">
            <div 
              className="w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 bg-primary-light bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300"
            >
              <span className="text-primary-900">{value.icon}</span>
            </div>
            <div>
              <h4 
                className="font-medium mb-1 text-gray-900 group-hover:text-primary-900 transition-colors duration-300"
              >
                {value.title}
              </h4>
              <p 
                className="text-sm text-gray-600 leading-normal"
              >
                {value.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p 
          className="text-sm mb-4 text-gray-600"
        >
          We offer competitive compensation, comprehensive benefits, and ongoing professional development.
        </p>
        
        <Link
          href="/careers/benefits"
          className="inline-flex items-center text-sm font-medium text-primary-700 group hover:text-primary-900 transition-colors duration-300"
        >
          <span>Learn about our benefits</span>
          <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </motion.div>
  )
}

export default CompanyValues