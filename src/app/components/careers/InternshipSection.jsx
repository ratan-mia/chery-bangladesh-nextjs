'use client'

import { motion } from 'framer-motion'
import { ArrowRight, GraduationCap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

/**
 * Internship program section with image and details
 * Following Chery Bangladesh design system guidelines
 */
const InternshipSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className="overflow-hidden border border-gray-200 hover:border-primary-700 transition-all duration-300 bg-white"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-64 md:h-auto overflow-hidden">
          <Image
            src="/images/careers/internship.jpg"
            alt="Chery Bangladesh Internship Program"
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
          {/* Gradient overlay following design system guidelines */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-primary-900/20 to-transparent"></div>
        </div>
        <div 
          className="p-8 md:p-10 flex flex-col justify-center bg-white border-l border-gray-200"
        >
          <div className="flex items-center mb-4">
            <GraduationCap className="h-6 w-6 mr-2 text-primary-700" />
            <h3 className="text-2xl font-bold text-gray-900">
              Internship Program
            </h3>
          </div>
          <p
            className="mb-6 text-gray-600 leading-normal"
          >
            Are you a student or recent graduate looking to gain valuable experience in the automotive industry? 
            Our internship program offers hands-on experience across various departments, from engineering to 
            marketing and sales.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start group">
              <div className="flex-shrink-0 h-5 w-5 mt-0.5 flex items-center justify-center">
                <div className="h-2 w-2 bg-primary-700 group-hover:bg-primary-900 transition-colors duration-300"></div>
              </div>
              <span className="ml-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-300">3-6 month structured programs</span>
            </li>
            <li className="flex items-start group">
              <div className="flex-shrink-0 h-5 w-5 mt-0.5 flex items-center justify-center">
                <div className="h-2 w-2 bg-primary-700 group-hover:bg-primary-900 transition-colors duration-300"></div>
              </div>
              <span className="ml-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-300">Mentorship from industry professionals</span>
            </li>
            <li className="flex items-start group">
              <div className="flex-shrink-0 h-5 w-5 mt-0.5 flex items-center justify-center">
                <div className="h-2 w-2 bg-primary-700 group-hover:bg-primary-900 transition-colors duration-300"></div>
              </div>
              <span className="ml-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-300">Opportunities for permanent positions</span>
            </li>
          </ul>
          <div className="mt-auto">
            <Link
              href="/careers/internships"
              className="inline-flex items-center font-medium text-primary-700 group"
            >
              <span className="group-hover:text-primary-900 transition-colors duration-300">Explore internship opportunities</span>
              <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default InternshipSection