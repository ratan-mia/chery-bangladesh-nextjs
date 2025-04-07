import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

const LearnMoreSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-brown-50/60 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-brown-100/30"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-primary/5"></div>
      
      <div className="container mx-auto px-4 max-w-screen-xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={headerVariants} className="mb-12">
            <div className="w-16 h-1 bg-primary mb-4"></div>
            <h2 className="text-brown-900 text-3xl font-bold">
              LEARN MORE
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Us Card */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="bg-white border border-brown-200 px-8 py-10 flex flex-col h-full rounded-sm shadow-sm hover:shadow-md transition-all"
            >
              <h3 className="text-brown-900 text-2xl font-bold mb-5">
                CONTACT US
              </h3>
              <p className="text-brown-700 mb-10 flex-grow text-base leading-relaxed">
                If you require support or have questions about Chery International services, here's how you can reach us.
              </p>
              <Link 
                href="/contact"
                className="group bg-primary hover:bg-primary-dark text-white py-3.5 text-center font-medium inline-block transition-colors w-full rounded-sm"
              >
                <motion.span 
                  className="inline-flex items-center justify-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  ENTRANCE
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </motion.span>
              </Link>
            </motion.div>
            
            {/* About Chery Card */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="bg-white border border-brown-200 px-8 py-10 flex flex-col h-full rounded-sm shadow-sm hover:shadow-md transition-all"
            >
              <h3 className="text-brown-900 text-2xl font-bold mb-5">
                ABOUT CHERY
              </h3>
              <p className="text-brown-700 mb-10 flex-grow text-base leading-relaxed">
                Committed to being a diversified enterprise with global influence and competitiveness
              </p>
              <Link 
                href="/about"
                className="group bg-primary hover:bg-primary-dark text-white py-3.5 text-center font-medium inline-block transition-colors w-full rounded-sm"
              >
                <motion.span 
                  className="inline-flex items-center justify-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  EXPLORE
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Additional Interactive Elements */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <Link
            href="/services"
            className="text-primary hover:text-primary-dark font-medium transition-colors inline-flex items-center group"
          >
            <span>Discover more about our services</span>
            <motion.span
              initial={{ x: 0 }}
              animate={{ x: [0, 5, 0] }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "loop", 
                duration: 1.5,
                repeatDelay: 2 
              }}
              className="ml-2"
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LearnMoreSection;