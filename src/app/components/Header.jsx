'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import MobileMenu from './MobileMenu'
import ModelsMegaMenu from './ModelsMegaMenu'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  // Handle scroll event for header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
      document.body.style.overflow = ''
    }
  }

  const closeMegaMenu = () => {
    setIsMegaMenuOpen(false)
  }
  
  // Brand colors matching the image
  const primaryBg = '#b29980'      // Tan/beige color for buttons
  const primaryText = 'white'
  const primaryHover = '#a38a73'   // Darker tan for hover

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-4 
                   transition-all duration-300 z-50 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-white'}`}
      >
        <div className="flex items-center">
          <Link href="/" className="block">
            <div className="h-8 w-32 relative">
              <Image 
                src="/logo.svg" 
                alt="Chery" 
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>
        
        <div 
          className="flex flex-col justify-between w-8 h-5 cursor-pointer md:hidden z-20"
          onClick={toggleMobileMenu}
        >
          <span className={`block h-0.5 w-full bg-gray-800 rounded-sm transition-all duration-300 ${isMobileMenuOpen ? 'transform translate-y-2 rotate-45' : ''}`}></span>
          <span className={`block h-0.5 w-full bg-gray-800 rounded-sm transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block h-0.5 w-full bg-gray-800 rounded-sm transition-all duration-300 ${isMobileMenuOpen ? 'transform -translate-y-2 -rotate-45' : ''}`}></span>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex list-none">
            <li className="relative mx-2">
              <button 
                className={`relative text-gray-800 text-sm font-medium uppercase py-2 px-3 block hover:text-gray-600 focus:outline-none
                           ${isMegaMenuOpen ? 'text-gray-600' : ''}`}
                onClick={toggleMegaMenu}
                aria-expanded={isMegaMenuOpen}
                aria-controls="models-mega-menu"
              >
                MODELS
                <span className="ml-1 text-xs inline-block transition-transform duration-300" 
                      style={{ transform: isMegaMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  ▼
                </span>
              </button>
            </li>
            <li className="mx-2">
              <Link href="#" className="relative text-gray-800 text-sm font-medium uppercase py-2 px-3 block hover:text-gray-600">
                NEWS
              </Link>
            </li>
            <li className="mx-2">
              <Link href="#" className="relative text-gray-800 text-sm font-medium uppercase py-2 px-3 block hover:text-gray-600">
                ABOUT CHERY
              </Link>
            </li>
            <li className="mx-2">
              <Link href="#" className="relative text-gray-800 text-sm font-medium uppercase py-2 px-3 block hover:text-gray-600">
                CONTACT US
              </Link>
            </li>
            <li className="mx-2">
              <Link href="#" className="relative text-gray-800 text-sm font-medium uppercase py-2 px-3 block hover:text-gray-600">
                SERVICE
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2 rounded-full transition-colors hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          <button 
            className="text-white px-5 py-2 rounded text-sm uppercase tracking-wide transition-colors"
            style={{ 
              backgroundColor: primaryBg,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = primaryHover}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = primaryBg}
          >
            EXPLORE
          </button>
        </div>
      </header>
      
      <div className="h-16"></div> {/* Spacer for fixed header */}
      
      {/* Mega Menu Backdrop */}
      {isMegaMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMegaMenu}></div>
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
        isOpen={isMobileMenuOpen} 
        closeMenu={() => setIsMobileMenuOpen(false)}
        primaryBg={primaryBg}
        primaryText={primaryText}
        primaryHover={primaryHover}
      />
    </>
  )
}