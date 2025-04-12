'use client'

import { motion } from 'framer-motion';
import { AlertTriangle, Clock, Phone } from 'lucide-react';

const AssistanceCTA = () => {
  return (
    <section className="relative py-16 md:py-24" 
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
      }}>
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      ></div>
      
      <motion.div 
        className="relative z-10 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Top accent line */}
        <div className="absolute top-0 inset-x-0 h-0.5 bg-primary-600 opacity-40"></div>
        
        <div className="w-full flex justify-center items-center">
          <motion.div
            className="w-full max-w-screen-2xl mx-4 md:mx-8 lg:mx-16 py-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col lg:flex-row gap-6 items-stretch">
              {/* Left side - Alert Icon and Heading */}
              <div className="lg:w-1/3 bg-black bg-opacity-60 border border-gray-800 p-8 flex flex-col justify-center items-center text-center lg:items-start lg:text-left">
                <div className="w-20 h-20 bg-primary-600 bg-opacity-20 flex items-center justify-center mb-6">
                  <AlertTriangle size={40} className="text-primary-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Need Immediate Assistance?
                </h2>
                <p className="text-gray-400 mb-6">
                  Our emergency response team is ready to help 24/7
                </p>
                
                <div className="flex items-center mt-auto">
                  <div className="w-10 h-10 bg-black bg-opacity-50 flex items-center justify-center mr-4">
                    <Clock size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <div className="text-white font-medium">24/7 Support</div>
                    <div className="text-gray-400 text-sm">Always available</div>
                  </div>
                </div>
              </div>
              
              {/* Right side - Call options */}
              <div className="lg:w-2/3 bg-black bg-opacity-30 border border-gray-800 p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                  {/* Phone Display */}
                  <div className="w-full md:w-auto text-center">
                    <div className="text-gray-400 text-sm mb-2">Emergency Hotline</div>
                    <a 
                      href="tel:+8801XXX000000" 
                      className="text-2xl md:text-3xl text-white font-bold hover:text-primary-600 transition-colors duration-300 flex items-center justify-center"
                    >
                      <Phone size={24} className="text-primary-600 mr-3" />
                      01XX-XXXXXX
                    </a>
                  </div>
                  
                  <div className="hidden md:block h-16 w-px bg-gray-800"></div>
                  
                  {/* Call Button */}
                  <div className="w-full md:w-auto flex-1">
                    <a 
                      href="tel:+8801XXX000000" 
                      className="w-full bg-primary-600 text-white px-8 py-4 font-medium hover:bg-primary-700 transition-colors duration-300 flex items-center justify-center"
                    >
                      <span className="mr-2">Call Now</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                {/* Service Types */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center bg-black bg-opacity-40 p-4 border border-gray-800">
                    <div className="w-8 h-8 bg-primary-600 bg-opacity-20 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600">
                        <circle cx="9" cy="19" r="2"></circle>
                        <circle cx="18" cy="19" r="2"></circle>
                        <path d="M22 8h-2l-1.5 5h-13"></path>
                        <path d="M6 12l-3-4"></path>
                        <path d="M2 8h3v4"></path>
                      </svg>
                    </div>
                    <span className="text-gray-300">Roadside Assistance</span>
                  </div>
                  <div className="flex items-center bg-black bg-opacity-40 p-4 border border-gray-800">
                    <div className="w-8 h-8 bg-primary-600 bg-opacity-20 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600">
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                      </svg>
                    </div>
                    <span className="text-gray-300">Emergency Repairs</span>
                  </div>
                  <div className="flex items-center bg-black bg-opacity-40 p-4 border border-gray-800">
                    <div className="w-8 h-8 bg-primary-600 bg-opacity-20 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600">
                        <rect x="1" y="3" width="15" height="13"></rect>
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                        <circle cx="5.5" cy="18.5" r="2.5"></circle>
                        <circle cx="18.5" cy="18.5" r="2.5"></circle>
                      </svg>
                    </div>
                    <span className="text-gray-300">Towing Service</span>
                  </div>
                </div>
                
                <div className="text-center text-sm text-gray-400">
                  Our certified technicians are trained to handle all emergency situations for your Chery vehicle.
                  Call us immediately for fast, reliable assistance anywhere in Bangladesh.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom accent line */}
        <div className="absolute bottom-0 inset-x-0 h-0.5 bg-primary-600 opacity-40"></div>
      </motion.div>
    </section>
  );
};

export default AssistanceCTA;