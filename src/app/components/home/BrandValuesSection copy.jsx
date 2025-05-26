import { motion } from 'framer-motion';
import { ArrowRight, Award, ChevronRight, Cpu, Shield, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Container animation variants following design system
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

// Item animation variants following design system
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const CheryFeaturesGrid = () => {
  // State management
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const sectionRef = useRef(null);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Parallax effect for enhanced visual depth
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

      if (isVisible) {
        const scrollPosition = window.scrollY;
        const parallaxElements = sectionRef.current.querySelectorAll('.parallax-element');

        parallaxElements.forEach(element => {
          const speed = element.dataset.speed || 0.5;
          const yPos = -(scrollPosition * speed);
          element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Feature data based on actual Chery brochure specifications
  const features = [
    {
      title: 'Advanced Performance',
      desc: 'Experience exceptional power with our turbocharged engines delivering up to 195 BHP and 290Nm of torque, paired with intelligent transmission systems and multiple driving modes for every terrain.',
      icon: Zap,
    },
    {
      title: 'Comprehensive Safety',
      desc: 'Drive with confidence featuring up to 10 airbags, 85% high-strength steel body construction, ADAS technologies including AEB, BSD, 360° HD panoramic cameras, and intelligent driver assistance.',
      icon: Shield,
    },
    {
      title: 'Smart Connectivity',
      desc: 'Stay connected with dual curved screens up to 15.6" 2.5K resolution, wireless Apple CarPlay™ & Android Auto™, intelligent voice assistant, and premium audio systems with up to 14 speakers.',
      icon: Cpu,
    },
    {
      title: 'Luxury Comfort',
      desc: 'Enjoy first-class comfort with premium leather seating, panoramic sunroof, dual-zone climate control, ambient lighting, and spacious 7-seat configurations designed for ultimate relaxation.',
      icon: Award,
    }
  ];

  // Background texture SVG
  const backgroundTexture = `
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="0.03"/>
        </pattern>
        <pattern id="hexPattern" width="28" height="24" patternUnits="userSpaceOnUse">
          <polygon points="14,2 22,7 22,17 14,22 6,17 6,7" fill="none" stroke="#8c735d" stroke-width="0.3" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grain)"/>
      <rect width="100%" height="100%" fill="url(#hexPattern)"/>
    </svg>
  `;

  // Background image with automotive theme
  const backgroundImage = `
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#e5e7eb;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#f9fafb;stop-opacity:1" />
        </linearGradient>
        <radialGradient id="accent-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#8c735d;stop-opacity:0.05" />
          <stop offset="100%" style="stop-color:#524336;stop-opacity:0.02" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-gradient)"/>
      <circle cx="300" cy="200" r="150" fill="url(#accent-gradient)"/>
      <circle cx="1600" cy="800" r="200" fill="url(#accent-gradient)"/>
      <path d="M0,300 Q480,250 960,300 T1920,280 V0 H0 Z" fill="#8c735d" opacity="0.02"/>
      <path d="M0,1080 Q640,1030 1280,1060 T1920,1040 V1080 H0 Z" fill="#524336" opacity="0.03"/>
    </svg>
  `;

  return (
    <section
      ref={sectionRef}
      className="py-8 md:py-12 lg:py-20 relative overflow-hidden"
      style={{
        backgroundImage: `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(backgroundImage)}"), url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(backgroundTexture)}")`,
        backgroundSize: 'cover, 100px 100px',
        backgroundPosition: 'center center, 0 0',
        backgroundRepeat: 'no-repeat, repeat'
      }}
    >
      {/* Enhanced Background Elements with Parallax */}
      <div className="absolute inset-0 z-0">
        {/* Floating geometric shapes */}
        <div className="parallax-element absolute top-20 left-10 w-24 md:w-32 lg:w-40 h-24 md:h-32 lg:h-40 bg-primary-light rounded-full opacity-10 filter blur-xl" data-speed="0.1"></div>
        <div className="parallax-element absolute top-1/3 right-16 w-32 md:w-48 lg:w-56 h-32 md:h-48 lg:h-56 bg-primary-700 rounded-full opacity-5 filter blur-2xl" data-speed="0.15"></div>
        <div className="parallax-element absolute bottom-32 left-1/4 w-20 md:w-28 lg:w-36 h-20 md:h-28 lg:h-36 bg-primary-900 rounded-full opacity-8 filter blur-xl" data-speed="0.2"></div>
        
        {/* Automotive-inspired lines */}
        <div className="parallax-element absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-primary-700 to-transparent opacity-10" data-speed="0.05"></div>
        <div className="parallax-element absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-primary-900 to-transparent opacity-15" data-speed="0.08"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header following design system */}
        <div className="text-center mb-12 md:mb-16">
          <motion.p
            className="text-primary-700 font-medium text-xs sm:text-sm uppercase tracking-wider mb-2 md:mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            Innovation & Excellence
          </motion.p>

          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Premium <span className="text-primary-900">Features</span>
          </motion.h2>

          <motion.div
            className="w-16 sm:w-20 md:w-24 h-1 bg-primary-700 mx-auto mb-6 md:mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: windowWidth < 640 ? 64 : windowWidth < 768 ? 80 : 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          />

          <motion.p
            className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl lg:max-w-3xl mx-auto leading-normal px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Experience the perfect blend of technology, safety, and luxury that defines 
            every Chery vehicle - engineered for the modern driver who demands excellence.
          </motion.p>
        </div>

        {/* Features grid following design system with enhanced responsiveness */}
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
                {/* Enhanced feature card */}
                <div className="relative border border-gray-200 bg-white/90 backdrop-blur-sm shadow-sm overflow-hidden group-hover:border-primary-700 hover:shadow-lg transition-all duration-300 h-full">
                  {/* Top accent with enhanced animation */}
                  <div 
                    className="h-1 w-full bg-primary-800 transition-all duration-500"
                    style={{
                      opacity: hoveredFeature === index ? 1 : 0.4,
                      width: hoveredFeature === index ? '100%' : '60%',
                      marginLeft: hoveredFeature === index ? '0' : '20%'
                    }}
                  />

                  <div className="p-6 sm:p-8 relative">
                    {/* Background decorative element */}
                    <div
                      className="absolute bottom-0 right-0 w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 transition-all duration-500 rounded-full"
                      style={{
                        background: `radial-gradient(circle, #8c735d10 0%, transparent 70%)`,
                        opacity: hoveredFeature === index ? 0.8 : 0,
                        transform: hoveredFeature === index ? 'scale(1.2)' : 'scale(1)',
                      }}
                    />

                    {/* Icon container with enhanced responsiveness */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary-light bg-opacity-40 flex items-center justify-center mb-4 sm:mb-6 transition-all duration-300 group-hover:bg-primary-700 group-hover:bg-opacity-20 relative z-10">
                      <IconComponent
                        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary-900 transition-colors duration-300 group-hover:text-primary-700"
                      />
                    </div>

                    {/* Typography with enhanced responsive scaling */}
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-primary-900 transition-colors duration-300 leading-tight relative z-10">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600 text-sm sm:text-base leading-normal mb-6 sm:mb-8 relative z-10">
                      {feature.desc}
                    </p>

                    {/* Enhanced learn more link */}
                    <div 
                      className="flex items-center text-primary-700 font-medium text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 relative z-10 cursor-pointer"
                      style={{
                        transform: hoveredFeature === index ? 'translateX(4px)' : 'translateX(0)'
                      }}
                    >
                      <span>Explore More</span>
                      <ChevronRight
                        size={windowWidth < 640 ? 14 : 16}
                        className="ml-1 sm:ml-2 transition-all duration-300"
                        style={{
                          transform: hoveredFeature === index ? 'translateX(4px)' : 'translateX(0)'
                        }}
                      />
                    </div>
                  </div>

                  {/* Enhanced bottom accent line */}
                  <div className="h-0.5 w-full bg-gray-200 mt-auto overflow-hidden">
                    <div 
                      className="h-full bg-primary-700 transition-all duration-700 ease-out"
                      style={{
                        width: hoveredFeature === index ? '100%' : '0%'
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Enhanced CTA section */}
        <motion.div
          className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 text-white mt-12 md:mt-16 lg:mt-20 p-6 sm:p-8 lg:p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Enhanced background pattern */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 opacity-10">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <pattern id="cta-pattern" width="15" height="15" patternUnits="userSpaceOnUse">
                  <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" />
                </pattern>
                <rect width="100" height="100" fill="url(#cta-pattern)" />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 bg-primary-light opacity-10 rounded-full filter blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 md:w-96 h-32 sm:h-40 md:h-48 bg-primary-700 opacity-5 rounded-full filter blur-3xl"></div>
          </div>

          <div className="relative z-10 text-center lg:text-left lg:flex lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 leading-tight">
                Experience Chery Excellence
              </h3>
              <p className="text-primary-light text-base sm:text-lg">
                Discover premium automotive engineering with our latest models
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:flex-shrink-0">
              {/* Enhanced primary button */}
              <a
                href="/testdrive"
                className="group inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-primary-700 text-white font-medium hover:bg-primary-800 transition-colors duration-300 text-sm sm:text-base min-h-[44px]"
                aria-label="Schedule a test drive"
              >
                Schedule Test Drive
                <ArrowRight
                  size={windowWidth < 640 ? 18 : 20}
                  className="ml-2 group-hover:ml-3 transition-all duration-300"
                />
              </a>

              {/* Enhanced secondary button */}
              <a
                href="/contact"
                className="inline-flex items-center justify-center bg-transparent border border-primary-700 text-white font-medium px-6 sm:px-8 md:px-10 py-3 sm:py-4 hover:bg-primary-700 transition-colors duration-300 text-sm sm:text-base min-h-[44px]"
                aria-label="Contact us for more information"
              >
                Explore Models
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-light via-primary-700 to-primary-900 opacity-30"></div>
    </section>
  );
};

export default CheryFeaturesGrid;