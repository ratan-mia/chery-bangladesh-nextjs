'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, Phone, ShieldCheck, Wrench } from 'lucide-react';
import Link from 'next/link';

const ServiceCTA = () => {
  return (
    <section id="cta" className="py-20 relative bg-gray-50">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('/texture-dots.svg')] opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <motion.div 
          className="w-full bg-white border border-gray-200 border-t-4 border-t-primary-700 p-8 md:p-10 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-8 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Experience Premium <span className="text-primary-900">Service</span> for Your Chery
            </h2>
            <div className="w-24 h-1 bg-primary-700 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 leading-relaxed">
              Book your service appointment today and enjoy the peace of mind that
              comes with expert care from factory-trained technicians.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto">
            <Link
              href="#book-service"
              className="flex items-center justify-center bg-primary-700 text-white px-8 py-3 font-medium hover:bg-transparent hover:text-primary-700 border-2 border-primary-700 transition-colors duration-300 shadow-sm"
            >
              <Calendar className="mr-2" size={20} />
              SCHEDULE SERVICE
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center border-2 border-gray-300 text-gray-700 px-8 py-3 font-medium hover:border-primary-700 hover:text-primary-700 transition-colors duration-300"
            >
              <Phone className="mr-2" size={20} />
              CONTACT US
            </Link>
          </div>
          
          <motion.div 
            className="mt-8 pt-8 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, staggerChildren: 0.1 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-primary-700 mb-2">
                <Clock size={28} className="mx-auto" />
              </div>
              <p className="text-gray-900 font-medium">Quick Service</p>
              <p className="text-gray-600 text-sm">Maintenance in under 90 minutes</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-primary-700 mb-2">
                <ShieldCheck size={28} className="mx-auto" />
              </div>
              <p className="text-gray-900 font-medium">Genuine Parts</p>
              <p className="text-gray-600 text-sm">100% authentic Chery components</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-primary-700 mb-2">
                <Wrench size={28} className="mx-auto" />
              </div>
              <p className="text-gray-900 font-medium">Expert Technicians</p>
              <p className="text-gray-600 text-sm">Factory-certified professionals</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCTA;