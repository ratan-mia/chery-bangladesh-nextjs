'use client'

import { motion } from 'framer-motion';
import { ArrowRight, Check, Clock } from 'lucide-react';
import Image from 'next/image';

const PremiumServices = () => {
  const services = [
    {
      title: "Engine Diagnostics",
      description: "Comprehensive engine diagnostics using advanced equipment to identify and resolve performance issues.",
      image: "/api/placeholder/600/400",
      price: "৳ 2,500",
      time: "60 min"
    },
    {
      title: "Full Service Package",
      description: "Complete vehicle maintenance including oil change, filter replacement, and multi-point inspection.",
      image: "/api/placeholder/600/400",
      price: "৳ 7,500",
      time: "180 min"
    },
    {
      title: "Brake Service",
      description: "Professional brake inspection, pad replacement, and complete brake system servicing for optimal safety.",
      image: "/api/placeholder/600/400",
      price: "৳ 4,000",
      time: "90 min"
    },
    {
      title: "AC Service & Repair",
      description: "Climate control system diagnosis, refrigerant recharge, and component repair for maximum comfort.",
      image: "/api/placeholder/600/400",
      price: "৳ 3,500",
      time: "120 min"
    },
    {
      title: "Transmission Service",
      description: "Complete transmission fluid change, filter replacement, and system inspection for smooth shifting.",
      image: "/api/placeholder/600/400",
      price: "৳ 6,000",
      time: "150 min"
    },
    {
      title: "Premium Detailing",
      description: "Professional interior and exterior detailing to restore your vehicle's appearance to showroom quality.",
      image: "/api/placeholder/600/400",
      price: "৳ 8,500",
      time: "240 min"
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
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Heading Section */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block mb-4">
            <span className="bg-primary-600 text-white text-sm font-medium px-4 py-1">
              EXPERT SOLUTIONS
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
            Premium Maintenance <span className="text-primary-600">&</span> Repair
          </h2>
          
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Our specialized services ensure your Chery vehicle maintains peak performance 
            and reliability throughout its lifetime.
          </p>
        </motion.div>
        
        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-lg overflow-hidden group relative"
            >
              {/* Service Image */}
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-primary-600 opacity-30 z-10 group-hover:opacity-0 transition-opacity duration-300"></div>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Price Tag */}
                <div className="absolute top-4 right-4 z-20 bg-white py-1 px-3 rounded-sm shadow-md">
                  <span className="text-primary-600 font-bold">{service.price}</span>
                </div>
              </div>
              
              {/* Service Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <Clock size={16} className="mr-2" />
                  <span>{service.time}</span>
                </div>
                
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                
                {/* Features */}
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <Check size={16} className="text-primary-600 mr-2" />
                    <span className="text-sm text-gray-600">Factory certified technicians</span>
                  </div>
                  <div className="flex items-center">
                    <Check size={16} className="text-primary-600 mr-2" />
                    <span className="text-sm text-gray-600">Genuine OEM parts</span>
                  </div>
                </div>
                
                {/* Button */}
                <div className="relative overflow-hidden">
                  <button className="w-full py-3 bg-gray-100 text-gray-800 font-medium group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300 rounded-sm flex items-center justify-center">
                    Book Service
                    <ArrowRight size={16} className="ml-2 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300" />
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
          <div className="inline-block bg-white p-1 shadow-md rounded-lg">
            <a 
              href="#all-services" 
              className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-medium rounded-sm hover:bg-primary-700 transition-colors duration-300"
            >
              Explore All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumServices;