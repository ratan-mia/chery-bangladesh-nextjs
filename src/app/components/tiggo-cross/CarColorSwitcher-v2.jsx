'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Calendar, ChevronDown, ChevronUp, Download } from 'lucide-react'
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
  const [isMobileColorMenuOpen, setIsMobileColorMenuOpen] = useState(false);
  const [isMobileInfoExpanded, setIsMobileInfoExpanded] = useState(false);
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
    setIsMobileColorMenuOpen(false); // Close dropdown after selection on mobile
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
      className="w-full bg-[#F5F4F2] py-8 md:py-16 lg:py-24 relative overflow-hidden"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content layout - Responsive hero section */}
        <div className="relative mb-8 md:mb-16">
          {/* Desktop Color Switcher (positioned on right side) */}
          <div className="hidden md:flex absolute top-6 right-6 z-30 items-center space-x-4">
            {colorOptions.map((color) => (
              <button
                key={`desktop-${color.name}`}
                onClick={() => handleColorChange(color)}
                className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 transition-all duration-300 ${
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
          
          {/* Mobile Color Dropdown Menu */}
          <div className="md:hidden absolute top-4 right-4 z-30">
            <div className="relative">
              <button 
                onClick={() => setIsMobileColorMenuOpen(!isMobileColorMenuOpen)}
                className="flex items-center justify-between w-full bg-white px-3 py-2 border border-[#E5E0DB] rounded shadow-sm"
                aria-expanded={isMobileColorMenuOpen}
                aria-haspopup="true"
              >
                <div className="flex items-center">
                  <div
                    className="w-6 h-6 rounded-full mr-2"
                    style={{ backgroundColor: selectedColor.dotColor }}
                  ></div>
                  <span className="text-sm font-medium text-[#7A6A58] mr-1">{selectedColor.name}</span>
                </div>
                <ChevronDown size={16} className="text-[#7A6A58]" />
              </button>
              
              {isMobileColorMenuOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-40 border border-[#E5E0DB]">
                  <div className="py-1">
                    {colorOptions.map((color) => (
                      <button
                        key={`mobile-${color.name}`}
                        onClick={() => handleColorChange(color)}
                        className={`flex items-center w-full px-4 py-2 text-left text-sm ${
                          selectedColor.name === color.name ? 'bg-[#F5F4F2]' : ''
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full mr-3 border ${
                            selectedColor.name === color.name ? 'border-[#7A6A58]' : 'border-transparent'
                          }`}
                          style={{ backgroundColor: color.dotColor }}
                        ></div>
                        <span className="text-[#7A6A58]">{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Side-by-side layout for desktop, stacked for mobile */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-6 lg:gap-10">
            {/* Text content on the left side */}
            <div className="w-full md:w-5/12 lg:w-4/12 order-2 md:order-1 z-10 bg-gradient-to-br from-gray-200 to-gray-100">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7 }}
                className="bg-white/90 backdrop-blur-sm p-4 md:p-6 lg:p-8 shadow-lg mt-4 md:mt-0"
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#7A6A58] mb-1 md:mb-2">
                  Brand new colors
                </h2>
                <h3 className="text-lg md:text-xl lg:text-2xl font-medium text-[#7A6A58] mb-4 md:mb-6">
                  Nature whispers, your car listens
                </h3>
                
                {/* Mobile: Color & Description with expand/collapse */}
                <div className="md:hidden">
                  <div className="flex items-center justify-between gap-3 mb-2 border-l-4 border-[#7A6A58] pl-3">
                    <div>
                      <p className="text-base font-medium text-[#7A6A58]">{selectedColor.name}</p>
                      <p className="text-xs text-[#7A6A58]">Color Code: {selectedColor.colorCode}</p>
                    </div>
                    <button 
                      onClick={() => setIsMobileInfoExpanded(!isMobileInfoExpanded)}
                      className="p-1"
                      aria-label={isMobileInfoExpanded ? "Show less" : "Show more"}
                    >
                      {isMobileInfoExpanded ? 
                        <ChevronUp size={18} className="text-[#7A6A58]" /> : 
                        <ChevronDown size={18} className="text-[#7A6A58]" />
                      }
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {isMobileInfoExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-[#7A6A58] mb-4">
                          {selectedColor.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Desktop: Selected color information */}
                <div className="hidden md:block">
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
                </div>

                {/* CTA buttons - Responsive layout */}
                <div className="flex flex-row xs:flex-row gap-3 mt-3 md:mt-0">
                  <Link 
                    href="#contact" 
                    className="group inline-flex items-center justify-center px-4 py-2.5 bg-[#7A6A58] text-white text-sm md:text-base font-medium hover:bg-[#65584A] transition-colors duration-300 rounded-sm"
                  >
                    <Calendar size={16} className="mr-2 flex-shrink-0" />
                    Schedule Viewing
                    <ArrowRight
                      size={14}
                      className="ml-2 group-hover:translate-x-1 transition-all duration-300"
                    />
                  </Link>
                  
                  <Link 
                    href="#dealerships" 
                    className="inline-flex items-center justify-center bg-transparent border border-[#7A6A58] text-[#7A6A58] hover:text-white hover:bg-[#7A6A58] px-4 py-2.5 text-sm md:text-base font-medium transition-colors duration-300 rounded-sm"
                  >
                    <Download size={16} className="mr-2 flex-shrink-0" />
                    Download Brochure
                  </Link>
                </div>
              </motion.div>
            </div>
            
            {/* Car image on the right side */}
            <div className="w-full md:w-7/12 lg:w-8/12 order-1 md:order-2 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative w-full aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/9] overflow-hidden rounded-md"
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
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 65vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Additional Content - Fully responsive tabs */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={slideUpVariants}
          className="max-w-7xl mx-auto"
        >
          {/* Tab navigation - Sticky on mobile */}
          <div className="flex border-b border-[#D3C9BF] mb-6 md:mb-8 sticky top-0 bg-[#F5F4F2] z-10 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('highlights')}
              className={`py-2.5 md:py-3 px-4 md:px-6 font-medium transition-colors whitespace-nowrap ${
                activeTab === 'highlights' 
                  ? 'text-[#7A6A58] border-b-2 border-[#7A6A58]' 
                  : 'text-[#A59988] hover:text-[#7A6A58]'
              }`}
            >
              Color Highlights
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`py-2.5 md:py-3 px-4 md:px-6 font-medium transition-colors whitespace-nowrap ${
                activeTab === 'specifications' 
                  ? 'text-[#7A6A58] border-b-2 border-[#7A6A58]' 
                  : 'text-[#A59988] hover:text-[#7A6A58]'
              }`}
            >
              Vehicle Specifications
            </button>
          </div>
          
          {/* Tab content with responsive grids */}
          <AnimatePresence mode="wait">
            {activeTab === 'highlights' ? (
              <motion.div
                key="highlights"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
                  <div className="bg-white shadow-sm p-4 md:p-6 border border-[#E5E0DB] rounded-md">
                    <h4 className="text-lg md:text-xl font-medium text-[#7A6A58] mb-4">Color Features</h4>
                    <ul className="space-y-2 md:space-y-3">
                      {selectedColor.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 mt-0.5 rounded-full bg-[#F0EBE5] flex items-center justify-center">
                            <svg className="h-3 w-3 text-[#7A6A58]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="ml-3 text-sm md:text-base text-[#7A6A58]">{highlight}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white shadow-sm p-4 md:p-6 border border-[#E5E0DB] rounded-md">
                    <h4 className="text-lg md:text-xl font-medium text-[#7A6A58] mb-4">Paint Technology</h4>
                    <p className="text-sm md:text-base text-[#7A6A58] mb-4">
                      Our premium paint technology features multiple layers for exceptional durability and a brilliant finish:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-[#7A6A58] mr-2"></span>
                        <span className="text-sm md:text-base text-[#7A6A58]">Advanced Anti-Corrosion Base Coat</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-[#7A6A58] mr-2"></span>
                        <span className="text-sm md:text-base text-[#7A6A58]">Color-Specific Metallic Mid Layer</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-[#7A6A58] mr-2"></span>
                        <span className="text-sm md:text-base text-[#7A6A58]">UV-Protected Clear Finish Coat</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-[#7A6A58] mr-2"></span>
                        <span className="text-sm md:text-base text-[#7A6A58]">Scratch-Resistant Polymer Shield</span>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
                  {/* Engine & Performance */}
                  <div className="bg-white shadow-sm p-4 md:p-6 border border-[#E5E0DB] rounded-md">
                    <h4 className="text-lg md:text-xl font-medium text-[#7A6A58] mb-4">Engine & Performance</h4>
                    <ul className="space-y-3">
                      <li className="border-b border-[#E5E0DB] pb-2">
                        <span className="block text-xs md:text-sm text-[#A59988]">Engine</span>
                        <span className="block text-sm md:text-base text-[#7A6A58] font-medium">{vehicleSpecs.engine}</span>
                      </li>
                      <li className="border-b border-[#E5E0DB] pb-2">
                        <span className="block text-xs md:text-sm text-[#A59988]">Power</span>
                        <span className="block text-sm md:text-base text-[#7A6A58] font-medium">{vehicleSpecs.power}</span>
                      </li>
                      <li className="border-b border-[#E5E0DB] pb-2">
                        <span className="block text-xs md:text-sm text-[#A59988]">Torque</span>
                        <span className="block text-sm md:text-base text-[#7A6A58] font-medium">{vehicleSpecs.torque}</span>
                      </li>
                      <li>
                        <span className="block text-xs md:text-sm text-[#A59988]">Acceleration</span>
                        <span className="block text-sm md:text-base text-[#7A6A58] font-medium">{vehicleSpecs.acceleration}</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Transmission & Drivetrain */}
                  <div className="bg-white shadow-sm p-4 md:p-6 border border-[#E5E0DB] rounded-md">
                    <h4 className="text-lg md:text-xl font-medium text-[#7A6A58] mb-4">Transmission</h4>
                    <ul className="space-y-3">
                      <li className="border-b border-[#E5E0DB] pb-2">
                        <span className="block text-xs md:text-sm text-[#A59988]">Type</span>
                        <span className="block text-sm md:text-base text-[#7A6A58] font-medium">{vehicleSpecs.transmission}</span>
                      </li>
                      <li className="border-b border-[#E5E0DB] pb-2">
                        <span className="block text-xs md:text-sm text-[#A59988]">Drive Mode</span>
                        <span className="block text-sm md:text-base text-[#7A6A58] font-medium">Multi-terrain Select</span>
                      </li>
                      <li>
                        <span className="block text-xs md:text-sm text-[#A59988]">Fuel Economy</span>
                        <span className="block text-sm md:text-base text-[#7A6A58] font-medium">{vehicleSpecs.fuelEconomy}</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Dimensions */}
                  <div className="bg-white shadow-sm p-4 md:p-6 border border-[#E5E0DB] rounded-md sm:col-span-2 lg:col-span-1">
                    <h4 className="text-lg md:text-xl font-medium text-[#7A6A58] mb-4">Dimensions</h4>
                    <ul className="space-y-3">
                      <li className="border-b border-[#E5E0DB] pb-2">
                        <span className="block text-xs md:text-sm text-[#A59988]">Length</span>
                        <span className="block text-sm md:text-base text-[#7A6A58] font-medium">4,351 mm</span>
                      </li>
                      <li className="border-b border-[#E5E0DB] pb-2">
                        <span className="block text-xs md:text-sm text-[#A59988]">Width</span>
                        <span className="block text-sm md:text-base text-[#7A6A58] font-medium">1,831 mm</span>
                      </li>
                      <li>
                        <span className="block text-xs md:text-sm text-[#A59988]">Height</span>
                        <span className="block text-sm md:text-base text-[#7A6A58] font-medium">1,662 mm</span>
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