'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const CarColorSwitcher = () => {
  // Enhanced color options with improved hex values from design system
  const colorOptions = useMemo(() => [
    { 
      name: 'Phantom Gray', 
      bgColor: '#6B717A', 
      gradient: 'linear-gradient(145deg, #7a8185, #5d636b)',
      textColor: 'text-white', 
      image: '/images/tiggo8pro/colors/chery-gray.png',
      description: 'Sophisticated urban style with a modern edge',
      colorCode: 'G19'
    },
    { 
      name: 'Silver Blue', 
      bgColor: '#A8B8CF', 
      gradient: 'linear-gradient(145deg, #b6c6dd, #98aac1)',
      textColor: 'text-gray-900', 
      image: '/images/tiggo8pro/colors/chery-silver-blue.png',
      description: 'Elegant blend of silver and blue for a distinctive look',
      colorCode: 'SB3'
    },
    { 
      name: 'Rhine Blue', 
      bgColor: '#1A3BB3', 
      gradient: 'linear-gradient(145deg, #2a4bc3, #0a2ba3)',
      textColor: 'text-white', 
      image: '/images/tiggo8pro/colors/chery-blue.png',
      description: 'Deep lustrous blue inspired by European landscapes',
      colorCode: 'RB5'
    },
    { 
      name: 'Khaki White', 
      bgColor: '#EAEDEF', 
      gradient: 'linear-gradient(145deg, #f8fbff, #dcdfe1)',
      textColor: 'text-gray-900', 
      image: '/images/tiggo8pro/colors/chery-pearl-white.png',
      description: 'Pure and pristine white with subtle warm undertones',
      colorCode: 'KW2'
    },
    { 
      name: 'Carbon Crystal Black', 
      bgColor: '#0F1419', 
      gradient: 'linear-gradient(145deg, #1a1f25, #05090d)',
      textColor: 'text-white', 
      image: '/images/tiggo8pro/colors/chery-black.png',
      description: 'Profound depth with subtle mineral highlights',
      colorCode: 'CB1'
    },
  ], []);

  // State management with default to Rhine Blue
  const [selectedColor, setSelectedColor] = useState(colorOptions[3])
  const [previousColor, setPreviousColor] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isInView, setIsInView] = useState(false)
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

  // Calculate background style during transitions with enhanced visual effects
  const getBgStyle = useCallback(() => {
    if (!isTransitioning || !previousColor) {
      return { 
        backgroundImage: selectedColor.gradient,
        boxShadow: 'inset 0 0 200px rgba(0,0,0,0.15), inset 0 0 100px rgba(255,255,255,0.05)'
      }
    }
    
    // Dynamic transition between colors
    return {
      backgroundImage: `linear-gradient(to right, ${previousColor.bgColor}, ${selectedColor.bgColor})`,
      backgroundSize: '200% 100%',
      backgroundPosition: '0% 50%',
      animation: 'gradientShift 1.2s ease forwards',
      boxShadow: 'inset 0 0 200px rgba(0,0,0,0.15), inset 0 0 100px rgba(255,255,255,0.05)'
    }
  }, [isTransitioning, previousColor, selectedColor]);

  // Get text color for the current background
  const getTextColorClass = useCallback(() => {
    return selectedColor.textColor
  }, [selectedColor]);

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
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    },
    exit: { 
      opacity: 0,
      scale: 1.02,
      transition: { 
        duration: 0.4,
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
        
        /* Color name effect */
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
        {/* Section heading using the design system patterns */}
        <div className="text-center mb-12">
          <span className={`uppercase tracking-wider text-sm font-medium ${getTextColorClass()}/70`}>
            Exterior Finish Options
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold ${getTextColorClass()} mt-2 mb-4`}>
            Choose Your <span className="text-primary-900">Perfect Color</span>
          </h2>
          <div className="w-24 h-1 bg-primary-700 mx-auto mb-6"></div>
          <p className={`${getTextColorClass()}/80 text-lg max-w-2xl mx-auto`}>
            Make a statement with our premium color options, each carefully crafted to enhance the vehicle's elegant lines and sophisticated design.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Car Image */}
          <div>
            <div className="relative h-64 md:h-80 lg:h-[450px] w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedColor.name}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeVariants}
                  className={`absolute inset-0 flex justify-center items-center ${!isImageLoaded ? 'image-loading' : ''}`}
                >
                  {/* Car image with enhanced shadows */}
                  <div className="relative w-full h-full">
                    <Image
                      src={selectedColor.image}
                      alt={`Chery SUV in ${selectedColor.name}`}
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
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 max-w-2xl h-8 mx-auto z-0 hidden md:block" 
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
            </div>
          </div>
          
          {/* Right Column - Color Info and Selection */}
          <div>
            <motion.div 
              className="max-w-lg"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {/* Color name and description */}
              <motion.div 
                variants={itemVariants}
                className="bg-white/90 backdrop-blur-sm border-l-2 border-primary-700 p-6 shadow-sm mb-8"
              >
                <div className="flex items-center mb-4">
                  <div 
                    className="w-8 h-8 rounded-full shadow-md border border-white/50 mr-3" 
                    style={{ 
                      background: selectedColor.gradient || selectedColor.bgColor,
                      boxShadow: `inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.3)` 
                    }}
                  />
                  <span className="text-gray-900 font-medium text-xl">{selectedColor.name}</span>
                </div>
                <p className="text-gray-600 mb-3">{selectedColor.description}</p>
                <div className="inline-block text-xs font-mono py-1 px-2 border border-gray-200 text-gray-600">
                  Color Code: {selectedColor.colorCode}
                </div>
              </motion.div>
              
              {/* Color Options */}
              <motion.div 
                variants={itemVariants}
                className="mb-8"
              >
                <h3 className="text-primary-900 font-medium mb-4 uppercase tracking-wider text-sm">
                  Select Exterior Color:
                </h3>
                
                <div className="flex flex-wrap gap-6">
                  {colorOptions.map((color, index) => (
                    <div
                      key={index}
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
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Call to Action - using the design system button patterns */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a 
                  href="#configure" 
                  className="group inline-flex items-center px-10 py-4 bg-primary-700 text-white font-medium hover:bg-primary-900 transition-all duration-300 cta-button"
                >
                  Configure Your Vehicle
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2 group-hover:ml-3 transition-all duration-300" 
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
                  href="#dealerships" 
                  className="inline-flex items-center justify-center bg-transparent border border-primary-700 text-primary-700 hover:text-white hover:bg-primary-700 px-6 py-4 font-medium transition-colors duration-300"
                >
                  Find Dealership
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