'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const ServicePage = () => {
  // State for service category filter
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Service categories
  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'maintenance', name: 'Maintenance' },
    { id: 'repair', name: 'Repair' },
    { id: 'diagnostics', name: 'Diagnostics' },
    { id: 'cosmetic', name: 'Cosmetic' }
  ];
  
  // Service offerings with categories
  const services = [
    {
      id: 1,
      title: "Regular Maintenance Service",
      category: "maintenance",
      description: "Comprehensive vehicle check including oil change, filter replacement, and multi-point inspection to keep your Chery running at its best.",
      image: "/api/placeholder/800/500",
      price: "৳ 4,500",
      duration: "3 hours",
      featuredService: true
    },
    {
      id: 2,
      title: "Full Engine Diagnostics",
      category: "diagnostics",
      description: "Complete computer diagnostics to identify and resolve engine performance issues using Chery's proprietary diagnostic equipment.",
      image: "/api/placeholder/800/500",
      price: "৳ 2,500",
      duration: "1.5 hours",
      featuredService: true
    },
    {
      id: 3,
      title: "Brake System Service",
      category: "repair",
      description: "Full brake inspection and service including pad replacement, rotor resurfacing, and brake fluid flush for optimal stopping power.",
      image: "/api/placeholder/800/500",
      price: "৳ 5,500",
      duration: "4 hours",
      featuredService: true
    },
    {
      id: 4,
      title: "Air Conditioning Service",
      category: "repair",
      description: "Complete A/C system service including refrigerant recharge, leak detection, and component inspection for maximum comfort.",
      image: "/api/placeholder/800/500",
      price: "৳ 3,500",
      duration: "2 hours",
      featuredService: false
    },
    {
      id: 5,
      title: "Transmission Service",
      category: "maintenance",
      description: "Transmission fluid change, filter replacement, and system inspection to ensure smooth gear shifting and optimal transmission performance.",
      image: "/api/placeholder/800/500",
      price: "৳ 6,000",
      duration: "3 hours",
      featuredService: false
    },
    {
      id: 6,
      title: "Battery Replacement",
      category: "repair",
      description: "Battery testing, replacement, and electrical system check to ensure reliable starting and electrical system performance.",
      image: "/api/placeholder/800/500",
      price: "৳ 7,000",
      duration: "1 hour",
      featuredService: false
    },
    {
      id: 7,
      title: "Premium Detailing",
      category: "cosmetic",
      description: "Complete interior and exterior detailing including paint correction, interior deep cleaning, and protective treatments.",
      image: "/api/placeholder/800/500",
      price: "৳ 8,500",
      duration: "6 hours",
      featuredService: true
    },
    {
      id: 8,
      title: "Wheel Alignment",
      category: "maintenance",
      description: "Precision alignment of all four wheels to factory specifications for optimal handling, tire wear, and fuel efficiency.",
      image: "/api/placeholder/800/500",
      price: "৳ 2,800",
      duration: "1.5 hours",
      featuredService: false
    },
    {
      id: 9,
      title: "Timing Belt Replacement",
      category: "repair",
      description: "Complete timing belt replacement service including water pump and tensioner replacement to prevent engine damage.",
      image: "/api/placeholder/800/500",
      price: "৳ 12,000",
      duration: "5 hours",
      featuredService: false
    }
  ];
  
  // Filter services based on active category
  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="relative">
        <div className="w-full h-[40vh] md:h-[50vh] relative">
          <Image
            src="/api/placeholder/1920/800"
            alt="Chery Service Center"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Expert Service for Your Chery
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Factory-trained technicians and genuine parts to keep your vehicle performing at its best
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="#book-service" 
                  className="bg-primary-800 text-white px-8 py-3 font-medium hover:bg-red-900 transition-colors"
                >
                  BOOK A SERVICE
                </Link>
                <Link 
                  href="#service-packages" 
                  className="bg-white text-red-800 px-8 py-3 font-medium hover:bg-gray-100 transition-colors"
                >
                  VIEW PACKAGES
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Service Intro */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Service with Chery Bangladesh
            </h2>
            <p className="text-lg text-gray-700 mb-12">
              When you choose Chery Bangladesh for your vehicle service, you're choosing excellence, reliability, 
              and the assurance that your vehicle is being cared for by experts who know it best.
            </p>
            
            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Fast Turnaround</h3>
                <p className="text-gray-600">
                  We value your time and work efficiently to get you back on the road as quickly as possible.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Warranty Protection</h3>
                <p className="text-gray-600">
                  Our services maintain your vehicle warranty protection with proper documentation and genuine parts.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.48-8.48l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Genuine Parts</h3>
                <p className="text-gray-600">
                  We use only genuine Chery parts that are specifically designed for your vehicle's optimal performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Services */}
      <section id="service-packages" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Our Service Packages
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Choose from our range of service packages tailored to meet your vehicle's specific needs.
          </p>
          
          {/* Category Filter */}
          <div className="flex justify-center flex-wrap gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 border transition-colors ${
                  activeCategory === category.id
                    ? 'bg-primary-800 text-white border-red-800'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div key={service.id} className="border border-gray-200 group hover:shadow-md transition-shadow">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-black/70 text-white text-xs uppercase tracking-wider px-2 py-1">
                    {categories.find(cat => cat.id === service.category)?.name}
                  </div>
                  
                  {/* Featured Badge */}
                  {service.featuredService && (
                    <div className="absolute top-4 right-4 bg-primary-800 text-white text-xs uppercase tracking-wider px-2 py-1">
                      Popular
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {service.description}
                  </p>
                  
                  {/* Service Details */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mr-1">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span className="text-sm text-gray-600">{service.duration}</span>
                    </div>
                    <span className="font-bold text-red-800">{service.price}</span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary-800 text-white py-2 text-sm font-medium hover:bg-red-900 transition-colors">
                      BOOK NOW
                    </button>
                    <button className="flex-1 border border-gray-300 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
                      DETAILS
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* No results message */}
          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600">No services found in this category. Please try another category.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Service Centers */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Our Service Centers
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Visit any of our state-of-the-art service centers across Bangladesh for professional care for your Chery vehicle.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Dhaka Service Center */}
            <div className="bg-white shadow-sm">
              <div className="relative h-48">
                <Image
                  src="/api/placeholder/600/400"
                  alt="Dhaka Service Center"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Dhaka Service Center</h3>
                <p className="text-gray-600 text-sm mb-4">
                  House 123, Road 12, Gulshan Avenue, Dhaka 1212
                </p>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-800 mr-2 mt-1">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span className="text-sm text-gray-600">+880 18XX-XXXXXX</span>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-800 mr-2 mt-1">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span className="text-sm text-gray-600">dhaka@cherybangladesh.com</span>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-800 mr-2 mt-1">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span className="text-sm text-gray-600">8:00 AM - 8:00 PM (Everyday)</span>
                  </div>
                </div>
                <button className="w-full mt-4 border border-red-800 text-red-800 py-2 hover:bg-primary-800 hover:text-white transition-colors">
                  GET DIRECTIONS
                </button>
              </div>
            </div>
            
            {/* Chattogram Service Center */}
            <div className="bg-white shadow-sm">
              <div className="relative h-48">
                <Image
                  src="/api/placeholder/600/400"
                  alt="Chattogram Service Center"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Chattogram Service Center</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Plot 456, CDA Avenue, GEC Circle, Chattogram 4000
                </p>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-800 mr-2 mt-1">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span className="text-sm text-gray-600">+880 18XX-XXXXXX</span>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-800 mr-2 mt-1">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span className="text-sm text-gray-600">ctg@cherybangladesh.com</span>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-800 mr-2 mt-1">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span className="text-sm text-gray-600">8:00 AM - 8:00 PM (Everyday)</span>
                  </div>
                </div>
                <button className="w-full mt-4 border border-red-800 text-red-800 py-2 hover:bg-primary-800 hover:text-white transition-colors">
                  GET DIRECTIONS
                </button>
              </div>
            </div>
            
            {/* Khulna Service Center */}
            <div className="bg-white shadow-sm">
              <div className="relative h-48">
                <Image
                  src="/api/placeholder/600/400"
                  alt="Khulna Service Center"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Khulna Service Center</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Plot 789, KDA Avenue, Sonadanga, Khulna 9100
                </p>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-800 mr-2 mt-1">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span className="text-sm text-gray-600">+880 18XX-XXXXXX</span>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-800 mr-2 mt-1">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span className="text-sm text-gray-600">khulna@cherybangladesh.com</span>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-800 mr-2 mt-1">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span className="text-sm text-gray-600">9:00 AM - 7:00 PM (Everyday)</span>
                  </div>
                </div>
                <button className="w-full mt-4 border border-red-800 text-red-800 py-2 hover:bg-primary-800 hover:text-white transition-colors">
                  GET DIRECTIONS
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Service Booking */}
      <section id="book-service" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              Book Your Service
            </h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Schedule your service appointment online and our team will contact you to confirm the details.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Booking Form */}
              <div className="bg-gray-50 p-8">
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Vehicle Model</label>
                    <select className="w-full p-3 border border-gray-300 focus:outline-none focus:border-red-800">
                      <option value="">Select Your Vehicle</option>
                      <option value="tiggo4pro">Tiggo 4 Pro</option>
                      <option value="tiggo7pro">Tiggo 7 Pro</option>
                      <option value="tiggo8pro">Tiggo 8 Pro</option>
                      <option value="arrizo6">Arrizo 6</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Service Type</label>
                    <select className="w-full p-3 border border-gray-300 focus:outline-none focus:border-red-800">
                      <option value="">Select Service</option>
                      <option value="regular">Regular Maintenance</option>
                      <option value="major">Major Maintenance</option>
                      <option value="repair">Repair Service</option>
                      <option value="diagnostic">Diagnostic Check</option>
                      <option value="other">Other Service</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
                    <input
                      type="date"
                      className="w-full p-3 border border-gray-300 focus:outline-none focus:border-red-800"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Preferred Time</label>
                    <select className="w-full p-3 border border-gray-300 focus:outline-none focus:border-red-800">
                      <option value="">Select Time</option>
                      <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                      <option value="afternoon">Afternoon (12:00 PM - 3:00 PM)</option>
                      <option value="evening">Evening (3:00 PM - 6:00 PM)</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Your Name</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full p-3 border border-gray-300 focus:outline-none focus:border-red-800"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                    <input
                      type="tel"
                      placeholder="Your contact number"
                      className="w-full p-3 border border-gray-300 focus:outline-none focus:border-red-800"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
                    <textarea
                      rows="3"
                      placeholder="Please provide any additional information about your service needs"
                      className="w-full p-3 border border-gray-300 focus:outline-none focus:border-red-800"
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-primary-800 text-white py-3 font-medium hover:bg-red-900 transition-colors"
                    >
                      BOOK APPOINTMENT
                    </button>
                  </div>
                </form>
              </div>
              
              {/* Booking Information */}
              <div className="flex flex-col">
                <div className="bg-primary-800 text-white p-8">
                  <h3 className="text-xl font-bold mb-4">Service Hours</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>8:00 AM - 8:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday</span>
                      <span>9:00 AM - 7:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday</span>
                      <span>10:00 AM - 6:00 PM</span>
                    </li>
                  </ul>
                  
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <h4 className="font-bold mb-2">Emergency Service</h4>
                    <p className="text-sm">
                      24/7 Roadside assistance is available for all Chery owners.
                    </p>
                    <div className="mt-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span className="font-bold">09639119977</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900 text-white p-8 flex-grow">
                  <h3 className="text-xl font-bold mb-4">What to Expect</h3>
                  <ul className="space-y-4">
                    <li className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mr-3 flex-shrink-0 mt-1">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Confirmation call within 2 hours of booking</span>
                    </li>
                    <li className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mr-3 flex-shrink-0 mt-1">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Digital inspection report with photos</span>
                    </li>
                    <li className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mr-3 flex-shrink-0 mt-1">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                     
                    </li>
                    <li className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mr-3 flex-shrink-0 mt-1">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Comfortable waiting lounge with refreshments</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Service FAQ */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Find answers to the most common questions about our service offerings.
          </p>
          
          <div className="max-w-3xl mx-auto bg-white p-8 shadow-sm">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">How often should I service my Chery vehicle?</h3>
                <p className="text-gray-600">
                  We recommend following the maintenance schedule in your owner's manual. Generally, a basic service is recommended every 5,000 km, and a major service every 10,000 km or 12 months, whichever comes first.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">What is included in the regular maintenance service?</h3>
                <p className="text-gray-600">
                  Our regular maintenance service includes oil and filter change, comprehensive multi-point inspection, fluid level checks and top-ups, tire pressure check, and a basic diagnostic scan of all electronic systems.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">How long does a typical service take?</h3>
                <p className="text-gray-600">
                  A basic service typically takes 1-2 hours, while a major service may take 3-4 hours. Repairs will vary based on the complexity of the issue. We'll provide an estimated completion time when you drop off your vehicle.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">Do you provide a courtesy car during service?</h3>
                <p className="text-gray-600">
                  Yes, we offer courtesy cars for major services and repairs that require your vehicle to be kept overnight. This service needs to be booked in advance and is subject to availability.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">Will servicing at Chery Bangladesh affect my warranty?</h3>
                <p className="text-gray-600">
                  No, servicing your vehicle at our authorized service centers will maintain your warranty protection. We use only genuine Chery parts and follow the manufacturer's recommended service procedures.
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Didn't find the answer you're looking for?
              </p>
              <button className="inline-flex items-center border-2 border-red-800 text-red-800 px-6 py-2 font-medium hover:bg-primary-800 hover:text-white transition-colors">
                CONTACT OUR SUPPORT TEAM
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Experience Premium Service for Your Chery
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Book your service appointment today and enjoy the peace of mind that comes with expert care.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="#book-service" 
              className="bg-primary-800 text-white px-8 py-3 font-medium hover:bg-red-700 transition-colors"
            >
              SCHEDULE SERVICE
            </Link>
            <Link 
              href="/contact" 
              className="bg-transparent border border-white text-white px-8 py-3 font-medium hover:bg-white/10 transition-colors"
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;