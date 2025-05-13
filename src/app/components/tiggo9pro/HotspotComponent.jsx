'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, Plus } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

// Chery-specific hotspot data with full content from the original component
const cheryHotspots = [
  {
    position: { top: '45%', left: '80%' },
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
    title: 'Retractable panoramic sunroof with electric sunshade',
    subtitle: 'LUXURIOUS DESIGN',
    description: 'Experience the freedom of open-air driving with our expansive panoramic sunroof featuring electric operation and automatic sunshade.',
    features: [
      {
        title: 'One-Touch Operation',
        description: 'Effortless control with anti-pinch safety technology'
      },
      {
        title: 'Solar Protection',
        description: 'UV-filtering glass blocks 99% of harmful rays'
      },
      {
        title: 'Rain Sensing',
        description: 'Automatically closes when precipitation is detected'
      }
    ],
    specifications: [
      { label: 'Opening Size', value: '1.2m x 0.8m' },
      { label: 'Glass Type', value: 'Laminated safety glass' },
      { label: 'UV Protection', value: '99.9%' }
    ],
    detailImageSrc: '/images/sunroof-detail.jpg',
    detailImageAlt: 'Panoramic sunroof'
  },
  {
    position: { top: '55%', left: '75%' },
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
  onHotspotClick = () => {},
  onHotspotClose = () => {},
}) => {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  const [hoveredHotspot, setHoveredHotspot] = useState(null);

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

  return (
    <div className={`relative w-full h-screen bg-stone-100 overflow-hidden ${className}`}>
      {/* Header text - shown when no hotspot is active */}
      <AnimatePresence>
        {!activeHotspot && (
          <motion.div 
            className="absolute top-16 left-16 z-10 max-w-2xl"
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <p className="text-sm font-medium mb-4 text-primary-700 tracking-wider uppercase">LUXURIOUS DESIGN</p>
            <h1 className="text-4xl md:text-5xl font-black mb-6 text-primary-900 leading-tight tracking-tighter">
              DECENT APPEARANCE<br />
              DESIGN
            </h1>
            <div className="w-24 h-1 bg-primary-700 mb-6"></div>
            <h2 className="text-xl md:text-2xl mb-6 text-gray-700">Family style design languages of new series</h2>
            <p className="text-gray-600 leading-relaxed text-lg max-w-xl">
              THE HOWL OF TIGER BRINGS IMPOSING APPEARANCE. THE APPEARANCE
              IMITATES THE OUTLINE OF A ROARING TIGER, WHICH APPEARS THE
              POWER. A POWERFUL AND DISTINCTIVE VEHICLE.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main layout container */}
      <div className="flex h-full w-full">
        {/* Vehicle image panel - keeps full width when hotspot is active */}
        <motion.div 
          className="relative"
          animate={{ 
            width: activeHotspot ? '50%' : '100%' 
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
            
            {/* Hotspot Triggers - Always visible */}
            {hotspots.map((hotspot, index) => (
              <motion.button
                key={index}
                onClick={() => !activeHotspot && openHotspot(hotspot)}
                onMouseEnter={() => setHoveredHotspot(hotspot)}
                onMouseLeave={() => setHoveredHotspot(null)}
                className={`absolute transition-all duration-300 ${
                  activeHotspot ? 'cursor-default opacity-50' : 'cursor-pointer opacity-100'
                }`}
                style={{ 
                  top: hotspot.position.top, 
                  left: hotspot.position.left,
                }}
                aria-label={`View ${hotspot.title} details`}
                disabled={!!activeHotspot}
                variants={hotspotVariants}
                initial="initial"
                whileHover="hover"
              >
                <div className="relative">
                  {/* Ripple effects */}
                  {!activeHotspot && (
                    <>
                      <div className="absolute inset-0 w-12 h-12 -m-1 rounded-full border-2 border-primary-light/60 animate-ping" />
                      <div className="absolute inset-0 w-10 h-10 rounded-full border border-primary-light/80 animate-pulse" />
                    </>
                  )}
                  {/* Hotspot label - appears on hover */}
                  <AnimatePresence>
                    {!activeHotspot && hoveredHotspot === hotspot && (
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
                  {/* Main button */}
                  <div className="relative w-10 h-10 rounded-full bg-primary-light backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <Plus size={20} className="text-primary-900" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Brand text */}
          <motion.div 
            className="absolute bottom-16 right-16"
            animate={{ opacity: activeHotspot ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-3xl font-bold text-primary-900">CHERY</p>
          </motion.div>
        </motion.div>

        {/* Close button positioned in the middle of the divider */}
        <AnimatePresence>
          {activeHotspot && (
            <motion.div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <button 
                onClick={closeHotspot}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-xl hover:bg-gray-100 transition-all duration-300 group border border-primary-700/20"
                aria-label="Close panel"
              >
                <ChevronLeft size={24} className="text-primary-900 transition-all duration-300 group-hover:-translate-x-1" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Vertical divider line */}
        <AnimatePresence>
          {activeHotspot && (
            <motion.div 
              className="absolute left-1/2 top-0 h-full w-px bg-primary-700/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ transform: 'translateX(-50%)' }}
            />
          )}
        </AnimatePresence>

        {/* Detail panel - slides in from right */}
        <AnimatePresence>
          {activeHotspot && (
            <motion.div 
              className="flex-1 bg-stone-100"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <div className="h-full flex flex-col relative">
                {/* Navigation indicator */}
                <motion.div 
                  className="absolute top-8 left-8 flex items-center"
                  variants={contentVariants}
                  initial="hidden"
                  animate={contentReady ? "visible" : "hidden"}
                >
                  <div className="flex items-center">
                    <span className="text-sm text-primary-700">Explore Features</span>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-sm font-medium text-gray-900">{activeHotspot.title}</span>
                  </div>
                </motion.div>

                {/* Content area - enhanced layout */}
                {showSingleColumn ? (
                  // Single column layout (like Image 2) - with larger image
                  <div className="flex-1 p-16 pt-24 flex flex-col justify-between h-full">
                    {/* Text content */}
                    <motion.div
                      variants={contentVariants}
                      initial="hidden"
                      animate={contentReady ? "visible" : "hidden"}
                    >
                      <p className="text-sm font-medium mb-6 text-primary-700 tracking-wider uppercase">{activeHotspot.subtitle}</p>
                      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 max-w-lg leading-tight tracking-tighter">
                        {activeHotspot.title}
                      </h2>
                      <div className="w-16 h-1 bg-primary-700 mb-6"></div>
                      {activeHotspot.description && (
                        <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                          {activeHotspot.description}
                        </p>
                      )}
                    </motion.div>

                    {/* Detail image - enlarged */}
                    <motion.div
                      variants={contentVariants}
                      initial="hidden"
                      animate={contentReady ? "visible" : "hidden"}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="relative w-full h-96 overflow-hidden rounded-lg group">
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <Image
                          src={activeHotspot.detailImageSrc || '/images/sunroof-detail.jpg'}
                          alt={activeHotspot.detailImageAlt || 'Feature detail'}
                          fill
                          className="object-cover rounded-lg shadow-xl transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  // Two column layout with features and specifications - with larger image
                  <div className="flex-1 p-16 pt-24 flex">
                    <div className="flex-1 pr-8">
                      {/* Text content */}
                      <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        animate={contentReady ? "visible" : "hidden"}
                      >
                        <p className="text-sm font-medium mb-6 text-primary-700 tracking-wider uppercase">{activeHotspot.subtitle}</p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight tracking-tighter">
                          {activeHotspot.title}
                        </h2>
                        <div className="w-16 h-1 bg-primary-700 mb-6"></div>
                        <p className="text-gray-600 mb-8 leading-relaxed text-lg">
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
                          <h3 className="text-xl font-semibold mb-6 text-gray-900">Features</h3>
                          <ul className="space-y-6">
                            {activeHotspot.features.map((feature, index) => (
                              <motion.li 
                                key={index} 
                                className="flex items-start"
                                variants={contentVariants}
                              >
                                <span className="w-2 h-2 bg-primary-700 rounded-full mt-2 mr-4"></span>
                                <div>
                                  <h4 className="font-medium text-gray-900 text-lg">{feature.title}</h4>
                                  <p className="text-gray-600">{feature.description}</p>
                                </div>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </div>

                    {/* Right column - Image and specifications - enhanced */}
                    <div className="w-1/2 pl-8">
                      {/* Detail image - enlarged */}
                      <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        animate={contentReady ? "visible" : "hidden"}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="relative w-full h-96 mb-8 overflow-hidden rounded-lg group">
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
                          <h3 className="text-xl font-semibold mb-6 text-gray-900">Specifications</h3>
                          <div className="space-y-4">
                            {activeHotspot.specifications.map((spec, index) => (
                              <motion.div 
                                key={index} 
                                className="flex justify-between border-b border-primary-light/50 pb-3"
                                variants={contentVariants}
                              >
                                <span className="text-gray-600 text-lg">{spec.label}</span>
                                <span className="font-medium text-gray-900 text-lg">{spec.value}</span>
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
                        className="mt-8"
                      >
                        <a
                          href="#explore-more"
                          className="group inline-flex items-center text-sm font-medium text-primary-700 tracking-wider uppercase hover:text-primary-900 transition-colors duration-300"
                        >
                          EXPLORE MORE FEATURES
                          <ArrowRight
                            size={16}
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
      </div>

      {/* Feature navigation dots - visible when hotspot is active */}
      <AnimatePresence>
        {activeHotspot && (
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2"
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
                className={`h-3 rounded-full transition-all duration-300 ${
                  activeHotspot === hotspot ? 'bg-primary-700 w-6' : 'bg-gray-300 w-3 hover:bg-primary-700/50'
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