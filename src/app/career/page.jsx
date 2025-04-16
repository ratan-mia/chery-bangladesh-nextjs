'use client'

import { containerVariants, itemVariants } from '@/lib/animationVariants'
import { motion } from 'framer-motion'
import { useRef } from 'react'

// Components
import CareerApplicationForm from '@/components/careers/CareerApplicationForm'
import CareerBanner from '@/components/careers/CareerBanner'
import CareerCategories from '@/components/careers/CareerCategories'
import CompanyValues from '@/components/careers/CompanyValues'
import ContactCard from '@/components/careers/ContactCard'
import InternshipSection from '@/components/careers/InternshipSection'

/**
 * Main careers page component
 * Using full-width background colors to differentiate sections
 */
export default function CareersPage() {
  const sectionRef = useRef(null)

  return (
    <div className="bg-white">
      {/* Full-width Hero Banner */}
      <CareerBanner 
        title="Build Your Career With Chery Bangladesh"
        subtitle="Join Our Team"
        description="Discover exciting career opportunities and be part of our growing automotive family. We value innovation, excellence, and passion in everything we do."
      />
      
      {/* Categories Section - Light gray background */}
      <section className="py-16 bg-gray-50 border-t border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="max-w-7xl mx-auto"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 border-l-2 border-primary-700 pl-4">
                Explore Our Departments
              </h2>
              <CareerCategories />
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Application Form Section - White background */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
              {/* Sidebar with company values and contact */}
              <motion.div 
                variants={itemVariants}
                className="lg:col-span-4 order-2 lg:order-1"
              >
                <div className="lg:sticky lg:top-24">
                  {/* Company values */}
                  <CompanyValues />
                  
                  {/* Contact info */}
                  <ContactCard />
                </div>
              </motion.div>
              
              {/* Application form */}
              <motion.div 
                variants={itemVariants}
                className="lg:col-span-8 order-1 lg:order-2"
              >
                <div className="border-l-4 border-primary-light pl-4 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Submit Your Application</h2>
                  <p className="text-gray-600">Fill out the form below to apply for a position at Chery Bangladesh</p>
                </div>
                <CareerApplicationForm />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Internship Section - Cream background */}
      <section className="py-20 bg-primary-light bg-opacity-5 border-t border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="max-w-7xl mx-auto"
          >
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Internship Program</h2>
              <div className="w-24 h-1 bg-primary-700 mx-auto"></div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <InternshipSection />
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Final Section - Light gray background */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="max-w-7xl mx-auto"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Begin Your Career Journey With Chery</h2>
              <p className="text-gray-600 mb-6">
                At Chery Bangladesh, we believe our success comes from our people. We're committed to creating 
                a workplace that fosters growth, innovation, and collaboration.
              </p>
              <div className="inline-flex items-center justify-center">
                <div className="h-px w-12 bg-primary-700 mr-4"></div>
                <span className="text-primary-900 font-medium">Join us today</span>
                <div className="h-px w-12 bg-primary-700 ml-4"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}