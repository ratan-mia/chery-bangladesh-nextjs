'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const SafetyFeatureShowcase = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  
  // Intersection observer to trigger animations when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animation variants following the design system
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Text animation variants
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const textItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-[#e9e7e2] overflow-hidden"
    >
      <div className="w-full max-w-[1920px] mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full"
        >
          {/* First row - Chassis Structure */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2"
          >
            {/* Image Container */}
            <div className="relative h-64 sm:h-80 md:h-[28rem] lg:h-[32rem] w-full overflow-hidden">
              <motion.div
                initial={{ scale: 1.1 }}
                animate={isInView ? { scale: 1 } : { scale: 1.1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full w-full"
              >
                <Image
                  src="/images/tiggo9pro/safety/chassis-structure.jpg"
                  alt="Colored chassis structure showing different types of steel"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  quality={90}
                />
              </motion.div>
            </div>
            
            {/* Content Container */}
            <motion.div 
              variants={textContainerVariants}
              className="bg-[#918678] p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center h-auto md:h-[28rem] lg:h-[32rem]"
            >
              <motion.h3 
                variants={textItemVariants}
                className="text-2xl sm:text-3xl md:text-4xl text-white font-normal mb-6 md:mb-8"
              >
                Global five-star security standard
              </motion.h3>
              <ul className="space-y-3 md:space-y-4 text-white">
                {[
                  "85% high-strength steel",
                  "21% hot-formed steel",
                  "140mm height of front anti-collision beam with 85% coverage"
                ].map((text, index) => (
                  <motion.li 
                    key={`chassis-${index}`}
                    variants={textItemVariants}
                    className="text-lg sm:text-xl md:text-2xl font-light flex items-start"
                  >
                    <motion.span 
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                      className="inline-block w-2 h-2 bg-white rounded-full mt-3 mr-3 flex-shrink-0"
                    />
                    {text}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Second row - Airbags */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2"
          >
            {/* Content Container */}
            <motion.div 
              variants={textContainerVariants}
              className="bg-[#918678] p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-1 h-auto md:h-[28rem] lg:h-[32rem]"
            >
              <motion.h3 
                variants={textItemVariants}
                className="text-2xl sm:text-3xl md:text-4xl text-white font-normal mb-6 md:mb-8"
              >
                10 safety airbags
              </motion.h3>
              <ul className="space-y-3 md:space-y-4 text-white">
                {[
                  "With far-end airbags",
                  "2060mm traverse side air curtains",
                  "Newest IPB drive-by-wire of Bosch"
                ].map((text, index) => (
                  <motion.li 
                    key={`airbag-${index}`}
                    variants={textItemVariants}
                    className="text-lg sm:text-xl md:text-2xl font-light flex items-start"
                  >
                    <motion.span 
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                      className="inline-block w-2 h-2 bg-white rounded-full mt-3 mr-3 flex-shrink-0"
                    />
                    {text}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Image Container */}
            <div className="relative h-64 sm:h-80 md:h-[28rem] lg:h-[32rem] w-full order-1 md:order-2 overflow-hidden">
              <motion.div
                initial={{ scale: 1.1 }}
                animate={isInView ? { scale: 1 } : { scale: 1.1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full w-full"
              >
                <Image
                  src="/images/tiggo9pro/safety/airbag-system.jpg"
                  alt="Car with deployed airbags showing safety system"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  quality={90}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SafetyFeatureShowcase;