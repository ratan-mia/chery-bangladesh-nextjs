'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import MobileMenu from './MobileMenu'
import ModelsMegaMenu from './ModelsMegaMenu'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  
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

  return (
    <>
      <header className="flex justify-between items-center px-4 md:px-5 py-2 bg-white shadow-md relative z-50">
        <div className="flex items-center">
          <Link href="/">
            <div className="h-10 w-36 relative">
              <Image 
                src="/logo.svg" 
                alt="Chery Bangladesh" 
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
        
        <ul className="hidden md:flex list-none">
          <li className="mx-4 relative">
            <button 
              className={`text-gray-800 text-sm font-medium uppercase py-4 block hover:text-gray-500 focus:outline-none ${isMegaMenuOpen ? 'text-gray-500' : ''}`}
              onClick={toggleMegaMenu}
            >
              Models
              <span className="ml-1">{isMegaMenuOpen ? '▲' : '▼'}</span>
            </button>
          </li>
          <li className="mx-4">
            <Link href="#" className="text-gray-800 text-sm font-medium uppercase py-4 block hover:text-gray-500">
              News
            </Link>
          </li>
          <li className="mx-4">
            <Link href="#" className="text-gray-800 text-sm font-medium uppercase py-4 block hover:text-gray-500">
              About Chery
            </Link>
          </li>
          <li className="mx-4">
            <Link href="#" className="text-gray-800 text-sm font-medium uppercase py-4 block hover:text-gray-500">
              Contact Us
            </Link>
          </li>
          <li className="mx-4">
            <Link href="#" className="text-gray-800 text-sm font-medium uppercase py-4 block hover:text-gray-500">
              Service
            </Link>
          </li>
        </ul>
        
        <div className="hidden md:flex items-center">
          <Link href="#" className="ml-5 text-gray-800 text-xl">🔍</Link>
          <Link href="#" className="ml-5 text-gray-800 text-xl">🌐</Link>
        </div>
      </header>
      
      {/* Mega Menu */}
      {isMegaMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMegaMenu}></div>
      )}
      
      <ModelsMegaMenu isOpen={isMegaMenuOpen} onClose={closeMegaMenu} />
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} closeMenu={() => setIsMobileMenuOpen(false)} />
    </>
  )
}