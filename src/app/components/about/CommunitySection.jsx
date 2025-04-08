'use client'

import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CommunitySection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const textRef = useRef(null);
  const sectionRef = useRef(null);
  const swiperRef = useRef(null);
  const [textHeight, setTextHeight] = useState(null);

  const communityData = [
    {
      image: "/images/about/community/1.jpg",
      title: "Environmental Initiatives",
      description: "Supporting sustainable development with tree planting events and clean energy projects.",
    },
    {
      image: "/images/about/community/2.jpg",
      title: "Educational Programs",
      description: "Promoting automotive education and skill development in local communities.",
    },
    {
      image: "/images/about/community/3.jpg",
      title: "Social Welfare",
      description: "Providing aid and resources to underserved communities around the globe.",
    },
  ];

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

  const handleSlideChange = (swiper) => {
    setActiveSlide(swiper.realIndex);
  };

  // Handle manual navigation
  const goToSlide = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideToLoop(index);
    }
  };

  // Handle text height for responsive layout
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (textRef.current) {
        setTextHeight(textRef.current.offsetHeight);
      }
    });

    if (textRef.current) {
      resizeObserver.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        resizeObserver.unobserve(textRef.current);
      }
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-white">
      <div className="flex flex-col lg:flex-row">
        {/* Text Column - Enhanced with animations and better structure */}
        <motion.div
          ref={textRef}
          className="lg:w-1/2 w-full px-6 sm:px-10 lg:px-16 py-16 lg:py-24 bg-primary order-2 lg:order-1 flex flex-col justify-center relative overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Background graphic element */}
          <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none"></div>
          <div className="absolute -left-8 -top-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none"></div>
          
          {/* Content with improved structure */}
          <div className="relative z-10">
            <motion.div variants={itemVariants} className="w-12 h-1 bg-white mb-6"></motion.div>
            
            <motion.h2 
              variants={itemVariants}
              className="text-3xl lg:text-4xl font-bold text-white leading-snug mb-6"
            >
              We consistently fulfill the mission and take on the responsibility
              of Chery towards community.
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-base lg:text-lg text-white/90 leading-relaxed mb-8"
            >
              Chery has been expanding globally for over 20 years, with operations
              in over 60 countries and regions worldwide. Practicing social
              responsibility is an essential part of Chery's global strategy. We
              actively contribute to public welfare in green development,
              environmental protection, social welfare, and talent development.
            </motion.p>
            
            {/* Key stats - new addition */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6 mt-6">
              <div className="border-l-2 border-white/30 pl-4">
                <div className="text-3xl font-bold text-white">60+</div>
                <div className="text-white/70 text-sm uppercase tracking-wider">Countries & Regions</div>
              </div>
              <div className="border-l-2 border-white/30 pl-4">
                <div className="text-3xl font-bold text-white">20+</div>
                <div className="text-white/70 text-sm uppercase tracking-wider">Years of Impact</div>
              </div>
            </motion.div>
            
            {/* Slide navigation - new addition */}
            <motion.div variants={itemVariants} className="mt-12 flex items-center">
              <span className="text-white/70 text-sm mr-4">OUR INITIATIVES</span>
              <div className="flex items-center gap-3">
                {communityData.map((_, index) => (
                  <button
                    key={index}
                    className={`h-8 w-8 flex items-center justify-center border ${
                      activeSlide === index 
                        ? 'border-white text-white' 
                        : 'border-white/30 text-white/50 hover:border-white/50 hover:text-white/70'
                    } transition-colors`}
                    onClick={() => goToSlide(index)}
                    aria-label={`View slide ${index + 1}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Image Column - Enhanced with better swiper implementation */}
        <motion.div
          className="lg:w-1/2 w-full order-1 lg:order-2 relative"
          style={{ height: textHeight ? `${textHeight}px` : "auto" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Swiper
            ref={swiperRef}
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            onSlideChange={handleSlideChange}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="h-full"
          >
            {communityData.map((item, index) => (
              <SwiperSlide key={index} className="relative">
                {/* Image with overlay */}
                <div className="relative w-full h-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                
                {/* Slide caption */}
                <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 z-10">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/80 text-sm sm:text-base max-w-md">{item.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom navigation arrows */}
          <div className="absolute top-6 right-6 flex space-x-3 z-10">
            <button
              onClick={() => swiperRef.current.swiper.slidePrev()}
              className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white transition-colors"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              onClick={() => swiperRef.current.swiper.slideNext()}
              className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white transition-colors"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>

          {/* Enhanced pagination indicator */}
          <div className="absolute bottom-35 left-6 sm:left-8 flex items-center gap-2 z-10">
            {communityData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1 transition-all duration-300 ${
                  activeSlide === index ? "w-8 bg-white" : "w-4 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;