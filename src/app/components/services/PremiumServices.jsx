'use client'

import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Plus } from 'lucide-react';

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

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Simple side decoration */}
        <div className="flex flex-col md:flex-row items-start">
          <div className="hidden md:block w-px h-40 bg-primary-600 mr-12 self-stretch"></div>
          
          {/* Heading Section with minimalist design */}
          <div className="mb-16 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block text-primary-600 font-medium text-lg mb-4">Service Catalog</span>
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
        <div className="overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="border-t border-gray-200">
              {services.map((service, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="border-b border-gray-200 py-8 transition-colors duration-300 hover:bg-gray-50">
                    <div className="grid md:grid-cols-12 gap-6 items-center">
                      {/* Service Number */}
                      <div className="hidden md:flex md:col-span-1 justify-center">
                        <div className="w-8 h-8 rounded-full border border-primary-600 flex items-center justify-center text-primary-600 font-medium text-sm group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                          {index + 1}
                        </div>
                      </div>
                      
                      {/* Service Title */}
                      <div className="md:col-span-3">
                        <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-primary-600">
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
                        <span className="text-lg font-bold text-primary-600">{service.price}</span>
                      </div>
                      
                      {/* Action Button */}
                      <div className="md:col-span-2 flex justify-end">
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-sm flex items-center hover:border-primary-600 hover:text-primary-600 transition-colors duration-300">
                          <span className="mr-2">Book Now</span>
                          <Plus size={16} className="transform group-hover:rotate-90 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Mobile Expandable Panel */}
                    <div className="md:hidden mt-4 pt-4 border-t border-gray-100">
                      <button className="w-full text-center text-primary-600 text-sm font-medium py-2">
                        View Details
                        <ChevronRight size={14} className="inline-block ml-1 transform -rotate-90" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Minimalist CTA Section */}
        <motion.div 
          className="mt-16 flex justify-center md:justify-end"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          viewport={{ once: true }}
        >
          <a 
            href="#all-services" 
            className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-primary-600 text-primary-600 font-medium hover:bg-primary-600 hover:text-white transition-colors duration-300"
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