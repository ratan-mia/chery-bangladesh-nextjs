'use client'

import { motion } from 'framer-motion'
import {
    ArrowRight,
    Award,
    Briefcase,
    Building,
    ChevronRight,
    GraduationCap,
    Heart,
    Lightbulb,
    Send,
    Users
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

// Header Component
const SectionHeader = ({ title, subtitle, description }) => {
  return (
    <div className="text-center mb-16">
      <div 
        className="h-1 w-24 mx-auto mb-6 bg-primary-600"
      />
      
      <span
        className="inline-block text-sm uppercase tracking-wider mb-3 text-primary-600"
      >
        {subtitle}
      </span>
      
      <h2 
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 text-white"
      >
        {title}
      </h2>
      
      <p
        className="max-w-3xl mx-auto text-lg text-gray-300"
      >
        {description}
      </p>
    </div>
  )
}

// Company Values Component
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

  return (
    <div 
      className="p-6 rounded-lg border border-gray-800 bg-black bg-opacity-50 mb-8"
    >
      <h3 
        className="text-xl font-bold mb-6 flex items-center text-white"
      >
        <Briefcase className="w-5 h-5 mr-2 text-primary-600" />
        Join Our Team
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {values.map((value, index) => (
          <div key={index} className="flex">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 bg-black bg-opacity-20"
            >
              <span className="text-primary-600">{value.icon}</span>
            </div>
            <div>
              <h4 
                className="font-medium mb-1 text-white"
              >
                {value.title}
              </h4>
              <p 
                className="text-sm text-gray-400"
              >
                {value.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-800">
        <p 
          className="text-sm mb-4 text-gray-400"
        >
          We offer competitive compensation, comprehensive benefits, and ongoing professional development.
        </p>
        
        <Link
          href="/careers/benefits"
          className="inline-flex items-center text-sm hover:underline text-primary-600 group"
        >
          <span>Learn about our benefits</span>
          <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}

// Career Categories Component
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={category.link}
          className="p-6 bg-black bg-opacity-50 border border-gray-800 rounded-lg hover:bg-opacity-70 transition-all group"
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-black bg-opacity-20">
              <span className="text-primary-600">{category.icon}</span>
            </div>
            <h3 className="text-lg font-medium text-white">{category.title}</h3>
          </div>
          
          <p className="text-gray-400 mb-4">{category.description}</p>
          
          <div className="flex items-center text-primary-600 text-sm font-medium">
            <span>Explore opportunities</span>
            <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      ))}
    </div>
  )
}

