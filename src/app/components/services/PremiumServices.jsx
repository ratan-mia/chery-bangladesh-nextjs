'use client'

import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Plus } from 'lucide-react';
import Link from 'next/link';

const PremiumServices = () => {
  const services = [
    {
      title: "Engine Diagnostics",
      description: "Comprehensive engine diagnostics using advanced equipment to identify and resolve performance issues.",
      image: "/api/placeholder/600/400",
      price: "৳ 2,500"
    },
    {
      title: "Full Service Package",
      description: "Complete vehicle maintenance including oil change, filter replacement, and multi-point inspection.",
      image: "/api/placeholder/600/400",
      price: "৳ 7,500"
    },
    {
      title: "Brake Service",
      description: "Professional brake inspection, pad replacement, and complete brake system servicing for optimal safety.",
      image: "/api/placeholder/600/400",
      price: "৳ 4,000"
    },
    {
      title: "AC Service & Repair",
      description: "Climate control system diagnosis, refrigerant recharge, and component repair for maximum comfort.",
      image: "/api/placeholder/600/400",
      price: "৳ 3,500"
    },
    {
      title: "Transmission Service",
      description: "Complete transmission fluid change, filter replacement, and system inspection for smooth shifting.",
      image: "/api/placeholder/600/400",
      price: "৳ 6,000"
    },
    {
      title: "Premium Detailing",
      description: "Professional interior and exterior detailing to restore your vehicle's appearance to showroom quality.",
      image: "/api/placeholder/600/400",
      price: "৳ 8,500"
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
    <section className="py-20 relative bg-gray-100">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Heading Section */}
        <div className="flex flex-col md:flex-row items-start">
          <div className="hidden md:block w-px h-40 bg-primary-700 mr-12 self-stretch"></div>
          
          <div className="mb-16 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block text-primary-700 font-medium text-lg mb-4">Service Catalog</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                Premium Maintenance for Your Chery
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl">
                Our expert technicians deliver specialized care using factory-approved equipment and genuine parts to ensure optimal performance and longevity.
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Tabular Services List */}
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="border-t border-gray-200 bg-white shadow-sm rounded-md overflow-hidden">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="group"
              >
                <div className="border-b border-gray-200 py-8 transition-colors duration-300 hover:bg-gray-50">
                  <div className="grid md:grid-cols-12 gap-6 items-center px-6">
                    {/* Service Number */}
                    <div className="hidden md:flex md:col-span-1 justify-center">
                      <div className="w-8 h-8 border border-primary-700 flex items-center justify-center text-primary-700 font-medium text-sm group-hover:bg-primary-700 group-hover:text-white transition-colors duration-300">
                        {index + 1}
                      </div>
                    </div>
                    
                    {/* Service Title */}
                    <div className="md:col-span-3">
                      <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-primary-900">
                        {service.title}
                      </h3>
                    </div>
                    
                    {/* Service Description */}
                    <div className="md:col-span-4">
                      <p className="text-gray-600 text-sm">
                        {service.description}
                      </p>
                    </div>
                    
                    {/* Price */}
                    <div className="md:col-span-2 text-right md:text-center">
                      {/* <span className="text-lg font-bold text-primary-700">{service.price}</span> */}
                    </div>
                    
                    {/* Action Button */}
                    <div className="md:col-span-2 flex justify-end">
                      <Link href="#book-service" className="px-4 py-2 border border-gray-300 text-gray-700 flex items-center hover:border-primary-700 hover:text-primary-700 transition-colors duration-300">
                        <span className="mr-2">Book Now</span>
                        <Plus size={16} className="transform group-hover:rotate-90 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                  
                  {/* Mobile Expandable Panel */}
                  <div className="md:hidden mt-4 pt-4 border-t border-gray-200 px-6">
                    <button className="w-full text-center text-primary-700 text-sm font-medium py-2">
                      View Details
                      <ChevronRight size={14} className="inline-block ml-1 transform -rotate-90" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div 
          className="mt-16 flex justify-center md:justify-end"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          viewport={{ once: true }}
        >
          <a 
            href="#all-services" 
            className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-primary-700 text-primary-700 font-medium hover:bg-primary-700 hover:text-white transition-colors duration-300"
          >
            View Full Service Menu
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumServices;