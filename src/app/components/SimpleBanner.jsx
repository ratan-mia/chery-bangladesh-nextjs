'use client'

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const SimpleBanner = ({
  slides = [],
  accentColor = '#8c735d', // Primary 700 from Chery design system
  textColor = '#94705f', // Gray 900
  autoplayInterval = 5000,
  height = '600px',
  showControls = true,
  showContents = false,
  onSlideChange = null,
  sectionTitle = '',
  sectionSubtitle = '',
  sectionText = '',
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
  const sectionRef = useRef(null);
  const slideRef = useRef(null);
  const videoRefs = useRef({});

  // Color theme
  const colors = {
    light: {
      background: backgroundColor,
      text: textColor,
      textSecondary: '#4B5563', // Gray 600
      accent: accentColor,
      overlay: 'rgba(0,0,0,0.4)'
    },
    dark: {
      background: '#111827',
      text: '#F9FAFB',
      textSecondary: '#E5E7EB',
      accent: accentColor,
      overlay: 'rgba(0,0,0,0.6)'
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

  // Handle video playback when slide changes
  useEffect(() => {
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
            console.error("Auto-play prevented:", error);
            // You could show a play button here if auto-play is blocked
          });
        }
      }, 50);
    }
  }, [currentIndex, slides]);

  // Autoplay functionality
  useEffect(() => {
    if (pauseOnHover && isHovering) return;

    const interval = setInterval(() => {
      const newIndex = (currentIndex + 1) % slides.length;
      setCurrentIndex(newIndex);
      if (onSlideChange && typeof onSlideChange === 'function') {
        onSlideChange(newIndex);
      }
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [slides.length, autoplayInterval, currentIndex, onSlideChange, isHovering, pauseOnHover]);

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
    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchmove', handleTouchMove);
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentIndex, slides.length, touchStart, touchEnd]);

  // Navigation functions
  const handleSlideChange = (index) => {
    setCurrentIndex(index);
    if (onSlideChange && typeof onSlideChange === 'function') {
      onSlideChange(index);
    }
  };

  // Animation variants
  const slideVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.3 }
    },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 }
    }
  };

  // Layout configuration
  const layoutConfig = {
    standard: {
      container: 'w-full',
      contentPosition: 'absolute inset-0 flex flex-col items-center justify-center p-8 text-center',
      headerPosition: '',
      headerWidth: 'max-w-7xl mx-auto px-4 sm:px-6',
      imageOverlay: 'absolute inset-0',
      imagePosition: 'w-full h-full',
    },
    split: {
      container: 'w-full lg:flex lg:flex-row',
      contentPosition: 'lg:w-1/2 lg:static absolute inset-0 flex flex-col items-start justify-center p-8 lg:p-12 text-left',
      headerPosition: 'lg:order-1',
      headerWidth: 'max-w-xl',
      imageOverlay: 'absolute inset-0 lg:static lg:w-1/2 lg:order-2',
      imagePosition: 'w-full h-full',
    },
    'overlay-left': {
      container: 'w-full',
      contentPosition: 'absolute inset-0 flex flex-col items-start justify-center p-8 lg:pl-16 text-left',
      headerPosition: '',
      headerWidth: 'max-w-xl',
      imageOverlay: 'absolute inset-0',
      imagePosition: 'w-full h-full',
    },
    'overlay-right': {
      container: 'w-full',
      contentPosition: 'absolute inset-0 flex flex-col items-end justify-center p-8 lg:pr-16 text-right',
      headerPosition: '',
      headerWidth: 'max-w-xl ml-auto',
      imageOverlay: 'absolute inset-0',
      imagePosition: 'w-full h-full',
    },
    minimal: {
      container: 'w-full',
      contentPosition: 'absolute inset-0 flex flex-col items-center justify-center p-8 text-center',
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

  // Get current layout config
  const currentLayout = layoutConfig[layout] || layoutConfig.standard;
  const contentWidthClass = contentWidthClasses[contentWidth] || contentWidthClasses.medium;
  const alignmentClass = contentAlignmentClasses[contentAlignment] || contentAlignmentClasses.center;

  // Overlay style based on layout
  const getOverlayStyle = () => {
    switch (layout) {
      case 'overlay-left':
        return 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)';
      case 'overlay-right':
        return 'linear-gradient(270deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)';
      default:
        return currentTheme.overlay;
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`w-full overflow-hidden ${theme === 'dark' ? 'text-white' : ''}`}
      style={{ backgroundColor: currentTheme.background }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Section Header - Only shown if sectionTitle is provided */}
      {sectionTitle && (
        <div className={`container mx-auto px-4 pt-8 pb-4 md:pt-12 md:pb-8 ${currentLayout.headerPosition}`}>
          <div className={currentLayout.headerWidth}>
            <div className="relative">
              {/* Subtitle */}
              {sectionSubtitle && (
                <motion.h3
                  className="text-xl md:text-2xl font-medium mt-4"
                  variants={sectionVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  style={{ color: currentTheme.accent }}
                >
                  {sectionSubtitle}
                </motion.h3>
              )}

              {/* Subtle horizontal accent line */}
              <motion.div
                className="absolute top-10 left-0 h-px bg-gradient-to-r"
                style={{
                  backgroundImage: `linear-gradient(to right, ${currentTheme.accent} 0%, ${currentTheme.accent}40 100%)`,
                  width: isInView ? '100px' : '0px',
                  transition: 'width 0.8s ease-out 0.2s'
                }}
              ></motion.div>
              {/* Title with subtle accent line */}
              <motion.h2
                className="text-4xl md:text-5xl mt-5 text-primary-700 font-bold mb-6"
                variants={sectionVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ color: currentTheme.text }}
              >
                {sectionTitle}
              </motion.h2>


              {/* Description text */}
              {sectionText && (
                <motion.p
                  className="text-2xl md:text-xl max-w-3xl mt-6"
                  variants={sectionVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  style={{ color: currentTheme.textSecondary }}
                >
                  {sectionText}
                </motion.p>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Banner/Slider container */}
      <div
        ref={slideRef}
        className={`relative overflow-hidden ${currentLayout.container} ${fullWidth ? '' : 'container mx-auto px-4'}`}
        style={{ height: layout === 'split' ? 'auto' : height }}
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
          >
            <div className={`relative ${currentLayout.imagePosition}`}>
              {/* Background Media (Image or Video) */}
              {slides[currentIndex].videoSrc ? (
                <video
                  ref={ref => videoRefs.current[currentIndex] = ref}
                  src={slides[currentIndex].videoSrc}
                  className="object-cover w-full h-full"
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
                  className="object-cover"
                  sizes={layout === 'split' ? "(max-width: 1023px) 100vw, 50vw" : "100vw"}
                  quality={90}
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
              <div className={`${currentLayout.contentPosition} ${alignmentClass}`}>
                <motion.div
                  className={contentWidthClass}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {/* Title */}
                  {slides[currentIndex].title && (
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                      {slides[currentIndex].title}
                    </h2>
                  )}

                  {/* Description */}
                  {slides[currentIndex].description && (
                    <p className="text-lg md:text-xl text-white mb-8">
                      {slides[currentIndex].description}
                    </p>
                  )}

                  {/* Action Button */}
                  {slides[currentIndex].ctaText && slides[currentIndex].ctaLink && (
                    <a
                      href={slides[currentIndex].ctaLink}
                      className="inline-flex items-center px-10 py-4 text-base font-medium text-white transition-all duration-300 group"
                      style={{ backgroundColor: currentTheme.accent }}
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
                    </a>
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
                <button
                  className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white transition-all duration-300 ${controlStyle === 'minimal' ? 'bg-transparent border border-white/30 hover:bg-white/10' : ''}`}
                  style={{ backgroundColor: controlStyle === 'minimal' ? 'transparent' : currentTheme.accent }}
                  onClick={() => handleSlideChange((currentIndex - 1 + slides.length) % slides.length)}
                  aria-label="Previous slide"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Next button */}
                <button
                  className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white transition-all duration-300 ${controlStyle === 'minimal' ? 'bg-transparent border border-white/30 hover:bg-white/10' : ''}`}
                  style={{ backgroundColor: controlStyle === 'minimal' ? 'transparent' : currentTheme.accent }}
                  onClick={() => handleSlideChange((currentIndex + 1) % slides.length)}
                  aria-label="Next slide"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Dot indicators */}
            {controlStyle !== 'arrows-only' && (
              <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className="transition-all duration-300"
                    style={{
                      backgroundColor: currentIndex === index ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)',
                      width: currentIndex === index ? '24px' : '8px',
                      height: '2px',
                    }}
                    onClick={() => handleSlideChange(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Progress bar for minimal layout */}
            {layout === 'minimal' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div
                  className="h-full bg-white transition-all duration-300 ease-linear"
                  style={{
                    width: `${((currentIndex + 1) / slides.length) * 100}%`,
                  }}
                ></div>
              </div>
            )}
          </>
        )}

        {/* Slide counter for certain layouts */}
        {['overlay-left', 'overlay-right', 'split'].includes(layout) && (
          <div
            className={`absolute bottom-6 ${layout === 'overlay-right' || contentAlignment === 'right' ? 'left-6' : 'right-6'} flex items-center space-x-2 text-white`}
          >
            <span className="text-2xl font-medium">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="w-8 h-px bg-white/60"></span>
            <span className="text-base opacity-60">{String(slides.length).padStart(2, '0')}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default SimpleBanner;