'use client'

import { Music, Pause } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function MobileMenu({ 
  id,
  isOpen, 
  closeMenu, 
  primaryBg = '#b29980', 
  primaryText = 'white',
  primaryHover = '#a38a73',
  aboutSubMenuItems = []
}) {
  const [activeSubmenu, setActiveSubmenu] = useState(null)
  const [isAboutSubMenuOpen, setIsAboutSubMenuOpen] = useState(false)
  const [activeModelCategory, setActiveModelCategory] = useState('tiggo')
  const [activeModel, setActiveModel] = useState('tiggo9')
  const [openModelSubmenus, setOpenModelSubmenus] = useState({})
  const [isPlaying, setIsPlaying] = useState(false)
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
    
    // Set default model for the category
    if (category === 'tiggo' && !activeModel.includes('tiggo')) {
      setActiveModel('tiggo9')
    } else if (category === 'arrizo' && !activeModel.includes('arrizo')) {
      setActiveModel('arrizo8')
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
    const specs = {
      'tiggo9': { engine: '2.0', length: '4810', wheelbase: '2800' },
      'tiggo9plus': { engine: '2.0', length: '4820', wheelbase: '2850' },
      'tiggo8': { engine: '1.8', length: '4700', wheelbase: '2710' },
      'tiggo7': { engine: '1.5', length: '4500', wheelbase: '2670' },
      'tiggo4pro': { engine: '1.5', length: '4318', wheelbase: '2610' },
      'tiggo2pro': { engine: '1.5', length: '4200', wheelbase: '2555' },
      'arrizo8': { engine: '1.6', length: '4780', wheelbase: '2780' },
      'arrizo6': { engine: '1.5', length: '4630', wheelbase: '2670' },
      'arrizo5plus': { engine: '1.5', length: '4530', wheelbase: '2610' }
    }
    
    return specs[model] || specs['tiggo9']
  }
  
  // Get car image path based on model
  const getCarImagePath = (model) => {
    const imagePaths = {
      'tiggo9': '/images/cars/tiggo9.png',
      'tiggo9plus': '/images/cars/tiggo9plus.png',
      'tiggo8': '/images/cars/tiggo8.png',
      'tiggo8plus': '/images/cars/tiggo8plus.png',
      'tiggo8pro': '/images/cars/tiggo8pro.png',
      'tiggo7': '/images/cars/tiggo7.png',
      'tiggo7pro': '/images/cars/tiggo7pro.png',
      'tiggo4pro': '/images/cars/tiggo4pro.png',
      'tiggo2pro': '/images/cars/tiggo2pro.png',
      'arrizo8': '/images/cars/arrizo8.png',
      'arrizo8plus': '/images/cars/arrizo8plus.png',
      'arrizo6': '/images/cars/arrizo6.png',
      'arrizo5plus': '/images/cars/arrizo5plus.png'
    }
    
    return imagePaths[model] || '/images/cars/placeholder.png'
  }
  
  // Get car color for display
  const getCarColor = (model) => {
    if (model?.includes('tiggo9')) return THEME.secondary // Dark green
    if (model?.includes('tiggo8')) return '#2D7C5E' // Green  
    if (model?.includes('tiggo7')) return '#00A8E8' // Blue
    if (model?.includes('tiggo4')) return '#556B2F' // Olive
    if (model?.includes('tiggo2')) return '#C23B22' // Red
    if (model?.includes('arrizo8')) return '#003F5C' // Navy
    if (model?.includes('arrizo6')) return '#444444' // Dark gray
    if (model?.includes('arrizo5')) return '#8A2BE2' // Purple
    return THEME.secondary // Default green
  }
  
  // Format model name for display
  const formatModelName = (model) => {
    if (!model) return ''
    return model.replace(/([a-z])([0-9])/i, '$1 $2').replace(/^([a-z])/, match => match.toUpperCase())
  }
  
  // Get model lists based on category
  const getModelList = () => {
    if (activeModelCategory === 'tiggo') {
      return [
        { id: 'tiggo9series', name: 'Tiggo 9 Series', hasSubmenu: true },
        { id: 'tiggo9', name: 'Tiggo 9', hasSubmenu: false },
        { id: 'tiggo8series', name: 'Tiggo 8 Series', hasSubmenu: true },
        { id: 'tiggo7series', name: 'Tiggo 7 Series', hasSubmenu: true },
        { id: 'tiggo4pro', name: 'Tiggo 4 Pro', hasSubmenu: false },
        { id: 'tiggo2pro', name: 'Tiggo 2 Pro', hasSubmenu: false }
      ]
    } else {
      return [
        { id: 'arrizo8', name: 'Arrizo 8', hasSubmenu: true },
        { id: 'arrizo6', name: 'Arrizo 6', hasSubmenu: false },
        { id: 'arrizo5plus', name: 'Arrizo 5 Plus', hasSubmenu: false }
      ]
    }
  }
  
  // Get submenu items
  const getSubmenuItems = (modelId) => {
    if (modelId === 'tiggo9series') {
      return [
        { id: 'tiggo9', name: 'Tiggo 9' },
        { id: 'tiggo9plus', name: 'Tiggo 9 Plus' }
      ]
    } else if (modelId === 'tiggo8series') {
      return [
        { id: 'tiggo8', name: 'Tiggo 8' },
        { id: 'tiggo8plus', name: 'Tiggo 8 Plus' },
        { id: 'tiggo8pro', name: 'Tiggo 8 Pro' }
      ]
    } else if (modelId === 'tiggo7series') {
      return [
        { id: 'tiggo7', name: 'Tiggo 7' },
        { id: 'tiggo7pro', name: 'Tiggo 7 Pro' }
      ]
    } else if (modelId === 'arrizo8') {
      return [
        { id: 'arrizo8', name: 'Arrizo 8' },
        { id: 'arrizo8plus', name: 'Arrizo 8 Plus' }
      ]
    }
    return []
  }
  
  // Set default model if not selected
  useEffect(() => {
    if (activeModelCategory === 'tiggo' && !activeModel) {
      setActiveModel('tiggo9')
    } else if (activeModelCategory === 'arrizo' && !activeModel) {
      setActiveModel('arrizo8')
    }
  }, [activeModelCategory, activeModel])
  
  const specs = getModelSpecs(activeModel || 'tiggo9')
  const carColor = getCarColor(activeModel)
  const carImagePath = getCarImagePath(activeModel)
  
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
                        <li 
                          className={`flex-1 py-4 px-5 text-base uppercase cursor-pointer text-center transition-colors ${
                            activeModelCategory === 'tiggo' ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'
                          }`}
                          onClick={() => handleCategoryClick('tiggo')}
                        >
                          Tiggo
                        </li>
                        <li 
                          className={`flex-1 py-4 px-5 text-base uppercase cursor-pointer text-center transition-colors ${
                            activeModelCategory === 'arrizo' ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'
                          }`}
                          onClick={() => handleCategoryClick('arrizo')}
                        >
                          Arrizo
                        </li>
                      </ul>
                    </div>
                    
                    <div style={subMenuBackgroundStyle} className="overflow-hidden transition-all duration-300">
                      <ul className="list-none">
                        {getModelList().map((model) => (
                          <div key={model.id}>
                            <li 
                              className={`py-3 px-5 sm:px-8 flex justify-between items-center cursor-pointer border-b border-white border-opacity-10 transition-colors ${
                                activeModel === model.id ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'
                              }`}
                              onClick={() => model.hasSubmenu ? toggleModelSubmenu(model.id) : handleModelClick(model.id)}
                            >
                              {model.name}
                              {model.hasSubmenu && (
                                <span className="text-xl px-2">
                                  {openModelSubmenus[model.id] ? '−' : '+'}
                                </span>
                              )}
                            </li>
                            
                            {model.hasSubmenu && (
                              <ul 
                                className={`list-none transition-all duration-300 ${
                                  openModelSubmenus[model.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                                }`}
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                              >
                                {getSubmenuItems(model.id).map((subItem) => (
                                  <li 
                                    key={subItem.id}
                                    className={`py-3 pl-8 sm:pl-12 pr-5 sm:pr-8 flex justify-between items-center cursor-pointer border-b border-white border-opacity-10 transition-colors ${
                                      activeModel === subItem.id ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'
                                    }`}
                                    onClick={() => handleModelClick(subItem.id)}
                                  >
                                    {subItem.name}
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
                        <div className="text-center p-2">
                          <div className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Engine</div>
                          <div className="text-2xl sm:text-3xl text-gray-800 font-bold">
                            {specs.engine}<span className="text-xs sm:text-sm text-gray-500 align-super">T</span>
                          </div>
                        </div>
                        
                        <div className="text-center p-2">
                          <div className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Length</div>
                          <div className="text-2xl sm:text-3xl text-gray-800 font-bold">
                            {specs.length}<span className="text-xs sm:text-sm text-gray-500 align-super">mm</span>
                          </div>
                        </div>
                        
                        <div className="text-center p-2">
                          <div className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Wheelbase</div>
                          <div className="text-2xl sm:text-3xl text-gray-800 font-bold">
                            {specs.wheelbase}<span className="text-xs sm:text-sm text-gray-500 align-super">mm</span>
                          </div>
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
                  href="#" 
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
                  href="#" 
                  className="text-gray-800 no-underline text-base px-5 py-4 block uppercase hover:bg-gray-100 transition-colors" 
                  onClick={closeMenu}
                >
                  Contact Us
                </Link>
              </li>
              <li className="border-b border-gray-100">
                <Link 
                  href="#" 
                  className="text-gray-800 no-underline text-base px-5 py-4 block uppercase hover:bg-gray-100 transition-colors" 
                  onClick={closeMenu}
                >
                  Service
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