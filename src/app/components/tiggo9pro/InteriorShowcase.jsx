'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/**
 * InteriorShowcase Component - Tailwind CSS Implementation
 * Following Chery Bangladesh Design System Guidelines
 */
const InteriorShowcase = () => {
  // State management
  const [activeImage, setActiveImage] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const sectionRef = useRef(null);
  
  // Features data
  const interiorFeatures = [
    {
      id: "main",
      title: "INSTRUMENT CLUSTER WITH SUEDETTE",
      description: "Premium suedette materials combine luxurious comfort with cutting-edge technology for an elevated driving experience",
      imageSrc: "/images/tiggo9pro/interior-main.jpg",
      alt: "Chery interior cabin with suedette instrument cluster"
    },
    {
      id: "knob",
      title: "EMBOSSED KNOB WITH DIAMOND-SHAPED ARGYLE",
      description: "Meticulously crafted control surfaces with elegant diamond patterning that reflects superior attention to detail",
      imageSrc: "/images/tiggo9pro/knob.jpg",
      alt: "Embossed knob with diamond-shaped argyle"
    },
    {
      id: "panels",
      title: "PANELS WITH WOOD GRAIN",
      description: "Natural wood grain textures create a warm, sophisticated cabin atmosphere that balances luxury with comfort",
      imageSrc: "/images/tiggo9pro/panels.jpg",
      alt: "Panels with wood grain"
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
              LUXURIOUS DESIGN
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
            EXTRA-WIDE<br className="hidden md:block" /> SURROUNDING CABIN
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
            Every detail of our interior showcases premium craftsmanship and attention to detail, 
            creating a sophisticated driving environment designed for your comfort.
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
        </motion.div>

        {/* CTA button */}
        {/* <motion.div 
          className="mt-12 sm:mt-16 lg:mt-20 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a
            href="#view-more-features"
            className="group inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 
              border border-[#8c735d] text-[#8c735d] font-medium hover:bg-[#8c735d] 
              hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
          >
            VIEW ALL FEATURES
            <ArrowRight
              size={16}
              className="ml-2 group-hover:ml-3 transition-all duration-300"
            />
          </a>
        </motion.div> */}
        
        {/* Bottom divider */}
        {/* <div className="mt-16 sm:mt-20 h-px w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-[#c4b19c]/30 to-transparent"></div> */}
      </div>
    </section>
  );
};

export default InteriorShowcase;