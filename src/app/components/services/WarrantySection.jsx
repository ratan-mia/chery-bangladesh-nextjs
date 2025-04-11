'use client'

import { motion } from 'framer-motion';
import { Calendar, CheckCircle, ChevronRight, Clock, Shield } from 'lucide-react';
import { useState } from 'react';

const WarrantyServicingSection = () => {
  const [activeTab, setActiveTab] = useState('warranty');
  
  // Servicing intervals data
  const servicingIntervals = [
    {
      title: "12 Months / 10,000 km",
      services: [
        { id: 1, description: "First service: 2,000 km or 4 months (Oil Filter & Engine Oil)" },
        { id: 2, description: "Second service: 6,000 km or 8 months (Oil, Air Filter & Engine Oil)" },
        { id: 3, description: "Third service: 10,000 km or 12 months (Oil, Air, AC Filter & Engine Oil)" }
      ]
    },
    {
      title: "24 Months / 22,000 km",
      services: [
        { id: 4, description: "Fourth service: 14,000 km or 16 months (Oil, Air Filter & Engine Oil)" },
        { id: 5, description: "Fifth service: 18,000 km or 20 months (Oil, Air Filter & Engine Oil)" },
        { id: 6, description: "Sixth service: 22,000 km or 24 months (Oil, Air, AC Filter & Engine Oil)" }
      ]
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
            Warranty Period
          </h2>
          
          <div className="w-24 h-0.5 bg-primary-600 mx-auto mb-8"></div>
        </motion.div>
        
        {/* Tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex border border-gray-800" style={{ background: 'rgba(0,0,0,0.4)' }}>
            <button
              onClick={() => setActiveTab('warranty')}
              className={`flex items-center px-8 py-3 text-sm font-medium transition-all duration-300 ${
                activeTab === 'warranty'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Shield size={18} className="mr-2" />
              Warranty
            </button>
            <button
              onClick={() => setActiveTab('servicing')}
              className={`flex items-center px-8 py-3 text-sm font-medium transition-all duration-300 ${
                activeTab === 'servicing'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Shield size={18} className="mr-2" />
              Servicing Intervals
            </button>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Warranty Content */}
          {activeTab === 'warranty' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="border border-gray-800" style={{ background: 'rgba(0,0,0,0.6)' }}>
                <div className="p-8 lg:p-12 relative">
                  {/* Main warranty statement */}
                  <div className="mb-12 border-l-2 border-primary-600 pl-6">
                    <p className="text-lg text-gray-200 leading-relaxed">
                      Any components, except the items specified hear after, of your new <span className="text-primary-400 font-medium">Omoda</span> and <span className="text-primary-400 font-medium">Jaccoo</span> vehicle is 
                      covered for <span className="font-bold text-white">60 months</span> from the date of original retail delivery or date of first use, 
                      or <span className="font-bold text-white">100,000km</span>, whichever comes first.
                    </p>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24 mb-12">
                    <div className="flex items-center border border-gray-800 p-5" style={{ background: 'rgba(0,0,0,0.4)' }}>
                      <Clock size={36} className="text-primary-500 mr-4" />
                      <div>
                        <div className="text-sm text-gray-400">Coverage Period</div>
                        <div className="text-2xl font-bold text-white">60 Months</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center border border-gray-800 p-5" style={{ background: 'rgba(0,0,0,0.4)' }}>
                      <Calendar size={36} className="text-primary-500 mr-4" />
                      <div>
                        <div className="text-sm text-gray-400">Mileage Limit</div>
                        <div className="text-2xl font-bold text-white">100,000 km</div>
                      </div>
                    </div>
                  </div>
                  
                  <motion.div 
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    <div className="border border-gray-800 p-8" style={{ background: 'rgba(0,0,0,0.4)' }}>
                      <h3 className="flex items-center text-lg font-bold text-white mb-6 border-b border-gray-800 pb-4">
                        <div className="w-8 h-8 bg-primary-600 flex items-center justify-center mr-3">
                          <CheckCircle size={18} className="text-white" />
                        </div>
                        What's Covered
                      </h3>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <div className="w-5 h-5 bg-gray-800 flex items-center justify-center mr-3 mt-0.5">
                            <ChevronRight size={12} className="text-primary-400" />
                          </div>
                          <span className="text-gray-300">Engine and transmission components</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 bg-gray-800 flex items-center justify-center mr-3 mt-0.5">
                            <ChevronRight size={12} className="text-primary-400" />
                          </div>
                          <span className="text-gray-300">Electrical and electronic systems</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 bg-gray-800 flex items-center justify-center mr-3 mt-0.5">
                            <ChevronRight size={12} className="text-primary-400" />
                          </div>
                          <span className="text-gray-300">Steering and suspension</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 bg-gray-800 flex items-center justify-center mr-3 mt-0.5">
                            <ChevronRight size={12} className="text-primary-400" />
                          </div>
                          <span className="text-gray-300">Braking system components</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border border-gray-800 p-8" style={{ background: 'rgba(0,0,0,0.4)' }}>
                      <h3 className="flex items-center text-lg font-bold text-white mb-6 border-b border-gray-800 pb-4">
                        <div className="w-8 h-8 bg-primary-600 flex items-center justify-center mr-3">
                          <Shield size={18} className="text-white" />
                        </div>
                        Warranty Benefits
                      </h3>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <div className="w-5 h-5 bg-gray-800 flex items-center justify-center mr-3 mt-0.5">
                            <ChevronRight size={12} className="text-primary-400" />
                          </div>
                          <span className="text-gray-300">Repairs at authorized service centers</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 bg-gray-800 flex items-center justify-center mr-3 mt-0.5">
                            <ChevronRight size={12} className="text-primary-400" />
                          </div>
                          <span className="text-gray-300">Genuine OEM parts for all replacements</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 bg-gray-800 flex items-center justify-center mr-3 mt-0.5">
                            <ChevronRight size={12} className="text-primary-400" />
                          </div>
                          <span className="text-gray-300">Transferable to subsequent owners</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 bg-gray-800 flex items-center justify-center mr-3 mt-0.5">
                            <ChevronRight size={12} className="text-primary-400" />
                          </div>
                          <span className="text-gray-300">24/7 roadside assistance</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Servicing Intervals Content */}
          {activeTab === 'servicing' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {servicingIntervals.map((interval, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                  >
                    <div className="border border-gray-800 h-full" style={{ background: 'rgba(0,0,0,0.6)' }}>
                      {/* Header */}
                      <div className="border-b border-gray-800 py-6 px-6">
                        <h3 className="text-xl font-bold text-white mb-2">Servicing Intervals</h3>
                        <div className="h-0.5 w-16 bg-primary-600 mb-3"></div>
                        <p className="text-2xl font-bold text-primary-500">
                          {interval.title}
                        </p>
                      </div>
                      
                      {/* Service List */}
                      <div className="p-8">
                        <ul className="space-y-6">
                          {interval.services.map((service) => (
                            <li key={service.id}>
                              <div className="flex items-start">
                                <div className="flex-shrink-0 h-7 w-7 bg-gray-800 text-primary-500 flex items-center justify-center text-sm font-medium mr-4 mt-0.5">
                                  {service.id}
                                </div>
                                <div>
                                  <p className="text-gray-200">{service.description}</p>
                                  <div className="h-px w-full bg-gray-800 mt-4"></div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div variants={itemVariants} className="border border-gray-800 p-6 text-center" style={{ background: 'rgba(0,0,0,0.4)' }}>
                <p className="text-gray-300 text-sm">
                  Regular servicing at the specified intervals is required to maintain your warranty validity. 
                  Our factory-trained technicians use only genuine parts and specialized diagnostic equipment for all services.
                </p>
              </motion.div>
            </motion.div>
          )}
          
          {/* CTA Section */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            viewport={{ once: true }}
          >
            <a 
              href="#schedule-service" 
              className="inline-flex items-center px-10 py-4 bg-primary-600 text-white font-medium hover:bg-primary-700 transition-all duration-300"
            >
              Schedule Your Service
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WarrantyServicingSection;