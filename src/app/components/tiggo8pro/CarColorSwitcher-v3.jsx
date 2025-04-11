'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const CarColorSwitcher = () => {
  // Enhanced color options with hex, rgb values and descriptions
  const colorOptions = [
    { 
      name: 'Phantom Gray', 
      bgColor: '#8A8A8A', 
      rgbColor: 'rgba(138, 138, 138, 1)',
      textColor: 'text-white', 
      imageUrl: '/images/tiggo8pro/colors/chery-gray.png',
      description: 'Sophisticated urban style with a modern edge',
      colorCode: 'G19'
    },
    { 
      name: 'Silver Blue', 
      bgColor: '#B8C5D6', 
      rgbColor: 'rgba(184, 197, 214, 1)',
      textColor: 'text-black', 
      imageUrl: '/images/tiggo8pro/colors/chery-silver-blue.png',
      description: 'Elegant blend of silver and blue for a distinctive look',
      colorCode: 'SB3'
    },
    { 
      name: 'Rhine Blue', 
      bgColor: '#162F9B',
      rgbColor: 'rgba(22, 47, 155, 1)', 
      textColor: 'text-white', 
      imageUrl: '/images/tiggo8pro/colors/chery-blue.png',
      description: 'Deep lustrous blue inspired by European landscapes',
      colorCode: 'RB5'
    },
    { 
      name: 'Khaki White', 
      bgColor: '#F5F5F5', 
      rgbColor: 'rgba(245, 245, 245, 1)',
      textColor: 'text-black', 
      imageUrl: '/images/tiggo8pro/colors/chery-pearl-white.png',
      description: 'Pure and pristine white with subtle warm undertones',
      colorCode: 'KW2'
    },
    { 
      name: 'Carbon Crystal Black', 
      bgColor: '#151B25', 
      rgbColor: 'rgba(21, 27, 37, 1)',
      textColor: 'text-white', 
      imageUrl: '/images/tiggo8pro/colors/chery-black.png',
      description: 'Profound depth with subtle mineral highlights',
      colorCode: 'CB1'
    },
  ]

  // State management
  const [selectedColor, setSelectedColor] = useState(colorOptions[2]) // Default to Rhine Blue
  const [previousColor, setPreviousColor] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [viewAngle, setViewAngle] = useState('side') // 'side', 'front', 'rear'
  const [hoverColor, setHoverColor] = useState(null)
  const [animationProgress, setAnimationProgress] = useState(0)
  const sectionRef = useRef(null)
  const timeoutRef = useRef(null)
  const animationRef = useRef(null)

  // Detect when component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.2 }
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

  // Animation progress for background transition
  useEffect(() => {
    if (isTransitioning && previousColor) {
      // Start animation
      setAnimationProgress(0)
      
      const startTime = Date.now()
      const duration = 1200 // 1.2 seconds
      
      const animateProgress = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        setAnimationProgress(progress)
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animateProgress)
        } else {
          // Animation complete
          setIsTransitioning(false)
          setPreviousColor(null)
        }
      }
      
      animationRef.current = requestAnimationFrame(animateProgress)
      
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }
  }, [isTransitioning, previousColor]);

  // Handle color change with proper transition state management
  const handleColorChange = (color) => {
    if (selectedColor.name !== color.name && !isTransitioning) {
      setPreviousColor(selectedColor)
      setIsTransitioning(true)
      setSelectedColor(color)
      
      // Clear any existing timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }

  // Calculate background style during transitions
  const getBgStyle = () => {
    if (!isTransitioning || !previousColor) {
      // Use rgba for better blending
      return { 
        backgroundColor: selectedColor.rgbColor,
        boxShadow: `inset 0 0 200px rgba(0,0,0,0.1)`
      }
    }
    
    // Calculate interpolated background color
    const colorStart = previousColor.rgbColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/)
    const colorEnd = selectedColor.rgbColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/)
    
    if (colorStart && colorEnd) {
      const r1 = parseInt(colorStart[1], 10)
      const g1 = parseInt(colorStart[2], 10)
      const b1 = parseInt(colorStart[3], 10)
      
      const r2 = parseInt(colorEnd[1], 10)
      const g2 = parseInt(colorEnd[2], 10)
      const b2 = parseInt(colorEnd[3], 10)
      
      const r = Math.round(r1 + (r2 - r1) * animationProgress)
      const g = Math.round(g1 + (g2 - g1) * animationProgress)
      const b = Math.round(b1 + (b2 - b1) * animationProgress)
      
      return { 
        backgroundColor: `rgba(${r}, ${g}, ${b}, 1)`,
        boxShadow: `inset 0 0 200px rgba(0,0,0,0.1)`,
        transition: 'background-color 0.05s linear'
      }
    }
    
    return { 
      backgroundColor: selectedColor.rgbColor,
      boxShadow: `inset 0 0 200px rgba(0,0,0,0.1)`
    }
  }

  // Get text color for the current background
  const getTextColorClass = () => {
    return selectedColor.textColor
  }

  // Animation variants with improved timing and easing
  const fadeVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1], // Custom easing curve for smoother motion
        opacity: { duration: 0.7 }
      }
    },
    exit: { 
      opacity: 0,
      scale: 1.05,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0]
      } 
    }
  }

  const slideVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1]
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
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  const colorNameVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.3 }
    }
  }

  const rotateVariants = {
    hidden: { rotateY: 90, opacity: 0 },
    visible: { 
      rotateY: 0, 
      opacity: 1,
      transition: { 
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: { 
      rotateY: -90, 
      opacity: 0,
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  // Get image URL based on selected color and view angle
  const getImageUrl = () => {
    // In a real implementation, you would have multiple angles for each color
    // For this example, we'll just use the side view
    return selectedColor.imageUrl;
  }

  return (
    <section 
      ref={sectionRef}
      className="w-full min-h-screen py-24 sm:py-32 md:py-40 px-4 md:px-8 lg:px-0 overflow-hidden relative" 
      style={{
        ...getBgStyle()
      }}
    >
      {/* CSS for transitions and effects */}
      <style jsx global>{`
        .color-dot {
          position: relative;
          cursor: pointer;
        }
        
        .color-dot::after {
          content: '';
          position: absolute;
          top: -6px;
          left: -6px;
          right: -6px;
          bottom: -6px;
          border-radius: 50%;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .color-dot:hover::after {
          opacity: 0.4;
          background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
        }
        
        .color-dot.active::after {
          opacity: 0.6;
          background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 0.4; }
          100% { transform: scale(1); opacity: 0.6; }
        }

        .angle-button {
          position: relative;
          overflow: hidden;
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
          background: rgba(0,0,0,0.25);
        }
        
        .car-shadow {
          filter: blur(25px);
          transform-origin: center;
          animation: shadowPulse 4s infinite ease-in-out;
        }
        
        @keyframes shadowPulse {
          0% { transform: scaleX(0.95); opacity: 0.6; }
          50% { transform: scaleX(1.05); opacity: 0.7; }
          100% { transform: scaleX(0.95); opacity: 0.6; }
        }
        
        .color-preview {
          transition: all 0.3s ease-out;
        }
        
        .color-preview:hover {
          transform: translateY(-5px);
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Car Image */}
          <div className="order-2 lg:order-1 flex flex-col items-center">
            <div className="relative h-96 sm:h-[450px] md:h-[550px] lg:h-[650px] xl:h-[700px] w-full perspective">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedColor.name}-${viewAngle}`}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={rotateVariants}
                  className="absolute inset-0 flex justify-center items-center"
                  style={{ 
                    perspective: '1500px',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Car image with enhanced shadows */}
                  <div className="relative w-full h-full">
                    <Image
                      src={getImageUrl()}
                      alt={`Chery SUV in ${selectedColor.name}`}
                      fill
                      className="object-contain drop-shadow-2xl"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                      quality={95}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Enhanced car shadow effect */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-8 bg-black/20 car-shadow rounded-full" />
              
              {/* View angle controls */}
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex bg-black/20 backdrop-blur-sm rounded-full overflow-hidden">
                <button 
                  className={`angle-button px-5 py-2.5 text-sm font-medium transition-all ${viewAngle === 'front' ? 'active' : ''} ${getTextColorClass()}`}
                  onClick={() => setViewAngle('front')}
                >
                  Front
                </button>
                <button 
                  className={`angle-button px-5 py-2.5 text-sm font-medium transition-all ${viewAngle === 'side' ? 'active' : ''} ${getTextColorClass()}`}
                  onClick={() => setViewAngle('side')}
                >
                  Side
                </button>
                <button 
                  className={`angle-button px-5 py-2.5 text-sm font-medium transition-all ${viewAngle === 'rear' ? 'active' : ''} ${getTextColorClass()}`}
                  onClick={() => setViewAngle('rear')}
                >
                  Rear
                </button>
              </div>
            </div>
            
            {/* Color Name Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedColor.name}
                variants={colorNameVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-4 bg-black/30 backdrop-blur-md px-6 py-2"
              >
                <h3 className={`text-xl font-medium ${getTextColorClass()}`}>
                  {selectedColor.name}
                </h3>
              </motion.div>
            </AnimatePresence>
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
                className={`text-3xl md:text-5xl font-medium ${getTextColorClass()} mb-6`}
              >
                Make a statement with <br/>
                <span className="font-bold">premium colors</span>
              </motion.h2>
              
              {/* Description */}
              <motion.div 
                variants={itemVariants}
                className="mb-8 relative min-h-[3rem]"
              >
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={selectedColor.name + '-desc'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className={`${getTextColorClass()}/80 text-lg`}
                  >
                    {selectedColor.description}
                  </motion.p>
                </AnimatePresence>
              </motion.div>
              
              {/* Color Code */}
              <motion.div 
                variants={itemVariants}
                className="mb-10"
              >
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={selectedColor.colorCode}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                    className={`inline-block ${getTextColorClass()}/90 text-sm font-mono py-1 px-3 border border-current`}
                  >
                    Color Code: {selectedColor.colorCode}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              
              {/* Color Options with Labels */}
              <motion.div 
                variants={containerVariants}
                className="mb-12"
              >
                <motion.h3 
                  variants={itemVariants}
                  className={`${getTextColorClass()}/80 text-sm uppercase tracking-wider mb-6`}
                >
                  Select a Color:
                </motion.h3>
                
                <div className="flex flex-wrap gap-8">
                  {colorOptions.map((color, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex flex-col items-center gap-2 relative"
                      onMouseEnter={() => setHoverColor(color)}
                      onMouseLeave={() => setHoverColor(null)}
                    >
                      <motion.button
                        onClick={() => handleColorChange(color)}
                        className={`w-12 h-12 rounded-full transition-all duration-300 shadow-md color-dot ${
                          selectedColor.name === color.name ? 'active ring-2 ring-white' : ''
                        }`}
                        style={{ backgroundColor: color.bgColor }}
                        aria-label={`Select ${color.name}`}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        animate={{ 
                          scale: selectedColor.name === color.name ? 1.1 : 1 
                        }}
                      />
                      
                      {/* Color preview tooltip on hover */}
                      <AnimatePresence>
                        {hoverColor === color && hoverColor.name !== selectedColor.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-md p-2 rounded z-10 w-32 pointer-events-none"
                          >
                            <p className="text-white text-xs text-center mb-1">
                              {color.name}
                            </p>
                            <div 
                              className="w-full h-1"
                              style={{ backgroundColor: color.bgColor }}
                            ></div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <span className={`text-xs font-medium ${getTextColorClass()}/80`}>
                        {color.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Call to Action */}
              <motion.div 
                variants={itemVariants}
                className="inline-block group"
              >
                <a 
                  href="#configure" 
                  className={`group flex items-center px-8 py-4 bg-black/20 hover:bg-black/30 ${getTextColorClass()} backdrop-blur-sm transition-all duration-300`}
                >
                  <span className="text-base font-medium">Configure Your Vehicle</span>
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2.5 transition-transform duration-300"
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
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
                  </motion.svg>
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