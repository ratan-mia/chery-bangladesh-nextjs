'use client'

import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const AwardsSection = ({
  sectionTitle = "OUR HONOR",
  awards = [
    {
      id: 1,
      title:
        "In the Kantar Brandz Top 50 Chinese Brand Builders 2024 report, Chery retains top in the automotive category",
      description:
        'Chery has held the position of China\'s top passenger car exporter for 21 consecutive years and has received the title of "Top 20 Best Overseas Image Enterprises" in five consecutive selections by the SASAC (State-owned Assets Supervision and Administration Commission) and the CICC (China International Communications Group). In the Kantar Brandz Top 50 Chinese Brand Builders 2024 report, Chery retains top in the automotive category.',
      bgColor: "bg-[#a39277]",
      textColor: "text-white",
      year: "2024",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "J.D. POWER",
      subtitle:
        "In 2023, CHERY RANKS FIRST IN THE INITIAL QUALITY STUDY (IQS) AMONG CHINESE DOMESTIC BRANDS.",
      description:
        "According to J.D. Power's various automotive index studies for 2023, Chery holds the top position in the IQS (Initial Quality Study) among China's domestic brands. Additionally, its vehicle series, including the TIGGO 8, TIGGO 7 and TIGGO 4 have each achieved first place in their segments.",
      bgColor: "bg-[#e9e2d8]",
      textColor: "text-neutral-800",
      year: "2023",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
  ],
  actionButton = {
    id: 3,
    text: "Explore More",
    url: "/awards",
    bgColor: "bg-[#7a6852]",
    textColor: "text-white",
  },
}) => {
  const [activeAward, setActiveAward] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  // Detect when section is in view
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

  // Handle screen size detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Auto-cycle through awards
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setActiveAward((prev) => (prev + 1) % awards.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [awards.length, isInView]);

  // Scroll to active timeline item on mobile
  useEffect(() => {
    if (isMobile && timelineRef.current && isInView) {
      const activeElement = timelineRef.current.querySelector(`[data-index="${activeAward}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeAward, isMobile, isInView]);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-16 md:py-24 bg-white overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#e9e2d8]/20 -translate-y-1/3 translate-x-1/3 rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#a39277]/10 translate-y-1/2 -translate-x-1/2 rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Section Title with decorative elements */}
        <div className="mb-12 md:mb-20 relative">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "4rem" } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-[#a39277] mb-4"
          ></motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-block text-3xl sm:text-4xl md:text-5xl font-bold text-[#6B5A44] relative"
          >
            {sectionTitle}
            <svg className="absolute -top-4 -right-8 w-6 h-6 text-[#a39277]" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-3 text-gray-500 max-w-2xl"
          >
            Recognitions that reflect our commitment to excellence in the automotive industry
          </motion.p>
        </div>
        
        {/* Timeline navigation - Desktop */}
        {!isMobile && (
          <div className="hidden md:flex justify-center mb-12">
            <div className="relative flex items-center">
              <div className="absolute h-0.5 bg-gray-200 w-full"></div>
              {awards.map((award, index) => (
                <div 
                  key={index}
                  className="relative mx-8 z-10"
                  onClick={() => setActiveAward(index)}
                >
                  <motion.div 
                    animate={{ 
                      scale: activeAward === index ? 1 : 0.8,
                      backgroundColor: activeAward === index ? '#a39277' : '#e9e2d8'
                    }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                      activeAward === index ? 'text-white' : 'text-[#6B5A44]'
                    }`}
                  >
                    <span className="font-bold">{award.year}</span>
                  </motion.div>
                  
                  <motion.div 
                    animate={{ opacity: activeAward === index ? 1 : 0.6 }}
                    className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm font-medium"
                  >
                    {index === 0 ? 'Brandz Award' : 'J.D. Power Award'}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Timeline navigation - Mobile */}
        {isMobile && (
          <div className="mb-8 overflow-x-auto scrollbar-hide">
            <div ref={timelineRef} className="flex whitespace-nowrap py-2 px-4">
              {awards.map((award, index) => (
                <motion.div 
                  key={index}
                  data-index={index}
                  animate={{ opacity: activeAward === index ? 1 : 0.6 }}
                  className={`inline-block mx-3 px-4 py-2 cursor-pointer ${
                    activeAward === index 
                      ? 'border-b-2 border-[#a39277] text-[#6B5A44] font-medium' 
                      : 'text-gray-500'
                  }`}
                  onClick={() => setActiveAward(index)}
                >
                  <div className="flex items-center">
                    <span className="font-bold mr-2">{award.year}</span>
                    <span>{index === 0 ? 'Brandz Award' : 'J.D. Power Award'}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {/* Main Awards Display */}
        <div className="relative">
          {awards.map((award, index) => (
            <motion.div
              key={award.id}
              className={`${award.bgColor} overflow-hidden`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: activeAward === index ? 1 : 0,
                y: activeAward === index ? 0 : 50,
                position: activeAward === index ? "relative" : "absolute",
                zIndex: activeAward === index ? 10 : 0,
                top: 0,
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-12 gap-0 md:gap-8">
                {/* Content Column */}
                <div className="md:col-span-8 p-6 md:p-10">
                  <div className="flex items-center mb-4">
                    <div className={`mr-4 ${award.textColor}`}>{award.icon}</div>
                    <h3 className={`text-2xl md:text-3xl font-bold ${award.textColor}`}>
                      {award.title}
                    </h3>
                  </div>
                  
                  {award.subtitle && (
                    <h4 className={`text-lg md:text-xl font-semibold ${award.textColor} mb-4 leading-tight`}>
                      {award.subtitle}
                    </h4>
                  )}
                  
                  <div className={`${award.textColor === 'text-white' ? 'text-white/90' : 'text-neutral-700'} text-base md:text-lg leading-relaxed`}>
                    <p>{award.description}</p>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mt-8 w-full bg-black/10 h-1 relative">
                    <motion.div 
                      className="absolute top-0 left-0 h-full bg-white"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ 
                        duration: 6,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    />
                  </div>
                </div>
                
                {/* Year Column */}
                <div className="hidden md:flex md:col-span-4 items-center justify-center bg-black/10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center"
                  >
                    <div className={`text-9xl font-bold opacity-80 ${award.textColor}`}>
                      {award.year}
                    </div>
                    <div className={`text-xl uppercase tracking-widest mt-4 ${award.textColor}`}>
                      {index === 0 ? 'Brandz Award' : 'J.D. Power Award'}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Action button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 md:mt-16 flex justify-center"
        >
          <a
            href={actionButton.url}
            className={`${actionButton.bgColor} ${actionButton.textColor} flex items-center px-8 py-4 no-underline hover:bg-[#6B5A44] transition-colors`}
          >
            <span className="mr-2 text-lg font-medium">{actionButton.text}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </motion.div>
        
        {/* Awards Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {awards.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveAward(index)}
              animate={{ 
                backgroundColor: activeAward === index ? '#a39277' : '#e9e2d8',
                width: activeAward === index ? '2rem' : '0.75rem'
              }}
              className="h-2 rounded-full"
              aria-label={`View award ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;