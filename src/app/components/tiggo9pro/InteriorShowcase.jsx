'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/**
 * InteriorShowcase Component - Updated with Tiggo 9 Pro Interior Features
 * Following Chery Bangladesh Design System Guidelines
 */
const InteriorShowcase = () => {
  // State management
  const [activeImage, setActiveImage] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const sectionRef = useRef(null);
  
  // Updated Tiggo 9 Pro interior features data
  const interiorFeatures = [
    {
      id: "main",
      title: "15.6\" 2.5K HD SCREEN & INTELLIGENT CABIN",
      description: "Super wide body surround intelligent cabin with 15.6\" 2.5K HD screen featuring 90% screen-to-body ratio, 3D mesh suede dash and multi-function center console",
      imageSrc: "/images/tiggo9pro/interior-main.jpg",
      alt: "Chery Tiggo 9 Pro intelligent cabin with 15.6 inch 2.5K HD screen"
    },
    {
      id: "knob",
      title: "W-HUD VIRTUAL REALITY HEADS UP DISPLAY",
      description: "Advanced W-HUD Virtual Reality Heads Up Display system with Qualcomm 8155 chip+ for enhanced driving experience and seamless connectivity",
      imageSrc: "/images/tiggo9pro/knob.jpg",
      alt: "W-HUD Virtual Reality Heads Up Display system"
    },
    {
      id: "panels",
      title: "ONE CLICK ZERO GRAVITY SEATS & AUDIO SYSTEM",
      description: "Premium leather seats with one-click zero gravity function, 3D seat stitching, fine punch detailing, and integrated headrest audio system with 14 loudspeakers",
      imageSrc: "/images/tiggo9pro/panels.jpg",
      alt: "Zero gravity seats with headrest audio system"
    }
  ];

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };
    
    // Set initial values
    handleResize();
    
    // Debounced resize handler
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
  
  // Intersection observer to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 }
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

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
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

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-stone-100 overflow-hidden py-12 sm:py-16 lg:py-24"
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="mb-10 sm:mb-12 lg:mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Decorative accent line */}
          <motion.div 
            className="w-0 h-0.5 bg-[#c4b19c] mb-6 hidden md:block"
            initial={{ width: 0 }}
            animate={isInView ? { width: 48 } : { width: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
          />
          
          {/* Subtitle */}
          <motion.p 
            className="text-sm sm:text-base font-medium tracking-wider text-[#8c735d] mb-3 sm:mb-4 uppercase relative inline-block"
            variants={fadeIn}
          >
            <span className="relative">
              INTELLIGENT CABIN
              <motion.span 
                className="absolute -bottom-1 left-0 right-0 h-px bg-[#c4b19c]/50 w-0"
                initial={{ width: 0 }}
                animate={isInView ? { width: '100%' } : { width: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              />
            </span>
          </motion.p>
          
          {/* Main heading */}
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#524336] leading-tight tracking-tighter"
            variants={fadeIn}
          >
            SUPER WIDE BODY<br className="hidden md:block" /> SURROUND INTELLIGENT CABIN
          </motion.h2>
          
          {/* Accent divider */}
          <motion.div 
            className="h-1.5 w-0 bg-gradient-to-r from-[#8c735d] to-[#524336] mt-4 sm:mt-6 mb-6 sm:mb-8 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: isMobile ? 80 : isTablet ? 120 : 140 } : { width: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          />
          
          {/* Description text */}
          <motion.p
            className="text-gray-600 text-base sm:text-lg max-w-3xl leading-relaxed"
            variants={fadeIn}
          >
            Super wide body, super comfortable, super quiet, super healthy. Experience the future of automotive luxury 
            with advanced technology, premium materials, and intelligent design crafted for your comfort.
          </motion.p>
        </motion.div>

        {/* Main image gallery content */}
        <motion.div
          className="space-y-6 sm:space-y-8 lg:space-y-10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Main feature image */}
          <motion.div 
            className="relative overflow-hidden rounded-lg shadow-lg group"
            variants={fadeIn}
            onHoverStart={() => !isMobile && !isTablet && setActiveImage("main")}
            onHoverEnd={() => !isMobile && !isTablet && setActiveImage(null)}
            onClick={() => handleImageClick("main")}
          >
            <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[75vh]">
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
              
              {/* Feature label overlay with responsive widths */}
              <div 
                className={`absolute bottom-0 left-0 bg-black/80 backdrop-blur-sm text-white py-4 sm:py-5 px-5 sm:px-6 
                border-l-2 border-[#c4b19c] transition-all duration-300 ease-in-out
                ${activeImage === "main" || isMobile ? 'w-full sm:w-3/4 lg:w-1/2' : 'w-auto max-w-sm'}`}
              >
                <h3 className="text-base sm:text-lg lg:text-xl font-bold tracking-wide mb-2 sm:mb-3">
                  {interiorFeatures[0].title}
                </h3>
                
                {(activeImage === "main" || isMobile) && (
                  <div>
                    <motion.div 
                      className="w-0 h-0.5 bg-[#c4b19c] mb-3"
                      initial={{ width: 0 }}
                      animate={{ width: 48 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                    <p className="text-white/90 text-sm sm:text-base max-w-xl leading-relaxed">
                      {interiorFeatures[0].description}
                    </p>
                    
                    {/* Technical specs highlight */}
                    <div className="mt-3 text-[#c4b19c] text-xs sm:text-sm font-medium">
                      ✓ 90% Screen-to-Body Ratio ✓ Qualcomm 8155 Chip+ ✓ 3D Mesh Suede Dash
                    </div>
                    
                    {/* CTA link - hidden on mobile */}
                    <div className="mt-4 hidden md:block">
                      <a 
                        href="/contact" 
                        className="inline-flex items-center text-xs text-[#c4b19c] font-medium group"
                      >
                        LEARN MORE
                        <ArrowRight
                          size={12}
                          className="ml-1 group-hover:ml-2 transition-all duration-300"
                        />
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 
                pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
              
              {/* Corner accents - hidden on mobile */}
              <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-[#c4b19c]/30 hidden lg:block"></div>
              <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-[#c4b19c]/30 hidden lg:block"></div>
            </div>
          </motion.div>

          {/* Secondary features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {interiorFeatures.slice(1).map((feature, index) => (
              <motion.div 
                key={feature.id}
                className="relative overflow-hidden rounded-lg shadow-lg group"
                variants={fadeIn}
                onHoverStart={() => !isMobile && !isTablet && setActiveImage(feature.id)}
                onHoverEnd={() => !isMobile && !isTablet && setActiveImage(null)}
                onClick={() => handleImageClick(feature.id)}
              >
                <div className="relative w-full h-52 sm:h-64 lg:h-80">
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
                    className={`absolute bottom-0 left-0 bg-black/80 backdrop-blur-sm text-white 
                    py-4 sm:py-5 px-5 sm:px-6 border-l-2 border-[#c4b19c] transition-all duration-300
                    ${activeImage === feature.id || isMobile ? 'w-full' : 'w-auto max-w-xs'}`}
                  >
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold tracking-wide mb-2">
                      {feature.title}
                    </h3>
                    
                    {(activeImage === feature.id || isMobile) && (
                      <div>
                        <motion.div 
                          className="w-0 h-0.5 bg-[#c4b19c] mb-3"
                          initial={{ width: 0 }}
                          animate={{ width: 48 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        />
                        <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                          {feature.description}
                        </p>
                        
                        {/* Additional tech specs for each feature */}
                        {feature.id === "knob" && (
                          <div className="mt-2 text-[#c4b19c] text-xs font-medium">
                            ✓ Intelligent Voice Assistant (IVA) ✓ WiFi Hotspot ✓ Online Navigation
                          </div>
                        )}
                        {feature.id === "panels" && (
                          <div className="mt-2 text-[#c4b19c] text-xs font-medium">
                            ✓ Full Leather Coverage ✓ Memory & Massage ✓ Heating & Ventilation
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 
                    pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 border-t-8 border-r-8 border-white/10 w-8 h-8"></div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Additional features highlight section */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10"
            variants={fadeIn}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[#524336] mb-6">
              Premium Interior Features
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-[#8c735d]">Advanced Technology</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Lion LionSmartCloud system</li>
                  <li>• Wireless/wired CarPlay + Android Auto</li>
                  <li>• FOTA updates capability</li>
                  <li>• Mobile APP remote control</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-[#8c735d]">Comfort & Luxury</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• TOM wood grain decorative panel</li>
                  <li>• Dual-zone automatic climate control</li>
                  <li>• Panoramic sunroof with motorized sunshade</li>
                  <li>• Multi-color ambient lighting</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-[#8c735d]">Audio & Entertainment</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 14 loudspeakers premium audio</li>
                  <li>• Wireless charging for cell phones</li>
                  <li>• Multiple USB ports (Type-A + Type-C)</li>
                  <li>• Intelligent voice assistant</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Seating configuration highlight */}
        <motion.div
          className="mt-12 sm:mt-16 bg-gradient-to-r from-[#8c735d]/10 to-[#524336]/10 rounded-lg p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#524336] mb-4">
              7-Seat Configuration (2+3+2)
            </h3>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Spacious seating for the whole family with premium leather upholstery, 
              individual headrests, and flexible folding options for maximum versatility.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm font-medium text-[#8c735d]">
              <span>• Second row electric easy entry</span>
              <span>• Third row seats fold flat manually</span>
              <span>• Second row seat heating available</span>
            </div>
          </div>
        </motion.div>
        
        {/* Bottom divider */}
        <div className="mt-16 sm:mt-20 h-px w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-[#c4b19c]/30 to-transparent"></div>
      </div>
    </section>
  );
};

export default InteriorShowcase;