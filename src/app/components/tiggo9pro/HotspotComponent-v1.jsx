'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, Plus, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Chery-specific hotspot data with full content from the original component
const cheryHotspots = [

  {
    position: { top: '60%', left: '38%' },
    mobilePosition: { top: '55%', left: '35%' },
    title: 'Grille with tiger-like face',
    subtitle: 'Luxurious Design',
    description: 'The grille design mimics the face of a tiger, symbolizing power and elegance. The intricate pattern and chrome accents enhance the vehicle\'s luxurious appearance.',

    detailImageSrc: '/images/tiggo9pro/hotspot/1.jpg',
    detailImageAlt: 'Grille with tiger-like face',
  },

  {
    position: { top: '55%', left: '40%' },
    mobilePosition: { top: '55%', left: '35%' },
    title: 'Stereoscopic diamond-shaped  embossed grille',
    subtitle: 'Luxurious Design',
    description: 'The stereoscopic diamond-shaped embossed grille adds a touch of sophistication and modernity to the vehicle\'s front fascia. The unique design enhances aerodynamics and visual appeal.',

    detailImageSrc: '/images/tiggo9pro/hotspot/2.jpg',
    detailImageAlt: 'Stereoscopic diamond-shaped  embossed grille',
  },

  {
    position: { top: '45%', left: '80%' },
    mobilePosition: { top: '45%', left: '75%' },
    title: 'Matrix LED Headlights',
    subtitle: 'INTELLIGENT LIGHTING',
    description: 'Advanced Matrix LED technology provides exceptional illumination while automatically adjusting beam patterns to avoid dazzling other drivers.',
    features: [
      {
        title: 'Adaptive Beam Control',
        description: 'Individual LED control for precise light distribution'
      },
      {
        title: 'Dynamic Cornering',
        description: 'Follows steering input for enhanced visibility in turns'
      },
      {
        title: 'Weather Adaptation',
        description: 'Automatically adjusts for fog, rain, and snow conditions'
      }
    ],
    specifications: [
      { label: 'Light Output', value: '2,500 lumens' },
      { label: 'LED Count', value: '84 individual LEDs' },
      { label: 'Response Time', value: '< 1 millisecond' }
    ],
    detailImageSrc: '/images/headlights-detail.jpg',
    detailImageAlt: 'Matrix LED Headlights'
  },
  {
    position: { top: '35%', left: '60%' },
    mobilePosition: { top: '30%', left: '55%' },
    title: '1.5 TGDI Engine',
    subtitle: 'POWERFUL PERFORMANCE',
    description: 'Advanced 1.5 Turbo Gasoline Direct Injection (TGDI) engine delivering exceptional power and efficiency.',
    features: [
      {
        title: 'Turbo Technology',
        description: 'Enhanced power through turbocharging'
      },
      {
        title: 'Direct Injection',
        description: 'Precise fuel delivery for optimal combustion'
      },
      {
        title: 'Fuel Efficiency',
        description: 'Balanced performance and economy'
      }
    ],
    specifications: [
      { label: 'Engine Type', value: '1.5 TGDI' },
      { label: 'Max Power', value: '156 PS' },
      { label: 'Max Torque', value: '230 Nm' }
    ],
    detailImageSrc: '/images/engine-detail.jpg',
    detailImageAlt: '1.5 TGDI Engine'
  },
  {
    position: { top: '55%', left: '75%' },
    mobilePosition: { top: '55%', left: '65%' },
    title: 'LED Tail Lights',
    subtitle: 'DISTINCTIVE SIGNATURE',
    description: 'Full-width LED light bar creates a striking visual signature while providing superior visibility and safety in all conditions.',
    features: [
      {
        title: 'Sequential Indicators',
        description: 'Dynamic turn signals for clear communication'
      },
      {
        title: 'Adaptive Brightness',
        description: 'Automatically adjusts based on ambient light'
      },
      {
        title: '3D Light Design',
        description: 'Multi-dimensional light elements for depth'
      }
    ],
    specifications: [
      { label: 'LED Type', value: 'High-intensity OLED' },
      { label: 'Lifespan', value: '50,000 hours' },
      { label: 'Response Time', value: '0.2 seconds' }
    ],
    detailImageSrc: '/images/taillights-detail.jpg',
    detailImageAlt: 'LED tail lights'
  },
  {
    position: { top: '50%', left: '90%' },
    mobilePosition: { top: '50%', left: '85%' },
    title: 'Side Mirror Tech',
    subtitle: 'SMART VISIBILITY',
    description: 'Intelligent side mirrors with integrated technology ensure safe driving with blind spot monitoring, auto-dimming, and camera integration.',
    features: [
      {
        title: 'Blind Spot Alert',
        description: 'Visual and audible warnings for hidden vehicles'
      },
      {
        title: 'Auto-Folding',
        description: 'Automatically folds when parked for protection'
      },
      {
        title: '360° Camera',
        description: 'Integrated cameras for surround view system'
      }
    ],
    specifications: [
      { label: 'Mirror Type', value: 'Electrochromic' },
      { label: 'Camera Resolution', value: '1080p HD' },
      { label: 'Field of View', value: '180°' }
    ],
    detailImageSrc: '/images/mirrors-detail.jpg',
    detailImageAlt: 'Side mirror technology'
  }
];

