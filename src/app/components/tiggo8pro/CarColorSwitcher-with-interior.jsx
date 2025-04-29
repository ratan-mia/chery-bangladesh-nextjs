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

  // State management with default to Khaki White
  const [selectedColor, setSelectedColor] = useState(colorOptions[3])
  const [previousColor, setPreviousColor] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [activeView, setActiveView] = useState('exterior')
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

  // Handle image loading state
  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);
  }, []);

  // Animation variants
  const fadeVariants = {
    hidden: { opacity: 0, scale: 0.95 },
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
      transition: { 
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0]
      } 
    }
  }

  const slideUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  // Helper to get the car specs display based on color
  const getCarSpecs = useCallback(() => {
    const specs = [
      { label: 'Engine', value: '1.6T GDI' },
      { label: 'Power', value: '197 HP' },
      { label: 'Torque', value: '290 Nm' },
      { label: 'Transmission', value: '7-Speed DCT' },
      { label: 'Acceleration', value: '8.5s (0-100 km/h)' },
    ];
    
    return specs;
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-gray-100 py-16 md:py-24 relative"
    >
      {/* CSS for enhanced transitions and effects */}
      <style jsx global>{`
        .color-block {
          position: relative;
          cursor: pointer;
          transition: transform 0.3s ease, border 0.3s ease;
        }
        
        .color-block::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -6px;
          height: 2px;
          background-color: #8c735d;
          transform: scaleX(0);
          transition: transform 0.3s ease;
          transform-origin: left;
        }
        
        .color-block:hover {
          transform: translateY(-2px);
        }
        
        .color-block.active::after {
          transform: scaleX(1);
        }
        
        /* Elegant fade animation for image */
        @keyframes elegantFade {
          0% { opacity: 0; filter: blur(8px); }
          100% { opacity: 1; filter: blur(0px); }
        }
        
        .elegant-fade {
          animation: elegantFade 0.8s ease-out forwards;
        }
        
        /* Subtle hover highlight for buttons */
        .spec-badge {
          position: relative;
          overflow: hidden;
        }
        
        .spec-badge::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.1), rgba(255,255,255,0));
          transform: translateX(-100%);
          transition: transform 1.2s ease;
        }
        
        .spec-badge:hover::before {
          transform: translateX(100%);
        }
        
        .tab-button {
          position: relative;
        }
        
        .tab-button::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #8c735d;
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        
        .tab-button.active::after {
          transform: scaleX(1);
        }
        
        /* Soft shadow for image */
        .car-image-wrapper {
          position: relative;
        }
        
        .car-image-wrapper::after {
          content: '';
          position: absolute;
          bottom: 4%;
          left: 50%;
          transform: translateX(-50%);
          width: 75%;
          height: 20px;
          background: radial-gradient(ellipse, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 70%);
          filter: blur(8px);
          z-index: -1;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-16">
          <div className="inline-block border-b-2 border-primary-700 pb-2 mb-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Choose Your <span className="text-primary-900">Color</span>
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select from our premium color options, each carefully crafted to enhance the elegant design of your Tiggo 8 Pro.
          </p>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Side: Car Image - 7 columns */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="car-image-wrapper h-64 md:h-80 lg:h-[500px] w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedColor.name}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeVariants}
                  className={`h-full w-full ${isImageLoaded ? 'elegant-fade' : ''}`}
                >
                  <Image
                    src={selectedColor.image}
                    alt={`Chery SUV in ${selectedColor.name}`}
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
                    quality={90}
                    onLoad={handleImageLoad}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Right Side: Color Selection and Info - 5 columns */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col">
            {/* View Switch Tabs */}
            <div className="flex mb-8 border-b border-gray-200">
              <button 
                className={`tab-button py-3 px-6 text-gray-900 font-medium ${activeView === 'exterior' ? 'active' : ''}`}
                onClick={() => setActiveView('exterior')}
              >
                Exterior Colors
              </button>
              <button 
                className={`tab-button py-3 px-6 text-gray-900 font-medium ${activeView === 'interior' ? 'active' : ''}`}
                onClick={() => setActiveView('interior')}
              >
                Interior Options
              </button>
            </div>
          
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
              className="flex-grow"
            >
              {/* Color display and info */}
              <motion.div variants={itemVariants} className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-16 h-16 border border-gray-200" 
                    style={{ background: selectedColor.gradient || selectedColor.bgColor }}
                  />
                  <div>
                    <h3 className="text-2xl font-medium text-gray-900">{selectedColor.name}</h3>
                    <p className="text-sm text-primary-700">Color Code: {selectedColor.colorCode}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{selectedColor.description}</p>
              </motion.div>
              
              {/* Color options */}
              <motion.div variants={itemVariants} className="mb-10">
                <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Select Color:</h4>
                <div className="grid grid-cols-5 gap-4">
                  {colorOptions.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => handleColorChange(color)}
                      className={`color-block border border-gray-200 h-14 ${
                        selectedColor.name === color.name ? 'active' : ''
                      }`}
                      style={{ background: color.gradient || color.bgColor }}
                      aria-label={`Select ${color.name}`}
                    />
                  ))}
                </div>
              </motion.div>
              
              {/* Specs display */}
              <motion.div variants={itemVariants} className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-4 h-1 bg-primary-700"></div>
                  <h4 className="text-sm uppercase tracking-wider text-gray-500">Specifications</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {getCarSpecs().map((spec, index) => (
                    <div 
                      key={index} 
                      className="spec-badge bg-gray-50 border-l-2 border-primary-700 p-3"
                    >
                      <span className="block text-xs text-gray-500">{spec.label}</span>
                      <span className="block text-sm font-medium text-gray-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Call to action */}
              <motion.div 
                variants={slideUpVariants}
                className="flex flex-col sm:flex-row gap-4 mt-auto"
              >
                <Link 
                  href="/contact" 
                  className="group flex-1 inline-flex items-center justify-center px-6 py-3 bg-primary-700 text-white font-medium hover:bg-primary-900 transition-all duration-300"
                >
                  Order Now
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
                  href="/testdrive" 
                  className="flex-1 inline-flex items-center justify-center bg-transparent border border-primary-700 text-primary-700 hover:text-white hover:bg-primary-700 px-6 py-3 font-medium transition-colors duration-300"
                >
                  Book a Test Drive
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Bottom Feature List */}
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={slideUpVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 border-t border-gray-200 pt-12"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 mb-4 flex items-center justify-center border-2 border-primary-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Premium Paint Quality</h3>
            <p className="text-gray-600">Advanced multi-layer coating technology provides exceptional depth and durability.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 mb-4 flex items-center justify-center border-2 border-primary-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">3-Year Color Warranty</h3>
            <p className="text-gray-600">Our special formulation resists fading and maintains its vibrant finish for years.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 mb-4 flex items-center justify-center border-2 border-primary-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Matched Interior Options</h3>
            <p className="text-gray-600">Each exterior color is thoughtfully paired with complementary interior trim packages.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CarColorSwitcher