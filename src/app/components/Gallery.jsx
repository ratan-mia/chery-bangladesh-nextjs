import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Camera, ChevronLeft, ChevronRight, Info, X, ZoomIn, ZoomOut } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// Chery Bangladesh Design System colors
const theme = {
  // Primary colors from design system
  primary: {
    light: '#c4b19c',    // Primary Light
    main: '#8c735d',     // Primary 700
    dark: '#524336',     // Primary 900
    accent: '#b7a99a',   // Primary 800
  },
  // Neutral palette
  neutral: {
    black: '#000000',
    white: '#FFFFFF',
    gray900: '#111827',  // Used for headings and primary text
    gray600: '#4B5563',  // Used for body text
    gray500: '#6B7280',  // Used for secondary text
    gray200: '#E5E7EB',  // Used for borders
    gray100: '#F3F4F6',  // Used for background accents
  },
  // Supporting colors
  supporting: {
    success: '#10B981',  // Success Green
    warning: '#F59E0B',  // Warning Yellow
    error: '#EF4444',    // Error Red
  },
  // Overlay colors
  overlay: {
    light: 'rgba(255, 255, 255, 0.7)',
    dark: 'rgba(17, 24, 39, 0.7)',
  }
};

// Sample images using consistent placeholders with Chery Brand colors
const galleryImages = [
  { 
    src: 'https://placehold.co/1920x1080/c4b19c/524336?text=Tiggo+8+Pro+MAX', 
    alt: 'Chery Tiggo 8 Pro MAX', 
    caption: 'Tiggo 8 Pro MAX - Front Perspective',
    description: 'The Tiggo 8 Pro MAX showcases Chery\'s signature design language with its bold front grille and dynamic LED headlights, creating a commanding road presence with premium proportions.'
  },
  { 
    src: 'https://placehold.co/1920x1080/8c735d/FFFFFF?text=Tiggo+7+Pro', 
    alt: 'Chery Tiggo 7 Pro Side Profile', 
    caption: 'Tiggo 7 Pro - Elegant Side Profile',
    description: 'The sleek silhouette of the Tiggo 7 Pro emphasizes its athletic stance while maintaining elegant proportions that reflect premium craftsmanship and attention to detail.'
  },
  { 
    src: 'https://placehold.co/1920x1080/b7a99a/524336?text=Tiggo+4+Pro', 
    alt: 'Chery Tiggo 4 Pro', 
    caption: 'Tiggo 4 Pro - Urban Compact SUV',
    description: 'The Tiggo 4 Pro offers a perfect balance of style and functionality, with a compact footprint ideal for urban environments while retaining the confidence of an SUV.'
  },
  { 
    src: 'https://placehold.co/1920x1080/524336/FFFFFF?text=Premium+Interior', 
    alt: 'Chery Premium Interior', 
    caption: 'Premium Interior - Luxury Materials',
    description: 'The meticulously crafted interior combines premium materials with state-of-the-art technology, offering both comfort and convenience with a focus on driver and passenger experience.'
  },
  { 
    src: 'https://placehold.co/1920x1080/c4b19c/524336?text=Alloy+Wheels', 
    alt: 'Chery Premium Alloy Wheels', 
    caption: 'Exclusive Alloy Wheel Design',
    description: 'The exclusive alloy wheel design combines sophistication with sportiness, perfectly complementing the overall aesthetic while providing outstanding performance.'
  },
];

