'use client'

import { motion } from 'framer-motion';
import {
  Award,
  FileText,
  Settings,
  ShieldCheck,
  Users,
  Wrench
} from 'lucide-react';

const WhyChooseChery = () => {
  const reasons = [
    {
      title: "Factory Trained Technicians",
      description: "Our certified technicians receive extensive training directly from Chery International to provide expert service for your vehicle.",
      icon: Award
    },
    {
      title: "State-of-the-Art Diagnostics",
      description: "Advanced diagnostic equipment specifically designed for Chery vehicles, ensuring accurate problem identification and efficient repairs.",
      icon: Wrench
    },
    {
      title: "Genuine OEM Parts",
      description: "We exclusively use genuine Chery parts that meet the highest quality standards, maintaining your vehicle's performance and value.",
      icon: Settings
    },
    {
      title: "Digital Service Records",
      description: "Complete digital maintenance history for your vehicle, accessible anytime to help maintain warranty coverage and resale value.",
      icon: FileText
    },
    {
      title: "Warranty Protection",
      description: "Our certified service ensures your warranty remains valid, protecting your investment for the full warranty period.",
      icon: ShieldCheck
    },
    {
      title: "Premium Customer Care",
      description: "Personalized service approach with dedicated advisors who understand your vehicle needs and preferences.",
      icon: Users
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Heading Section */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Choose <span className="text-primary-600">Chery</span> Bangladesh
          </h2>
          
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Experience premium automotive care with the confidence that comes from 
            choosing an authorized service provider with proven expertise.
          </p>
        </motion.div>
        
        {/* Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {reasons.map((reason, index) => (
            <motion.div 
              key={index}
              className="relative bg-white border-t-4 border-primary-600 shadow-lg overflow-hidden group"
              variants={itemVariants}
            >
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary-600 opacity-10 transform rotate-45 translate-x-8 -translate-y-8"></div>
              
              {/* Icon */}
              <div className="pt-8 pb-4 px-8">
                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary-100 transition-colors duration-300">
                  <reason.icon className="text-primary-600" size={32} strokeWidth={1.5} />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {reason.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-8">
                  {reason.description}
                </p>
                
                {/* Indicator */}
                <div className="flex items-center text-primary-600 font-medium text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition duration-300">
                  <span>Learn more</span>
                  <svg className="w-4 h-4 ml-2 group-hover:ml-3 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
              
              {/* Bottom bar */}
              <div className="h-1.5 w-full bg-gray-100 mt-auto">
                <div className="h-full bg-primary-600 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA Section */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          viewport={{ once: true }}
        >
          <a 
            href="#contact" 
            className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-medium rounded-sm hover:bg-primary-700 transition-colors duration-300"
          >
            Schedule Your Service
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseChery;