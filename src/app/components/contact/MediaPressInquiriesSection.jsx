'use client'

import { motion } from 'framer-motion'
import { Calendar, Camera, Download, ExternalLink, FileText, Mail, Phone, Users } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const MediaPressInquiriesSection = () => {
  const [isInView, setIsInView] = useState(false)
  const [activeTab, setActiveTab] = useState('media-kit')
  const sectionRef = useRef(null)

  // Theme colors matching other components
  const theme = {
    primary: '#e2cdb8',
    textLight: '#ffffff',
    textDark: '#111827',
    bgDark: 'rgba(17, 24, 39, 0.98)',
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

  // Press release data
  const pressReleases = [
    {
      date: "March 15, 2025",
      title: "Chery Bangladesh Announces New Tiggo 8 Pro Launch",
      excerpt: "Chery Bangladesh is proud to announce the launch of the all-new Tiggo 8 Pro, our flagship SUV model with cutting-edge technology and luxury features.",
      link: "/press/tiggo-8-pro-launch"
    },
    {
      date: "February 3, 2025",
      title: "Chery Expands Service Network in Northern Bangladesh",
      excerpt: "Chery Bangladesh continues its expansion with five new service centers in northern regions, enhancing customer support nationwide.",
      link: "/press/service-network-expansion"
    },
    {
      date: "January 18, 2025",
      title: "Chery Arrizo 8 Wins 'Car of the Year' at Bangladesh Auto Awards",
      excerpt: "The Chery Arrizo 8 sedan has been recognized as 'Car of the Year' at the prestigious Bangladesh Automobile Awards ceremony.",
      link: "/press/arrizo-8-award"
    }
  ]

  // Media resources
  const mediaResources = [
    {
      icon: <FileText size={28} />,
      title: "Brand Guidelines",
      description: "Official brand guidelines including logo usage, typography, and visual identity standards.",
      buttonText: "Download PDF",
      link: "/media/brand-guidelines.pdf"
    },
    {
      icon: <Camera size={28} />,
      title: "Image Library",
      description: "High-resolution images of our current vehicle lineup, showrooms, and corporate events.",
      buttonText: "Access Gallery",
      link: "/media/image-library"
    },
    {
      icon: <FileText size={28} />,
      title: "Press Releases",
      description: "Archive of all official press statements and announcements from Chery Bangladesh.",
      buttonText: "View All",
      link: "/media/press-releases"
    },
    {
      icon: <Calendar size={28} />,
      title: "Events Calendar",
      description: "Upcoming product launches, auto shows, and corporate events schedule.",
      buttonText: "View Calendar",
      link: "/media/events"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ backgroundColor: theme.bgDark }}
    >
      {/* Background subtle pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />
      
      {/* Decorative element */}
      <div 
        className="absolute -top-40 -right-40 w-96 h-96  opacity-10 blur-3xl"
        style={{ backgroundColor: theme.primary }}
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
              For Journalists & Media Professionals
            </motion.span>
            
            <motion.h2 
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6"
              style={{ color: theme.textLight }}
            >
              Media & Press Inquiries
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="max-w-3xl mx-auto text-lg"
              style={{ color: 'rgba(255, 255, 255, 0.8)' }}
            >
              We're committed to providing accurate information and resources to members of the press.
              Our media relations team is available to assist with your inquiries about Chery Bangladesh.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            {/* Press contact card */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-4 lg:row-span-2"
            >
              <div 
                className="p-8  border border-white/10 h-full relative overflow-hidden"
                style={{ backgroundColor: 'rgba(226, 205, 184, 0.08)' }}
              >
                {/* Decorative element */}
                <div 
                  className="absolute -top-24 -right-24 w-48 h-48  opacity-20 blur-2xl"
                  style={{ backgroundColor: theme.primary }}
                  aria-hidden="true"
                />
                
                <div className="relative">
                  <div className="flex items-center mb-6">
                    <Users size={28} style={{ color: theme.primary }} className="mr-4" />
                    <h3 
                      className="text-2xl font-bold"
                      style={{ color: theme.textLight }}
                    >
                      Press Contact
                    </h3>
                  </div>
                  
                  <div 
                    className="h-0.5 w-16 mb-8"
                    style={{ backgroundColor: theme.primary }}
                  />
                  
                  <div className="space-y-6 mb-8">
                    {/* Contact person */}
                    <div>
                      <h4 
                        className="text-xl font-medium mb-2"
                        style={{ color: theme.textLight }}
                      >
                        Zafrul Khan
                      </h4>
                      <p 
                        className="text-lg"
                        style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                      >
                        Head of Communications & PR
                      </p>
                    </div>
                    
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
                          Media Hotline
                        </p>
                        <a 
                          href="tel:+8801987654321" 
                          className="text-lg hover:underline"
                          style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                        >
                          +880 19 8765 4321
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
                          Press Email
                        </p>
                        <a 
                          href="mailto:press@cherybd.com" 
                          className="text-lg hover:underline break-words"
                          style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                        >
                          press@cherybd.com
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-white/10 pt-6">
                    <p 
                      className="mb-6 text-sm"
                      style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                    >
                      For urgent media inquiries, please contact our press team directly by phone.
                      For general information, email is preferred.
                    </p>
                    
                    <a 
                      href="/press/request" 
                      className="block w-full py-3 px-6 text-center font-medium  transition-all duration-300"
                      style={{ 
                        backgroundColor: theme.primary,
                        color: theme.textDark
                      }}
                    >
                      Submit Press Inquiry
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Media resources and press releases tabs */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-8"
            >
              {/* Tab navigation */}
              <div className="flex mb-6 border-b border-white/10">
                <button
                  className={`py-3 px-5 font-medium border-b-2 transition-colors ${activeTab === 'media-kit' ? 'border-primary-500' : 'border-transparent'}`}
                  style={{ 
                    color: activeTab === 'media-kit' ? theme.primary : 'rgba(255, 255, 255, 0.7)',
                    borderColor: activeTab === 'media-kit' ? theme.primary : 'transparent'
                  }}
                  onClick={() => setActiveTab('media-kit')}
                >
                  Media Resources
                </button>
                
                <button
                  className={`py-3 px-5 font-medium border-b-2 transition-colors ${activeTab === 'press-releases' ? 'border-primary-500' : 'border-transparent'}`}
                  style={{ 
                    color: activeTab === 'press-releases' ? theme.primary : 'rgba(255, 255, 255, 0.7)',
                    borderColor: activeTab === 'press-releases' ? theme.primary : 'transparent'
                  }}
                  onClick={() => setActiveTab('press-releases')}
                >
                  Recent Press Releases
                </button>
              </div>
              
              {/* Media kit tab content */}
              <div className={`${activeTab === 'media-kit' ? 'block' : 'hidden'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {mediaResources.map((resource, index) => (
                    <div 
                      key={index}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 p-6  hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center mb-4">
                        <div 
                          className="w-12 h-12  flex items-center justify-center mr-4"
                          style={{ backgroundColor: 'rgba(226, 205, 184, 0.2)' }}
                        >
                          <span style={{ color: theme.primary }}>{resource.icon}</span>
                        </div>
                        <h4 
                          className="text-xl font-medium"
                          style={{ color: theme.textLight }}
                        >
                          {resource.title}
                        </h4>
                      </div>
                      
                      <p 
                        className="mb-6"
                        style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                      >
                        {resource.description}
                      </p>
                      
                      <a 
                        href={resource.link}
                        className="inline-flex items-center gap-2 py-2 px-4  transition-all duration-300 text-sm font-medium"
                        style={{ 
                          backgroundColor: 'rgba(226, 205, 184, 0.15)', 
                          color: theme.primary
                        }}
                      >
                        <Download size={16} />
                        <span>{resource.buttonText}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Press releases tab content */}
              <div className={`${activeTab === 'press-releases' ? 'block' : 'hidden'}`}>
                <div className="space-y-6">
                  {pressReleases.map((press, index) => (
                    <div 
                      key={index}
                      className="border-b border-white/10 pb-6 last:border-0"
                    >
                      <div 
                        className="inline-block py-1 px-3 rounded text-sm mb-3"
                        style={{ 
                          backgroundColor: 'rgba(226, 205, 184, 0.15)', 
                          color: theme.primary
                        }}
                      >
                        {press.date}
                      </div>
                      
                      <h4 
                        className="text-xl font-medium mb-3"
                        style={{ color: theme.textLight }}
                      >
                        {press.title}
                      </h4>
                      
                      <p 
                        className="mb-4"
                        style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                      >
                        {press.excerpt}
                      </p>
                      
                      <a 
                        href={press.link} 
                        className="inline-flex items-center hover:underline transition-colors"
                        style={{ color: theme.primary }}
                      >
                        <span>Read full press release</span>
                        <ExternalLink size={16} className="ml-1" />
                      </a>
                    </div>
                  ))}
                  
                  <div className="text-center pt-4">
                    <a 
                      href="/press/archive" 
                      className="inline-flex items-center gap-2 py-2 px-6  transition-all duration-300 font-medium"
                      style={{ 
                        backgroundColor: 'rgba(226, 205, 184, 0.15)', 
                        color: theme.primary
                      }}
                    >
                      <span>View All Press Releases</span>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Featured image section */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-8"
            >
              <div className="relative  overflow-hidden h-64">
                <Image
                  src="/images/press/press-conference.jpg"
                  alt="Chery Bangladesh Press Conference"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end">
                  <div className="p-6">
                    <p 
                      className="text-sm font-medium mb-2"
                      style={{ color: theme.primary }}
                    >
                      Latest Event
                    </p>
                    <h3 
                      className="text-xl md:text-2xl font-bold mb-2"
                      style={{ color: theme.textLight }}
                    >
                      Chery Tiggo 8 Pro Launch Event
                    </h3>
                    <p 
                      className="text-sm"
                      style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    >
                      April 5, 2025 - Radisson Blu Dhaka
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Additional information */}
          <motion.div 
            variants={itemVariants}
            className="mt-10 text-center"
          >
            <h3 
              className="text-2xl font-bold mb-4"
              style={{ color: theme.textLight }}
            >
              Additional Press Information
            </h3>
            
            <p 
              className="text-lg mb-8 max-w-3xl mx-auto"
              style={{ color: 'rgba(255, 255, 255, 0.8)' }}
            >
              For interview requests, product information, or to arrange factory visits,
              please contact our media relations team with at least 48 hours notice.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="/about/company-profile" 
                className="inline-flex items-center gap-2 px-5 py-2.5  border border-white/20 hover:bg-white/10 transition-all duration-300"
                style={{ color: theme.textLight }}
              >
                <span>Company Profile</span>
              </a>
              
              <a 
                href="/about/corporate-social-responsibility" 
                className="inline-flex items-center gap-2 px-5 py-2.5  border border-white/20 hover:bg-white/10 transition-all duration-300"
                style={{ color: theme.textLight }}
              >
                <span>CSR Initiatives</span>
              </a>
              
              <a 
                href="/media/executive-bios" 
                className="inline-flex items-center gap-2 px-5 py-2.5  border border-white/20 hover:bg-white/10 transition-all duration-300"
                style={{ color: theme.textLight }}
              >
                <span>Executive Biographies</span>
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

export default MediaPressInquiriesSection