'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 relative w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8">
          {/* Brand and Social Media - Desktop (Left) */}
          <div className="hidden lg:flex lg:flex-col lg:col-span-3 pr-8 border-r border-gray-100">
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/logo.png" 
                alt="Chery" 
                width={140} 
                height={48}
                className="object-contain"
              />
            </Link>
            
            <p className="text-gray-600 text-sm mb-6">
            Chery Bangladesh.
            Chery Automobile Co. Ltd. is a globalized automobile brand.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4 mt-auto">
              {[
                  { icon: FaFacebookF, href: "https://www.facebook.com/CheryBDofficial", label: "Facebook" },
                  { icon: FaLinkedin, href: "https://www.linkedin.com/company/chery-bangladesh/", label: "LinkedIn" },
                  { icon: FaInstagram, href: "https://instagram.com/cherybangladesh", label: "Instagram" },
                  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" }
              ].map((social, index) => (
                <Link 
                  key={index}
                  href={social.href} 
                  className="w-10 h-10 flex items-center justify-center border border-gray-200 text-gray-600 hover:text-primary hover:border-primary transition-colors duration-200" 
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 1 - Models */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <h4 className="text-gray-900 font-medium mb-5 pb-2 border-b border-gray-100">Models</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/models/tiggo8pro" className="text-gray-600 hover:text-primary transition-colors text-sm">
                   Tiggo 8 Pro
                </Link>
              </li>
              <li>
                <Link href="/models/tiggocross" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Tiggo Cross
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - News & Media */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <h4 className="text-gray-900 font-medium mb-5 pb-2 border-b border-gray-100">News & Media</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/news" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Latest News
                </Link>
              </li>
              <li>
                <Link href="/honors#awards" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Awards
                </Link>
              </li>
              {/* <li>
                <Link href="/media/downloads" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Downloads
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Column 3 - About Chery */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <h4 className="text-gray-900 font-medium mb-5 pb-2 border-b border-gray-100">About Chery</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Introduction
                </Link>
              </li>
              <li>
                <Link href="/about/ceo" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  From CEO
                </Link>
              </li>
              <li>
                <Link href="/honors" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Honors
                </Link>
              </li>
              <li>
                <Link href="/environment" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Environmental
                </Link>
              </li>
              <li>
                <Link href="/social-responsibility" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Social Responsibility
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Services */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <h4 className="text-gray-900 font-medium mb-5 pb-2 border-b border-gray-100">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services/maintenance" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Maintenance
                </Link>
              </li>
              <li>
                <Link href="/services/warranty" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Warranty
                </Link>
              </li>
              <li>
                <Link href="/services/roadside" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Roadside Assistance
                </Link>
              </li>
              <li>
                <Link href="/services/owners" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Owner Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-span-2 md:col-span-4 lg:col-span-3 lg:pl-8 lg:border-l lg:border-gray-100">
            <h4 className="text-gray-900 font-medium mb-5 pb-2 border-b border-gray-100">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="text-primary mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="text-sm text-gray-600">
                <span className="text-1xl font-bold">Asian Motorspex Limited </span><br/>
                206/1-207/1 Bir Uttam Mir Shawkat Sarak
                Tejgaon Gulshan Link Road, Dhaka
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-primary mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-sm text-gray-600">
                  <a href="mailto:info@cherybd.com" className="hover:text-primary transition-colors">info@cherybd.com</a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-primary mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="text-sm text-gray-600">
                  <a href="tel:09639119977" className="hover:text-primary transition-colors">09639119977</a>
                </div>
              </li>
            </ul>
            
            {/* Newsletter Subscription - can be added if needed */}
          </div>
          
          {/* Mobile Brand and Social */}
          <div className="col-span-2 lg:hidden pt-4 border-t border-gray-100 mt-4">
            <Link href="/" className="inline-block mb-4">
              <Image 
                src="/logo.png" 
                alt="Chery" 
                width={120} 
                height={40}
                className="object-contain"
              />
            </Link>
            
            {/* Social Media */}
            <div className="flex space-x-3 mt-4">
              {[
                { icon: FaFacebookF, href: "https://www.facebook.com/CheryBDofficial", label: "Facebook" },
                { icon: FaLinkedin, href: "https://www.linkedin.com/company/chery-bangladesh/", label: "LinkedIn" },
                { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
                { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
                { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" }
              ].map((social, index) => (
                <Link 
                  key={index}
                  href={social.href} 
                  className="w-9 h-9 flex items-center justify-center border border-gray-200 text-gray-600 hover:text-primary hover:border-primary transition-colors duration-200" 
                  aria-label={social.label}
                >
                  <social.icon size={14} />
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Legal Section */}
        <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 mb-4 md:mb-0 text-center md:text-left">
            © Copyright {currentYear} Chery Bangladesh. All Rights Reserved.  
            <span className="ml-2 text-gray-400"></span>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end text-sm text-gray-500 gap-x-6">
            <Link href="/legal" className="hover:text-primary transition-colors">
              Legal Notice
            </Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Statement
            </Link>
            <Link href="/cookies" className="hover:text-primary transition-colors">
              Cookies Policy
            </Link>
            <Link href="/sitemap" className="hover:text-primary transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}