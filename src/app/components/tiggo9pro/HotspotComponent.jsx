'use client';

import { animationVariants, cheryHotspots } from '@/data/hotspotData';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, Plus, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    handleResize(); // Set initial values
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle escape key and content animation
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

  // Handle body scroll for mobile
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

  // Hotspot interaction handlers
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

  // Layout configuration
  const showSingleColumn = activeHotspot && !activeHotspot.features;

  return (
    <div className={`relative w-full h-screen lg:h-screen bg-stone-100 overflow-hidden ${className}`}>
      {/* Header text - shown when no hotspot is active */}
      <AnimatePresence>
        {!activeHotspot && (
          <motion.div
            className="absolute top-8 sm:top-16 left-4 sm:left-16 z-10 max-w-2xl px-4 sm:px-0"
            variants={animationVariants.header}
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
            <h2 className="text-lg sm:text-xl md:text-2xl mb-3 sm:mb-6 font-medium text-gray-700">Family style design languages of new series</h2>
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
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
                className={`absolute transition-all duration-300 ${activeHotspot ? 'cursor-default opacity-50' : 'cursor-pointer opacity-100'}`}
                style={{
                  top: isMobile && hotspot.mobilePosition ? hotspot.mobilePosition.top : hotspot.position.top,
                  left: isMobile && hotspot.mobilePosition ? hotspot.mobilePosition.left : hotspot.position.left,
                }}
                aria-label={`View ${hotspot.title} details`}
                disabled={!!activeHotspot}
                variants={animationVariants.hotspot}
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
                        className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-primary-900 backdrop-blur-sm text-white px-3 py-2 rounded-lg whitespace-nowrap z-20 shadow-md"
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
                  <div className={`relative ${isMobile ? 'w-6 h-6' : 'w-8 sm:w-10 h-8 sm:h-10'} rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-lg`}>
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
            <p className="text-xl sm:text-3xl font-bold text-primary-900">Tiggo 9 Pro</p>
          </motion.div>
        </motion.div>

        {/* Close button - positioned at top right of the detail panel for extra accessibility */}
        <AnimatePresence>
          {activeHotspot && (
            <motion.button
              onClick={closeHotspot}
              className="absolute top-4 right-4 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-white text-primary shadow-lg border border-primary-700/20 group hover:bg-primary-700 hover:text-white transition-colors duration-300"
              aria-label="Close panel"
              variants={animationVariants.closeButton}
              initial="initial"
              animate="animate"
              exit="exit"
              whileHover="hover"
            >
              <X size={20} className="transition-all duration-300" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Vertical divider line with center close button - hidden on mobile */}
        <AnimatePresence>
          {activeHotspot && !isMobile && (
            <>
              <motion.div
                className="absolute left-1/2 top-0 h-full w-px bg-primary-700/30 hidden md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ transform: 'translateX(-50%)' }}
              />

              {/* Original divider close button */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 hidden md:block"
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
            </>
          )}
        </AnimatePresence>

        {/* DESKTOP & TABLET: Detail panel */}
        <AnimatePresence>
          {activeHotspot && !isMobile && (
            <motion.div
              className="flex-1 bg-stone-100 overflow-y-auto max-h-screen"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Detail content for tablet and desktop */}
              <div className="h-full flex flex-col relative">
                {/* Navigation indicator */}
                <motion.div
                  className="absolute top-4 sm:top-8 left-4 sm:left-8 flex items-center"
                  variants={animationVariants.content}
                  initial="hidden"
                  animate={contentReady ? "visible" : "hidden"}
                >
                  <div className="flex items-center">
                    <span className="text-xs sm:text-sm text-primary-700">Explore Features</span>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-32 sm:max-w-full">{activeHotspot.title}</span>
                  </div>
                </motion.div>

                {/* Layout conditional rendering */}
                {showSingleColumn || isTablet ? (
                  // Single column layout with image at the top
                  <div className="flex-1 p-6 sm:p-8 lg:p-16 pt-16 sm:pt-20 lg:pt-24 flex flex-col h-full">
                    {/* Prominent detail image at the top */}
                    <motion.div
                      variants={animationVariants.detailImage}
                      initial="hidden"
                      animate={contentReady ? "visible" : "hidden"}
                      className="w-full mb-8"
                    >
                      <div className="relative w-full h-56 sm:h-72 lg:h-96 overflow-hidden rounded-lg group shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <Image
                          src={activeHotspot.detailImageSrc || '/images/sunroof-detail.jpg'}
                          alt={activeHotspot.detailImageAlt || 'Feature detail'}
                          fill
                          className="object-cover rounded-lg transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </motion.div>
                    
                    {/* Text content after image */}
                    <motion.div
                      variants={animationVariants.content}
                      initial="hidden"
                      animate={contentReady ? "visible" : "hidden"}
                      className="mb-8"
                    >
                      <p className="text-xs sm:text-sm font-medium mb-3 sm:mb-4 text-primary-700 tracking-wider uppercase">{activeHotspot.subtitle}</p>
                      <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-3 text-gray-900 max-w-lg leading-tight tracking-tighter">
                        {activeHotspot.title}
                      </h2>
                      <div className="w-12 sm:w-16 h-1 bg-primary-700 mb-4 sm:mb-6"></div>
                      {activeHotspot.description && (
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                          {activeHotspot.description}
                        </p>
                      )}
                    </motion.div>

                    {/* Features - Tablet only */}
                    {isTablet && activeHotspot.features && (
                      <motion.div
                        variants={animationVariants.stagger}
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
                              variants={animationVariants.content}
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

                    {/* Specifications - Tablet only */}
                    {isTablet && activeHotspot.specifications && (
                      <motion.div
                        variants={animationVariants.stagger}
                        initial="hidden"
                        animate={contentReady ? "visible" : "hidden"}
                        className="mt-auto pt-6"
                      >
                        <h3 className="text-lg font-semibold mb-4 text-gray-900">Specifications</h3>
                        <div className="space-y-3">
                          {activeHotspot.specifications.map((spec, index) => (
                            <motion.div
                              key={index}
                              className="flex justify-between border-b border-primary-light/50 pb-2"
                              variants={animationVariants.content}
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
                  // Two column layout for desktop with image at the top
                  <div className="flex-1 p-6 sm:p-8 lg:p-16 pt-16 sm:pt-20 lg:pt-24 flex flex-col">
                    {/* Top image section */}
                    <motion.div
                      variants={animationVariants.detailImage}
                      initial="hidden"
                      animate={contentReady ? "visible" : "hidden"}
                      className="w-full mb-8"
                    >
                      <div className="relative w-full h-56 sm:h-72 lg:h-96 overflow-hidden rounded-lg group shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <Image
                          src={activeHotspot.detailImageSrc || '/images/sunroof-detail.jpg'}
                          alt={activeHotspot.detailImageAlt || 'Feature detail'}
                          fill
                          className="object-cover rounded-lg transition-transform duration-700 group-hover:scale-105"
                        />
                        
                        {/* Image caption */}
                        <div className="absolute bottom-0 left-0 right-0 bg-primary-900/80 text-white px-4 py-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-sm">{activeHotspot.detailImageAlt}</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Two column content below the image */}
                    <div className="flex flex-col lg:flex-row">
                      {/* Left column - Text and features */}
                      <div className="flex-1 lg:pr-8 mb-8 lg:mb-0 flex flex-col">
                        <motion.div
                          variants={animationVariants.content}
                          initial="hidden"
                          animate={contentReady ? "visible" : "hidden"}
                          className="mb-6"
                        >
                          <p className="text-xs sm:text-sm font-medium mb-3 sm:mb-4 text-primary-700 tracking-wider uppercase">{activeHotspot.subtitle}</p>
                          <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-3 text-gray-900 leading-tight tracking-tighter">
                            {activeHotspot.title}
                          </h2>
                          <div className="w-12 sm:w-16 h-1 bg-primary-700 mb-4 sm:mb-6"></div>
                          <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                            {activeHotspot.description}
                          </p>
                        </motion.div>

                        {/* Features */}
                        {activeHotspot.features && (
                          <motion.div
                            variants={animationVariants.stagger}
                            initial="hidden"
                            animate={contentReady ? "visible" : "hidden"}
                            className="mt-4"
                          >
                            <h3 className="text-lg lg:text-xl font-semibold mb-4 lg:mb-6 text-gray-900">Features</h3>
                            <ul className="space-y-4 lg:space-y-6">
                              {activeHotspot.features.map((feature, index) => (
                                <motion.li
                                  key={index}
                                  className="flex items-start"
                                  variants={animationVariants.content}
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

                        {/* Specifications */}
                        {activeHotspot.specifications && (
                          <motion.div
                            variants={animationVariants.stagger}
                            initial="hidden"
                            animate={contentReady ? "visible" : "hidden"}
                            className="mt-auto pt-6"
                          >
                            <h3 className="text-lg lg:text-xl font-semibold mb-4 lg:mb-6 text-gray-900">Specifications</h3>
                            <div className="space-y-3 lg:space-y-4">
                              {activeHotspot.specifications.map((spec, index) => (
                                <motion.div
                                  key={index}
                                  className="flex justify-between border-b border-primary-light/50 pb-2 lg:pb-3"
                                  variants={animationVariants.content}
                                >
                                  <span className="text-gray-600 text-sm lg:text-base">{spec.label}</span>
                                  <span className="font-medium text-gray-900 text-sm lg:text-base">{spec.value}</span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Right column - Changed to additional content or CTA */}
                      <div className="w-full lg:w-1/3 flex flex-col">
                        {/* View all features button */}
                        <motion.div
                          variants={animationVariants.content}
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
              variants={animationVariants.mobileFullscreen}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Mobile header with title and subtitle */}
              <div className="sticky top-0 z-10 bg-stone-100 p-4 border-b border-gray-200 shadow-sm">
                <div className="pr-10">
                  <p className="text-xs font-medium text-primary-700 tracking-wider uppercase">{activeHotspot.subtitle}</p>
                  <h2 className="text-lg font-bold text-gray-900 truncate">{activeHotspot.title}</h2>
                </div>
              </div>

              {/* Mobile content area - scrollable with image at top */}
              <div className="p-4">
                {/* Prominent detail image on mobile - at the top */}
                <div className="relative w-full h-60 mb-6 overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={activeHotspot.detailImageSrc || '/images/sunroof-detail.jpg'}
                    alt={activeHotspot.detailImageAlt || 'Feature detail'}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent opacity-30"></div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <div className="w-12 h-1 bg-primary-700 mb-4"></div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {activeHotspot.description}
                  </p>
                </div>

                {/* Features */}
                {activeHotspot.features && (
                  <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-base font-semibold mb-3 text-gray-900">Features</h3>
                    <ul className="space-y-4">
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
                  <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-base font-semibold mb-3 text-gray-900">Specifications</h3>
                    <div className="space-y-3">
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
                <div className="mt-8 pb-16">
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

      {/* Feature navigation dots - desktop/tablet */}
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
                    setTimeout(() => openHotspot(hotspot), 300);
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${activeHotspot === hotspot ? 'bg-primary-700 w-6' : 'bg-gray-300 w-2 hover:bg-primary-700/50'
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