const HotspotComponent = ({
  imageSrc = '/images/tiggo9pro/hotspot.jpg',
  imageAlt = 'Chery Tiggo9 Vehicle',
  hotspots = cheryHotspots,
  className = '',
  onHotspotClick = () => { },
  onHotspotClose = () => { },
}) => {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  const [hoveredHotspot, setHoveredHotspot] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    // Handle responsive breakpoints
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    // Set initial values
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && activeHotspot) {
        closeHotspot();
      }
    };

    if (activeHotspot) {
      document.addEventListener('keydown', handleEscapeKey);
      // Delay content animation for smooth transition
      setTimeout(() => setContentReady(true), 300);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      setContentReady(false);
    };
  }, [activeHotspot]);

  useEffect(() => {
    // Disable body scroll when detail panel is open on mobile
    if (isMobile && activeHotspot) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, activeHotspot]);

  const openHotspot = (hotspot) => {
    setActiveHotspot(hotspot);
    setIsAnimating(true);
    onHotspotClick(hotspot);
  };

  const closeHotspot = () => {
    setIsAnimating(false);
    setContentReady(false);
    setTimeout(() => {
      setActiveHotspot(null);
      onHotspotClose();
    }, 500);
  };

  // Design match shows single column layout (Image 2)
  const showSingleColumn = activeHotspot && !activeHotspot.features;

  // Animation variants
  const headerVariants = {
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
    hidden: { opacity: 0, x: -20, transition: { duration: 0.5, ease: "easeIn" } }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const hotspotVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.15, transition: { duration: 0.3 } }
  };

  const mobileFullscreenVariants = {
    hidden: { opacity: 0, y: '100%' },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className={`relative w-full h-screen lg:h-screen bg-stone-100 overflow-hidden ${className}`}>
      {/* Header text - shown when no hotspot is active */}
      <AnimatePresence>
        {!activeHotspot && (
          <motion.div
            className="absolute top-8 sm:top-16 left-4 sm:left-16 z-10 max-w-2xl px-4 sm:px-0"
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <p className="text-xs sm:text-sm font-medium mb-2 sm:mb-4 text-primary-700 tracking-wider uppercase">LUXURIOUS DESIGN</p>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-6 text-primary-900 leading-tight tracking-tighter">
              DECENT APPEARANCE<br />
              DESIGN
            </h1>
            <div className="w-16 sm:w-24 h-1 bg-primary-700 mb-3 sm:mb-6"></div>
            <h2 className="text-lg sm:text-xl md:text-2xl mb-3 sm:mb-6 text-gray-700">Family style design languages of new series</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-xl">
              THE HOWL OF TIGER BRINGS IMPOSING APPEARANCE. THE APPEARANCE
              IMITATES THE OUTLINE OF A ROARING TIGER, WHICH APPEARS THE
              POWER. A POWERFUL AND DISTINCTIVE VEHICLE.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main layout container */}
      <div className="flex h-full w-full">
        {/* Vehicle image panel - adjusts width based on screen size and hotspot state */}
        <motion.div
          className="relative"
          animate={{
            width: isMobile ? '100%' : (activeHotspot ? (isTablet ? '40%' : '50%') : '100%')
          }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <div className="relative h-full w-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-center"
              priority
            />

            {/* Hotspot Triggers - Responsive positioning */}
            {hotspots.map((hotspot, index) => (
              <motion.button
                key={index}
                onClick={() => !activeHotspot && openHotspot(hotspot)}
                onMouseEnter={() => setHoveredHotspot(hotspot)}
                onMouseLeave={() => setHoveredHotspot(null)}
                className={`absolute transition-all duration-300 ${activeHotspot ? 'cursor-default opacity-50' : 'cursor-pointer opacity-100'
                  }`}
                style={{
                  top: isMobile && hotspot.mobilePosition ? hotspot.mobilePosition.top : hotspot.position.top,
                  left: isMobile && hotspot.mobilePosition ? hotspot.mobilePosition.left : hotspot.position.left,
                }}
                aria-label={`View ${hotspot.title} details`}
                disabled={!!activeHotspot}
                variants={hotspotVariants}
                initial="initial"
                whileHover="hover"
              >
                <div className="relative">
                  {/* Ripple effects - smaller on mobile */}
                  {!activeHotspot && (
                    <>
                      <div className={`absolute inset-0 ${isMobile ? 'w-8 h-8' : 'w-12 h-12'} -m-1 rounded-full border-2 border-primary-light/60 animate-ping`} />
                      <div className={`absolute inset-0 ${isMobile ? 'w-6 h-6' : 'w-10 h-10'} rounded-full border border-primary-light/80 animate-pulse`} />
                    </>
                  )}
                  {/* Hotspot label - appears on hover */}
                  <AnimatePresence>
                    {!activeHotspot && hoveredHotspot === hotspot && !isMobile && (
                      <motion.div
                        className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-primary-900/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg whitespace-nowrap z-20"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {hotspot.title}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {/* Main button - smaller on mobile */}
                  <div className={`relative ${isMobile ? 'w-6 h-6' : 'w-8 sm:w-10 h-8 sm:h-10'} rounded-full bg-primary-light backdrop-blur-sm flex items-center justify-center shadow-lg`}>
                    <Plus size={isMobile ? 14 : 20} className="text-primary-900" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Brand text */}
          <motion.div
            className="absolute bottom-8 sm:bottom-16 right-8 sm:right-16"
            animate={{ opacity: activeHotspot ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl sm:text-3xl font-bold text-primary-900">CHERY</p>
          </motion.div>
        </motion.div>

        {/* Close button positioned in the middle of the divider - hidden on mobile */}
        <AnimatePresence>
          {activeHotspot && !isMobile && (
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={closeHotspot}
                className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl hover:bg-gray-100 transition-all duration-300 group border border-primary-700/20"
                aria-label="Close panel"
              >
                <ChevronLeft size={20} className="text-primary-900 transition-all duration-300 group-hover:-translate-x-1" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Vertical divider line - hidden on mobile */}
        <AnimatePresence>
          {activeHotspot && !isMobile && (
            <motion.div
              className="absolute left-1/2 top-0 h-full w-px bg-primary-700/30 hidden md:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ transform: 'translateX(-50%)' }}
            />
          )}
        </AnimatePresence>

        {/* DESKTOP & TABLET: Detail panel - slides in from right */}
        <AnimatePresence>
          {activeHotspot && !isMobile && (
            <motion.div
              className="flex-1 bg-stone-100 overflow-y-auto max-h-screen"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              {/* Detail content for tablet and desktop */}
              <div className="h-full flex flex-col relative">
                {/* Navigation indicator */}
                <motion.div
                  className="absolute top-4 sm:top-8 left-4 sm:left-8 flex items-center"
                  variants={contentVariants}
                  initial="hidden"
                  animate={contentReady ? "visible" : "hidden"}
                >
                  <div className="flex items-center">
                    <span className="text-xs sm:text-sm text-primary-700">Explore Features</span>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-32 sm:max-w-full">{activeHotspot.title}</span>
                  </div>
                </motion.div>

                {/* Content area - enhanced layout and responsive */}
                {showSingleColumn || isTablet ? (
                  // Single column layout (like Image 2) - with larger image
                  <div className="flex-1 p-6 sm:p-8 lg:p-16 pt-16 sm:pt-20 lg:pt-24 flex flex-col justify-between h-full">
                    {/* Text content */}
                    <motion.div
                      variants={contentVariants}
                      initial="hidden"
                      animate={contentReady ? "visible" : "hidden"}
                    >
                      <p className="text-xs sm:text-sm font-medium mb-3 sm:mb-6 text-primary-700 tracking-wider uppercase">{activeHotspot.subtitle}</p>
                      <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-2 sm:mb-4 text-gray-900 max-w-lg leading-tight tracking-tighter">
                        {activeHotspot.title}
                      </h2>
                      <div className="w-12 sm:w-16 h-1 bg-primary-700 mb-3 sm:mb-6"></div>
                      {activeHotspot.description && (
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-8 leading-relaxed">
                          {activeHotspot.description}
                        </p>
                      )}
                    </motion.div>

                    {/* Features - Tablet only */}
                    {isTablet && activeHotspot.features && (
                      <motion.div
                        variants={staggerVariants}
                        initial="hidden"
                        animate={contentReady ? "visible" : "hidden"}
                        className="mb-6"
                      >
                        <h3 className="text-lg font-semibold mb-4 text-gray-900">Features</h3>
                        <ul className="space-y-4">
                          {activeHotspot.features.map((feature, index) => (
                            <motion.li
                              key={index}
                              className="flex items-start"
                              variants={contentVariants}
                            >
                              <span className="w-2 h-2 bg-primary-700 rounded-full mt-2 mr-3"></span>
                              <div>
                                <h4 className="font-medium text-gray-900 text-base">{feature.title}</h4>
                                <p className="text-sm text-gray-600">{feature.description}</p>
                              </div>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}

                    {/* Detail image - responsive height */}
                    <motion.div
                      variants={contentVariants}
                      initial="hidden"
                      animate={contentReady ? "visible" : "hidden"}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="relative w-full h-48 sm:h-64 lg:h-96 overflow-hidden rounded-lg group">
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <Image
                          src={activeHotspot.detailImageSrc || '/images/sunroof-detail.jpg'}
                          alt={activeHotspot.detailImageAlt || 'Feature detail'}
                          fill
                          className="object-cover rounded-lg shadow-xl transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </motion.div>

                    {/* Specifications - Tablet only */}
                    {isTablet && activeHotspot.specifications && (
                      <motion.div
                        variants={staggerVariants}
                        initial="hidden"
                        animate={contentReady ? "visible" : "hidden"}
                        transition={{ delay: 0.2 }}
                        className="mt-6"
                      >
                        <h3 className="text-lg font-semibold mb-4 text-gray-900">Specifications</h3>
                        <div className="space-y-3">
                          {activeHotspot.specifications.map((spec, index) => (
                            <motion.div
                              key={index}
                              className="flex justify-between border-b border-primary-light/50 pb-2"
                              variants={contentVariants}
                            >
                              <span className="text-gray-600 text-sm sm:text-base">{spec.label}</span>
                              <span className="font-medium text-gray-900 text-sm sm:text-base">{spec.value}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  // Two column layout for desktop with features and specifications
                  <div className="flex-1 p-6 sm:p-8 lg:p-16 pt-16 sm:pt-20 lg:pt-24 flex flex-col lg:flex-row">
                    <div className="flex-1 lg:pr-8 mb-8 lg:mb-0">
                      {/* Text content */}
                      <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        animate={contentReady ? "visible" : "hidden"}
                      >
                        <p className="text-xs sm:text-sm font-medium mb-3 sm:mb-6 text-primary-700 tracking-wider uppercase">{activeHotspot.subtitle}</p>
                        <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-2 sm:mb-4 text-gray-900 leading-tight tracking-tighter">
                          {activeHotspot.title}
                        </h2>
                        <div className="w-12 sm:w-16 h-1 bg-primary-700 mb-3 sm:mb-6"></div>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-8 leading-relaxed">
                          {activeHotspot.description}
                        </p>
                      </motion.div>

                      {/* Features */}
                      {activeHotspot.features && (
                        <motion.div
                          variants={staggerVariants}
                          initial="hidden"
                          animate={contentReady ? "visible" : "hidden"}
                        >
                          <h3 className="text-lg lg:text-xl font-semibold mb-4 lg:mb-6 text-gray-900">Features</h3>
                          <ul className="space-y-4 lg:space-y-6">
                            {activeHotspot.features.map((feature, index) => (
                              <motion.li
                                key={index}
                                className="flex items-start"
                                variants={contentVariants}
                              >
                                <span className="w-2 h-2 bg-primary-700 rounded-full mt-2 mr-3 lg:mr-4"></span>
                                <div>
                                  <h4 className="font-medium text-gray-900 text-base lg:text-lg">{feature.title}</h4>
                                  <p className="text-sm lg:text-base text-gray-600">{feature.description}</p>
                                </div>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </div>

                    {/* Right column - Image and specifications - enhanced */}
                    <div className="w-full lg:w-1/2 lg:pl-8">
                      {/* Detail image - responsive height */}
                      <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        animate={contentReady ? "visible" : "hidden"}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="relative w-full h-48 sm:h-64 lg:h-96 mb-4 lg:mb-8 overflow-hidden rounded-lg group">
                          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <Image
                            src={activeHotspot.detailImageSrc || '/images/sunroof-detail.jpg'}
                            alt={activeHotspot.detailImageAlt || 'Feature detail'}
                            fill
                            className="object-cover rounded-lg shadow-xl transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      </motion.div>

                      {/* Specifications */}
                      {activeHotspot.specifications && (
                        <motion.div
                          variants={staggerVariants}
                          initial="hidden"
                          animate={contentReady ? "visible" : "hidden"}
                          transition={{ delay: 0.2 }}
                        >
                          <h3 className="text-lg lg:text-xl font-semibold mb-4 lg:mb-6 text-gray-900">Specifications</h3>
                          <div className="space-y-3 lg:space-y-4">
                            {activeHotspot.specifications.map((spec, index) => (
                              <motion.div
                                key={index}
                                className="flex justify-between border-b border-primary-light/50 pb-2 lg:pb-3"
                                variants={contentVariants}
                              >
                                <span className="text-gray-600 text-sm lg:text-lg">{spec.label}</span>
                                <span className="font-medium text-gray-900 text-sm lg:text-lg">{spec.value}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* View all features button */}
                      <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        animate={contentReady ? "visible" : "hidden"}
                        transition={{ delay: 0.3 }}
                        className="mt-6 lg:mt-8"
                      >
                        <a
                          href="#explore-more"
                          className="group inline-flex items-center text-xs sm:text-sm font-medium text-primary-700 tracking-wider uppercase hover:text-primary-900 transition-colors duration-300"
                        >
                          EXPLORE MORE FEATURES
                          <ArrowRight
                            size={14}
                            className="ml-2 group-hover:ml-3 transition-all duration-300"
                          />
                        </a>
                      </motion.div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MOBILE: Fullscreen detail panel */}
        <AnimatePresence>
          {activeHotspot && isMobile && (
            <motion.div
              className="fixed inset-0 bg-stone-100 z-50 overflow-y-auto"
              variants={mobileFullscreenVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Mobile header with close button */}
              <div className="sticky top-0 z-10 bg-stone-100 p-4 flex justify-between items-center border-b border-gray-200">
                <div>
                  <p className="text-xs font-medium text-primary-700 tracking-wider uppercase">{activeHotspot.subtitle}</p>
                  <h2 className="text-lg font-bold text-gray-900 pr-8 truncate">{activeHotspot.title}</h2>
                </div>
                <button
                  onClick={closeHotspot}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Close panel">
                  <X size={18} className="text-gray-700" />
                </button>
              </div>

              {/* Mobile content area - scrollable */}
              <div className="p-4">
                {/* Detail image - full width on mobile */}
                <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={activeHotspot.detailImageSrc || '/images/sunroof-detail.jpg'}
                    alt={activeHotspot.detailImageAlt || 'Feature detail'}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {activeHotspot.description}
                  </p>
                </div>

                {/* Features */}
                {activeHotspot.features && (
                  <div className="mb-6">
                    <h3 className="text-base font-semibold mb-3 text-gray-900">Features</h3>
                    <ul className="space-y-3">
                      {activeHotspot.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-primary-700 rounded-full mt-1.5 mr-3"></span>
                          <div>
                            <h4 className="font-medium text-gray-900 text-sm">{feature.title}</h4>
                            <p className="text-xs text-gray-600">{feature.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Specifications */}
                {activeHotspot.specifications && (
                  <div className="mb-6">
                    <h3 className="text-base font-semibold mb-3 text-gray-900">Specifications</h3>
                    <div className="space-y-2">
                      {activeHotspot.specifications.map((spec, index) => (
                        <div
                          key={index}
                          className="flex justify-between border-b border-primary-light/50 pb-2"
                        >
                          <span className="text-gray-600 text-xs">{spec.label}</span>
                          <span className="font-medium text-gray-900 text-xs">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom CTA */}
                <div className="mt-6 pb-4">
                  <a
                    href="#explore-more"
                    className="group inline-flex items-center text-xs font-medium text-primary-700 tracking-wider uppercase hover:text-primary-900 transition-colors duration-300"
                  >
                    EXPLORE MORE FEATURES
                    <ArrowRight
                      size={12}
                      className="ml-2 group-hover:ml-3 transition-all duration-300"
                    />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Feature navigation dots - responsive positioning */}
      <AnimatePresence>
        {activeHotspot && !isMobile && (
          <motion.div
            className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {hotspots.map((hotspot, index) => (
              <button
                key={index}
                onClick={() => {
                  if (activeHotspot !== hotspot) {
                    closeHotspot();
                    setTimeout(() => openHotspot(hotspot), 500);
                  }
                }}
                className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${activeHotspot === hotspot ? 'bg-primary-700 w-4 sm:w-6' : 'bg-gray-300 w-2 sm:w-3 hover:bg-primary-700/50'
                  }`}
                aria-label={`View ${hotspot.title}`}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile feature navigation dots - fixed at bottom when modal is open */}
      <AnimatePresence>
        {activeHotspot && isMobile && (
          <motion.div
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {hotspots.map((hotspot, index) => (
              <button
                key={index}
                onClick={() => {
                  if (activeHotspot !== hotspot) {
                    closeHotspot();
                    setTimeout(() => openHotspot(hotspot), 300);
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${activeHotspot === hotspot ? 'bg-primary-700 w-4' : 'bg-gray-300 w-2 hover:bg-primary-700/50'
                  }`}
                aria-label={`View ${hotspot.title}`}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HotspotComponent;