import { motion } from 'framer-motion';
import { Award, ChevronRight, CornerRightDown, Cpu, Shield, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Container animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

// Item animation variants
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 14
    }
  }
};

// Header animation variants
const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    } 
  }
};

// Line animation variant
const lineVariants = {
  hidden: { width: 0 },
  visible: { 
    width: '100%',
    transition: { 
      duration: 0.8,
      ease: "easeInOut"
    }
  }
};

const CheryFeaturesGrid = () => {
  // State management
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  
  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Set initial width
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Parallax effect for background elements
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      
      if (isVisible) {
        setIsInView(true);
        const scrollPosition = window.scrollY;
        const parallaxElements = sectionRef.current.querySelectorAll('.parallax-bg');
        
        parallaxElements.forEach(element => {
          const speed = element.dataset.speed || 0.15;
          const yPos = -(scrollPosition * speed);
          element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Feature data - updated with correct brand colors
  const features = [
    { 
      title: 'Superior Performance', 
      desc: 'Experience thrilling power with our 1.6T turbocharged engine delivering 195 BHP and 290Nm of torque, paired with a responsive 7-speed dual-clutch transmission for seamless acceleration.',
      icon: Zap,
      accent: '#8c735d' // Updated to Primary-700
    },
    { 
      title: 'Advanced Safety', 
      desc: 'Drive with confidence thanks to our comprehensive 7-airbag system, ADAS features including Automatic Emergency Braking, Blind Spot Detection, and 360° HD panoramic camera system.',
      icon: Shield,
      accent: '#8c735d' // Updated to Primary-700
    },
    { 
      title: 'Smart Technology', 
      desc: 'Enjoy seamless connectivity with our 10.25-inch touchscreen featuring Apple CarPlay™ and Android Auto™, voice-activated controls, and Sony™ premium sound system for an immersive experience.',
      icon: Cpu,
      accent: '#8c735d' // Updated to Primary-700
    },
    { 
      title: 'Premium Comfort', 
      desc: 'Indulge in luxury with hand-stitched leather upholstery, panoramic sunroof, dual-zone climate control, and ambient lighting that creates a sophisticated atmosphere for every journey.',
      icon: Award,
      accent: '#8c735d' // Updated to Primary-700
    }
  ];
  
  // Determine if mobile view
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  return (
    <section 
      ref={sectionRef} 
      className="py-16 md:py-24 lg:py-28 relative overflow-hidden"
      style={{ backgroundColor: '#f8f5f1' }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 mix-blend-overlay">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid-pattern" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#524336" strokeWidth="0.5" opacity="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-48 md:w-80 h-48 md:h-80 bg-primary-light opacity-20 filter blur-3xl -translate-x-20 md:-translate-x-40 -translate-y-20 md:-translate-y-40 parallax-bg" data-speed="0.05"></div>
        <div className="absolute top-1/4 right-0 w-64 md:w-96 h-64 md:h-96 bg-primary-900 opacity-10 filter blur-3xl translate-x-1/3 md:translate-x-1/2 parallax-bg" data-speed="0.1"></div>
        <div className="absolute bottom-0 left-1/3 w-48 md:w-64 h-48 md:h-64 bg-gray-800 opacity-15 filter blur-2xl translate-y-1/3 md:translate-y-1/2 parallax-bg" data-speed="0.15"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.p
            className="text-primary-700 font-medium text-xs sm:text-sm md:text-base uppercase tracking-wider mb-2 md:mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Extraordinary Engineering
          </motion.p>
          
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            First Class <span className="text-primary-900">Features</span>
          </motion.h2>
          
          {/* Accent bar with enhanced animation */}
          <motion.div 
            className="w-16 sm:w-20 md:w-24 h-1 bg-primary-700 mx-auto mb-4 md:mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: isMobile ? 64 : isTablet ? 80 : 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          />
          
          <motion.p 
            className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Discover what makes our vehicles stand out with these premium features
            designed to elevate your driving experience to unexpected heights.
          </motion.p>
        </div>
        
        {/* Features grid with responsive layout */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div 
                  className="border border-gray-200 shadow-sm overflow-hidden rounded-sm group-hover:border-primary-700 hover:shadow-lg transition-all duration-500 h-full backdrop-blur-sm bg-white/95"
                  style={{ 
                    transform: hoveredFeature === index ? 'translateY(-8px)' : 'none',
                    transition: 'transform 0.5s ease-out, border-color 0.3s ease, box-shadow 0.5s ease'
                  }}
                >
                  {/* Top accent */}
                  <div 
                    className="h-1 w-full transition-all duration-300" 
                    style={{ 
                      backgroundColor: feature.accent,
                      opacity: hoveredFeature === index ? 1 : 0.4,
                      width: hoveredFeature === index ? '100%' : '50%',
                      marginLeft: hoveredFeature === index ? '0' : '25%',
                    }} 
                  />
                  
                  <div className="p-4 sm:p-6 md:p-8 relative">
                    {/* Background decorative element */}
                    <div 
                      className="absolute bottom-0 right-0 w-32 md:w-40 h-32 md:h-40 transition-opacity duration-500"
                      style={{ 
                        background: `radial-gradient(circle, ${feature.accent}10 0%, transparent 70%)`,
                        opacity: hoveredFeature === index ? 0.8 : 0,
                        transform: hoveredFeature === index ? 'scale(1.2)' : 'scale(1)',
                      }}
                    />
                    
                    {/* Icon container with responsive sizing */}
                    <div 
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-4 sm:mb-5 md:mb-6 relative z-10 transition-all duration-300 rounded-sm"
                      style={{ 
                        backgroundColor: hoveredFeature === index ? `${feature.accent}20` : '#c4b19c20', // Primary-light with opacity
                        transform: hoveredFeature === index ? 'scale(1.05)' : 'scale(1)',
                      }}
                    >
                      <IconComponent 
                        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-colors duration-300" 
                        style={{ color: hoveredFeature === index ? feature.accent : '#524336' }} // Primary-900 for non-hovered
                      />
                    </div>
                    
                    {/* Responsive typography */}
                    <h3 
                      className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 md:mb-4 relative z-10 transition-colors duration-300"
                      style={{ color: hoveredFeature === index ? '#524336' : '#111827' }} // Primary-900 on hover, Gray-900 default
                    >
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm sm:text-base leading-normal mb-4 sm:mb-6 md:mb-8 relative z-10">
                      {feature.desc}
                    </p>
                    
                    {/* Learn more link */}
                    <div 
                      className="flex items-center font-medium text-xs sm:text-sm relative z-10 transition-all duration-300"
                      style={{ 
                        color: feature.accent,
                        transform: hoveredFeature === index ? 'translateX(4px)' : 'translateX(0)',
                        opacity: hoveredFeature === index ? 1 : 0.7
                      }}
                    >
                      <span>Learn more</span>
                      <ChevronRight 
                        size={isMobile ? 14 : 16} 
                        className="ml-1 sm:ml-2 transition-all duration-300"
                        style={{ 
                          transform: hoveredFeature === index ? 'translateX(4px)' : 'translateX(0)'
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className="h-0.5 w-full bg-gray-200 mt-auto overflow-hidden">
                    <div 
                      className="h-full transition-all duration-700 ease-out"
                      style={{ 
                        backgroundColor: feature.accent,
                        width: hoveredFeature === index ? '100%' : '0%'
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
        
        {/* Responsive CTA button */}
        <motion.div 
          className="mt-10 sm:mt-12 md:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <a 
            href="#explore-features"
            className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 bg-primary-700 text-white text-sm sm:text-base font-medium hover:bg-primary-900 transition-all duration-300 group rounded-sm"
          >
            Explore All Features
            <ChevronRight 
              size={isMobile ? 16 : 20} 
              className="ml-2 group-hover:ml-3 transition-all duration-300"
            />
          </a>
        </motion.div>
        
        {/* Specs highlight section */}
        <div className="mt-20 md:mt-32">
          <motion.div 
            className="bg-white p-6 md:p-8 lg:p-12 shadow-md rounded-sm border border-gray-100"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <motion.h3 
                  className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-gray-900"
                  variants={headerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Technical <span className="text-primary-900">Excellence</span>
                </motion.h3>
                
                <motion.div 
                  className="h-1 w-16 md:w-20 bg-primary-700 mb-6"
                  variants={lineVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                />
                
                <p className="text-gray-600 mb-6">
                  Our vehicles combine power, efficiency, and cutting-edge technology to deliver an extraordinary driving experience that exceeds expectations.
                </p>
                
                <ul className="space-y-3">
                  {[
                    '1.6T Turbocharged Engine with 195 BHP',
                    '290Nm of Torque for Responsive Acceleration',
                    '7-Speed Dual Clutch Transmission',
                    'Selectable Drive Modes for Every Condition',
                    '207mm Ground Clearance for Versatile Handling'
                  ].map((item, idx) => (
                    <motion.li 
                      key={idx}
                      className="flex items-start text-gray-700"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * idx, duration: 0.5 }}
                    >
                      <CornerRightDown size={18} className="text-primary-700 mt-1 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div>
                <motion.h3 
                  className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-gray-900"
                  variants={headerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Premium <span className="text-primary-900">Comfort</span>
                </motion.h3>
                
                <motion.div 
                  className="h-1 w-16 md:w-20 bg-primary-700 mb-6"
                  variants={lineVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                />
                
                <p className="text-gray-600 mb-6">
                  Immerse yourself in luxury with our carefully crafted interior that combines sophisticated design with thoughtful convenience features.
                </p>
                
                <ul className="space-y-3">
                  {[
                    'Hand-stitched Premium Leather Upholstery',
                    'Panoramic Sunroof with Voice Control',
                    '10.25-inch HD Touchscreen Infotainment System',
                    'Sony™ Premium Sound System',
                    'Multi-color Ambient Lighting with Music Rhythm'
                  ].map((item, idx) => (
                    <motion.li 
                      key={idx}
                      className="flex items-start text-gray-700"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * idx, duration: 0.5 }}
                    >
                      <CornerRightDown size={18} className="text-primary-700 mt-1 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
               {/* Bottom CTA section */}
        <motion.div
          className="bg-primary-900 text-white p-8 lg:p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative z-10 text-center lg:text-left lg:flex lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Ready to Experience Excellence?
              </h3>
              <p className="text-primary-light text-lg">
                Schedule a test drive and discover what sets Chery apart
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 lg:flex-shrink-0">
              <a 
                href="#test-drive"
                className="group inline-flex items-center px-8 py-4 bg-white text-primary-900 font-medium hover:bg-primary-light transition-colors duration-300"
              >
                Schedule Test Drive
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a 
                href="#brochure"
                className="inline-flex items-center justify-center border border-white px-8 py-4 text-white font-medium hover:bg-white hover:text-primary-900 transition-colors duration-300"
              >
                Download Brochure
              </a>
            </div>
          </div>
          
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <pattern id="cta-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="currentColor" />
              </pattern>
              <rect width="100" height="100" fill="url(#cta-pattern)" />
            </svg>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-700 opacity-30"></div>
    </section>
  );
};

export default CheryFeaturesGrid;