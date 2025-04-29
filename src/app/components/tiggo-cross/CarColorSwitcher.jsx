'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'

const CarColorSwitcher = () => {
  // Color options for Chery Tiggo Cross with nature-inspired names
  const colorOptions = useMemo(() => [
    { 
      name: 'Nasdaq Silver', 
      colorCode: 'PG19',
      bgColor: '#A2A2A2', 
      dotColor: '#A2A2A2',
      image: '/images/tiggocross/colors/phantom-grey.webp',
      carImage: '/images/tiggocross/phantom-grey.webp',
      description: 'Urban sophistication in metallic form. The perfect blend of elegance and practicality for city driving.',
      highlights: [
        'Perfect for urban environments',
        'Stylish and professional look',
        'Hides dirt and scratches well',
        'Timeless aesthetic appeal'
      ]
    },
    { 
      name: 'Glacier Blue', 
      colorCode: 'GB12',
      bgColor: '#B8C5D6', 
      dotColor: '#B8C5D6',
      image: '/images/tiggocross/colors/glacier-blue.webp',
      carImage: '/images/tiggocross/glacier-blue.webp',
      description: 'Cool and composed like a mountain lake. A sophisticated hue that brings a sense of calm and clarity.',
      highlights: [
        'Distinctive and refined appearance',
        'Enhances vehicle contours',
        'Appears different in varying light',
        'Premium and upscale look'
      ]
    },
    { 
      name: 'Royal Blue', 
      colorCode: 'RB5',
      bgColor: '#1A34B8', 
      dotColor: '#1A34B8',
      image: '/images/tiggocross/colors/royal-blue.webp',
      carImage: '/images/tiggocross/royal-blue.webp',
      description: 'Bold elegance with vibrant personality. A statement color that commands attention on the road.',
      highlights: [
        'Eye-catching, vibrant appearance',
        'Rare and exclusive look',
        'Striking presence day and night',
        'Special multi-layer paint finish'
      ]
    },
    { 
      name: 'Pearl White', 
      colorCode: 'PW2',
      bgColor: '#F5F5F5', 
      dotColor: '#FFFFFF',
      image: '/images/tiggocross/colors/pearl-white.webp',
      carImage: '/images/tiggocross/pearl-white.webp',
      description: 'Pristine beauty that stands out. A classic choice that reflects luxury and creates a sense of space.',
      highlights: [
        'Classic and elegant appearance',
        'Reflects heat in sunny conditions',
        'Shows vehicle contours beautifully',
        'Premium pearl finish with depth'
      ]
    },
    { 
      name: 'Carbon Black', 
      colorCode: 'CB1',
      bgColor: '#121722', 
      dotColor: '#121722',
      image: '/images/tiggocross/colors/carbon-black.webp',
      carImage: '/images/tiggocross/carbon-black.webp',
      description: 'Commanding presence with sleek sophistication. Timeless, powerful, and always in style.',
      highlights: [
        'Sleek and sophisticated appearance',
        'Deep metallic flake for dimension',
        'Executive and versatile aesthetic',
        'Hides dirt between washes'
      ]
    },
  ], []);

  // State for currently selected color and visibility tracking
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [isInView, setIsInView] = useState(false);
  const [activeTab, setActiveTab] = useState('highlights');
  const [showSpecs, setShowSpecs] = useState(false);
  const sectionRef = useRef(null);

  // Detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
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

  // Change color handler
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  // Toggle specs visibility
  const toggleSpecs = () => {
    setShowSpecs(!showSpecs);
  };
  
  // Animation variants
  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.7 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

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
  };

  // Vehicle specifications
  const vehicleSpecs = {
    engine: '1.5T GDI',
    power: '145 HP',
    torque: '210 Nm',
    transmission: '6-Speed DCT',
    acceleration: '9.8s (0-100 km/h)',
    fuelEconomy: '6.8L/100km'
  };

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-[#F5F4F2] py-16 md:py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content - Top section with headline, car image, and color selection */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-24">
          {/* Left side: text and headline */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#7A6A58] mb-4">
                Brand new colors
              </h2>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-[#7A6A58] mb-8 md:mb-12">
                Nature whispers, your car listens
              </h3>
              
              {/* Selected color information */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedColor.name + '-info'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="hidden md:block"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: selectedColor.dotColor }}
                    />
                    <div>
                      <p className="text-lg font-medium text-[#7A6A58]">{selectedColor.name}</p>
                      <p className="text-sm text-[#7A6A58]">Color Code: {selectedColor.colorCode}</p>
                    </div>
                  </div>
                  <p className="text-lg text-[#7A6A58] mb-8">
                    {selectedColor.description}
                  </p>
                </motion.div>
              </AnimatePresence>
              
              {/* Color dots selection - Mobile only */}
              <div className="flex items-center space-x-4 md:hidden mb-8">
                {colorOptions.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorChange(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                      selectedColor.name === color.name 
                        ? 'border-[#7A6A58] scale-110' 
                        : 'border-transparent scale-100'
                    }`}
                    style={{ 
                      backgroundColor: color.dotColor,
                      boxShadow: selectedColor.name === color.name ? '0 0 0 2px rgba(122, 106, 88, 0.2)' : 'none'
                    }}
                    aria-label={`Select ${color.name} color`}
                  />
                ))}
              </div>

              {/* CTA buttons - visible on larger screens */}
              <div className="hidden md:flex flex-col sm:flex-row gap-4 mt-8">
                <Link 
                  href="#contact" 
                  className="group inline-flex items-center px-8 py-3 bg-[#7A6A58] text-white font-medium hover:bg-[#65584A] transition-colors duration-300"
                >
                  Schedule Your Viewing
                  <ArrowRight
                    size={18}
                    className="ml-2 group-hover:ml-3 transition-all duration-300"
                  />
                </Link>
                
                <Link 
                  href="#dealerships" 
                  className="inline-flex items-center justify-center bg-transparent border border-[#7A6A58] text-[#7A6A58] hover:text-white hover:bg-[#7A6A58] px-6 py-3 font-medium transition-colors duration-300"
                >
                  Download Brochure
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Center: Empty space on desktop */}
          <div className="hidden lg:block lg:col-span-1"></div>
          
          {/* Right side: Car image and color selection */}
          <div className="lg:col-span-6 relative">
            {/* Car image with color */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full aspect-[16/9] bg-[#ADADAD] rounded-lg overflow-hidden shadow-md"
            >
              {/* Color name tag that appears on desktop */}
              <div className="absolute top-4 right-4 z-20 hidden md:block">
                <div className="bg-white/90 backdrop-blur-sm py-2 px-4 shadow-sm">
                  <p className="text-lg font-medium text-[#7A6A58]">{selectedColor.name}</p>
                </div>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedColor.name}
                  variants={fadeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <Image
                    src={selectedColor.carImage}
                    alt={`Chery SUV in ${selectedColor.name}`}
                    fill
                    priority
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 700px"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
            
            {/* Color name and CTA buttons - Mobile only */}
            <div className="mt-4 md:hidden">
              <p className="text-xl font-medium text-[#7A6A58] mb-4">{selectedColor.name}</p>
              <div className="flex flex-col gap-3">
                <Link 
                  href="#contact" 
                  className="group inline-flex items-center justify-center px-6 py-3 bg-[#7A6A58] text-white font-medium hover:bg-[#65584A] transition-colors duration-300 text-sm"
                >
                  Schedule Your Viewing
                  <ArrowRight
                    size={16}
                    className="ml-2 group-hover:ml-3 transition-all duration-300"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Color dots selection - Desktop only, positioned at top right */}
        <div className="absolute top-16 right-8 md:right-16 lg:right-24 hidden md:flex items-center space-x-4">
          {colorOptions.map((color) => (
            <button
              key={color.name}
              onClick={() => handleColorChange(color)}
              className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                selectedColor.name === color.name 
                  ? 'border-[#7A6A58] scale-110' 
                  : 'border-transparent scale-100 hover:scale-105'
              }`}
              style={{ 
                backgroundColor: color.dotColor,
                boxShadow: selectedColor.name === color.name ? '0 0 0 4px rgba(122, 106, 88, 0.2)' : 'none'
              }}
              aria-label={`Select ${color.name} color`}
            />
          ))}
        </div>
        
        {/* Additional Content Below */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={slideUpVariants}
          className="mt-8 md:mt-0"
        >
          {/* Tab navigation for highlights and specifications */}
          <div className="flex border-b border-[#D3C9BF] mb-8">
            <button
              onClick={() => setActiveTab('highlights')}
              className={`py-3 px-6 font-medium transition-colors ${
                activeTab === 'highlights' 
                  ? 'text-[#7A6A58] border-b-2 border-[#7A6A58]' 
                  : 'text-[#A59988] hover:text-[#7A6A58]'
              }`}
            >
              Color Highlights
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`py-3 px-6 font-medium transition-colors ${
                activeTab === 'specifications' 
                  ? 'text-[#7A6A58] border-b-2 border-[#7A6A58]' 
                  : 'text-[#A59988] hover:text-[#7A6A58]'
              }`}
            >
              Vehicle Specifications
            </button>
          </div>
          
          {/* Tab content */}
          <AnimatePresence mode="wait">
            {activeTab === 'highlights' ? (
              <motion.div
                key="highlights"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-[#E5E0DB]">
                    <h4 className="text-xl font-medium text-[#7A6A58] mb-4">Color Features</h4>
                    <ul className="space-y-3">
                      {selectedColor.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 mt-0.5 rounded-full bg-[#F0EBE5] flex items-center justify-center">
                            <svg className="h-3 w-3 text-[#7A6A58]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="ml-3 text-[#7A6A58]">{highlight}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-[#E5E0DB]">
                    <h4 className="text-xl font-medium text-[#7A6A58] mb-4">Paint Technology</h4>
                    <p className="text-[#7A6A58] mb-4">
                      Our premium paint technology features multiple layers for exceptional durability and a brilliant finish:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-[#7A6A58] mr-2"></span>
                        <span className="text-[#7A6A58]">Advanced Anti-Corrosion Base Coat</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-[#7A6A58] mr-2"></span>
                        <span className="text-[#7A6A58]">Color-Specific Metallic Mid Layer</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-[#7A6A58] mr-2"></span>
                        <span className="text-[#7A6A58]">UV-Protected Clear Finish Coat</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-[#7A6A58] mr-2"></span>
                        <span className="text-[#7A6A58]">Scratch-Resistant Polymer Shield</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="specifications"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {/* Engine & Performance */}
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-[#E5E0DB]">
                    <h4 className="text-xl font-medium text-[#7A6A58] mb-4">Engine & Performance</h4>
                    <ul className="space-y-3">
                      <li className="border-b border-[#E5E0DB] pb-2">
                        <span className="block text-sm text-[#A59988]">Engine</span>
                        <span className="block text-[#7A6A58] font-medium">{vehicleSpecs.engine}</span>
                      </li>
                      <li className="border-b border-[#E5E0DB] pb-2">
                        <span className="block text-sm text-[#A59988]">Power</span>
                        <span className="block text-[#7A6A58] font-medium">{vehicleSpecs.power}</span>
                      </li>
                      <li className="border-b border-[#E5E0DB] pb-2">
                        <span className="block text-sm text-[#A59988]">Torque</span>
                        <span className="block text-[#7A6A58] font-medium">{vehicleSpecs.torque}</span>
                      </li>
                      <li>
                        <span className="block text-sm text-[#A59988]">Acceleration</span>
                        <span className="block text-[#7A6A58] font-medium">{vehicleSpecs.acceleration}</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Transmission & Drivetrain */}
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-[#E5E0DB]">
                    <h4 className="text-xl font-medium text-[#7A6A58] mb-4">Transmission</h4>
                    <ul className="space-y-3">
                      <li className="border-b border-[#E5E0DB] pb-2">
                        <span className="block text-sm text-[#A59988]">Type</span>
                        <span className="block text-[#7A6A58] font-medium">{vehicleSpecs.transmission}</span>
                      </li>
                      <li className="border-b border-[#E5E0DB] pb-2">
                        <span className="block text-sm text-[#A59988]">Drive Mode</span>
                        <span className="block text-[#7A6A58] font-medium">Multi-terrain Select</span>
                      </li>
                      <li>
                        <span className="block text-sm text-[#A59988]">Fuel Economy</span>
                        <span className="block text-[#7A6A58] font-medium">{vehicleSpecs.fuelEconomy}</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Dimensions */}
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-[#E5E0DB]">
                    <h4 className="text-xl font-medium text-[#7A6A58] mb-4">Dimensions</h4>
                    <ul className="space-y-3">
                      <li className="border-b border-[#E5E0DB] pb-2">
                        <span className="block text-sm text-[#A59988]">Length</span>
                        <span className="block text-[#7A6A58] font-medium">4,351 mm</span>
                      </li>
                      <li className="border-b border-[#E5E0DB] pb-2">
                        <span className="block text-sm text-[#A59988]">Width</span>
                        <span className="block text-[#7A6A58] font-medium">1,831 mm</span>
                      </li>
                      <li>
                        <span className="block text-sm text-[#A59988]">Height</span>
                        <span className="block text-[#7A6A58] font-medium">1,662 mm</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default CarColorSwitcher