// Internship Section Component
const InternshipSection = () => {
  return (
    <div className="rounded-lg overflow-hidden border border-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-64 md:h-auto">
          <Image
            src="/images/careers/internship.jpg"
            alt="Chery Bangladesh Internship Program"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div 
          className="p-8 md:p-10 flex flex-col justify-center bg-black bg-opacity-50"
        >
          <div className="flex items-center mb-4">
            <GraduationCap className="h-6 w-6 mr-2 text-primary-600" />
            <h3 className="text-2xl font-bold text-white">
              Internship Program
            </h3>
          </div>
          <p
            className="mb-6 text-gray-300"
          >
            Are you a student or recent graduate looking to gain valuable experience in the automotive industry? 
            Our internship program offers hands-on experience across various departments, from engineering to 
            marketing and sales.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 mt-0.5">
                <div className="h-2 w-2 bg-primary-600 rounded-full mx-auto mt-1.5"></div>
              </div>
              <span className="ml-2 text-gray-400">3-6 month structured programs</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 mt-0.5">
                <div className="h-2 w-2 bg-primary-600 rounded-full mx-auto mt-1.5"></div>
              </div>
              <span className="ml-2 text-gray-400">Mentorship from industry professionals</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 mt-0.5">
                <div className="h-2 w-2 bg-primary-600 rounded-full mx-auto mt-1.5"></div>
              </div>
              <span className="ml-2 text-gray-400">Opportunities for permanent positions</span>
            </li>
          </ul>
          <div className="mt-auto">
            <Link
              href="/careers/internships"
              className="inline-flex items-center font-medium hover:underline text-primary-600 group"
            >
              <span>Explore internship opportunities</span>
              <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Application Form Component
const CareerApplicationForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    message: '',
    resume: null
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }
  
  const handleFileChange = (e) => {
    setFormState(prev => ({ ...prev, resume: e.target.files[0] }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 1500)
  }
  
  if (submitted) {
    return (
      <div className="p-8 rounded-lg border border-gray-800 bg-black bg-opacity-50 text-center">
        <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-primary-600 bg-opacity-20 mb-4">
          <Send className="h-7 w-7 text-primary-600" />
        </div>
        <h3 className="text-xl font-bold mb-4 text-white">Application Received</h3>
        <p className="text-gray-300 mb-6">
          Thank you for your interest in joining Chery Bangladesh. Our HR team will review your application and contact you soon.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="inline-block py-3 px-6 font-medium rounded-lg transition-all duration-300 bg-primary-600 text-white"
        >
          Submit Another Application
        </button>
      </div>
    )
  }
  
  return (
    <div className="p-8 rounded-lg border border-gray-800 bg-black bg-opacity-50">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-primary-600 bg-opacity-20">
          <Send className="h-5 w-5 text-primary-600" />
        </div>
        <h3 className="text-xl font-bold text-white">Submit Your Profile</h3>
      </div>
      
      <p className="text-gray-300 mb-8">
        Don't see a specific position listed? Submit your profile to our talent pool, and we'll contact you when an opportunity matching your skills becomes available.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Full Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formState.name}
              onChange={handleChange}
              className="w-full py-3 px-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formState.email}
              onChange={handleChange}
              className="w-full py-3 px-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              placeholder="Enter your email address"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number*
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formState.phone}
              onChange={handleChange}
              className="w-full py-3 px-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              placeholder="Enter your phone number"
            />
          </div>
          
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-300 mb-2">
              Department of Interest*
            </label>
            <select
              id="department"
              name="department"
              required
              value={formState.department}
              onChange={handleChange}
              className="w-full py-3 px-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            >
              <option value="" disabled>Select department</option>
              <option value="sales">Sales</option>
              <option value="service">Service & After-Sales</option>
              <option value="marketing">Marketing</option>
              <option value="admin">Administration</option>
              <option value="parts">Parts & Logistics</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            Cover Letter / Additional Information
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formState.message}
            onChange={handleChange}
            className="w-full py-3 px-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            placeholder="Tell us why you'd like to join Chery Bangladesh and what you can bring to our team"
          ></textarea>
        </div>
        
        <div className="mb-8">
          <label htmlFor="resume" className="block text-sm font-medium text-gray-300 mb-2">
            Resume/CV Upload (PDF, DOC, DOCX)*
          </label>
          <div className="relative">
            <input
              type="file"
              id="resume"
              name="resume"
              required
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full py-3 px-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-600 file:text-white hover:file:bg-primary-700"
            />
          </div>
          <p className="mt-2 text-xs text-gray-400">Maximum file size: 5MB</p>
        </div>
        
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              required
              className="w-4 h-4 accent-primary-600 bg-gray-800 border-gray-700 rounded focus:ring-primary-600"
            />
          </div>
          <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
            I agree to the <Link href="/privacy-policy" className="text-primary-600 hover:underline">privacy policy</Link> and consent to having my personal data processed.
          </label>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full sm:w-auto py-3 px-8 font-medium rounded-lg transition-all duration-300 bg-primary-600 text-white hover:bg-primary-700 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Submit Application'
          )}
        </button>
      </form>
    </div>
  )
}

// Main Careers Section Component
const CareersSection = () => {
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

  return (
    <section 
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)' }}
    >
      {/* Background subtle pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />
      
      {/* Decorative elements */}
      <div 
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl bg-primary-600"
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
          <motion.div variants={itemVariants}>
            <SectionHeader 
              title="Join Our Team"
              subtitle="Careers at Chery Bangladesh"
              description="Discover exciting career opportunities with Chery Bangladesh. Join us in our mission to provide exceptional automotive experiences to our customers."
            />
          </motion.div>
          
          {/* Career Categories */}
          <motion.div variants={itemVariants}>
            <CareerCategories />
          </motion.div>
          
          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            {/* Sidebar with company values and contact */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-4"
            >
              {/* Team image */}
              <div className="relative h-64 rounded-lg overflow-hidden mb-8 border border-gray-800">
                <Image 
                  src="/images/careers/team.jpg"
                  fill
                  alt="Chery Bangladesh Team"
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white">
                      Our People
                    </h3>
                    <p className="text-sm text-gray-300">
                      The heart of Chery Bangladesh
                    </p>
                  </div>
                </div>
              </div>

              {/* Company values */}
              <CompanyValues />
              
              {/* Contact info */}
              <div className="p-6 rounded-lg border border-gray-800 bg-black bg-opacity-50">
                <h3 className="text-lg font-bold mb-4 text-white">
                  Have Questions?
                </h3>
                
                <p className="mb-4 text-sm text-gray-400">
                  Contact our HR department for more information about career opportunities at Chery Bangladesh.
                </p>
                
                <a 
                  href="mailto:careers@cherybangladesh.com"
                  className="inline-block text-sm hover:underline text-primary-600"
                >
                  careers@cherybangladesh.com
                </a>
              </div>
            </motion.div>
            
            {/* Application form */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-8"
            >
              <CareerApplicationForm />
            </motion.div>
          </div>
          
          {/* Internship program section */}
          <motion.div variants={itemVariants} className="mt-16">
            <InternshipSection />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative element */}
      <div 
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ 
          background: `linear-gradient(to right, transparent, #c2000044, transparent)`
        }}
        aria-hidden="true"
      />
    </section>
  )
}

export default CareersSection