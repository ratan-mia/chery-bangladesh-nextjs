'use client'

import { motion } from 'framer-motion'
import {
  Clock,
  Mail,
  Package,
  Phone,
  ShieldCheck,
  Wrench
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const PartsAccessoriesSection = () => {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef(null)

  // Use intersection observer to trigger animations when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    const currentRef = sectionRef.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
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
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  // Parts categories
  const partsCategories = [
    {
      icon: <Wrench size={24} />,
      title: 'Mechanical Parts',
      description:
        'Engine components, transmission parts, and mechanical systems for all Chery models.',
    },
    {
      icon: <Package size={24} />,
      title: 'Body Parts & Accessories',
      description:
        'Exterior body panels, trim pieces, and stylish accessories to personalize your vehicle.',
    },
    {
      icon: <ShieldCheck size={24} />,
      title: 'Genuine Chery Parts',
      description:
        'Factory-certified original parts designed specifically for your Chery vehicle.',
    },
    {
      icon: <Mail size={24} />,
      title: 'Parts Inquiries',
      description:
        'Contact our parts department for any inquiries or special requests.',
    },

    // {
    //   icon: <FileText size={24} />,
    //   title: 'Parts Catalog',
    //   description:
    //     'Browse our complete parts catalog or request specific parts by contacting our team.',
    // },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden bg-white border-t border-gray-100"
    >
      {/* Background subtle pattern */}
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40 L40 0 M-10 30 L10 50 M30 -10 L50 10' stroke='%23222222' stroke-width='1'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Content container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section header */}
          <div className="text-center mb-16">
            <motion.div
              variants={itemVariants}
              className="h-1 w-10 mx-auto mb-4 bg-primary"
            />

            <motion.span
              variants={itemVariants}
              className="inline-block text-sm uppercase tracking-wider mb-3 text-primary"
            >
              Original Equipment & Accessories
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 text-gray-900"
            >
              Parts & Accessories
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="max-w-3xl mx-auto text-lg text-gray-600"
            >
              Maintain your vehicle's performance and appearance with genuine
              Chery parts and accessories. Our parts department offers a
              comprehensive selection to keep your Chery at its best.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
            {/* Parts categories section */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-3 order-2 lg:order-1"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {partsCategories.map((category, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-colors duration-300 shadow-sm"
                  >
                    <div className="flex items-center mb-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-primary/10"
                      >
                        <span className="text-primary">
                          {category.icon}
                        </span>
                      </div>
                      <h3
                        className="text-xl font-medium text-gray-900"
                      >
                        {category.title}
                      </h3>
                    </div>
                    <p className="text-gray-600">
                      {category.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact info card */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 order-1 lg:order-2"
            >
              <div
                className="p-8 border border-gray-200 h-full relative overflow-hidden shadow-sm border-l-2 border-l-primary bg-gray-50"
              >
                <h3
                  className="text-2xl font-bold mb-6 relative text-gray-900"
                >
                  Parts Department
                </h3>

                <div className="space-y-6 relative">
                  {/* Phone with icon */}
                  <div className="flex items-start">
                    <Phone
                      className="w-5 h-5 mt-1 mr-3 flex-shrink-0 text-primary"
                    />
                    <div>
                      <p
                        className="font-medium mb-1 text-gray-900"
                      >
                        Direct Line
                      </p>
                      <a
                        href="tel:09639119977"
                        className="text-lg hover:text-primary transition-colors text-gray-600"
                      >
                        09639119977
                      </a>
                    </div>
                  </div>

                  {/* Email with icon */}
                  <div className="flex items-start">
                    <Mail
                      className="w-5 h-5 mt-1 mr-3 flex-shrink-0 text-primary"
                    />
                    <div>
                      <p
                        className="font-medium mb-1 text-gray-900"
                      >
                        Parts Inquiries
                      </p>
                      <a
                        href="mailto:parts@cherybd.com"
                        className="text-lg hover:text-primary transition-colors text-gray-600"
                      >
                        info@cherybd.com
                      </a>
                    </div>
                  </div>

                  {/* Hours with icon */}
                  <div className="flex items-start">
                    <Clock
                      className="w-5 h-5 mt-1 mr-3 flex-shrink-0 text-primary"
                    />
                    <div>
                      <p
                        className="font-medium mb-1 text-gray-900"
                      >
                        Hours of Operation
                      </p>
                      <p className="text-gray-600">
                        Saturday - Friday: 10:00 AM - 8:00 PM
                        <br />
                    
                      
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order button */}
                <div className="mt-8">
                  <a
                    href="/contact"
                    className="block w-full py-3 px-6 text-center font-medium bg-primary hover:bg-primary-dark text-white transition-colors duration-300"
                  >
                    Submit Parts Request
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Images section */}
          {/* <motion.div 
            variants={itemVariants}
            className="relative overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div 
                className="relative h-64 overflow-hidden shadow-sm"
              >
                <Image
                  src="/images/parts/engine-parts.jpg"
                  alt="Chery Engine Parts"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <p className="text-white font-medium p-4">Engine Components</p>
                </div>
              </div>
              
              <div 
                className="relative h-64 overflow-hidden shadow-sm"
              >
                <Image
                  src="/images/parts/exterior-accessories.jpg"
                  alt="Chery Exterior Accessories"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <p className="text-white font-medium p-4">Exterior Accessories</p>
                </div>
              </div>
              
              <div 
                className="relative h-64 overflow-hidden shadow-sm"
              >
                <Image
                  src="/images/parts/interior-accessories.jpg"
                  alt="Chery Interior Accessories"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <p className="text-white font-medium p-4">Interior Accessories</p>
                </div>
              </div>
            </div>
          </motion.div> */}

          {/* Call to action */}
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <p
              className="text-lg mb-8 text-gray-600"
            >
              Contact our parts specialists for expert advice on finding the
              right parts for your Chery vehicle.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="tel:09639119977"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-gray-300 text-gray-900 hover:border-primary hover:text-primary transition-colors duration-300"
              >
                <Phone size={20} />
                <span>Call Parts Department</span>
              </a>

              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white transition-colors duration-300 group"
              >
                <span>Contact us</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default PartsAccessoriesSection