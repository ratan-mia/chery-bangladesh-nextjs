'use client'

import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="relative w-full min-h-screen bg-black">
      {/* Background overlay for texture */}
      <div className="absolute inset-0 opacity-5" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      ></div>
      
      <div className="flex flex-col md:flex-row h-full">
        {/* Left side - Image with overlay */}
        <div className="relative w-full md:w-1/2 h-[500px] md:h-screen">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10"></div>
          
          <Image
            src="/images/services/workshop.webp"
            alt="Chery Bangladesh Showroom"
            fill
            className="object-cover"
            priority
          />
          
          {/* Small decorative element */}
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary-600 z-20"></div>
        </div>
        
        {/* Right side - Content */}
        <div className="w-full md:w-1/2 bg-gradient-to-b from-gray-900 to-black border-l border-gray-800 flex items-center justify-center p-8 md:p-16 lg:p-24">
          <motion.div 
            className="w-full max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Small accent line */}
            <div className="w-16 h-1 bg-primary-600 mb-8"></div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Welcome to <span className="text-primary-600">Chery</span> Bangladesh
            </h1>
            
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Experience innovation at its finest with our range of premium vehicles designed to exceed your expectations. Discover automotive excellence crafted for the modern driver.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-primary-600 bg-opacity-20 flex items-center justify-center mr-3 flex-shrink-0">
                  <Check size={18} className="text-primary-600" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Premium Quality</h3>
                  <p className="text-gray-400 text-sm">Award-winning design and craftsmanship</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-primary-600 bg-opacity-20 flex items-center justify-center mr-3 flex-shrink-0">
                  <ShieldCheck size={18} className="text-primary-600" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">5-Year Warranty</h3>
                  <p className="text-gray-400 text-sm">Comprehensive coverage and support</p>
                </div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/schedule-visit" 
                className="group bg-primary-600 text-white px-8 py-4 font-medium hover:bg-primary-700 transition-colors duration-300 flex items-center justify-center"
              >
                Schedule Visit
                <Calendar className="ml-2 w-5 h-5 group-hover:ml-3 transition-all duration-300" />
              </Link>
              
              <Link 
                href="/contact" 
                className="group bg-transparent border border-gray-700 text-white px-8 py-4 font-medium hover:border-primary-600 hover:text-primary-600 transition-colors duration-300 flex items-center justify-center"
              >
                Find Us
                <MapPin className="ml-2 w-5 h-5 group-hover:ml-3 transition-all duration-300" />
              </Link>
            </div>
            
            {/* Optional social proof */}
            <motion.div 
              className="mt-12 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.7 }}
            >
              <div className="w-full h-px bg-gradient-to-r from-primary-600 to-transparent mr-4"></div>
              <p className="text-gray-400 text-sm whitespace-nowrap">Trusted by thousands of customers</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

// Import icons
const Check = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const ShieldCheck = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <polyline points="9 12 11 14 15 10"></polyline>
  </svg>
);