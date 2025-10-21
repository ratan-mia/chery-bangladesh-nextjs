'use client'

import { Music, Pause } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

// Car series and models data configuration
const CAR_DATA = {
  // You can easily add/remove entire series here
  series: [
    {
      id: 'tiggo',
      name: 'Tiggo',
      // Default model to show when the series is selected
      defaultModel: 'tiggo8pro',
      // Series categories
      categories: [
        // {
        //   id: 'tiggo8series',
        //   name: 'TIGGO 8 SERIES',
        //   models: ['tiggo8'],
        //   defaultExpanded: false
        // },

        {
          id: 'tiggo8pro',
          name: 'TIGGO 8 PRO',
          models: [],
          defaultExpanded: false
        },
        {
          id: 'tiggocross',
          name: 'TIGGO CROSS',
          models: [],
          defaultExpanded: false
        },

      ]
    },
    // To add Arrizo back, just uncomment this section
    /*
    {
      id: 'arrizo',
      name: 'Arrizo',
      defaultModel: 'arrizo8',
      categories: [
        { id: 'arrizo8', name: 'ARRIZO 8', models: [] },
        { id: 'arrizo7', name: 'ARRIZO 7', models: [] },
        { id: 'arrizo5', name: 'ARRIZO 5', models: [] }
      ]
    }
    */
  ],
  // Car specifications data
  specs: {
    'tiggo9': { engine: '2.0', length: '4810', wheelbase: '2800', power: '254', torque: '390' },
    'tiggo8': { engine: '1.8', length: '4700', wheelbase: '2710', power: '187', torque: '300' },
    'tiggo8pro': { engine: '1.6', length: '4722', wheelbase: '2710', power: '195', torque: '290' },
    'tiggo7': { engine: '1.5', length: '4500', wheelbase: '2670', power: '156', torque: '230' },
    'tiggocross': { engine: '1.5', length: '4318', wheelbase: '2610', power: '145', torque: '210' },
    'tiggo2pro': { engine: '1.5', length: '4200', wheelbase: '2555', power: '126', torque: '180' },
    'arrizo8': { engine: '1.6', length: '4780', wheelbase: '2780', power: '197', torque: '290' },
    'arrizo7': { engine: '1.5', length: '4650', wheelbase: '2700', power: '156', torque: '230' },
    'arrizo5': { engine: '1.5', length: '4530', wheelbase: '2610', power: '147', torque: '210' }
  },
  // Car image paths
  imagePaths: {
    'tiggo9': '/images/cars/tiggo9.png',
    'tiggo8': '/images/cars/tiggo8.png',
    'tiggo8pro': '/images/cars/tiggo8.png',
    'tiggo7': '/images/cars/tiggo7.png',
    'tiggocross': '/images/cars/tiggocross2025.png',
    'tiggo2pro': '/images/cars/tiggo2pro.png',
    'arrizo8': '/images/cars/arrizo8.png',
    'arrizo7': '/images/cars/arrizo7.png',
    'arrizo5': '/images/cars/arrizo5.png'
  },
  // Car colors for fallback display
  colors: {
    'tiggo9': '#b29980',
    'tiggo9plus': '#b29980',
    'tiggo8': '#2D7C5E',
    'tiggo8plus': '#2D7C5E',
    'tiggo8pro': '#2D7C5E',
    'tiggo7': '#00A8E8',
    'tiggo7pro': '#00A8E8',
    'tiggo4pro': '#556B2F',
    'tiggo2pro': '#C23B22',
    'arrizo8': '#003F5C',
    'arrizo8plus': '#003F5C',
    'arrizo6': '#444444',
    'arrizo5plus': '#8A2BE2'
  }
}

// Component for animating number counting
const AnimatedCounter = ({ value, suffix, duration = 800 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const initialValue = useRef(0);
  const targetValue = parseFloat(value);
  
  useEffect(() => {
    let startTime;
    let frameId;
    
    const animateValue = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
      
      const currentValue = Math.floor(initialValue.current + (targetValue - initialValue.current) * easedProgress);
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        frameId = requestAnimationFrame(animateValue);
      } else {
        setDisplayValue(targetValue);
      }
    };
    
    // Start the animation
    initialValue.current = displayValue;
    frameId = requestAnimationFrame(animateValue);
    
    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [targetValue, duration]);
  
  return (
    <div className="text-2xl sm:text-3xl text-gray-800 font-bold">
      {displayValue}<span className="text-xs sm:text-sm text-gray-500 align-super">{suffix}</span>
    </div>
  );
};

