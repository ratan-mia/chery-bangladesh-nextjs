// ESGGovernance.jsx
import { motion } from 'framer-motion';
import React from 'react';

const ESGGovernance = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 w-full">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#6d5c40] mb-8">
            ENHANCING ESG GOVERNANCE
          </h2>
          
          <p className="text-lg md:text-xl text-[#6d5c40] max-w-4xl mx-auto leading-relaxed">
            We have established a sustainable governance framework, integrating ESG into our development strategy
          </p>
          
          <p className="text-lg md:text-xl text-[#6d5c40] max-w-4xl mx-auto leading-relaxed">
            Through a matrix-based ESG management system, we drive transformation, strategy updates, and 
            management restructuring from the top down.
          </p>
        </motion.div>
        
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="h-px bg-[#6d5c40]/20 w-full"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default ESGGovernance;