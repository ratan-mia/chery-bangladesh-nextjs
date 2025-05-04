'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Award, Check, Cpu, Shield, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

// Standard animations for consistency
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function CheryTiggoSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef(null)

  // Models data
  const models = [
    {
      name: 'Tiggo 8 Pro',
      subtitle: 'Premium 7-Seater Luxury SUV',
      link: '/models/tiggo8pro',
      image: '/images/tiggo8pro/colors/chery-green.png',
      specs: [
        { label: 'Engine', value: '1.6T Turbocharged' },
        { label: 'Power', value: '195 BHP' },
        { label: 'Torque', value: '290 Nm' },
        { label: 'Transmission', value: '7-Speed Dual Clutch' }
      ],
      features: [
        'Premium Luxury 7-seat SUV', 
        'Panoramic Sunroof', 
        'Multi-color Ambient System with Music Rhythm',
        '12.3" Dual Curve Screen'
      ],
      description: 'The epitome of luxury that transcends the bounds of a mere vehicle; a masterpiece that commands centre stage presence with a diamond-shaped front grille and illuminated logo that radiates elegance.'
    },
    {
      name: 'Tiggo Cross',
      subtitle: 'Modern Crossover SUV',
      link: '/models/tiggocross',
      image: '/images/models/tiggo-cross.png',
      specs: [
        { label: 'Engine', value: '1.5L Turbocharged' },
        { label: 'Power', value: '145 BHP' },
        { label: 'Torque', value: '210 Nm' },
        { label: 'Transmission', value: '6-Speed Dual Clutch' }
      ],
      features: [
        'Biomimetic Tiger Face Design', 
        '10.25" Ultra-Clear LCD Screen', 
        'Voice-Activated Panoramic Sunroof',
        '360° Panoramic Camera View'
      ],
      description: 'Sleek and aerodynamic - ready for adventure with its biomimetic tiger face design. Features a distinctive diamond-shaped grille pattern, tiger claw style headlight trim, and vertical crystal-edged marker lamps.'
    }
  ]

  // Set up intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section 
      ref={sectionRef} 
      id='explore'
      className="py-16 md:py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Discover the Chery <span className="text-[#524336]">Tiggo Family</span>
          </h2>
          <div className="w-24 h-1 bg-[#8c735d] mx-auto mb-8"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Enjoy your first class driving experience with cutting-edge technology and luxury features
          </p>
        </motion.div>

        {/* Model Navigation - Clean tabs following design system */}
        <motion.div 
          className="flex justify-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            {models.map((model, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`group relative px-8 py-3 text-lg font-medium transition-all duration-300 ${
                  activeIndex === index 
                    ? 'text-[#524336]' 
                    : 'text-gray-600 hover:text-[#8c735d]'
                }`}
              >
                {model.name}
                {/* Active indicator */}
                <div 
                  className={`absolute bottom-0 left-0 h-0.5 bg-[#8c735d] transition-all duration-500 ${
                    activeIndex === index ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Vehicle Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative aspect-[4/3]">
              {models.map((model, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === activeIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={model.image || '/api/placeholder/800/600'}
                    alt={model.name}
                    fill
                    style={{ objectFit: "contain" }}
                    priority={index === 0}
                    className="transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Vehicle Information */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="space-y-8"
          >
            {/* Title and Subtitle */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {models[activeIndex].name}
              </h3>
              <p className="text-xl text-[#8c735d] font-medium mb-4">
                {models[activeIndex].subtitle}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {models[activeIndex].description}
              </p>
            </motion.div>

            {/* Specifications */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white border border-gray-200 p-6 group hover:border-[#8c735d] transition-colors duration-300"
            >
              <h4 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-2 bg-[#8c735d] mr-3"></span>
                Key Specifications
              </h4>
              <div className="grid grid-cols-2 gap-6">
                {models[activeIndex].specs.map((spec, index) => (
                  <div key={index}>
                    <p className="text-sm text-gray-500 mb-1">
                      {spec.label}
                    </p>
                    <p className="font-medium text-gray-900">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Features */}
            <motion.div variants={fadeInUp}>
              <h4 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-2 bg-[#8c735d] mr-3"></span>
                Featured Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {models[activeIndex].features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-center p-3 bg-gray-100 group hover:bg-[#c4b19c] hover:bg-opacity-20 transition-colors duration-300"
                  >
                    <Check className="h-4 w-4 text-[#8c735d] mr-3 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={fadeInUp}>
              <Link 
                href={models[activeIndex].link || "#"}
                className="group inline-flex items-center px-10 py-4 bg-[#8c735d] text-white font-medium hover:bg-[#524336] transition-colors duration-500"
              >
                Explore {models[activeIndex].name}
                <ArrowRight
                  size={20}
                  className="ml-2 group-hover:ml-3 transition-all duration-300"
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Feature Cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {[
            { 
              title: 'Performance', 
              desc: 'Powerful turbocharged engines with excellent handling characteristics',
              icon: Zap
            },
            { 
              title: 'Safety', 
              desc: 'Comprehensive passive and active safety systems with up to 9 airbags',
              icon: Shield
            },
            { 
              title: 'Technology', 
              desc: 'Dual 12.3" screens with smartphone connectivity and voice assistant',
              icon: Cpu
            },
            { 
              title: 'Warranty', 
              desc: 'Exceptional 5-year/100,000 km warranty with buy-back option',
              icon: Award
            }
          ].map((item, index) => {
            const IconComponent = item.icon;
            return (
            <motion.div 
              key={index}
              variants={fadeInUp}
              className="relative border border-gray-200 bg-white shadow-sm overflow-hidden group hover:border-[#8c735d] transition-all duration-300"
            >
              {/* Top accent */}
              <div className="h-1 w-full bg-[#b7a99a] opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="p-8">
                <div className="w-16 h-16 bg-[#c4b19c] bg-opacity-40 flex items-center justify-center mb-6">
                  <IconComponent className="text-[#524336]" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-normal mb-8">{item.desc}</p>
                <div className="flex items-center text-[#8c735d] font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span>Learn more</span>
                  <ArrowRight
                    size={16}
                    className="ml-2 group-hover:ml-3 transition-all duration-300"
                  />
                </div>
              </div>
              
              {/* Bottom accent line that fills on hover */}
              <div className="h-0.5 w-full bg-gray-200 mt-auto">
                <div className="h-full bg-[#8c735d] w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
              </div>
            </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}