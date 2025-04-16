'use client'

import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

/**
 * Application form for career opportunities
 * Following Chery Bangladesh design system guidelines
 */
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
  const [errors, setErrors] = useState({})
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formState.name.trim()) newErrors.name = "Name is required"
    if (!formState.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formState.email)) newErrors.email = "Email is invalid"
    if (!formState.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formState.department) newErrors.department = "Please select a department"
    if (!formState.resume) newErrors.resume = "Resume is required"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }
  
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, resume: "File size exceeds 5MB limit" }))
      } else {
        setFormState(prev => ({ ...prev, resume: file }))
        if (errors.resume) {
          setErrors(prev => ({ ...prev, resume: undefined }))
        }
      }
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsSubmitting(true)
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false)
        setSubmitted(true)
      }, 1500)
    }
  }
  
  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="p-8 border border-gray-200 bg-white text-center shadow-sm"
      >
        <div className="w-16 h-16 mx-auto flex items-center justify-center bg-primary-light bg-opacity-40 mb-4">
          <Send className="h-7 w-7 text-primary-900" />
        </div>
        <h3 className="text-xl font-bold mb-4 text-gray-900">Application Received</h3>
        <p className="text-gray-600 mb-6 leading-normal">
          Thank you for your interest in joining Chery Bangladesh. Our HR team will review your application and contact you soon.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="inline-block py-3 px-8 font-medium transition-all duration-300 bg-primary-700 text-white hover:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-opacity-50"
        >
          Submit Another Application
        </button>
      </motion.div>
    )
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className="p-8 border border-gray-200 bg-white hover:border-primary-700 transition-all duration-300 shadow-sm"
    >
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 flex items-center justify-center mr-4 bg-primary-light bg-opacity-40">
          <Send className="h-5 w-5 text-primary-900" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Submit Your Profile</h3>
      </div>
      
      <p className="text-gray-600 mb-8 leading-normal">
        Don't see a specific position listed? Submit your profile to our talent pool, and we'll contact you when an opportunity matching your skills becomes available.
      </p>
      
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
              Full Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              className={`w-full py-3 px-4 bg-white border ${errors.name ? 'border-red-500' : 'border-gray-200'} text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent transition-all duration-300`}
              placeholder="Enter your full name"
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
              Email Address*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              className={`w-full py-3 px-4 bg-white border ${errors.email ? 'border-red-500' : 'border-gray-200'} text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent transition-all duration-300`}
              placeholder="Enter your email address"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
              Phone Number*
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
              className={`w-full py-3 px-4 bg-white border ${errors.phone ? 'border-red-500' : 'border-gray-200'} text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent transition-all duration-300`}
              placeholder="Enter your phone number"
              aria-invalid={errors.phone ? "true" : "false"}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
          </div>
          
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-900 mb-2">
              Department of Interest*
            </label>
            <select
              id="department"
              name="department"
              value={formState.department}
              onChange={handleChange}
              className={`w-full py-3 px-4 bg-white border ${errors.department ? 'border-red-500' : 'border-gray-200'} text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent transition-all duration-300`}
              aria-invalid={errors.department ? "true" : "false"}
            >
              <option value="" disabled>Select department</option>
              <option value="sales">Sales</option>
              <option value="service">Service & After-Sales</option>
              <option value="marketing">Marketing</option>
              <option value="admin">Administration</option>
              <option value="parts">Parts & Logistics</option>
              <option value="other">Other</option>
            </select>
            {errors.department && <p className="mt-1 text-sm text-red-500">{errors.department}</p>}
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
            Cover Letter / Additional Information
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formState.message}
            onChange={handleChange}
            className="w-full py-3 px-4 bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent transition-all duration-300"
            placeholder="Tell us why you'd like to join Chery Bangladesh and what you can bring to our team"
          ></textarea>
        </div>
        
        <div className="mb-8">
          <label htmlFor="resume" className="block text-sm font-medium text-gray-900 mb-2">
            Resume/CV Upload (PDF, DOC, DOCX)*
          </label>
          <div className="relative">
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className={`w-full py-3 px-4 bg-white border ${errors.resume ? 'border-red-500' : 'border-gray-200'} text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-medium file:bg-primary-700 file:text-white hover:file:bg-primary-900 transition-all duration-300`}
              aria-invalid={errors.resume ? "true" : "false"}
            />
          </div>
          {errors.resume ? (
            <p className="mt-1 text-sm text-red-500">{errors.resume}</p>
          ) : (
            <p className="mt-2 text-xs text-gray-500">Maximum file size: 5MB</p>
          )}
        </div>
        
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              required
              className="w-4 h-4 accent-primary-700 border-gray-200 focus:ring-primary-700"
            />
          </div>
          <label htmlFor="terms" className="ml-2 text-sm text-gray-500">
            I agree to the <Link href="/privacy-policy" className="text-primary-700 hover:text-primary-900 transition-colors duration-300">privacy policy</Link> and consent to having my personal data processed.
          </label>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full sm:w-auto py-3 px-10 font-medium transition-all duration-300 bg-primary-700 text-white hover:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-opacity-50 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
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
    </motion.div>
  )
}

export default CareerApplicationForm