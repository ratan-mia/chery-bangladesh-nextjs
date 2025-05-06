'use client'

import { useModal } from '@/contexts/ModalContext'
import { Download, Music, Pause } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import MobileMenu from './MobileMenu'
import ModelsMegaMenu from './ModelsMegaMenu'

// Define theme colors using Chery Design System
const THEME = {
  primary: '#8c735d',        // Primary color from design system
  primaryDark: '#524336',    // Darker shade for hover
  primaryLight: '#c4b19c',   // Lighter shade for accents
  primaryText: 'white',      // Text on primary background
}

// Custom hook for audio functionality
const useAudio = (url) => {
  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audioInstance = new Audio(url);
      audioInstance.loop = true;
      audioInstance.volume = 0.4; // Set to 40% volume
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
  const { openBrochureModal } = useModal();
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
      silentAudio.play().catch(() => { });
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
    if (window.innerWidth < 1024) {
      setIsMegaMenuOpen(!isMegaMenuOpen)
      setIsAboutSubMenuOpen(false)
      setIsMobileMenuOpen(false)
    }
  }

  const toggleAboutSubMenu = () => {
    // Only respond to clicks on mobile
    if (window.innerWidth < 1024) {
      setIsAboutSubMenuOpen(!isAboutSubMenuOpen)
      setIsMegaMenuOpen(false)
      setIsMobileMenuOpen(false)
    }
  }

  // Hover handlers for desktop
  const handleModelsMouseEnter = () => {
    if (window.innerWidth >= 1024) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsMegaMenuOpen(true)
      setIsAboutSubMenuOpen(false)
    }
  }

  const handleAboutMouseEnter = () => {
    if (window.innerWidth >= 1024) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsAboutSubMenuOpen(true)
      setIsMegaMenuOpen(false)
    }
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
    { label: 'HONORS', href: '/about/honors' },
    { label: 'ENVIRONMENT', href: '/about/environment' },
    { label: 'OPERATIONS', href: '/about/operations' },
    { label: 'CAREERS', href: '/career' }
  ]

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 w-full bg-white z-50 transition-all duration-300"
        style={{
          boxShadow: isScrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none'
        }}
        role="banner"
      >
        <div className="w-full mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2 lg:py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="block flex-shrink-0" aria-label="Chery - Home">
              <div className="h-8 w-24 md:w-32 relative">
                <Image
                  src="/logo.png"
                  alt="Chery"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 6rem, 8rem"
                />
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button - repositioned */}
          <button
            className="flex flex-col justify-between w-7 h-5 lg:hidden z-20 order-last"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <span className={`block h-0.5 w-full bg-gray-800 transition-all duration-300 ${isMobileMenuOpen ? 'transform translate-y-2 rotate-45' : ''}`}></span>
            <span className={`block h-0.5 w-full bg-gray-800 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-full bg-gray-800 transition-all duration-300 ${isMobileMenuOpen ? 'transform -translate-y-2 -rotate-45' : ''}`}></span>
          </button>

          {/* Main Navigation - Desktop */}
          <nav className="hidden lg:flex items-center ml-10 flex-1" aria-label="Main navigation">
            <ul className="flex list-none">
              <li className="mr-5">
                <Link
                  href="/"
                  className="text-gray-800 text-sm font-medium uppercase py-2 px-3 block hover:text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors"
                >
                  HOME
                </Link>
              </li>
              <li
                className="relative mr-5"
                ref={modelsMenuRef}
                onMouseEnter={handleModelsMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`relative text-gray-800 text-sm font-medium uppercase py-2 px-3 block hover:text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors
                             ${isMegaMenuOpen ? 'text-primary-900 bg-gray-100' : ''}`}
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
                  href="/news"
                  className="text-gray-800 text-sm font-medium uppercase py-2 px-3 block hover:text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors"
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
                  className={`relative text-gray-800 text-sm font-medium uppercase py-2 px-3 block hover:text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors
                             ${isAboutSubMenuOpen ? 'text-primary-900 bg-gray-100' : ''}`}
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
                  href="/service"
                  className="text-gray-800 text-sm font-medium uppercase py-2 px-3 block hover:text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors"
                >
                  SERVICE
                </Link>
              </li>
              <li className="mr-5">
                <Link
                  href="/contact"
                  className="text-gray-800 text-sm font-medium uppercase py-2 px-3 block hover:text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors"
                >
                  CONTACT
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-2 sm:space-x-4 ml-auto">
            {/* Music control */}
            <button
              className={`p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light rounded-full
                        ${playing ? 'bg-gray-100 text-primary-900' : 'text-gray-600 hover:bg-gray-100 hover:text-primary-900'}`}
              onClick={toggleMusic}
              aria-label={playing ? "Pause background music" : "Play background music"}
            >
              {playing ? (
                <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Music className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>

            {/* Assistance button */}
            <Link
              href="/service#assistance"
              className="p-2 transition-colors hover:bg-gray-100 hover:text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-light rounded-full hidden md:block"
              aria-label="Roadside Assistance"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>

            {/* CTA buttons */}
            <div className="flex items-center space-x-2">
              <Link
                href="/testdrive"
                className="text-white px-4 py-2 text-xs sm:text-sm uppercase tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-900 hidden md:block whitespace-nowrap"
                style={{ backgroundColor: THEME.primary }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = THEME.primaryDark}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = THEME.primary}
              >
                TEST DRIVE
              </Link>

              <button
                onClick={() => openBrochureModal()}
                className="bg-transparent lg:bg-[#8c735d] hover:bg-[#524336] text-[#8c735d] lg:text-white text-xs sm:text-sm uppercase font-medium lg:px-4 lg:py-2 p-2 flex items-center justify-center rounded-full lg:rounded-none transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light lg:focus:ring-offset-2 lg:focus:ring-primary-900"
                aria-label="Downloads"
              >
                <Download className="w-4 h-4 lg:mr-2" />
                <span className="hidden lg:inline whitespace-nowrap">Downloads</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Responsive spacer for fixed header */}
      <div className="h-12 sm:h-14 lg:h-16"></div>

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
          className="fixed top-12 sm:top-14 lg:top-16 left-0 right-0 bg-gray-100 shadow-md z-40 transition-all duration-300 w-full"
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <ul className="flex flex-wrap justify-start -mx-2">
              {aboutSubMenuItems.map((item, index) => (
                <li key={index} className="px-2 py-1 w-full md:w-auto">
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-primary-900 text-sm font-medium uppercase transition-colors block px-3 py-2 hover:bg-white rounded"
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