'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const CarColorSwitcher = () => {
  // Enhanced color options with improved hex, rgb values and descriptions
  const colorOptions = useMemo(() => [
    { 
      name: 'Phantom Gray', 
      bgColor: '#6B717A', 
      rgbColor: 'rgba(107, 113, 122, 1)',
      gradient: 'linear-gradient(145deg, #7a8185, #5d636b)',
      textColor: 'text-white', 
      images: {
        front: '/images/tiggo8pro/colors/chery-gray-front.png',
        side: '/images/tiggo8pro/colors/chery-gray.png',
        rear: '/images/tiggo8pro/colors/chery-gray-rear.png',
      },
      description: 'Sophisticated urban style with a modern edge',
      colorCode: 'G19'
    },
    { 
      name: 'Silver Blue', 
      bgColor: '#A8B8CF', 
      rgbColor: 'rgba(168, 184, 207, 1)',
      gradient: 'linear-gradient(145deg, #b6c6dd, #98aac1)',
      textColor: 'text-black', 
      images: {
        front: '/images/tiggo8pro/colors/chery-silver-blue-front.png',
        side: '/images/tiggo8pro/colors/chery-silver-blue.png',
        rear: '/images/tiggo8pro/colors/chery-silver-blue-rear.png',
      },
      description: 'Elegant blend of silver and blue for a distinctive look',
      colorCode: 'SB3'
    },
    { 
      name: 'Rhine Blue', 
      bgColor: '#1A3BB3', 
      rgbColor: 'rgba(26, 59, 179, 1)',
      gradient: 'linear-gradient(145deg, #2a4bc3, #0a2ba3)',
      textColor: 'text-white', 
      images: {
        front: '/images/tiggo8pro/colors/chery-blue-front.png',
        side: '/images/tiggo8pro/colors/chery-blue.png',
        rear: '/images/tiggo8pro/colors/chery-blue-rear.png',
      },
      description: 'Deep lustrous blue inspired by European landscapes',
      colorCode: 'RB5'
    },
    { 
      name: 'Khaki White', 
      bgColor: '#EAEDEF', 
      rgbColor: 'rgba(234, 237, 239, 1)',
      gradient: 'linear-gradient(145deg, #f8fbff, #dcdfe1)',
      textColor: 'text-black', 
      images: {
        front: '/images/tiggo8pro/colors/chery-pearl-white-front.png',
        side: '/images/tiggo8pro/colors/chery-pearl-white.png',
        rear: '/images/tiggo8pro/colors/chery-pearl-white-rear.png',
      },
      description: 'Pure and pristine white with subtle warm undertones',
      colorCode: 'KW2'
    },
    { 
      name: 'Carbon Crystal Black', 
      bgColor: '#0F1419', 
      rgbColor: 'rgba(15, 20, 25, 1)',
      gradient: 'linear-gradient(145deg, #1a1f25, #05090d)',
      textColor: 'text-white', 
      images: {
        front: '/images/tiggo8pro/colors/chery-black-front.png',
        side: '/images/tiggo8pro/colors/chery-black.png',
        rear: '/images/tiggo8pro/colors/chery-black-rear.png',
      },
      description: 'Profound depth with subtle mineral highlights',
      colorCode: 'CB1'
    },
  ], []);

  // State management with better defaults
  const [selectedColor, setSelectedColor] = useState(colorOptions[2]) // Default to Rhine Blue
  const [previousColor, setPreviousColor] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [viewAngle, setViewAngle] = useState('side') // 'side', 'front', 'rear'
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const sectionRef = useRef(null)

  // Detect when component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
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

  // Handle color change with proper transition state management
  const handleColorChange = useCallback((color) => {
    if (selectedColor.name !== color.name && !isTransitioning) {
      setPreviousColor(selectedColor)
      setIsTransitioning(true)
      setSelectedColor(color)
      setIsImageLoaded(false)
      
      // Reset transitioning state after animation completes
      setTimeout(() => setIsTransitioning(false), 800)
    }
  }, [selectedColor, isTransitioning]);

  // Handle view angle change
  const handleViewAngleChange = useCallback((angle) => {
    if (viewAngle !== angle) {
      setViewAngle(angle)
      setIsImageLoaded(false)
    }
  }, [viewAngle]);

  // Calculate background style during transitions with enhanced visual effects
  const getBgStyle = useCallback(() => {
    if (!isTransitioning || !previousColor) {
      // Use gradient background for more depth and dimension
      const isDark = selectedColor.textColor === 'text-white';
      
      return { 
        backgroundImage: selectedColor.gradient,
        boxShadow: isDark 
          ? `inset 0 0 200px rgba(0,0,0,0.25), inset 0 0 100px rgba(255,255,255,0.05)` 
          : `inset 0 0 200px rgba(0,0,0,0.05), inset 0 0 100px rgba(255,255,255,0.1)`
      }
    }
    
    // More dynamic transition between colors
    return {
      backgroundImage: `linear-gradient(to right, ${previousColor.rgbColor}, ${selectedColor.rgbColor})`,
      backgroundSize: '200% 100%',
      backgroundPosition: '0% 50%',
      animation: 'gradientShift 1.2s ease forwards',
      boxShadow: `inset 0 0 200px rgba(0,0,0,0.15), inset 0 0 100px rgba(255,255,255,0.05)`
    }
  }, [isTransitioning, previousColor, selectedColor]);

  // Get text color for the current background
  const getTextColorClass = useCallback(() => {
    return selectedColor.textColor
  }, [selectedColor]);

  // Get image URL based on selected color and view angle
  const getImageUrl = useCallback(() => {
    return selectedColor.images[viewAngle] || selectedColor.images.side;
  }, [selectedColor, viewAngle]);

  // Handle image loading state
  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);
  }, []);

  // Animation variants
  const fadeVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    },
    exit: { 
      opacity: 0,
      scale: 1.02,
      transition: { 
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0]
      } 
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="w-full py-16 md:py-24 px-4 md:px-8 lg:px-0 overflow-hidden relative" 
      style={{
        ...getBgStyle(),
        transition: "background-color 0.8s ease-in-out"
      }}
    >
      {/* CSS for enhanced transitions and effects */}
      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        
        @keyframes bgPulse {
          0% { background-size: 100% 100%; }
          50% { background-size: 110% 110%; }
          100% { background-size: 100% 100%; }
        }
        
        .color-dot {
          position: relative;
          cursor: pointer;
          transform-origin: center;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
        
        .color-dot::after {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border-radius: 50%;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .color-dot:hover::after {
          opacity: 0.4;
          background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
        }
        
        .color-dot.active {
          transform: scale(1.15);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
          border: 2px solid rgba(255, 255, 255, 0.8);
        }
        
        .color-dot.active::after {
          opacity: 0.6;
          background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%);
        }

        .angle-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }

        .angle-button::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255,255,255,0.1);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .angle-button:hover::after {
          opacity: 1;
        }

        .angle-button.active {
          color: #fff;
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.2);
          box-shadow: 0 0 10px rgba(0,0,0,0.2);
        }
        
        /* Pulse animation for loading state */
        @keyframes imagePulse {
          0% { opacity: 0.7; filter: blur(3px); }
          50% { opacity: 0.9; filter: blur(1px); }
          100% { opacity: 0.7; filter: blur(3px); }
        }
        
        .image-loading {
          animation: imagePulse 1.5s ease-in-out infinite;
        }
        
        /* Enhanced gradient for buttons */
        .cta-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg, 
            transparent, 
            rgba(255, 255, 255, 0.3), 
            transparent
          );
          transition: left 0.7s ease;
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        }
        
        .cta-button:hover::before {
          left: 100%;
        }
        
        /* Color highlight effect */
        .color-name-highlight {
          position: relative;
          display: inline-block;
        }
        
        .color-name-highlight::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: currentColor;
          opacity: 0.3;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }
        
        .color-name-highlight.active::after {
          transform: scaleX(1);
          transform-origin: left;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Car Image */}
          <div className="order-2 lg:order-1">
            <div className="relative h-80 md:h-96 lg:h-[500px] xl:h-[550px] w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedColor.name}-${viewAngle}`}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeVariants}
                  className={`absolute inset-0 flex justify-center items-center ${!isImageLoaded ? 'image-loading' : ''}`}
                >
                  {/* Car image with enhanced shadows */}
                  <div className="relative w-full h-full">
                    <Image
                      src={getImageUrl()}
                      alt={`Chery SUV in ${selectedColor.name}, ${viewAngle} view`}
                      fill
                      className="object-contain drop-shadow-2xl"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                      quality={90}
                      onLoad={handleImageLoad}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Car shadow effect - more natural with dynamic color-aware radial gradient */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 max-w-3xl h-8 mx-auto rounded-full z-0 hidden md:block" 
                style={{
                  background: `radial-gradient(ellipse, ${
                    selectedColor.textColor === 'text-white' 
                      ? 'rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 80%' 
                      : 'rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 80%'
                  })`,
                  filter: 'blur(8px)',
                  transition: 'background 0.8s ease-in-out'
                }}
              />
              
              {/* View angle controls - enhanced with icons */}
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex bg-black/20 backdrop-blur-sm rounded-full overflow-hidden">
                <button 
                  className={`angle-button px-4 py-2 text-sm font-medium transition-all flex items-center gap-1 ${viewAngle === 'front' ? 'active' : ''} ${getTextColorClass()}`}
                  onClick={() => handleViewAngleChange('front')}
                  aria-label="Front view"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                  </svg>
                  <span>Front</span>
                </button>
                <button 
                  className={`angle-button px-4 py-2 text-sm font-medium transition-all flex items-center gap-1 ${viewAngle === 'side' ? 'active' : ''} ${getTextColorClass()}`}
                  onClick={() => handleViewAngleChange('side')}
                  aria-label="Side view"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>Side</span>
                </button>
                <button 
                  className={`angle-button px-4 py-2 text-sm font-medium transition-all flex items-center gap-1 ${viewAngle === 'rear' ? 'active' : ''} ${getTextColorClass()}`}
                  onClick={() => handleViewAngleChange('rear')}
                  aria-label="Rear view"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" />
                  </svg>
                  <span>Rear</span>
                </button>
              </div>
              
              {/* 360 rotation indicator */}
              <div className="absolute top-0 right-0 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1 m-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                </svg>
                <span className={getTextColorClass()}>360° View</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Color Info and Selection */}
          <div className="order-1 lg:order-2">
            <motion.div 
              className="max-w-lg"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {/* Overline */}
              <motion.div 
                variants={itemVariants}
                className="mb-1"
              >
                <span className={`uppercase tracking-wider text-sm font-medium ${getTextColorClass()}/70`}>
                  Exterior Color Options
                </span>
              </motion.div>
              
              {/* Heading */}
              <motion.h2 
                variants={itemVariants}
                className={`text-3xl md:text-4xl font-medium ${getTextColorClass()} mb-4`}
              >
                Make a statement with <br/>
                <span className="font-bold">premium colors</span>
              </motion.h2>
              
              {/* Description with color name */}
              <motion.p 
                variants={itemVariants}
                className={`${getTextColorClass()}/80 text-lg mb-4`}
              >
                <span className="font-semibold text-xl">{selectedColor.name}:</span> {selectedColor.description}
              </motion.p>
              
              {/* Color Code with enhanced color swatch */}
              <motion.div 
                variants={itemVariants}
                className="mb-8 flex items-center gap-3"
              >
                <div className={`inline-block ${getTextColorClass()}/90 text-sm font-mono py-1 px-3 border border-current rounded-md backdrop-blur-sm bg-black/5`}>
                  Color Code: {selectedColor.colorCode}
                </div>
                <div 
                  className="w-8 h-8 rounded-full shadow-lg border border-white/50" 
                  style={{ 
                    background: selectedColor.gradient || selectedColor.bgColor,
                    boxShadow: `inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.3)` 
                  }}
                />
              </motion.div>
              
              {/* Color Options with Labels */}
              <motion.div 
                variants={containerVariants}
                className="mb-12"
              >
                <motion.h3 
                  variants={itemVariants}
                  className={`${getTextColorClass()}/80 text-sm uppercase tracking-wider mb-4`}
                >
                  Select a Color:
                </motion.h3>
                
                <div className="flex flex-wrap gap-6">
                  {colorOptions.map((color, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex flex-col items-center gap-2"
                    >
                      <motion.button
                        onClick={() => handleColorChange(color)}
                        className={`w-12 h-12 rounded-full transition-all duration-300 shadow-lg color-dot ${
                          selectedColor.name === color.name ? 'active' : ''
                        }`}
                        style={{ 
                          background: color.gradient || color.bgColor,
                          boxShadow: `0 4px 8px rgba(0,0,0,0.2), inset 0 2px 3px rgba(255,255,255,0.2)`
                        }}
                        aria-label={`Select ${color.name}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      />
                      <span className={`text-xs font-medium ${getTextColorClass()}/90 color-name-highlight ${
                        selectedColor.name === color.name ? 'active' : ''
                      }`}>
                        {color.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Call to Action */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a 
                  href="#configure" 
                  className={`inline-flex items-center justify-center px-6 py-3 bg-black/20 hover:bg-black/30 ${getTextColorClass()} backdrop-blur-sm rounded-md transition-all duration-300 cta-button`}
                >
                  <span>Configure Your Vehicle</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3" 
                    />
                  </svg>
                </a>
                
                <a 
                  href="#test-drive" 
                  className={`inline-flex items-center justify-center px-6 py-3 border border-current ${getTextColorClass()}/80 hover:${getTextColorClass()} backdrop-blur-sm rounded-md transition-all duration-300`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
                    />
                  </svg>
                  <span>Schedule a Test Drive</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CarColorSwitcher