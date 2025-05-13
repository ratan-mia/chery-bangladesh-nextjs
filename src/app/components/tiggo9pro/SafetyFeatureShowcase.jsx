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
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
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
            <div className="relative h-64 sm:h-80 md:h-[28rem] lg:h-[32rem] w-full">
              <Image
                src="/images/tiggo9pro/safety/chassis-structure.jpg"
                alt="Colored chassis structure showing different types of steel"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                quality={90}
              />
            </div>
            
            {/* Content Container */}
            <div className="bg-[#918678] p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center h-auto md:h-[28rem] lg:h-[32rem]">
              <h3 className="text-2xl sm:text-3xl md:text-4xl text-white font-normal mb-6 md:mb-8">
                Global five-star security standard
              </h3>
              <ul className="space-y-3 md:space-y-4 text-white">
                <li className="text-lg sm:text-xl md:text-2xl font-light">
                  85% high-strength steel
                </li>
                <li className="text-lg sm:text-xl md:text-2xl font-light">
                  21% hot-formed steel
                </li>
                <li className="text-lg sm:text-xl md:text-2xl font-light">
                  140mm height of front anti-collision beam with 85% coverage
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Second row - Airbags */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2"
          >
            {/* Content Container */}
            <div className="bg-[#918678] p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-1 h-auto md:h-[28rem] lg:h-[32rem]">
              <h3 className="text-2xl sm:text-3xl md:text-4xl text-white font-normal mb-6 md:mb-8">
                10 safety airbags
              </h3>
              <ul className="space-y-3 md:space-y-4 text-white">
                <li className="text-lg sm:text-xl md:text-2xl font-light">
                  With far-end airbags
                </li>
                <li className="text-lg sm:text-xl md:text-2xl font-light">
                  2060mm traverse side air curtains
                </li>
                <li className="text-lg sm:text-xl md:text-2xl font-light">
                  Newest IPB drive-by-wire of Bosch
                </li>
              </ul>
            </div>
            
            {/* Image Container */}
            <div className="relative h-64 sm:h-80 md:h-[28rem] lg:h-[32rem] w-full order-1 md:order-2">
              <Image
                src="/images/tiggo9pro/safety/airbag-system.jpg"
                alt="Car with deployed airbags showing safety system"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                quality={90}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SafetyFeatureShowcase;