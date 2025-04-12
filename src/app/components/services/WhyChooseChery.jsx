'use client'

import { motion } from 'framer-motion';
import {
  ArrowRight,
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
    <section className="py-24 relative" 
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
      }}>
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Heading Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Why Choose <span className="text-primary-600">Chery</span> Bangladesh
          </h2>
          
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
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
              className="relative border border-gray-800 bg-black bg-opacity-40 backdrop-blur-sm overflow-hidden group hover:border-primary-600 transition-colors duration-300"
              variants={itemVariants}
            >
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary-600 opacity-10 transform rotate-45 translate-x-8 -translate-y-8"></div>
              
              {/* Top accent */}
              <div className="h-1 w-full bg-primary-600 opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Icon and Content */}
              <div className="p-8">
                <div className="w-16 h-16 bg-primary-600 bg-opacity-20 flex items-center justify-center mb-6 group-hover:bg-opacity-30 transition-colors duration-300">
                  <reason.icon className="text-white" size={28} />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-4">
                  {reason.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-400 leading-relaxed mb-8">
                  {reason.description}
                </p>
                
                {/* Indicator */}
                <div className="flex items-center text-primary-600 font-medium text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition duration-300">
                  <span>Learn more</span>
                  <ArrowRight size={16} className="ml-2 group-hover:ml-3 transition-all duration-300" />
                </div>
              </div>
              
              {/* Bottom accent line that fills on hover */}
              <div className="h-0.5 w-full bg-gray-800 mt-auto">
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
            className="group inline-flex items-center px-10 py-4 bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors duration-300"
          >
            Schedule Your Service
            <ArrowRight size={20} className="ml-2 group-hover:ml-3 transition-all duration-300" />
          </a>
        </motion.div>
        
        {/* Optional decorative elements */}
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary-600 opacity-5 transform -translate-y-1/2"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600 opacity-5 transform translate-x-1/2 -translate-y-1/2 rounded-full"></div>
      </div>
    </section>
  );
};

export default WhyChooseChery;