export default function MobileMenu({ 
  id,
  isOpen, 
  closeMenu, 
  primaryBg = '#b29980', 
  primaryText = 'black',
  primaryHover = '#a38a73',
  aboutSubMenuItems = [],
  // You can pass a custom dataset if needed
  customData = null
}) {
  // Use either custom data passed as prop or default data
  const data = customData || CAR_DATA;
  
  // Initialize with first series in the data
  const initialSeries = data.series[0];
  
  const [activeSubmenu, setActiveSubmenu] = useState(null)
  const [isAboutSubMenuOpen, setIsAboutSubMenuOpen] = useState(false)
  const [activeModelCategory, setActiveModelCategory] = useState(initialSeries?.id || 'tiggo')
  const [activeModel, setActiveModel] = useState(initialSeries?.defaultModel || 'tiggo9')
  const [openModelSubmenus, setOpenModelSubmenus] = useState({})
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSpecVisible, setIsSpecVisible] = useState(false)
  
  const menuRef = useRef(null)
  const audioRef = useRef(null)
  
  // Define theme colors - matching the header and mega menu
  const THEME = {
    primary: primaryBg,
    primaryDark: primaryHover,
    primaryText: primaryText,
    secondary: '#b29980',      // Dark green for accents
    secondaryDark: '#a38a73',  // Darker green
    secondaryText: 'white',    // Text on secondary background
  }
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target) && !e.target.closest('.menu-toggle')) {
        closeMenu()
      }
    }
    
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [isOpen, closeMenu])
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])
  
  // Initialize audio
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('/background-music.mp3')
      audioRef.current.loop = true
      audioRef.current.volume = 0.5
      
      return () => {
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current = null
        }
      }
    }
  }, [])
  
  // Handle ESC key to close menu
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu()
      }
    }
    
    window.addEventListener('keydown', handleEscKey)
    return () => window.removeEventListener('keydown', handleEscKey)
  }, [isOpen, closeMenu])
  
  // Trigger spec animation when model changes
  useEffect(() => {
    setIsSpecVisible(false);
    const timer = setTimeout(() => {
      setIsSpecVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [activeModel]);
  
  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      const playPromise = audioRef.current?.play()
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Playback was prevented:', error)
        })
      }
    }
    setIsPlaying(!isPlaying)
  }
  
  const toggleMainSubmenu = (submenu) => {
    setActiveSubmenu(activeSubmenu === submenu ? null : submenu)
    
    // Reset model submenu state when toggling main menu
    if (activeSubmenu !== submenu) {
      setOpenModelSubmenus({})
    }
    
    // Close About submenu when opening a different submenu
    if (submenu !== 'about') {
      setIsAboutSubMenuOpen(false)
    }
  }
  
  const toggleAboutSubmenu = () => {
    setIsAboutSubMenuOpen(!isAboutSubMenuOpen)
  }
  
  const handleCategoryClick = (category) => {
    setActiveModelCategory(category)
    setOpenModelSubmenus({})
    
    // Find and set default model for selected category
    const selectedSeries = data.series.find(series => series.id === category);
    if (selectedSeries) {
      setActiveModel(selectedSeries.defaultModel);
    }
  }
  
  const toggleModelSubmenu = (model) => {
    setOpenModelSubmenus(prev => ({
      ...prev,
      [model]: !prev[model]
    }))
  }
  
  const handleModelClick = (model) => {
    setActiveModel(model)
  }
  
  // Get car specs based on model
  const getModelSpecs = (model) => {
    return data.specs[model] || data.specs[data.series[0]?.defaultModel];
  }
  
  // Get car image path based on model
  const getCarImagePath = (model) => {
    return data.imagePaths[model] || '/images/cars/placeholder.png';
  }
  
  // Get car color for display
  const getCarColor = (model) => {
    return data.colors[model] || THEME.secondary;
  }
  
  // Format model name for display
  const formatModelName = (model) => {
    if (!model) return '';
    return model.replace(/([a-z])([0-9])/i, '$1 $2').replace(/^([a-z])/, match => match.toUpperCase());
  }
  
  // Get model lists based on active category
  const getModelList = () => {
    const activeSeries = data.series.find(series => series.id === activeModelCategory);
    return activeSeries ? activeSeries.categories : [];
  }
  
  // Get submenu items for a specific model series
  const getSubmenuItems = (modelId) => {
    const activeSeries = data.series.find(series => series.id === activeModelCategory);
    if (!activeSeries) return [];
    
    const category = activeSeries.categories.find(cat => cat.id === modelId);
    return category ? category.models : [];
  }
  
  // Set default model if not selected
  useEffect(() => {
    const activeSeries = data.series.find(series => series.id === activeModelCategory);
    if (activeSeries) {
      const modelPrefix = activeSeries.id;
      // If current active model doesn't belong to the active category
      if (!activeModel.includes(modelPrefix)) {
        setActiveModel(activeSeries.defaultModel);
      }
    }
  }, [activeModelCategory, activeModel, data.series]);
  
  const specs = getModelSpecs(activeModel);
  const carColor = getCarColor(activeModel);
  const carImagePath = getCarImagePath(activeModel);
  
  // Styling variables
  const menuBackgroundStyle = {
    backgroundColor: '#ffffff'
  }
  
  const categoryBackgroundStyle = {
    backgroundColor: THEME.secondary,
    color: THEME.secondaryText
  }
  
  const subMenuBackgroundStyle = {
    backgroundColor: THEME.secondaryDark,
    color: THEME.secondaryText
  }
  
  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />
      
      {/* Mobile menu */}
      <div 
        id={id}
        ref={menuRef}
        className={`fixed top-0 right-0 w-full sm:w-4/5 md:w-3/5 h-full bg-white z-30 overflow-y-auto transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } pt-16 max-h-screen`}
        style={menuBackgroundStyle}
        aria-modal="true"
        role="dialog"
        aria-label="Mobile navigation menu"
      >
        <div className="mobile-menu-container h-full flex flex-col">
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 text-gray-800 w-8 h-8 flex items-center justify-center"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <nav className="mb-5 flex-grow" aria-label="Mobile navigation">
            <ul className="list-none border-b border-gray-200">
              <li className="border-b border-gray-100">
                <button 
                  className="text-gray-800 w-full text-left text-base px-5 py-4 block uppercase flex justify-between items-center hover:bg-gray-100 transition-colors"
                  onClick={() => toggleMainSubmenu('models')}
                  aria-expanded={activeSubmenu === 'models'}
                  aria-controls={`${id}-models-submenu`}
                >
                  Models
                  <span className="text-2xl">{activeSubmenu === 'models' ? '−' : '+'}</span>
                </button>
                
                {/* Models submenu */}
                {activeSubmenu === 'models' && (
                  <div 
                    id={`${id}-models-submenu`}
                    className="transition-all duration-300 ease-in-out"
                  >
                    <div style={categoryBackgroundStyle}>
                      <ul className="list-none flex">
                        {data.series.map(series => (
                          <li 
                            key={series.id}
                            className={`flex-1 py-4 px-5 text-base uppercase cursor-pointer text-center transition-colors ${
                              activeModelCategory === series.id ? 'bg-primary-800' : 'hover:bg-white hover:bg-opacity-10'
                            }`}
                            onClick={() => handleCategoryClick(series.id)}
                          >
                            {series.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div style={subMenuBackgroundStyle} className="overflow-hidden transition-all duration-300">
                      <ul className="list-none">
                        {getModelList().map((category) => (
                          <div key={category.id}>
                            <li 
                              className={`py-3 px-5 sm:px-8 flex justify-between  items-center cursor-pointer border-b border-white border-opacity-10 transition-colors ${
                                activeModel === category.id ? 'bg-primary-800 bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'
                              }`}
                              onClick={() => category.models.length > 0 ? toggleModelSubmenu(category.id) : handleModelClick(category.id)}
                            >
                              {category.name}
                              {category.models.length > 0 && (
                                <span className="text-xl px-2">
                                  {openModelSubmenus[category.id] ? '−' : '+'}
                                </span>
                              )}
                            </li>
                            
                            {category.models.length > 0 && (
                              <ul 
                                className={`list-none transition-all duration-300 ${
                                  openModelSubmenus[category.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                                }`}
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                              >
                                {category.models.map((model) => (
                                  <li 
                                    key={model.id}
                                    className={`py-3 pl-8 sm:pl-12 pr-5 sm:pr-8 flex justify-between items-center cursor-pointer border-b border-white border-opacity-10 transition-colors ${
                                      activeModel === model.id ? 'bg-primary-800 bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'
                                    }`}
                                    onClick={() => handleModelClick(model.id)}
                                  >
                                    {model.name}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Car display for selected model */}
                    <div className="p-5 text-center bg-white">
                      <div className="w-full h-32 sm:h-48 relative mb-5 rounded overflow-hidden shadow-md">
                        {/* Car image container with fallback */}
                        <div className="relative w-full h-full bg-gray-100 flex items-center justify-center">
                          {/* Next.js Image with fallback to colored background */}
                          <div className="relative w-full h-full">
                            <Image 
                              src={carImagePath}
                              alt={`${formatModelName(activeModel)} vehicle`}
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 100vw, 600px"
                              priority
                              onError={(e) => {
                                // If image fails to load, show colored div with text
                                e.currentTarget.style.display = 'none';
                                document.getElementById(`mobile-fallback-${activeModel}`).style.display = 'flex';
                              }}
                            />
                            
                            {/* Fallback colored div with text */}
                            <div 
                              id={`mobile-fallback-${activeModel}`}
                              className="absolute inset-0 hidden items-center justify-center"
                              style={{ 
                                backgroundColor: carColor,
                                color: 'white',
                                display: 'none'
                              }}
                            >
                              <div className="text-white text-2xl font-bold">
                                {formatModelName(activeModel)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-around flex-wrap">
                        {/* Engine with animated counter */}
                        <div className="text-center p-2">
                          <div className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Engine</div>
                          {isSpecVisible && specs && (
                            <AnimatedCounter value={specs.engine} suffix="T" />
                          )}
                        </div>
                        
                        {/* Length with animated counter */}
                        <div className="text-center p-2">
                          <div className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Length</div>
                          {isSpecVisible && specs && (
                            <AnimatedCounter value={specs.length} suffix="mm" />
                          )}
                        </div>
                        
                        {/* Wheelbase with animated counter */}
                        <div className="text-center p-2">
                          <div className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Wheelbase</div>
                          {isSpecVisible && specs && (
                            <AnimatedCounter value={specs.wheelbase} suffix="mm" />
                          )}
                        </div>
                      </div>
                      
                      <Link href={`/models/${activeModel}`}>
                        <button 
                          className="text-white border-none py-2 sm:py-3 px-6 sm:px-8 text-sm uppercase cursor-pointer transition-colors mt-4 sm:mt-6 rounded shadow-sm"
                          style={{ 
                            backgroundColor: THEME.primary,
                            color: THEME.primaryText
                          }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = THEME.primaryDark}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = THEME.primary}
                        >
                          Explore
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </li>
              <li className="border-b border-gray-100">
                <Link 
                  href="/news" 
                  className="text-gray-800 no-underline text-base px-5 py-4 block uppercase hover:bg-gray-100 transition-colors" 
                  onClick={closeMenu}
                >
                  News
                </Link>
              </li>
              <li className="border-b border-gray-100">
                <button 
                  className="text-gray-800 w-full text-left text-base px-5 py-4 block uppercase flex justify-between items-center hover:bg-gray-100 transition-colors"
                  onClick={() => {
                    toggleMainSubmenu('about');
                    toggleAboutSubmenu();
                  }}
                  aria-expanded={activeSubmenu === 'about' && isAboutSubMenuOpen}
                  aria-controls={`${id}-about-submenu`}
                >
                  About Chery
                  <span className="text-2xl">{activeSubmenu === 'about' && isAboutSubMenuOpen ? '−' : '+'}</span>
                </button>
                
                {/* About submenu */}
                {activeSubmenu === 'about' && isAboutSubMenuOpen && aboutSubMenuItems.length > 0 && (
                  <div 
                    id={`${id}-about-submenu`}
                    className="bg-gray-100 pl-5"
                  >
                    <ul className="list-none">
                      {aboutSubMenuItems.map((item, index) => (
                        <li key={index} className="border-t border-gray-200 first:border-t-0">
                          <Link 
                            href={item.href} 
                            className="text-gray-700 no-underline text-sm py-3 px-4 block hover:bg-gray-200 transition-colors"
                            onClick={closeMenu}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
              <li className="border-b border-gray-100">
                <Link 
                  href="/contact" 
                  className="text-gray-800 no-underline text-base px-5 py-4 block uppercase hover:bg-gray-100 transition-colors" 
                  onClick={closeMenu}
                >
                  Contact Us
                </Link>
              </li>
              <li className="border-b border-gray-100">
                <Link 
                  href="/service" 
                  className="text-gray-800 no-underline text-base px-5 py-4 block uppercase hover:bg-gray-100 transition-colors" 
                  onClick={closeMenu}
                >
                  Service
                </Link>
              </li>
              <li className="border-b border-gray-100">
                <Link 
                  href="/complaint" 
                  className="text-gray-800 no-underline text-base px-5 py-4 block uppercase hover:bg-gray-100 transition-colors" 
                  onClick={closeMenu}
                >
                  Complaint
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="flex justify-between items-center px-5 py-4 border-t border-gray-200 mt-auto">
            {/* Music control */}
            <button 
              className={`p-2 rounded-full transition-colors ${isPlaying ? 'text-gray-800' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={toggleMusic}
              aria-label={isPlaying ? "Pause background music" : "Play background music"}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Music className="w-6 h-6" />
              )}
            </button>
          
            {/* Search button */}
            <Link 
              href="#" 
              className="text-gray-800 hover:text-gray-600 transition-colors" 
              onClick={closeMenu}
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
            
            {/* Language button */}
            <Link 
              href="#" 
              className="text-gray-800 hover:text-gray-600 transition-colors" 
              onClick={closeMenu}
              aria-label="Language"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}