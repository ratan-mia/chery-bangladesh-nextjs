'use client'

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const ServiceFAQs = () => {
  // State to track which FAQ item is open
  const [openFAQ, setOpenFAQ] = useState(null);

  // Toggle FAQ open/close
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // FAQ data
  const faqs = [
    {
      question: "How often should I service my Chery vehicle?",
      answer: "We recommend servicing your Chery vehicle every 10,000 km or 6 months, whichever comes first. For optimal performance, following the maintenance schedule in your owner's manual is advised. Our technicians can also provide recommendations based on your specific driving conditions and vehicle model."
    },
    {
      question: "What is included in the standard service package?",
      answer: "Our standard service package includes oil and filter change, comprehensive multi-point inspection, fluid level check and top-up, battery check, brake inspection, tire rotation and pressure check, air filter check, and a diagnostic scan. We use genuine Chery parts and manufacturer-approved lubricants to maintain your warranty."
    },
    {
      question: "How long does a typical service appointment take?",
      answer: "A standard maintenance service typically takes 90-120 minutes. For more extensive repairs or major services, we provide an estimated completion time when you drop off your vehicle. Our express service option completes basic maintenance in 60 minutes or less while you wait in our customer lounge."
    },
    {
      question: "Do I need to make an appointment for service?",
      answer: "While we accommodate walk-ins when possible, we strongly recommend scheduling an appointment to ensure prompt service and minimize wait times. You can book appointments online, through our mobile app, or by calling our service hotline for your preferred date and time."
    },
    {
      question: "Will servicing at your center affect my manufacturer's warranty?",
      answer: "No, servicing your vehicle at our authorized Chery service centers will not void your manufacturer's warranty. We use genuine Chery parts and follow all manufacturer specifications and procedures. We fully document all services, which helps maintain your warranty coverage."
    },
    {
      question: "How can I know when my vehicle needs servicing?",
      answer: "Your Chery vehicle has a service reminder system that illuminates on the dashboard when service is due. Additionally, you can refer to the maintenance schedule in your owner's manual. Our service center also sends reminders before your next scheduled maintenance based on your vehicle's history."
    },
    {
      question: "Do you provide transportation while my car is being serviced?",
      answer: "Yes, we offer a complimentary shuttle service within a 10 km radius of our service centers. For longer services, we also have loaner vehicles available upon request (subject to availability and terms). Our customer lounge is equipped with Wi-Fi, refreshments, and work areas if you prefer to wait."
    },
    {
      question: "What payment methods do you accept for service?",
      answer: "We accept various payment methods including cash, credit/debit cards, mobile banking (bKash, Nagad), and bank transfers. We also offer interest-free installment plans for major repairs through select banking partners. Corporate clients can set up account billing with approved credit terms."
    }
  ];

  return (
    <section className="relative py-20 bg-gray-50">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('/texture-dots.svg')] opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Service <span className="text-primary-900">FAQs</span>
          </h2>
          <div className="w-24 h-1 bg-primary-700 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Find answers to commonly asked questions about our service center operations and maintenance procedures
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          {/* FAQ accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full p-6 text-left flex items-center justify-between transition-colors duration-300 ${
                    openFAQ === index ? 'border-b border-gray-200' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center border mr-4 transition-colors duration-300 ${
                      openFAQ === index ? 'bg-primary-700 border-primary-700' : 'bg-primary-light bg-opacity-30 border-gray-200'
                    }`}>
                      <HelpCircle size={20} className={openFAQ === index ? 'text-white' : 'text-primary-900'} />
                    </div>
                    <span className="font-medium text-gray-900">{faq.question}</span>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`text-primary-700 transition-transform duration-300 ${
                      openFAQ === index ? 'transform rotate-180' : ''
                    }`} 
                  />
                </button>
                
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 pl-20">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          
          {/* Additional help CTA */}
          <div className="mt-12 p-8 bg-white border border-gray-200 text-center shadow-sm">
            <h3 className="text-xl font-medium text-gray-900 mb-2">Need additional assistance?</h3>
            <p className="text-gray-600 mb-6">Our customer service representatives are available to help with any other questions</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="tel:+8801234567890" 
                className="px-6 py-3 bg-primary-700 text-white hover:bg-transparent hover:text-primary-700 border-2 border-primary-700 transition-colors duration-300 font-medium inline-flex items-center"
              >
                Call Service Hotline
              </a>
              <a 
                href="#contact-form" 
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:border-primary-700 hover:text-primary-700 transition-colors duration-300 font-medium inline-flex items-center"
              >
                Submit a Question
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceFAQs;