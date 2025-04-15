'use client'

import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Clock, MapPin, Phone, ShieldCheck, Wrench } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const ServiceHero = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  return (
    <section className="relative bg-gradient-to-b from-black via-[#0a0a0a] to-black">
      {/* Background image with gradient overlay */}
      <div className="w-full h-[80vh] md:h-[85vh] lg:h-[90vh] relative overflow-hidden">
        <Image
          src="/images/service-center.jpg"
          alt="Chery Bangladesh Service Center"
          fill
          className="object-cover object-center"
          priority
        />
        
        {/* Custom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/75 to-black/90"></div>

        {/* Background texture */}
        <div className="absolute inset-0 bg-[url('/texture-dots.svg')] opacity-5 pointer-events-none"></div>
        
        {/* Main content container */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
          
            {/* Two-column layout for content */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start pt-16">
              {/* Left column - Main heading and CTA */}
              <motion.div 
                className="lg:w-1/2 text-left mb-12 lg:mb-0"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Subtitle */}
                <div className="inline-block mb-6 py-1 px-3 border-l-4 border-primary-600 bg-black bg-opacity-50">
                  <span className="text-sm font-medium tracking-wider text-primary-600">
                    AUTHORIZED SERVICE CENTER
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Expert Service for Your <span className="text-primary-600">Chery</span>
                </h1>
                
                <div className="w-24 h-1 bg-primary-600 mb-8"></div>
                
                <p className="text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
                  Factory-trained technicians and genuine parts to keep your vehicle performing at its best
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="#book-service" 
                    className="group bg-primary-600 text-white px-8 py-3 font-medium hover:bg-transparent hover:text-primary-600 border-2 border-primary-600 transition-colors duration-300 flex items-center"
                  >
                    Book A Service
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                  <Link 
                    href="#service-packages" 
                    className="border-2 border-gray-800 text-white px-8 py-3 font-medium hover:border-primary-600 hover:text-primary-600 transition-colors duration-300"
                  >
                    View Packages
                  </Link>
                </div>
                
                {/* Contact information */}
                <div className="mt-12 flex flex-col sm:flex-row gap-6">
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black border border-gray-800">
                      <Phone size={18} className="text-primary-600" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Booking Hotline</div>
                      <a href="tel:+8801234567890" className="text-gray-400 hover:text-primary-600 transition-colors">+880 123 456 7890</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black border border-gray-800">
                      <Clock size={18} className="text-primary-600" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Working Hours</div>
                      <span className="text-gray-400">Mon-Sat: 8AM - 8PM</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Right column - Feature highlights */}
              <motion.div 
                className="lg:w-1/2 lg:pl-16"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="bg-[#0f0f0f] p-8 border border-gray-800 border-t-4 border-t-primary-600 max-w-lg ml-auto shadow-2xl">
                  <h2 className="text-2xl font-semibold text-white mb-8">Premium Service Benefits</h2>
                  
                  <motion.div className="space-y-6" variants={containerVariants}>
                    {/* Feature 1 */}
                    <motion.div className="flex items-start group" variants={itemVariants}>
                      <div className="w-12 h-12 bg-black bg-opacity-50 border border-gray-800 flex items-center justify-center mr-4 flex-shrink-0 group-hover:border-primary-600 transition-colors duration-300">
                        <Wrench className="text-primary-600" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white group-hover:text-primary-600 transition-colors duration-300">Factory-Certified Technicians</h3>
                        <p className="text-gray-400 mt-1">Trained directly by Chery International experts</p>
                      </div>
                    </motion.div>
                    
                    {/* Feature 2 */}
                    <motion.div className="flex items-start group" variants={itemVariants}>
                      <div className="w-12 h-12 bg-black bg-opacity-50 border border-gray-800 flex items-center justify-center mr-4 flex-shrink-0 group-hover:border-primary-600 transition-colors duration-300">
                        <ShieldCheck className="text-primary-600" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white group-hover:text-primary-600 transition-colors duration-300">Genuine Parts Guarantee</h3>
                        <p className="text-gray-400 mt-1">100% authentic Chery components</p>
                      </div>
                    </motion.div>
                    
                    {/* Feature 3 */}
                    <motion.div className="flex items-start group" variants={itemVariants}>
                      <div className="w-12 h-12 bg-black bg-opacity-50 border border-gray-800 flex items-center justify-center mr-4 flex-shrink-0 group-hover:border-primary-600 transition-colors duration-300">
                        <Clock className="text-primary-600" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white group-hover:text-primary-600 transition-colors duration-300">Express Service Available</h3>
                        <p className="text-gray-400 mt-1">Maintenance completed in 90 minutes or less</p>
                      </div>
                    </motion.div>
                    
                    {/* Feature 4 - Added new feature */}
                    <motion.div className="flex items-start group" variants={itemVariants}>
                      <div className="w-12 h-12 bg-black bg-opacity-50 border border-gray-800 flex items-center justify-center mr-4 flex-shrink-0 group-hover:border-primary-600 transition-colors duration-300">
                        <Wrench className="text-primary-600" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white group-hover:text-primary-600 transition-colors duration-300">Advanced Diagnostics</h3>
                        <p className="text-gray-400 mt-1">State-of-the-art equipment for precise troubleshooting</p>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Bottom decorative elements */}
        <div className="absolute bottom-0 left-0 w-full">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center py-4 border-t border-gray-800 bg-black bg-opacity-50 backdrop-blur-sm">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="mr-6 flex items-center">
                  <div className="w-2 h-2 bg-primary-600 mr-2"></div>
                  <span className="text-gray-300 text-sm">Official Chery Authorized Service</span>
                </div>
                
                <div className="hidden md:flex items-center">
                  <MapPin size={14} className="text-primary-600 mr-2" />
                  <span className="text-gray-300 text-sm">Locations Nationwide</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <a 
                  href="#scroll-down" 
                  className="text-white flex items-center hover:text-primary-600 transition-colors duration-300"
                >
                  <span className="mr-2 text-sm">Explore Our Services</span>
                  <ChevronDown size={16} className="animate-bounce" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;