'use client'

import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Shield, Wrench } from 'lucide-react';
import Image from 'next/image';

const PremiumServices = () => {
  const services = [
    {
      title: "Engine Diagnostics",
      description: "Comprehensive engine diagnostics using advanced equipment to identify and resolve performance issues.",
      image: "/api/placeholder/600/400",
      price: "৳ 2,500",
      icon: Wrench
    },
    {
      title: "Full Service Package",
      description: "Complete vehicle maintenance including oil change, filter replacement, and multi-point inspection.",
      image: "/api/placeholder/600/400",
      price: "৳ 7,500",
      icon: Shield
    },
    {
      title: "Brake Service",
      description: "Professional brake inspection, pad replacement, and complete brake system servicing for optimal safety.",
      image: "/api/placeholder/600/400",
      price: "৳ 4,000",
      icon: Wrench
    },
    {
      title: "AC Service & Repair",
      description: "Climate control system diagnosis, refrigerant recharge, and component repair for maximum comfort.",
      image: "/api/placeholder/600/400",
      price: "৳ 3,500",
      icon: Wrench
    },
    {
      title: "Transmission Service",
      description: "Complete transmission fluid change, filter replacement, and system inspection for smooth shifting.",
      image: "/api/placeholder/600/400",
      price: "৳ 6,000",
      icon: Shield
    },
    {
      title: "Premium Detailing",
      description: "Professional interior and exterior detailing to restore your vehicle's appearance to showroom quality.",
      image: "/api/placeholder/600/400",
      price: "৳ 8,500",
      icon: Shield
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
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Left diagonal line decoration */}
        <div className="relative">
          <div className="absolute left-0 top-0 w-1 h-32 bg-primary-600 transform -rotate-45 origin-top-left hidden lg:block"></div>
        </div>
        
        {/* Heading Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:max-w-2xl"
          >
            <div className="w-16 h-1 bg-primary-600 mb-6 hidden lg:block"></div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Premium <span className="text-primary-600">Services</span> for 
              Your Chery Vehicle
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-gray-600 text-lg mt-4 lg:mt-0 lg:max-w-md"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Expert care with specialized diagnostics and maintenance services 
            delivered by our factory-trained technicians.
          </motion.p>
        </div>
        
        {/* Services List */}
        <motion.div 
          className="space-y-6 max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="flex flex-col md:flex-row bg-gray-50 overflow-hidden relative hover:shadow-xl transition-shadow duration-300">
                {/* Left border accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-600 group-hover:h-full transition-all duration-500 ease-out" 
                     style={{ height: '30%' }}></div>
                
                {/* Service Icon (Mobile) */}
                <div className="p-4 flex items-center md:hidden">
                  <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mr-4">
                    <service.icon className="text-primary-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                </div>
                
                {/* Service Image */}
                <div className="relative md:w-1/4 h-48 md:h-auto overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Service Content */}
                <div className="py-6 px-8 md:w-2/4 flex flex-col justify-center">
                  {/* Title (Desktop) */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hidden md:block">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                {/* Service Price and Button */}
                <div className="md:w-1/4 bg-white p-6 flex flex-col justify-center items-center">
                  <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-4 hidden md:flex">
                    <service.icon className="text-primary-600" size={28} />
                  </div>
                  
                  <div className="text-primary-600 font-bold text-2xl mb-4">
                    {service.price}
                  </div>
                  
                  <button className="flex items-center justify-center w-full py-3 px-4 border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white transition-colors duration-300 font-medium rounded-sm">
                    Book Now
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
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
            href="#all-services" 
            className="inline-flex items-center px-10 py-4 bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors duration-300 shadow-lg"
          >
            View Complete Service Catalog
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </motion.div>
        
        {/* Right diagonal line decoration */}
        <div className="relative h-32">
          <div className="absolute right-0 bottom-0 w-1 h-32 bg-primary-600 transform rotate-45 origin-bottom-right hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
};

export default PremiumServices;