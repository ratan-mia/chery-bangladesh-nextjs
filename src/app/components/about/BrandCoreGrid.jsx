import { motion } from 'framer-motion';
import React, { useState } from 'react';

const BrandCoreGrid = ({
  brandData = {
    title: "BRAND CORE",
    image: "/images/about/family-car-interior.jpg"
  },
  sectionData = [
    {
      title: "GREEN",
      items: [
        "Low Carbon Materials",
        "Eco-friendly Processes",
        "Third-generation PHEV"
      ],
      bgColor: "bg-neutral-200",
      hoverBgColor: "bg-neutral-100",
      textColor: "text-neutral-700",
      gradient: "linear-gradient(135deg, rgba(40,180,120,0.05) 0%, rgba(40,150,80,0.1) 100%)"
    },
    {
      title: "TECHNOLOGY",
      items: [
        "Global R&D",
        "Development Platform",
        "Intelligent Driving",
        "Intelligent Cockpit"
      ],
      bgColor: "bg-neutral-800",
      hoverBgColor: "bg-neutral-900",
      textColor: "text-white/80",
      gradient: "linear-gradient(135deg, rgba(50,50,180,0.05) 0%, rgba(90,90,200,0.1) 100%)"
    },
    {
      title: "FAMILY",
      items: [
        "Safe and Reliable",
        "Comfortable and Durable",
        "Individual and Inclusive"
      ],
      bgColor: "bg-neutral-700",
      hoverBgColor: "bg-neutral-800",
      textColor: "text-white/80",
      gradient: "linear-gradient(135deg, rgba(180,100,50,0.05) 0%, rgba(150,80,40,0.1) 100%)"
    },
    {
      title: "COMPANIONSHIP",
      items: [
        "Customer,Emotional Connection",
        "Employee, Growing Together in Unity",
        "Partner, Ecological Win-Win",
        "Society, Honored in Public Welfare"
      ],
      bgColor: "bg-neutral-600",
      hoverBgColor: "bg-neutral-700",
      textColor: "text-white/80",
      gradient: "linear-gradient(135deg, rgba(100,50,150,0.05) 0%, rgba(80,40,120,0.1) 100%)"
    }
  ]
}) => {
  // State to track hovered section
  const [hoveredSection, setHoveredSection] = useState(null);

  // Animations
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4
      }
    })
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  return (
    <div className="w-full relative overflow-hidden">
      <div className="w-full max-w-[2000px] mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Left side - Brand Core Image */}
          <motion.div 
            className="w-full lg:w-[40%] relative overflow-hidden group cursor-pointer"
            style={{ minHeight: "600px", height: "auto" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredSection('brand')}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <motion.div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-700"
              style={{ 
                backgroundImage: `url(${brandData.image})`,
                filter: hoveredSection === 'brand' ? "brightness(0.95)" : "brightness(0.85)",
                transform: hoveredSection === 'brand' ? "scale(1.05)" : "scale(1)"
              }}
            />
            
            {/* Simple overlay without texture */}
            <div className="absolute inset-0 bg-black/10" />
            
            <div className="relative z-10 p-8 md:p-12 lg:p-16 h-full flex flex-col justify-start">
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {brandData.title}
              </motion.h2>
              
              <motion.div
                className="mt-8 h-1 bg-primary transition-all duration-700"
                initial={{ width: 0 }}
                animate={{ width: hoveredSection === 'brand' ? 160 : 0 }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Right side - Grid of 4 items */}
          <div className="w-full lg:w-[60%]">
            <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
              {/* Top row */}
              <motion.div 
                className={`${hoveredSection === 0 ? sectionData[0].hoverBgColor : sectionData[0].bgColor} p-8 flex flex-col justify-between transition-colors duration-300 cursor-pointer relative overflow-hidden`}
                style={{ minHeight: { xs: "250px", lg: "300px" } }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                onMouseEnter={() => setHoveredSection(0)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {/* Custom gradient background that appears on hover */}
                <motion.div 
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredSection === 0 ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ background: sectionData[0].gradient }}
                />
                
                {/* SVG pattern overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="dots-0" patternUnits="userSpaceOnUse" width="10" height="10">
                        <circle cx="5" cy="5" r="0.5" fill="#333" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dots-0)" />
                  </svg>
                </div>
                
                {/* Heading with sliding underline */}
                <div className="relative">
                  <motion.h3 
                    className="text-2xl md:text-3xl font-bold text-neutral-800 text-right"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {sectionData[0].title}
                  </motion.h3>
                  <motion.div
                    className="absolute right-0 h-0.5 bg-primary transition-all duration-300"
                    initial={{ width: 0 }}
                    animate={{ width: hoveredSection === 0 ? 100 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ bottom: '-4px' }}
                  />
                </div>
                
                {/* Content items */}
                <ul className="space-y-3 mt-auto relative z-10">
                  {sectionData[0].items.map((item, i) => (
                    <motion.li 
                      key={i} 
                      className={sectionData[0].textColor}
                      custom={i}
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
                
                {/* Decorative corner SVG */}
                <motion.svg 
                  width="50" 
                  height="50" 
                  viewBox="0 0 50 50" 
                  className="absolute bottom-0 right-0 opacity-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredSection === 0 ? 0.2 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <path d="M0 50 L50 50 L50 0 Z" fill="#333" />
                </motion.svg>
              </motion.div>
              
              <motion.div 
                className={`${hoveredSection === 1 ? sectionData[1].hoverBgColor : sectionData[1].bgColor} p-8 flex flex-col justify-between transition-colors duration-300 cursor-pointer relative overflow-hidden col-span-1 sm:col-span-1`}
                style={{ minHeight: { xs: "250px", lg: "300px" } }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                onMouseEnter={() => setHoveredSection(1)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {/* Custom gradient background that appears on hover */}
                <motion.div 
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredSection === 1 ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ background: sectionData[1].gradient }}
                />
                
                {/* SVG pattern overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="dots-1" patternUnits="userSpaceOnUse" width="10" height="10">
                        <circle cx="5" cy="5" r="0.5" fill="#fff" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dots-1)" />
                  </svg>
                </div>
                
                {/* Heading with sliding underline */}
                <div className="relative">
                  <motion.h3 
                    className="text-2xl md:text-3xl font-bold text-white text-right"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {sectionData[1].title}
                  </motion.h3>
                  <motion.div
                    className="absolute right-0 h-0.5 bg-primary transition-all duration-300"
                    initial={{ width: 0 }}
                    animate={{ width: hoveredSection === 1 ? 100 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ bottom: '-4px' }}
                  />
                </div>
                
                {/* Content items */}
                <ul className="space-y-3 mt-auto relative z-10">
                  {sectionData[1].items.map((item, i) => (
                    <motion.li 
                      key={i} 
                      className={sectionData[1].textColor}
                      custom={i}
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
                
                {/* Decorative corner SVG */}
                <motion.svg 
                  width="50" 
                  height="50" 
                  viewBox="0 0 50 50" 
                  className="absolute bottom-0 right-0 opacity-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredSection === 1 ? 0.2 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <path d="M0 50 L50 50 L50 0 Z" fill="#fff" />
                </motion.svg>
              </motion.div>

              {/* Bottom row */}
              <motion.div 
                className={`${hoveredSection === 2 ? sectionData[2].hoverBgColor : sectionData[2].bgColor} p-8 flex flex-col justify-between transition-colors duration-300 cursor-pointer relative overflow-hidden`}
                style={{ minHeight: { xs: "250px", lg: "300px" } }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                onMouseEnter={() => setHoveredSection(2)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {/* Custom gradient background that appears on hover */}
                <motion.div 
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredSection === 2 ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ background: sectionData[2].gradient }}
                />
                
                {/* SVG pattern overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="dots-2" patternUnits="userSpaceOnUse" width="10" height="10">
                        <circle cx="5" cy="5" r="0.5" fill="#fff" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dots-2)" />
                  </svg>
                </div>
                
                {/* Heading with sliding underline */}
                <div className="relative">
                  <motion.h3 
                    className="text-2xl md:text-3xl font-bold text-white text-right"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {sectionData[2].title}
                  </motion.h3>
                  <motion.div
                    className="absolute right-0 h-0.5 bg-primary transition-all duration-300"
                    initial={{ width: 0 }}
                    animate={{ width: hoveredSection === 2 ? 100 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ bottom: '-4px' }}
                  />
                </div>
                
                {/* Content items */}
                <ul className="space-y-3 mt-auto relative z-10">
                  {sectionData[2].items.map((item, i) => (
                    <motion.li 
                      key={i} 
                      className={sectionData[2].textColor}
                      custom={i}
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
                
                {/* Decorative corner SVG */}
                <motion.svg 
                  width="50" 
                  height="50" 
                  viewBox="0 0 50 50" 
                  className="absolute bottom-0 right-0 opacity-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredSection === 2 ? 0.2 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <path d="M0 50 L50 50 L50 0 Z" fill="#fff" />
                </motion.svg>
              </motion.div>
              
              <motion.div 
                className={`${hoveredSection === 3 ? sectionData[3].hoverBgColor : sectionData[3].bgColor} p-8 flex flex-col justify-between transition-colors duration-300 cursor-pointer relative overflow-hidden col-span-1 sm:col-span-1`}
                style={{ minHeight: { xs: "250px", lg: "300px" } }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                onMouseEnter={() => setHoveredSection(3)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {/* Custom gradient background that appears on hover */}
                <motion.div 
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredSection === 3 ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ background: sectionData[3].gradient }}
                />
                
                {/* SVG pattern overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="dots-3" patternUnits="userSpaceOnUse" width="10" height="10">
                        <circle cx="5" cy="5" r="0.5" fill="#fff" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dots-3)" />
                  </svg>
                </div>
                
                {/* Heading with sliding underline */}
                <div className="relative">
                  <motion.h3 
                    className="text-2xl md:text-3xl font-bold text-white text-right"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {sectionData[3].title}
                  </motion.h3>
                  <motion.div
                    className="absolute right-0 h-0.5 bg-primary transition-all duration-300"
                    initial={{ width: 0 }}
                    animate={{ width: hoveredSection === 3 ? 100 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ bottom: '-4px' }}
                  />
                </div>
                
                {/* Content items */}
                <ul className="space-y-3 mt-auto relative z-10">
                  {sectionData[3].items.map((item, i) => (
                    <motion.li 
                      key={i} 
                      className={sectionData[3].textColor}
                      custom={i}
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
                
                {/* Decorative corner SVG */}
                <motion.svg 
                  width="50" 
                  height="50" 
                  viewBox="0 0 50 50" 
                  className="absolute bottom-0 right-0 opacity-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredSection === 3 ? 0.2 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <path d="M0 50 L50 50 L50 0 Z" fill="#fff" />
                </motion.svg>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandCoreGrid;