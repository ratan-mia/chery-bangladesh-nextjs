'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/**
 * InteriorShowcase Component - Following Chery Bangladesh Design System Guidelines
 * Elegant minimalism with purposeful motion and content focus
 */
const InteriorShowcase = () => {
  // State management
  const [activeImage, setActiveImage] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const sectionRef = useRef(null);
  
  // Updated Tiggo 9 Pro interior features data - aligned with design system
  const interiorFeatures = [
    {
      id: "main",
      title: "15.6\" 2.5K HD SCREEN & INTELLIGENT CABIN",
      description: "Super wide body surround intelligent cabin with 15.6\" 2.5K HD screen featuring 90% screen-to-body ratio, 3D mesh suede dash and multi-function center console",
      imageSrc: "/images/tiggo9pro/interior-main.jpg",
      alt: "Chery Tiggo 9 Pro intelligent cabin with 15.6 inch 2.5K HD screen",
      specs: ["90% Screen-to-Body Ratio", "Qualcomm 8155 Chip+", "3D Mesh Suede Dash"]
    },
    {
      id: "knob",
      title: "W-HUD VIRTUAL REALITY HEADS UP DISPLAY",
      description: "Advanced W-HUD Virtual Reality Heads Up Display system with Qualcomm 8155 chip+ for enhanced driving experience and seamless connectivity",
      imageSrc: "/images/tiggo9pro/knob.jpg",
      alt: "W-HUD Virtual Reality Heads Up Display system",
      specs: ["Intelligent Voice Assistant (IVA)", "WiFi Hotspot", "Online Navigation"]
    },
    {
      id: "panels",
      title: "ONE CLICK ZERO GRAVITY SEATS & AUDIO SYSTEM",
      description: "Premium leather seats with one-click zero gravity function, 3D seat stitching, fine punch detailing, and integrated headrest audio system with 14 loudspeakers",
      imageSrc: "/images/tiggo9pro/panels.jpg",
      alt: "Zero gravity seats with headrest audio system",
      specs: ["Full Leather Coverage", "Memory & Massage", "Heating & Ventilation"]
    }
  ];

  // Premium features following design system structure
  const premiumFeatures = [
    {
      category: "Advanced Technology",
      items: [
        "Lion LionSmartCloud system",
        "Wireless/wired CarPlay + Android Auto",
        "FOTA updates capability",
        "Mobile APP remote control"
      ]
    },
    {
      category: "Comfort & Luxury",
      items: [
        "TOM wood grain decorative panel",
        "Dual-zone automatic climate control",
        "Panoramic sunroof with motorized sunshade",
        "Multi-color ambient lighting"
      ]
    },
    {
      category: "Audio & Entertainment",
      items: [
        "14 loudspeakers premium audio",
        "Wireless charging for cell phones",
        "Multiple USB ports (Type-A + Type-C)",
        "Intelligent voice assistant"
      ]
    }
  ];

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };
    
    handleResize();
    
    let resizeTimer;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 100);
    };
    
    window.addEventListener('resize', debouncedResize);
    
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimer);
    };
  }, []);
  
  // Intersection observer following design system guidelines
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

  // Handle image interactions
  const handleImageClick = (id) => {
    if (isMobile || isTablet) {
      setActiveImage(activeImage === id ? null : id);
    }
  };

  // Animation variants following design system patterns
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const dividerVariants = {
    hidden: { width: 0 },
    visible: { 
      width: '100%', 
      transition: { 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-gray-100 overflow-hidden py-12 md:py-16 lg:py-24"
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-20 2xl:px-24">
        {/* Section Header - Following design system typography */}
        <motion.div 
          className="mb-12 md:mb-16 lg:mb-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Decorative accent line */}
          <motion.div 
            className="w-0 h-0.5 bg-primary-light mb-6 hidden md:block"
            initial={{ width: 0 }}
            animate={isInView ? { width: 48 } : { width: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
          />
          
          {/* Subtitle with proper color usage */}
          <motion.p 
            className="text-sm md:text-base font-medium tracking-wider text-primary-700 mb-4 uppercase relative inline-block"
            variants={fadeInVariants}
          >
            <span className="relative">
              INTELLIGENT CABIN
              <motion.span 
                className="absolute -bottom-1 left-0 right-0 h-px bg-primary-light w-0"
                variants={dividerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              />
            </span>
          </motion.p>
          
          {/* Main heading - Design system typography */}
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-4 md:mb-6"
            variants={fadeInVariants}
          >
            SUPER WIDE BODY<br className="hidden md:block" /> 
            <span className="text-primary-900">SURROUND INTELLIGENT CABIN</span>
          </motion.h2>
          
          {/* Accent divider following design system */}
          <motion.div 
            className="h-1 w-0 bg-primary-700 mb-6 md:mb-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: isMobile ? 80 : isTablet ? 120 : 140 } : { width: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          />
          
          {/* Description text with proper typography */}
          <motion.p
            className="text-gray-600 text-base md:text-lg max-w-3xl leading-normal"
            variants={fadeInVariants}
          >
            Super wide body, super comfortable, super quiet, super healthy. Experience the future of automotive luxury 
            with advanced technology, premium materials, and intelligent design crafted for your comfort.
          </motion.p>
        </motion.div>

        {/* Main image gallery content */}
        <motion.div
          className="space-y-8 md:space-y-10 lg:space-y-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Main feature image */}
          <motion.div 
            className="relative overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 group"
            variants={fadeInVariants}
            onHoverStart={() => !isMobile && !isTablet && setActiveImage("main")}
            onHoverEnd={() => !isMobile && !isTablet && setActiveImage(null)}
            onClick={() => handleImageClick("main")}
          >
            <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[75vh]">
              <motion.div
                className="w-full h-full"
                animate={activeImage === "main" ? 
                  { scale: 1.05, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }} : 
                  { scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                }
              >
                <Image
                  src={interiorFeatures[0].imageSrc}
                  alt={interiorFeatures[0].alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
                  className="object-cover"
                  priority
                  quality={95}
                />
              </motion.div>
              
              {/* Feature label overlay with design system colors */}
              <div 
                className={`absolute bottom-0 left-0 bg-white/90 backdrop-blur-sm text-gray-900 py-4 md:py-6 px-6 md:px-8 
                border-l-2 border-primary-700 transition-all duration-300 ease-in-out shadow-sm
                ${activeImage === "main" || isMobile ? 'w-full md:w-3/4 lg:w-1/2' : 'w-auto max-w-sm'}`}
              >
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight mb-3">
                  {interiorFeatures[0].title}
                </h3>
                
                {(activeImage === "main" || isMobile) && (
                  <div>
                    <motion.div 
                      className="w-0 h-0.5 bg-primary-700 mb-4"
                      initial={{ width: 0 }}
                      animate={{ width: 48 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                    <p className="text-gray-600 text-sm md:text-base max-w-xl leading-normal mb-4">
                      {interiorFeatures[0].description}
                    </p>
                    
                    {/* Technical specs highlight */}
                    <div className="mb-4 text-primary-700 text-xs md:text-sm font-medium space-y-1">
                      {interiorFeatures[0].specs.map((spec, index) => (
                        <div key={index}>• {spec}</div>
                      ))}
                    </div>
                    
                    {/* CTA link - design system tertiary button */}
                    <div className="hidden md:block">
                      <a 
                        href="/contact" 
                        className="group inline-flex items-center text-sm font-medium text-primary-700 tracking-wider hover:text-primary-900 transition-colors duration-300"
                      >
                        LEARN MORE
                        <ArrowRight
                          size={16}
                          className="ml-2 group-hover:ml-3 transition-all duration-300"
                        />
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Gradient overlay - subtle */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 via-transparent to-transparent 
                pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
          </motion.div>

          {/* Secondary features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
            {interiorFeatures.slice(1).map((feature, index) => (
              <motion.div 
                key={feature.id}
                className="relative overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 group border border-gray-200 hover:border-primary-700"
                variants={fadeInVariants}
                onHoverStart={() => !isMobile && !isTablet && setActiveImage(feature.id)}
                onHoverEnd={() => !isMobile && !isTablet && setActiveImage(null)}
                onClick={() => handleImageClick(feature.id)}
              >
                <div className="relative w-full h-52 md:h-64 lg:h-80">
                  <motion.div
                    className="w-full h-full"
                    animate={activeImage === feature.id ? 
                      { scale: 1.05, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }} : 
                      { scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    }
                  >
                    <Image
                      src={feature.imageSrc}
                      alt={feature.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                      className="object-cover"
                      loading="eager"
                      quality={90}
                    />
                  </motion.div>
                  
                  {/* Feature label overlay */}
                  <div 
                    className={`absolute bottom-0 left-0 bg-white/90 backdrop-blur-sm text-gray-900 
                    py-4 md:py-5 px-5 md:px-6 border-l-2 border-primary-700 transition-all duration-300 shadow-sm
                    ${activeImage === feature.id || isMobile ? 'w-full' : 'w-auto max-w-xs'}`}
                  >
                    <h3 className="text-base md:text-lg lg:text-xl font-bold tracking-tight mb-2">
                      {feature.title}
                    </h3>
                    
                    {(activeImage === feature.id || isMobile) && (
                      <div>
                        <motion.div 
                          className="w-0 h-0.5 bg-primary-700 mb-3"
                          initial={{ width: 0 }}
                          animate={{ width: 48 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        />
                        <p className="text-gray-600 text-sm leading-normal mb-3">
                          {feature.description}
                        </p>
                        
                        {/* Additional tech specs */}
                        <div className="text-primary-700 text-xs font-medium space-y-1">
                          {feature.specs.map((spec, specIndex) => (
                            <div key={specIndex}>• {spec}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 via-transparent to-transparent 
                    pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Additional features highlight section - Design system card */}
          <motion.div
            className="bg-white border border-gray-200 shadow-sm p-6 md:p-8 lg:p-10"
            variants={fadeInVariants}
          >
            {/* Top accent */}
            <div className="h-1 w-full bg-primary-800 opacity-40 mb-6"></div>
            
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">
              Premium Interior Features
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {premiumFeatures.map((category, index) => (
                <div key={index} className="space-y-4">
                  <h4 className="font-bold text-primary-900">{category.category}</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="text-primary-700 mr-2 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              
              {/* Seating configuration as fourth column */}
              <div className="space-y-4">
                <h4 className="font-bold text-primary-900">7-Seat Configuration (2+3+2)</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary-700 mr-2 flex-shrink-0">•</span>
                    <span>Second row electric easy entry</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-700 mr-2 flex-shrink-0">•</span>
                    <span>Third row seats fold flat manually</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-700 mr-2 flex-shrink-0">•</span>
                    <span>Second row seat heating available</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-700 mr-2 flex-shrink-0">•</span>
                    <span>Premium leather upholstery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-700 mr-2 flex-shrink-0">•</span>
                    <span>Individual headrests for all seats</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-700 mr-2 flex-shrink-0">•</span>
                    <span>Flexible folding options</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom accent line that fills on hover */}
            <div className="h-0.5 w-full bg-gray-200 mt-8">
              <div className="h-full bg-primary-700 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteriorShowcase;