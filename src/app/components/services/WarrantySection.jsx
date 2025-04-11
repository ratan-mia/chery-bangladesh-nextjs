'use client'

import { motion } from 'framer-motion';
import { Award, Clock, LifeBuoy, RefreshCw, Shield, Truck } from 'lucide-react';

const WarrantySection = () => {
  const warranties = [
    {
      title: "Basic Warranty",
      duration: "5 YEARS / 150,000 KM",
      icon: Shield,
      features: [
        "Full bumper-to-bumper coverage for the first 5 years or 150,000 kilometers, whichever comes first",
        "Comprehensive coverage for all factory-installed mechanical and electrical components",
        "24/7 roadside assistance included for the duration of the basic warranty"
      ]
    },
    {
      title: "Powertrain Warranty",
      duration: "7 YEARS / 200,000 KM",
      icon: Award,
      features: [
        "Extended coverage for the engine, transmission, and all related components",
        "Coverage includes all internally lubricated parts, drive axle, and drivetrain components",
        "Transferable to subsequent owners, enhancing your vehicle's resale value"
      ]
    }
  ];

  // Additional warranty benefits
  const benefits = [
    {
      title: "24/7 Roadside Assistance",
      description: "Round-the-clock emergency support including towing, battery jump-start, flat tire service, and fuel delivery.",
      icon: LifeBuoy
    },
    {
      title: "Corrosion Protection",
      description: "8-year unlimited mileage warranty against perforation due to corrosion for all body panels.",
      icon: Shield
    },
    {
      title: "Transferable Coverage",
      description: "Warranty coverage can be transferred to subsequent owners, enhancing your vehicle's resale value.",
      icon: RefreshCw
    },
    {
      title: "Service Loaners",
      description: "Complimentary loaner vehicles for warranty repairs that require your vehicle to stay overnight.",
      icon: Truck
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
            Industry-Leading <span className="text-primary-600">Warranty</span> Coverage
          </h2>
          
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Every Chery vehicle comes with an exceptional warranty package, demonstrating our 
            confidence in the quality and reliability of our vehicles and giving you peace of mind for years to come.
          </p>
        </motion.div>
        
        {/* Warranty Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {warranties.map((warranty, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <div className="absolute inset-0 bg-primary-600 rounded-lg transform transition-transform duration-500 group-hover:scale-[1.02] shadow-xl"></div>
              
              <div className="relative bg-primary-800 text-white p-8 rounded-lg transform transition-transform duration-500 group-hover:translate-y-2 group-hover:translate-x-2">
                {/* Top design element */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-600 opacity-20 transform rotate-45 translate-x-8 -translate-y-8 rounded-bl-3xl"></div>
                
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-primary-700 rounded-full flex items-center justify-center">
                    <warranty.icon size={32} className="text-white" />
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-center mb-4">{warranty.title}</h3>
                
                {/* Duration */}
                <div className="text-center font-bold text-xl mb-8 flex items-center justify-center">
                  <Clock size={18} className="mr-2" />
                  <span>{warranty.duration}</span>
                </div>
                
                {/* Features */}
                <ul className="space-y-4">
                  {warranty.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 text-primary-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Additional Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-10">
            Additional Warranty Benefits
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                  <benefit.icon className="text-primary-600" size={24} />
                </div>
                
                <h4 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h4>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Disclaimer and CTA */}
        <motion.div 
          className="mt-16 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-gray-500 mb-8">
            * Warranty coverage is subject to terms and conditions. Please refer to your warranty booklet for complete details.
            Regular maintenance at authorized Chery service centers is required to maintain warranty validity.
          </p>
          
          <a 
            href="#warranty-details" 
            className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-medium rounded-sm hover:bg-primary-700 transition-colors duration-300"
          >
            View Complete Warranty Details
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WarrantySection;