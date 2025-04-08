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
  const sectionRef = useRef(null)

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

  // Handle color change with proper transition state management
  const handleColorChange = (color) => {
    if (selectedColor.name !== color.name && !isTransitioning) {
      setPreviousColor(selectedColor)
      setIsTransitioning(true)
      setSelectedColor(color)
      
      // Reset transitioning state after animation completes
      setTimeout(() => setIsTransitioning(false), 800)
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
    
    return {
      backgroundImage: `linear-gradient(to right, ${previousColor.rgbColor}, ${selectedColor.rgbColor})`,
      backgroundSize: '200% 100%',
      backgroundPosition: '0% 50%',
      animation: 'gradientShift 1.2s ease forwards',
      boxShadow: `inset 0 0 200px rgba(0,0,0,0.1)`
    }
  }

  // Get text color for the current background
  const getTextColorClass = () => {
    return selectedColor.textColor
  }

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

  const slideVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay: 0.3,
        ease: "easeOut"
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

  const dotVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300,
        damping: 20
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
      className="w-full py-16 px-4 md:px-8 lg:px-0 overflow-hidden relative" 
      style={{
        ...getBgStyle(),
        transition: "background-color 0.8s ease-in-out"
      }}
    >
      {/* CSS for transitions and effects */}
      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        
        .color-dot {
          position: relative;
          cursor: pointer;
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
        
        .color-dot.active::after {
          opacity: 0.6;
          background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%);
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
                  className="absolute inset-0 flex justify-center items-center"
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
                      quality={90}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Car shadow effect */}
              <div className="w-full max-w-3xl mx-auto h-4 bg-black bg-opacity-5 blur-xl rounded-full mt-[-20px] z-0 hidden md:block" />
              
              {/* View angle controls */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex bg-black/20 backdrop-blur-sm rounded-full overflow-hidden">
                <button 
                  className={`angle-button px-4 py-2 text-sm font-medium transition-all ${viewAngle === 'front' ? 'active' : ''} ${getTextColorClass()}`}
                  onClick={() => setViewAngle('front')}
                >
                  Front
                </button>
                <button 
                  className={`angle-button px-4 py-2 text-sm font-medium transition-all ${viewAngle === 'side' ? 'active' : ''} ${getTextColorClass()}`}
                  onClick={() => setViewAngle('side')}
                >
                  Side
                </button>
                <button 
                  className={`angle-button px-4 py-2 text-sm font-medium transition-all ${viewAngle === 'rear' ? 'active' : ''} ${getTextColorClass()}`}
                  onClick={() => setViewAngle('rear')}
                >
                  Rear
                </button>
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
              
              {/* Description */}
              <motion.p 
                variants={itemVariants}
                className={`${getTextColorClass()}/80 text-lg mb-8`}
              >
                {selectedColor.description}
              </motion.p>
              
              {/* Color Code */}
              <motion.div 
                variants={itemVariants}
                className={`inline-block ${getTextColorClass()}/90 text-sm font-mono mb-8 py-1 px-3 border border-current`}
              >
                Color Code: {selectedColor.colorCode}
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
                        className={`w-10 h-10 rounded-full transition-all duration-300 shadow-md color-dot ${
                          selectedColor.name === color.name ? 'active transform scale-110 ring-2 ring-white' : ''
                        }`}
                        style={{ backgroundColor: color.bgColor }}
                        aria-label={`Select ${color.name}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      />
                      <span className={`text-xs font-medium ${getTextColorClass()}/80`}>
                        {color.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Call to Action */}
              <motion.div variants={itemVariants}>
                <a 
                  href="#configure" 
                  className={`inline-flex items-center px-6 py-3 bg-black/20 hover:bg-black/30 ${getTextColorClass()} backdrop-blur-sm transition-all duration-300`}
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
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CarColorSwitcher