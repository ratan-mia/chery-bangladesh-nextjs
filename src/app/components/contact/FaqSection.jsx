'use client'

import { motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

// FAQ Item Component with enhanced animation
function FaqItem({ question, answer, isFirst = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef(null)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? contentRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`transition-all duration-300 border ${isOpen ? 'bg-gray-50' : 'bg-white'} ${!isFirst || isOpen ? 'border-t border-gray-200' : ''} border-l border-r border-gray-200 ${isOpen && 'shadow-sm'}`}
    >
      <button
        className="flex items-center justify-between w-full p-6 text-left transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="font-medium text-xl text-gray-900">{question}</h3>
        <span
          className="ml-4 flex-shrink-0 p-1 text-primary"
        >
          {isOpen ? (
            <Minus className="h-5 w-5" />
          ) : (
            <Plus className="h-5 w-5" />
          )}
        </span>
      </button>

      <div
        ref={contentRef}
        style={{ height: contentHeight }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div className="p-6 border-t border-gray-100">
          <p
            className="text-lg leading-relaxed text-gray-600"
          >
            {answer}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function FaqSection() {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
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

  const faqs = [
    {
      question: "What are your showroom hours?",
      answer:
        "Our Dhaka showroom is open Saturday to Friday from 10:00 AM to 8:00 PM. We recommend calling ahead to schedule a test drive.",
    },
    {
      question: "How do I schedule a test drive?",
      answer:
        "You can schedule a test drive by filling out the contact form on this page, calling us directly at 09639119977, or visiting our showroom at Tejgaon Gulshan Link Road. Our sales representatives will be happy to arrange a convenient time for you.",
    },
    {
      question: "What financing options do you offer?",
      answer:
        "We offer various financing options including traditional auto loans, lease agreements, and flexible payment plans. Our finance team can help you find the best option based on your budget and needs. We also have special corporate deals available.",
    },
    {
      question: "How do I book a service for my Chery vehicle?",
      answer:
        "You can book a service appointment by contacting our service department directly at 09639119977, using our online service booking portal, or visiting our service center in person. We recommend booking at least 3-5 days in advance for routine maintenance.",
    },
    {
      question: "What warranty do Chery vehicles come with?",
      answer:
        "All new Chery vehicles in Bangladesh come with a comprehensive 5-year/100,000 km warranty (whichever comes first). This includes 24/7 roadside assistance throughout the warranty period. Some models may have additional warranty features. Please ask your sales manager for specific details.",
    },
    {
      question: "Do you offer test drives at home?",
      answer:
        "Yes, we offer at-home test drive services within Dhaka city. You can request this service by contacting our sales team at 09639119977 or through our online booking form. Our representative will bring the vehicle to your location at a scheduled time.",
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden bg-white border-t border-gray-100"
    >
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40 L40 0 M-10 30 L10 50 M30 -10 L50 10' stroke='%23222222' stroke-width='1'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Accent line */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "2.5rem" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 mx-auto mb-4 bg-primary"
          />

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="block text-sm uppercase tracking-wider mb-3 text-primary text-center"
          >
            Customer Support
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-12 text-center text-gray-900"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="shadow-sm border-b border-gray-200 overflow-hidden">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isFirst={index === 0}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-lg mb-6 text-gray-600">
              Can't find the answer you're looking for?
            </p>
            <a
              href="#contact-form"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium bg-primary hover:bg-primary-dark text-white transition-colors duration-300 group"
            >
              Contact Our Support Team
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}