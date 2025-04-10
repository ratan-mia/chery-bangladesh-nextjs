'use client';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Theme configuration based on the dark climate design system
const theme = {
  accent: '#e2cdb8',
  text: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.95)',
  buttonBg: '#e2cdb8',
  buttonText: '#111827',
  accentLine: '#e2cdb8',
  contentBg: 'rgba(17, 24, 39, 0.85)'
};

// FAQ Item Component with enhanced animation
function FaqItem({ question, answer, isFirst = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: isOpen ? 'rgba(26, 32, 44, 0.6)' : 'rgba(17, 24, 39, 0.5)',
        borderBottom: isFirst && !isOpen ? 'none' : `1px solid ${theme.accent}22`
      }}
      className="backdrop-blur-sm transition-all duration-300"
    >
      <button
        className="flex items-center justify-between w-full p-6 text-left transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        style={{ 
          color: theme.text,
          borderBottom: isOpen ? `1px solid ${theme.accent}22` : 'none'
        }}
      >
        <h3 className="font-medium text-xl">{question}</h3>
        <span 
          className="ml-4 flex-shrink-0 p-1"
          style={{ color: theme.accent }}
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
        <div className="p-6">
          <p 
            className="text-lg leading-relaxed"
            style={{ color: theme.textSecondary }}
          >
            {answer}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function FaqSection() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const faqs = [
    {
      question: "What are your showroom hours?",
      answer: "Our Dhaka showroom is open Monday to Friday from 9:00 AM to 6:00 PM, and Saturday from 10:00 AM to 4:00 PM. We are closed on Sundays and public holidays. We recommend calling ahead to schedule a test drive."
    },
    {
      question: "How do I schedule a test drive?",
      answer: "You can schedule a test drive by filling out the contact form on this page, calling us directly at 09639119977, or visiting our showroom at Tejgaon Gulshan Link Road. Our sales representatives will be happy to arrange a convenient time for you."
    },
    {
      question: "What financing options do you offer?",
      answer: "We offer various financing options including traditional auto loans, lease agreements, and flexible payment plans. Our finance team can help you find the best option based on your budget and needs. We also have special corporate deals available."
    },
    {
      question: "How do I book a service for my Chery vehicle?",
      answer: "You can book a service appointment by contacting our service department directly at 09639119977, using our online service booking portal, or visiting our service center in person. We recommend booking at least 3-5 days in advance for routine maintenance."
    },
    {
      question: "What warranty do Chery vehicles come with?",
      answer: "All new Chery vehicles in Bangladesh come with a comprehensive 6-year/150,000 km warranty (whichever comes first). This includes 24/7 roadside assistance throughout the warranty period. Some models may have additional warranty features. Please ask your sales representative for specific details."
    },
    {
      question: "Do you offer test drives at home?",
      answer: "Yes, we offer at-home test drive services within Dhaka city. You can request this service by contacting our sales team at 09639119977 or through our online booking form. Our representative will bring the vehicle to your location at a scheduled time."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, rgba(17, 24, 39, 1), rgba(17, 24, 39, 0.95))'
      }}
    >
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Accent line */}
          <motion.div 
            initial={{ width: 0 }}
            animate={isInView ? { width: '7rem' } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1.5 mx-auto mb-8"
            style={{ backgroundColor: theme.accentLine }}
          />
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl font-bold mb-12 text-center leading-tight"
            style={{ 
              color: theme.text,
              letterSpacing: '-0.01em'
            }}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <div 
            className="overflow-hidden"
            style={{
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
            }}
          >
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
            <p 
              className="text-lg mb-6"
              style={{ color: theme.textSecondary }}
            >
              Can't find the answer you're looking for?
            </p>
            <a 
              href="#contact-form" 
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium transition-all duration-300"
              style={{
                backgroundColor: theme.buttonBg,
                color: theme.buttonText,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            >
              Contact Our Support Team
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative glow effect */}
      <div 
        className="absolute inset-x-0 bottom-0 blur-3xl opacity-30 z-0"
        style={{
          background: `radial-gradient(circle at center, ${theme.accent}44 0%, transparent 70%)`,
          transform: 'translate(0, 50%)',
          height: '200px'
        }}
        aria-hidden="true"
      />
    </section>
  );
}