const CheryGallery = ({
  images = galleryImages,
  title = 'Experience Chery',
  subtitle = 'Premium Design & Innovation',
  description = 'Explore our gallery showcasing every detail of Chery vehicles, highlighting our commitment to elegant design, premium craftsmanship, and innovative technology.',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [loadedImages, setLoadedImages] = useState([]);
  const [direction, setDirection] = useState('next');
  const containerRef = useRef(null);
  const imageRefs = useRef([]);

  // Preload images for smoother transitions
  useEffect(() => {
    const preloadImages = () => {
      const newLoadedImages = [];
      images.forEach((image, index) => {
        const img = new Image();
        img.src = image.src;
        img.onload = () => {
          newLoadedImages[index] = true;
          setLoadedImages([...newLoadedImages]);
        };
      });
    };
    
    preloadImages();
  }, [images]);

  // Handle keyboard navigation - following Accessibility Guidelines
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          navigate('prev');
          break;
        case 'ArrowRight':
          navigate('next');
          break;
        case 'Escape':
          if (isFullscreen) setIsFullscreen(false);
          if (isInfoVisible) setIsInfoVisible(false);
          if (isZoomed) setIsZoomed(false);
          break;
        case 'i':
          setIsInfoVisible(!isInfoVisible);
          break;
        case 'z':
          setIsZoomed(!isZoomed);
          break;
        case 'f':
          setIsFullscreen(!isFullscreen);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isFullscreen, isInfoVisible, isZoomed, images.length]);

  // Navigation functions
  const navigate = (direction) => {
    if (direction === 'next') {
      setDirection('next');
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    } else {
      setDirection('prev');
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
    setIsZoomed(false);
  };

  const jumpToImage = (index) => {
    setDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
    setIsZoomed(false);
  };

  // Animation variants - using Purposeful Motion principle
  const slideVariants = {
    enter: (direction) => ({
      x: direction === 'next' ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction === 'next' ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  // Animation for info panel - using staggered children for elegant reveal
  const infoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3, // Fast transition per design guidelines
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.2 } // Fast transition per design guidelines
    }
  };

  // Fade in animation for initial content
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 } // Medium transition per design guidelines
    }
  };

  // Content image display - premium look preview section
  const FullWidthImagePreview = () => (
    <div className="relative w-full mb-20 px-4 md:px-0">
      <div className="max-w-6xl mx-auto">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg shadow-lg">
          <img 
            src={images[0].src} 
            alt={images[0].alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-primary-900/20 to-transparent">
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">
                {images[0].caption}
              </h3>
              <p className="text-white/80 max-w-lg">
                {images[0].description.substring(0, 100)}...
              </p>
              <button 
                className="mt-4 inline-flex items-center px-6 py-2 bg-primary-700 text-white font-medium rounded hover:bg-primary-800 transition-all duration-300"
                style={{ backgroundColor: theme.primary.main }}
                onClick={() => {
                  setCurrentIndex(0);
                  const galleryElement = document.getElementById('gallery-section');
                  if (galleryElement) {
                    galleryElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                View Gallery <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Thumbnails for featured display
  const FeaturedThumbnails = () => (
    <div className="w-full mb-12 px-4 md:px-0">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.slice(1).map((image, index) => (
            <div 
              key={index} 
              className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => {
                setCurrentIndex(index + 1);
                const galleryElement = document.getElementById('gallery-section');
                if (galleryElement) {
                  galleryElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 p-3">
                  <p className="text-white text-sm font-medium">
                    {image.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full font-sans" style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto' }}>
      {/* Full page experience with preview */}
      <div>
        {/* Header Section - Following Section Headers pattern */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center pt-16 pb-12 px-4"
        >
          <div className="max-w-4xl mx-auto">
            {/* Section title with highlighted part */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6" style={{ color: theme.neutral.gray900 }}>
              {title} <span style={{ color: theme.primary.dark }}>{subtitle}</span>
            </h2>
            
            {/* Decorative divider as in design guide */}
            <div className="w-24 h-1 bg-primary-700 mx-auto mb-8" style={{ backgroundColor: theme.primary.main }}></div>
            
            {/* Description text */}
            <p className="text-gray-600 text-lg max-w-3xl mx-auto" style={{ color: theme.neutral.gray600 }}>
              {description}
            </p>
          </div>
        </motion.div>

        {/* Featured image preview */}
        <FullWidthImagePreview />
        
        {/* Featured thumbnails */}
        <FeaturedThumbnails />
      </div>
      
      {/* Main gallery container */}
      <div 
        id="gallery-section"
        ref={containerRef}
        className={`w-full relative ${isFullscreen ? 'fixed inset-0 z-50' : 'relative'}`}
        style={{ 
          backgroundColor: theme.neutral.white,
          height: isFullscreen ? '100vh' : '90vh', 
          overflow: 'hidden',
        }}
      >
        {/* Main image display - Content Focus principle */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ 
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 } // Fast transition per design guidelines
            }}
            className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
            style={{ 
              cursor: isZoomed ? 'zoom-out' : 'zoom-in',
            }}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            {/* Gradient overlay for better text visibility */}
            <div 
              className="absolute inset-0 z-10 pointer-events-none"
              style={{ 
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.3) 100%)'
              }}
            />
            
            <div 
              className={`relative ${isZoomed ? 'cursor-zoom-out overflow-auto' : 'overflow-hidden'}`}
              style={{ 
                maxWidth: '100%',
                maxHeight: '100%',
                width: isZoomed ? '150%' : '100%',
                height: isZoomed ? '150%' : '100%',
                transition: 'width 0.3s ease, height 0.3s ease', // Medium transition per design guidelines
              }}
            >
              <img
                ref={el => imageRefs.current[currentIndex] = el}
                src={images[currentIndex].src}
                alt={images[currentIndex].alt || `Gallery image ${currentIndex + 1}`}
                className={`object-contain w-full h-full ${isZoomed ? 'scale-150' : 'scale-100'}`}
                style={{ 
                  transition: 'transform 0.5s ease', // Medium transition per design guidelines
                  opacity: loadedImages[currentIndex] ? 1 : 0.3,
                }}
              />
            </div>
            
            {/* Caption overlay - follows the design pattern for image captions */}
            {images[currentIndex].caption && !isInfoVisible && (
              <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-6">
                <div className="max-w-7xl mx-auto">
                  <h3 className="text-white text-xl md:text-2xl font-medium">
                    {images[currentIndex].caption}
                  </h3>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons - Primary Button style from design system */}
        <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4 md:px-6 pointer-events-none z-20">
          <button
            onClick={() => navigate('prev')}
            className="group inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md pointer-events-auto"
            style={{ 
              color: theme.primary.main,
              border: `1px solid ${theme.neutral.gray200}`,
              transition: 'all 0.2s ease', // Fast transition per design guidelines
            }}
            aria-label="Previous image"
          >
            <ChevronLeft 
              size={24} 
              className="transition-all duration-300" // Medium transition per design guidelines
            />
          </button>
          
          <button
            onClick={() => navigate('next')}
            className="group inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md pointer-events-auto"
            style={{ 
              color: theme.primary.main,
              border: `1px solid ${theme.neutral.gray200}`,
              transition: 'all 0.2s ease', // Fast transition per design guidelines
            }}
            aria-label="Next image"
          >
            <ChevronRight 
              size={24} 
              className="transition-all duration-300" // Medium transition per design guidelines
            />
          </button>
        </div>

        {/* Information panel - Feature Card pattern from design system */}
        <AnimatePresence>
          {isInfoVisible && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }} // Fast transition per design guidelines
              className="absolute bottom-0 left-0 right-0 z-20"
              style={{ 
                backgroundColor: theme.neutral.white,
                borderTop: `1px solid ${theme.neutral.gray200}`,
                boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
              }}
            >
              <motion.div 
                variants={infoVariants}
                initial="hidden"
                animate="visible"
                className="max-w-3xl mx-auto p-6 md:p-8"
              >
                {/* Top accent - from Feature Card pattern */}
                <div className="h-1 w-full mb-6" style={{ backgroundColor: theme.primary.accent, opacity: 0.4 }}></div>
                
                <motion.div variants={itemVariants} className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary-light bg-opacity-40 flex items-center justify-center rounded-full mr-3" 
                       style={{ backgroundColor: `${theme.primary.light}40` }}>
                    <Camera size={20} style={{ color: theme.primary.dark }} />
                  </div>
                  
                  <h3 className="text-xl font-bold" style={{ color: theme.neutral.gray900 }}>
                    {images[currentIndex].caption || 'Image Details'}
                  </h3>
                </motion.div>

                <motion.p 
                  variants={itemVariants}
                  className="text-base mb-6 leading-relaxed" 
                  style={{ color: theme.neutral.gray600 }}
                >
                  {images[currentIndex].description || 'No description available for this image.'}
                </motion.p>

                {/* Bottom accent line that fills on hover - from Feature Card pattern */}
                <div className="h-0.5 w-full bg-gray-200 mt-6">
                  <div className="h-full bg-primary-700 w-full" style={{ backgroundColor: theme.primary.main }}></div>
                </div>
                
                {/* Close button - using Tertiary Button style */}
                <motion.button
                  variants={itemVariants}
                  onClick={() => setIsInfoVisible(false)}
                  className="group inline-flex items-center text-sm font-medium mt-4 tracking-wider"
                  style={{ color: theme.primary.main }}
                >
                  CLOSE INFO
                  <X size={16} className="ml-2 group-hover:ml-3 transition-all duration-300" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls toolbar - using Secondary Button style */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 z-30 flex gap-2">
          <button
            onClick={() => setIsInfoVisible(!isInfoVisible)}
            className="inline-flex items-center justify-center p-2 rounded-full bg-white"
            style={{ 
              color: isInfoVisible ? theme.neutral.white : theme.primary.main,
              backgroundColor: isInfoVisible ? theme.primary.main : theme.neutral.white,
              border: `1px solid ${isInfoVisible ? theme.primary.main : theme.neutral.gray200}`,
              transition: 'all 0.2s ease', // Fast transition per design guidelines
            }}
            aria-label={isInfoVisible ? "Hide image information" : "Show image information"}
          >
            <Info size={18} />
          </button>
          
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="inline-flex items-center justify-center p-2 rounded-full bg-white"
            style={{ 
              color: isZoomed ? theme.neutral.white : theme.primary.main,
              backgroundColor: isZoomed ? theme.primary.main : theme.neutral.white,
              border: `1px solid ${isZoomed ? theme.primary.main : theme.neutral.gray200}`,
              transition: 'all 0.2s ease', // Fast transition per design guidelines
            }}
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          >
            {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
          </button>
          
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="inline-flex items-center justify-center p-2 rounded-full bg-white"
            style={{ 
              color: isFullscreen ? theme.neutral.white : theme.primary.main,
              backgroundColor: isFullscreen ? theme.primary.main : theme.neutral.white,
              border: `1px solid ${isFullscreen ? theme.primary.main : theme.neutral.gray200}`,
              transition: 'all 0.2s ease', // Fast transition per design guidelines
            }}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <X size={18} /> : <ArrowRight size={18} />}
          </button>
        </div>
        
        {/* Image counter */}
        <div 
          className="absolute top-4 left-4 md:top-6 md:left-6 px-3 py-1.5 z-20 rounded"
          style={{ 
            backgroundColor: theme.neutral.white,
            color: theme.primary.dark,
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            border: `1px solid ${theme.neutral.gray200}`,
          }}
        >
          <span className="text-sm font-medium">{currentIndex + 1} / {images.length}</span>
        </div>
      </div>

      {/* Thumbnail navigation - using Card pattern from design system */}
      <div className="absolute bottom-6 left-0 right-0 z-20 px-6">
        <div 
          className="mx-auto max-w-4xl overflow-x-auto py-4 px-6 hide-scrollbar rounded bg-white shadow-md"
          style={{ 
            scrollbarWidth: 'none',
            border: `1px solid ${theme.neutral.gray200}`,
          }}
        >
          <div className="flex gap-4 items-center justify-center">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => jumpToImage(index)}
                className="relative rounded overflow-hidden group"
                style={{ 
                  width: '80px',
                  height: '60px',
                  border: currentIndex === index 
                    ? `2px solid ${theme.primary.main}` 
                    : `1px solid ${theme.neutral.gray200}`,
                  transition: 'all 0.2s ease', // Fast transition per design guidelines
                  opacity: currentIndex === index ? 1 : 0.7,
                }}
              >
                <img 
                  src={image.src} 
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Top accent - from Feature Card pattern */}
                <div 
                  className="h-1 w-full absolute top-0" 
                  style={{ 
                    backgroundColor: theme.primary.accent, 
                    opacity: currentIndex === index ? 1 : 0.4,
                    transition: 'opacity 0.3s ease',
                  }}
                ></div>
                
                {/* Bottom accent line that fills on hover - from Feature Card pattern */}
                <div className="h-0.5 w-full bg-gray-200 absolute bottom-0">
                  <div 
                    className="h-full transition-all duration-700 ease-out" 
                    style={{ 
                      backgroundColor: theme.primary.main,
                      width: currentIndex === index ? '100%' : '0',
                    }}
                  ></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheryGallery;
