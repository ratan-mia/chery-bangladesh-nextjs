'use client'

import { motion } from 'framer-motion'
import { Clock, FileText, Mail, Package, Phone, ShieldCheck, Wrench } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const PartsAccessoriesSection = () => {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef(null)

  // Theme colors matching other components
  const theme = {
    primary: '#e2cdb8',
    textLight: '#ffffff',
    textDark: '#111827',
    bgDark: 'rgba(17, 24, 39, 0.95)',
    accentLight: 'rgba(226, 205, 184, 0.8)',
  }

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
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  // Parts categories
  const partsCategories = [
    {
      icon: <Wrench size={24} />,
      title: "Mechanical Parts",
      description: "Engine components, transmission parts, and mechanical systems for all Chery models."
    },
    {
      icon: <Package size={24} />,
      title: "Body Parts & Accessories",
      description: "Exterior body panels, trim pieces, and stylish accessories to personalize your vehicle."
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Genuine Chery Parts",
      description: "Factory-certified original parts designed specifically for your Chery vehicle."
    },
    {
      icon: <FileText size={24} />,
      title: "Parts Catalog",
      description: "Browse our complete parts catalog or request specific parts by contacting our team."
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ backgroundColor: theme.bgDark }}
    >
      {/* Background subtle pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />
      
      {/* Content container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Section header */}
          <div className="text-center mb-16">
            <motion.div 
              variants={itemVariants}
              className="h-1 w-24 mx-auto mb-6"
              style={{ backgroundColor: theme.primary }}
            />
            
            <motion.span
              variants={itemVariants}
              className="inline-block text-sm uppercase tracking-wider mb-3"
              style={{ color: theme.primary }}
            >
              Original Equipment & Accessories
            </motion.span>
            
            <motion.h2 
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6"
              style={{ color: theme.textLight }}
            >
              Parts & Accessories
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="max-w-3xl mx-auto text-lg"
              style={{ color: 'rgba(255, 255, 255, 0.8)' }}
            >
              Maintain your vehicle's performance and appearance with genuine Chery parts and accessories.
              Our parts department offers a comprehensive selection to keep your Chery at its best.
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
                    className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 Wrench hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center mr-4"
                        style={{ backgroundColor: 'rgba(226, 205, 184, 0.2)' }}
                      >
                        <span style={{ color: theme.primary }}>{category.icon}</span>
                      </div>
                      <h3 
                        className="text-xl font-medium"
                        style={{ color: theme.textLight }}
                      >
                        {category.title}
                      </h3>
                    </div>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
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
                className="p-8 Wrench border border-white/10 h-full relative overflow-hidden"
                style={{ backgroundColor: 'rgba(226, 205, 184, 0.1)' }}
              >
                {/* Decorative element */}
                <div 
                  className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-20 blur-2xl"
                  style={{ backgroundColor: theme.primary }}
                  aria-hidden="true"
                />
                
                <h3 
                  className="text-2xl font-bold mb-6 relative"
                  style={{ color: theme.textLight }}
                >
                  Parts Department
                </h3>
                
                <div className="space-y-6 relative">
                  {/* Phone with icon */}
                  <div className="flex items-start">
                    <Phone 
                      style={{ color: theme.primary }} 
                      className="w-5 h-5 mt-1 mr-3 flex-shrink-0" 
                    />
                    <div>
                      <p 
                        className="font-medium mb-1"
                        style={{ color: theme.textLight }}
                      >
                        Direct Line
                      </p>
                      <a 
                        href="tel:09639119977" 
                        className="text-lg hover:underline"
                        style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                      >
                        09639119977
                      </a>
                    </div>
                  </div>
                  
                  {/* Email with icon */}
                  <div className="flex items-start">
                    <Mail 
                      style={{ color: theme.primary }} 
                      className="w-5 h-5 mt-1 mr-3 flex-shrink-0" 
                    />
                    <div>
                      <p 
                        className="font-medium mb-1"
                        style={{ color: theme.textLight }}
                      >
                        Parts Inquiries
                      </p>
                      <a 
                        href="mailto:parts@cherybd.com" 
                        className="text-lg hover:underline"
                        style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                      >
                        parts@cherybd.com
                      </a>
                    </div>
                  </div>
                  
                  {/* Hours with icon */}
                  <div className="flex items-start">
                    <Clock 
                      style={{ color: theme.primary }} 
                      className="w-5 h-5 mt-1 mr-3 flex-shrink-0" 
                    />
                    <div>
                      <p 
                        className="font-medium mb-1"
                        style={{ color: theme.textLight }}
                      >
                        Hours of Operation
                      </p>
                      <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        Monday - Friday: 8:30 AM - 5:30 PM<br />
                        Saturday: 9:00 AM - 3:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Order button */}
                <div className="mt-8">
                  <a 
                    href="/parts-request" 
                    className="block w-full py-3 px-6 text-center font-medium Wrench transition-all duration-300"
                    style={{ 
                      backgroundColor: theme.primary,
                      color: theme.textDark
                    }}
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
            className="relative Wrench overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                className="relative h-64 overflow-hidden Wrench"
                style={{ backgroundColor: 'rgba(226, 205, 184, 0.1)' }}
              >
                <Image
                  src="/images/parts/engine-parts.jpg"
                  alt="Chery Engine Parts"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <p className="text-white font-medium p-4">Engine Components</p>
                </div>
              </div>
              
              <div 
                className="relative h-64 overflow-hidden Wrench"
                style={{ backgroundColor: 'rgba(226, 205, 184, 0.1)' }}
              >
                <Image
                  src="/images/parts/exterior-accessories.jpg"
                  alt="Chery Exterior Accessories"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <p className="text-white font-medium p-4">Exterior Accessories</p>
                </div>
              </div>
              
              <div 
                className="relative h-64 overflow-hidden Wrench"
                style={{ backgroundColor: 'rgba(226, 205, 184, 0.1)' }}
              >
                <Image
                  src="/images/parts/interior-accessories.jpg"
                  alt="Chery Interior Accessories"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <p className="text-white font-medium p-4">Interior Accessories</p>
                </div>
              </div>
            </div>
          </motion.div> */}
          
          {/* Call to action */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <p 
              className="text-lg mb-8"
              style={{ color: 'rgba(255, 255, 255, 0.8)' }}
            >
              Contact our parts specialists for expert advice on finding the right parts for your Chery vehicle.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="tel:09639119977" 
                className="inline-flex items-center gap-2 px-6 py-3 Wrench border border-white/20 hover:bg-white/10 transition-all duration-300"
                style={{ color: theme.textLight }}
              >
                <Phone size={20} />
                <span>Call Parts Department</span>
              </a>
              
              <a 
                href="/parts-catalog" 
                className="inline-flex items-center gap-2 px-6 py-3 Wrench"
                style={{ 
                  backgroundColor: theme.primary,
                  color: theme.textDark
                }}
              >
                <span>View Parts Catalog</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative element */}
      <div 
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ 
          background: `linear-gradient(to right, transparent, ${theme.primary}44, transparent)`
        }}
        aria-hidden="true"
      />
    </section>
  )
}

export default PartsAccessoriesSection