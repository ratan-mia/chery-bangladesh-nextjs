'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const InteriorShowcase = () => {
  const [activeImage, setActiveImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Features data with updated descriptions
  const features = [
    {
      id: "main",
      title: "INSTRUMENT CLUSTER WITH SUEDETTE",
      description: "Premium materials blend comfort with modern technology",
      imageSrc: "/images/tiggo9pro/interior-main.jpg",
      alt: "Chery interior cabin with suedette instrument cluster"
    },
    {
      id: "knob",
      title: "EMBOSSED KNOB WITH DIAMOND-SHAPED ARGYLE",
      description: "Precision craftsmanship with elegant details",
      imageSrc: "/images/tiggo9pro/knob.jpg",
      alt: "Embossed knob with diamond-shaped argyle"
    },
    {
      id: "panels",
      title: "PANELS WITH WOOD GRAIN",
      description: "Natural textures for a sophisticated ambiance",
      imageSrc: "/images/tiggo9pro/panels.jpg",
      alt: "Panels with wood grain"
    }
  ];

  // Container variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Item variants for children animations
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  // Enhanced image animation variants
  const imageVariants = {
    hover: { scale: 1.03, transition: { duration: 0.5, ease: "easeOut" } },
    initial: { scale: 1, transition: { duration: 0.3, ease: "easeInOut" } }
  };
  
  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
  };

  // On image click handler - for better mobile experience
  const handleImageClick = (id) => {
    if (isMobile) {
      setActiveImage(activeImage === id ? null : id);
    }
  };

  return (
    <section className="w-full bg-stone-100 overflow-hidden">
      <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 md:px-8 pt-12 pb-16 md:pt-16 md:pb-20">
        {/* Header section with updated styling */}
        <motion.div 
          className="mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-primary-700 font-medium uppercase mb-2 tracking-wider">
            LUXURIOUS DESIGN
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-900 leading-tight tracking-tighter">
            EXTRA-WIDE<br />SURROUNDING CABIN
          </h2>
          {/* Section divider line as per design system */}
          <div className="w-24 h-1 bg-primary-700 mt-6 mb-8"></div>
          <p className="text-gray-600 text-lg max-w-3xl">
            Every detail of our interior showcases premium craftsmanship and attention to detail, 
            creating a sophisticated driving environment.
          </p>
        </motion.div>

        {/* Main content container with staggered animations */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-3"
        >
          {/* Main image section */}
          <motion.div 
            className="relative mb-3 overflow-hidden group"
            variants={itemVariants}
            onHoverStart={() => setActiveImage("main")}
            onHoverEnd={() => setActiveImage(null)}
            onClick={() => handleImageClick("main")}
          >
            <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[75vh]">
              <motion.div
                className="w-full h-full"
                variants={imageVariants}
                animate={activeImage === "main" ? "hover" : "initial"}
              >
                <Image
                  src={features[0].imageSrc}
                  alt={features[0].alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                  quality={95}
                />
              </motion.div>
              
              {/* Feature label overlay with updated styling */}
              <div className="absolute bottom-0 left-0 bg-black/60 backdrop-blur-sm text-white py-3 px-4 md:px-5 w-full md:w-auto">
                <motion.div
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  key={activeImage === "main" ? "main-active" : "main-inactive"}
                >
                  <h3 className="text-base sm:text-lg md:text-xl font-bold tracking-wide mb-1">
                    {features[0].title}
                  </h3>
                  {activeImage === "main" && (
                    <p className="text-white/80 text-sm md:text-base">
                      {features[0].description}
                    </p>
                  )}
                </motion.div>
              </div>
              
              {/* Gradient overlay for better image depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none"></div>
            </div>
          </motion.div>

          {/* Two column grid for the bottom features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Left feature */}
            <motion.div 
              className="relative overflow-hidden group"
              variants={itemVariants}
              onHoverStart={() => setActiveImage("knob")}
              onHoverEnd={() => setActiveImage(null)}
              onClick={() => handleImageClick("knob")}
            >
              <div className="relative w-full h-64 md:h-72 lg:h-80">
                <motion.div
                  className="w-full h-full"
                  variants={imageVariants}
                  animate={activeImage === "knob" ? "hover" : "initial"}
                >
                  <Image
                    src={features[1].imageSrc}
                    alt={features[1].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    quality={95}
                  />
                </motion.div>
                
                {/* Feature label overlay with updated styling */}
                <div className="absolute bottom-0 left-0 bg-black/60 backdrop-blur-sm text-white py-3 px-4 md:px-5 w-full md:w-auto">
                  <motion.div
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    key={activeImage === "knob" ? "knob-active" : "knob-inactive"}
                  >
                    <h3 className="text-base sm:text-lg font-bold tracking-wide mb-1">
                      {features[1].title}
                    </h3>
                    {activeImage === "knob" && (
                      <p className="text-white/80 text-sm">
                        {features[1].description}
                      </p>
                    )}
                  </motion.div>
                </div>
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none"></div>
              </div>
            </motion.div>
            
            {/* Right feature */}
            <motion.div 
              className="relative overflow-hidden group"
              variants={itemVariants}
              onHoverStart={() => setActiveImage("panels")}
              onHoverEnd={() => setActiveImage(null)}
              onClick={() => handleImageClick("panels")}
            >
              <div className="relative w-full h-64 md:h-72 lg:h-80">
                <motion.div
                  className="w-full h-full"
                  variants={imageVariants}
                  animate={activeImage === "panels" ? "hover" : "initial"}
                >
                  <Image
                    src={features[2].imageSrc}
                    alt={features[2].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    quality={95}
                  />
                </motion.div>
                
                {/* Feature label overlay with updated styling */}
                <div className="absolute bottom-0 left-0 bg-black/60 backdrop-blur-sm text-white py-3 px-4 md:px-5 w-full md:w-auto">
                  <motion.div
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    key={activeImage === "panels" ? "panels-active" : "panels-inactive"}
                  >
                    <h3 className="text-base sm:text-lg font-bold tracking-wide mb-1">
                      {features[2].title}
                    </h3>
                    {activeImage === "panels" && (
                      <p className="text-white/80 text-sm">
                        {features[2].description}
                      </p>
                    )}
                  </motion.div>
                </div>
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* View all button */}
        <div className="mt-8 md:mt-12 text-center">
          <a
            href="#view-more-features"
            className="group inline-flex items-center text-sm font-medium text-primary-700 tracking-wider uppercase hover:text-primary-900 transition-colors duration-300"
          >
            VIEW ALL FEATURES
            <ArrowRight
              size={16}
              className="ml-2 group-hover:ml-3 transition-all duration-300"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default InteriorShowcase;