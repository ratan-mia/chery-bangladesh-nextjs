'use client'

import { Music, Pause } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import MobileMenu from './MobileMenu'
import ModelsMegaMenu from './ModelsMegaMenu'

// Define theme colors
const THEME = {
  primary: '#b29980',        // Primary tan/beige color
  primaryDark: '#a38a73',    // Darker tan for hover
  primaryText: 'white',      // Text on primary background
  
  secondary: '#a38a73',      // Dark green for accents
  secondaryDark: '#a38a73',  // Darker green
  secondaryText: 'white',    // Text on secondary background
}

// Custom hook for audio functionality
const useAudio = (url) => {
  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audioInstance = new Audio(url);
      audioInstance.loop = true;
      audioInstance.volume = 0.5; // Set to 50% volume
      setAudio(audioInstance);

      return () => {
        audioInstance.pause();
        audioInstance.src = '';
      };
    }
  }, [url]);

  const toggle = () => {
    if (!audio) return;
    
    if (playing) {
      audio.pause();
    } else {
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Playback was prevented:', error);
        });
      }
    }
    
    setPlaying(!playing);
  };

  return { playing, toggle };
};

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [isAboutSubMenuOpen, setIsAboutSubMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { playing, toggle } = useAudio('/background-music.mp3')
  const modelsMenuRef = useRef(null)
  const aboutMenuRef = useRef(null)
  const timeoutRef = useRef(null)
  
  // Handle scroll event for header styling with throttling
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10)
  }, [])
  
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
  
  // Properly handle body overflow
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])
  
  // Enable audio for iOS after user interaction
  useEffect(() => {
    const handleFirstTouch = () => {
      const silentAudio = new Audio();
      silentAudio.play().catch(() => {});
    };
    
    document.documentElement.addEventListener('touchstart', handleFirstTouch, { once: true });
    return () => {
      document.documentElement.removeEventListener('touchstart', handleFirstTouch);
    };
  }, []);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    // Close other menus when opening mobile menu
    if (!isMobileMenuOpen) {
      setIsMegaMenuOpen(false)
      setIsAboutSubMenuOpen(false)
    }
  }

  // For mobile - we still need click functionality
  const toggleMegaMenu = () => {
    // Only respond to clicks on mobile
    if (window.innerWidth < 768) {
      setIsMegaMenuOpen(!isMegaMenuOpen)
      setIsAboutSubMenuOpen(false)
      setIsMobileMenuOpen(false)
    }
  }

  const toggleAboutSubMenu = () => {
    // Only respond to clicks on mobile
    if (window.innerWidth < 768) {
      setIsAboutSubMenuOpen(!isAboutSubMenuOpen)
      setIsMegaMenuOpen(false)
      setIsMobileMenuOpen(false)
    }
  }
  
  // Hover handlers for desktop
  const handleModelsMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsMegaMenuOpen(true)
    setIsAboutSubMenuOpen(false)
  }
  
  const handleAboutMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsAboutSubMenuOpen(true)
    setIsMegaMenuOpen(false)
  }
  
  const handleMouseLeave = () => {
    // Use timeout to prevent menu from closing immediately when moving from button to menu
    timeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false)
      setIsAboutSubMenuOpen(false)
    }, 300) // 300ms delay before closing
  }
  
  const handleMenuMouseEnter = () => {
    // Cancel the timeout when entering the menu
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }
  
  const closeMegaMenu = () => {
    setIsMegaMenuOpen(false)
  }
  
  const closeAboutSubMenu = () => {
    setIsAboutSubMenuOpen(false)
  }
  
  const toggleMusic = () => {
    toggle();
  }
  
  // Close menus when clicking backdrop
  const handleBackdropClick = () => {
    if (isMegaMenuOpen) closeMegaMenu();
    if (isAboutSubMenuOpen) closeAboutSubMenu();
  }
  
  // About submenu items
  const aboutSubMenuItems = [
    { label: 'COMPANY HISTORY', href: '/about' },
    { label: 'HONORS', href: '/honors' },
    { label: 'ENVIRONMENT', href: '/environment' },
    { label: 'OPERATIONS', href: '/aboutchery/operations' },
    { label: 'CAREERS', href: '#careers' }
  ]

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 w-full bg-white z-50 transition-shadow duration-300"
        style={{
          boxShadow: isScrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none'
        }}
        role="banner"
      >
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 md:py-4 w-full">
          {/* Logo */}
          <div className="flex items-center">
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
          
          {/* Mobile Menu Button */}
          <button 
            className="flex flex-col justify-between w-8 h-5 md:hidden z-20 order-last ml-auto"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <span className={`block h-0.5 w-full bg-gray-800 rounded-sm transition-all duration-300 ${isMobileMenuOpen ? 'transform translate-y-2 rotate-45' : ''}`}></span>
            <span className={`block h-0.5 w-full bg-gray-800 rounded-sm transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-full bg-gray-800 rounded-sm transition-all duration-300 ${isMobileMenuOpen ? 'transform -translate-y-2 -rotate-45' : ''}`}></span>
          </button>
          
          {/* Main Navigation - Left aligned */}
          <nav className="hidden md:flex items-center ml-10" aria-label="Main navigation">
            <ul className="flex list-none">
              <li 
                className="relative mr-5" 
                ref={modelsMenuRef}
                onMouseEnter={handleModelsMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  className={`relative text-gray-800 text-sm font-medium uppercase py-2 px-3 block hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded transition-colors
                             ${isMegaMenuOpen ? 'text-gray-600 bg-gray-100' : ''}`}
                  onClick={toggleMegaMenu}
                  aria-expanded={isMegaMenuOpen}
                  aria-controls="models-mega-menu"
                  aria-haspopup="true"
                >
                  MODELS
                  <span className="ml-1 text-xs inline-block transition-transform duration-300" 
                        style={{ transform: isMegaMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    ▼
                  </span>
                </button>
              </li>
              <li className="mr-5">
                <Link 
                  href="#" 
                  className="text-gray-800 text-sm font-medium uppercase py-2 px-3 block hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded transition-colors"
                >
                  NEWS
                </Link>
              </li>
              <li 
                className="relative mr-5"
                ref={aboutMenuRef}
                onMouseEnter={handleAboutMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  className={`relative text-gray-800 text-sm font-medium uppercase py-2 px-3 block hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded transition-colors
                             ${isAboutSubMenuOpen ? 'text-gray-600 bg-gray-100' : ''}`}
                  onClick={toggleAboutSubMenu}
                  aria-expanded={isAboutSubMenuOpen}
                  aria-controls="about-sub-menu"
                  aria-haspopup="true"
                >
                  ABOUT CHERY
                  <span className="ml-1 text-xs inline-block transition-transform duration-300" 
                        style={{ transform: isAboutSubMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    ▼
                  </span>
                </button>
              </li>
              <li className="mr-5">
                <Link 
                  href="/contact" 
                  className="text-gray-800 text-sm font-medium uppercase py-2 px-3 block hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded transition-colors"
                >
                  CONTACT US
                </Link>
              </li>
              <li className="mr-5">
                <Link 
                  href="/service" 
                  className="text-gray-800 text-sm font-medium uppercase py-2 px-3 block hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded transition-colors"
                >
                  SERVICE
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Right side controls */}
          <div className="flex items-center space-x-4 md:ml-auto">
            {/* Music control */}
            <button 
              className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300
                        ${playing ? 'bg-gray-100 text-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={toggleMusic}
              aria-label={playing ? "Pause background music" : "Play background music"}
            >
              {playing ? (
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
            <button 
              className="text-white px-5 py-2 rounded text-sm uppercase tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 hidden md:block"
              style={{ 
                backgroundColor: THEME.primary,
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = THEME.primaryDark}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = THEME.primary}
            >
              EXPLORE
            </button>
          </div>
        </div>
      </header>
      
      <div className="h-16 md:h-20"></div> {/* Responsive spacer for fixed header */}
      
      {/* Backdrop for menus - separate from the menus themselves */}
      {(isMegaMenuOpen || isAboutSubMenuOpen) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={handleBackdropClick}
          aria-hidden="true"
        ></div>
      )}
      
      {/* About Sub-Menu */}
      {isAboutSubMenuOpen && (
        <div 
          id="about-sub-menu"
          className="fixed top-16 md:top-20 left-0 right-0 bg-gray-100 shadow-md z-40 transition-all duration-300 w-full"
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <ul className="flex flex-wrap justify-start -mx-2">
              {aboutSubMenuItems.map((item, index) => (
                <li key={index} className="px-2 py-1">
                  <Link 
                    href={item.href} 
                    className="text-gray-700 hover:text-gray-900 text-sm font-medium uppercase transition-colors block px-3 py-2 hover:bg-gray-200 rounded"
                    onClick={closeAboutSubMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {/* Models Mega Menu */}
      {isMegaMenuOpen && (
        <div onMouseEnter={handleMenuMouseEnter} onMouseLeave={handleMouseLeave}>
          <ModelsMegaMenu 
            id="models-mega-menu"
            isOpen={true} 
            onClose={closeMegaMenu} 
            primaryBg={THEME.primary}
            primaryText={THEME.primaryText}
            primaryHover={THEME.primaryDark}
          />
        </div>
      )}
      
      {/* Mobile Menu */}
      <MobileMenu 
        id="mobile-menu"
        isOpen={isMobileMenuOpen} 
        closeMenu={() => {
          setIsMobileMenuOpen(false);
        }}
        primaryBg={THEME.primary}
        primaryText={THEME.primaryText}
        primaryHover={THEME.primaryDark}
        aboutSubMenuItems={aboutSubMenuItems}
      />
    </>
  )
}