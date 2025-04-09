'use client'

import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    model: ''
  })
  
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  
  const models = [
    { value: '', label: 'Select a model (optional)' },
    { value: 'tiggo9', label: 'Tiggo 9' },
    { value: 'tiggo8', label: 'Tiggo 8' },
    { value: 'tiggo7', label: 'Tiggo 7' },
    { value: 'tiggo4pro', label: 'Tiggo 4 Pro' },
    { value: 'tiggo2pro', label: 'Tiggo 2 Pro' },
    { value: 'arrizo8', label: 'Arrizo 8' },
    { value: 'arrizo7', label: 'Arrizo 7' },
    { value: 'arrizo5', label: 'Arrizo 5' }
  ]
  
  // Theme colors
  const THEME = {
    primary: '#b29980',        // Primary tan/beige color
    primaryDark: '#a38a73',    // Darker tan for hover
    primaryText: 'white',      // Text on primary background
    
    secondary: '#1E5945',      // Dark green for accents
    secondaryDark: '#174233',  // Darker green
    secondaryText: 'white',    // Text on secondary background
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const errors = {}
    
    if (!formData.name.trim()) errors.name = 'Name is required'
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = 'Invalid email address'
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required'
    } else if (!/^\+?[0-9\s-()]{8,20}$/.test(formData.phone)) {
      errors.phone = 'Invalid phone number'
    }
    
    if (!formData.subject.trim()) errors.subject = 'Subject is required'
    if (!formData.message.trim()) errors.message = 'Message is required'
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    setSubmitSuccess(false)
    setSubmitError(false)
    
    try {
      // Replace with your actual API endpoint
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // if (!response.ok) throw new Error('Failed to submit form')
      
      setSubmitSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        model: ''
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const offices = [
    {
      name: 'Head Office',
      address: '8 Bauhinia Street, Industrial Park, South Africa',
      phone: '+27 021 123 4567',
      email: 'info@chery.co.za',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM'
    },
    {
      name: 'Johannesburg Dealership',
      address: '42 Main Road, Sandton, Johannesburg',
      phone: '+27 011 987 6543',
      email: 'johannesburg@chery.co.za',
      hours: 'Mon-Sat: 8:00 AM - 6:00 PM'
    },
    {
      name: 'Cape Town Dealership',
      address: '15 Beach Road, Sea Point, Cape Town',
      phone: '+27 021 345 6789',
      email: 'capetown@chery.co.za',
      hours: 'Mon-Sat: 8:30 AM - 5:30 PM'
    }
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <section className="relative h-80 md:h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact-hero.jpg" 
            alt="Chery Showroom"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="container mx-auto px-6 z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-white max-w-2xl mx-auto">
            We're here to answer your questions and help you find your perfect Chery vehicle.
          </p>
        </div>
      </section>

      {/* Contact info and form section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact information */}
            <div className="w-full lg:w-1/3">
              <h2 className="text-3xl font-bold mb-8 text-gray-800">Get in Touch</h2>
              
              <div className="mb-12">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Our Offices</h3>
                
                <div className="space-y-8">
                  {offices.map((office, index) => (
                    <div key={index} className="bg-gray-50 p-5 rounded-lg shadow-sm">
                      <h4 className="font-bold text-gray-800 mb-3">{office.name}</h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <MapPin className="w-5 h-5 text-gray-600 mt-0.5 mr-3 flex-shrink-0" />
                          <p className="text-gray-700">{office.address}</p>
                        </div>
                        
                        <div className="flex items-center">
                          <Phone className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0" />
                          <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="text-gray-700 hover:text-gray-900">
                            {office.phone}
                          </a>
                        </div>
                        
                        <div className="flex items-center">
                          <Mail className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0" />
                          <a href={`mailto:${office.email}`} className="text-gray-700 hover:text-gray-900">
                            {office.email}
                          </a>
                        </div>
                        
                        <div className="flex items-start">
                          <Clock className="w-5 h-5 text-gray-600 mt-0.5 mr-3 flex-shrink-0" />
                          <p className="text-gray-700">{office.hours}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact form */}
            <div className="w-full lg:w-2/3 bg-white rounded-lg">
              <h2 className="text-3xl font-bold mb-8 text-gray-800">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                        formErrors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary-200 focus:border-primary'
                      }`}
                      placeholder="John Doe"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-red-500 text-sm">{formErrors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                        formErrors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary-200 focus:border-primary'
                      }`}
                      placeholder="john.doe@example.com"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-red-500 text-sm">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                        formErrors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary-200 focus:border-primary'
                      }`}
                      placeholder="+27 21 123 4567"
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-red-500 text-sm">{formErrors.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="model" className="block text-gray-700 font-medium mb-2">
                      Vehicle Model
                    </label>
                    <select
                      id="model"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary bg-white"
                    >
                      {models.map((model) => (
                        <option key={model.value} value={model.value}>
                          {model.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                    Subject*
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      formErrors.subject ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary-200 focus:border-primary'
                    }`}
                    placeholder="Your subject"
                  />
                  {formErrors.subject && (
                    <p className="mt-1 text-red-500 text-sm">{formErrors.subject}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Message*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      formErrors.message ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary-200 focus:border-primary'
                    }`}
                    placeholder="How can we help you?"
                  ></textarea>
                  {formErrors.message && (
                    <p className="mt-1 text-red-500 text-sm">{formErrors.message}</p>
                  )}
                </div>
                
                {submitSuccess && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800">
                      Thank you for your message! We'll get back to you shortly.
                    </p>
                  </div>
                )}
                
                {submitError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800">
                      There was an error sending your message. Please try again later.
                    </p>
                  </div>
                )}
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white rounded-lg shadow-sm transition-colors"
                    style={{ 
                      backgroundColor: isSubmitting ? THEME.primaryDark : THEME.primary,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 -ml-1 w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Find Us</h2>
          
          <div className="rounded-lg overflow-hidden h-96 shadow-md">
            {/* Replace with your actual Google Maps embed */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.8759763557977!2d18.423359315257868!3d-33.91702398064223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc676e459d382f%3A0x6f70041e69d6ca47!2sCape%20Town%2C%20South%20Africa!5e0!3m2!1sen!2sus!4v1649252926204!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Chery Location Map"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-lg text-gray-800 mb-2">What are your showroom hours?</h3>
                <p className="text-gray-700">
                  Our showrooms are generally open Monday to Friday from 8:00 AM to 5:00 PM, and Saturdays from 9:00 AM to 2:00 PM. 
                  Please check with your local dealership for specific hours as they may vary.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-lg text-gray-800 mb-2">How do I schedule a test drive?</h3>
                <p className="text-gray-700">
                  You can schedule a test drive by filling out the contact form on this page, calling your nearest dealership directly, 
                  or using our online booking system on the vehicle model pages.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-lg text-gray-800 mb-2">What financing options do you offer?</h3>
                <p className="text-gray-700">
                  We offer various financing options including traditional auto loans, lease agreements, and flexible payment plans. 
                  Our finance team can help you find the best option based on your budget and needs.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-lg text-gray-800 mb-2">How do I book a service for my Chery vehicle?</h3>
                <p className="text-gray-700">
                  You can book a service appointment by contacting our service department directly, using our online service booking 
                  portal, or visiting your nearest dealership in person.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-lg text-gray-800 mb-2">What warranty do Chery vehicles come with?</h3>
                <p className="text-gray-700">
                  All new Chery vehicles come with a comprehensive 5-year/150,000 km warranty, which includes 24/7 roadside assistance. 
                  Some models may have additional warranty features. Please ask your sales representative for specific details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}