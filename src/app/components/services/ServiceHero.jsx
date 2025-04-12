'use client'

import { motion } from 'framer-motion';
import { ArrowRight, Clock, ShieldCheck, Wrench } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ServiceHero = () => {
  return (
    <section className="relative">
      {/* Background image with gradient overlay */}
      <div className="w-full h-[70vh] md:h-[80vh] lg:h-[90vh] relative">
        <Image
          src="/images/service-center.jpg"
          alt="Chery Bangladesh Service Center"
          fill
          className="object-cover"
          priority
        />
        
        {/* Custom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-primary-900/40 to-gray-900/90"></div>

        {/* Texture overlay */}
        <div className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        
        {/* Main content container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4">
          
            {/* Two-column layout for content */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start">
              {/* Left column - Main heading and CTA */}
              <motion.div 
                className="lg:w-1/2 text-left mb-12 lg:mb-0"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Accent line */}
                <div className="w-24 h-1 bg-primary-600 mb-8 hidden lg:block"></div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Expert Service for Your <span className="text-primary-600">Chery</span>
                </h1>
                
                <p className="text-xl text-gray-300 mt-6 mb-8 max-w-xl">
                  Factory-trained technicians and genuine parts to keep your vehicle performing at its best
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="#book-service" 
                    className="group bg-primary-600 text-white px-8 py-4 font-medium hover:bg-primary-700 transition-colors duration-300 flex items-center"
                  >
                    Book A Service
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:ml-3 transition-all duration-300" />
                  </Link>
                  <Link 
                    href="#service-packages" 
                    className="border border-white/30 text-white px-8 py-4 font-medium hover:bg-white/10 transition-colors duration-300"
                  >
                    View Packages
                  </Link>
                </div>
              </motion.div>
              
              {/* Right column - Feature highlights */}
              <motion.div 
                className="lg:w-1/2 lg:pl-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="bg-black/30 backdrop-blur-sm p-8 border-l-4 border-primary-600 max-w-lg ml-auto">
                  <h2 className="text-2xl font-semibold text-white mb-6">Premium Service Benefits</h2>
                  
                  <div className="space-y-6">
                    {/* Feature 1 */}
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-primary-600/20 flex items-center justify-center mr-4 flex-shrink-0">
                        <Wrench className="text-primary-600" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">Factory-Certified Technicians</h3>
                        <p className="text-gray-400 mt-1">Trained directly by Chery International experts</p>
                      </div>
                    </div>
                    
                    {/* Feature 2 */}
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-primary-600/20 flex items-center justify-center mr-4 flex-shrink-0">
                        <ShieldCheck className="text-primary-600" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">Genuine Parts Guarantee</h3>
                        <p className="text-gray-400 mt-1">100% authentic Chery components</p>
                      </div>
                    </div>
                    
                    {/* Feature 3 */}
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-primary-600/20 flex items-center justify-center mr-4 flex-shrink-0">
                        <Clock className="text-primary-600" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">Express Service Available</h3>
                        <p className="text-gray-400 mt-1">Maintenance completed in 90 minutes or less</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Bottom decorative elements */}
        <div className="absolute bottom-0 left-0 w-full">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4 border-t border-white/10">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary-600 mr-2"></div>
                <span className="text-white/70 text-sm">Authorized Service Center</span>
              </div>
              
              <div className="text-white/70 text-sm">
                Open Mon-Sat: 8AM - 8PM
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;