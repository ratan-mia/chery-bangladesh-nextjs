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
      name: 'Phantom Grey', 
      colorCode: 'PG8',
      bgColor: '#A2A2A2', 
      dotColor: '#A2A2A2',
      image: '/images/tiggocross/colors/phantom-grey.png',
      description: 'Urban sophistication in metallic form. The perfect blend of elegance and practicality for city driving.',
      highlights: [
        'Perfect for urban environments',
        'Stylish and professional look',
        'Hides dirt and scratches well',
        'Timeless aesthetic appeal'
      ]
    },
    { 
      name: 'Blood Stone Red', 
      colorCode: 'BSR',
      bgColor: '#C72A2A', 
      dotColor: '#C72A2A',
      image: '/images/tiggocross/colors/blood-stone-red.png',
      description: 'Bold and passionate red that commands attention. A statement color with dramatic presence on the road.',
      highlights: [
        'Eye-catching, vibrant appearance',
        'Makes a bold statement',
        'Striking presence day and night',
        'Special multi-layer paint finish'
      ]
    },
    { 
      name: 'Carbon Crystal Black', 
      colorCode: 'CCB',
      bgColor: '#121722', 
      dotColor: '#121722',
      image: '/images/tiggocross/colors/carbon-black.png',
      description: 'Commanding presence with sleek sophistication. Timeless, powerful, and always in style.',
      highlights: [
        'Sleek and sophisticated appearance',
        'Deep metallic flake for dimension',
        'Executive and versatile aesthetic',
        'Hides dirt between washes'
      ]
    },
    { 
      name: 'Pearl White', 
      colorCode: 'PW2',
      bgColor: '#F5F5F5', 
      dotColor: '#FFFFFF',
      image: '/images/tiggocross/colors/pearl-white.png',
      description: 'Pristine beauty that stands out. A classic choice that reflects luxury and creates a sense of space.',
      highlights: [
        'Classic and elegant appearance',
        'Reflects heat in sunny conditions',
        'Shows vehicle contours beautifully',
        'Premium pearl finish with depth'
      ]
    },
  ], []);

  // State for currently selected color and visibility tracking
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [isInView, setIsInView] = useState(false);
  const [activeTab, setActiveTab] = useState('highlights');
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
      className="w-full bg-[#F5F4F2] py-16 md:py-24 relative overflow-hidden"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content layout - Full width image with text overlay */}
        <div className="relative mb-16">
          {/* Color switcher positioned at top right - Fixed position */}
          <div className="absolute top-6 right-6 z-30 flex items-center space-x-4">
            {colorOptions.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorChange(color)}
                className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                  selectedColor.name === color.name 
                    ? 'border-[#7A6A58] scale-110' 
                    : 'border-transparent scale-100 hover:scale-105'
                }`}
                style={{ 
                  backgroundColor: color.dotColor,
                  boxShadow: selectedColor.name === color.name ? '0 0 0 2px rgba(122, 106, 88, 0.2)' : 'none'
                }}
                aria-label={`Select ${color.name} color`}
              />
            ))}
          </div>
          
          {/* Full-width car image container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-full aspect-[21/9] bg-gradient-to-br from-gray-200 to-gray-100 overflow-hidden"
          >
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
                  src={selectedColor.image}
                  alt={`Chery SUV in ${selectedColor.name}`}
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 100vw"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
          
          {/* Text overlay on the left */}
          <div className="absolute bottom-0 left-0 z-20 p-6 md:p-10 lg:p-16 max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
              className="bg-white/90 backdrop-blur-sm p-6 md:p-8 shadow-lg"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#7A6A58] mb-2">
                Brand new colors
              </h2>
              <h3 className="text-xl md:text-2xl font-medium text-[#7A6A58] mb-6">
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
                >
                  <div className="flex items-center gap-3 mb-4 border-l-4 border-[#7A6A58] pl-3">
                    <div>
                      <p className="text-lg font-medium text-[#7A6A58]">{selectedColor.name}</p>
                      <p className="text-sm text-[#7A6A58]">Color Code: {selectedColor.colorCode}</p>
                    </div>
                  </div>
                  <p className="text-[#7A6A58] mb-6">
                    {selectedColor.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="#contact" 
                  className="group inline-flex items-center px-6 py-3 bg-[#7A6A58] text-white font-medium hover:bg-[#65584A] transition-colors duration-300"
                >
                  Schedule Your Viewing
                  <ArrowRight
                    size={16}
                    className="ml-2 group-hover:ml-3 transition-all duration-300"
                  />
                </Link>
                
                <Link 
                  href="#dealerships" 
                  className="inline-flex items-center justify-center bg-transparent border border-[#7A6A58] text-[#7A6A58] hover:text-white hover:bg-[#7A6A58] px-4 py-3 font-medium transition-colors duration-300"
                >
                  Download Brochure
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Additional Content Below - More compact layout */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={slideUpVariants}
          className="max-w-7xl mx-auto"
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
                  <div className="bg-white shadow-sm p-6 border border-[#E5E0DB]">
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
                  
                  <div className="bg-white shadow-sm p-6 border border-[#E5E0DB]">
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
                  <div className="bg-white shadow-sm p-6 border border-[#E5E0DB]">
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
                  <div className="bg-white shadow-sm p-6 border border-[#E5E0DB]">
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
                  <div className="bg-white shadow-sm p-6 border border-[#E5E0DB]">
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