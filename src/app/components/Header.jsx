'use client'

import { Music, Pause } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import MobileMenu from './MobileMenu'
import ModelsMegaMenu from './ModelsMegaMenu'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAboutSubMenuOpen, setIsAboutSubMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const headerRef = useRef(null)
  
  // Memoize the scroll handler to prevent unnecessary re-renders
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10)
  }, [])
  
  // Handle scroll event for header styling with throttling
  useEffect(() => {
    // Throttle the scroll event
    let timeout
    const throttledScrollHandler = () => {
      if (!timeout) {
        timeout = setTimeout(() => {
          handleScroll()
          timeout = null
        }, 100) // 100ms throttle
      }
    }
    
    window.addEventListener('scroll', throttledScrollHandler)
    // Initial check in case page is loaded scrolled down
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler)
      clearTimeout(timeout)
    }
  }, [handleScroll])
  
  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        if (isMegaMenuOpen) setIsMegaMenuOpen(false)
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false)
          document.body.style.overflow = ''
        }
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMegaMenuOpen, isMobileMenuOpen])
  
  // Handle ESC key to close menus
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        if (isMegaMenuOpen) setIsMegaMenuOpen(false)
        if (isAboutSubMenuOpen) setIsAboutSubMenuOpen(false)
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false)
          document.body.style.overflow = ''
        }
      }
    }
    
    document.addEventListener('keydown', handleEscKey)
    return () => document.removeEventListener('keydown', handleEscKey)
  }, [isMegaMenuOpen, isMobileMenuOpen, isAboutSubMenuOpen])
  
  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('/background-music.mp3')
    audioRef.current.loop = true
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      setIsMegaMenuOpen(false)
    } else {
      document.body.style.overflow = ''
    }
  }

  const toggleMegaMenu = () => {
    setIsMegaMenuOpen(!isMegaMenuOpen)
    if (isMegaMenuOpen) setIsAboutSubMenuOpen(false)
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
      document.body.style.overflow = ''
    }
  }

  const closeMegaMenu = () => {
    setIsMegaMenuOpen(false)
  }
  
  const toggleAboutSubMenu = () => {
    setIsAboutSubMenuOpen(!isAboutSubMenuOpen)
    if (isMegaMenuOpen) setIsMegaMenuOpen(false)
  }
  
  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }
  
  // Brand colors matching the image
  const primaryBg = '#b29980'      // Tan/beige color for buttons
  const primaryText = 'black'
  const primaryHover = '#a38a73'   // Slightly darker tan for hover

  // Navigation items for easier maintenance
  const navItems = [
    { label: 'MODELS', href: '#', hasMegaMenu: true },
    { label: 'NEWS', href: '#' },
    { label: 'ABOUT CHERY', href: '#', hasSubMenu: true },
    { label: 'CONTACT US', href: '#' },
    { label: 'SERVICE', href: '#' }
  ]
  
  // About submenu items
  const aboutSubMenuItems = [
    { label: 'OUR HISTORY', href: '#history' },
    { label: 'BRAND VALUES', href: '#values' },
    { label: 'SUSTAINABILITY', href: '#sustainability' },
    { label: 'LEADERSHIP', href: '#leadership' },
    { label: 'CAREERS', href: '#careers' }
  ]

  return (
    <>
      <header 
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 flex justify-between items-center px-4 md:px-6 py-3 md:py-4 
                   transition-all duration-300 z-50 ${isScrolled ? 'bg-white shadow-md' : 'bg-white'}`}
        role="banner"
      >
        <div className="flex items-center order-2 md:order-1">
          <Link href="/" className="block" aria-label="Chery - Home">
            <div className="h-8 w-32 relative">
              <Image 
                src="/logo.png" 
                alt="Chery" 
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 128px"
              />
            </div>
          </Link>
        </div>
        
        {/* Hamburger Menu Button (Mobile) */}
        <button 
          className="flex flex-col justify-between w-8 h-5 md:hidden z-20 order-1"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className={`block h-0.5 w-full bg-gray-800 rounded-sm transition-all duration-300 ${isMobileMenuOpen ? 'transform translate-y-2 rotate-45' : ''}`}></span>
          <span className={`block h-0.5 w-full bg-gray-800 rounded-sm transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block h-0.5 w-full bg-gray-800 rounded-sm transition-all duration-300 ${isMobileMenuOpen ? 'transform -translate-y-2 -rotate-45' : ''}`}></span>
        </button>
        
        {/* Desktop Navigation - Now left-aligned */}
        <nav className="hidden md:block flex-1 ml-8 order-2" aria-label="Main navigation">
          <ul className="flex list-none">
            {navItems.map((item, index) => (
              <li key={index} className="relative mr-5">
                {item.hasMegaMenu ? (
                  <button 
                    className={`relative text-gray-800 text-sm font-medium uppercase py-2 px-3 block hover:text-gray-600 focus:outline-none focus:text-gray-600 focus:bg-gray-100 rounded transition-colors
                               ${isMegaMenuOpen ? 'text-gray-600 bg-gray-100' : ''}`}
                    onClick={toggleMegaMenu}
                    aria-expanded={isMegaMenuOpen}
                    aria-controls="models-mega-menu"
                  >
                    {item.label}
                    <span className="ml-1 text-xs inline-block transition-transform duration-300" 
                          style={{ transform: isMegaMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      ▼
                    </span>
                  </button>
                ) : item.hasSubMenu ? (
                  <button 
                    className={`relative text-gray-800 text-sm font-medium uppercase py-2 px-3 block hover:text-gray-600 focus:outline-none focus:text-gray-600 focus:bg-gray-100 rounded transition-colors
                               ${isAboutSubMenuOpen ? 'text-gray-600 bg-gray-100' : ''}`}
                    onClick={toggleAboutSubMenu}
                    aria-expanded={isAboutSubMenuOpen}
                    aria-controls="about-sub-menu"
                  >
                    {item.label}
                    <span className="ml-1 text-xs inline-block transition-transform duration-300" 
                          style={{ transform: isAboutSubMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      ▼
                    </span>
                  </button>
                ) : (
                  <Link 
                    href={item.href} 
                    className="relative text-gray-800 text-sm font-medium uppercase py-2 px-3 block hover:text-gray-600 focus:outline-none focus:text-gray-600 focus:bg-gray-100 rounded transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Desktop Search, Music and CTA */}
        <div className="flex items-center space-x-4 order-3">
          {/* Music control */}
          <button 
            className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300
                      ${isPlaying ? 'bg-gray-100 text-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={toggleMusic}
            aria-label={isPlaying ? "Pause background music" : "Play background music"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Music className="h-5 w-5" />
            )}
          </button>
          
          {/* Search button */}
          <button 
            className="p-2 rounded-full transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 hidden md:block"
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          {/* CTA button */}
          <Link 
            href="#explore"
            className="text-white px-5 py-2 rounded text-sm font-medium uppercase tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500 hidden md:block"
            style={{ 
              backgroundColor: primaryBg,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = primaryHover}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = primaryBg}
          >
            EXPLORE
          </Link>
        </div>
      </header>
      
      <div className="h-16 md:h-20"></div> {/* Responsive spacer for fixed header */}
      
      {/* About Sub-Menu Horizontal Bar */}
      {isAboutSubMenuOpen && (
        <div 
          id="about-sub-menu"
          className="fixed top-16 md:top-20 left-0 right-0 bg-gray-100 shadow-md z-40 transition-all duration-300"
        >
          <div className="container mx-auto px-4 md:px-6">
            <ul className="flex flex-wrap justify-start py-3 text-sm">
              {aboutSubMenuItems.map((item, index) => (
                <li key={index} className="mr-6 my-1">
                  <Link 
                    href={item.href} 
                    className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                    onClick={() => setIsAboutSubMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {/* Backdrop for menus */}
      {(isMegaMenuOpen || isAboutSubMenuOpen) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={() => {
            if (isMegaMenuOpen) closeMegaMenu();
            if (isAboutSubMenuOpen) setIsAboutSubMenuOpen(false);
          }}
          aria-hidden="true"
        ></div>
      )}
      
      {/* Models Mega Menu */}
      <ModelsMegaMenu 
        id="models-mega-menu"
        isOpen={isMegaMenuOpen} 
        onClose={closeMegaMenu} 
        primaryBg={primaryBg}
        primaryText={primaryText}
        primaryHover={primaryHover}
      />
      
      {/* Mobile Menu */}
      <MobileMenu 
        id="mobile-menu"
        isOpen={isMobileMenuOpen} 
        closeMenu={() => {
          setIsMobileMenuOpen(false)
          document.body.style.overflow = ''
        }}
        navItems={navItems}
        aboutSubMenuItems={aboutSubMenuItems}
        primaryBg={primaryBg}
        primaryText={primaryText}
        primaryHover={primaryHover}
      />
    </>
  )
}