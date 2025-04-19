'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
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
      colorCode: 'G19',
      interiorPair: 'Black Leather with Silver Accents'
    },
    { 
      name: 'Silver Blue', 
      bgColor: '#A8B8CF', 
      gradient: 'linear-gradient(145deg, #b6c6dd, #98aac1)',
      textColor: 'text-gray-900', 
      image: '/images/tiggo8pro/colors/chery-silver-blue.png',
      description: 'Elegant blend of silver and blue for a distinctive look',
      colorCode: 'SB3',
      interiorPair: 'Gray/Blue Two-Tone Leather'
    },
    { 
      name: 'Rhine Blue', 
      bgColor: '#1A3BB3', 
      gradient: 'linear-gradient(145deg, #2a4bc3, #0a2ba3)',
      textColor: 'text-white', 
      image: '/images/tiggo8pro/colors/chery-blue.png',
      description: 'Deep lustrous blue inspired by European landscapes',
      colorCode: 'RB5',
      interiorPair: 'Navy/Black Premium Leather'
    },
    { 
      name: 'Khaki White', 
      bgColor: '#EAEDEF', 
      gradient: 'linear-gradient(145deg, #f8fbff, #dcdfe1)',
      textColor: 'text-gray-900', 
      image: '/images/tiggo8pro/colors/chery-pearl-white.png',
      description: 'Pure and pristine white with subtle warm undertones',
      colorCode: 'KW2',
      interiorPair: 'Beige Premium Leather'
    },
    { 
      name: 'Carbon Crystal Black', 
      bgColor: '#0F1419', 
      gradient: 'linear-gradient(145deg, #1a1f25, #05090d)',
      textColor: 'text-white', 
      image: '/images/tiggo8pro/colors/chery-black.png',
      description: 'Profound depth with subtle mineral highlights',
      colorCode: 'CB1',
      interiorPair: 'Red/Black Sport Leather'
    },
  ], []);

  // State management with default to Khaki White
  const [selectedColor, setSelectedColor] = useState(colorOptions[3])
  const [previousColor, setPreviousColor] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [viewMode, setViewMode] = useState('side') // 'side', 'front', 'rear'
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

  // Handle view change
  const handleViewChange = useCallback((view) => {
    if (viewMode !== view) {
      setViewMode(view)
      setIsImageLoaded(false)
    }
  }, [viewMode]);

  // Calculate background style during transitions with enhanced visual effects
  const getBgStyle = useCallback(() => {
    // Soft gradient background that complements current color
    const lightVariant = selectedColor.textColor === 'text-white' 
      ? 'rgba(20, 20, 20, 0.95)' 
      : 'rgba(245, 245, 245, 0.95)';
    
    const darkVariant = selectedColor.textColor === 'text-white'
      ? 'rgba(10, 10, 10, 0.98)'
      : 'rgba(230, 230, 230, 0.98)';
      
    return {
      background: `linear-gradient(170deg, ${lightVariant} 0%, ${darkVariant} 100%)`,
      transition: "background 0.8s ease-in-out",
      boxShadow: 'inset 0 0 100px rgba(0,0,0,0.1)'
    }
  }, [selectedColor]);

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

  const slideFromRightVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="w-full py-16 md:py-24 px-4 md:px-8 lg:px-0 overflow-hidden relative" 
      style={getBgStyle()}
    >
      {/* CSS for enhanced transitions and effects */}
      <style jsx global>{`
        .color-swatch {
          position: relative;
          cursor: pointer;
          transform-origin: center;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), border 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .color-swatch:hover {
          transform: translateY(-2px);
        }
        
        .color-swatch.active {
          transform: translateY(-4px);
          border: 1px solid rgba(255, 255, 255, 0.8);
        }
        
        .color-swatch.active::before {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background-color: #8c735d;
        }
        
        /* Improved image loading animation */
        @keyframes imageFadeIn {
          0% { opacity: 0; filter: blur(10px); }
          100% { opacity: 1; filter: blur(0px); }
        }
        
        .image-loaded {
          animation: imageFadeIn 0.8s ease-out forwards;
        }
        
        /* Underline animation for buttons */
        .view-button {
          position: relative;
        }
        
        .view-button::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          height: 1px;
          width: 0;
          background-color: currentColor;
          transition: width 0.3s ease;
        }
        
        .view-button.active::after,
        .view-button:hover::after {
          width: 100%;
        }
        
        /* Car rotation effect */
        .car-rotate-container {
          perspective: 1000px;
        }
        
        .car-rotate {
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .car-rotate.view-front {
          transform: rotateY(15deg);
        }
        
        .car-rotate.view-side {
          transform: rotateY(0deg);
        }
        
        .car-rotate.view-rear {
          transform: rotateY(-15deg);
        }
        
        /* Color info tab style */
        .color-info-tab {
          position: relative;
        }
        
        .color-info-tab::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 2px;
          height: 100%;
          background: #8c735d;
        }
        
        /* Custom track for specifications */
        .spec-track::-webkit-scrollbar {
          height: 4px;
        }
        
        .spec-track::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .spec-track::-webkit-scrollbar-thumb {
          background: #8c735d;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Section heading using the design system patterns */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 border-l-2 border-primary-700 mb-3">
            <span className={`uppercase tracking-wider text-sm font-medium ${getTextColorClass()}/70`}>
              Personalize Your Tiggo 8 Pro
            </span>
          </div>
          <h2 className={`text-3xl md:text-4xl font-bold ${getTextColorClass()} mb-4`}>
            Exterior <span className="text-primary-700">Color Selection</span>
          </h2>
          <div className="w-24 h-1 bg-primary-700 mx-auto mb-6"></div>
          <p className={`${getTextColorClass()}/80 text-lg max-w-2xl mx-auto`}>
            Each color has been meticulously developed to accentuate the vehicle's confident stance and refined character.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {/* Color swatches top bar */}
          <div className="w-full bg-black/5 backdrop-blur-sm p-5 border-l-2 border-primary-700">
            <div className="flex justify-center flex-wrap gap-8">
              {colorOptions.map((color, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-3"
                >
                  <motion.button
                    onClick={() => handleColorChange(color)}
                    className={`w-16 h-8 color-swatch ${
                      selectedColor.name === color.name ? 'active' : ''
                    }`}
                    style={{ 
                      background: color.gradient || color.bgColor
                    }}
                    aria-label={`Select ${color.name}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  />
                  <span className={`text-xs font-medium ${getTextColorClass()}/90 ${
                    selectedColor.name === color.name ? 'text-primary-700' : ''
                  }`}>
                    {color.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Main content area - Car image and color info */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column - Color Info - 4 columns on large screens */}
            <motion.div 
              className="lg:col-span-3 order-2 lg:order-1"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {/* Color name and description */}
              <motion.div 
                variants={itemVariants}
                className="color-info-tab bg-black/5 backdrop-blur-sm p-6 mb-8"
              >
                <div className="flex items-center mb-4">
                  <div 
                    className="w-12 h-12 border border-white/50 mr-4 flex-shrink-0" 
                    style={{ 
                      background: selectedColor.gradient || selectedColor.bgColor,
                    }}
                  />
                  <div>
                    <h3 className={`${getTextColorClass()} font-medium text-xl`}>{selectedColor.name}</h3>
                    <div className="inline-block text-xs font-mono mt-1 text-primary-700">
                      Code: {selectedColor.colorCode}
                    </div>
                  </div>
                </div>
                <p className={`${getTextColorClass()}/80 mb-4 leading-relaxed`}>{selectedColor.description}</p>
                <div className={`${getTextColorClass()}/80 text-sm`}>
                  <span className="font-medium text-primary-700">Recommended Interior: </span> 
                  {selectedColor.interiorPair}
                </div>
              </motion.div>
              
              {/* Call to Action */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col gap-4"
              >
                <Link 
                  href="#configure" 
                  className="group inline-flex items-center justify-center px-8 py-3 bg-primary-700 text-white font-medium hover:bg-primary-900 transition-all duration-300"
                >
                  Configure Your Tiggo 8 Pro
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
                </Link>
                
                <Link 
                  href="#dealerships" 
                  className="inline-flex items-center justify-center bg-transparent border border-primary-700 text-primary-700 hover:text-white hover:bg-primary-700 px-6 py-3 font-medium transition-colors duration-300"
                >
                  Find A Dealership
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Center Column - Car Image - 8 columns on large screens */}
            <div className="lg:col-span-9 order-1 lg:order-2">
              <div className="car-rotate-container">
                <div className={`car-rotate view-${viewMode}`}>
                  <div className="relative h-64 sm:h-96 lg:h-[500px] w-full">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${selectedColor.name}-${viewMode}`}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={fadeVariants}
                        className={`absolute inset-0 flex justify-center items-center ${isImageLoaded ? 'image-loaded' : ''}`}
                      >
                        {/* Car image with enhanced shadows */}
                        <div className="relative w-full h-full">
                          <Image
                            src={selectedColor.image}
                            alt={`Chery Tiggo 8 Pro in ${selectedColor.name}`}
                            fill
                            className="object-contain drop-shadow-2xl"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 800px"
                            quality={90}
                            onLoad={handleImageLoad}
                          />
                        </div>
                      </motion.div>
                    </AnimatePresence>
                    
                    {/* Car shadow effect */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 max-w-3xl h-8 mx-auto z-0" 
                      style={{
                        background: `radial-gradient(ellipse, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 70%)`,
                        filter: 'blur(8px)',
                        transition: 'all 0.8s ease-in-out'
                      }}
                    />
                  </div>
                </div>
              </div>
              
              {/* View Selection Controls */}
              <div className="flex justify-center gap-8 mt-6">
                <button 
                  onClick={() => handleViewChange('front')}
                  className={`${getTextColorClass()}/80 text-sm font-medium view-button ${viewMode === 'front' ? 'active' : ''}`}
                >
                  Front View
                </button>
                <button 
                  onClick={() => handleViewChange('side')}
                  className={`${getTextColorClass()}/80 text-sm font-medium view-button ${viewMode === 'side' ? 'active' : ''}`}
                >
                  Side View
                </button>
                <button 
                  onClick={() => handleViewChange('rear')}
                  className={`${getTextColorClass()}/80 text-sm font-medium view-button ${viewMode === 'rear' ? 'active' : ''}`}
                >
                  Rear View
                </button>
              </div>
            </div>
          </div>
          
          {/* Specifications bar */}
          <AnimatePresence>
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={slideFromRightVariants}
              className="w-full mt-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-1 bg-primary-700"></div>
                <h3 className={`${getTextColorClass()} text-lg font-medium`}>Vehicle Specifications</h3>
              </div>
              
              <div className="overflow-x-auto spec-track pb-4">
                <div className="flex gap-6 min-w-max">
                  <div className="bg-black/5 backdrop-blur-sm px-6 py-4 border-l-2 border-primary-700">
                    <div className="text-xs uppercase tracking-wider text-primary-700 mb-1">Engine</div>
                    <div className={`${getTextColorClass()} font-medium`}>1.6T GDI</div>
                  </div>
                  
                  <div className="bg-black/5 backdrop-blur-sm px-6 py-4 border-l-2 border-primary-700">
                    <div className="text-xs uppercase tracking-wider text-primary-700 mb-1">Power</div>
                    <div className={`${getTextColorClass()} font-medium`}>197 HP</div>
                  </div>
                  
                  <div className="bg-black/5 backdrop-blur-sm px-6 py-4 border-l-2 border-primary-700">
                    <div className="text-xs uppercase tracking-wider text-primary-700 mb-1">Torque</div>
                    <div className={`${getTextColorClass()} font-medium`}>290 Nm</div>
                  </div>
                  
                  <div className="bg-black/5 backdrop-blur-sm px-6 py-4 border-l-2 border-primary-700">
                    <div className="text-xs uppercase tracking-wider text-primary-700 mb-1">Length</div>
                    <div className={`${getTextColorClass()} font-medium`}>4,722 mm</div>
                  </div>
                  
                  <div className="bg-black/5 backdrop-blur-sm px-6 py-4 border-l-2 border-primary-700">
                    <div className="text-xs uppercase tracking-wider text-primary-700 mb-1">Width</div>
                    <div className={`${getTextColorClass()} font-medium`}>1,860 mm</div>
                  </div>
                  
                  <div className="bg-black/5 backdrop-blur-sm px-6 py-4 border-l-2 border-primary-700">
                    <div className="text-xs uppercase tracking-wider text-primary-700 mb-1">Height</div>
                    <div className={`${getTextColorClass()} font-medium`}>1,746 mm</div>
                  </div>
                  
                  <div className="bg-black/5 backdrop-blur-sm px-6 py-4 border-l-2 border-primary-700">
                    <div className="text-xs uppercase tracking-wider text-primary-700 mb-1">Fuel Economy</div>
                    <div className={`${getTextColorClass()} font-medium`}>7.8 L/100km</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default CarColorSwitcher