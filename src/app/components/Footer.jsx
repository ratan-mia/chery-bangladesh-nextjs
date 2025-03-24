'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Column 1 - Models */}
          <div>
            <h4 className="text-gray-800 font-medium mb-4">Models</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/models/tiggo" className="text-gray-600 hover:text-primary transition-colors">
                  TIGGO
                </Link>
              </li>
              <li>
                <Link href="/models/arrizo" className="text-gray-600 hover:text-primary transition-colors">
                  ARRIZO
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - News */}
          <div>
            <h4 className="text-gray-800 font-medium mb-4">News</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/news" className="text-gray-600 hover:text-primary transition-colors">
                  NEWS
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - About Chery */}
          <div>
            <h4 className="text-gray-800 font-medium mb-4">About Chery</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about/ceo" className="text-gray-600 hover:text-primary transition-colors">
                  FROM CEO
                </Link>
              </li>
              <li>
                <Link href="/about/honors" className="text-gray-600 hover:text-primary transition-colors">
                  HONORS
                </Link>
              </li>
              <li>
                <Link href="/about/introduction" className="text-gray-600 hover:text-primary transition-colors">
                  INTRODUCTION
                </Link>
              </li>
              <li>
                <Link href="/about/environmental" className="text-gray-600 hover:text-primary transition-colors">
                  ENVIRONMENTAL INITIATIVES
                </Link>
              </li>
              <li>
                <Link href="/about/social" className="text-gray-600 hover:text-primary transition-colors">
                  SOCIAL RESPONSIBILITY
                </Link>
              </li>
              <li>
                <Link href="/about/operations" className="text-gray-600 hover:text-primary transition-colors">
                  EXCELLENT OPERATIONS
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact Us */}
          <div>
            <h4 className="text-gray-800 font-medium mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5 - Service & Logo */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-gray-800 font-medium mb-4">Service</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/service" className="text-gray-600 hover:text-primary transition-colors">
                    Service
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 md:mt-0">
              <Link href="/" className="inline-block">
                <Image 
                  src="/logo.svg" 
                  alt="Chery" 
                  width={120} 
                  height={40}
                  className="object-contain"
                />
              </Link>
              
              {/* Social Media */}
              <div className="flex space-x-4 mt-4">
                <Link href="https://facebook.com" className="text-gray-700 hover:text-primary transition-colors" aria-label="Facebook">
                  <FaFacebookF size={18} />
                </Link>
                <Link href="https://twitter.com" className="text-gray-700 hover:text-primary transition-colors" aria-label="Twitter">
                  <FaTwitter size={18} />
                </Link>
                <Link href="https://instagram.com" className="text-gray-700 hover:text-primary transition-colors" aria-label="Instagram">
                  <FaInstagram size={18} />
                </Link>
                <Link href="https://youtube.com" className="text-gray-700 hover:text-primary transition-colors" aria-label="YouTube">
                  <FaYoutube size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Legal Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 mb-4 md:mb-0">
            © Copyright 2025 Chery All Right Reserved.  
            <span className="ml-2">皖ICP备05009427号-1</span>
          </div>
          
          <div className="flex text-sm text-gray-500">
            <Link href="/legal" className="hover:text-primary transition-colors">
              Legal
            </Link>
            <span className="mx-4">|</span>
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Statement
            </Link>
            <span className="mx-4">|</span>
            <Link href="/cookies" className="hover:text-primary transition-colors">
              Cookies Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}