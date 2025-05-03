'use client'

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

const SimpleBanner = ({
  slides = [],
  accentColor = '#8c735d', // Primary 700 from design system
  textColor = '#94705f', // Gray 900
  autoplayInterval = 5000,
  height = '600px',
  showControls = true,
  showContents = false,
  onSlideChange = null,
  
  // Enhanced section content controls
  showSectionHeader = true,
  sectionTitle = '',
  sectionSubtitle = '',
  sectionText = '',
  sectionTitleSize = 'text-4xl md:text-5xl',
  sectionSubtitleSize = 'text-xl md:text-2xl',
  sectionTextSize = 'text-base md:text-lg',
  sectionMaxWidth = 'max-w-3xl',
  sectionHeaderAlignment = 'left', // 'left', 'center', 'right'
  sectionHeaderPadding = 'pt-8 pb-4 md:pt-12 md:pb-8',
  showAccentLine = true,
  accentLineWidth = '100px',
  accentLinePosition = 'top-10',
  customSectionContent = null, // Optional custom content
  
  layout = 'standard', // 'standard', 'split', 'overlay-left', 'overlay-right', 'minimal'
  fullWidth = true,
  backgroundColor = '#FFFFFF',
  pauseOnHover = true,
  controlStyle = 'standard', // 'standard', 'minimal', 'dots-only', 'arrows-only'
  contentAlignment = 'center', // 'center', 'left', 'right'
  contentWidth = 'medium', // 'narrow', 'medium', 'wide'
  theme = 'light', // 'light', 'dark'
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const [loaded, setLoaded] = useState(false);
  
  const sectionRef = useRef(null);
  const slideRef = useRef(null);
  const videoRefs = useRef({});
  const autoplayTimerRef = useRef(null);

  // Color theme
  const colors = {
    light: {
      background: backgroundColor,
      text: textColor,
      textSecondary: '#4B5563', // Gray 600
      accent: accentColor,
      overlay: 'rgba(0,0,0,0.4)',
      controlBg: 'rgba(255,255,255,0.15)',
      controlHoverBg: 'rgba(255,255,255,0.25)',
    },
    dark: {
      background: '#111827',
      text: '#F9FAFB',
      textSecondary: '#E5E7EB',
      accent: accentColor,
      overlay: 'rgba(0,0,0,0.6)',
      controlBg: 'rgba(0,0,0,0.25)',
      controlHoverBg: 'rgba(0,0,0,0.35)',
    }
  };

  const currentTheme = colors[theme];

  // Return null if no slides
  if (!slides || slides.length === 0) return null;

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        
        // Resume or pause autoplay based on visibility
        if (entry.isIntersecting) {
          setAutoplayPaused(false);
        } else {
          setAutoplayPaused(true);
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

  // Mark component as loaded after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle video playback when slide changes
  useEffect(() => {
    // Set transitioning state
    setIsTransitioning(true);
    const transitionTimer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
    
    // Pause all videos
    Object.values(videoRefs.current).forEach(ref => {
      if (ref && ref.pause) {
        ref.pause();
      }
    });

    // Play current video if it exists
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo && slides[currentIndex].videoSrc) {
      // Reset video to beginning if needed
      currentVideo.currentTime = 0;
      
      // Play the video with a small delay to ensure DOM is updated
      setTimeout(() => {
        const playPromise = currentVideo.play();
        
        // Handle play promise to avoid DOM exceptions
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.warn("Auto-play prevented:", error);
            // Show play button if autoplay is blocked
          });
        }
      }, 100);
    }
    
    return () => clearTimeout(transitionTimer);
  }, [currentIndex, slides]);

  // Autoplay functionality
  useEffect(() => {
    if (autoplayPaused || (pauseOnHover && isHovering) || isTransitioning) {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      handleSlideChange((currentIndex + 1) % slides.length);
    }, autoplayInterval);

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    };
  }, [
    slides.length, 
    autoplayInterval, 
    currentIndex, 
    isHovering, 
    pauseOnHover, 
    autoplayPaused,
    isTransitioning
  ]);

  // Touch swipe handling for mobile
  useEffect(() => {
    if (!slideRef.current) return;

    const handleTouchStart = (e) => {
      setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
      setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;

      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > 50;
      const isRightSwipe = distance < -50;

      if (isLeftSwipe) {
        handleSlideChange((currentIndex + 1) % slides.length);
      } else if (isRightSwipe) {
        handleSlideChange((currentIndex - 1 + slides.length) % slides.length);
      }

      setTouchStart(null);
      setTouchEnd(null);
    };

    const element = slideRef.current;
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentIndex, slides.length, touchStart, touchEnd]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handleSlideChange((currentIndex - 1 + slides.length) % slides.length);
      } else if (e.key === 'ArrowRight') {
        handleSlideChange((currentIndex + 1) % slides.length);
      }
    };

    if (isInView) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, slides.length, isInView]);

  // Navigation function
  const handleSlideChange = useCallback((index) => {
    if (isTransitioning) return;
    
    setCurrentIndex(index);
    if (onSlideChange && typeof onSlideChange === 'function') {
      onSlideChange(index);
    }
  }, [isTransitioning, onSlideChange]);

  // Animation variants
  const slideVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.3 }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.4 } 
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Button animation variants
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  // Layout configuration
  const layoutConfig = {
    standard: {
      container: 'w-full',
      contentPosition: 'absolute inset-0 flex flex-col items-center justify-center p-6 md:p-8 text-center',
      headerPosition: '',
      headerWidth: 'max-w-7xl mx-auto px-4 sm:px-6',
      imageOverlay: 'absolute inset-0',
      imagePosition: 'w-full h-full',
    },
    split: {
      container: 'w-full lg:flex lg:flex-row',
      contentPosition: 'lg:w-1/2 lg:static absolute inset-0 flex flex-col items-start justify-center p-6 md:p-8 lg:p-12 text-left',
      headerPosition: 'lg:order-1',
      headerWidth: 'max-w-xl',
      imageOverlay: 'absolute inset-0 lg:static lg:w-1/2 lg:order-2',
      imagePosition: 'w-full h-full',
    },
    'overlay-left': {
      container: 'w-full',
      contentPosition: 'absolute inset-0 flex flex-col items-start justify-center p-6 md:p-8 lg:pl-16 text-left',
      headerPosition: '',
      headerWidth: 'max-w-xl',
      imageOverlay: 'absolute inset-0',
      imagePosition: 'w-full h-full',
    },
    'overlay-right': {
      container: 'w-full',
      contentPosition: 'absolute inset-0 flex flex-col items-end justify-center p-6 md:p-8 lg:pr-16 text-right',
      headerPosition: '',
      headerWidth: 'max-w-xl ml-auto',
      imageOverlay: 'absolute inset-0',
      imagePosition: 'w-full h-full',
    },
    minimal: {
      container: 'w-full',
      contentPosition: 'absolute inset-0 flex flex-col items-center justify-center p-6 md:p-8 text-center',
      headerPosition: '',
      headerWidth: 'max-w-7xl mx-auto px-4 sm:px-6',
      imageOverlay: 'absolute inset-0',
      imagePosition: 'w-full h-full',
    }
  };

  // Content width classes
  const contentWidthClasses = {
    narrow: 'max-w-md',
    medium: 'max-w-2xl',
    wide: 'max-w-4xl'
  };

  // Content alignment classes
  const contentAlignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right'
  };

  // Section header alignment classes
  const headerAlignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  // Get current layout config
  const currentLayout = layoutConfig[layout] || layoutConfig.standard;
  const contentWidthClass = contentWidthClasses[contentWidth] || contentWidthClasses.medium;
  const alignmentClass = contentAlignmentClasses[contentAlignment] || contentAlignmentClasses.center;
  const headerAlignmentClass = headerAlignmentClasses[sectionHeaderAlignment] || headerAlignmentClasses.left;

  // Overlay style based on layout
  const getOverlayStyle = () => {
    switch (layout) {
      case 'overlay-left':
        return 'linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)';
      case 'overlay-right':
        return 'linear-gradient(270deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)';
      case 'minimal':
        return `linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)`;
      default:
        return `linear-gradient(0deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.65) 100%)`;
    }
  };

  // Progress percentage for progress bar
  const progressPercentage = ((currentIndex) / (slides.length - 1)) * 100;

  // Render section header content
  const renderSectionHeader = () => {
    if (customSectionContent) {
      return customSectionContent;
    }

    return (
      <motion.div 
        className={`${currentLayout.headerWidth} ${headerAlignmentClass}`}
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="relative">
          {/* Subtitle */}
          {sectionSubtitle && (
            <motion.h3
              className={`${sectionSubtitleSize} font-medium tracking-wide`}
              variants={childVariants}
              style={{ color: currentTheme.accent }}
            >
              {sectionSubtitle}
            </motion.h3>
          )}

          {/* Subtle horizontal accent line */}
          {showAccentLine && (sectionTitle || sectionSubtitle) && (
            <motion.div
              className={`absolute ${accentLinePosition} ${sectionHeaderAlignment === 'right' ? 'right-0' : sectionHeaderAlignment === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0'} h-0.5 rounded-full`}
              style={{
                backgroundImage: `linear-gradient(to right, ${currentTheme.accent} 0%, ${currentTheme.accent}40 100%)`,
                width: isInView ? accentLineWidth : '0px',
                transition: 'width 0.8s ease-out 0.2s'
              }}
            />
          )}

          {/* Title with subtle accent line */}
          {sectionTitle && (
            <motion.h2
              className={`${sectionTitleSize} mt-5 font-bold mb-6 tracking-tight`}
              variants={childVariants}
              style={{ color: currentTheme.text }}
            >
              {sectionTitle}
            </motion.h2>
          )}

          {/* Description text */}
          {sectionText && (
            <motion.p
              className={`${sectionTextSize} ${sectionMaxWidth} mt-6 leading-relaxed ${sectionHeaderAlignment === 'center' ? 'mx-auto' : sectionHeaderAlignment === 'right' ? 'ml-auto' : ''}`}
              variants={childVariants}
              style={{ color: currentTheme.textSecondary }}
            >
              {sectionText}
            </motion.p>
          )}
        </div>
      </motion.div>
    );
  };

  // Control button component
  const ControlButton = ({ direction, onClick }) => {
    const isNext = direction === 'next';
    
    return (
      <motion.button
        className={`absolute ${isNext ? 'right-4 md:right-8' : 'left-4 md:left-8'} top-1/2 -translate-y-1/2 z-20
          w-12 h-12 rounded-full flex items-center justify-center text-white backdrop-blur-sm
          transition-all duration-300 ${controlStyle === 'minimal' ? 'bg-white/10 hover:bg-white/20 border border-white/30' : ''}`}
        style={{ 
          backgroundColor: controlStyle === 'minimal' ? 'transparent' : currentTheme.accent,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}
        onClick={onClick}
        aria-label={`${isNext ? 'Next' : 'Previous'} slide`}
        variants={buttonVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${isNext ? '' : 'transform rotate-180'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    );
  };

  // Dot indicator component
  const DotIndicator = ({ index, isActive, onClick }) => {
    return (
      <motion.button
        className="h-3 mx-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        style={{
          backgroundColor: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)',
          width: isActive ? '24px' : '8px',
          borderRadius: '4px',
        }}
        onClick={onClick}
        aria-label={`Go to slide ${index + 1}`}
        whileHover={{ scale: 1.2, backgroundColor: '#FFFFFF' }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      />
    );
  };

  return (
    <section
      ref={sectionRef}
      className={`w-full overflow-hidden ${theme === 'dark' ? 'text-white' : ''} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
      style={{ backgroundColor: currentTheme.background }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Section Header - Only shown if enabled */}
      {showSectionHeader && (sectionTitle || sectionSubtitle || sectionText || customSectionContent) && (
        <div className={`container mx-auto px-4 ${sectionHeaderPadding} ${currentLayout.headerPosition}`}>
          {renderSectionHeader()}
        </div>
      )}

      {/* Banner/Slider container */}
      <div
        ref={slideRef}
        className={`relative overflow-hidden ${currentLayout.container} ${fullWidth ? '' : 'container mx-auto px-4'}`}
        style={{ height: layout === 'split' ? 'auto' : height }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Content slider"
      >
        {/* Slides */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className={`${currentLayout.imageOverlay}`}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ height: layout === 'split' ? height : '100%' }}
            aria-roledescription="slide"
            aria-label={`Slide ${currentIndex + 1} of ${slides.length}: ${slides[currentIndex].title || ''}`}
          >
            <div className={`relative ${currentLayout.imagePosition}`}>
              {/* Background Media (Image or Video) */}
              {slides[currentIndex].videoSrc ? (
                <video
                  ref={ref => videoRefs.current[currentIndex] = ref}
                  src={slides[currentIndex].videoSrc}
                  className="object-cover w-full h-full scale-105"
                  muted
                  loop
                  playsInline
                  style={{ position: 'absolute', inset: 0 }}
                  aria-label={slides[currentIndex].title || 'Background video'}
                />
              ) : slides[currentIndex].image && (
                <Image
                  src={slides[currentIndex].image}
                  alt={slides[currentIndex].title || ''}
                  fill
                  priority
                  className="object-cover scale-[1.02] transform transition-transform duration-10000 ease-linear"
                  sizes={layout === 'split' ? "(max-width: 1023px) 100vw, 50vw" : "100vw"}
                  quality={90}
                  style={{
                    transform: isTransitioning ? 'scale(1.05)' : 'scale(1.02)'
                  }}
                />
              )}

              {/* Overlay */}
              <div
                className="absolute inset-0"
                style={{ background: getOverlayStyle() }}
              ></div>
            </div>

            {/* Content */}
            {showContents && (
              <div className={`${currentLayout.contentPosition} ${alignmentClass} z-10`}>
                <motion.div
                  className={`${contentWidthClass} backdrop-blur-sm backdrop-filter bg-black/10 p-6 rounded-lg border border-white/10`}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {/* Title */}
                  {slides[currentIndex].title && (
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
                      {slides[currentIndex].title}
                    </h2>
                  )}

                  {/* Description */}
                  {slides[currentIndex].description && (
                    <p className="text-base md:text-lg text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
                      {slides[currentIndex].description}
                    </p>
                  )}

                  {/* Action Button */}
                  {slides[currentIndex].ctaText && slides[currentIndex].ctaLink && (
                    <motion.a
                      href={slides[currentIndex].ctaLink}
                      className="inline-flex items-center px-8 py-3 text-base font-medium text-white rounded-full transition-all duration-300 group"
                      style={{ backgroundColor: currentTheme.accent }}
                      variants={buttonVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {slides[currentIndex].ctaText}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2 group-hover:ml-3 transition-all duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.a>
                  )}
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        {showControls && slides.length > 1 && (
          <>
            {/* Control styles based on controlStyle prop */}
            {controlStyle !== 'dots-only' && (
              <>
                {/* Previous button */}
                <ControlButton 
                  direction="previous" 
                  onClick={() => handleSlideChange((currentIndex - 1 + slides.length) % slides.length)} 
                />

                {/* Next button */}
                <ControlButton 
                  direction="next" 
                  onClick={() => handleSlideChange((currentIndex + 1) % slides.length)} 
                />
              </>
            )}

            {/* Dot indicators */}
            {controlStyle !== 'arrows-only' && (
              <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, index) => (
                  <DotIndicator
                    key={index}
                    index={index}
                    isActive={currentIndex === index}
                    onClick={() => handleSlideChange(index)}
                  />
                ))}
              </div>
            )}

            {/* Progress bar for minimal layout */}
            {layout === 'minimal' && (
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10">
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: `${(currentIndex / (slides.length - 1)) * 100}%` }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.3, ease: "linear" }}
                ></motion.div>
              </div>
            )}
          </>
        )}

        {/* Slide counter for certain layouts */}
        {(['overlay-left', 'overlay-right', 'split'].includes(layout) || layout === 'minimal') && (
          <motion.div
            className={`absolute bottom-8 ${layout === 'overlay-right' || contentAlignment === 'right' ? 'left-8' : 'right-8'} flex items-center space-x-3 text-white z-10
              backdrop-blur-sm px-4 py-2 rounded-full bg-black/20 border border-white/10`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <span className="text-2xl font-medium">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="w-8 h-px bg-white/60"></span>
            <span className="text-base opacity-60">{String(slides.length).padStart(2, '0')}</span>
          </motion.div>
        )}
        
        {/* Content page indicator dots for left/right layouts */}
        {['overlay-left', 'overlay-right', 'split'].includes(layout) && showContents && (
          <div className={`absolute top-8 ${layout === 'overlay-right' ? 'left-8' : 'right-8'} flex flex-col gap-2 z-10`}>
            {slides.map((_, index) => (
              <motion.button
                key={index}
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: currentIndex === index ? 'white' : 'rgba(255, 255, 255, 0.4)',
                }}
                onClick={() => handleSlideChange(index)}
                aria-label={`Go to slide ${index + 1}`}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SimpleBanner;
