import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { useState } from 'react'
import FormAlert from '../form/FormAlert'
import FormInput from '../form/FormInput'
import FormSelect from '../form/FormSelect'
import FormTextarea from '../form/FormTextarea'

export default function ContactForm({ models }) {
  // Using the dark theme from the design system
  const theme = {
    accent: '#e2cdb8',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.95)',
    buttonBg: '#e2cdb8',
    buttonText: '#111827',
    accentLine: '#e2cdb8',
    contentBg: 'rgba(17, 24, 39, 0.85)'
  }

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

  // Animation variants from the design system
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="backdrop-blur-sm p-8 md:p-10"
      style={{
        backgroundColor: theme.contentBg,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Accent line following design system */}
      <motion.div 
        variants={itemVariants}
        className="h-1.5 w-28 mb-8"
        style={{ backgroundColor: theme.accentLine }}
      ></motion.div>
      
      <motion.h2 
        variants={itemVariants}
        className="text-4xl font-bold mb-8 leading-tight"
        style={{ 
          color: theme.text,
          letterSpacing: '-0.01em'
        }}
      >
        Send Us a Message
      </motion.h2>
      
      <motion.form 
        variants={itemVariants}
        onSubmit={handleSubmit} 
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            id="name"
            label="Full Name*"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            error={formErrors.name}
            theme={theme}
          />
          
          <FormInput
            id="email"
            label="Email Address*"
            type="email"
            placeholder="john.doe@example.com"
            value={formData.email}
            onChange={handleChange}
            error={formErrors.email}
            theme={theme}
          />
          
          <FormInput
            id="phone"
            label="Phone Number*"
            type="tel"
            placeholder="+880 9639119977"
            value={formData.phone}
            onChange={handleChange}
            error={formErrors.phone}
            theme={theme}
          />
          
          <FormSelect
            id="model"
            label="Vehicle Model"
            value={formData.model}
            onChange={handleChange}
            options={models}
            theme={theme}
          />
        </div>
        
        <FormInput
          id="subject"
          label="Subject*"
          type="text"
          placeholder="Your subject"
          value={formData.subject}
          onChange={handleChange}
          error={formErrors.subject}
          theme={theme}
        />
        
        <FormTextarea
          id="message"
          label="Message*"
          placeholder="How can we help you?"
          value={formData.message}
          onChange={handleChange}
          error={formErrors.message}
          rows={5}
          theme={theme}
        />
        
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <FormAlert 
              type="success" 
              message="Thank you for your message! We'll get back to you shortly." 
            />
          </motion.div>
        )}
        
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <FormAlert 
              type="error" 
              message="There was an error sending your message. Please try again later." 
            />
          </motion.div>
        )}
        
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium transition-all duration-300"
            style={{ 
              backgroundColor: theme.buttonBg,
              color: theme.buttonText,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.8 : 1
            }}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{ color: theme.buttonText }}>
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
      </motion.form>
    </motion.div>
  )
}