'use client'

import { motion } from 'framer-motion';
import { ArrowRight, Award, Calendar, Car, CheckCircle, Wrench } from 'lucide-react';

const ServiceProcess = () => {
  const steps = [
    {
      number: 1,
      title: "Book Appointment",
      description: "Schedule your service appointment online or by phone at your preferred date and time.",
      icon: Calendar
    },
    {
      number: 2,
      title: "Vehicle Drop-off",
      description: "Bring your vehicle to our service center where our staff will collect relevant information and requirements.",
      icon: Car
    },
    {
      number: 3,
      title: "Service & Updates",
      description: "Our technicians perform the required service while keeping you updated throughout the process.",
      icon: Wrench
    },
    {
      number: 4,
      title: "Quality Check",
      description: "A comprehensive inspection ensures all work meets our stringent quality standards before delivery.",
      icon: Award
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section className="py-20 relative bg-gray-50">
      {/* Subtle diagonal pattern overlay */}
      <div className="absolute inset-0 opacity-5" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Heading Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-primary-900">Service</span> Process
          </h2>
          
          <div className="w-24 h-1 bg-primary-700 mx-auto mb-8"></div>
          
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Experience our seamless and efficient service process, designed to provide you 
            with exceptional care and convenience at every step.
          </p>
        </motion.div>
        
        {/* Process Steps */}
        <motion.div 
          className="relative max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 w-3/4 bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto z-0" 
               aria-hidden="true" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="flex flex-col items-center text-center relative"
                variants={itemVariants}
              >
                {/* Step Icon */}
                <div className="mb-3">
                  <div className="relative">
                    {/* Outer circle */}
                    <div className="w-16 h-16 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center">
                      {/* Number badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {step.number}
                      </div>
                      
                      {/* Icon */}
                      <step.icon size={24} className="text-primary-900" />
                    </div>
                  </div>
                </div>
                
                {/* Step Content */}
                <div className="p-6 bg-white shadow-sm border border-gray-200 h-full w-full">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Arrow connector (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-24 left-full -translate-x-1/2 z-10 text-primary-700" aria-hidden="true">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
                
                {/* Mobile connector (visible only on mobile) */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-2" aria-hidden="true">
                    <ArrowRight className="w-6 h-6 text-primary-700 transform rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Success Message */}
        <motion.div 
          className="mt-16 max-w-3xl mx-auto bg-white border border-gray-200 shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start">
            <div className="mr-4 mt-1">
              <CheckCircle size={24} className="text-primary-700" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Guaranteed Satisfaction</h3>
              <p className="text-gray-600">
                Our service process is designed to ensure complete transparency and customer satisfaction. 
                We're committed to providing exceptional service with every visit, backed by our satisfaction guarantee.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Call to Action */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <a 
            href="#book-service" 
            className="group inline-flex items-center px-8 py-4 bg-primary-700 text-white font-medium hover:bg-primary-900 transition-colors duration-300"
          >
            Book Your Appointment Now
            <ArrowRight className="ml-2 group-hover:ml-3 transition-all duration-300" size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceProcess;