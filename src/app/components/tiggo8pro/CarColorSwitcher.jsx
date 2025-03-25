'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

const CarColorSwitcher = () => {
  // Define color options
  const colorOptions = [
    { name: 'Phantom Gray', bgColor: '#8A8A8A', textColor: 'text-white', imageUrl: '/images/tiggo8pro/colors/chery-gray.png' },
    { name: 'Silver Blue', bgColor: '#B8C5D6', textColor: 'text-black', imageUrl: '/images/tiggo8pro/colors/chery-silver-blue.png' },
    { name: 'Rhine Blue', bgColor: '#162F9B', textColor: 'text-white', imageUrl: '/images/tiggo8pro/colors/chery-blue.png' },
    { name: 'Khaki White', bgColor: '#F5F5F5', textColor: 'text-black', imageUrl: '/images/tiggo8pro/colors/chery-pearl-white.png' },
    { name: 'Carbon Crystal Black', bgColor: '#151B25', textColor: 'text-white', imageUrl: '/images/tiggo8pro/colors/chery-black.png' },
  ]

  // State for selected color and previous color (for transition)
  const [selectedColor, setSelectedColor] = useState(colorOptions[2]) // Default to blue
  const [previousColor, setPreviousColor] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Handle color change with proper transition state management
  const handleColorChange = (color) => {
    if (selectedColor.name !== color.name) {
      setPreviousColor(selectedColor)
      setIsTransitioning(true)
      setSelectedColor(color)
      
      // Reset transitioning state after animation completes
      setTimeout(() => setIsTransitioning(false), 800)
    }
  }

  // Calculate gradient background during transitions
  const getBgStyle = () => {
    if (!isTransitioning || !previousColor) {
      return { backgroundColor: selectedColor.bgColor }
    }
    
    return {
      backgroundImage: `linear-gradient(to right, ${previousColor.bgColor}, ${selectedColor.bgColor})`,
      backgroundSize: '200% 100%',
      backgroundPosition: '0% 50%',
      animation: 'gradientShift 1.2s ease forwards'
    }
  }

  // Enhanced animation variants
  const fadeVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0] // Custom cubic-bezier for smoother motion
      }
    },
    exit: { 
      opacity: 0,
      scale: 1.05,
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

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  // Staggered dots animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  return (
    <section 
      className="w-full py-16 px-4 md:px-8 lg:px-16 overflow-hidden relative" 
      style={{
        ...getBgStyle(),
        transition: "background-color 0.8s ease-in-out"
      }}
    >
      {/* Add CSS animation for background transition */}
      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        
        .color-dot {
          position: relative;
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
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Heading and Subheading */}
        <motion.div 
          className="mb-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2 
            variants={headingVariants}
            className={`text-3xl md:text-4xl font-medium text-[#8B7B69]`}
          >
            Brand new colors
          </motion.h2>
          <motion.p 
            variants={headingVariants}
            className={`text-3xl md:text-4xl font-medium text-[#8B7B69]`}
          >
            Nature whispers, your car listens
          </motion.p>
        </motion.div>

        {/* Color Selection Dots */}
        <motion.div 
          className="flex justify-end space-x-4 mb-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {colorOptions.map((color, index) => (
            <motion.button
              key={index}
              variants={dotVariants}
              onClick={() => handleColorChange(color)}
              className={`w-8 h-8 rounded-full transition-all duration-300 shadow-md color-dot ${
                selectedColor.name === color.name ? 'active transform scale-125 ring-2 ring-white' : ''
              }`}
              style={{ backgroundColor: color.bgColor }}
              aria-label={`Select ${color.name}`}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            />
          ))}
        </motion.div>

        {/* Car Display Area */}
        <div className="relative h-80 md:h-96 lg:h-[500px] xl:h-[550px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedColor.name}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeVariants}
              className="absolute inset-0 flex justify-center items-center"
            >
              {/* Car image with enhanced shadows */}
              <div className="relative w-full h-full">
                <Image
                  src={selectedColor.imageUrl}
                  alt={`Chery SUV in ${selectedColor.name}`}
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 1000px"
                  quality={95}
                />
              </div>
              
              {/* Enhanced Color Name Display */}
              <motion.div 
                variants={slideVariants}
                className="absolute bottom-6 right-6 md:bottom-10 md:right-10 bg-black bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <p className={`text-sm md:text-base font-medium ${selectedColor.textColor}`}>
                  {selectedColor.name}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Add subtle car shadow effect */}
        <div className="w-full max-w-3xl mx-auto h-4 bg-black bg-opacity-5 blur-xl rounded-full mt-[-20px] z-0 hidden md:block" />
      </div>
    </section>
  )
}

export default CarColorSwitcher